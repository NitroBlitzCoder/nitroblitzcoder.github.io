# Paired themes and interactive portfolio refinements

Implemented locally on November 11, 2026. Static HTML/CSS/JavaScript; no React migration, backend, build step, generated artwork, or content changes.

## What changed

- Day: cream #f6f1e7, sky-blue surfaces #e2edf4, navy text #1d3550, blue #326ea8, small burnt-orange signals #a94721.
- Night: navy #07162c, raised blue #102745, warm text #f5f0e6, sky/cobalt #85b3ff / #356bdf, peach-orange signals #ffac78.
- Sliding sun/moon theme switch on software and photography pages. Saved choice persists across routes and tabs. First visit follows the OS. Early initialization avoids a theme flash.
- Switch-centered circular theme transition. Immediate state change with reduced motion, Effects off, or unsupported View Transitions.
- Hero words resolve through blur and clipping after the loader. Project headings use a related reveal; case statements resolve as they cross the reading line.
- Hero wireframe and project tiles adopt the active palette. Pointer trail uses the orange token. Existing circuitry and composition retained.
- PhotoMosaic supports direct image/divider dragging, slight divider deflection and finite drag sparks. Existing native keyboard range, zoom, detail controls and enlarged viewer remain.
- Photography retains all 253 photos, wall/contact-sheet/filter/density/viewer behaviors and gains the shared themes.

## Files changed in this revision

Theme foundation: `theme-init.js`, `theme.js`, `theme.css`.

Motion/interaction: `interactions.js`, `hero.js`, `ui.js`.

3D palette integration: `hero-renderer.js`, `tile-field-renderer.js`.

Page integration: `index.html`, `style.css`, `photography/index.html`, `photography/gallery.js`.

Design records: `DESIGN.md`, `.impeccable/design.json`, `.impeccable/surfaces/theme-system.md`, `.impeccable/surfaces/hero-step1.md`.

The earlier uncommitted hero files and loader remain part of the working tree. This revision has not been committed or pushed.

## Local review

From the repository root:

```sh
python3 -m http.server 8091
```

Open http://127.0.0.1:8091/ and http://127.0.0.1:8091/photography/ . The review server is already running on that port in this session.

1. Switch themes; reload and navigate to Photography. Confirm the saved choice stays selected.
2. Tab to the theme switch and use Space. Check visible keyboard focus.
3. Scroll through the project selector, cases and About; hover/focus the project tiles and open a screenshot.
4. Drag the PhotoMosaic image or handle. Both labels and the complete handle should remain above animated imagery. Use arrow keys on its native range, then Zoom 4× and the detail controls.
5. Toggle Effects off and check immediate theme changes. Check the OS reduced-motion preference for static/gentler behavior.
6. Check the photography wall, contact sheet, orientation filter, density control and photo viewer.

## Validation and review

- `node --test tests/*.cjs tests/*.mjs`: 34 passed.
- Syntax checks passed for edited JavaScript; `git diff --check` passed.
- Browser evidence: 1280px desktop, 681px user viewport, and 390px phone-width layouts; no horizontal overflow in checked layouts.
- Verified keyboard comparison, direct drag, zoom/detail state, theme persistence, cross-tab changes, gallery density and photo viewer open/close.
- Primary, secondary and orange text contrast exceeds 4.5:1 on both base and raised surfaces. Blue on light raised is 4.49:1 and is reserved for large headings/icons.
- Independent Impeccable review found a comparison stacking issue and stale documentation. Its verdict pass scored both fixes resolved, disposition `ship`; that verdict covers the listed fixes.
- Impeccable automated detector could not run because its engine was not installed and the cache was unwritable. Rendered review and code checks were used; no detector pass is claimed.

## Reference research

- [Figma — Cobalt Sky](https://www.figma.com/resource-library/color-combinations/#combination-53-cobalt-sky): navy/blue direction; selected semantic values are custom refinements.
- [React Bits — Split Text](https://reactbits.dev/text-animations/split-text), [Blur Text](https://reactbits.dev/text-animations/blur-text), [Scroll Reveal](https://reactbits.dev/text-animations/scroll-reveal): split/focus text motion references.
- [Aceternity UI — Compare Slider](https://ui.aceternity.com/interactions/compare-slider): direct comparison and responsive drag motion reference.

These interaction ideas were implemented as native static-site code; library components were not installed or represented as copied source.
