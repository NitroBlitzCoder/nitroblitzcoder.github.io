# Sriakshay Vaitla — portfolio

## Upload to GitHub Pages

1. Extract the ZIP.
2. Open your NitroBlitzCoder/nitroblitzcoder.github.io repository.
3. Upload the extracted files and folders into the repository root, replacing
   matching files. index.html must be at the root, not inside another folder.
4. Commit the changes. Keep your existing GitHub Pages deployment configuration.
5. After deployment completes, reload your website. Hard refresh if needed.

Upload the contents, not the ZIP. Include assets, vendor, model-source, all JS/CSS,
and the credits/license files. No npm install or build step is required.
The resume is already linked at assets/resume.pdf.

## Preview locally

From this folder, run `python3 -m http.server 8000`, then open
http://localhost:8000. Opening index.html directly as a file will prevent model
loading because browser module/fetch security requires HTTP.

## Edit

Content and links: index.html. Layout/color/type: style.css.
Cursor, comparison slider and dialogs: ui.js. 3D scenes: scene.js.
Software fallback: software-renderer.js. Replace assets/resume.pdf to update CV.

## Rendering and accessibility

WebGL supports the fully shaded 3D presentation. A simplified flat-shaded software
renderer displays the same geometry if WebGL is unavailable. The car loads near
its section. Effects can be disabled; reduced-motion preferences are respected.
Cursor effects are intended for mouse/trackpad users, not touchscreens.

Validation: desktop/mobile layouts and software model rendering reviewed;
interactive model controls and comparison controls exercised. The preview
browser disabled WebGL, so GPU shading was not visually verified. This is an
original portfolio inspired by bold motorsport layouts and interactive 3D,
not a reproduction of Lusion's custom shader effects.

See CREDITS.txt. Retain model-source and all license/attribution files.
