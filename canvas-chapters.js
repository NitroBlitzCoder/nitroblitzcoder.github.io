// The four background treatments share a single slot as the reader moves
// between chapters. Content and navigation remain in the normal DOM.
const field = document.createElement('div');
field.className = 'chapter-field';
field.setAttribute('aria-hidden', 'true');
document.body.append(field);
const reduced = matchMedia('(prefers-reduced-motion: reduce)');
const enabled = () => !reduced.matches && !document.hidden && window.portfolioEffects !== false;
const light = () => document.documentElement.dataset.theme === 'light';
const ink = () => light() ? '#0047ab' : '#ffac72';
const bg = () => getComputedStyle(document.body).getPropertyValue('--page-ground').trim();
const load = async name => {
  const module = await import('./vendor/canvas-ui/' + name + '.js');
  return module[{ 'particle-object':'createParticleObject', 'glyph-rain':'createGlyphRain',
    'particle-scroll':'createParticleScroll', 'decrypt-reveal':'createDecryptReveal' }[name]];
};
const commonElements = (content, output, paint) => ({ source: document.createElement('canvas'), content, output, paint });
function release(canvas, instance) {
  instance?.destroy();
  canvas.getContext('webgl2')?.getExtension('WEBGL_lose_context')?.loseContext();
  canvas.remove();
}
const refreshers = [];
function mount(host, name, className, setup) {
  let near = false, current = '', ticket = 0, cleanup;
  async function refresh() {
    const key = enabled() && near ? String(light()) : '';
    if (key === current) return;
    current = key;
    const token = ++ticket;
    cleanup?.();
    cleanup = undefined;
    if (!key) return;
    const create = await load(name);
    if (token !== ticket) return;
    const canvas = document.createElement('canvas');
    canvas.setAttribute('aria-hidden', 'true');
    canvas.className = className;
    host.append(canvas);
    let instance;
    try { instance = setup(create, canvas); }
    finally {
      if (instance) canvas.dataset.active = 'true';
      cleanup = () => { release(canvas, instance); host.classList.remove('object-ready'); };
      if (!instance) cleanup();
    }
  }
  new IntersectionObserver(([entry]) => { near = entry.isIntersecting; refresh(); }).observe(host);
  refreshers.push(refresh);
}
for (const host of document.querySelectorAll('[data-object]')) {
  mount(host, 'particle-object', 'object', (create, canvas) => create({canvas}, {
    src: host.querySelector('img').src, color: ink(), orbit: false, zoom: false, count: 10500,
    size: 2.3, radius: 85, strength: 1.4, floatSpeed: .65, rotationIntensity: .4, scale: host.classList.contains('flight-study') ? 4.2 : 4,
    onLoad: () => { if (canvas.isConnected) host.classList.add('object-ready'); }
  }));
}
mount(field, 'glyph-rain', 'signal', (create, canvas) => {
  const color = light() ? [0,.24,.55] : [1,.66,.4];
  return create(commonElements(field,canvas), {color, headColor:color, density:.28,
    speed:.58, speedVariance:.45, cell:17, trail:.8, charset:'01<>/[]{}:+*'});
});

// Rasterize visible typeset words at their native line-break positions.
// Only the disassembled pixels are drawn over the page by the shader.
const textSurface = document.createElement('div');
textSurface.className = 'letter-surface';
textSurface.setAttribute('aria-hidden','true');
document.body.append(textSurface);
const visible = new Set();
const textObserver = new IntersectionObserver(entries => {
  for (const entry of entries) {
    if (entry.isIntersecting) visible.add(entry.target); else visible.delete(entry.target);
  }
});
document.querySelectorAll('main :is(h1,h2,h3,p,li,figcaption,a,button,label,summary), #contact :is(h2,p,a)').forEach(el => textObserver.observe(el));
function printWords(ctx, width, height) {
  ctx.scale(width / innerWidth, height / innerHeight);
  ctx.textBaseline = 'middle';
  const range = document.createRange();
  for (const el of visible) {
    const bounds = el.getBoundingClientRect();
    if (bounds.bottom < 0 || bounds.top > innerHeight || (bounds.top > innerHeight * .24 && bounds.bottom < innerHeight * .46)) continue;
    const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
    for (let node; (node = walker.nextNode());) {
      const parent = node.parentElement;
      if (!node.data.trim() || parent.closest('svg, canvas, [hidden]') || parent.closest('h1,h2,h3,p,li,figcaption,a,button,label,summary') !== el) continue;
      const style = getComputedStyle(parent);
      ctx.font = [style.fontStyle, style.fontWeight, style.fontSize, style.fontFamily].join(' ');
      ctx.letterSpacing = style.letterSpacing === 'normal' ? '0px' : style.letterSpacing;
      ctx.fillStyle = style.color;
      for (const word of node.data.matchAll(/\S+/gu)) {
        range.setStart(node, word.index);
        range.setEnd(node, word.index + word[0].length);
        const rect = range.getBoundingClientRect();
        if (rect.height && rect.bottom > 0 && rect.top < innerHeight)
          ctx.fillText(word[0], rect.left, rect.top + rect.height * .5);
      }
    }
  }
}
mount(textSurface,'particle-scroll','letter-particles',(create,canvas) => create(
  commonElements(textSurface,canvas,printWords), {point:.55, band:200, density:2, size:2,
    spread:62, swirl:18, fade:.25, gravity:.15, smoothing:.18}));
let scrolling;
const masked = new Set();
function restoreInk() {
  for (const el of masked) {
    el.classList.remove('resolving-ink');
    el.style.removeProperty('--ink-line');
    el.style.removeProperty('--ink-top');
  }
  masked.clear();
}
addEventListener('scroll', () => {
  restoreInk();
  if (!enabled() || !textSurface.querySelector('[data-active]')) return;
  const line = innerHeight * .55;
  for (const el of visible) {
    const box = el.getBoundingClientRect();
    if ((box.top >= innerHeight * .22 && box.bottom <= line) || box.top >= innerHeight || el.matches(':focus-visible') || el.querySelector('img,canvas,svg')) continue;
    el.style.setProperty('--ink-line',(line - box.top) + 'px');
    el.style.setProperty('--ink-top',(-box.top) + 'px');
    el.classList.add('resolving-ink');
    masked.add(el);
  }
  textSurface.classList.add('reading');
  clearTimeout(scrolling);
  scrolling = setTimeout(() => { restoreInk(); textSurface.classList.remove('reading'); }, 210);
}, {passive:true});
const schedule = () => refreshers.forEach(refresh => refresh());
addEventListener('effectschange', sync);
reduced.addEventListener('change', sync);
document.addEventListener('visibilitychange', sync);
new MutationObserver(sync).observe(document.documentElement, { attributes:true, attributeFilter:['data-theme'] });

// Render the cipher over a bitmap of the actual heading for one short pass.
// Its semantic text remains available throughout the reveal.
const heading = document.querySelector('#toolkit-title');
let cipherToken = 0, stopCipher, inView = false;
function clearCipher() { cipherToken++; stopCipher?.(); stopCipher = undefined; }
async function decrypt() {
  clearCipher();
  if (!enabled() || !inView) return;
  const token = cipherToken;
  const create = await load('decrypt-reveal');
  if (token !== cipherToken) return;
  const film = document.createElement('canvas');
  film.className = 'cipher-film';
  film.setAttribute('aria-hidden', 'true');
  heading.append(film);
  const instance = create(commonElements(heading, film, (ctx, w, h) => {
    const style = getComputedStyle(heading);
    ctx.fillStyle = bg();
    ctx.fillRect(0, 0, w, h);
    ctx.scale(w / heading.clientWidth, h / heading.clientHeight);
    ctx.font = [style.fontWeight, style.fontSize, style.fontFamily].join(' ');
    ctx.textBaseline = 'middle';
    ctx.fillStyle = style.color;
    const range = document.createRange();
    range.selectNodeContents(heading.firstChild);
    const box = range.getBoundingClientRect(), parent = heading.getBoundingClientRect();
    ctx.fillText(heading.textContent.trim(), box.left - parent.left, box.top - parent.top + box.height / 2);
  }), { color: ink(), background: bg(), cell: 6, radius: 105, colored: 0, aberration: 1 });
  if (!instance) { release(film); return; }
  const timer = setTimeout(clearCipher, 1800);
  stopCipher = () => { clearTimeout(timer); release(film, instance); };
}
function sync() { clearCipher(); schedule(); }
new IntersectionObserver(([entry]) => {
  inView = entry.isIntersecting;
  if (inView) decrypt(); else clearCipher();
}).observe(heading);
heading.addEventListener('pointerenter', decrypt);
schedule();
