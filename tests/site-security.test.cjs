const {test}=require('node:test');
const assert=require('node:assert/strict');
const {readFileSync,openSync,readSync,closeSync,readdirSync}=require('node:fs');
const {resolve,join}=require('node:path');
const {createHash}=require('node:crypto');
const root=resolve(__dirname,'..');
for(const route of ['index.html','photography/index.html']) test(`${route}: resource policy protects both static entry points`,()=>{
 const html=readFileSync(join(root,route),'utf8');
 const meta=html.match(/<meta http-equiv="Content-Security-Policy" content="([^"]+)"/i);
 assert.ok(meta,'security policy is required');
 const rules=new Map(meta[1].split(';').map(v=>v.trim().split(/\s+/)).filter(v=>v[0]).map(([name,...values])=>[name,values]));
 for(const key of ['default-src','object-src','base-uri','form-action','frame-src','worker-src','script-src-attr'])assert.deepEqual(rules.get(key),["'none'"]);
 assert.deepEqual(rules.get('connect-src'),["'self'"]);
 assert.deepEqual(rules.get('font-src'),["'self'"]);
 const scripts=rules.get('script-src');assert.ok(scripts.includes("'self'"));
 assert.ok(!scripts.some(v=>v==='*'||v.includes('unsafe-')||v==='https:'||v==='data:'));
 for(const script of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)){
  assert.ok(meta.index<script.index,'policy must precede scripts');
  const src=script[1].match(/\bsrc="([^"]+)"/);
  if(src){assert.ok(!/^(?:[a-z]+:|\/\/)/i.test(src[1]),'executable resource must be local');continue;}
  assert.match(script[1],/type="importmap"/,'no inline executable script');
  const digest=createHash('sha256').update(script[2]).digest('base64');
  assert.ok(scripts.includes(`'sha256-${digest}'`),'import map hash must match exact bytes');
 }
 assert.ok(!/<[^>]+\son[a-z]+\s*=/i.test(html),'no inline event handlers');
 assert.match(html,/<meta name="referrer" content="no-referrer">/);
});
test('published photographs contain no EXIF/XMP metadata',()=>{
 let checked=0;
 for(const folder of ['photography/images','photography/thumbs'])for(const name of readdirSync(join(root,folder)).filter(n=>n.endsWith('.webp'))){
  const file=join(root,folder,name),fd=openSync(file,'r');
  try{
   const header=Buffer.alloc(12);assert.equal(readSync(fd,header,0,12,0),12);assert.equal(header.toString('ascii',0,4),'RIFF');assert.equal(header.toString('ascii',8,12),'WEBP');
   const end=header.readUInt32LE(4)+8;let offset=12;
   while(offset<end){const chunk=Buffer.alloc(8);assert.equal(readSync(fd,chunk,0,8,offset),8);const kind=chunk.toString('ascii',0,4);assert.ok(!['EXIF','XMP '].includes(kind),`${folder}/${name}: private metadata chunk ${kind}`);const size=chunk.readUInt32LE(4);offset+=8+size+(size%2);assert.ok(offset<=end,'invalid chunk length');}
   assert.equal(offset,end);checked++;
  }finally{closeSync(fd);}
 }
 assert.ok(checked>0,'published photographs must be checked');
});
