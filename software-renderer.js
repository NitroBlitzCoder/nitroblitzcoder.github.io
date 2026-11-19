// Canvas fallback for browsers without WebGL. Uses the same model geometry.
import * as THREE from 'three';
export class SoftwareRenderer {
 constructor(canvas){this.canvas=canvas;this.ctx=canvas.getContext('2d');if(!this.ctx)throw Error('Canvas unavailable');this.ratio=1;this.isSoftware=true;this.cache=new WeakMap();this.outputColorSpace=THREE.SRGBColorSpace;}
 setPixelRatio(n){this.ratio=Math.min(n,1.25)}
 setClearColor(){}
 setSize(w,h){this.w=w;this.h=h;this.canvas.width=w*this.ratio;this.canvas.height=h*this.ratio;this.ctx.setTransform(this.ratio,0,0,this.ratio,0,0)}
 render(scene,camera){if(!this.w||!this.h)return;scene.updateMatrixWorld(true);camera.updateMatrixWorld(true);const vp=new THREE.Matrix4().multiplyMatrices(camera.projectionMatrix,camera.matrixWorldInverse);const light=new THREE.Vector3(-.4,.8,.5).normalize();const side=new THREE.Vector3(.6,.3,-.8).normalize();const ctx=this.ctx,triangles=[];const v=new THREE.Vector3(),a=new THREE.Vector3(),b=new THREE.Vector3(),c=new THREE.Vector3(),ab=new THREE.Vector3(),ac=new THREE.Vector3(),normal=new THREE.Vector3(),normalMatrix=new THREE.Matrix3();
 scene.traverse(mesh=>{if(!mesh.isMesh||!mesh.visible)return;const geometry=mesh.geometry,pos=geometry.attributes.position;if(!pos)return;const index=geometry.index;const mat=Array.isArray(mesh.material)?mesh.material[0]:mesh.material;if(!mat||!mat.visible)return;const count=pos.count;const projected=new Float32Array(count*3);const world=new Float32Array(count*3);const mvp=new THREE.Matrix4().multiplyMatrices(vp,mesh.matrixWorld);for(let i=0;i<count;i++){v.fromBufferAttribute(pos,i).applyMatrix4(mvp);projected[i*3]=(v.x*.5+.5)*this.w;projected[i*3+1]=(-v.y*.5+.5)*this.h;projected[i*3+2]=v.z;v.fromBufferAttribute(pos,i).applyMatrix4(mesh.matrixWorld);world[i*3]=v.x;world[i*3+1]=v.y;world[i*3+2]=v.z;}
 const color=(mat.color||new THREE.Color(.5,.5,.5)).clone().convertLinearToSRGB();const n=index?index.count:count;normalMatrix.getNormalMatrix(mesh.matrixWorld);const normals=geometry.attributes.normal;
 for(let i=0;i<n;i+=3){const ia=(index?index.getX(i):i)*3,ib=(index?index.getX(i+1):i+1)*3,ic=(index?index.getX(i+2):i+2)*3;const z=(projected[ia+2]+projected[ib+2]+projected[ic+2])/3;if(z>1||z< -1)continue;a.fromArray(world,ia);b.fromArray(world,ib);c.fromArray(world,ic);ab.subVectors(b,a);ac.subVectors(c,a);normal.crossVectors(ab,ac).normalize();const facing=normal.dot(v.subVectors(camera.position,a));if(facing<0&&mat.side!==THREE.DoubleSide)continue;if(facing<0)normal.negate();const intensity=.28+Math.max(0,normal.dot(light))*.62;const red=Math.max(0,normal.dot(side))*.23;let r=Math.min(255,color.r*255*intensity+red*100),g=Math.min(255,color.g*255*intensity+red*10),bl=Math.min(255,color.b*255*intensity+red*15);if(mat.emissive){r=Math.min(255,r+mat.emissive.r*80);g=Math.min(255,g+mat.emissive.g*80);bl=Math.min(255,bl+mat.emissive.b*80)}triangles.push([z,projected[ia],projected[ia+1],projected[ib],projected[ib+1],projected[ic],projected[ic+1],`rgb(${r|0},${g|0},${bl|0})`]);}
 });triangles.sort((a,b)=>b[0]-a[0]);ctx.clearRect(0,0,this.w,this.h);for(const t of triangles){ctx.beginPath();ctx.moveTo(t[1],t[2]);ctx.lineTo(t[3],t[4]);ctx.lineTo(t[5],t[6]);ctx.closePath();ctx.fillStyle=t[7];ctx.fill();ctx.strokeStyle=t[7];ctx.lineWidth=.45;ctx.stroke();}
 scene.traverseVisible(cloud => {
   if (!cloud.isPoints) return;
   const {pointer, strength, tint} = cloud.material.uniforms;
   const transform = new THREE.Matrix4().multiplyMatrices(vp,cloud.matrixWorld);
   const positions = cloud.geometry.attributes.position;
   const px = (pointer.value.x + 1) * this.w / 2;
   const py = (1 - pointer.value.y) * this.h / 2;
   ctx.fillStyle = tint.value.getStyle();
   for (let i = 0; i < positions.count; i++) {
     v.fromBufferAttribute(positions,i).applyMatrix4(transform);
     if (v.z < -1 || v.z > 1) continue;
     let x = (v.x + 1) * this.w / 2, y = (1 - v.y) * this.h / 2;
     const dx = x - px, dy = y - py, distance = Math.hypot(dx,dy);
     if (distance < 100 && strength.value > .001) {
       const push = 48 * strength.value * (1-distance/100)**2;
       x += push * (dx/Math.max(1,distance) + .48*Math.sin(i));
       y += push * (dy/Math.max(1,distance) + .48*Math.cos(i));
     }
     const radius = .7 + (i % 5) * .1;
     ctx.globalAlpha = .5 + (i % 7)/14;
     ctx.fillRect(x-radius,y-radius,2*radius,2*radius);
   }
 });
 ctx.globalAlpha = 1;
 }
}
