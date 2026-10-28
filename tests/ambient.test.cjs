const {test}=require('node:test');
const assert=require('node:assert/strict');
const vm=require('node:vm');
const fs=require('node:fs');
function harness({reduced=false,fine=true}={}) {
  const target=()=>({events:{},style:{setProperty(k,v){this[k]=v},removeProperty(k){delete this[k]}},addEventListener(k,f){(this.events[k]??=[]).push(f)},fire(k,e={}){for(const f of this.events[k]||[])f(e)}});
  const document=target(),window=target(),board=target(),shot=target();
  document.documentElement=target();document.hidden=false;shot.getBoundingClientRect=()=>({left:0,top:0,width:100,height:100});
  document.querySelector=()=>board;document.querySelectorAll=()=>[shot];
  const media=[Object.assign(target(),{matches:reduced}),Object.assign(target(),{matches:fine})];let m=0,id=0;const frames=new Map();
  const scope={window,document,matchMedia:()=>media[m++],innerWidth:1000,innerHeight:800,scrollY:100,requestAnimationFrame:f=>{frames.set(++id,f);return id},cancelAnimationFrame:i=>frames.delete(i)};
  vm.runInNewContext(fs.readFileSync(require('node:path').join(__dirname,'..','ambient.js'),'utf8'),scope);
  const flush=()=>{const batch=[...frames.values()];frames.clear();batch.forEach(f=>f())};return{document,window,board,shot,frames,flush,media};
}
test('background updates coalesce and never create an idle animation loop',()=>{const h=harness();h.flush();for(let i=0;i<20;i++)h.window.fire('scroll');assert.equal(h.frames.size,1);h.flush();assert.equal(h.frames.size,0)});
test('effects off restores a static board and removes screenshot tilt',()=>{const h=harness();h.shot.fire('pointermove',{pointerType:'mouse',clientX:100,clientY:100});assert.ok(h.shot.style['--shot-x']);h.window.fire('effectschange',{detail:false});h.flush();assert.equal(h.board.style['--board-x'],'0px');assert.equal(h.board.style['--signal-offset'],'0');assert.equal(h.shot.style['--shot-x'],undefined)});
test('reduced motion suppresses spatial effects from first render',()=>{const h=harness({reduced:true});h.document.fire('pointermove',{pointerType:'mouse',clientX:900,clientY:50});h.shot.fire('pointermove',{pointerType:'mouse',clientX:100,clientY:100});h.flush();assert.equal(h.board.style['--board-x'],'0px');assert.equal(h.shot.style['--shot-y'],undefined)});
test('hidden pages cancel pending work and touch does not tilt screenshots',()=>{const h=harness();h.shot.fire('pointermove',{pointerType:'touch',clientX:100,clientY:100});assert.equal(h.shot.style['--shot-y'],undefined);h.document.hidden=true;h.document.fire('visibilitychange');assert.equal(h.frames.size,0)});
