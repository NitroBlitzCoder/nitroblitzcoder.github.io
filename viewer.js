import {createRenderer} from './viewer-renderer.js';
import {fitRect,sourceFrame,flat,liftPose,galleryPose,ease} from './viewer-motion.mjs';
const dialog=document.querySelector('#image-dialog');
const image=document.querySelector('#full-image');
const stage=dialog.querySelector('.viewer-stage');
const canvas=dialog.querySelector('.viewer-canvas');
const title=dialog.querySelector('#viewer-title');
const description=dialog.querySelector('#viewer-description');
const count=dialog.querySelector('#viewer-count');
const previous=dialog.querySelector('[data-viewer-prev]'),next=dialog.querySelector('[data-viewer-next]');
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
const triggers=[...document.querySelectorAll('[data-image]')];
const records=triggers.map(trigger=>({trigger,src:trigger.dataset.image,alt:trigger.dataset.alt,title:trigger.closest('.case').querySelector('h2').innerText.replace(/\s+/g,' ').trim(),description:trigger.closest('.case').querySelector('.project-info>p')?.textContent||''}));
let engine,unavailable=false,current=0,requested=0,state='closed',serial=0,tweenFrame=0,tweenResolve=null,primary=null,secondary=null,outgoingIndex=null,opener=null,returnY=0;
const loaded=new Map();
const motion=()=>!reduced.matches&&window.portfolioEffects!==false&&!document.hidden;
const compact=()=>innerWidth<700;
function signal(kind,direction=1){
  window.dispatchEvent(new CustomEvent('projectflight',{detail:{kind,direction}}));
  const paths=dialog.querySelector('.viewer-wires .board-signals');
  if(paths&&motion()){
    paths.getAnimations().forEach(a=>a.cancel());
    paths.animate([{strokeDashoffset:String(700*direction),opacity:.2},{opacity:1,offset:.3},{strokeDashoffset:String(-700*direction),opacity:.2}],{duration:kind==='close'?650:1000,easing:'cubic-bezier(.16,1,.3,1)'});
  }
}
function sourceNode(record){return record.trigger.dataset.origin?document.querySelector(record.trigger.dataset.origin):record.trigger.querySelector('img');}
function origin(record){
  const node=sourceNode(record);if(!node)return null;
  const img=node.tagName==='IMG'?node:node.querySelector('.mosaic-overlay img')||node.querySelector('img');
  if(!img)return null;
  const clip=node.tagName==='IMG'?record.trigger.getBoundingClientRect():node.getBoundingClientRect();
  return sourceFrame(img.getBoundingClientRect(),clip,{width:innerWidth,height:innerHeight});
}
function destination(record){
  const box=stage.getBoundingClientRect(),asset=loaded.get(record.src);
  return fitRect(asset?.naturalWidth||image.naturalWidth||1600,asset?.naturalHeight||image.naturalHeight||1000,box);
}
async function load(record){
  if(loaded.has(record.src))return loaded.get(record.src);
  const asset=new Image();asset.src=record.src;await asset.decode();loaded.set(record.src,asset);return asset;
}
function getEngine(){
  if(engine||unavailable)return engine;
  try{if(new URLSearchParams(location.search).get('renderer')==='software')throw Error('Static renderer requested');engine=createRenderer(canvas);}
  catch{unavailable=true;canvas.hidden=true;}
  return engine;
}
function metadata(index,animate=true){
  const record=records[index];title.textContent=record.title;description.textContent=record.description;count.textContent=`${index+1} / ${records.length}`;
  image.src=record.src;image.alt=record.alt;
  for(const el of [title,description,count]){
    el.getAnimations().forEach(a=>a.cancel());if(animate&&motion())el.animate([{opacity:0,transform:'translateY(12px)',filter:'blur(3px)'},{opacity:1,transform:'none',filter:'blur(0px)'}],{duration:420,easing:'cubic-bezier(.16,1,.3,1)',fill:'both'});
  }
}
function cancelTween(){cancelAnimationFrame(tweenFrame);tweenFrame=0;if(tweenResolve){const resolve=tweenResolve;tweenResolve=null;resolve(false);}}
function tween(duration,step){
  cancelTween();const started=performance.now();let frames=0,last=started,maxGap=0;
  return new Promise(resolve=>{tweenResolve=resolve;function tick(now){
    frames++;maxGap=Math.max(maxGap,now-last);last=now;
    const p=Math.min(1,(now-started)/duration);step(p);
    if(p<1)tweenFrame=requestAnimationFrame(tick);else{tweenFrame=0;tweenResolve=null;dialog.dataset.flightFrames=String(frames);dialog.dataset.flightMaxGap=String(Math.round(maxGap));resolve(true);}
  }step(0);tweenFrame=requestAnimationFrame(tick);});
}
function hideOrigin(){const node=sourceNode(records[current]);if(node)node.classList.add('viewer-source-hidden');}
function restoreOrigins(){document.querySelectorAll('.viewer-source-hidden').forEach(node=>node.classList.remove('viewer-source-hidden'));}
function exposeCanvas(){canvas.hidden=false;image.style.opacity='0';dialog.classList.add('viewer-moving');}
function settle(){
  if(!dialog.open)return;
  cancelTween();canvas.hidden=true;engine?.clear();primary=secondary=null;
  image.style.opacity='';dialog.classList.remove('viewer-moving');dialog.removeAttribute('aria-busy');
  restoreOrigins();state='open';
}
function finishClose(){
  cancelTween();engine?.clear();canvas.hidden=true;primary=secondary=null;
  restoreOrigins();image.style.opacity='';dialog.classList.remove('viewer-moving','viewer-entering','viewer-leaving');
  dialog.style.removeProperty('--viewer-cover');dialog.removeAttribute('aria-busy');state='closed';
  if(dialog.open)dialog.close();
  window.scrollTo({top:returnY,behavior:'instant'});opener?.focus({preventScroll:true});
  window.dispatchEvent(new CustomEvent('viewerclosed'));
}
async function open(trigger){
  if(state!=='closed')return;
  const index=records.findIndex(r=>r.trigger===trigger);if(index<0)return;
  const token=++serial;current=requested=index;opener=trigger;returnY=scrollY;
  state='loading';metadata(index,false);document.body.classList.add('modal-open');dialog.showModal();
  dialog.classList.add('viewer-entering');dialog.style.setProperty('--viewer-cover',motion()?'0':'1');
  const source=origin(records[index]);
  try{
    const asset=await load(records[index]);if(token!==serial||!dialog.open)return;
    dialog.classList.remove('viewer-entering');
    const destinationPose=flat(destination(records[index]));
    const renderer=motion()&&source?getEngine():null;
    if(!renderer){dialog.style.setProperty('--viewer-cover','1');settle();return;}
    renderer.resize();renderer.clear();primary=renderer.panel(asset);hideOrigin();exposeCanvas();state='opening';
    const from={...flat(source.rect),crop:source.crop};signal('open');
    const done=await tween(compact()?760:900,p=>{
      primary.set(liftPose(from,destinationPose,p,false,compact()));renderer.render();
      dialog.style.setProperty('--viewer-cover',String(Math.min(1,p*2.3)));
    });
    if(!done||token!==serial)return;
    settle();if(requested!==current)navigateToRequested();
  }catch{
    if(token!==serial)return;dialog.classList.remove('viewer-entering');dialog.style.setProperty('--viewer-cover','1');settle();
  }
}
async function navigateToRequested(){
  if(state!=='open'||requested===current)return;
  const token=++serial,target=requested,old=current,direction=target===((old+1)%records.length)?1:-1;
  state='loading';dialog.setAttribute('aria-busy','true');
  try{
    const [outgoing,incoming]=await Promise.all([load(records[old]),load(records[target])]);
    if(token!==serial||!dialog.open)return;
    const oldRect=destination(records[old]),newRect=destination(records[target]);
    outgoingIndex=old;current=target;metadata(target);signal('change',direction);
    const renderer=motion()?getEngine():null;
    if(!renderer){settle();if(requested!==current)navigateToRequested();return;}
    renderer.resize();renderer.clear();primary=renderer.panel(incoming);secondary=renderer.panel(outgoing);secondary.mesh.renderOrder=0;primary.mesh.renderOrder=1;
    exposeCanvas();state='changing';
    const done=await tween(compact()?640:780,p=>{
      secondary.set(galleryPose(oldRect,p,false,direction,compact()));primary.set(galleryPose(newRect,p,true,direction,compact()));renderer.render();
    });
    if(!done||token!==serial)return;
    settle();if(requested!==current)navigateToRequested();
  }catch{if(token!==serial)return;requested=current;settle();count.textContent='Image unavailable — try another project';}
}
function navigate(direction){
  if(state==='closed'||state==='closing')return;
  requested=(requested+direction+records.length)%records.length;
  if(state==='open')navigateToRequested();
}
async function close(){
  if(state==='closing')return;
  if(state==='closed'){if(dialog.open){returnY=scrollY;finishClose();}return;}
  ++serial;cancelTween();const previousState=state;
  if(secondary&&primary?.pose?.alpha<.5&&outgoingIndex!==null){current=outgoingIndex;[primary,secondary]=[secondary,primary];metadata(current,false);}
  state='closing';requested=current;
  // Move the inert page under the opaque viewer before returning to another project.
  const record=records[current];opener=record.trigger;
  if(!origin(record)||origin(record).rect.height<100)record.trigger.scrollIntoView({behavior:'instant',block:'center'});
  returnY=scrollY;const source=origin(record);
  dialog.classList.add('viewer-leaving');signal('close');
  if(!motion()||!source||!engine||!loaded.has(record.src)){finishClose();return;}
  engine.resize();
  const from=primary?.pose&&previousState!=='loading'?{...primary.pose,crop:[...primary.pose.crop]}:flat(destination(record));
  if(!primary){engine.clear();primary=engine.panel(loaded.get(record.src));}
  const fade=secondary?.pose?{...secondary.pose,crop:[...secondary.pose.crop]}:null;
  hideOrigin();exposeCanvas();const to={...flat(source.rect),crop:source.crop};
  const done=await tween(compact()?560:680,p=>{
    primary.set(liftPose(from,to,p,true,compact()));
    if(secondary&&fade)secondary.set({...fade,alpha:fade.alpha*(1-ease(p))});
    engine.render();dialog.style.setProperty('--viewer-cover',String(1-ease(p)));
  });if(done)finishClose();
}
previous.addEventListener('click',()=>navigate(-1));next.addEventListener('click',()=>navigate(1));
dialog.addEventListener('cancel',event=>{event.preventDefault();close();});
dialog.addEventListener('keydown',event=>{
  if(event.key==='ArrowLeft'||event.key==='ArrowRight'){event.preventDefault();navigate(event.key==='ArrowRight'?1:-1);}
});
dialog.addEventListener('close',()=>{if(state!=='closed'){++serial;cancelTween();restoreOrigins();canvas.hidden=true;engine?.clear();state='closed';}});
canvas.addEventListener('webglcontextlost',event=>{event.preventDefault();unavailable=true;cancelTween();settle();});
window.addEventListener('resize',()=>{if(state==='closing'){++serial;finishClose();}else if(state!=='closed'){++serial;settle();if(requested!==current)navigateToRequested();}});
window.addEventListener('effectschange',()=>{if(!motion()&&state!=='closed'){++serial;if(state==='closing')finishClose();else settle();}});
document.addEventListener('visibilitychange',()=>{if(document.hidden&&state!=='closed'){++serial;if(state==='closing')finishClose();else settle();}});
window.addEventListener('pagehide',()=>{++serial;if(state!=='closed')finishClose();else cancelTween();restoreOrigins();engine?.dispose();engine=null;});
// The page remains functional through the pre-existing native dialog if this module fails.
window.portfolioViewer={open,close};dialog.classList.add('viewer-ready');
// Adopt an already-open native fallback if the module arrived after the first click.
if(dialog.open){
  const found=records.findIndex(record=>image.src.endsWith(record.src));
  current=requested=found<0?0:found;opener=records[current].trigger;returnY=scrollY;
  metadata(current,false);dialog.style.setProperty('--viewer-cover','1');state='open';
}
const wires=document.querySelector('.circuit-traces')?.cloneNode(true);
if(wires){wires.classList.add('viewer-wires');wires.setAttribute('aria-hidden','true');dialog.prepend(wires);}
