export const clamp=(value,min,max)=>Math.max(min,Math.min(max,value));
export function configuration(compact=false){return compact?{columns:18,rows:11,anchors:[[3,3],[8,7],[14,3]]}:{columns:26,rows:13,anchors:[[5,4],[13,9],[21,4]]};}
export function seed(x,y){return ((Math.sin(x*127.1+y*311.7)*43758.5453)%1+1)%1;}
export function heightTarget(x,y,pointer,key=false,compact=false){
  const base=.2+seed(x,y)*.32+Math.sin(x*.63+y*.48)**2*.16+(key?.15:0);
  if(!pointer)return base;
  const dx=x-pointer.x,dy=y-pointer.y,distance=dx*dx+dy*dy;
  const radius=compact?2.15:2.65;
  const mound=Math.exp(-distance/(2*radius*radius))*(compact?1.25:1.8);
  return base+mound*(.83+seed(x+4,y+7)*.24);
}
export function spring(value,velocity,target,elapsed){
  const dt=clamp(elapsed,0,50)/1000,steps=Math.max(1,Math.ceil(dt/(1/120))),step=dt/steps;
  for(let i=0;i<steps;i++){const acceleration=225*(target-value)-25*velocity;velocity+=acceleration*step;value+=velocity*step;}
  if(Math.abs(value-target)<.0008&&Math.abs(velocity)<.008)return{value:target,velocity:0,settled:true};
  return{value,velocity,settled:false};
}
