(() => {
  const root = document.documentElement, reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const controls = [...document.querySelectorAll('[data-theme-switch]')];
  let changing = false;
  function apply(theme, persist = true) {
    root.dataset.theme = theme;
    controls.forEach(input => { input.checked = theme === 'dark'; });
    if (persist) { try { localStorage.setItem('sv-theme', theme); } catch {} }
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.content = getComputedStyle(root).getPropertyValue('--ink').trim();
    window.dispatchEvent(new CustomEvent('themechange', {detail: theme}));
  }
  apply(root.dataset.theme, false);
  controls.forEach(input => input.addEventListener('change', async () => {
    const next = input.checked ? 'dark' : 'light';
    if (changing || reduced.matches || window.portfolioEffects === false || !document.startViewTransition) { apply(next); return; }
    changing = true;
    const box = input.getBoundingClientRect(), x = box.left + box.width / 2, y = box.top + box.height / 2;
    const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    try {
      const transition = document.startViewTransition(() => apply(next));
      await transition.ready;
      await root.animate({clipPath:[`circle(0px at ${x}px ${y}px)`,`circle(${radius}px at ${x}px ${y}px)`]},
        {duration:760,easing:'cubic-bezier(.16,1,.3,1)',pseudoElement:'::view-transition-new(root)'}).finished;
      await transition.finished;
    } catch { apply(next); } finally { changing = false; }
  }));
  matchMedia('(prefers-color-scheme: light)').addEventListener('change', event => {
    let saved; try { saved = localStorage.getItem('sv-theme'); } catch {}
    if (!saved) apply(event.matches ? 'light' : 'dark', false);
  });
  window.addEventListener('storage', event => { if (event.key === 'sv-theme') apply(event.newValue === 'light' ? 'light' : 'dark', false); });
})();
