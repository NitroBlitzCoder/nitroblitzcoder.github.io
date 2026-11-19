// Detach samples of each thumbnail into the space around its frame.
// Both layouts use CSS-pixel coordinates so the grains have the same scale.
const palette = new WeakMap();
function samples(image) {
  if (!image?.naturalWidth) return null;
  if (palette.has(image)) return palette.get(image);
  const canvas = document.createElement('canvas');
  canvas.width = 52;
  canvas.height = Math.max(1, Math.min(96, Math.round(52 * image.naturalHeight / image.naturalWidth)));
  const ctx = canvas.getContext('2d');
  ctx.drawImage(image,0,0,canvas.width,canvas.height);
  const bytes = ctx.getImageData(0,0,canvas.width,canvas.height).data;
  const colors = [];
  for (let i=0; i<bytes.length; i+=4) colors.push('rgb('+bytes[i]+','+bytes[i+1]+','+bytes[i+2]+')');
  const data = {colors, w:canvas.width, h:canvas.height};
  palette.set(image,data);
  return data;
}
export function fragmentLayer(host) {
  const canvas = document.createElement('canvas');
  canvas.className = 'photo-fragments';
  canvas.setAttribute('aria-hidden','true');
  host.append(canvas);
  const ctx = canvas.getContext('2d');
  let width=0, height=0, band=0, time=0;
  function begin(w,h,seconds) {
    w=Math.max(1,Math.round(w)); h=Math.max(1,Math.round(h));
    if (w!==width || h!==height) {
      width=canvas.width=w; height=canvas.height=h;
    }
    ctx.clearRect(0,0,w,h);
    band=Math.max(64,Math.min(180,Math.min(w,h)*.26));
    time=seconds;
  }
  function draw(image,left,top,w,h,cover=false) {
    if (w<1 || h<1 || left>width+band || top>height+band || left+w < -band || top+h < -band ||
        Math.min(left,top,width-left-w,height-top-h)>band) return;
    const data=samples(image);
    if (!data) return;
    const cols=Math.min(65,Math.max(3,Math.ceil(w/6)));
    const rows=Math.min(75,Math.max(3,Math.ceil(h/6)));
    const ratio=(w/h)/(image.naturalWidth/image.naturalHeight);
    const cropX=cover?Math.min(1,ratio):1, cropY=cover?Math.min(1,1/ratio):1;
    for(let row=0;row<rows;row++) for(let col=0;col<cols;col++) {
      const u=(col+.5)/cols,v=(row+.5)/rows;
      const x=left+u*w,y=top+v*h;
      const dx=Math.min(x,width-x),dy=Math.min(y,height-y);
      const distance=Math.min(dx,dy);
      if (distance>=band || distance < -48) continue;
      const edge=Math.min(1,1-distance/band);
      const bits=(Math.imul(col+19,73856093)^Math.imul(row+37,19349663))>>>0;
      const seed=(bits%1009)/1009, angle=((bits>>>12)%991)/991*6.283;
      const pull=Math.max(0,(edge-.5*seed)/(1-.5*seed));
      if (pull<.04) continue;
      const sideways=Math.sin(angle+time*.85)*pull*(26+52*seed);
      const drift=pull*(12+60*seed);
      const px=x+(dx<dy?(x<width/2?-drift:drift):sideways)+Math.cos(angle)*pull*21;
      const py=y+(dy<=dx?(y<height/2?-drift:drift):sideways)+Math.sin(angle)*pull*21;
      const sx=Math.min(data.w-1,Math.floor(((u-.5)*cropX+.5)*data.w));
      const sy=Math.min(data.h-1,Math.floor(((v-.5)*cropY+.5)*data.h));
      ctx.fillStyle=data.colors[sy*data.w+sx];
      ctx.globalAlpha=Math.min(1,pull*3)*(1-.55*pull);
      const size=(2.3+3.5*seed)*(1-.44*pull);
      ctx.fillRect(px,py,size,size);
    }
    ctx.globalAlpha=1;
  }
  return {canvas,begin,draw};
}
