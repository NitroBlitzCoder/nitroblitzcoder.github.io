/* Shared choreography: actual images retain their identity across scale, tilt and detail. */
(()=>{
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');let context;
 const allowed=()=>{let saved;try{saved=localStorage.getItem('sv-effects');}catch{}return !reduced.matches&&window.portfolioEffects!==false&&saved!=='off';};
 function setup(){context?.revert();context=null;const gsap=window.gsap,ScrollTrigger=window.ScrollTrigger;if(!gsap||!ScrollTrigger||!allowed())return;gsap.registerPlugin(ScrollTrigger);
  context=gsap.context(()=>{
   if(document.body.classList.contains('editorial-home')){
    const compact=innerWidth<850,hero=document.querySelector('.hero');
    const intro=gsap.timeline({scrollTrigger:{trigger:hero,start:'top top',end:'bottom top',scrub:.8}});
    intro.to('.hero-showcase',{x:compact?0:-110,y:compact?30:100,scale:compact?1:1.08,rotation:compact?0:4,ease:'none'},0)
     .to('.hero h1,.hero .intro-context',{y:compact?-15:-45,opacity:.42,ease:'none'},0)
     .to('.fragment-mosaic',{x:compact?-20:-65,y:-65,rotation:-7,ease:'none'},0)
     .to('.fragment-blender',{x:compact?20:75,y:45,rotation:9,ease:'none'},0);
    gsap.from('.reel-heading',{y:45,opacity:.45,scrollTrigger:{trigger:'.project-reel',start:'top 85%',end:'top 45%',scrub:.5}});
    document.querySelectorAll('.case').forEach(section=>gsap.from(section.querySelector('.case-heading'),{y:38,opacity:.5,scrollTrigger:{trigger:section,start:'top 90%',end:'top 55%',scrub:.6}}));
    const portal=document.querySelector('.photography-portal'),prints=[...portal.querySelectorAll('.portal-print')];
    const sequence=gsap.timeline({scrollTrigger:{trigger:portal,start:'top 95%',end:'bottom 25%',scrub:.85}});
    prints.forEach((print,i)=>sequence.fromTo(print,{xPercent:(1-i)*(compact?22:58),y:70+Math.abs(i-1)*55,rotation:(i-1)*3,scale:.82},{xPercent:0,y:(i-1)*-18,rotation:[-9,2,10][i],scale:1,ease:'none'},0));
    sequence.to('.portal-heading',{y:-22,ease:'none'},0);
   }else if(document.body.classList.contains('editorial-photo')){
    gsap.from('.intro h1',{y:18,opacity:.7,duration:.8,ease:'power3.out'});
   }
  });window.ScrollTrigger.refresh();
 }
 async function openFeatured(event){
  const link=event.currentTarget,feature=link.closest('.hero-showcase'),image=link.querySelector('img'),id=link.getAttribute('href'),trigger=document.querySelector(`${id} [data-image]`);if(!trigger)return;
  event.preventDefault();
  try{await import('./viewer.js?v=20261112-6');window.portfolioViewer.open(trigger,{source:()=>({rect:image.getBoundingClientRect(),crop:[0,0,1,1]}),focus:()=>link,beforeReturn:record=>{
   const section=record.trigger.closest('.case');image.src=record.src;image.alt=record.alt;link.href='#'+section.id;const title=section.querySelector('h2').innerText.replace(/\s+/g,' ').trim();feature.querySelector('.hero-feature-title').textContent=title;feature.querySelector('.hero-feature-description').textContent=section.querySelector('.case-context>p,.case-heading>p')?.innerText.replace(/\s+/g,' ').trim()||'';link.setAttribute('aria-label',`Explore ${title} from introduction`);
  }});}catch{document.querySelector(id)?.scrollIntoView({behavior:'instant'});trigger.click();}
 }
 function init(){const header=document.querySelector('.site-header');if(header){let previous=0;const measure=()=>{const height=header.getBoundingClientRect().height;if(height!==previous){previous=height;document.documentElement.style.setProperty('--site-header-height',height+'px');window.ScrollTrigger?.refresh();}};measure();if(window.ResizeObserver)new ResizeObserver(measure).observe(header);}
 document.querySelectorAll('[data-project-open]').forEach(link=>link.addEventListener('click',openFeatured));setup();document.fonts?.ready.then(()=>window.ScrollTrigger?.refresh());}
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
 window.addEventListener('effectschange',setup);reduced.addEventListener('change',setup);window.addEventListener('themechange',()=>window.ScrollTrigger?.refresh());document.addEventListener('photomodechange',()=>requestAnimationFrame(()=>window.ScrollTrigger?.refresh()));
 document.querySelectorAll('details').forEach(d=>d.addEventListener('toggle',()=>window.ScrollTrigger?.refresh()));
 let resizeTimer;window.addEventListener('resize',()=>{clearTimeout(resizeTimer);resizeTimer=setTimeout(setup,160);});
 window.addEventListener('pagehide',()=>context?.revert());window.addEventListener('pageshow',event=>{if(event.persisted)setup();});
})();
