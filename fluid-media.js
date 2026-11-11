import * as THREE from 'three';
export {THREE};
export function mediaMaterial(texture,reflection=false){
 return new THREE.ShaderMaterial({transparent:true,side:THREE.DoubleSide,depthWrite:!reflection,uniforms:{uMap:{value:texture},uTime:{value:0},uBend:{value:0},uVelocity:{value:0},uOpacity:{value:1},uReflection:{value:reflection?1:0}},vertexShader:`varying vec2 vUv;uniform float uTime,uBend,uVelocity;void main(){vUv=uv;vec3 p=position;p.z+=sin(uv.x*3.14159265)*(uBend+sin(uv.y*3.14159265+uTime*.65)*uVelocity*5.);p.y+=sin(uv.x*6.283185+uTime)*uVelocity*.008;gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1.);}`,fragmentShader:`varying vec2 vUv;uniform sampler2D uMap;uniform float uTime,uVelocity,uOpacity,uReflection;void main(){vec2 uv=vUv;uv.x+=sin(uv.y*12.+uTime)*uVelocity*.0006;vec4 color=texture2D(uMap,clamp(uv,0.,1.));float alpha=uOpacity;if(uReflection>.5){alpha*=.14*pow(1.-vUv.y,2.3);}gl_FragColor=vec4(color.rgb,alpha);#include <tonemapping_fragment>
#include <colorspace_fragment>
}`.replace(';#include',';\n#include')});
}
export function makeRenderer(canvas){const renderer=new THREE.WebGLRenderer({canvas,alpha:true,antialias:true,powerPreference:'high-performance'});renderer.setPixelRatio(Math.min(devicePixelRatio||1,1.7));renderer.setClearColor(0,0);renderer.outputColorSpace=THREE.SRGBColorSpace;return renderer;}
