import {THREE,mediaMaterial,makeRenderer} from './fluid-media.js';
import {clamp} from './fluid-motion.mjs';
export function createReel(canvas,images){
 const renderer=makeRenderer(canvas),scene=new THREE.Scene(),camera=new THREE.PerspectiveCamera(38,1,1,6000),group=new THREE.Group();scene.add(group);
 const geometry=new THREE.PlaneGeometry(1,1,48,24),planes=images.map(image=>{const texture=new THREE.Texture(image);texture.colorSpace=THREE.SRGBColorSpace;texture.needsUpdate=true;texture.minFilter=THREE.LinearFilter;const material=mediaMaterial(texture),mesh=new THREE.Mesh(geometry,material),reflection=new THREE.Mesh(geometry,mediaMaterial(texture,true));scene.add(mesh,reflection);return{image,texture,material,mesh,reflection};});
 let width=1,height=1;
 function resize(){const rect=canvas.getBoundingClientRect();width=rect.width;height=rect.height;renderer.setSize(width,height,false);camera.aspect=width/height;camera.position.z=height/(2*Math.tan(THREE.MathUtils.degToRad(19)));camera.updateProjectionMatrix();}resize();
 function render(position,velocity,time,entrance,pointer,motion){
  const compact=width<700;camera.position.x=motion?pointer.x*8:0;camera.position.y=motion?-pointer.y*5:0;camera.lookAt(0,0,0);
  planes.forEach((plane,i)=>{const offset=i-position,aspect=plane.image.naturalWidth/plane.image.naturalHeight;let w=width*(compact?.8:.61),h=w/aspect;const limit=height*(compact?.47:.57);if(h>limit){h=limit;w=h*aspect;}const spread=width*(compact?.91:.7);const y=height*.035-Math.pow(Math.abs(offset),1.3)*height*.08;
   plane.mesh.position.set(offset*spread,y,-Math.abs(offset)*width*.16-(1-entrance)*120);plane.mesh.rotation.set(motion?pointer.y*.025:0,-offset*.32,offset*.025);plane.mesh.scale.set(w,h,1);
   const opacity=clamp(1-Math.abs(offset)*.34,.12,1);for(const mesh of[plane.mesh,plane.reflection]){mesh.material.uniforms.uTime.value=time;mesh.material.uniforms.uBend.value=motion?width*.035+Math.abs(velocity)*16:0;mesh.material.uniforms.uVelocity.value=motion?clamp(velocity,-3,3):0;mesh.material.uniforms.uOpacity.value=opacity;}
   plane.reflection.position.copy(plane.mesh.position);plane.reflection.position.y=y-h-14;plane.reflection.rotation.copy(plane.mesh.rotation);plane.reflection.scale.set(w,-h,1);plane.reflection.visible=!compact;
  });renderer.render(scene,camera);
 }
 function sourceRect(index){const mesh=planes[index].mesh;mesh.updateMatrixWorld();const box=canvas.getBoundingClientRect(),corners=[[-.5,-.5],[.5,-.5],[-.5,.5],[.5,.5]].map(([x,y])=>new THREE.Vector3(x,y,0).applyMatrix4(mesh.matrixWorld).project(camera));const left=Math.min(...corners.map(v=>(v.x*.5+.5)*width))+box.left,right=Math.max(...corners.map(v=>(v.x*.5+.5)*width))+box.left,top=Math.min(...corners.map(v=>(-.5*v.y+.5)*height))+box.top,bottom=Math.max(...corners.map(v=>(-.5*v.y+.5)*height))+box.top;return{left,top,width:right-left,height:bottom-top};}
 return{render,resize,sourceRect,clear(){renderer.clear();},dispose(){geometry.dispose();planes.forEach(p=>{p.texture.dispose();p.material.dispose();p.reflection.material.dispose();});renderer.dispose();}};
}
