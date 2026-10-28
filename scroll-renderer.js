import * as THREE from 'three';
const vertex=`
  uniform vec2 uSize;
  uniform float uReveal;
  uniform float uDeparture;
  uniform float uVelocity;
  uniform float uMode;
  uniform float uStrength;
  attribute vec2 aCenter;
  attribute float aSeed;
  varying vec2 vUv;
  varying float vLight;
  void main(){
    vUv=uv;
    float remaining=1.-uReveal;
    vec2 local=(uv-aCenter)*uSize;
    vec3 p=vec3((uv-.5)*uSize,0.);
    float strength=uStrength;
    if(uMode<.5){
      float angle=(aCenter.x-.5)*remaining*.65*strength;
      p.x=aCenter.x*uSize.x-uSize.x*.5+local.x*cos(angle);
      p.z=-local.x*sin(angle);
      float wave=sin(uv.y*3.14159265);
      p.z+=wave*(remaining*.09+uVelocity*.018+uDeparture*.018)*min(uSize.x,uSize.y)*strength;
      p.x+=wave*uVelocity*5.*strength;
      vLight=1.-remaining*.045+wave*abs(uVelocity)*.015;
    }else if(uMode<1.5){
      float lag=clamp(remaining*(.6+aSeed*.6),0.,1.);
      float angle=lag*(aSeed-.5)*1.2*strength;
      float c=cos(angle),s=sin(angle);
      local*=1.-lag*.55;
      p.xy=(aCenter-.5)*uSize+mat2(c,-s,s,c)*local;
      p.x+=sin(aSeed*41.)*lag*uSize.x*.055*strength;
      p.y+=cos(aSeed*29.)*lag*uSize.y*.09*strength;
      p.z+=lag*(.3+aSeed)*85.*strength;
      vLight=.94+.06*uReveal;
    }else{
      float angle=(aCenter.x-.5)*remaining*.82*strength;
      p.x=(aCenter.x-.5)*uSize.x+local.x*cos(angle)+(aCenter.x-.5)*remaining*uSize.x*.09*strength;
      p.z=-local.x*sin(angle)-remaining*abs(aCenter.x-.5)*110.*strength;
      p.y+=remaining*(aCenter.x-.5)*22.*strength;
      p.z+=sin(uv.y*3.14159265)*uVelocity*min(uSize.x,uSize.y)*.015*strength;
      vLight=1.-remaining*abs(aCenter.x-.5)*.1;
    }
    gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1.);
  }`;
const fragment=`
  uniform sampler2D uImage;
  uniform vec4 uCrop;
  uniform vec4 uClip;
  uniform vec2 uViewport;
  uniform float uDpr;
  uniform float uSplit;
  uniform float uMode;
  varying vec2 vUv;
  varying float vLight;
  void main(){
    vec2 screen=vec2(gl_FragCoord.x/uDpr,uViewport.y-gl_FragCoord.y/uDpr);
    if(screen.x<uClip.x||screen.y<uClip.y||screen.x>uClip.z||screen.y>uClip.w)discard;
    if(uMode>.5&&uMode<1.5&&screen.x<uSplit)discard;
    vec4 color=texture2D(uImage,uCrop.xy+vUv*uCrop.zw);
    gl_FragColor=vec4(color.rgb*vLight,color.a);
    #include <colorspace_fragment>
  }`;
function geometry(columns,rows,sx,sy){
  const positions=[],uvs=[],centers=[],seeds=[];
  function point(x,y,cx,cy,seed){positions.push(x-.5,y-.5,0);uvs.push(x,y);centers.push(cx,cy);seeds.push(seed);}
  for(let row=0;row<rows;row++)for(let col=0;col<columns;col++){
    const cx=(col+.5)/columns,cy=(row+.5)/rows,seed=((col*73+row*31)%101)/101;
    for(let y=0;y<sy;y++)for(let x=0;x<sx;x++){
      const x0=(col+x/sx)/columns,x1=(col+(x+1)/sx)/columns,y0=(row+y/sy)/rows,y1=(row+(y+1)/sy)/rows;
      for(const [u,v] of [[x0,y0],[x1,y0],[x1,y1],[x0,y0],[x1,y1],[x0,y1]])point(u,v,cx,cy,seed);
    }
  }
  const g=new THREE.BufferGeometry();
  g.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));g.setAttribute('uv',new THREE.Float32BufferAttribute(uvs,2));g.setAttribute('aCenter',new THREE.Float32BufferAttribute(centers,2));g.setAttribute('aSeed',new THREE.Float32BufferAttribute(seeds,1));return g;
}
export function createScrollRenderer(canvas){
  const renderer=new THREE.WebGLRenderer({canvas,alpha:true,antialias:true,powerPreference:'low-power',preserveDrawingBuffer:true});
  renderer.debug.onShaderError=()=>{throw new Error('Scroll material unavailable');};
  renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.setClearColor(0x09111d,0);
  const scene=new THREE.Scene(),camera=new THREE.PerspectiveCamera(35,1,.1,10000),panels=[];
  let width=0,height=0,dpr=1;
  function resize(){width=innerWidth;height=innerHeight;dpr=Math.min(devicePixelRatio||1,innerWidth<700?1.1:1.4);renderer.setPixelRatio(dpr);renderer.setSize(width,height,false);camera.aspect=width/height;camera.position.z=height/(2*Math.tan(THREE.MathUtils.degToRad(17.5)));camera.updateProjectionMatrix();}
  function add(image,mode){
    const map=new THREE.Texture(image);map.colorSpace=THREE.SRGBColorSpace;map.needsUpdate=true;map.minFilter=map.magFilter=THREE.LinearFilter;map.generateMipmaps=false;
    const g=mode===1?geometry(24,14,1,1):geometry(mode===0?1:3,1,mode===0?48:8,32);
    const uniforms={uImage:{value:map},uSize:{value:new THREE.Vector2()},uReveal:{value:1},uDeparture:{value:0},uVelocity:{value:0},uMode:{value:mode},uStrength:{value:1},uCrop:{value:new THREE.Vector4(0,0,1,1)},uClip:{value:new THREE.Vector4()},uViewport:{value:new THREE.Vector2()},uDpr:{value:1},uSplit:{value:0}};
    const material=new THREE.ShaderMaterial({vertexShader:vertex,fragmentShader:fragment,uniforms,transparent:true,side:THREE.DoubleSide,depthWrite:false});
    const mesh=new THREE.Mesh(g,material);mesh.visible=false;mesh.frustumCulled=false;scene.add(mesh);
    const panel={mesh,show(pose,clip,state,velocity,split){
      mesh.visible=true;mesh.position.set(pose.left+pose.width/2-width/2,height/2-pose.top-pose.height/2,0);
      uniforms.uSize.value.set(pose.width,pose.height);uniforms.uCrop.value.fromArray(pose.crop);uniforms.uClip.value.set(clip.left,clip.top,clip.left+clip.width,clip.top+clip.height);
      uniforms.uViewport.value.set(width,height);uniforms.uDpr.value=dpr;uniforms.uReveal.value=state.reveal;uniforms.uDeparture.value=state.departure;uniforms.uVelocity.value=velocity;uniforms.uStrength.value=state.strength;uniforms.uSplit.value=split;
    },hide(){mesh.visible=false;}};panels.push(panel);return panel;
  }
  resize();return{add,resize,render(){renderer.render(scene,camera);},clear(){panels.forEach(p=>p.hide());renderer.clear();},dispose(){panels.forEach(p=>{p.mesh.geometry.dispose();p.mesh.material.uniforms.uImage.value.dispose();p.mesh.material.dispose();});renderer.dispose();}};
}
