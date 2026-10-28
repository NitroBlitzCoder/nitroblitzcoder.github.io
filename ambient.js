// One circuit plane: event-driven light travel, no idle render loop.
(() => {
  'use strict';
  const board = document.querySelector('.circuit-board');
  if (!board) return;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  const fine = matchMedia('(hover: hover) and (pointer: fine)');
  const shots = [...document.querySelectorAll('.image-button')];
  let enabled = window.portfolioEffects !== false && !reduce.matches;
  let pointerX = 0, pointerY = 0, pending = 0;
  function render() {
    pending = 0;
    if (document.hidden) return;
    board.style.setProperty('--board-x', `${enabled ? pointerX * 5 : 0}px`);
    board.style.setProperty('--board-y', `${enabled ? pointerY * 4 - Math.min(scrollY * .015, 32) : 0}px`);
    board.style.setProperty('--signal-offset', String(enabled ? -scrollY * .32 : 0));
  }
  function schedule() { if (!pending && !document.hidden) pending = requestAnimationFrame(render); }
  function resetShots() { shots.forEach(shot => { shot.style.removeProperty('--shot-x'); shot.style.removeProperty('--shot-y'); }); }
  document.addEventListener('pointermove', event => {
    if (!enabled || !fine.matches || event.pointerType !== 'mouse') return;
    pointerX = event.clientX / innerWidth - .5;
    pointerY = event.clientY / innerHeight - .5;
    schedule();
  }, {passive:true});
  document.documentElement.addEventListener('pointerleave', () => {pointerX = pointerY = 0; resetShots(); schedule();});
  window.addEventListener('scroll', schedule, {passive:true});
  window.addEventListener('resize', () => {resetShots(); schedule();});
  window.addEventListener('effectschange', event => {enabled = event.detail && !reduce.matches; resetShots(); schedule();});
  reduce.addEventListener('change', () => {enabled = !reduce.matches && window.portfolioEffects !== false; resetShots(); schedule();});
  fine.addEventListener('change', resetShots);
  window.addEventListener('blur', () => {pointerX = pointerY = 0; resetShots(); schedule();});
  window.addEventListener('pagehide', () => {cancelAnimationFrame(pending); pending = 0;});
  document.addEventListener('visibilitychange', () => {if(document.hidden){cancelAnimationFrame(pending);pending=0;resetShots();}else schedule();});
  shots.forEach(shot => {
    shot.addEventListener('pointermove', event => {
      if (!enabled || !fine.matches || event.pointerType !== 'mouse') return;
      const rect = shot.getBoundingClientRect();
      shot.style.setProperty('--shot-y', `${(event.clientX - rect.left) / rect.width * 2 - 1}deg`);
      shot.style.setProperty('--shot-x', `${1 - (event.clientY - rect.top) / rect.height * 2}deg`);
    }, {passive:true});
    shot.addEventListener('pointerleave', resetShots);
    shot.addEventListener('click', resetShots);
  });
  const signalPaths=document.querySelector('.board-signals');
  let pulse=null;
  window.addEventListener('projectflight', event => {
    if(!enabled||!signalPaths?.animate)return;
    pulse?.cancel();const direction=event.detail.direction||1;
    pulse=signalPaths.animate([{strokeDashoffset:String(900*direction),opacity:.3},{opacity:1,offset:.25},{strokeDashoffset:String(-900*direction),opacity:.3}],{duration:1100,easing:'cubic-bezier(.16,1,.3,1)'});
  });
  window.addEventListener('effectschange',()=>{if(!enabled)pulse?.cancel();});
  document.addEventListener('visibilitychange',()=>{if(document.hidden)pulse?.cancel();});
  schedule();
})();
