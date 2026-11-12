const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const {pathToFileURL}=require('node:url');
const root=process.env.PORTFOLIO_SOURCE_DIR||path.join(__dirname,'..');
async function harness(){
 const math=await import(pathToFileURL(path.join(root,'fluid-motion.mjs')).href);
 class Element{
  constructor(){this.events={};this.attrs={};this.dataset={};this.style={setProperty(){}};const classes=new Set();this.classList={add:k=>classes.add(k),remove:k=>classes.delete(k),contains:k=>classes.has(k)};this.offsetHeight=1500;}
  addEventListener(k,fn){(this.events[k]??=[]).push(fn);}
  fire(k,e={}){for(const fn of this.events[k]||[])fn(e);}
  setAttribute(k,v){this.attrs[k]=v;}
  getBoundingClientRect(){return{top:this.top??80,left:0,width:1000,height:1500};}
 }
 const host=new Element(), stage=new Element(),canvas=new Element(),open=new Element(),header=new Element();header.getBoundingClientRect=()=>({height:80});
 const buttons=['MotionStudio','PhotoMosaic','Smart Collection Manager'].map((title,i)=>Object.assign(new Element(),{textContent:title,dataset:{description:title,target:'#'+i}}));
 const triggers=buttons.map(()=>new Element());
 const sources=buttons.map((_,i)=>{const e=new Element(),image=new Element();image.getBoundingClientRect=()=>({left:i*100,top:80,width:1000,height:1500});e.querySelector=()=>image;return e;});
 const nodes={'.reel-stage':stage,'canvas':canvas,'.reel-open':open};
 host.querySelector=s=>nodes[s]??(nodes[s]=new Element());stage.querySelector=host.querySelector;
 host.querySelectorAll=s=>s==='[data-reel-select]'?buttons:s==='.reel-source'?sources:[];
 const window=new Element(),document=new Element();window.scrollTo=()=>{};document.querySelector=s=>s==='.project-reel'?host:s==='.site-header'?header:null;document.querySelectorAll=()=>triggers;
 let finishImport;const pending=new Promise(resolve=>{finishImport=resolve;});const calls=[];
 const source=fs.readFileSync(path.join(root,'project-reel.js'),'utf8').replace(/^import .*;\n/,'').replaceAll('import(','loadModule(');
 vm.runInNewContext(source,{...math,window,document,innerHeight:800,scrollY:0,matchMedia:()=>Object.assign(new Element(),{matches:false}),requestAnimationFrame:()=>1,cancelAnimationFrame(){},IntersectionObserver:class{observe(){}},loadModule:()=>pending});
 return{host,open,buttons,window,triggers,calls,finishImport:()=>{window.portfolioViewer={open:(trigger,context)=>calls.push({trigger,context})};finishImport({});},flush:()=>new Promise(resolve=>setImmediate(resolve))};
}
test('first project click keeps its requested project while the viewer module loads',async()=>{
 const h=await harness();
 h.open.fire('click');
 h.host.top=-280;h.window.fire('scroll');
 h.finishImport();await h.flush();
 assert.equal(h.calls.length,1);
 assert.equal(h.calls[0].trigger,h.triggers[0],'A later scroll selection must not replace the project the visitor opened');
});

test('viewer gallery return uses the currently displayed project source',async()=>{
 const h=await harness();h.finishImport();await h.flush();h.open.fire('click');
 const geometry=h.calls[0].context.source({trigger:h.triggers[1]});
 assert.equal(geometry.rect.left,100,'Returning after Next must target the next project image');
});

test('named project selection survives focus scrolling and yields to deliberate wheel input',async()=>{
 const h=await harness();h.buttons[1].fire('click');
 h.host.top=-900;h.window.fire('scroll');
 assert.equal(h.open.attrs['aria-label'],'Explore PhotoMosaic');
 h.window.fire('wheel');
 assert.equal(h.open.attrs['aria-label'],'Explore Smart Collection Manager');
});
test('viewer holds the reel geometry until its return is complete',async()=>{
 const h=await harness();h.finishImport();await h.flush();h.open.fire('click');
 assert.equal(h.host.classList.contains('reel-viewer-open'),true);
 h.window.fire('viewerclosed');
 assert.equal(h.host.classList.contains('reel-viewer-open'),false);
});

test('returning to a different project aligns its native scroll position under the viewer',async()=>{
 const h=await harness();h.finishImport();await h.flush();h.open.fire('click');
 const requests=[];h.window.portfolioScroll={scrollTo:(y,options)=>requests.push({y,options})};
 h.calls[0].context.beforeReturn({trigger:h.triggers[2]});
 assert.equal(requests[0].y,780);assert.equal(requests[0].options.immediate,true);assert.equal(requests[0].options.force,true);
});
