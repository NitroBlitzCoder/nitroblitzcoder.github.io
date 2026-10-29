import {createTileField} from './tile-field-renderer.js';
const host=document.querySelector('.project-map'),stage=host.querySelector('.tile-stage'),canvas=stage.querySelector('canvas');
const links=[...host.querySelectorAll('[data-tile-project]')];
const records=links.map(link=>{const trigger=document.querySelector(link.hash+' [data-image]');return{link,trigger,src:trigger.dataset.image,title:link.textContent.trim()};});
const reduced=matchMedia('(prefers-reduced-motion: reduce)'),images=new Map();
let engine,active=-1,visible=false,blocked=false,frame=0,last=0,failed=false;
const moving=()=>!reduced.matches&&window.portfolioEffects!==false;
function position(){links.forEach((link,i)=>{const p=engine.project(i);link.style.left=p.x+'px';link.style.top=p.y+'px';});}
function tick(now){frame=0;if(!engine||!visible||blocked||document.hidden)return;const settling=engine.update(last?now-last:16,!moving());last=now;engine.render();position();host.dataset.settled=String(!settling);if(settling&&moving())frame=requestAnimationFrame(tick);}
function wake(){if(!frame){last=0;frame=requestAnimationFrame(tick);}}
function select(index,immediate=false){
  active=index;host.dataset.selected=String(index);links.forEach((link,i)=>link.setAttribute('aria-current',i===index?'true':'false'));
  host.querySelector('.tile-selection').textContent=index<0?'Three projects. Different ways of making.':records[index].title;
  const detail=host.querySelector('.tile-details');detail.href=index<0?'#motionstudio':records[index].link.hash;
  engine?.setActive(index);engine?.setPreview(images.get(records[index]?.src)||null,immediate||!moving());wake();
}
async function init(){
  if(engine||failed)return;
  try{
    if(new URLSearchParams(location.search).get('renderer')==='software')throw Error('Static renderer requested');
    engine=createTileField(canvas);host.classList.add('tiles-ready');
    for(const record of records){const image=new Image();image.src=record.src;image.decode().then(()=>{images.set(record.src,image);if(active===records.indexOf(record))select(active);}).catch(()=>{});}
    wake();
  }catch{failed=true;host.dataset.renderer='static';}
}
function restorePreview(record){const index=records.findIndex(r=>r.trigger===record.trigger);select(index,true);engine?.leave();if(engine){engine.update(0,true);engine.render();position();}}
function open(index){
  if(index<0||!window.portfolioViewer)return false;
  select(index,true);if(engine){engine.update(0,true);engine.render();position();}
  window.portfolioViewer.open(records[index].trigger,{
    source(record){const img=images.get(record.src);if(!engine||!img)return null;return{rect:engine.previewRect(img.naturalWidth/img.naturalHeight),crop:[0,0,1,1]};},
    beforeReturn:restorePreview,
    focus(record){return records.find(r=>r.trigger===record.trigger)?.link;}
  });return true;
}
links.forEach((link,i)=>{
  link.addEventListener('pointerenter',()=>{engine?.focus(i);select(i);});
  link.addEventListener('focus',()=>{engine?.focus(i);select(i);});
  link.addEventListener('click',event=>{if(open(i))event.preventDefault();});
});
canvas.addEventListener('pointermove',event=>{if(event.pointerType==='touch'||!engine||!moving())return;const hit=engine.hitTest(event.clientX,event.clientY);if(hit>=0&&hit!==active)select(hit);wake();});
canvas.addEventListener('pointercancel',()=>{engine?.leave();select(-1);});
canvas.addEventListener('click',event=>{if(engine)open(engine.hitTest(event.clientX,event.clientY));});
stage.addEventListener('pointerleave',()=>{if(!links.includes(document.activeElement)){engine?.leave();select(-1);}});
host.addEventListener('focusout',event=>{if(!host.contains(event.relatedTarget)){engine?.leave();select(-1);}});
canvas.addEventListener('webglcontextlost',event=>{event.preventDefault();cancelAnimationFrame(frame);frame=0;failed=true;engine=null;host.classList.remove('tiles-ready');links.forEach(l=>{l.style.left='';l.style.top='';});});
new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;if(visible){init();wake();}else{cancelAnimationFrame(frame);frame=0;}},{rootMargin:'100px'}).observe(stage);
window.addEventListener('resize',()=>{engine?.resize();wake();});
window.addEventListener('effectschange',()=>{engine?.leave();wake();});reduced.addEventListener('change',wake);
window.addEventListener('projectflight',()=>{blocked=true;cancelAnimationFrame(frame);frame=0;});
window.addEventListener('viewerclosed',()=>{blocked=false;wake();});
document.addEventListener('visibilitychange',()=>{if(!document.hidden)wake();});
window.addEventListener('pagehide',()=>{cancelAnimationFrame(frame);engine?.dispose();});
