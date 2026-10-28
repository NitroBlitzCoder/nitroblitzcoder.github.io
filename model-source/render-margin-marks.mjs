// Offline orthographic silhouettes from the licensed meshes shipped with this site.
// Usage: node model-source/render-margin-marks.mjs [site-root] [output-directory]
// Convert the SVG intermediates with ImageMagick: magick -background none input.svg output.webp
import fs from 'node:fs';
import path from 'node:path';
import {pathToFileURL} from 'node:url';
const root = process.argv[2] || process.cwd();
const output = process.argv[3] || path.join(root, 'assets');
const THREE = await import(pathToFileURL(path.join(root, 'vendor/three/build/three.module.js')));
const triangles = [];
const v = new THREE.Vector3();
function project(vertices, indices, matrix) {
  for (let i=0; i<indices.length; i+=3) {
    const face=[];
    for (let j=0; j<3; j++) {v.fromArray(vertices, indices[i+j]*3).applyMatrix4(matrix);face.push(v.clone());}
    triangles.push(face);
  }
}
function save(name, eye) {
  const direction=new THREE.Vector3(...eye).normalize();
  const right=new THREE.Vector3(0,1,0).cross(direction).normalize();
  const up=direction.clone().cross(right).normalize();
  let minX=Infinity,minY=Infinity,maxX=-Infinity,maxY=-Infinity;
  const faces=triangles.map(face=>face.map(p=>{
    const x=p.dot(right),y=-p.dot(up);minX=Math.min(minX,x);maxX=Math.max(maxX,x);minY=Math.min(minY,y);maxY=Math.max(maxY,y);return[x,y];
  }));
  const scale=Math.min(384/(maxX-minX),164/(maxY-minY));
  const xOffset=(400-(maxX-minX)*scale)/2,yOffset=(180-(maxY-minY)*scale)/2;
  const polygons=faces.map(face=>'<path d="M'+face.map(([x,y])=>((x-minX)*scale+xOffset).toFixed(2)+','+((y-minY)*scale+yOffset).toFixed(2)).join('L')+'Z"/>').join('');
  fs.mkdirSync(output,{recursive:true});
  fs.writeFileSync(path.join(output,name+'.svg'),'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 180" width="400" height="180"><g fill="white">'+polygons+'</g></svg>');
  console.log(name,triangles.length,'mesh triangles');triangles.length=0;
}
const aircraft=JSON.parse(fs.readFileSync(path.join(root,'assets/blackbird.json'),'utf8'));
for(const part of aircraft.parts)project(part.positions,part.indices,new THREE.Matrix4());
save('aircraft-mark',[-5,12,7]);
const glb=fs.readFileSync(path.join(root,'assets/mclaren-p1-gtr.glb'));
let json,binary;
for(let offset=12;offset<glb.length;){const length=glb.readUInt32LE(offset),type=glb.readUInt32LE(offset+4);const chunk=glb.subarray(offset+8,offset+8+length);if(type===0x4e4f534a)json=JSON.parse(chunk.toString());else if(type===0x004e4942)binary=chunk;offset+=8+length;}
function accessor(index){
  const a=json.accessors[index],b=json.bufferViews[a.bufferView];
  const types={5126:[4,'readFloatLE'],5125:[4,'readUInt32LE'],5123:[2,'readUInt16LE'],5121:[1,'readUInt8']};
  const [size,read]=types[a.componentType],components={SCALAR:1,VEC2:2,VEC3:3,VEC4:4}[a.type];
  const stride=b.byteStride||size*components,base=(b.byteOffset||0)+(a.byteOffset||0),values=[];
  for(let i=0;i<a.count;i++)for(let k=0;k<components;k++)values.push(binary[read](base+i*stride+k*size));
  return values;
}
function traverse(index,parent){
  const node=json.nodes[index],local=new THREE.Matrix4();
  if(node.matrix)local.fromArray(node.matrix);else local.compose(new THREE.Vector3(...(node.translation||[0,0,0])),new THREE.Quaternion(...(node.rotation||[0,0,0,1])),new THREE.Vector3(...(node.scale||[1,1,1])));
  const world=parent.clone().multiply(local);
  if(node.mesh!==undefined)for(const primitive of json.meshes[node.mesh].primitives){if(primitive.mode!==undefined&&primitive.mode!==4)continue;const positions=accessor(primitive.attributes.POSITION),indices=primitive.indices===undefined?positions.filter((_,i)=>i%3===0).map((_,i)=>i):accessor(primitive.indices);project(positions,indices,world);}
  for(const child of node.children||[])traverse(child,world);
}
for(const node of json.scenes[json.scene||0].nodes)traverse(node,new THREE.Matrix4());
save('car-mark',[-8,3.8,12]);
