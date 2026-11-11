// Run before styles to keep the saved theme from flashing on navigation.
(() => {
  let theme;
  try { theme = localStorage.getItem('sv-theme'); } catch {}
  document.documentElement.dataset.theme = theme === 'light' || theme === 'dark'
    ? theme : matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
})();
