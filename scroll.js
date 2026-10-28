import {createScrollRenderer} from './scroll-renderer.js';
import {presentation,coveredImage,imageCrop,follow,clamp,smooth} from './scroll-motion.mjs';
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
const cases=[...document.querySelectorAll('.case')];
const intro=document.querySelector('.intro'),contact=document.querySelector('#contact');
const canvas=document.createElement('canvas');canvas.className='scroll-canvas';canvas.setAttribute('aria-hidden','true');canvas.hidden=true;document.body.append(canvas);
const items=cases.map((section,mode)=>({section,mode,frame:section.querySelector(mode===1?'.comparison':'.image-button'),image:section.querySelector(mode===1?'.mosaic-overlay img':'.image-button img'),panel:null,reveal:null}));
let renderer=null,failed=false,initialized=false,pending=0,lastTime=0,lastScroll=scrollY,velocity=0,enabled=window.portfolioEffects!==false&&!reduced.matches;
let lastActive=-1;
function restore(){items.forEach(item=>item.image.classList.remove('scroll-image-live'));canvas.hidden=true;renderer?.clear();document.body.dataset.scrollActive='0';lastActive=-1;}
function rendererReady(){
  if(renderer||failed)return renderer;
  try{if(new URLSearchParams(location.search).get('renderer')==='software')throw Error('Static renderer requested');renderer=createScrollRenderer(canvas);document.body.classList.add('scroll-renderer');document.body.dataset.scrollRenderer='webgl';}
  catch{failed=true;document.body.dataset.scrollRenderer='static';restore();}
  return renderer;
}
function schedule(){if(!pending&&!document.hidden)pending=requestAnimationFrame(render);}
function neutral(){
  cases.forEach(section=>{section.style.removeProperty('--case-turn');section.style.removeProperty('--case-y');});
  intro.style.removeProperty('--intro-drift');contact.style.removeProperty('--contact-y');restore();
}
function render(now){
  pending=0;
  if(document.hidden)return;
  if(!enabled){neutral();return;}
  if(document.body.classList.contains('modal-open')){restore();return;}
  const elapsed=Math.min(50,now-lastTime||16);lastTime=now;
  const measured=clamp(Math.abs(scrollY-lastScroll)/Math.max(1,elapsed)/3)*Math.sign(scrollY-lastScroll);
  velocity=follow(velocity,measured,elapsed,45);lastScroll=scrollY;
  const viewport=innerHeight,compact=innerWidth<700;
  // Collect layout reads before style writes or drawing.
  const views=items.map(item=>({item,frame:item.frame.getBoundingClientRect(),image:item.image.getBoundingClientRect(),section:item.section.getBoundingClientRect(),engaged:item.frame.contains(document.activeElement)||item.section.querySelector('.comparison-controls')?.contains(document.activeElement)}));
  const introRect=intro.getBoundingClientRect(),contactRect=contact.getBoundingClientRect();
  const visible=views.filter(view=>view.frame.bottom>0&&view.frame.top<viewport&&view.frame.width>0);
  const engine=visible.length?rendererReady():renderer;
  let settling=Math.abs(velocity)>.003,active=0;
  for(const view of views){
    const {item,frame}=view;
    const heading=smooth((viewport*.95-view.section.top)/(viewport*.35));
    item.section.style.setProperty('--case-turn',`${(1-heading)*-9}deg`);
    item.section.style.setProperty('--case-y',`${(1-heading)*(compact?8:14)}px`);
    if(!engine||!visible.includes(view)||!item.image.complete||!item.image.naturalWidth){item.panel?.hide();item.image.classList.remove('scroll-image-live');continue;}
    const state=presentation(frame.top,frame.height,viewport,compact);
    if(view.engaged)state.reveal=1;
    if(item.reveal===null)item.reveal=state.reveal;else item.reveal=follow(item.reveal,state.reveal,elapsed,65);
    if(Math.abs(item.reveal-state.reveal)<.0005)item.reveal=state.reveal;
    settling ||= item.reveal!==state.reveal;
    state.reveal=item.reveal;
    const actualImage=item.mode===1?coveredImage(view.image,item.image.naturalWidth,item.image.naturalHeight):view.image;
    const crop=imageCrop(actualImage,frame);if(!crop)continue;
    if(!item.panel)item.panel=engine.add(item.image,item.mode);
    const split=item.mode===1?frame.left+frame.width*Number(document.querySelector('#compare-range').value)/100:0;
    item.panel.show(crop,frame,state,velocity,split);
    item.image.classList.add('scroll-image-live');active++;
    const label=state.reveal>.995?'settled':'forming';if(item.section.dataset.scrollState!==label)item.section.dataset.scrollState=label;
  }
  intro.style.setProperty('--intro-drift',`${smooth(-introRect.top/Math.max(1,introRect.height))*(compact?12:26)}px`);
  contact.style.setProperty('--contact-y',`${(1-smooth((viewport-contactRect.top)/(viewport*.5)))*(compact?22:48)}px`);
  if(engine&&active){
    canvas.hidden=false;
    try{engine.render();}catch{
      const broken=renderer;renderer=null;failed=true;restore();broken?.dispose();
      document.body.classList.remove('scroll-renderer');document.body.dataset.scrollRenderer='static';active=0;
    }
  }else{canvas.hidden=true;engine?.clear();}
  if(lastActive!==active){document.body.dataset.scrollActive=String(active);lastActive=active;}
  if(settling)schedule();
}
function reset(){cancelAnimationFrame(pending);pending=0;velocity=0;lastScroll=scrollY;lastTime=0;items.forEach(item=>{item.reveal=null;});renderer?.resize();schedule();}
window.addEventListener('scroll',schedule,{passive:true});
window.addEventListener('resize',reset);
window.addEventListener('effectschange',event=>{enabled=event.detail&&!reduced.matches;reset();});
reduced.addEventListener('change',()=>{enabled=!reduced.matches&&window.portfolioEffects!==false;reset();});
window.addEventListener('viewerclosed',()=>{restore();reset();});
window.addEventListener('projectflight',event=>{if(event.detail.kind==='open'){cancelAnimationFrame(pending);pending=0;restore();}});
window.addEventListener('pageshow',()=>{if(initialized)reset();});
window.addEventListener('pagehide',()=>{cancelAnimationFrame(pending);pending=0;restore();});
document.addEventListener('visibilitychange',()=>{if(document.hidden){cancelAnimationFrame(pending);pending=0;restore();}else reset();});
document.addEventListener('focusin',schedule);document.addEventListener('focusout',schedule);
document.querySelector('#compare-range').addEventListener('input',schedule);
document.querySelector('#mosaic-pan').addEventListener('input',schedule);
document.querySelector('#comparison-view').addEventListener('pointermove',()=>{if(document.querySelector('#zoom').getAttribute('aria-pressed')==='true')schedule();},{passive:true});
document.querySelector('#zoom').addEventListener('click',()=>{items[1].reveal=1;schedule();});
items.forEach(item=>item.image.addEventListener('load',schedule));
canvas.addEventListener('webglcontextlost',event=>{event.preventDefault();failed=true;restore();renderer=null;document.body.classList.remove('scroll-renderer');document.body.dataset.scrollRenderer='static';});
// Motion is an enhancement: native images and content remain the default.
initialized=true;document.body.classList.add('scroll-ready');schedule();
