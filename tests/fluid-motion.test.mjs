import {test} from 'node:test';
import assert from 'node:assert/strict';
import {atlasCells,atlasIndex,damp,reelProgress} from '../fluid-motion.mjs';
test('scroll chapter maps header-aligned entrance and exit to exact project endpoints',()=>{
 const h=1600,v=900,header=80;
 assert.equal(reelProgress(header,h,v,header,3),0);
 assert.equal(reelProgress(header-(h-v+header)/2,h,v,header,3),1);
 assert.equal(reelProgress(header-(h-v+header),h,v,header,3),2);
 assert.equal(reelProgress(-99999,h,v,header,3),2);
 assert.equal(reelProgress(99999,h,v,header,3),0);
});
test('damping reaches the same position at different display refresh rates',()=>{
 const run=fps=>{let value=0;for(let i=0;i<fps;i++)value=damp(value,2,1/fps);return value;};
 assert.ok(Math.abs(run(30)-run(120))<1e-9);
});
test('all 253 photographs are reachable on a single atlas row and negative coordinates wrap',()=>{
 const indices=new Set(Array.from({length:253},(_,i)=>atlasIndex(i,0,253)));
 assert.equal(indices.size,253);assert.equal(atlasIndex(-1,0,253),252);assert.equal(atlasIndex(0,-1,253),236);assert.equal(atlasIndex(0,0,0),-1);
});
test('atlas maintains buffered coverage after long drags in every direction and at both zoom limits',()=>{
 for(const [x,y] of [[0,0],[330*.99,300*.99],[-99000,87300],[99999,-99999]])for(const zoom of [.45,2]){
  const cells=atlasCells(x,y,1440,900,zoom),xs=cells.map(c=>c.x),ys=cells.map(c=>c.y);
  assert.ok(Math.min(...xs)<-720&&Math.max(...xs)>720);assert.ok(Math.min(...ys)<-450&&Math.max(...ys)>450);
  assert.equal(new Set(cells.map(c=>`${c.col},${c.row}`)).size,cells.length);
 }
});
