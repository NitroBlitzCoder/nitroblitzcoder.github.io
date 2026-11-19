import { prepare, layout } from './vendor/pretext/layout.js';

const passages = [...document.querySelectorAll('.about-copy p, .project-proof, .case-note, .practice-note, .intro > p, .atlas-instruction')];
const caption = document.querySelector('.reel-description');
const descriptions = [...document.querySelectorAll('[data-reel-select]')].map(button => button.dataset.description);
function metrics(element) {
  const style = getComputedStyle(element);
  const font = [style.fontStyle, style.fontWeight, style.fontSize, style.fontFamily].join(' ');
  const lineHeight = parseFloat(style.lineHeight) || parseFloat(style.fontSize) * 1.2;
  const measure = text => prepare(text, font, { letterSpacing: parseFloat(style.letterSpacing) || 0 });
  return { width: element.clientWidth, lineHeight, measure };
}
function update() {
  for (const element of passages) element.style.removeProperty('inline-size');
  const sizes = passages.map(element => {
    const { width, lineHeight, measure } = metrics(element);
    if (!width) return;
    const prepared = measure(element.textContent.trim());
    const count = w => layout(prepared, w, lineHeight).lineCount;
    const lines = count(width);
    if (lines < 2) return;
    let low = Math.ceil(width * 0.78), high = width;
    while (low < high) {
      const mid = Math.floor((low + high) / 2);
      if (count(mid) > lines) low = mid + 1;
      else high = mid;
    }
    return Math.min(width, high + 2);
  });
  sizes.forEach((size, i) => { if (size) passages[i].style.inlineSize = size + 'px'; });
  if (caption) {
    const { width, lineHeight, measure } = metrics(caption);
    if (width) caption.style.minBlockSize = Math.ceil(Math.max(...descriptions.map(text =>
      layout(measure(text), width, lineHeight).height))) + 'px';
  }
}
let frame;
function schedule() {
  cancelAnimationFrame(frame);
  frame = requestAnimationFrame(update);
}
const widths = new WeakMap();
const observer = new ResizeObserver(entries => {
  for (const entry of entries) {
    if (entry.contentRect.width === widths.get(entry.target)) continue;
    widths.set(entry.target, entry.contentRect.width);
    schedule();
  }
});
for (const element of [...passages, caption].filter(Boolean)) observer.observe(element.parentElement);
document.fonts.ready.then(schedule);
document.fonts.addEventListener('loadingdone', schedule);
