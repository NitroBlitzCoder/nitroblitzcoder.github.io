// Native, static-site adaptations of split/blur text and an elastic compare tool.
(() => {
 const reduced = matchMedia('(prefers-reduced-motion: reduce)');
 const enabled = () => !reduced.matches && window.portfolioEffects !== false;
 const ease = 'cubic-bezier(.16,1,.3,1)';
 function split(element) {
   const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT), nodes = [];
   while (walker.nextNode()) nodes.push(walker.currentNode);
   nodes.forEach(node => {
     const fragment = document.createDocumentFragment();
     node.textContent.split(/(\s+)/).forEach(word => {
       if (!word.trim()) fragment.append(document.createTextNode(word));
       else { const span = document.createElement('span'); span.className = 'reveal-word'; span.textContent = word; fragment.append(span); }
     });
     node.replaceWith(fragment);
   });
   return [...element.querySelectorAll('.reveal-word')];
 }
 const titles = document.querySelectorAll('.tile-heading h2,.case-title,.about-content h2,.photo-page .intro h1');
 const observer = new IntersectionObserver(entries => entries.forEach(entry => {
   if (!entry.isIntersecting) return;
   observer.unobserve(entry.target);
   if (!enabled()) return;
   const words = split(entry.target);
   words.forEach((word,i) => word.animate([
     {filter:'blur(9px)',opacity:.15,transform:'translateY(35%) rotate(2deg)',clipPath:'inset(0 0 60% 0)'},
     {filter:'blur(0)',opacity:1,transform:'none',clipPath:'inset(-20% -5%)'}
   ],{duration:780,delay:Math.min(i*55,220),easing:ease}));
 }), {threshold:.5});
 titles.forEach(title => observer.observe(title));
 // Long statements resolve as they pass the reading line, while remaining readable.
 const statements = [...document.querySelectorAll('.case-note')].map(el => ({el,words:split(el)}));
 let frame = 0;
 function read() {
   frame = 0;
   statements.forEach(({el,words}) => {
     const rect = el.getBoundingClientRect();
     if (rect.bottom < 0 || rect.top > innerHeight) return;
     const progress = enabled() ? Math.min(1,Math.max(0,(innerHeight*.9-rect.top)/(innerHeight*.32))) : 1;
     words.forEach((word,i) => { const lit = Math.min(1,Math.max(0,progress*words.length-i)); word.style.opacity = String(.48+.52*lit); word.style.filter = enabled() ? `blur(${(1-lit)*1.4}px)` : 'none'; });
   });
 }
 const schedule = () => { if (!frame) frame = requestAnimationFrame(read); };
 addEventListener('scroll',schedule,{passive:true});addEventListener('resize',schedule);addEventListener('effectschange',schedule);reduced.addEventListener('change',schedule);read();
 const image = document.querySelector('#comparison-view'), range = document.querySelector('#compare-range');
 if (!image || !range) return;
 const handle = image.querySelector('.comparison-line span');
 let dragging = false, previousX = 0, lastSpark = 0;
 function update(event) {
   const box = image.getBoundingClientRect();
   const value = Math.round(Math.max(0,Math.min(100,(event.clientX-box.left)/box.width*100)));
   const delta = Math.max(-12,Math.min(12,(event.clientX-previousX)*.28));previousX=event.clientX;
   range.value=String(value);range.dispatchEvent(new Event('input',{bubbles:true}));
   image.style.setProperty('--divider-bend', enabled() ? `${-delta*.24}deg` : '0deg');
   image.style.setProperty('--drag-blur', enabled() ? `${Math.abs(delta)*.09}px` : '0px');
   if (enabled() && performance.now()-lastSpark>48 && Math.abs(delta)>1) {
     lastSpark=performance.now();const dot=document.createElement('i');dot.className='compare-spark';dot.style.left=`${value}%`;dot.style.top=`${event.clientY-box.top}px`;image.append(dot);
     dot.animate([{transform:'translate(0,0)',opacity:.8},{transform:`translate(${-delta*3}px,${delta*2}px)`,opacity:0}],{duration:420,easing:ease}).finished.finally(()=>dot.remove());
   }
 }
 image.addEventListener('pointerdown', event => {
   if (event.button !== 0 || (image.classList.contains('zoomed') && !handle.contains(event.target))) return;
   dragging=true;previousX=event.clientX;image.classList.add('is-dragging');image.setPointerCapture(event.pointerId);update(event);event.preventDefault();
 });
 image.addEventListener('pointermove', event => { if(dragging)update(event); });
 function end(){dragging=false;image.classList.remove('is-dragging');image.style.setProperty('--divider-bend','0deg');image.style.setProperty('--drag-blur','0px');}
 image.addEventListener('pointerup',end);image.addEventListener('pointercancel',end);image.addEventListener('lostpointercapture',end);
 // The existing native range remains the sole keyboard slider and source of truth.
 range.addEventListener('focus',()=>image.classList.add('compare-focused'));range.addEventListener('blur',()=>image.classList.remove('compare-focused'));
})();
