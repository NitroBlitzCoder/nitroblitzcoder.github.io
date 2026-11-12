from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit,unquote
import re, sys, subprocess, json
root=Path(sys.argv[1]) if len(sys.argv)>1 else Path(__file__).resolve().parents[1]; failures=[]; references=set(); fragments=[]
class HTML(HTMLParser):
 def __init__(self): super().__init__(); self.ids=set(); self.refs=[]
 def handle_starttag(self,tag,attrs):
  d=dict(attrs)
  if 'id' in d:
   if d['id'] in self.ids: failures.append('duplicate id '+d['id'])
   self.ids.add(d['id'])
  for key in ('src','href','poster'):
   if d.get(key): self.refs.append(d[key])
parsed={}
for path in [root/'index.html',root/'photography/index.html']:
 p=HTML();p.feed(path.read_text());parsed[path]=p
 for ref in p.refs:
  u=urlsplit(ref)
  if u.scheme or u.netloc: continue
  target=path.parent/unquote(u.path) if u.path else path
  if target.is_dir(): target=target/'index.html'
  references.add(target)
  if not target.exists():failures.append(f'{path.relative_to(root)}: missing {ref}')
  if u.fragment: fragments.append((path,ref,target,u.fragment))
for source,ref,target,frag in fragments:
 p=parsed.get(target)
 if p and frag not in p.ids: failures.append(f'{source.relative_to(root)}: missing anchor {ref}')
for path in list(root.glob('*.css'))+list((root/'photography').glob('*.css'))+list(root.glob('*.js'))+list((root/'photography').glob('*.js')):
 s=path.read_text()
 refs=re.findall(r'''url\(\s*['"]?([^\s)'";]+)|(?:from\s*|import\s*\()\s*['"]([^'"]+)''',s)
 for pair in refs:
  ref=next(x for x in pair if x);u=urlsplit(ref)
  if u.scheme or u.netloc or ref.startswith('#') or (not ref.startswith(('.', '/')) and path.suffix=='.js'):continue
  target=path.parent/unquote(u.path);references.add(target)
  if not target.exists(): failures.append(f'{path.relative_to(root)}: missing {ref}')
for path in list(root.glob('*.js'))+list(root.glob('*.mjs'))+list((root/'photography').glob('*.js')):
 result=subprocess.run(['node','--input-type=module','--check'],input=path.read_text(),text=True,capture_output=True)
 if result.returncode:failures.append(f'{path.name}: syntax error {result.stderr}')
print(f'Checked {len(references)} unique local resources, both route anchor sets, and JavaScript module syntax.')
for f in failures: print('FAIL:',f)
print('PASS' if not failures else f'{len(failures)} failure(s)')
sys.exit(bool(failures))
