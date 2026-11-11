export const clamp=(value,min,max)=>Math.max(min,Math.min(max,value));
export const mod=(value,count)=>((value%count)+count)%count;
export const damp=(value,target,dt,rate=9)=>value+(target-value)*(1-Math.exp(-Math.min(dt,.08)*rate));
export function reelProgress(top,height,viewport,header,count){const distance=Math.max(1,height-(viewport-header));return clamp((header-top)/distance,0,1)*(count-1);}
export function atlasIndex(x,y,count){return count?mod(x+y*17,count):-1;}
export function atlasCells(x,y,width,height,zoom=1){const sx=330,sy=300,cx=Math.floor(x/sx),cy=Math.floor(y/sy),rx=Math.ceil(width/zoom/sx/2)+1,ry=Math.ceil(height/zoom/sy/2)+1,cells=[];for(let row=cy-ry;row<=cy+ry;row++)for(let col=cx-rx;col<=cx+rx;col++)cells.push({col,row,x:(col*sx-x)*zoom,y:(row*sy-y+(mod(col,2)?30:-30))*zoom});return cells;}
