/* GSAP SplitText is reused; the surrounding choreography is independently authored. */
(() => {
 const reduced=matchMedia('(prefers-reduced-motion: reduce)'),compact=matchMedia('(max-width:700px)'),fine=matchMedia('(hover:hover) and (pointer:fine)');
 let context,splits=[],cleanups=[],entered=false,refreshTimer;
 function allowed(){let saved;try{saved=localStorage.getItem('sv-effects');}catch{}return !reduced.matches&&window.portfolioEffects!==false&&saved!=='off';}
 function teardown(){for(const clean of cleanups.splice(0))clean();context?.revert();context=null;for(const split of splits.splice(0))split.revert();document.body.dataset.motionSystem='static';}
 function setup(){
  teardown();const g=window.gsap,ST=window.ScrollTrigger,Split=window.SplitText;if(!allowed()||!g||!ST||!Split)return;
  g.registerPlugin(ST,Split);
  try{
   context=g.context(()=>{
    const split=(element,options)=>{const instance=Split.create(element,{aria:'auto',...options});splits.push(instance);return instance;};
    const home=document.body.classList.contains('motion-home');
    if(home){
     const reveal=!entered;
     document.querySelectorAll('.poster-title>span').forEach((line,index)=>split(line,{type:'words',mask:'words',wordsClass:'motion-word',onSplit(self){return reveal?g.from(self.words,{yPercent:112,rotationX:-65,filter:'blur(5px)',transformOrigin:'50% 100%',duration:.95,delay:index*.12,stagger:.055,ease:'power4.out'}):g.to(self.words,{yPercent:0,rotationX:0,filter:'blur(0px)',duration:0});}}));
     if(reveal){split(document.querySelector('.poster-context p'),{type:'words',wordsClass:'motion-word',onSplit(self){return g.from(self.words,{y:10,filter:'blur(6px)',duration:.7,delay:.3,stagger:.025,ease:'power3.out'});}});}
     entered=true;
     const panel=document.querySelector('.poster-inner');
     g.to('.poster-title',{y:compact.matches?-24:-65,xPercent:compact.matches?0:-3,rotation:compact.matches?0:-1.5,scale:.97,transformOrigin:'left center',ease:'none',scrollTrigger:{trigger:panel,start:'top top',end:'bottom top',scrub:.7}});
     g.to('.poster-bottom',{y:-22,ease:'none',scrollTrigger:{trigger:panel,start:'top top',end:'bottom top',scrub:.6}});
     const proof=document.querySelector('.poster-proof');
     g.fromTo(proof.querySelector('.hero-showcase'),{rotationX:compact.matches?8:17,rotationZ:compact.matches?-3:-6,scale:compact.matches?.88:.76,y:60},{rotationX:0,rotationZ:0,scale:1,y:0,ease:'none',scrollTrigger:{trigger:proof,start:'top 90%',end:'center center',scrub:.85,invalidateOnRefresh:true}});
     for(const heading of document.querySelectorAll('.case-title,.reel-heading,.portal-heading h2,#about-title')){
      const section=heading.closest('.case,.project-reel,.photography-portal,.about-shell')||heading;
      split(heading,{type:'words,lines',mask:'lines',autoSplit:true,wordsClass:'motion-word',onSplit(self){return g.from(self.words,{yPercent:110,rotationX:-35,scaleY:1.16,transformOrigin:'50% 100%',duration:1,stagger:.07,ease:'power3.out',scrollTrigger:{trigger:section,start:'top 88%',end:'top 48%',scrub:.55}});}});
     }
     const quote=document.querySelector('.case-note');
     split(quote,{type:'words',wordsClass:'motion-word',onSplit(self){return g.from(self.words,{rotationX:-40,y:15,filter:'blur(2px)',transformOrigin:'left bottom',stagger:.09,ease:'none',scrollTrigger:{trigger:quote,start:'top 88%',end:'top 55%',scrub:.5}});}});
     document.querySelectorAll('.about-copy p').forEach(paragraph=>g.from(paragraph,{y:22,ease:'none',scrollTrigger:{trigger:paragraph,start:'top 92%',end:'top 68%',scrub:.6}}));
     const timeline=document.querySelector('.timeline');
     g.fromTo(timeline,{'--timeline-progress':0},{'--timeline-progress':1,ease:'none',scrollTrigger:{trigger:timeline,start:'top 72%',end:'bottom 55%',scrub:.4}});
     timeline.querySelectorAll('.entry>div').forEach(entry=>g.from(entry,{x:compact.matches?8:24,ease:'none',scrollTrigger:{trigger:entry,start:'top 94%',end:'top 65%',scrub:.6}}));
     const portal=document.querySelector('.photography-portal');
     const fan=g.timeline({scrollTrigger:{trigger:portal,start:'top 95%',end:'bottom 25%',scrub:.9}});
     portal.querySelectorAll('.portal-print').forEach((print,index)=>fan.fromTo(print,{xPercent:(1-index)*(compact.matches?24:60),y:75+Math.abs(index-1)*50,rotation:(index-1)*3,scale:.82},{xPercent:0,y:(index-1)*-18,rotation:[-9,2,10][index],scale:1,ease:'none'},0));
     const toolkit=document.querySelector('.kinetic-toolkit'),track=toolkit.querySelector('.toolkit'),viewport=toolkit.querySelector('.toolkit-window');
     g.fromTo(track,{x:0},{x:()=>-Math.max(0,track.scrollWidth-viewport.clientWidth),ease:'none',scrollTrigger:{trigger:toolkit,start:'top 80%',end:'bottom 20%',scrub:.6,invalidateOnRefresh:true}});
     const skew=g.quickTo(track,'skewX',{duration:.45,ease:'power3.out'});let settle;
     ST.create({trigger:toolkit,start:'top bottom',end:'bottom top',onUpdate(self){skew(g.utils.clamp(-4,4,-self.getVelocity()/400));clearTimeout(settle);settle=setTimeout(()=>skew(0),120);}});
     cleanups.push(()=>{clearTimeout(settle);skew.tween.kill();});
     const email=document.querySelector('.email');
     const letters=split(email,{type:'chars',charsClass:'contact-char',ignore:'svg'});let hoverTween;
     const hover=()=>{hoverTween?.kill();hoverTween=g.fromTo(letters.chars,{y:0,rotation:0},{keyframes:[{y:-10,rotation:-3},{y:0,rotation:0}],duration:.55,stagger:.025,ease:'power2.out'});};
     email.addEventListener('pointerenter',hover);email.addEventListener('focus',hover);cleanups.push(()=>{email.removeEventListener('pointerenter',hover);email.removeEventListener('focus',hover);hoverTween?.kill();});
    }else if(document.body.classList.contains('motion-photo')){
     const title=document.querySelector('.intro h1');split(title,{type:'words',wordsClass:'motion-word',onSplit(self){return g.from(self.words,{y:35,rotationX:-25,filter:'blur(5px)',duration:.9,stagger:.1,ease:'power4.out'});}});
    }
    if(fine.matches){
     document.querySelectorAll('.poster-primary,.reel-open,.portal-heading>a,.resume-link,.motion-photo .back,.motion-photo .tools button:not(:disabled)').forEach(button=>{
      const x=g.quickTo(button,'x',{duration:.45,ease:'power3.out'}),y=g.quickTo(button,'y',{duration:.45,ease:'power3.out'});
      const move=event=>{if(event.pointerType!=='mouse')return;const box=button.getBoundingClientRect();x((event.clientX-box.left-box.width/2)*.12);y((event.clientY-box.top-box.height/2)*.18);};
      const reset=()=>{x(0);y(0);};button.addEventListener('pointermove',move);button.addEventListener('pointerleave',reset);button.addEventListener('blur',reset);addEventListener('scroll',reset,{passive:true});
      cleanups.push(()=>{button.removeEventListener('pointermove',move);button.removeEventListener('pointerleave',reset);button.removeEventListener('blur',reset);removeEventListener('scroll',reset);x.tween.kill();y.tween.kill();});
     });
    }
   });document.body.dataset.motionSystem='active';delete document.body.dataset.motionError;window.ScrollTrigger.refresh();
  }catch(error){teardown();document.body.dataset.motionError=error.message;console.warn('Motion enhancements unavailable',error);}
 }
 function init(){setup();document.fonts?.ready.then(()=>window.ScrollTrigger?.refresh());}
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
 addEventListener('effectschange',setup);reduced.addEventListener('change',setup);compact.addEventListener('change',setup);fine.addEventListener('change',setup);
 addEventListener('storage',event=>{if(event.key==='sv-effects')setup();});
 document.addEventListener('photomodechange',()=>requestAnimationFrame(()=>window.ScrollTrigger?.refresh()));
 document.querySelectorAll('details').forEach(details=>details.addEventListener('toggle',()=>window.ScrollTrigger?.refresh()));
 addEventListener('resize',()=>{clearTimeout(refreshTimer);refreshTimer=setTimeout(()=>window.ScrollTrigger?.refresh(),180);});
 addEventListener('pagehide',()=>{clearTimeout(refreshTimer);teardown();});addEventListener('pageshow',event=>{if(event.persisted)setup();});
})();
