export const clamp = x => Math.max(0, Math.min(1, x));
export const mix = (a,b,t) => a + (b-a)*t;
export const ease = t => {t=clamp(t);return t<.5 ? 4*t*t*t : 1-Math.pow(-2*t+2,3)/2;};
export function fitRect(width,height,box) {
  const ratio=Math.min(box.width/width,box.height/height);
  const w=width*ratio,h=height*ratio;
  return {left:box.left+(box.width-w)/2,top:box.top+(box.height-h)/2,width:w,height:h};
}
export function sourceFrame(image,clip,viewport) {
  const left=Math.max(image.left,clip.left,0),top=Math.max(image.top,clip.top,0);
  const right=Math.min(image.left+image.width,clip.left+clip.width,viewport.width);
  const bottom=Math.min(image.top+image.height,clip.top+clip.height,viewport.height);
  if(right-left<2||bottom-top<2)return null;
  return {rect:{left,top,width:right-left,height:bottom-top},crop:[(left-image.left)/image.width,1-(bottom-image.top)/image.height,(right-left)/image.width,(bottom-top)/image.height]};
}
export const flat = rect => ({...rect,rx:0,ry:0,rz:0,z:0,bend:0,alpha:1,crop:[0,0,1,1],shine:0});
export function blendPose(a,b,t) {
  const pose={};for(const key of ['left','top','width','height','rx','ry','rz','z','bend','alpha','shine'])pose[key]=mix(a[key]??0,b[key]??0,t);
  pose.crop=a.crop.map((v,i)=>mix(v,b.crop[i],t));return pose;
}
export function liftPose(from,to,t,closing=false,compact=false) {
  const curve=ease(t),lift=Math.sin(Math.PI*t),pose=blendPose(from,to,curve);
  const strength=compact?.55:1,sign=closing?-1:1;
  pose.top-=lift*35*strength;
  pose.left-=lift*22*strength;
  pose.ry+=sign*lift*.46*strength;
  pose.rx+=lift*.11*strength;pose.rz-=sign*lift*.035*strength;
  pose.z+=lift*65*strength;pose.bend+=lift*.075*strength;pose.shine=lift*.13;
  return pose;
}
export function galleryPose(rect,t,incoming,direction,compact=false) {
  const p=ease(t),amount=incoming?1-p:p,pose=flat(rect),sign=(incoming?1:-1)*direction;
  pose.left+=sign*amount*(rect.width+(compact?70:150));
  pose.z=-amount*(compact?160:340);pose.ry=-sign*amount*.78;
  pose.rx=amount*.06;pose.rz=sign*Math.sin(Math.PI*t)*.025;
  pose.bend=Math.sin(Math.PI*t)*.08;pose.alpha=clamp((1-amount)*2.5);pose.shine=Math.sin(Math.PI*t)*.1;
  return pose;
}
