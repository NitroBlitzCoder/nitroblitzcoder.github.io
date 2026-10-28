import * as THREE from 'three';
const vertex=`
  uniform vec2 uSize;
  uniform float uBend;
  varying vec2 vUv;
  varying vec3 vNormal;
  void main(){
    vUv=uv;
    vec3 p=position;
    float amplitude=min(uSize.x,uSize.y)*uBend;
    p.x*=uSize.x;p.y*=uSize.y;
    p.z+=sin(uv.x*3.14159265)*sin(uv.y*3.14159265)*amplitude;
    vNormal=normalize(normalMatrix*vec3(-cos(uv.x*3.14159265)*sin(uv.y*3.14159265)*3.14159265*amplitude/uSize.x,-sin(uv.x*3.14159265)*cos(uv.y*3.14159265)*3.14159265*amplitude/uSize.y,1.));
    gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1.);
  }`;
const fragment=`
  uniform sampler2D uImage;
  uniform vec4 uCrop;
  uniform float uAlpha;
  uniform float uShine;
  uniform float uSweep;
  varying vec2 vUv;
  varying vec3 vNormal;
  void main(){
    vec4 color=texture2D(uImage,uCrop.xy+vUv*uCrop.zw);
    float light=.96+.04*abs(dot(normalize(vNormal),normalize(vec3(-.3,.7,1.))));
    float reflection=pow(max(0.,1.-abs(vUv.x+vUv.y*.24-uSweep)*2.8),10.)*uShine;
    color.rgb=color.rgb*light+vec3(.7,.85,1.)*reflection;
    gl_FragColor=vec4(color.rgb,color.a*uAlpha);
    #include <colorspace_fragment>
  }`;
export function createRenderer(canvas) {
  const renderer=new THREE.WebGLRenderer({canvas,alpha:true,antialias:true,powerPreference:'low-power',preserveDrawingBuffer:true});
  renderer.outputColorSpace=THREE.SRGBColorSpace;
  renderer.setClearColor(0x09111d,0);
  const scene=new THREE.Scene(),camera=new THREE.PerspectiveCamera(35,1,.1,10000);
  const geometry=new THREE.PlaneGeometry(1,1,48,24),textures=new Map(),panels=[];
  let width=0,height=0;
  function resize(){
    width=innerWidth;height=innerHeight;renderer.setPixelRatio(Math.min(devicePixelRatio||1,innerWidth<700?1.25:1.5));
    renderer.setSize(width,height,false);camera.aspect=width/height;camera.position.z=height/(2*Math.tan(THREE.MathUtils.degToRad(17.5)));camera.updateProjectionMatrix();
  }
  function texture(image){
    if(textures.has(image.src))return textures.get(image.src);
    const map=new THREE.Texture(image);map.colorSpace=THREE.SRGBColorSpace;map.needsUpdate=true;map.minFilter=THREE.LinearFilter;map.magFilter=THREE.LinearFilter;map.generateMipmaps=false;textures.set(image.src,map);return map;
  }
  function panel(image){
    const uniforms={uImage:{value:texture(image)},uSize:{value:new THREE.Vector2(1,1)},uCrop:{value:new THREE.Vector4(0,0,1,1)},uBend:{value:0},uAlpha:{value:1},uShine:{value:0},uSweep:{value:0}};
    const material=new THREE.ShaderMaterial({vertexShader:vertex,fragmentShader:fragment,uniforms,transparent:true,side:THREE.DoubleSide,depthWrite:false});
    const mesh=new THREE.Mesh(geometry,material);scene.add(mesh);
    const item={mesh,pose:null,set(pose){
      item.pose=pose;mesh.position.set(pose.left+pose.width/2-width/2,height/2-pose.top-pose.height/2,pose.z);
      mesh.rotation.set(pose.rx,pose.ry,pose.rz);uniforms.uSize.value.set(pose.width,pose.height);
      uniforms.uCrop.value.fromArray(pose.crop);uniforms.uBend.value=pose.bend;uniforms.uAlpha.value=pose.alpha;
      uniforms.uShine.value=pose.shine;uniforms.uSweep.value=1.3-pose.ry*2;
    }};panels.push(item);return item;
  }
  function clear(){panels.splice(0).forEach(p=>{scene.remove(p.mesh);p.mesh.material.dispose();});renderer.clear();}
  resize();
  return {panel,resize,clear,render(){renderer.render(scene,camera);},dispose(){clear();textures.forEach(t=>t.dispose());geometry.dispose();renderer.dispose();}};
}
