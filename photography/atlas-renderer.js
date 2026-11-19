import {fragmentLayer} from './photo-fragments.js';
import {THREE,mediaMaterial,makeRenderer} from '../fluid-media.js?v=20261111-5';
import {atlasIndex,clamp} from '../fluid-motion.mjs';
// A threshold stays attached to each small image cell as the tile moves.
function atlasMaterial(texture, viewport, pixelRatio) {
 const material = mediaMaterial(texture);
 material.uniforms.uViewport = {value:viewport};
 material.uniforms.uPixelRatio = {value:pixelRatio};
 material.uniforms.uTileSize = {value:new THREE.Vector2(1,1)};
 material.fragmentShader = `
 varying vec2 vUv;
 uniform sampler2D uMap;
 uniform vec2 uViewport, uTileSize;
 uniform float uPixelRatio, uTime, uVelocity, uOpacity;
 void main() {
   vec2 xy = gl_FragCoord.xy / uPixelRatio;
   vec2 edge = min(xy, uViewport - xy);
   float band = clamp(min(uViewport.x,uViewport.y) * .26, 64., 180.);
   float fade = 1. - smoothstep(0., band, min(edge.x,edge.y));
   vec2 grid = max(floor(uTileSize / 5.), vec2(1.));
   vec2 cell = floor(vUv * grid);
   float noise = fract(sin(dot(cell,vec2(12.9898,78.233))) * 43758.5453);
   float alpha = 1. - smoothstep(noise * .75, noise * .75 + .25, fade);
   if (alpha < .005) discard;
   vec2 uv = mix(vUv, (cell + .5) / grid, fade);
   uv.x += sin(uv.y * 12. + uTime) * uVelocity * .0006;
   gl_FragColor = vec4(texture2D(uMap,clamp(uv,0.,1.)).rgb,alpha * uOpacity);
   #include <tonemapping_fragment>
   #include <colorspace_fragment>
 }`;
 return material;
}
export function createAtlas(canvas,wake){
 const fragments=fragmentLayer(canvas.parentElement);
 const renderer=makeRenderer(canvas),scene=new THREE.Scene(),camera=new THREE.PerspectiveCamera(40,1,1,6000),geometry=new THREE.PlaneGeometry(1,1,16,12),tiles=new Map(),textures=new Map(),ray=new THREE.Raycaster(),ndc=new THREE.Vector2();let width=1,height=1,dead=false;
 const viewport=new THREE.Vector2();
 const placeholder=new THREE.DataTexture(new Uint8Array([100,130,155,0]),1,1);placeholder.needsUpdate=true;
 function texture(src){if(textures.has(src))return textures.get(src);const entry={texture:null,failed:false};textures.set(src,entry);const image=new Image();image.onload=()=>{if(dead)return;entry.texture=new THREE.Texture(image);entry.texture.colorSpace=THREE.SRGBColorSpace;entry.texture.minFilter=THREE.LinearFilter;entry.texture.generateMipmaps=false;entry.texture.needsUpdate=true;wake();};image.onerror=()=>{entry.failed=true;wake();};image.src=src;return entry;}
 function resize(){const r=canvas.getBoundingClientRect();width=r.width;height=r.height;viewport.set(width,height);renderer.setSize(width,height,false);camera.aspect=width/Math.max(1,height);camera.position.z=height/(2*Math.tan(THREE.MathUtils.degToRad(20)));camera.updateProjectionMatrix();}resize();
 function reset(){for(const mesh of tiles.values()){scene.remove(mesh);mesh.material.dispose();}tiles.clear();}
 function render(cells,records,zoom,velocity,time,motion){
  fragments.begin(width,height,time);
  if(!records.length){renderer.clear();return;}const keep=new Set(cells.map(c=>`${c.col},${c.row}`));for(const[key,mesh]of tiles)if(!keep.has(key)){scene.remove(mesh);mesh.material.dispose();tiles.delete(key);}
  const speed=clamp(Math.hypot(velocity.x,velocity.y)/500,0,2);
  for(const cell of cells){const key=`${cell.col},${cell.row}`,index=atlasIndex(cell.col,cell.row,records.length),record=records[index],asset=texture(record.src);let mesh=tiles.get(key);if(!mesh){mesh=new THREE.Mesh(geometry,atlasMaterial(placeholder,viewport,renderer.getPixelRatio()));tiles.set(key,mesh);scene.add(mesh);}const aspect=record.width/record.height,w=Math.min(265,250*aspect),h=w/aspect;mesh.scale.set(w*zoom,h*zoom,1);mesh.material.uniforms.uTileSize.value.set(w*zoom,h*zoom);mesh.position.set(cell.x,cell.y+(motion?Math.sin(time*.45+cell.col*.7+cell.row)*4:0),motion?-Math.hypot(cell.x,cell.y)*.025:0);mesh.rotation.set(motion?clamp(velocity.y/20000,-.08,.08):0,motion?clamp(velocity.x/20000,-.08,.08):0,motion?Math.sin(cell.col*3+cell.row)*.012:0);mesh.material.uniforms.uMap.value=asset.texture||placeholder;mesh.material.uniforms.uOpacity.value=asset.texture?1:0;mesh.material.uniforms.uTime.value=time;mesh.material.uniforms.uBend.value=motion?speed*10:0;mesh.material.uniforms.uVelocity.value=motion?speed*.7:0;mesh.userData.index=index;mesh.visible=!!asset.texture;}
  renderer.render(scene,camera);
  if (motion) {
    const origin=canvas.getBoundingClientRect();
    for (const mesh of tiles.values()) {
      if (!mesh.visible) continue;
      const box=rect(mesh);
      fragments.draw(mesh.material.uniforms.uMap.value.image,box.left-origin.left,box.top-origin.top,box.width,box.height);
    }
  }
 }
 function rect(mesh){mesh.updateMatrixWorld();const box=canvas.getBoundingClientRect(),points=[[-.5,-.5],[.5,.5]].map(([x,y])=>new THREE.Vector3(x,y,0).applyMatrix4(mesh.matrixWorld).project(camera)),left=box.left+(points[0].x*.5+.5)*width,top=box.top+(-points[1].y*.5+.5)*height;return{left,top,width:(points[1].x-points[0].x)*width*.5,height:(points[1].y-points[0].y)*height*.5};}
 function hit(x,y){const box=canvas.getBoundingClientRect();ndc.set((x-box.left)/width*2-1,-(y-box.top)/height*2+1);ray.setFromCamera(ndc,camera);const result=ray.intersectObjects([...tiles.values()].filter(m=>m.visible),false)[0];return result?{index:result.object.userData.index,rect:rect(result.object)}:null;}
 function center(){let best=null,distance=Infinity;for(const mesh of tiles.values()){if(!mesh.visible)continue;const d=Math.hypot(mesh.position.x,mesh.position.y);if(d<distance){distance=d;best=mesh;}}return best?{index:best.userData.index,rect:rect(best)}:null;}
 return{render,resize,reset,hit,center,dispose(){fragments.canvas.remove();dead=true;reset();geometry.dispose();placeholder.dispose();textures.forEach(t=>t.texture?.dispose());renderer.dispose();}};
}
