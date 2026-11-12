# Sriakshay Vaitla — portfolio

Static GitHub Pages portfolio. No package installation, build process, backend, or API keys are required.

## Preview and deploy

Run `python3 -m http.server 8000 --bind 127.0.0.1` from this folder and open http://127.0.0.1:8000. Use HTTP rather than opening index.html directly, because the model loaders use browser modules and fetch.

Deploy the repository root through the repository's existing GitHub Pages configuration. Include assets/, vendor/, model-source/, license files, and the root HTML/CSS/JS files. Version query strings on the stylesheet and scripts prevent stale files after a deployment; update these when changing those files.

## Editing

- index.html: factual content, links, project descriptions, and credits.
- style.css: Anybody/Instrument Sans typography, responsive editorial layouts, colors, focus states.
- ui.js: dependable browser-rendered custom cursor, short canvas trail, comparison/zoom controls, dialogs, effects preference, resume availability.
- ambient.js: event-driven circuitry, scroll-linked signal segments, and subtle screenshot hover depth.
- viewer.js: native-dialog gallery, reversible image flight, keyboard and interruption handling.
- viewer-renderer.js: tessellated WebGL image planes, curvature, reflection, and depth.
- viewer-motion.mjs: source crop, aspect-fit and flight geometry.
- scroll.js: native-scroll choreography and safe handoff to the existing viewer.
- scroll-renderer.js: one shared WebGL canvas for curved editor, assembling mosaic, and aligning Blender surfaces.
- scroll-motion.mjs: reveal, crop, cover and finite settling calculations.
- scene.js: procedural camera lens and Anime.js scroll-scrubbed component separation within About.
- software-renderer.js: simplified static fallback when WebGL is unavailable.
- photography/: standalone photographic archive, local optimized images and thumbnails, prerendered HTML, gallery styles and interaction script.
- PRODUCT.md: confirmed product/content constraints.
- DESIGN.md and .impeccable/design.json: documented final design system.

The cars and aircraft are technical line drawings integrated into an upward-angled blue circuit background and have no click controls. The lens sequence responds to ordinary page scrolling and reverses naturally. The homepage retains its optical study and links to the separate `/photography/` archive of actual photographs. The lens is an illustrative assembly created for this website, not a manufacturer-specific engineering model.

## Resume

The requested replacement PDF has not yet been supplied. Add it at assets/resume.pdf. The resume link checks for a PDF at that exact path and becomes a download when present; otherwise it remains a working email request. No other resume was substituted.

## Motion and rendering

The lens loads near About. Vehicle references are small raster technical drawings, so their model files are not downloaded at runtime. Scene controllers coordinate scroll, resize and visibility. The hero and enhanced reel animate while visible; hidden/offscreen scenes pause. Mobile pixel ratio is capped. Static graphics retain their drawing buffers so demand-driven scenes remain available to browser snapshots.

Effects off and the operating system's reduced-motion preference disable spatial choreography and the trail, and leave the lens in a static pose without changing the page layout. The software renderer also uses a static study. Append `?renderer=software#interests` to a local preview URL to exercise that fallback explicitly.

The SVG cursor is rendered by the browser rather than moved with JavaScript. Native cursors remain for text, ranges, enlarged images, and modal content. Trails reset on leaving the document, blur, touch, resize, scrolling, dialogs, and effects changes.

## Validation

Run `node --test tests/*.test.*` (Node.js is needed for tests only). The checks cover effects semantics, reduced-motion and fine-pointer defaults, trail expiry/reset/re-entry, modal cleanup, and comparison/zoom state.

Browser review used 1280×800 desktop and 390×844 phone viewports. Actual WebGL lens rendering, bidirectional scroll separation, static/software fallback, effects switching, keyboard comparison/pan, and modal focus/Escape restoration were exercised. No physical-phone performance benchmark or cross-browser certification is claimed. The original third-party vehicle meshes remain as source assets only. See .impeccable/review/ for selected viewport evidence and review notes.

Keep all model source files and licenses. See CREDITS.txt and the credits dialog. The third-party vehicle models are not claimed as Sriakshay's modeling work.

Circuit graphics use no idle animation loop; effects off/reduced motion keep the background static, and touch does not tilt screenshots. Vehicle source meshes and licenses remain included. Regenerate their line drawings with model-source/render-circuit-marks.mjs, then render the generated MVG files with ImageMagick as documented in the script.

## Cinematic gallery

Click either project screenshot, or Enlarge beside PhotoMosaic. Next/Previous and the Left/Right keys rotate through all three project images. Close or Escape reverses the flight into the selected project and restores its trigger focus. The main page layout and background theme are preserved.

The animated viewer uses a lazily created Three.js context and renders only during finite transitions. At rest it shows the original sharp image in the native dialog. Reduced motion, Effects off and `?renderer=software` use a static gallery. The native screenshot dialog remains the fallback if the viewer module fails. Existing screenshot/profile/model credits are unchanged.

Verification includes desktop1280×720 and phone390×844, keyboard navigation/Escape, rapid navigation followed by close, selected-project focus return, static Effects off, software fallback, and modal geometry. Captures are in .impeccable/review/. This is browser verification, not a physical-phone performance certification.

## Scrolling projects

The project frames retain their original layout, while their real imagery curves, assembles or aligns during ordinary scrolling. Motion reverses naturally. The comparison, zoom/pan and click viewer remain usable. The background has ten additional margin traces with its existing colors and angle. Reduced motion/Effects off display static native images; `?renderer=software` exercises the no-WebGL image fallback. There is no extra scroll height or intercepted wheel input.

## Project tile field

`tile-field.js` connects the three semantic project anchors to previews and the existing viewer. `tile-field-renderer.js` renders instanced beveled blocks, shadows, preview textures, hit testing and projected labels; `tile-field-motion.mjs` defines responsive anchors, seeded heights and the finite spring response. The CSS fallback remains navigable without WebGL. The field stops rendering when settled and pauses during viewer flights, offscreen and on hidden pages. Reduced motion / Effects off keep selection available without displacement. Run all motion and UI checks with `node --test tests/*.cjs tests/*.mjs`.


## Photography

Open `/photography/` for the separate photographic archive. The gallery wall preserves full image ratios, with staggered prints and occasional double-width images. Contact sheet mode gives a compact overview. Desktop Distance adjusts wall columns; the orientation selector filters the visible set. Open a photograph for its complete image, previous/next controls and arrow keys, nearby thumbnails, and 2× zoom with native scrolling. Close or Escape returns focus to the opening photograph. Reduced motion disables spatial animation in CSS and JavaScript. The optional WebGL atlas animates while active; the native gallery remains available when effects are disabled or WebGL is unavailable. Without JavaScript its prerendered image links still open the local full-view assets.

`photography/images/` holds maximum-2000px WebP copies and `photography/thumbs/` holds 560px previews, exported with correct orientation and no EXIF/GPS metadata. `photography/photos.json` contains local IDs, display filenames and dimensions; publish no local filesystem paths, Drive URLs or credentials. CR3 originals and XMP sidecars stay out of the public repository. All 253 images are the user-supplied local JPEG photographs, including alternate edited versions and numbered duplicates. Copies were created read-only from Pictures/Lightroom Saved Photos; the originals stay in place. The shared Drive folder remains an alternate source.

This is a static snapshot of the local saved-photo folder. To update it, add JPEG exports to that folder (or the shared Drive folder) and request a sync; regenerate optimized assets, metadata and prerendered HTML together. Include `photography/` in the existing root GitHub Pages deployment. See `photography/README.md` for archive maintenance and `.impeccable/surfaces/photography.md` for its approved direction. The existing software-project viewer remains independent.

## Browser security policy

Both HTML pages declare a Content Security Policy before scripts. Scripts and network requests stay on the site origin; each inline import map is authorized by its exact SHA-256 hash. Inline executable scripts, event handlers, dynamic code evaluation, plugins, frames, workers, base-URL overrides and form submission are blocked. Inline styles remain allowed for the existing animation controllers. The pages send no referrer. This is defense in depth and trusts the published local assets.

If changing an import map, regenerate its CSP SHA-256 hash and run `node --test tests/*.test.*`; the policy checks detect stale hashes and disallowed script sources. The same suite checks published photographs for EXIF/XMP metadata. Run `python3 tests/check_static_site.py` and review both pages in a browser for policy errors after dependency changes. No build step is needed.

The source audit found no validated vulnerabilities in reviewed first-party code. This does not certify absence of vulnerabilities: bundled dependencies were not exhaustively audited, and live Pages settings, publishing-account permissions and HTTP response headers were not assessed. HTTP-only protections such as frame-ancestors or HSTS cannot be supplied by an HTML meta tag. A repository administrator can review HTTPS enforcement in Pages settings.
