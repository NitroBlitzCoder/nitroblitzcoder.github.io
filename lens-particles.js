import * as THREE from 'three';
import {sampleMesh} from './vendor/canvas-ui/particle-object.js';

// Each cloud lives on its original lens group, so the scroll timeline still
// separates the elements and the pointer acts on their projected positions.
export function particleLens(stage, parts, schedule) {
  const pointer = new THREE.Vector2(-4,-4);
  const uniforms = {
    pointer: {value:pointer}, size: {value:new THREE.Vector2()},
    strength: {value:0}, tint:{value:new THREE.Color()},
  };
  const material = new THREE.ShaderMaterial({
    uniforms, transparent:true, depthWrite:false,
    vertexShader:`
      uniform vec2 pointer, size;
      uniform float strength;
      varying float shade;
      void main() {
        vec4 clip = projectionMatrix * modelViewMatrix * vec4(position,1.);
        vec2 delta = (clip.xy / clip.w - pointer) * size * .5;
        float seed = fract(sin(dot(position,vec3(31.4,12.7,8.1))) * 43758.5);
        vec2 push = normalize(delta + vec2(.01)) + .48 * vec2(sin(seed*40.),cos(seed*47.));
        clip.xy += push * 95. * strength * (1.-smoothstep(0.,100.,length(delta))) / size * clip.w;
        gl_Position = clip;
        gl_PointSize = 1.4 + seed * 1.35;
        shade = .45 + .55 * seed;
      }`,
    fragmentShader:`uniform vec3 tint; varying float shade;
      void main(){if(distance(gl_PointCoord,vec2(.5))>.5) discard; gl_FragColor=vec4(tint,shade);
      #include <colorspace_fragment>
      }`,
  });
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  reduced.addEventListener('change', schedule);
  for (const {group} of parts) {
    group.updateWorldMatrix(true,true);
    const {positions} = sampleMesh(group,800);
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position',new THREE.BufferAttribute(positions,3));
    geometry.applyMatrix4(group.matrixWorld.clone().invert());
    for (const mesh of group.children) mesh.visible = false;
    const cloud = new THREE.Points(geometry,material);
    group.add(cloud);

  }
  let target = 0;
  function move(event) {
    const box = stage.canvas.getBoundingClientRect();
    pointer.set((event.clientX-box.left)/box.width*2-1,1-(event.clientY-box.top)/box.height*2);
    target = 1; schedule();
  }
  function leave() { target = 0; schedule(); }
  stage.canvas.addEventListener('pointermove',move);
  stage.canvas.addEventListener('pointerdown',move);
  stage.canvas.addEventListener('pointerleave',leave);
  stage.canvas.addEventListener('pointercancel',leave);
  stage.canvas.addEventListener('pointerup',e => { if(e.pointerType !== 'mouse') leave(); });
  window.addEventListener('themechange',schedule);
  return active => {
    stage.container.dataset.surface = 'particles';
    if (!active || reduced.matches) { target = 0; uniforms.strength.value = 0; }
    uniforms.size.value.set(Math.max(1,stage.canvas.clientWidth),Math.max(1,stage.canvas.clientHeight));
    uniforms.tint.value.set(document.documentElement.dataset.theme==='light' ? '#0047ab' : '#ffac72');
    uniforms.strength.value += ((active ? target : 0)-uniforms.strength.value)*.17;
    return active && Math.abs(target-uniforms.strength.value)>.003;
  };
}
