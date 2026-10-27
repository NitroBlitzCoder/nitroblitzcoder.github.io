"""Convert the included GPL-2.0-or-later AC3D meshes for the web presentation.
Preserves geometry, bakes object transforms, omits landing gear and cockpit internals.
The source AC3D files and their license are distributed alongside the JSON derivative.
"""
from pathlib import Path
import json,numpy as np
P=Path(__file__).resolve().parent

def read(path):
 import re
 blocks=re.split(r'^OBJECT ',path.read_text(),flags=re.M)[1:];objects=[]
 for block in blocks:
  lines=block.splitlines();o={'name':lines[0],'verts':[],'faces':[],'loc':[0,0,0],'rot':np.eye(3).tolist(),'kids':[]}
  for i,l in enumerate(lines):
   w=l.split()
   if not w:continue
   if w[0]=='name':o['name']=l[5:].strip('"')
   elif w[0]=='loc':o['loc']=list(map(float,w[1:]))
   elif w[0]=='rot':o['rot']=np.array(list(map(float,w[1:]))).reshape(3,3).tolist()
   elif w[0]=='numvert':o['verts']=[list(map(float,v.split())) for v in lines[i+1:i+1+int(w[1])]]
   elif w[0]=='refs':
    inds=[int(v.split()[0]) for v in lines[i+1:i+1+int(w[1])]]
    for k in range(1,len(inds)-1):o['faces'].extend([inds[0],inds[k],inds[k+1]])
   elif w[0]=='kids':o['count']=int(w[1])
  objects.append(o)
 idx=0
 def nest():
  nonlocal idx
  o=objects[idx];idx+=1
  for _ in range(o.get('count',0)):
   if idx<len(objects):o['kids'].append(nest())
  return o
 return nest()

parts=[]
def flatten(o,parent=np.eye(4),ancestry=''):
 m=np.eye(4);m[:3,:3]=o['rot'];m[:3,3]=o['loc'];m=parent@m
 ancestry+='/'+o['name']
 if o['verts'] and o['faces']:
  v=np.array(o['verts']);v=(m[:3,:3]@v.T).T+m[:3,3]
  name=o['name'];skip=any(k.lower() in ancestry.lower() for k in ['Train','Roue','Siege','Cockpit','Panel','Pilote','Chute','Probe','noshadow'])
  # Canopy shells and glass are exterior surfaces.
  if any(k in name for k in ['Canopy','Vitrage','PareBrise','Vitre']):skip=False
  if not skip:
   parts.append({'name':name,'positions':np.round(v,5).flatten().tolist(),'indices':o['faces']})
   print(name,len(v),'bounds',np.round(v.min(0),2),np.round(v.max(0),2))
 for child in o['kids']:flatten(child,m,ancestry)
for name in ['SR-71-Blackbird-Base.ac','SR-71A-Blackbird.ac']:flatten(read(P/name))
(P.parent/'assets/blackbird.json').write_text(json.dumps({'source':'l0k1/SR71-BlackBird','license':'GPL-2.0-or-later','parts':parts},separators=(',',':')))
print('parts',len(parts))
