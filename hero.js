const hero=document.querySelector('.hero'),canvas=hero.querySelector('canvas'),loading=hero.querySelector('.hero-loading'),reduced=matchMedia('(prefers-reduced-motion: reduce)');
let engine,frame=0,visible=true,failed=false,starting=false,last=0,elapsed=0,previous=0;const pointer={x:0,y:0};
const allowed=()=>!reduced.matches&&window.portfolioEffects!==false&&!document.hidden&&!failed;
let loaderActive=false;
loading.hidden=!allowed();
const curtain=document.querySelector('.portfolio-loader'),track=curtain.querySelector('.loader-track'),fill=track.firstElementChild,number=curtain.querySelector('.loader-number'),shell=[document.querySelector('.site-header'),document.querySelector('main'),document.querySelector('footer'),document.querySelector('.skip')];
function finishLoader(){if(!loaderActive)return;loaderActive=false;shell.forEach(el=>el.inert=false);document.body.classList.remove('hero-loading-active');const focus=curtain.contains(document.activeElement);if(focus)document.querySelector('.wordmark').focus({preventScroll:true});if(reduced.matches){curtain.hidden=true;reveal();return;}curtain.animate([{clipPath:'inset(0)'},{clipPath:'inset(0 0 100% 0)'}],{duration:650,easing:'cubic-bezier(.76,0,.24,1)'}).finished.then(()=>{curtain.hidden=true;});reveal();}
if(allowed()){
loaderActive=true;curtain.hidden=false;document.body.classList.add('hero-loading-active');shell.forEach(el=>el.inert=true);curtain.querySelector('.loader-skip').addEventListener('click',finishLoader);
const assets=[["assets/Anybody.ttf", 201352], ["assets/InstrumentSans.ttf", 194336], ["vendor/three/build/three.module.js", 603113], ["vendor/three/build/three.core.js", 1403455], ["assets/motionstudio.webp", 94664], ["assets/mosaic.webp", 2681580], ["assets/original.jpg", 472326], ["assets/collections.webp", 208088], ["assets/aircraft-circuit.webp", 12720], ["assets/car-circuit.webp", 41496]],total=assets.reduce((sum,asset)=>sum+asset[1],0);let bytes=0;
const update=()=>{const progress=Math.min(100,Math.floor(bytes/total*100));track.setAttribute('aria-valuenow',String(progress));fill.style.transform=`scaleX(${progress/100})`;number.innerHTML=progress+'<span>%</span>';};
const started=Date.now();Promise.allSettled(assets.map(async([url,size])=>{const response=await fetch(url);if(!response.ok)throw Error(url);const reader=response.body?.getReader();if(!reader){await response.arrayBuffer();bytes+=size;update();return;}for(;;){const chunk=await reader.read();if(chunk.done)break;bytes+=chunk.value.byteLength;update();}})).then(()=>setTimeout(finishLoader,Math.max(0,1000-(Date.now()-started))));setTimeout(finishLoader,12000);
}

function reveal(){
 if(loaderActive)return;loading.hidden=true;if(hero.dataset.revealed)return;hero.dataset.revealed='true';hero.classList.add('paper-ready');if(!allowed())return;
 hero.querySelectorAll('.hero-line').forEach((line,i)=>line.animate([{clipPath:'inset(0 100% 0 0)',filter:'blur(1px)'},{clipPath:'inset(-20% -8%)',filter:'blur(0)'}],{duration:950,delay:i*160,easing:'cubic-bezier(.16,1,.3,1)'}));
}
function fitHeader(){hero.style.setProperty('--hero-header-height',document.querySelector('.site-header').getBoundingClientRect().height+'px');}fitHeader();
const revealDeadline=setTimeout(reveal,1200);
function stop(){cancelAnimationFrame(frame);frame=0;previous=0;}
function tick(now){frame=0;if(!engine||!visible||!allowed())return;const interval=innerWidth<700?1000/30:1000/45;if(now-last>=interval){elapsed+=previous?Math.min((now-previous)/1000,.08):0;previous=now;last=now;const box=hero.getBoundingClientRect();engine.render(elapsed,pointer,Math.max(0,Math.min(1,-box.top/box.height)));}frame=requestAnimationFrame(tick);}
async function start(){if(!allowed()||!visible)return;if(engine){if(!frame)frame=requestAnimationFrame(tick);return;}if(starting)return;starting=true;try{if(new URLSearchParams(location.search).get('renderer')==='software')throw Error('Static renderer requested');const {createHero}=await import('./hero-renderer.js');if(!allowed())return;engine=createHero(canvas,innerWidth<700);hero.dataset.renderer='webgl';hero.dataset.particles=String(engine.count);clearTimeout(revealDeadline);reveal();if(visible)frame=requestAnimationFrame(tick);}catch{failed=true;hero.dataset.renderer='static';reveal();}finally{starting=false;}}
new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;document.body.classList.toggle('hero-in-view',visible);if(visible)start();else stop();},{threshold:.01}).observe(hero);
hero.addEventListener('pointermove',event=>{if(event.pointerType==='touch')return;const box=hero.getBoundingClientRect();pointer.x=(event.clientX-box.left)/box.width*2-1;pointer.y=(event.clientY-box.top)/box.height*2-1;},{passive:true});hero.addEventListener('pointerleave',()=>{pointer.x=pointer.y=0;});
canvas.addEventListener('webglcontextlost',event=>{event.preventDefault();failed=true;stop();hero.dataset.renderer='static';});
function preference(){if(!allowed())finishLoader();if(allowed()){canvas.hidden=false;start();}else{stop();canvas.hidden=true;reveal();}}
reduced.addEventListener('change',preference);window.addEventListener('effectschange',preference);document.addEventListener('visibilitychange',preference);window.addEventListener('resize',()=>{fitHeader();engine?.resize();if(engine)hero.dataset.particles=String(engine.count);});window.addEventListener('pagehide',event=>{stop();if(!event.persisted)engine?.dispose();});window.addEventListener('pageshow',()=>start());
if(!allowed())reveal();
// Keep existing enhancements below the hero lazy. Native images/controls are the fallback.
let scrolled=scrollY>0;const pendingEnhancements=[];
function enhance(){for(const item of pendingEnhancements)if(scrolled&&item.near&&!item.loaded&&allowed()){item.loaded=true;import(item.path).catch(()=>{});item.observer.disconnect();}}
window.addEventListener('scroll',()=>{if(scrollY>8)scrolled=true;enhance();},{passive:true});
for(const [selector,path]of[['.motion-case','./scroll.js'],['#about','./scene.js']]){const target=document.querySelector(selector);if(!target)continue;const item={path,near:false,loaded:false};item.observer=new IntersectionObserver(entries=>{item.near=entries[0].intersectionRatio>0;enhance();},{threshold:.01});pendingEnhancements.push(item);item.observer.observe(target);}
let viewerLoaded=false;document.addEventListener('pointerover',event=>{if(!viewerLoaded&&event.target.closest('[data-image],.tile-project')&&allowed()){viewerLoaded=true;import('./viewer.js?v=20261111-5').catch(()=>{});}}, {passive:true});document.addEventListener('focusin',event=>{if(!viewerLoaded&&event.target.closest('[data-image],.tile-project')&&allowed()){viewerLoaded=true;import('./viewer.js?v=20261111-5').catch(()=>{});}});
