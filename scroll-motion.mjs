export const clamp=value=>Math.max(0,Math.min(1,value));
export const smooth=value=>{const t=clamp(value);return t*t*(3-2*t);};
export function presentation(top,height,viewport,compact=false){
  const travel=Math.min(height*.55,viewport*.38);
  const reveal=smooth((viewport*.96-top)/(viewport*.56+travel));
  const departure=smooth((-height*.45-top)/(viewport*.7));
  return {reveal,departure,strength:compact?.55:1};
}
export function coveredImage(box,width,height){
  const scale=Math.max(box.width/width,box.height/height),w=width*scale,h=height*scale;
  return {left:box.left+(box.width-w)/2,top:box.top+(box.height-h)/2,width:w,height:h};
}
export function imageCrop(image,frame){
  const left=Math.max(image.left,frame.left),top=Math.max(image.top,frame.top);
  const right=Math.min(image.left+image.width,frame.left+frame.width),bottom=Math.min(image.top+image.height,frame.top+frame.height);
  if(right<=left||bottom<=top)return null;
  return {left,top,width:right-left,height:bottom-top,crop:[(left-image.left)/image.width,1-(bottom-image.top)/image.height,(right-left)/image.width,(bottom-top)/image.height]};
}
export function follow(current,target,elapsed,time=65){return Math.abs(current-target)<.0005?target:current+(target-current)*(1-Math.exp(-Math.min(50,Math.max(0,elapsed))/time));}
