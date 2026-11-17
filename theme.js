(() => {
 const root=document.documentElement, controls=[...document.querySelectorAll('[data-theme-switch]')], buttons=[...document.querySelectorAll('[data-theme-toggle]')];
 const system=matchMedia('(prefers-color-scheme: light)');
 const valid=value=>value==='light'||value==='dark';
 const systemTheme=()=>system.matches?'light':'dark';
 function stored(){try{const value=localStorage.getItem('sv-theme');return valid(value)?value:null;}catch{return null;}}
 function apply(value,persist=true){
  const theme=valid(value)?value:systemTheme();root.dataset.theme=theme;
  controls.forEach(control=>{control.checked=theme==='dark';});
  buttons.forEach(button=>{const next=theme==='dark'?'light':'dark';button.setAttribute('aria-label',`Switch to ${next} theme`);button.querySelector('span').textContent=next==='dark'?'Dark theme':'Light theme';});
  if(persist){try{localStorage.setItem('sv-theme',theme);}catch{}}
  const style=getComputedStyle(root),meta=document.querySelector('meta[name="theme-color"]');
  if(meta)meta.content=(style.getPropertyValue('--poster-bg')||style.getPropertyValue('--ink')).trim();
  dispatchEvent(new CustomEvent('themechange',{detail:theme}));
 }
 apply(stored()||root.dataset.theme||systemTheme(),false);
 controls.forEach(control=>control.addEventListener('change',()=>apply(control.checked?'dark':'light')));
 buttons.forEach(button=>button.addEventListener('click',()=>apply(root.dataset.theme==='dark'?'light':'dark')));
 system.addEventListener('change',()=>{if(!stored())apply(systemTheme(),false);});
 addEventListener('storage',event=>{if(event.key==='sv-theme'||event.key===null)apply(valid(event.newValue)?event.newValue:systemTheme(),false);});
})();
