// A stack of projected wave fronts. Pointer wakes and expanding pulses displace the same surface.
const canvas = document.createElement('canvas');
canvas.className = 'wave-surface';
canvas.setAttribute('aria-hidden', 'true');
document.body.prepend(canvas);
const ctx = canvas.getContext('2d');
const reduced = matchMedia('(prefers-reduced-motion: reduce)');
let width, height, frame = 0, last = 0, elapsed = 0;
let cursor = null;
const wakes = [], pulses = [];
const active = () => ctx && !document.hidden && !reduced.matches &&
  window.portfolioEffects !== false && !document.body.classList.contains('still');

function size() {
  width = innerWidth; height = innerHeight;
  const ratio = Math.min(devicePixelRatio, 1.5);
  canvas.width = Math.round(width * ratio);
  canvas.height = Math.round(height * ratio);
  ctx?.setTransform(ratio,0,0,ratio,0,0);
}
function paint(now) {
  if (!active()) return;
  frame = requestAnimationFrame(paint);
  if (now-last < 31) return;
  elapsed += Math.min(65,now-last)/1000; last = now;
  const light = document.documentElement.dataset.theme === 'light';
  ctx.clearRect(0,0,width,height);
  const spacing = Math.max(15,height/44);
  const offset = scrollY*.115;
  const disturbances = cursor ? [...wakes,cursor] : wakes;
  for (let row=-7;row<height/spacing+8;row++) {
    ctx.beginPath();
    const baseline = row*spacing;
    for (let x=-16;x<width+18;x+=14) {
      const phase = x/width*7 + baseline/height*3.3 + offset/260;
      let y = baseline + Math.sin(phase+elapsed*.38)*32 + Math.cos(phase*1.7-elapsed*.28)*15;
      let dx = 0, dy = 0;
      for (const point of disturbances) {
        const vx=x-point.x, vy=y-point.y;
        const strength=Math.exp(-(vx*vx+vy*vy)/15500)*point.power;
        dx+=vx*strength;dy+=vy*strength;
      }
      for(const pulse of pulses) {
        const distance=Math.hypot(x-pulse.x,y-pulse.y);
        const crest=(distance-pulse.age*345)/24;
        dy+=Math.exp(-crest*crest)*Math.max(0,1-pulse.age/2)*34;
      }
      if(x===-16) ctx.moveTo(x+dx,y+dy); else ctx.lineTo(x+dx,y+dy);
    }
    const band=(1+Math.sin(row*.18+elapsed*.24))/2;
    ctx.strokeStyle=light ? `rgba(135,66,39,${.17+.24*band})` : `rgba(108,218,206,${.16+.34*band})`;
    ctx.lineWidth=.8+band*1.5;ctx.stroke();
  }
  for(const point of wakes) point.power*=.94;
  while(wakes.length && wakes[0].power<.025) wakes.shift();
  for(const pulse of pulses) pulse.age+=.033;
  while(pulses.length && pulses[0].age>=2) pulses.shift();
}
function sync() {
  cancelAnimationFrame(frame);
  document.body.classList.toggle('field-active',Boolean(active()));
  if(active()) {last=performance.now();frame=requestAnimationFrame(paint);}
  else {cursor=null;wakes.length=pulses.length=0;}
}
addEventListener('pointermove',event=>{
  if(!active()) return;
  if(cursor && Math.hypot(event.clientX-cursor.x,event.clientY-cursor.y)>18) {
    wakes.push({...cursor,power:.32});if(wakes.length>6) wakes.shift();
  }
  cursor={x:event.clientX,y:event.clientY,power:1.25};
},{passive:true});
addEventListener('pointerdown',event=>{
  if(active()){pulses.push({x:event.clientX,y:event.clientY,age:0});if(pulses.length>3)pulses.shift();}
},{passive:true});
document.addEventListener('pointerleave',()=>{cursor=null;});
addEventListener('pointerup',event=>{if(event.pointerType!=='mouse')cursor=null;});
addEventListener('resize',size);
for(const name of ['effectschange','pageshow']) addEventListener(name,sync);
document.addEventListener('visibilitychange',sync);
document.addEventListener('photomotionchange',sync);
reduced.addEventListener('change',sync);
size();sync();
