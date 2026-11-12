const {test}=require('node:test');const assert=require('node:assert/strict');const vm=require('node:vm');const fs=require('node:fs');const path=require('node:path');
function harness({gsap=true}={}){
 const make=()=>({events:{},addEventListener(k,fn){(this.events[k]??=[]).push(fn)},fire(k){for(const f of this.events[k]||[])f()},dispatchEvent(event){this.fire(event.type)}});
 const window=make(),document=make(),reduced=make();document.readyState='complete';document.body={classList:{contains:()=>false}};
 const instances=[],ticks=new Set();window.ScrollTrigger={update(){}};if(gsap)window.gsap={ticker:{add:fn=>ticks.add(fn),remove:fn=>ticks.delete(fn),lagSmoothing(){}}};
 class Lenis{constructor(options){this.options=options;this.calls=[];instances.push(this)}on(name,fn){this.listener={name,fn}}raf(time){this.calls.push(time)}destroy(){this.destroyed=true}stop(){}start(){}}
 const source=fs.readFileSync(path.join(__dirname,'..','fluid.js'),'utf8').replace(/^import .*;\n/,'');
 vm.runInNewContext(source,{Lenis,window,document,matchMedia:()=>reduced,MutationObserver:class{observe(){}},Event:class{constructor(type){this.type=type}}});
 return{window,document,instances,ticks};
}
test('GSAP and Lenis share one clock and convert seconds to milliseconds',()=>{const h=harness(),scroll=h.instances[0];assert.equal(scroll.options.autoRaf,false);assert.equal(h.ticks.size,1);[...h.ticks][0](1.25);assert.deepEqual(scroll.calls,[1250]);assert.equal(scroll.listener.name,'scroll');assert.equal(scroll.listener.fn,h.window.ScrollTrigger.update)});
test('missing GSAP retains Lenis native animation clock',()=>{const h=harness({gsap:false});assert.equal(h.instances[0].options.autoRaf,true);assert.equal(h.ticks.size,0)});
test('effects off and page exit detach the old clock before resuming',()=>{const h=harness();h.window.portfolioEffects=false;h.window.fire('effectschange');assert.equal(h.instances[0].destroyed,true);assert.equal(h.ticks.size,0);h.window.portfolioEffects=true;h.window.fire('effectschange');assert.equal(h.instances.length,2);assert.equal(h.ticks.size,1);h.window.fire('pagehide');assert.equal(h.ticks.size,0);h.window.fire('pageshow');assert.equal(h.instances.length,3);assert.equal(h.ticks.size,1)});
