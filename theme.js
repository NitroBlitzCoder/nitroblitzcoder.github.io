(() => {
 const root=document.documentElement, controls=[...document.querySelectorAll('[data-theme-switch]')], buttons=[...document.querySelectorAll('[data-theme-toggle]')];
 const valid=value=>value==='light'||value==='dark';
 function stored(){try{const value=localStorage.getItem('sv-theme');return valid(value)?value:null;}catch{return null;}}
 function apply(value,persist=true){
  const theme=valid(value)?value:'dark';root.dataset.theme=theme;
  controls.forEach(control=>{control.checked=theme==='dark';});
  buttons.forEach(button=>{const next=theme==='dark'?'light':'dark';button.setAttribute('aria-label',`Switch to ${next} theme`);button.querySelector('span').textContent=next==='dark'?'Dark theme':'Light theme';});
  if(persist){try{localStorage.setItem('sv-theme',theme);}catch{}}
  const style=getComputedStyle(root),meta=document.querySelector('meta[name="theme-color"]');
  if(meta)meta.content=(style.getPropertyValue('--poster-bg')||style.getPropertyValue('--ink')).trim();
  dispatchEvent(new CustomEvent('themechange',{detail:theme}));
 }
 apply(stored()||root.dataset.theme||'dark',false);
 controls.forEach(control=>control.addEventListener('change',()=>apply(control.checked?'dark':'light')));
 buttons.forEach(button=>button.addEventListener('click',()=>apply(root.dataset.theme==='dark'?'light':'dark')));
 addEventListener('storage',event=>{if(event.key==='sv-theme'||event.key===null)apply(valid(event.newValue)?event.newValue:'dark',false);});
})();
