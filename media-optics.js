// Each effect belongs to one media surface. Native links, sliders and dialog
// controls continue to handle all pointer and keyboard input.
const surfaces = [
  ['.hero-image-shell', 'Ripple', { trigger: 'hover', interval: 4, shine: 0.8 }],
  ['.motion-shot', 'Laser', { color: [0.96, 0.51, 0.25], offset: 44, thickness: 2, wave: 4 }],
  ['#comparison-view', 'Grid', { tileSize: 35, tint: [0.87, 0.65, 0.4], tintStrength: 0.18 }],
  ['.collection-shot', 'Magnify', { size: 88, zoom: 1.75, readout: false, aberration: 0.15 }],
  ['.viewer-stage:has(img.full)', 'Glass', { size: 78, zoom: 1.45, targets: 'img.full', aberration: 0.15 }],
];
const reduced = matchMedia('(prefers-reduced-motion: reduce)');
const refreshers = [];
for (const [selector, effect, options] of surfaces) {
  const host = document.querySelector(selector);
  if (!host) continue;
  let visible = false, mounted = false, generation = 0, dispose;
  async function refresh() {
    const active = visible && !document.hidden && !reduced.matches &&
      window.portfolioEffects !== false && !document.body.classList.contains('still');
    if (mounted === active) return;
    mounted = active;
    const version = ++generation;
    if (!active) { dispose?.(); dispose = undefined; return; }
    const module = await import('./vendor/canvas-ui/' + effect.toLowerCase() + '.js');
    if (version !== generation) return;
    const output = document.createElement('canvas');
    output.className = 'media-optic';
    output.setAttribute('aria-hidden', 'true');
    if (getComputedStyle(host).position === 'static') host.classList.add('optical-relative');
    host.classList.add('optical-host');
    host.append(output);
    let instance;
    dispose = () => {
      instance?.destroy();
      output.getContext('webgl2')?.getExtension('WEBGL_lose_context')?.loseContext();
      output.remove();
      host.classList.remove('optical-host', 'optical-relative');
    };
    try {
      instance = module['create' + effect]({ source: document.createElement('canvas'), content: host, output }, options);
    } finally {
      if (!instance) { dispose(); dispose = undefined; }
    }
  }
  new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; refresh(); }).observe(host);
  refreshers.push(refresh);
}
const refreshAll = () => refreshers.forEach(refresh => refresh());
reduced.addEventListener('change', refreshAll);
window.addEventListener('effectschange', refreshAll);
document.addEventListener('photomotionchange', refreshAll);
document.addEventListener('visibilitychange', refreshAll);
