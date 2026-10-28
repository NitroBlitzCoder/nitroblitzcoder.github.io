# Sriakshay Vaitla — portfolio

Static GitHub Pages portfolio. No package installation, build process, backend, or API keys are required.

## Preview and deploy

Run `python3 -m http.server 8000 --bind 127.0.0.1` from this folder and open http://127.0.0.1:8000. Use HTTP rather than opening index.html directly, because the model loaders use browser modules and fetch.

Deploy the repository root through the repository's existing GitHub Pages configuration. Include assets/, vendor/, model-source/, license files, and the root HTML/CSS/JS files. Version query strings on the stylesheet and scripts prevent stale files after a deployment; update these when changing those files.

## Editing

- index.html: factual content, links, project descriptions, and credits.
- style.css: Anybody/Instrument Sans typography, responsive editorial layouts, colors, focus states.
- ui.js: dependable browser-rendered custom cursor, short canvas trail, comparison/zoom controls, dialogs, effects preference, resume availability.
- scene.js: procedural camera lens and Anime.js scroll-scrubbed component separation within About.
- software-renderer.js: simplified static fallback when WebGL is unavailable.
- PRODUCT.md: confirmed product/content constraints.
- DESIGN.md and .impeccable/design.json: documented final design system.

The cars and aircraft are background details and have no click controls. The lens sequence responds to ordinary page scrolling and reverses naturally. Photography is represented by the optical study, not a gallery. The lens is an illustrative assembly created for this website, not a manufacturer-specific engineering model.

## Resume

The requested replacement PDF has not yet been supplied. Add it at assets/resume.pdf. The resume link checks for a PDF at that exact path and becomes a download when present; otherwise it remains a working email request. No other resume was substituted.

## Motion and rendering

The lens loads near About. Vehicle references are small raster silhouettes, so their model files are not downloaded at runtime. Rendering is scheduled on scroll, resize, and visibility changes, with no idle animation loop. Hidden/offscreen scenes do not render. Mobile pixel ratio is capped. Static graphics retain their drawing buffers so demand-driven scenes remain available to browser snapshots.

Effects off and the operating system's reduced-motion preference disable spatial choreography and the trail, and leave the lens in a static pose without changing the page layout. The software renderer also uses a static study. Append `?renderer=software#interests` to a local preview URL to exercise that fallback explicitly.

The SVG cursor is rendered by the browser rather than moved with JavaScript. Native cursors remain for text, ranges, enlarged images, and modal content. Trails reset on leaving the document, blur, touch, resize, scrolling, dialogs, and effects changes.

## Validation

Run `node --test tests/ui.test.cjs` (Node.js is needed for tests only). Fourteen checks cover effects semantics, reduced-motion and fine-pointer defaults, trail expiry/reset/re-entry, modal cleanup, and comparison/zoom state.

Browser review used 1280×800 desktop and 390×844 phone viewports. Actual WebGL lens rendering, bidirectional scroll separation, static/software fallback, effects switching, keyboard comparison/pan, and modal focus/Escape restoration were exercised. No physical-phone performance benchmark or cross-browser certification is claimed. The original third-party vehicle meshes remain as source assets only. See .impeccable/review/ for selected viewport evidence and review notes.

Keep all model source files and licenses. See CREDITS.txt and the credits dialog. The third-party vehicle models are not claimed as Sriakshay's modeling work.
