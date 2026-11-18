import './field.js';
const reduced = matchMedia('(prefers-reduced-motion: reduce)');
const enabled = () => !reduced.matches && window.portfolioEffects !== false && !document.body.classList.contains('still');
// Choreography adapted from the lettering studies in Tobias Ahlin's Moving Letters.
// Each preset defines its own grouping, movement, and reading order.
const presets = {
  'hero-fold': ['words', i => ({rotationX:-70,yPercent:36,transformOrigin:'50% 100%'}), .09],
  'feature-scan': ['whole', () => ({clipPath:'inset(0 100% 0 0)'}), 0],
  'work-curtain': ['chars', () => ({yPercent:90,opacity:0}), .025],
  'reel-focus': ['whole', () => ({filter:'blur(7px)',scale:.98,opacity:.35}), 0],
  'gesture-stroke': ['chars', i => ({x:-13,y:Math.sin(i*.65)*12,rotation:-8,opacity:.3}), .025],
  'mosaic-assemble': ['chars', i => ({scale:.45,x:(i%3-1)*13,y:(i%2?1:-1)*12,opacity:.3}), .018],
  'collection-stack': ['words', i => ({xPercent:12*(i+1),opacity:.15}), .09],
  'engineering-sweep': ['whole', () => ({clipPath:'polygon(0 0, 4% 0, 0 100%, 0 100%)'}), 0],
  'engineering-iris': ['whole', () => ({clipPath:'circle(0% at 50% 50%)'}), 0],
  'engineering-baseline': ['chars', () => ({scaleY:.15,transformOrigin:'center bottom'}), .023],
  'signature-turn': ['chars', () => ({rotation:34,transformOrigin:'left bottom',opacity:.25}), .029],
  'rutgers-track': ['whole', () => ({letterSpacing:'.085em',opacity:.6}), 0],
  'tennis-arc': ['words', i => ({y:-(i+1)*4,rotation:i%2?5:-5}), .075],
  'program-type': ['chars', () => ({opacity:0}), .022],
  'optical-aperture': ['words', () => ({rotationY:78,transformPerspective:350,transformOrigin:'left center'}), .10],
  'toolkit-domino': ['chars', () => ({rotationX:95,transformPerspective:230,transformOrigin:'center top'}), .055],
  'viewer-expand': ['whole', () => ({clipPath:'inset(44% 0 44% 0)'}), 0],
  'credits-unroll': ['words', () => ({skewX:-15,x:9,opacity:.55}), .07],
  'photo-exposure': ['chars', i => ({filter:'blur(5px)',opacity:.12,y:i%2?2:-2}), .034]
};
const headings = '[data-lettering]';
const running = new Map();
let reading = null, tick = 0, pointer;
function stopHeading(heading) {
  const record = running.get(heading);
  if (!record) return;
  record.tween.revert();
  // A carousel or viewer may have replaced its title during the animation.
  if (record.split && heading.contains(record.first)) record.split.revert();
  running.delete(heading);
}
function animateHeading(heading) {
  if (!enabled() || !window.gsap || !window.SplitText) return;
  stopHeading(heading);
  const name = heading.dataset.lettering;
  const [unit,pose,step] = presets[name];
  const split = unit === 'whole' ? null : SplitText.create(heading,{type:unit==='chars'?'words,chars':'words',aria:'auto'});
  const targets = split ? split[unit] : [heading];
  if (!targets.length) {split?.revert();return;}
  const timeline = gsap.timeline({paused:true,onComplete:()=>stopHeading(heading)});
  const center = (targets.length-1)/2;
  targets.forEach((target,i)=>{
    const order = name==='mosaic-assemble' ? Math.abs(i-center) : i;
    const duration = name==='program-type' ? .035 : .48;
    timeline.from(target,{...pose(i),duration,ease:'power3.out'},order*step);
  });
  running.set(heading,{tween:timeline,split,first:targets[0]});
  timeline.play();
}
function resetReading() {
  cancelAnimationFrame(tick);tick=0;
  reading?.split.revert();reading=null;
}
function updateLetters() {
  tick=0;
  if(!reading)return;
  const {chars,positions} = reading;
  for(let i=0;i<chars.length;i++) {
    const distance=Math.hypot(positions[i].x-pointer.x,positions[i].y-pointer.y);
    const weight=Math.max(0,1-distance/90)**2;
    chars[i].style.transform=`perspective(330px) translateY(${-5*weight}px) translateZ(${76*weight}px)`;
  }
}
function follow(event) {
  if(event.pointerType==='touch'||!enabled()||!window.SplitText) return;
  const paragraph=event.target.closest('p');
  if(paragraph!==reading?.paragraph) {
    resetReading();
    if(!paragraph || paragraph.closest('[aria-live],button') || paragraph.querySelector('a,button,input') || !paragraph.textContent.trim()) return;
    const split=SplitText.create(paragraph,{type:'words,chars',charsClass:'proximity-letter',aria:'auto'});
    const positions=split.chars.map(char=>{const box=char.getBoundingClientRect();return {x:box.left+box.width/2,y:box.top+box.height/2};});
    reading={paragraph,split,chars:split.chars,positions};
  }
  if(!reading)return;
  pointer={x:event.clientX,y:event.clientY};
  if(!tick)tick=requestAnimationFrame(updateLetters);
}
document.addEventListener('pointermove',follow,{passive:true});
document.addEventListener('pointerout',event=>{
  if(reading && !reading.paragraph.contains(event.relatedTarget))resetReading();
});
function react(event) {
  const heading=event.target.closest(headings);
  if(heading && !heading.contains(event.relatedTarget))animateHeading(heading);
}
document.addEventListener('pointerover',react);
document.addEventListener('focusin',react);
const observer=new IntersectionObserver(entries=>{
  for(const entry of entries)if(entry.isIntersecting){
    animateHeading(entry.target);observer.unobserve(entry.target);
  }
},{threshold:.6});
document.querySelectorAll(headings).forEach(heading=>observer.observe(heading));
function reset() {
  resetReading();
  for(const heading of running.keys())stopHeading(heading);
  running.clear();
}
addEventListener('scroll',resetReading,{passive:true});
addEventListener('resize',resetReading);
addEventListener('effectschange',reset);
document.addEventListener('photomotionchange',reset);
reduced.addEventListener('change',reset);
