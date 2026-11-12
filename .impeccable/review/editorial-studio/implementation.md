# Editorial studio — November 12, 2026

Research-led, code-led portfolio redesign. Color understanding was explicitly clarified by the user to mean color theory. The cited research and application decisions are recorded in RESEARCH.md.

## What changed

- Actual MotionStudio evidence shares the opening viewport with the exact headline. The existing photographed paper material remains, with held four-frame-per-second rotations, at a smaller editorial scale.
- Light parchment and cool teal grounds, dark petrol surfaces, warm text and restrained copper actions replace the earlier palette. Separate mode roles were tested against both canvas and raised surfaces; tested text ratios exceed 4.5:1. This is not a blanket accessibility certification.
- Local GSAP ScrollTrigger and Lenis share a single animation clock. Hero image planes recede with scroll, project compositions use coordinated reveals, and real photographic contact prints spread toward the separate archive.
- Existing curved project reel and branching viewer remain. Explicit choices survive focus scrolling. Modal source geometry is held through opening/closing, and returning from another project aligns the underlying reel to the returned project.
- The full photography archive inherits the design system; all 253 figures are preserved. No original photographs were moved or altered.
- Removed the blocking loading gate so content remains immediately accessible.

## Files

Presentation: index.html, photography/index.html, editorial.css, editorial.js, theme.css.
Motion/controllers: fluid.js, hero.js, project-reel.js, viewer.js, vendor/gsap/ (3.15.1 local distribution and license).
Regression checks: tests/project-reel.test.cjs, tests/scroll-clock.test.cjs.
Design/research records: RESEARCH.md, PRODUCT.md, DESIGN.md, .impeccable/design.json, .impeccable/surfaces/editorial-studio.md, CREDITS.txt.

## Local review

From the repository:

```sh
python3 -m http.server 8091
```

Visit http://localhost:8091/ and http://localhost:8091/photography/ . Scroll the hero and work reel, choose projects by their named buttons, open Features/Engineering, navigate to another project and close it. Test the PhotoMosaic comparison and zoom. Open Photography, filter Portrait, switch Atlas/Contact sheet, open and navigate photographs. Switch light/dark and Effects off. The explicit software-rendering route is /?renderer=software.

```sh
node --test tests/*.test.*
python3 tests/check_static_site.py
git diff --check
```

Final automated result: 46 tests passed; 571 local resources, both route anchor sets and JavaScript module syntax passed; diff whitespace check passed.

Browser verification: 28 recorded interaction checks; native screenshots at 1280×720, 390×844 and actual user viewport 681×788. Both themes, native software fallback, image return/focus, project branches, comparison, photo filters/zoom/keyboard and archive navigation were exercised. Viewport override reset after testing. OS reduced-motion rules were source/test verified, not toggled at operating-system level. Cross-browser, GPU context loss and a full accessibility audit were not performed.

Impeccable concept-seed and the single detector attempt could not run because the engine was unavailable and its cache was not writable; no detector pass or comp-fidelity claim is made. This is a code-led direction with an independent screenshot review. Existing user commits and factual project article bodies were preserved. Latest work is local and uncommitted; no push was performed.

## Independent review

The fresh Impeccable file/capture review accepted all 13 required captures and the committed composition, materials, palettes and responsive hierarchy. Initial disposition: fix, for a Unicode close glyph in Credits. Replaced it with the same authored SVG used by the screenshot viewer; retained visible Close text and accessible name. Opened and closed the corrected Credits dialog in both themes and captured proof. Final verdict is recorded separately.
