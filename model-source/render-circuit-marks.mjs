// Offline visibility-tested technical drawings from the licensed meshes shipped with this site.
// Usage: node model-source/render-margin-marks.mjs [site-root] [output-directory]
// Render: magick -size 800x360 xc:none -draw @asset.mvg asset.webp
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
  // Visibility-tested crease lines give a technical drawing, not an all-edge wireframe.
  const width=800,height=360,depth=new Float32Array(width*height).fill(-Infinity);
  const point=p=>[((p.dot(right)-minX)*scale+xOffset)*2,((-p.dot(up)-minY)*scale+yOffset)*2,p.dot(direction)];
  for(const triangle of triangles){
    const [a,b,c]=triangle.map(point),den=(b[1]-c[1])*(a[0]-c[0])+(c[0]-b[0])*(a[1]-c[1]);
    if(Math.abs(den)<.001)continue;
    const loX=Math.max(0,Math.floor(Math.min(a[0],b[0],c[0]))),hiX=Math.min(width-1,Math.ceil(Math.max(a[0],b[0],c[0])));
    const loY=Math.max(0,Math.floor(Math.min(a[1],b[1],c[1]))),hiY=Math.min(height-1,Math.ceil(Math.max(a[1],b[1],c[1])));
    for(let y=loY;y<=hiY;y++)for(let x=loX;x<=hiX;x++){
      const u=((b[1]-c[1])*(x-c[0])+(c[0]-b[0])*(y-c[1]))/den;
      const w=((c[1]-a[1])*(x-c[0])+(a[0]-c[0])*(y-c[1]))/den,v=1-u-w;
      if(u<0||w<0||v<0)continue;
      const z=u*a[2]+w*b[2]+v*c[2],i=y*width+x;if(z>depth[i])depth[i]=z;
    }
  }
  const geometry=new THREE.BufferGeometry();
  geometry.setAttribute('position',new THREE.Float32BufferAttribute(triangles.flatMap(face=>face.flatMap(p=>[p.x,p.y,p.z])),3));
  const edges=new THREE.EdgesGeometry(geometry,42).attributes.position;
  const commands=['push graphic-context','fill none',"stroke '#86b6d7'",'stroke-width 0.9'];
  const tolerance=(maxX-minX)*.003;
  for(let i=0;i<edges.count;i+=2){
    const [a,b]=[i,i+1].map(n=>point(new THREE.Vector3().fromBufferAttribute(edges,n)));
    const length=Math.hypot(b[0]-a[0],b[1]-a[1]);if(length<3)continue;
    const steps=Math.ceil(length),visible=[];
    let start=null,last=null;
    const flush=()=>{if(start&&last&&Math.hypot(last[0]-start[0],last[1]-start[1])>1.4)commands.push('line '+start.join(',')+' '+last.join(','));start=last=null;};
    for(let k=0;k<=steps;k++){
      const t=k/steps,x=a[0]+(b[0]-a[0])*t,y=a[1]+(b[1]-a[1])*t,z=a[2]+(b[2]-a[2])*t;
      const ix=Math.round(x),iy=Math.round(y),d=depth[iy*width+ix];
      if(ix>=0&&ix<width&&iy>=0&&iy<height&&z>=d-tolerance){const p=[x.toFixed(2),y.toFixed(2)];if(!start)start=p;last=p;}else flush();
    }
    flush();
  }
  commands.push('pop graphic-context');fs.mkdirSync(output,{recursive:true});
  fs.writeFileSync(path.join(output,name+'.mvg'),commands.join('\n'));
  console.log(name,triangles.length,'mesh triangles');triangles.length=0;
}
const aircraft=JSON.parse(fs.readFileSync(path.join(root,'assets/blackbird.json'),'utf8'));
for(const part of aircraft.parts)project(part.positions,part.indices,new THREE.Matrix4());
save('aircraft-circuit',[-5,12,7]);
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
save('car-circuit',[-8,3.8,12]);
