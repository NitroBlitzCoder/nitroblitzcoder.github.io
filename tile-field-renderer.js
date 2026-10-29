import * as THREE from 'three';
import {RoomEnvironment} from 'three/addons/environments/RoomEnvironment.js';
import {configuration,heightTarget,spring,clamp} from './tile-field-motion.mjs';
function roundedShape(width,height,radius){
  const x=-width/2,y=-height/2,s=new THREE.Shape();
  s.moveTo(x+radius,y);s.lineTo(x+width-radius,y);s.quadraticCurveTo(x+width,y,x+width,y+radius);
  s.lineTo(x+width,y+height-radius);s.quadraticCurveTo(x+width,y+height,x+width-radius,y+height);
  s.lineTo(x+radius,y+height);s.quadraticCurveTo(x,y+height,x,y+height-radius);
  s.lineTo(x,y+radius);s.quadraticCurveTo(x,y,x+radius,y);s.closePath();return s;
}
export function createTileField(canvas){
  const renderer=new THREE.WebGLRenderer({canvas,alpha:true,antialias:true,powerPreference:'high-performance',preserveDrawingBuffer:true});
  renderer.setClearColor(0x09111d,0);renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.12;
  renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;renderer.shadowMap.autoUpdate=false;
  renderer.debug.onShaderError=()=>{throw Error('Tile material unavailable');};
  const scene=new THREE.Scene(),root=new THREE.Group();root.rotation.set(-.035,.055,-.018);scene.add(root);
  const generator=new THREE.PMREMGenerator(renderer),room=new RoomEnvironment();const environment=generator.fromScene(room,.035).texture;scene.environment=environment;room.dispose();generator.dispose();
  scene.add(new THREE.HemisphereLight(0xc2ddf1,0x06101d,1.15));
  const key=new THREE.DirectionalLight(0xe6f4ff,2.1);key.position.set(-7,8,13);key.castShadow=true;key.shadow.camera.left=key.shadow.camera.bottom=-20;key.shadow.camera.right=key.shadow.camera.top=20;key.shadow.camera.near=1;key.shadow.camera.far=50;key.shadow.bias=-.0006;key.shadow.normalBias=.025;scene.add(key);
  const rim=new THREE.DirectionalLight(0x719bc2,1.4);rim.position.set(8,-5,8);scene.add(rim);
  const floor=new THREE.Mesh(new THREE.PlaneGeometry(34,20),new THREE.ShadowMaterial({color:0x02060b,opacity:.55}));floor.position.z=-.025;floor.receiveShadow=true;root.add(floor);
  const camera=new THREE.PerspectiveCamera(35,1,.1,100),raycaster=new THREE.Raycaster(),pointerNdc=new THREE.Vector2(),plane=new THREE.Plane(),normal=new THREE.Vector3(),hit=new THREE.Vector3();
  const placeholder=new THREE.DataTexture(new Uint8Array([14,26,43,255]),1,1);placeholder.needsUpdate=true;
  const uniforms={uFrom:{value:placeholder},uTo:{value:placeholder},uBlend:{value:0},uPreview:{value:0},uGrid:{value:new THREE.Vector2(26,13)},uImageAspect:{value:1.54}};
  const material=new THREE.MeshStandardMaterial({color:0x52667d,metalness:.68,roughness:.27,envMapIntensity:.38});
  material.onBeforeCompile=shader=>{
    Object.assign(shader.uniforms,uniforms);
    shader.vertexShader=shader.vertexShader.replace('#include <common>','#include <common>\nattribute vec2 aGrid;attribute float aKey;uniform vec2 uGrid;varying vec2 vGridUv;varying float vFront;varying float vKey;');
    shader.vertexShader=shader.vertexShader.replace('#include <begin_vertex>','#include <begin_vertex>\nvGridUv=aGrid+(position.xy/.87+.5)/uGrid;vFront=smoothstep(.3,.9,normal.z);vKey=aKey;');
    shader.fragmentShader=shader.fragmentShader.replace('#include <common>','#include <common>\nuniform sampler2D uFrom;uniform sampler2D uTo;uniform float uBlend;uniform float uPreview;uniform float uImageAspect;uniform vec2 uGrid;varying vec2 vGridUv;varying float vFront;varying float vKey;');
    shader.fragmentShader=shader.fragmentShader.replace('#include <color_fragment>',`#include <color_fragment>
      vec2 imageUv=vGridUv;float aspect=uGrid.x/uGrid.y;
      if(aspect>uImageAspect)imageUv.x=(imageUv.x-.5)*aspect/uImageAspect+.5;else imageUv.y=(imageUv.y-.5)*uImageAspect/aspect+.5;
      float valid=step(0.,imageUv.x)*step(imageUv.x,1.)*step(0.,imageUv.y)*step(imageUv.y,1.);
      vec3 preview=mix(texture2D(uFrom,imageUv).rgb,texture2D(uTo,imageUv).rgb,uBlend);
      diffuseColor.rgb=mix(diffuseColor.rgb,preview,uPreview*vFront*valid*(1.-vKey*.88));`);
    shader.fragmentShader=shader.fragmentShader.replace('#include <opaque_fragment>','outgoingLight=mix(outgoingLight,preview*.88,uPreview*vFront*valid*(1.-vKey*.88));\n#include <opaque_fragment>');
    shader.fragmentShader=shader.fragmentShader.replace('#include <roughnessmap_fragment>','#include <roughnessmap_fragment>\nroughnessFactor=mix(roughnessFactor,.64,uPreview*vFront);');
    shader.fragmentShader=shader.fragmentShader.replace('#include <metalnessmap_fragment>','#include <metalnessmap_fragment>\nmetalnessFactor*=1.-uPreview*vFront*.94;');
  };
  material.customProgramCacheKey=()=> 'project-tile-field-1';
  let mesh,geometry,config,tiles=[],markers=[],width=0,height=0,compact=false,active=-1,pointer=null,blendTarget=0,previewTarget=0;
  const textureCache=new Map(),object=new THREE.Object3D(),color=new THREE.Color();
  function build(){
    if(mesh){root.remove(mesh);geometry.dispose();markers.forEach(m=>{root.remove(m);m.geometry.dispose();m.material.dispose();});}
    config=configuration(compact);const{columns,rows,anchors}=config;
    geometry=new THREE.ExtrudeGeometry(roundedShape(.78,.78,.12),{depth:.14,bevelEnabled:true,bevelThickness:.035,bevelSize:.045,bevelSegments:2,steps:1,curveSegments:4});geometry.translate(0,0,-.07);
    const grid=[],keys=[];tiles=[];
    for(let row=0;row<rows;row++)for(let col=0;col<columns;col++){
      const project=anchors.findIndex(([x,y])=>x===col&&y===row),value=heightTarget(col,row,null,project>=0,compact);
      tiles.push({col,row,project,value,velocity:0});grid.push(col/columns,(rows-1-row)/rows);keys.push(project>=0?1:0);
    }
    geometry.setAttribute('aGrid',new THREE.InstancedBufferAttribute(new Float32Array(grid),2));geometry.setAttribute('aKey',new THREE.InstancedBufferAttribute(new Float32Array(keys),1));
    mesh=new THREE.InstancedMesh(geometry,material,tiles.length);mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);mesh.castShadow=mesh.receiveShadow=true;mesh.frustumCulled=false;root.add(mesh);
    markers=anchors.map(()=>{const points=roundedShape(.865,.865,.15).getPoints(40).map(p=>new THREE.Vector3(p.x,p.y,.11));const marker=new THREE.LineLoop(new THREE.BufferGeometry().setFromPoints(points),new THREE.LineBasicMaterial({color:0xcde3f1,transparent:true,opacity:.85}));marker.matrixAutoUpdate=false;root.add(marker);return marker;});
    uniforms.uGrid.value.set(columns,rows);setActive(active);update(0,true);
  }
  function resize(){
    const box=canvas.parentElement.getBoundingClientRect();width=box.width;height=box.height;const next=innerWidth<700;
    renderer.setPixelRatio(Math.min(devicePixelRatio||1,next?1.1:1.45));renderer.setSize(width,height,false);camera.aspect=width/height;
    if(!config||next!==compact){compact=next;build();key.shadow.map?.dispose();key.shadow.map=null;key.shadow.mapSize.set(compact?512:1024,compact?512:1024);}
    const distance=Math.max(config.columns/(2*Math.tan(THREE.MathUtils.degToRad(17.5))*camera.aspect),config.rows/(2*Math.tan(THREE.MathUtils.degToRad(17.5))))*1.08;
    camera.position.set(0,-distance*.19,distance);camera.lookAt(0,0,0);camera.updateProjectionMatrix();root.updateMatrixWorld(true);
  }
  function setActive(index){
    active=index;if(!mesh)return;
    for(let i=0;i<tiles.length;i++){
      const t=tiles[i];if(t.project>=0)color.set(t.project===active?0xff6157:0xb2c8d7);else color.setRGB(.035+(i%7)*.003,.065+(i%5)*.005,.105+(i%9)*.006);
      mesh.setColorAt(i,color);
    }
    mesh.instanceColor.needsUpdate=true;markers.forEach((m,i)=>m.material.color.set(i===active?0xff8b7d:0xcde3f1));
  }
  function setPreview(image,immediate=false){
    if(!image){previewTarget=0;if(immediate)uniforms.uPreview.value=0;return;}
    let texture=textureCache.get(image.src);if(!texture){texture=new THREE.Texture(image);texture.colorSpace=THREE.SRGBColorSpace;texture.needsUpdate=true;texture.minFilter=THREE.LinearFilter;texture.generateMipmaps=false;textureCache.set(image.src,texture);}
    if(texture!==uniforms.uTo.value){uniforms.uFrom.value=uniforms.uTo.value;uniforms.uTo.value=texture;uniforms.uBlend.value=0;}
    uniforms.uImageAspect.value=image.naturalWidth/image.naturalHeight;blendTarget=1;previewTarget=1;
    if(immediate){uniforms.uBlend.value=1;uniforms.uPreview.value=1;}
  }
  function update(elapsed,still=false){
    let settling=false;
    const {columns,rows}=config;
    for(let i=0;i<tiles.length;i++){
      const t=tiles[i],target=heightTarget(t.col,t.row,still?null:pointer,t.project>=0,compact);
      const result=still?{value:target,velocity:0,settled:true}:spring(t.value,t.velocity,target,elapsed);t.value=result.value;t.velocity=result.velocity;settling ||= !result.settled;
      object.position.set(t.col-(columns-1)/2,(rows-1)/2-t.row,t.value/2);
      const dx=pointer?t.col-pointer.x:0,dy=pointer?t.row-pointer.y:0,falloff=pointer?Math.exp(-(dx*dx+dy*dy)/14):0;
      object.rotation.set(still?0:clamp(dy*falloff*.025,-.12,.12),still?0:clamp(dx*falloff*.025,-.12,.12),0);object.scale.set(1,1,t.value/.21);object.updateMatrix();mesh.setMatrixAt(i,object.matrix);
      if(t.project>=0)markers[t.project].matrix.copy(object.matrix);
    }
    mesh.instanceMatrix.needsUpdate=true;
    for(const [uniform,target]of[[uniforms.uPreview,previewTarget],[uniforms.uBlend,blendTarget]]){
      if(still)uniform.value=target;else uniform.value+=(target-uniform.value)*(1-Math.exp(-Math.min(elapsed,50)/130));
      if(Math.abs(uniform.value-target)<.001)uniform.value=target;else settling=true;
    }
    renderer.shadowMap.needsUpdate=true;return settling;
  }
  function hitTest(clientX,clientY){
    const box=canvas.getBoundingClientRect();pointerNdc.set((clientX-box.left)/width*2-1,-(clientY-box.top)/height*2+1);raycaster.setFromCamera(pointerNdc,camera);
    normal.set(0,0,1).applyQuaternion(root.quaternion);plane.setFromNormalAndCoplanarPoint(normal,root.position);
    if(raycaster.ray.intersectPlane(plane,hit)){root.worldToLocal(hit);pointer={x:hit.x+(config.columns-1)/2,y:(config.rows-1)/2-hit.y};}
    root.updateMatrixWorld(true);const intersection=raycaster.intersectObject(mesh,false)[0];return intersection?tiles[intersection.instanceId].project:-1;
  }
  function focus(index){const point=config.anchors[index];pointer=point?{x:point[0],y:point[1]}:null;}
  function project(index){const point=config.anchors[index],tile=tiles[point[1]*config.columns+point[0]];const v=new THREE.Vector3(point[0]-(config.columns-1)/2,(config.rows-1)/2-point[1],tile.value+.05);root.localToWorld(v);v.project(camera);return{x:(v.x*.5+.5)*width,y:(-.5*v.y+.5)*height};}
  function previewRect(imageAspect){
    const box=canvas.getBoundingClientRect();let w=config.columns,h=config.rows;if(w/h>imageAspect)w=h*imageAspect;else h=w/imageAspect;
    const corners=[[-w/2,-h/2],[w/2,-h/2],[-w/2,h/2],[w/2,h/2]].map(([x,y])=>{const v=new THREE.Vector3(x,y,.4);root.localToWorld(v);v.project(camera);return{x:box.left+(v.x*.5+.5)*width,y:box.top+(-v.y*.5+.5)*height};});
    const left=Math.min(...corners.map(p=>p.x)),top=Math.min(...corners.map(p=>p.y));return{left,top,width:Math.max(...corners.map(p=>p.x))-left,height:Math.max(...corners.map(p=>p.y))-top};
  }
  resize();
  return{resize,update,render(){renderer.render(scene,camera);},setActive,setPreview,hitTest,focus,leave(){pointer=null;},project,previewRect,dispose(){geometry.dispose();material.dispose();textureCache.forEach(t=>t.dispose());placeholder.dispose();environment.dispose();markers.forEach(m=>{m.geometry.dispose();m.material.dispose();});floor.geometry.dispose();floor.material.dispose();renderer.dispose();}};
}
