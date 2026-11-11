import * as THREE from 'three';
export function createHero(canvas,compact){
 const renderer=new THREE.WebGLRenderer({canvas,alpha:true,antialias:false,powerPreference:'low-power'});
 renderer.setClearColor(0x0b0b0c,0);renderer.setPixelRatio(Math.min(devicePixelRatio||1,compact?1.15:1.5));
 const scene=new THREE.Scene(),camera=new THREE.PerspectiveCamera(42,1,.1,50);camera.position.z=11;
 const root=new THREE.Group();scene.add(root);
 const count=12000,positions=new Float32Array(count*3);
 // Deterministic toroidal ribbons: procedural geometry only, no textures.
 for(let i=0;i<count;i++){const t=i*2.399963229728653,u=(i*.61803398875%1)*Math.PI*2,r=.56+.19*Math.sin(t*3),radius=2.2+r*Math.cos(u);positions[i*3]=radius*Math.cos(t);positions[i*3+1]=radius*Math.sin(t);positions[i*3+2]=r*Math.sin(u)+.35*Math.sin(t*2);}
 const geo=new THREE.BufferGeometry();geo.setAttribute('position',new THREE.BufferAttribute(positions,3));
 const points=new THREE.Points(geo,new THREE.PointsMaterial({color:0xc6f135,size:compact?.024:.019,transparent:true,opacity:.85,depthWrite:false}));root.add(points);
 const wireGeo=new THREE.TorusKnotGeometry(1.72,.42,compact?120:180,12,2,3),wireMat=new THREE.MeshBasicMaterial({color:0xc6f135,wireframe:true,transparent:true,opacity:.15,depthWrite:false});const wire=new THREE.Mesh(wireGeo,wireMat);root.add(wire);
 function palette(){const color=getComputedStyle(document.documentElement).getPropertyValue('--blue').trim()||'#85b3ff';points.material.color.set(color);wireMat.color.set(color);}
 palette();window.addEventListener('themechange',palette);
 let x=0,y=0;
 function resize(){compact=innerWidth<700;geo.setDrawRange(0,Math.min(count,compact?4500:12000));renderer.setPixelRatio(Math.min(devicePixelRatio||1,compact?1.15:1.5));const box=canvas.getBoundingClientRect();renderer.setSize(box.width,box.height,false);camera.aspect=box.width/Math.max(1,box.height);camera.updateProjectionMatrix();root.position.set(compact?1.2:3.5,compact?-.65:0,0);root.scale.setScalar(compact?.95:1.25);}
 resize();
 return{get count(){return Math.min(count,compact?4500:12000);},resize,render(time,pointer,scroll){x+=(pointer.x-x)*.045;y+=(pointer.y-y)*.045;root.rotation.set(.35+y*.12+scroll*.3,time*.045+x*.13+scroll*.45,-.25+Math.sin(time*.08)*.08);root.position.y=(compact?-.65:0)-scroll*.75;wire.rotation.z=-time*.035;renderer.render(scene,camera);},dispose(){window.removeEventListener('themechange',palette);geo.dispose();points.material.dispose();wireGeo.dispose();wireMat.dispose();renderer.dispose();}};
}
