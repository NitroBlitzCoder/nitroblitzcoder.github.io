import {fragmentLayer} from './photo-fragments.js';
// One viewport-sized field of square cells serves every visible thumbnail.
// Offset it into each image's coordinate system; captions and the viewer stay crisp.
const wall = document.querySelector('.wall');
const fragments = fragmentLayer(document.body);
const reduced = matchMedia('(prefers-reduced-motion: reduce)');
const nearby = new Set();
const enabled = () => !wall.hidden && !document.hidden && !reduced.matches &&
  window.portfolioEffects !== false && !document.body.classList.contains('still');
let lastPaint = -Infinity;
let frame = 0, band = 0, width = 0, height = 0;
function rebuild(w, h) {
  width = w; height = h;
  const cell = w < 600 ? 4 : 6;
  band = Math.min(180, Math.max(64, Math.min(w,h) * .26));
  const map = document.createElement('canvas');
  map.width = w; map.height = h;
  const ctx = map.getContext('2d');
  for (let y = 0; y < h; y += cell) {
    for (let x = 0; x < w; x += cell) {
      const distance = Math.min(x, y, w-x-cell, h-y-cell);
      const t = Math.min(1, Math.max(0, distance / band));
      const fade = 1 - t*t*(3-2*t);
      const seed = Math.sin(x*12.9898+y*78.233)*43758.5453;
      const step = Math.min(1, Math.max(0,(fade-(seed-Math.floor(seed))*.75)/.25));
      ctx.globalAlpha = 1-step*step*(3-2*step);
      ctx.fillRect(x,y,cell,cell);
    }
  }
  wall.style.setProperty('--edge-map','url('+map.toDataURL()+')');
  wall.style.setProperty('--edge-width',w+'px');
  wall.style.setProperty('--edge-height',h+'px');
}
function update(time) {
  frame = 0;
  if (!enabled() || document.querySelector('dialog[open]')) {
    fragments.canvas.hidden = true;
    for (const img of nearby) img.classList.remove('edge-dissolve');
    return;
  }
  const w = document.documentElement.clientWidth, h = innerHeight;
  if (time-lastPaint < 32) {schedule(); return;}
  lastPaint=time;
  fragments.canvas.hidden = false;
  fragments.begin(w,h,time/1000);
  let drawing = false;
  if (w !== width || h !== height) rebuild(w,h);
  const positions = [...nearby].map(img => [img,img.getBoundingClientRect()]);
  for (const [img,r] of positions) {
    const edge = r.width > 0 && Math.min(r.left,r.top,w-r.right,h-r.bottom) < band;
    img.classList.toggle('edge-dissolve',edge);
    if (!edge || img.parentElement.matches(':focus-visible')) continue;
    drawing = true;
    fragments.draw(img,r.left,r.top,r.width,r.height,getComputedStyle(img).objectFit === 'cover');
    img.style.setProperty('--edge-x',-Math.round(r.left)+'px');
    img.style.setProperty('--edge-y',-Math.round(r.top)+'px');
  }
  if (drawing) schedule();
}
function schedule() { if (!frame) frame = requestAnimationFrame(update); }
const observer = new IntersectionObserver(entries => {
  for (const {target,isIntersecting} of entries) {
    if (isIntersecting) nearby.add(target);
    else {nearby.delete(target);target.classList.remove('edge-dissolve');}
  }
  schedule();
});
wall.querySelectorAll('.photo img').forEach(img => observer.observe(img));
new ResizeObserver(schedule).observe(wall);
window.addEventListener('scroll',schedule,{passive:true});
window.addEventListener('resize',schedule);
for (const name of ['visibilitychange','photomodechange','photomotionchange','photoviewerclose'])
  document.addEventListener(name,schedule);
reduced.addEventListener('change',schedule);
