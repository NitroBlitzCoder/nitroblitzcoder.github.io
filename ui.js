(() => {
  'use strict';
  const $ = selector => document.querySelector(selector);
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const fine = matchMedia('(hover: hover) and (pointer: fine)');
  let preference;
  try { preference = localStorage.getItem('sv-effects'); } catch {}
  let enabled = !reduced.matches && preference !== 'off';
  const effects = $('#effects');
  const canvas = $('#cursor-trail');
  const context = canvas.getContext('2d');
  let points = [], frame = 0, lastPoint = null;
  const lifetime = 180;

  // The actual pointer is browser-rendered. This canvas is decoration only.
  function resetTrail() {
    cancelAnimationFrame(frame);
    frame = 0;
    points = [];
    lastPoint = null;
    context?.clearRect(0, 0, innerWidth, innerHeight);
  }
  function sizeTrail() {
    resetTrail();
    const ratio = Math.min(devicePixelRatio || 1, 1.5);
    canvas.width = Math.round(innerWidth * ratio);
    canvas.height = Math.round(innerHeight * ratio);
    context?.setTransform(ratio, 0, 0, ratio, 0, 0);
  }
  const modalOpen = () => !!document.querySelector('dialog[open]');
  function canTrail() {
    return context && enabled && fine.matches && !document.hidden && !modalOpen();
  }
  function drawTrail(now) {
    frame = 0;
    context.clearRect(0, 0, innerWidth, innerHeight);
    if (!canTrail()) { resetTrail(); return; }
    points = points.filter(point => now - point.time < lifetime);
    context.lineCap = 'round';
    for (let i = 1; i < points.length; i++) {
      const alpha = Math.max(0, 1 - (now - points[i - 1].time) / lifetime);
      context.beginPath();
      context.moveTo(points[i - 1].x, points[i - 1].y);
      context.lineTo(points[i].x, points[i].y);
      context.strokeStyle = `rgba(255,59,59,${alpha * .34})`;
      context.lineWidth = alpha * 2.5;
      context.stroke();
    }
    if (points.length) frame = requestAnimationFrame(drawTrail);
    else lastPoint = null;
  }
  function applyEffects() {
    resetTrail();
    window.portfolioEffects = enabled;
    document.body.classList.toggle('still', !enabled);
    document.body.classList.toggle('custom-cursor', enabled && fine.matches);
    effects.textContent = enabled ? 'Effects on' : 'Effects off';
    effects.setAttribute('aria-pressed', String(enabled));
    window.dispatchEvent(new CustomEvent('effectschange', { detail: enabled }));
  }
  effects.addEventListener('click', () => {
    enabled = !enabled;
    try { localStorage.setItem('sv-effects', enabled ? 'on' : 'off'); } catch {}
    applyEffects();
  });
  reduced.addEventListener('change', () => {
    enabled = !reduced.matches && localStoragePreference() !== 'off';
    applyEffects();
  });
  function localStoragePreference() {
    try { return localStorage.getItem('sv-effects'); } catch { return preference; }
  }
  fine.addEventListener('change', applyEffects);
  document.addEventListener('pointermove', event => {
    if (event.pointerType !== 'mouse' || !canTrail()) { resetTrail(); return; }
    if (event.target.closest('input, textarea, select, dialog, [contenteditable]')) {
      resetTrail(); return;
    }
    const time = performance.now();
    // A discontinuous move (window re-entry, teleport, stale event) starts a new stroke.
    if (lastPoint && (time - lastPoint.time > lifetime ||
      Math.hypot(event.clientX - lastPoint.x, event.clientY - lastPoint.y) > 160)) resetTrail();
    lastPoint = { x: event.clientX, y: event.clientY, time };
    points.push(lastPoint);
    if (points.length > 36) points.shift();
    if (!frame) frame = requestAnimationFrame(drawTrail);
  }, { passive: true });
  document.addEventListener('pointerdown', event => {
    if (event.pointerType !== 'mouse') resetTrail();
  }, { passive: true });
  document.addEventListener('pointerout', event => { if (!event.relatedTarget) resetTrail(); });
  document.documentElement.addEventListener('pointerleave', resetTrail);
  document.addEventListener('pointercancel', resetTrail);
  document.addEventListener('visibilitychange', resetTrail);
  window.addEventListener('blur', resetTrail);
  window.addEventListener('pagehide', resetTrail);
  window.addEventListener('scroll', resetTrail, { passive: true });
  window.addEventListener('resize', sizeTrail);
  sizeTrail();

  const comparison = $('#comparison-view');
  const range = $('#compare-range');
  function setComparison() {
    comparison.style.setProperty('--split', `${range.value}%`);
    range.setAttribute('aria-valuetext', `${range.value}% original, ${100 - range.value}% mosaic`);
  }
  range.addEventListener('input', setComparison);
  setComparison();
  const zoom = $('#zoom');
  const pan = $('#mosaic-pan');
  zoom.addEventListener('click', () => {
    const zoomed = zoom.getAttribute('aria-pressed') !== 'true';
    zoom.setAttribute('aria-pressed', String(zoomed));
    zoom.textContent = zoomed ? 'Reset zoom' : 'Zoom 4×';
    comparison.style.setProperty('--zoom', zoomed ? '4' : '1');
    comparison.classList.toggle('zoomed', zoomed);
    pan.hidden = !zoomed;
    $('#mosaic-hint').textContent = zoomed
      ? 'Explore the tiles: move across the image, or use the detail controls.'
      : 'Slide to compare the original with the mosaic. Zoom in to see the individual tiles.';
  });
  const panX = $('#pan-x'), panY = $('#pan-y');
  function setPan(x, y) {
    comparison.style.setProperty('--origin-x', `${x}%`);
    comparison.style.setProperty('--origin-y', `${y}%`);
    panX.value = x; panY.value = y;
  }
  pan.addEventListener('input', () => setPan(panX.value, panY.value));
  comparison.addEventListener('pointermove', event => {
    if (zoom.getAttribute('aria-pressed') !== 'true' || event.pointerType !== 'mouse') return;
    const rect = comparison.getBoundingClientRect();
    setPan(Math.round((event.clientX - rect.left) / rect.width * 100),
      Math.round((event.clientY - rect.top) / rect.height * 100));
  }, { passive: true });

  function openDialog(dialog) {
    resetTrail();
    document.body.classList.add('modal-open');
    dialog.showModal();
  }
  document.querySelectorAll('[data-image]').forEach(button => {
    button.addEventListener('click', () => {
      if (window.portfolioViewer) { resetTrail(); window.portfolioViewer.open(button); return; }
      $('#full-image').src = button.dataset.image;
      $('#full-image').alt = button.dataset.alt;
      openDialog($('#image-dialog'));
    });
  });
  $('#credits-button').addEventListener('click', () => openDialog($('#credits-dialog')));
  document.querySelectorAll('dialog').forEach(dialog => {
    dialog.querySelector('.close-dialog').addEventListener('click', () => {
      if (dialog === $('#image-dialog') && window.portfolioViewer) window.portfolioViewer.close();
      else dialog.close();
    });
    dialog.addEventListener('close', () => {
      document.body.classList.toggle('modal-open', modalOpen());
      resetTrail();
    });
    dialog.addEventListener('click', event => {
      if (event.target !== dialog) return;
      const rect = dialog.getBoundingClientRect();
      if (event.clientX < rect.left || event.clientX > rect.right ||
        event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
    });
  });
  // The PDF can be supplied later without editing the page. Until then the link is useful.
  fetch('assets/resume.pdf', {method: 'HEAD'}).then(response => {
    if (!response.ok || !response.headers.get('content-type')?.includes('pdf')) return;
    document.querySelectorAll('[data-resume]').forEach(link => {
      link.href = 'assets/resume.pdf'; link.setAttribute('download', 'Sriakshay-Vaitla-Resume.pdf');
      link.firstChild.textContent = 'Download resume ';
    });
  }).catch(() => {});
  // Location follows the document; it never competes with the content.
  const navLinks = [...document.querySelectorAll('.nav-links a[href^="#"]')];
  if (navLinks.length) {
    const sections = navLinks.map(link => document.querySelector(link.getAttribute('href')));
    let pendingNav = false;
    function syncLocation() {
      pendingNav = false;
      let active = -1;
      sections.forEach((section, index) => { if (section && section.getBoundingClientRect().top <= 160) active = index; });
      navLinks.forEach((link, index) => {
        if (index === active) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    }
    function scheduleLocation() { if (!pendingNav) { pendingNav = true; requestAnimationFrame(syncLocation); } }
    window.addEventListener('scroll', scheduleLocation, {passive: true});
    window.addEventListener('resize', scheduleLocation);
    syncLocation();
  }
  applyEffects();
})();
