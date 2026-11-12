import Lenis from './vendor/lenis/lenis.mjs';
const reduced=matchMedia('(prefers-reduced-motion: reduce)');let scroll,ticker;
function release(){if(ticker)window.gsap?.ticker.remove(ticker);ticker=null;scroll?.destroy();scroll=null;window.portfolioScroll=null;}
function setup(){if(document.readyState==='loading')return;if(reduced.matches||window.portfolioEffects===false){release();return;}if(scroll)return;
 const coordinated=!!window.gsap;scroll=new Lenis({autoRaf:!coordinated,lerp:.085,smoothWheel:true,syncTouch:false,anchors:{offset:0},prevent:node=>!!node.closest('dialog,[data-lenis-prevent],input,select')});
 if(coordinated){ticker=time=>scroll?.raf(time*1000);window.gsap.ticker.add(ticker);window.gsap.ticker.lagSmoothing(0);if(window.ScrollTrigger)scroll.on('scroll',window.ScrollTrigger.update);}
 window.portfolioScroll=scroll;sync();window.dispatchEvent(new Event('portfolioscrollready'));
}
function sync(){if(!scroll)return;if(document.body.classList.contains('modal-open')||document.body.classList.contains('hero-loading-active')||document.hidden)scroll.stop();else scroll.start();}
new MutationObserver(sync).observe(document.body,{attributes:true,attributeFilter:['class']});document.addEventListener('visibilitychange',sync);window.addEventListener('effectschange',setup);reduced.addEventListener('change',setup);window.addEventListener('pagehide',release);window.addEventListener('pageshow',setup);document.addEventListener('DOMContentLoaded',setup,{once:true});setup();
