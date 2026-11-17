/* Visible content first; a short poster reveal yields to motion preferences. */
(() => {
 const hero=document.querySelector('.poster-hero'),reduced=matchMedia('(prefers-reduced-motion: reduce)');
 const motion=()=>!reduced.matches&&window.portfolioEffects!==false;
 const animations=[];
 if(motion()){
  hero.querySelectorAll('.poster-title>span').forEach((line,index)=>animations.push(line.animate([{clipPath:'inset(0 0 100% 0)',transform:'translateY(20px)'},{clipPath:'inset(0 -2% -12% 0)',transform:'none'}],{duration:780,delay:index*95,easing:'cubic-bezier(.16,1,.3,1)',fill:'backwards'})));
  animations.push(hero.querySelector('.poster-bottom').animate([{opacity:0,transform:'translateY(12px)'},{opacity:1,transform:'none'}],{duration:600,delay:240,easing:'cubic-bezier(.16,1,.3,1)',fill:'backwards'}));
 }
 const stop=()=>{if(!motion())animations.forEach(animation=>animation.cancel());};
 reduced.addEventListener('change',stop);addEventListener('effectschange',stop);
 new IntersectionObserver(entries=>document.body.classList.toggle('poster-at-top',entries[0].isIntersecting),{threshold:.05}).observe(hero.querySelector('.poster-inner'));
 // Keep existing lower-page enhancements while their redesign awaits review.
 for(const [selector,path]of[['.motion-case','./scroll.js'],['#about','./scene.js']]){
  const section=document.querySelector(selector);if(!section)continue;
  const observer=new IntersectionObserver(entries=>{if(entries[0].isIntersecting&&motion()){import(path).catch(()=>{});observer.disconnect();}},{rootMargin:'100px'});observer.observe(section);
 }
})();
