// The color field uses Componentry's Animated Gradient shader with a Three.js plane.
const host = document.querySelector('.poster-hero');
const canvas = host.querySelector('.thermal-film');
const reduced = matchMedia('(prefers-reduced-motion: reduce)');
let render, renderer, visible = false, frame = 0, previous = 0, time = 2;

function allowed() {
  return visible && !document.hidden && !reduced.matches &&
    !document.body.classList.contains('still') && window.portfolioEffects !== false;
}
function tick(now) {
  frame = 0;
  if (!allowed() || !render) return;
  if (now - previous >= 40) {
    time += Math.min(now - previous, 80) / 1000;
    previous = now;
    render(time);
  }
  frame = requestAnimationFrame(tick);
}
function sync() {
  cancelAnimationFrame(frame);
  frame = 0;
  canvas.hidden = !allowed() || !render;
  if (!canvas.hidden) frame = requestAnimationFrame(tick);
}
async function setup() {
  const THREE = await import('three');
  renderer = new THREE.WebGLRenderer({canvas, antialias:false, alpha:true});
  const uniforms = {};
  const settings = {u_pixelRatio:1,u_scale:.76,u_rotation:.3,u_proportion:.5,
    u_softness:.67,u_shape:1,u_shapeScale:.32,u_distortion:.62,u_swirl:.75,u_swirlIterations:5,u_time:2};
  for (const [name,value] of Object.entries(settings)) uniforms[name] = {value};
  uniforms.u_resolution = {value:new THREE.Vector2()};
  for (const key of ['u_color1','u_color2','u_color3']) uniforms[key] = {value:new THREE.Vector4()};
  function palette() {
    const colors = document.documentElement.dataset.theme === 'light' ?
      [[.95,.76,.6],[.9,.36,.27],[.46,.34,.68]] : [[.055,.16,.24],[.08,.61,.62],[.94,.44,.56]];
    colors.forEach((rgb,i)=>uniforms['u_color'+(i+1)].value.set(...rgb,1));
  }
  const material = new THREE.RawShaderMaterial({glslVersion:THREE.GLSL3,uniforms,
    vertexShader:'in vec3 position; void main(){gl_Position=vec4(position.xy,0.,1.);}',
    fragmentShader:fragmentShader});
  const scene = new THREE.Scene();
  scene.add(new THREE.Mesh(new THREE.PlaneGeometry(2,2),material));
  const camera = new THREE.Camera();
  function resize() {
    const width = Math.min(880, host.clientWidth);
    const height = Math.max(1,Math.round(width * host.clientHeight / host.clientWidth));
    renderer.setSize(width,height,false);
    uniforms.u_resolution.value.set(width,height);
  }
  new ResizeObserver(resize).observe(host);
  palette();
  resize();
  addEventListener('themechange',palette);
  render = seconds => {uniforms.u_time.value=seconds*.22;renderer.render(scene,camera);};
  sync();
}

const fragmentShader = `
precision highp float;

uniform float u_time;
uniform float u_pixelRatio;
uniform vec2 u_resolution;

uniform float u_scale;
uniform float u_rotation;
uniform vec4 u_color1;
uniform vec4 u_color2;
uniform vec4 u_color3;
uniform float u_proportion;
uniform float u_softness;
uniform float u_shape;
uniform float u_shapeScale;
uniform float u_distortion;
uniform float u_swirl;
uniform float u_swirlIterations;

out vec4 fragColor;

#define TWO_PI 6.28318530718
#define PI 3.14159265358979323846

vec2 rotate(vec2 uv, float th) {
  return mat2(cos(th), sin(th), -sin(th), cos(th)) * uv;
}

float random(vec2 st) {
  return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

float noise(vec2 st) {
  vec2 i = floor(st);
  vec2 f = fract(st);
  float a = random(i);
  float b = random(i + vec2(1.0, 0.0));
  float c = random(i + vec2(0.0, 1.0));
  float d = random(i + vec2(1.0, 1.0));

  vec2 u = f * f * (3.0 - 2.0 * f);

  float x1 = mix(a, b, u.x);
  float x2 = mix(c, d, u.x);
  return mix(x1, x2, u.y);
}

vec4 blend_colors(vec4 c1, vec4 c2, vec4 c3, float mixer, float edgesWidth, float edge_blur) {
    vec3 color1 = c1.rgb * c1.a;
    vec3 color2 = c2.rgb * c2.a;
    vec3 color3 = c3.rgb * c3.a;

    float r1 = smoothstep(.0 + .35 * edgesWidth, .7 - .35 * edgesWidth + .5 * edge_blur, mixer);
    float r2 = smoothstep(.3 + .35 * edgesWidth, 1. - .35 * edgesWidth + edge_blur, mixer);

    vec3 blended_color_2 = mix(color1, color2, r1);
    float blended_opacity_2 = mix(c1.a, c2.a, r1);

    vec3 c = mix(blended_color_2, color3, r2);
    float o = mix(blended_opacity_2, c3.a, r2);
    return vec4(c, o);
}

void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;

    float t = .5 * u_time;

    float noise_scale = .0005 + .006 * u_scale;

    uv -= .5;
    uv *= (noise_scale * u_resolution);
    uv = rotate(uv, u_rotation * .5 * PI);
    uv /= u_pixelRatio;
    uv += .5;

    float n1 = noise(uv * 1. + t);
    float n2 = noise(uv * 2. - t);
    float angle = n1 * TWO_PI;
    uv.x += 4. * u_distortion * n2 * cos(angle);
    uv.y += 4. * u_distortion * n2 * sin(angle);

    float iterations_number = ceil(clamp(u_swirlIterations, 1., 30.));
    for (float i = 1.; i <= iterations_number; i++) {
        uv.x += clamp(u_swirl, 0., 2.) / i * cos(t + i * 1.5 * uv.y);
        uv.y += clamp(u_swirl, 0., 2.) / i * cos(t + i * 1. * uv.x);
    }

    float proportion = clamp(u_proportion, 0., 1.);

    float shape = 0.;
    float mixer = 0.;
    if (u_shape < .5) {
      vec2 checks_shape_uv = uv * (.5 + 3.5 * u_shapeScale);
      shape = .5 + .5 * sin(checks_shape_uv.x) * cos(checks_shape_uv.y);
      mixer = shape + .48 * sign(proportion - .5) * pow(abs(proportion - .5), .5);
    } else if (u_shape < 1.5) {
      vec2 stripes_shape_uv = uv * (.25 + 3. * u_shapeScale);
      float f = fract(stripes_shape_uv.y);
      shape = smoothstep(.0, .55, f) * smoothstep(1., .45, f);
      mixer = shape + .48 * sign(proportion - .5) * pow(abs(proportion - .5), .5);
    } else {
      float sh = 1. - uv.y;
      sh -= .5;
      sh /= (noise_scale * u_resolution.y);
      sh += .5;
      float shape_scaling = .2 * (1. - u_shapeScale);
      shape = smoothstep(.45 - shape_scaling, .55 + shape_scaling, sh + .3 * (proportion - .5));
      mixer = shape;
    }

    vec4 color_mix = blend_colors(u_color1, u_color2, u_color3, mixer, 1. - clamp(u_softness, 0., 1.), .01 + .01 * u_scale);

    fragColor = vec4(color_mix.rgb, color_mix.a);
}
`;

let attempted = false;
function refresh() {
  if (allowed() && !attempted && !location.search.includes('renderer=software')) {
    attempted = true;
    setup().catch(() => {canvas.hidden = true;});
  }
  sync();
}
new IntersectionObserver(([entry]) => {visible=entry.isIntersecting;refresh();}).observe(host);
document.addEventListener('visibilitychange',refresh);
addEventListener('effectschange',refresh);
reduced.addEventListener('change',refresh);
canvas.addEventListener('webglcontextlost',()=>{render=null;sync();});
