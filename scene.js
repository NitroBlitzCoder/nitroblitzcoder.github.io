import * as THREE from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {RoomEnvironment} from 'three/addons/environments/RoomEnvironment.js';
import {animate} from 'animejs';
import {SoftwareRenderer} from './software-renderer.js';
const $=s=>document.querySelector(s);let motion=window.portfolioEffects!==false;const stages=[];const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
// Rendering is demand-driven. No idle loop, and no scroll-driven geometry work.
function stage(canvas, container, bg) {
  let renderer;
  try { renderer = new THREE.WebGLRenderer({canvas, antialias: true, alpha: true, powerPreference: 'low-power'}); }
  catch { renderer = new SoftwareRenderer(canvas); }
  container.dataset.renderer = renderer.isSoftware ? 'software' : 'webgl';
  renderer.setClearColor(bg, 0);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(33, 1, .1, 100);
  camera.position.set(-9, 8, 15); camera.lookAt(0, 0, 0);
  const root = new THREE.Group(); scene.add(root);
  if (!renderer.isSoftware) {
    const pmrem = new THREE.PMREMGenerator(renderer);
    const env = new RoomEnvironment();
    const environment = pmrem.fromScene(env, .04);
    scene.environment = environment.texture;
    env.dispose(); pmrem.dispose();
  }
  scene.add(new THREE.HemisphereLight(0xffffff, 0x252525, 1.3));
  const key = new THREE.DirectionalLight(0xffffff, 2.3); key.position.set(-4, 9, 6); scene.add(key);
  const accent = new THREE.DirectionalLight(0xff3b3b, .45); accent.position.set(5, 3, -6); scene.add(accent);
  const rim = new THREE.DirectionalLight(0xe4eaff, 1.8); rim.position.set(-5, 3, -7); scene.add(rim);
  let lastWidth = 0, lastHeight = 0;
  const s = {
    renderer, scene, camera, root, container, visible: false, ready: false, lost: false,
    anim: null, finish: null, update: () => {},
    render() {
      if (s.ready && s.visible && !s.lost && !document.hidden) renderer.render(scene, camera);
    },
    resize() {
      const {width, height} = container.getBoundingClientRect();
      if (!width || !height) return;
      if (width !== lastWidth || height !== lastHeight) {
        lastWidth = width; lastHeight = height;
        renderer.setPixelRatio(Math.min(devicePixelRatio || 1, width < 650 ? 1.25 : 1.5));
        renderer.setSize(width, height, false);
        camera.aspect = width / height; camera.updateProjectionMatrix();
      }
      s.render();
    }
  };
  const controls = canvas.id === 'aircraft' ? ['plane-view', 'explode'] : ['car-view', 'car-explode'];
  const placeholder = container.querySelector('.model-placeholder');
  canvas.addEventListener('webglcontextlost', event => {
    event.preventDefault(); s.lost = true; s.anim?.pause();
    placeholder.hidden = false;
    placeholder.querySelector('p').textContent = 'Graphics paused. Reload the page to restore this model.';
    placeholder.style.zIndex = '1';
    controls.forEach(id => $('#' + id).disabled = true);
  });
  canvas.addEventListener('webglcontextrestored', () => {
    s.lost = false; placeholder.hidden = true;
    controls.forEach(id => $('#' + id).disabled = false);
    s.finish?.(); s.update();
  });
  new ResizeObserver(s.resize).observe(container);
  new IntersectionObserver(entries => {
    s.visible = entries[0].isIntersecting;
    if (!s.visible) { s.anim?.pause(); s.finish?.(); }
    else { s.resize(); s.update(); }
  }, {threshold: 0}).observe(container);
  stages.push(s); s.resize();
  return s;
}
const error=(placeholder,message)=>{placeholder.querySelector('p').textContent=message;placeholder.style.zIndex='1';};
let aircraft;const planeState={explode:0,angle:0,scroll:0};let planeParts=[];let planeManual=false;let planeView=0;
async function makePlane(){
 try{aircraft=stage($('#aircraft'),$('#aircraft-stage'),0x090909);const response=await fetch('assets/blackbird.json');if(!response.ok)throw Error('model unavailable');const data=await response.json();const bins={body:[],port:[],starboard:[],canopy:[]};
 for(const p of data.parts){const pos=p.positions;for(let i=0;i<p.indices.length;i+=3){const ids=p.indices.slice(i,i+3);const z=ids.reduce((a,n)=>a+pos[n*3+2],0)/3;const name=p.name;const type=/Canopy|Vitr|PareBrise/.test(name)?'canopy':z>2.5?'port':z< -2.5?'starboard':'body';for(const n of ids)bins[type].push((pos[n*3]+3.94)*.32,(pos[n*3+1]-.6)*.32,pos[n*3+2]*.32)}}
 const material=new THREE.MeshStandardMaterial({color:0x30363d,metalness:.55,roughness:.5,envMapIntensity:.65,side:THREE.DoubleSide});
 for(const [name,vertices] of Object.entries(bins)){const geometry=new THREE.BufferGeometry();geometry.setAttribute('position',new THREE.Float32BufferAttribute(vertices,3));geometry.computeVertexNormals();let mat=material;if(name==='canopy')mat=new THREE.MeshPhysicalMaterial({color:0x121c25,metalness:.55,roughness:.15,clearcoat:1,side:THREE.DoubleSide});const mesh=new THREE.Mesh(geometry,mat);mesh.name=name;aircraft.root.add(mesh);planeParts.push(mesh);}
 aircraft.root.rotation.y=.18;aircraft.camera.position.set(-7,8,15);aircraft.camera.lookAt(0,0,0);aircraft.camera.zoom=1.12;aircraft.camera.updateProjectionMatrix();aircraft.ready=true;$('#aircraft-stage').setAttribute('aria-busy','false');$('#plane-placeholder').hidden=true;$('#plane-view').disabled=false;$('#explode').disabled=false;
 aircraft.update=()=>{const t=planeState.explode;const outer=clamp(t*1.35,0,1);const cockpit=clamp((t-.25)/.75,0,1);for(const mesh of planeParts){mesh.position.set(0,0,0);if(mesh.name==='port'){mesh.position.z=outer*1.2;mesh.position.y=outer*.45}else if(mesh.name==='starboard'){mesh.position.z=-outer*1.2;mesh.position.y=outer*.45}else if(mesh.name==='canopy')mesh.position.y=cockpit*1.15;}aircraft.root.rotation.y=.18+planeState.angle;aircraft.root.rotation.z=0;aircraft.render();$('#plane-status').textContent=['Perspective','Profile','Rear quarter'][planeView%3]+' / '+(planeManual?'separated display groups':'assembled')};aircraft.resize();aircraft.update();
 }catch(e){$('#aircraft-stage').setAttribute('aria-busy','false');$('#plane-status').textContent='Model unavailable';console.warn('Aircraft:',e);error($('#plane-placeholder'),'3D unavailable in this browser. The projects below are ready to explore.');$('#plane-view').disabled=true;$('#explode').disabled=true;}
}
function tweenState(target, properties, s) {
  if (!s?.ready || s.lost) return;
  s.anim?.pause();
  s.finish = () => { Object.assign(target, properties); s.finish = null; s.update(); };
  if (!motion || s.renderer.isSoftware || !s.visible || document.hidden) { s.finish(); return; }
  s.anim = animate(target, {
    ...properties, duration: 900, ease: 'inOutQuint', frameRate: 60,
    onUpdate: () => s.update(), onComplete: () => { s.anim = null; s.finish?.(); }
  });
}
$('#plane-view').disabled=true;$('#explode').disabled=true;$('#plane-view').addEventListener('click',()=>{planeView++;tweenState(planeState,{angle:planeView*Math.PI*2/3},aircraft)});$('#explode').addEventListener('click',()=>{planeManual=!planeManual;$('#explode').setAttribute('aria-pressed',String(planeManual));$('#explode').textContent=planeManual?'Reassemble':'Inspect parts';$('#aircraft-stage').classList.toggle('inspecting',planeManual);tweenState(planeState,{explode:planeManual?1:0},aircraft)});
let carStage,carStarted=false;const carState={angle:0,explode:0};let carView=0,carOpen=false,carParts=[];
async function makeCar(){if(carStarted)return;carStarted=true;try{carStage=stage($('#car'),$('#car-stage'),0x121212);carStage.camera.position.set(-9,4.5,13);carStage.camera.lookAt(0,0,0);$('#car-status').textContent='Loading model…';const loaded=await new GLTFLoader().loadAsync('assets/mclaren-p1-gtr.glb');const model=loaded.scene;model.updateMatrixWorld(true);const box=new THREE.Box3().setFromObject(model),size=box.getSize(new THREE.Vector3()),center=box.getCenter(new THREE.Vector3());const normalization=new THREE.Group();normalization.scale.setScalar(8.3/Math.max(size.x,size.y,size.z));model.position.sub(center);normalization.add(model);carStage.root.add(normalization);
 carStage.root.updateMatrixWorld(true);model.traverse(o=>{if(!o.isMesh)return;let mats=Array.isArray(o.material)?o.material:[o.material];for(const mat of mats){if(mat.name==='main_body'||mat.name==='wing'||mat.name==='back_body_metal'){mat.map=null;mat.color.set(0xe3232e);mat.metalness=.65;mat.roughness=.25;}if(mat.name==='windshieldwindows'){mat.color.set(0x101319);mat.opacity=.92;mat.roughness=.17;}if(/Carbon|Vents|plastic|tires|interior|exhaust|black|extra|back_body/i.test(mat.name)&&!['back_body_metal'].includes(mat.name))mat.color.set(0x242426);if(/rims|disk/.test(mat.name))mat.color.set(0x7d7e81);if(mat.name==='tire_logo')o.visible=false;mat.envMapIntensity=1.1;}o.geometry.computeBoundingBox();const lift=mats.some(m=>/main_body|wing|windshieldwindows|Carbon|side_mirrors|headlight_glass/.test(m.name));const base=o.position.clone();const parentInverse=new THREE.Matrix3().setFromMatrix4(o.parent.matrixWorld.clone().invert());const dir=new THREE.Vector3(0,lift?1:0,0).applyMatrix3(parentInverse);carParts.push({mesh:o,base,dir});});
 carStage.root.rotation.y=.6;carStage.camera.zoom=1.05;carStage.camera.updateProjectionMatrix();carStage.ready=true;$('#car-stage').setAttribute('aria-busy','false');$('#car-placeholder').hidden=true;$('#car-view').disabled=false;$('#car-explode').disabled=false;carStage.update=()=>{carStage.root.rotation.y=.6+carState.angle;for(const p of carParts)p.mesh.position.copy(p.base).addScaledVector(p.dir,carState.explode*1.1);carStage.render();$('#car-status').textContent=(carOpen?'Bodywork lifted':'Assembled')+' / '+['front quarter','side','rear quarter','side'][carView%4]};carStage.resize();carStage.update();
 }catch(e){$('#car-stage').setAttribute('aria-busy','false');$('#car-status').textContent='Model unavailable';console.warn('Car:',e);error($('#car-placeholder'),'The 3D car could not load. Try a WebGL-enabled browser.');$('#car-view').disabled=true;$('#car-explode').disabled=true;}}
$('#car-view').disabled=true;$('#car-explode').disabled=true;$('#car-view').addEventListener('click',()=>{carView++;tweenState(carState,{angle:carView*Math.PI/2},carStage)});$('#car-explode').addEventListener('click',()=>{carOpen=!carOpen;$('#car-explode').setAttribute('aria-pressed',String(carOpen));$('#car-explode').textContent=carOpen?'Reassemble':'Lift bodywork';tweenState(carState,{explode:carOpen?1:0},carStage)});
const carObserver=new IntersectionObserver(entries=>{if(entries[0].isIntersecting){makeCar();carObserver.disconnect()}},{rootMargin:'200px'});carObserver.observe($('#garage'));
addEventListener('effectschange', event => {
  motion = event.detail;
  stages.forEach(s => { s.anim?.pause(); s.anim = null; s.finish?.(); s.update(); });
});
document.addEventListener('visibilitychange', () => {
  stages.forEach(s => {
    if (document.hidden) { s.anim?.pause(); s.finish?.(); }
    else if (s.visible) s.update();
  });
});
makePlane();
