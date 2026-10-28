// Lifecycle regression tests. Run: node --test tests/ui.test.cjs
const {test} = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const source = fs.readFileSync(path.join(__dirname, '..', 'ui.js'), 'utf8');
function harness({reduced = false, fine = true, preference = null} = {}) {
  class Element {
    constructor() {
      this.events = {}; this.attrs = {}; this.hidden = false;
      const classes = new Set();
      this.classList = {add: name => classes.add(name), remove: name => classes.delete(name),
        contains: name => classes.has(name), toggle: (name, on) => on ? classes.add(name) : classes.delete(name)};
      this.style = {setProperty: (name, value) => this.style[name] = value};
    }
    addEventListener(type, callback) { (this.events[type] ||= []).push(callback); }
    dispatchEvent(event) { (this.events[event.type] || []).forEach(callback => callback(event)); }
    fire(type, values = {}) { this.dispatchEvent({type, target: this, ...values}); }
    setAttribute(name, value) { this.attrs[name] = value; }
    getAttribute(name) { return this.attrs[name] ?? null; }
    closest() { return null; }
    querySelector() { return this.closeButton; }
    showModal() { this.open = true; }
    close() { this.open = false; this.fire('close'); }
  }
  const elements = new Map();
  const get = selector => { if (!elements.has(selector)) elements.set(selector, new Element()); return elements.get(selector); };
  const dialogs = [get('#image-dialog'),get('#credits-dialog')];
  dialogs.forEach(dialog => { dialog.closeButton = new Element(); });
  const document = new Element(); document.body = new Element(); document.documentElement = new Element();
  document.querySelector = selector => selector === 'dialog[open]' ? dialogs.find(d => d.open) : get(selector);
  document.querySelectorAll = selector => selector === 'dialog' ? dialogs : [];
  document.hidden = false;
  const window = new Element();
  const media = [new Element(), new Element()]; media[0].matches = reduced; media[1].matches = fine;
  const context = {clears: 0, strokes: 0, clearRect() {this.clears++;}, setTransform() {}, beginPath() {}, moveTo() {}, lineTo() {}, stroke() {this.strokes++;}};
  get('#cursor-trail').getContext = () => context;
  get('#compare-range').value = '50'; get('#pan-x').value = '50'; get('#pan-y').value = '55';
  get('#zoom').setAttribute('aria-pressed','false');
  let now = 100, frameId = 0; const frames = new Map();
  vm.runInNewContext(source, {document, window, fetch: () => Promise.resolve({ok: false}), matchMedia: query => query.includes('reduced') ? media[0] : media[1],
    localStorage: {getItem: () => preference, setItem: (_, value) => {preference = value;}},
    performance: {now: () => now}, innerWidth: 1280, innerHeight: 720, devicePixelRatio: 2,
    requestAnimationFrame: fn => {frames.set(++frameId,fn); return frameId;}, cancelAnimationFrame: id => frames.delete(id),
    CustomEvent: class {constructor(type, options) {this.type = type; this.detail = options.detail;}}
  });
  const move = (x=40,y=50) => {now += 10; document.fire('pointermove',{pointerType:'mouse',clientX:x,clientY:y});};
  return {document,window,get,media,context,frames,move,tick(ms=16) {now += ms; const pending=[...frames.values()]; frames.clear(); pending.forEach(fn=>fn(now));}};
}
test('effects state matches its accessible pressed state',()=>{
  const h=harness(); assert.equal(h.window.portfolioEffects,true); assert.equal(h.get('#effects').getAttribute('aria-pressed'),'true');
  h.get('#effects').fire('click'); assert.equal(h.window.portfolioEffects,false); assert.equal(h.get('#effects').getAttribute('aria-pressed'),'false');
});
test('stored off and reduced motion suppress trail and cursor decoration',()=>{
  for(const settings of [{preference:'off'},{reduced:true},{fine:false}]) {
    const h=harness(settings); h.move(); assert.equal(h.frames.size,0); assert.equal(h.document.body.classList.contains('custom-cursor'),false);
  }
});
test('trail expires completely without an idle animation loop',()=>{
  const h=harness(); h.move(); h.move(70,70); h.tick(); assert.ok(h.context.strokes>0); h.tick(250); assert.equal(h.frames.size,0);
});
for(const [target,event,values] of [
  ['window','blur',{}],['window','resize',{}],['window','scroll',{}],['window','pagehide',{}],
  ['document','pointercancel',{}],['document','pointerout',{relatedTarget:null}],
  ['document','pointerdown',{pointerType:'touch'}],['document','visibilitychange',{}]
]) test(`${event} clears trail and pending frames`,()=>{
  const h=harness(); h.move(); assert.equal(h.frames.size,1); const before=h.context.clears;
  h[target].fire(event,values); assert.equal(h.frames.size,0); assert.ok(h.context.clears>before);
  h.move(200,200); assert.equal(h.frames.size,1);
});
test('document leave and effects changes reset trails',()=>{
  const h=harness(); h.move(); h.document.documentElement.fire('pointerleave'); assert.equal(h.frames.size,0);
  h.move(); h.get('#effects').fire('click'); assert.equal(h.frames.size,0); h.move(); assert.equal(h.frames.size,0);
});
test('opening and closing modal suspends trail cleanly',()=>{
  const h=harness(); h.move(); h.get('#credits-button').fire('click');
  assert.equal(h.frames.size,0); assert.ok(h.document.body.classList.contains('modal-open')); h.move(); assert.equal(h.frames.size,0);
  h.get('#credits-dialog').close(); assert.equal(h.document.body.classList.contains('modal-open'),false); h.move(); assert.equal(h.frames.size,1);
});
test('zoom reveals keyboard pan controls and range exposes comparison proportions',()=>{
  const h=harness(); h.get('#compare-range').value='80'; h.get('#compare-range').fire('input');
  assert.equal(h.get('#comparison-view').style['--split'],'80%');
  assert.equal(h.get('#compare-range').getAttribute('aria-valuetext'),'80% original, 20% mosaic');
  h.get('#zoom').fire('click'); assert.equal(h.get('#mosaic-pan').hidden,false); assert.equal(h.get('#comparison-view').style['--zoom'],'4');
  h.get('#zoom').fire('click'); assert.equal(h.get('#mosaic-pan').hidden,true); assert.equal(h.get('#comparison-view').style['--zoom'],'1');
});
