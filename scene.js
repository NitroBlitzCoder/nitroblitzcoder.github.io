import * as THREE from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {RoomEnvironment} from 'three/addons/environments/RoomEnvironment.js';
import {createTimeline} from 'animejs';
import {SoftwareRenderer} from './software-renderer.js';

const $ = selector => document.querySelector(selector);
const clamp = (value, low = 0, high = 1) => Math.max(low, Math.min(high, value));
const smooth = value => { const t = clamp(value); return t * t * (3 - 2 * t); };
let effects = window.portfolioEffects !== false;
let frame = 0;
const stages = [];
const forceSoftware = new URLSearchParams(location.search).get('renderer') === 'software';

function makeStage(id, background, {fov = 34, position = [0, 3, 10]} = {}) {
  const canvas = $('#' + id), container = canvas.parentElement;
  let renderer;
  try {
    if (forceSoftware) throw new Error('Software rendering requested');
    renderer = new THREE.WebGLRenderer({canvas, alpha: true, antialias: true, preserveDrawingBuffer: true, powerPreference: 'low-power'});
  } catch { renderer = new SoftwareRenderer(canvas); }
  container.dataset.renderer = renderer.isSoftware ? 'software' : 'webgl';
  renderer.setClearColor(background, 0);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.1;
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(fov, 1, .1, 100);
  camera.position.set(...position); camera.lookAt(0, 0, 0);
  const root = new THREE.Group(); scene.add(root);
  if (!renderer.isSoftware) {
    const generator = new THREE.PMREMGenerator(renderer), room = new RoomEnvironment();
    scene.environment = generator.fromScene(room, .04).texture;
    room.dispose(); generator.dispose();
  }
  scene.add(new THREE.HemisphereLight(0xffffff, 0x28282a, 1.5));
  const key = new THREE.DirectionalLight(0xfffaf2, 3.2); key.position.set(-3, 6, 7); scene.add(key);
  const rim = new THREE.DirectionalLight(0xffffff, 2.4); rim.position.set(5, 3, -5); scene.add(rim);
  const fill = new THREE.DirectionalLight(0xffffff, .6); fill.position.set(-4, -2, -3); scene.add(fill);
  let width = 0, height = 0;
  const stage = {
    canvas, container, renderer, scene, camera, root, visible: false, ready: false, lost: false,
    softwareDrawn: false, update: () => {}, render() {
      if (renderer.isSoftware && stage.softwareDrawn) return;
      if (stage.ready && stage.visible && !stage.lost && !document.hidden) {renderer.render(scene, camera); stage.softwareDrawn = true;}
    }, resize() {
      const rect = container.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      if (width !== rect.width || height !== rect.height) {
        width = rect.width; height = rect.height; stage.softwareDrawn = false;
        renderer.setPixelRatio(Math.min(devicePixelRatio || 1, innerWidth < 700 ? 1.2 : 1.5));
        renderer.setSize(width, height, false);
        camera.aspect = width / height; camera.updateProjectionMatrix();
      }
      schedule();
    }
  };
  canvas.addEventListener('webglcontextlost', event => {
    event.preventDefault(); stage.lost = true; container.style.opacity = '0';
    if (id === 'lens') $('.lens-fallback').hidden = false;
  });
  canvas.addEventListener('webglcontextrestored', () => {
    stage.lost = false; container.style.opacity = '';
    if (id === 'lens') $('.lens-fallback').hidden = true;
    schedule();
  });
  new ResizeObserver(() => stage.resize()).observe(container);
  new IntersectionObserver(entries => {
    stage.visible = entries[0].isIntersecting;
    if (stage.visible) schedule();
  }, {threshold: 0}).observe(container);
  stages.push(stage); stage.resize();
  return stage;
}
function schedule() {
  if (!frame && !document.hidden) frame = requestAnimationFrame(update);
}
function update() {
  frame = 0;
  for (const stage of stages) {
    if (!stage.ready || !stage.visible || stage.lost) continue;
    stage.update();
    stage.render();
  }
}
window.addEventListener('scroll', schedule, {passive: true});
window.addEventListener('resize', schedule);
window.addEventListener('effectschange', event => {effects = event.detail; schedule();});
document.addEventListener('visibilitychange', () => {
  if (document.hidden) { cancelAnimationFrame(frame); frame = 0; }
  else schedule();
});

async function loadAircraft() {
  try {
    const stage = makeStage('aircraft', 0x111111, {position: [-5, 8, 13]});
    const response = await fetch('assets/blackbird.json');
    if (!response.ok) throw new Error('Aircraft asset unavailable');
    const data = await response.json(), vertices = [];
    for (const part of data.parts) {
      for (const index of part.indices) {
        vertices.push((part.positions[index * 3] + 3.94) * .32,
          (part.positions[index * 3 + 1] - .6) * .32, part.positions[index * 3 + 2] * .32);
      }
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    geometry.computeVertexNormals();
    const material = new THREE.MeshStandardMaterial({color: 0x42474d, metalness: .65, roughness: .45, side: THREE.DoubleSide, envMapIntensity: .65});
    stage.root.add(new THREE.Mesh(geometry, material));
    stage.root.rotation.y = -.28;
    stage.ready = true;
    stage.update = () => {
      if (stage.renderer.isSoftware) return;
      const progress = effects ? clamp(scrollY / $('.hero').offsetHeight) : 0;
      stage.root.rotation.y = -.28 + progress * .6;
      stage.root.rotation.z = -.08 + progress * .05;
      stage.root.position.x = -progress * 1.3;
      stage.root.position.y = progress * .3;
    };
    schedule();
  } catch (error) { console.warn('Aircraft decoration unavailable:', error.message); $('#aircraft-stage').hidden = true; }
}

function ringMaterial(color, metalness = .5, roughness = .45) {
  return new THREE.MeshStandardMaterial({color, metalness, roughness, side: THREE.DoubleSide});
}
function buildLens() {
  const stage = makeStage('lens', 0xe9e7e1, {fov: 31, position: [0, 2, 10.5]});
  const black = ringMaterial(0x16191b, .4, .38);
  const rubber = ringMaterial(0x101214, .1, .72);
  const metal = ringMaterial(0x777b7b, .9, .25);
  const darkMetal = ringMaterial(0x303638, .8, .3);
  const red = ringMaterial(0xc72922, .45, .3);
  const parts = [];
  function part(z, separation) {
    const group = new THREE.Group(); group.position.z = z; stage.root.add(group);
    parts.push({group, base: z, separation}); return group;
  }
  function torus(parent, radius, tube, z, material = black) {
    const mesh = new THREE.Mesh(new THREE.TorusGeometry(radius, tube, 8, 72), material);
    mesh.position.z = z; parent.add(mesh); return mesh;
  }
  function barrel(parent, outside, inside, length, z, material = black) {
    const profile = [[inside, -length / 2], [outside - .035, -length / 2], [outside, -length / 2 + .04],
      [outside, length / 2 - .04], [outside - .035, length / 2], [inside, length / 2], [inside, -length / 2]];
    const geometry = new THREE.LatheGeometry(profile.map(([r,y]) => new THREE.Vector2(r,y)), 80);
    geometry.rotateX(Math.PI / 2);
    const mesh = new THREE.Mesh(geometry, material); mesh.position.z = z; parent.add(mesh); return mesh;
  }
  function ribs(parent, radius, length, z, count = 80) {
    const geometry = new THREE.BoxGeometry(.025, .055, length);
    const mesh = new THREE.InstancedMesh(geometry, rubber, count), object = new THREE.Object3D();
    for (let index = 0; index < count; index++) {
      const angle = index / count * Math.PI * 2;
      object.position.set(Math.cos(angle) * radius, Math.sin(angle) * radius, z);
      object.rotation.z = angle - Math.PI / 2;
      object.updateMatrix(); mesh.setMatrixAt(index, object.matrix);
    }
    parent.add(mesh);
  }
  function glass(parent, radius, z) {
    const material = new THREE.MeshPhysicalMaterial({color: 0x182b37, metalness: .42, roughness: .08, clearcoat: 1, clearcoatRoughness: .05, side: THREE.DoubleSide});
    const element = new THREE.Mesh(new THREE.SphereGeometry(radius, 48, 24), material);
    element.scale.z = .11; element.position.z = z; parent.add(element);
    torus(parent, radius + .015, .018, z, darkMetal);
  }
  const front = part(1.05, 2.3);
  barrel(front, 1.15, .94, .24, 0, darkMetal);
  torus(front, 1.12, .035, .14, metal);
  barrel(front, 1.02, .91, .12, .12, black);
  glass(front, .92, .10);
  // Lettering belongs to the physical front ring, rather than floating page decoration.
  if (!stage.renderer.isSoftware) {
    const labelCanvas = document.createElement('canvas'); labelCanvas.width = labelCanvas.height = 1024;
    const ctx = labelCanvas.getContext('2d');
    ctx.clearRect(0, 0, 1024, 1024); ctx.fillStyle = '#b9bcb9'; ctx.font = '24px sans-serif'; ctx.textAlign = 'center';
    const lettering = 'O P T I C A L   S T U D Y   /   S V';
    for (let i = 0; i < lettering.length; i++) {
      const angle = -.95 + i * .06;
      ctx.save(); ctx.translate(512 + Math.sin(angle) * 458, 512 - Math.cos(angle) * 458); ctx.rotate(angle); ctx.fillText(lettering[i], 0, 0); ctx.restore();
    }
    const texture = new THREE.CanvasTexture(labelCanvas); texture.colorSpace = THREE.SRGBColorSpace;
    const label = new THREE.Mesh(new THREE.PlaneGeometry(2.3, 2.3), new THREE.MeshBasicMaterial({map: texture, transparent: true, depthWrite: false}));
    label.position.z = .155; front.add(label);
  }
  const focus = part(.4, .95);
  barrel(focus, 1.12, .8, .65, 0, rubber); ribs(focus, 1.135, .51, 0);
  torus(focus, 1.12, .035, .32, black); torus(focus, 1.12, .024, -.32, metal);
  const optics = part(.04, .18);
  barrel(optics, .87, .72, .14, 0, darkMetal); glass(optics, .71, .02);
  const aperture = part(-.25, -.65);
  barrel(aperture, .94, .29, .10, 0, darkMetal);
  const bladeShape = new THREE.Shape();
  bladeShape.moveTo(.24, -.05); bladeShape.lineTo(.76, -.21); bladeShape.lineTo(.84, .13); bladeShape.lineTo(.31, .18); bladeShape.closePath();
  const bladeGeometry = new THREE.ShapeGeometry(bladeShape);
  for (let i = 0; i < 9; i++) {
    const blade = new THREE.Mesh(bladeGeometry, ringMaterial(i % 2 ? 0x454a4c : 0x303638, .7, .38));
    blade.rotation.z = i / 9 * Math.PI * 2; blade.position.z = .06 + i * .001; aperture.add(blade);
  }
  torus(aperture, .91, .025, .07, metal);
  const body = part(-.68, -1.25);
  barrel(body, .98, .7, .68, 0, black); ribs(body, .99, .21, -.1, 64);
  torus(body, .99, .027, .31, red); torus(body, .98, .024, -.31, darkMetal);
  const mount = part(-1.15, -2.2);
  barrel(mount, .82, .57, .23, 0, metal); torus(mount, .8, .04, -.12, darkMetal); glass(mount, .56, .10);
  const screwGeometry = new THREE.CylinderGeometry(.035, .035, .02, 12), screwMaterial = ringMaterial(0x333738, .9, .3);
  for (let i = 0; i < 4; i++) {
    const angle = i * Math.PI / 2 + .4, screw = new THREE.Mesh(screwGeometry, screwMaterial);
    screw.rotation.x = Math.PI / 2; screw.position.set(Math.cos(angle)*.7, Math.sin(angle)*.7, .13); mount.add(screw);
  }
  const timeline = createTimeline({autoplay: false});
  parts.forEach(({group, base, separation}, index) => {
    timeline.add(group.position, {z: [base, base + separation], duration: 1200, ease: 'inOut(3)'}, index * 75);
  });
  stage.root.rotation.set(-.15, -.38, -.32);
  stage.root.position.set(.35, -.2, 0);
  stage.ready = true;
  const labels = $('#lens-labels');
  const anchors = [front, focus, aperture, mount];
  const desktopCoords = [[.10,.28],[.10,.72],[.90,.28],[.90,.72]];
  const mobileCoords = [[.08,.10],[.08,.90],[.92,.10],[.92,.90]];
  $('#interests').classList.toggle('static-graphics', !!stage.renderer.isSoftware);
  const anchor = new THREE.Vector3();
  let lastProgress = -1;
  stage.update = () => {
    const story = $('#interests'), rect = story.getBoundingClientRect();
    const progress = effects && !stage.renderer.isSoftware ? clamp(-rect.top / (story.offsetHeight - innerHeight)) : 0;
    if (progress !== lastProgress) {
      timeline.seek(progress * timeline.duration);
      stage.root.rotation.y = -.55 - smooth(progress) * .8;
      stage.root.rotation.z = -.32 + smooth(progress) * .42;
      stage.root.rotation.x = -.15 + smooth(progress) * .18;
      lastProgress = progress;
    }
    const mobile = innerWidth < 700;
    stage.root.position.x = mobile ? 0 : .35;
    stage.camera.position.z = mobile ? (5.2 + smooth(progress) * 3.1) / (2 * Math.tan(THREE.MathUtils.degToRad(31 / 2)) * stage.camera.aspect) : 10.5;
    stage.camera.lookAt(0, 0, 0);
    story.style.setProperty('--progress', progress);
    $('#lens-phase').textContent = progress < .23 ? 'A study in focus.' : progress < .65 ? 'The whole, becoming its parts.' : 'Front optics / focus barrel / aperture / mount';
    labels.style.opacity = smooth((progress - .38) / .32);
    $('#lens-instruction').textContent = effects && !stage.renderer.isSoftware ? 'Scroll to look inside' : 'Static lens study';
    const labelWidth = stage.container.clientWidth, labelHeight = stage.container.clientHeight;
    labels.setAttribute('viewBox', `0 0 ${labelWidth} ${labelHeight}`);
    stage.root.updateMatrixWorld(true); stage.camera.updateMatrixWorld(true);
    [...labels.children].forEach((label, index) => {
      anchor.copy(anchors[index].position); anchor.applyMatrix4(stage.root.matrixWorld).project(stage.camera);
      const x = (anchor.x * .5 + .5) * labelWidth, y = (-anchor.y * .5 + .5) * labelHeight;
      const [nx, ny] = (mobile ? mobileCoords : desktopCoords)[index], right = index > 1;
      const tx = nx * labelWidth, ty = ny * labelHeight;
      label.querySelector('path').setAttribute('d', `M${x.toFixed(1)},${y.toFixed(1)} L${right?tx-35:tx+80},${ty} H${tx}`);
      const text = label.querySelector('text'); text.setAttribute('x', tx); text.setAttribute('y', ty - 12);
      text.setAttribute('text-anchor', right ? 'end' : 'start');
    });
  };
  schedule();
}

let carStarted = false;
async function loadCar() {
  if (carStarted) return; carStarted = true;
  try {
    const stage = makeStage('car', 0x111111, {position: [-8, 3.8, 12]});
    const loaded = await new GLTFLoader().loadAsync('assets/mclaren-p1-gtr.glb');
    const model = loaded.scene;
    const box = new THREE.Box3().setFromObject(model), size = box.getSize(new THREE.Vector3()), center = box.getCenter(new THREE.Vector3());
    model.position.sub(center);
    const normalized = new THREE.Group(); normalized.scale.setScalar(8.3 / Math.max(size.x, size.y, size.z)); normalized.add(model); stage.root.add(normalized);
    model.traverse(object => {
      if (!object.isMesh) return;
      const materials = Array.isArray(object.material) ? object.material : [object.material];
      for (const material of materials) {
        if (/main_body|wing|back_body_metal/.test(material.name)) { material.map = null; material.color.set(0x6c1716); material.metalness = .65; material.roughness = .35; }
        if (/Carbon|Vents|plastic|tires|interior|exhaust|black|extra/i.test(material.name)) material.color.set(0x151719);
        if (/windshieldwindows/.test(material.name)) {material.color.set(0x101316); material.roughness=.15;}
        if (material.name === 'tire_logo') object.visible = false;
        material.envMapIntensity = .75;
      }
    });
    stage.root.rotation.y = .55; stage.ready = true;
    stage.update = () => {
      if (stage.renderer.isSoftware) return;
      const rect = $('.offscreen-interests').getBoundingClientRect();
      const progress = effects ? clamp((innerHeight - rect.top) / (innerHeight + rect.height)) : .35;
      stage.root.rotation.y = .4 + progress * .45;
      stage.root.position.x = (progress - .5) * .7;
    };
    schedule();
  } catch (error) { console.warn('Car decoration unavailable:', error.message); $('#car-stage').hidden = true; }
}
function lazy(target, callback, margin) {
  const observer = new IntersectionObserver(entries => {
    if (entries.some(entry => entry.isIntersecting)) { observer.disconnect(); callback(); }
  }, {rootMargin: margin});
  observer.observe(target);
}
loadAircraft();
lazy($('#interests'), () => {try {buildLens();} catch(error) {console.warn('Lens unavailable:',error.message); $('#lens-stage').hidden = true; $('.lens-fallback').hidden = false;}}, '400px');
lazy($('.offscreen-interests'), loadCar, '250px');
