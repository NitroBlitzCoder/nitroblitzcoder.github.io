// Componentry Magnet Lines, adapted for a static page. See vendor/componentry-license.txt.
const plate = document.querySelector('.interface-plate');
const field = plate.querySelector('.magnet-lines');
const lines = Array.from({ length: 24 }, () => field.appendChild(document.createElement('i')));
const reduced = matchMedia('(prefers-reduced-motion: reduce)');
const active = () => !reduced.matches && !document.body.classList.contains('still');
plate.addEventListener('pointermove', event => {
  if (!active() || event.pointerType !== 'mouse') return;
  const bounds = lines.map(line => line.getBoundingClientRect());
  bounds.forEach((box, index) => {
    const dx = event.clientX - box.left - box.width / 2;
    const dy = event.clientY - box.top - box.height / 2;
    lines[index].style.rotate = Math.atan2(dy, dx) + 'rad';
  });
});
const motion = window.gsap?.matchMedia();
function drawContours() {
  motion?.revert();
  if (!active() || !window.DrawSVGPlugin) return;
  gsap.registerPlugin(DrawSVGPlugin, ScrollTrigger);
  motion.add('(prefers-reduced-motion: no-preference)', () => {
    gsap.from('.contour-field path', {
      drawSVG: '0% 12%', stagger: .025, duration: 1.4, ease: 'power2.out'
    });
  });
}
drawContours();
addEventListener('effectschange', drawContours);
reduced.addEventListener('change', drawContours);
for (const [selector, load] of [['.work', () => import('./scroll.js')], ['#about', () => import('./scene.js')]]) {
  const observer = new IntersectionObserver(entries => {
    if (entries.some(entry => entry.isIntersecting)) {
      observer.disconnect();
      load().catch(() => {});
    }
  }, {rootMargin:'150px'});
  observer.observe(document.querySelector(selector));
}
