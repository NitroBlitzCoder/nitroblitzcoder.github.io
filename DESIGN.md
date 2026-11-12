---
name: Sriakshay Vaitla Portfolio
description: An editorial software portfolio and separate photographic archive in a shared optical identity.
colors:
  ink: "#07162c"
  paper: "#f5f0e6"
  muted: "#afc2db"
  red: "#ffac78"
  line: "#304561"
  raised: "#102745"
  hover: "#193657"
  blue: "#85b3ff"
  blue-strong: "#356bdf"
  glow: "rgba(71,120,235,.13)"
  header: "rgba(7,22,44,.96)"
  shadow: "rgba(0,6,19,.3)"
  tile-idle: "#182f4d"
  tile-key: "#a3bedc"
  tile-active: "#df9062"
  image-mat: "#b7cad9"
  selection-ink: "#07162c"
  light-ink: "#f6f1e7"
  light-paper: "#1d3550"
  light-muted: "#4c647c"
  light-red: "#a94721"
  light-line: "#bdcbd3"
  light-raised: "#e2edf4"
  light-hover: "#d1e3ef"
  light-blue: "#326ea8"
  light-blue-strong: "#315fd2"
  light-glow: "rgba(107,166,217,.17)"
  light-header: "rgba(246,241,231,.96)"
  light-shadow: "rgba(35,65,90,.16)"
  light-tile-idle: "#b3c9d9"
  light-tile-key: "#527da4"
  light-tile-active: "#c96734"
  light-image-mat: "#d8e6ed"
  light-selection-ink: "#fff6e9"
  paper-sheet: "#244e73"
  paper-sheet-alt: "#2f5e88"
  paper-ink: "#f5f0e6"
  paper-emphasis: "#d7ecff"
typography:
  display:
    fontFamily: "Anybody, sans-serif"
    fontSize: "clamp(52px,6.8vw,96px)"
    fontWeight: 500
    lineHeight: 1.08
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Anybody, sans-serif"
    fontSize: "clamp(32px,3.2vw,50px)"
    fontWeight: 500
    lineHeight: 1.15
    letterSpacing: "-0.035em"
  title:
    fontFamily: "Anybody, sans-serif"
    fontSize: "clamp(38px,4.8vw,72px)"
    fontWeight: 500
    lineHeight: 1.12
    letterSpacing: "-0.035em"
  photography-display:
    fontFamily: "Anybody, sans-serif"
    fontSize: "clamp(50px,7vw,96px)"
    fontWeight: 500
    lineHeight: 1.04
    letterSpacing: "-0.04em"
  body:
    fontFamily: "Instrument, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: "Instrument, sans-serif"
    fontSize: "12px"
    fontWeight: 400
rounded:
  comparison-handle: "50%"
  comparison: "14px"
  project-link: "8px"
  theme-track: "20px"
spacing:
  compact: "12px"
  control-gap: "16px"
  content-gap: "20px"
  section-gap: "30px"
components:
  paper-title:
    backgroundColor: "{colors.paper-sheet}"
    textColor: "{colors.paper-ink}"
    typography: "{typography.display}"
    padding: "10px 22px 14px"
  paper-title-blue:
    backgroundColor: "{colors.paper-sheet-alt}"
    textColor: "{colors.paper-emphasis}"
    typography: "{typography.display}"
    padding: "10px 22px 14px"
  text-link:
    textColor: "{colors.paper}"
    typography: "{typography.body}"
  text-link-hover:
    textColor: "{colors.red}"
  effects-button:
    textColor: "{colors.muted}"
    padding: "0"
    typography: "{typography.label}"
  project-body:
    textColor: "{colors.muted}"
    typography: "{typography.body}"
  about-field:
    backgroundColor: "{colors.raised}"
    textColor: "{colors.paper}"
  photography-toolbar:
    backgroundColor: "{colors.header}"
    textColor: "{colors.paper}"
    padding: "18px 4vw"
  photography-viewer:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
  theme-switch:
    backgroundColor: "{colors.raised}"
    textColor: "{colors.muted}"
    rounded: "{rounded.theme-track}"
    width: "76px"
    height: "44px"
---

# Design System: Sriakshay Vaitla Portfolio

## Overview

**Creative North Star: "Industrial Optical Monograph"**

An industrial optical monograph in two materials: light-blue structure on warm cream by day, and CobaltSky navy with luminous blue by night. A small orange signal marks interaction. Wide typography, real software evidence, hairline divisions, and full-ratio photographs preserve the shared editorial identity across the portfolio and its separate archive.

The current expression is fluid and airy: images carry momentum and shallow curvature, while factual text stays readable. Layered torn paper gives the live headline a tactile continuous movement; a curved project reel and branching workspace reveal software evidence progressively. Photography has its own spatial atlas alongside the print wall and contact sheet. These compositions supersede the rounded block selector and the hero contour/word entrance. The active surface contract is `.impeccable/surfaces/fluid-gallery.md`.

**Key Characteristics:**
- Wide display typography and quiet reading/control text.
- Airy image surfaces with real project screenshots and photographs.
- Persistent day/night materials shared across both routes.
- Live wording printed on continuously floating dark torn-paper surfaces.
- Curved scroll-and-drag projects with progressive evidence branches.
- A contextual About lens and faint upward-angled circuit details.
- Native links, visible focus, and static graphics fallbacks.

## Colors

The selected theme pairs cream/light-blue/burnt orange by day and navy/cobalt/warm paper/peach orange by night. Frontmatter preserves the existing dark token names and each light counterpart with a `light-` prefix. `theme.css` is the runtime source: `ink` means background, `paper` means foreground, and legacy `red` means orange interaction signal.

### Primary

- **Sky blue / day blue (`blue`):** procedural hero geometry, circuit routing, contact and photography identity accents.
- **Strong blue (`blue-strong`):** retained companion token; use only where a component needs it.

### Secondary

- **Orange signal (`red`):** hover, focus, selected-control underlines, comparison divider, ranges and theme thumb.

### Neutral

- **Navy / cream (`ink`):** page and dialog fields; **warm paper / blue ink (`paper`):** primary readable foreground.
- **Muted:** supporting text and metadata; **line:** rules and borders; **raised and hover:** tonal control and About/contact fields.
- **Header, glow and shadow:** translucent chrome, restrained blue hero atmosphere and object depth. **Image mat:** screenshot backing.
- **Tile idle, key and active:** retained legacy block-field primitives; the active project reel does not use the old selector. **Selection ink:** text on orange selection and switch thumb.
- **Paper title primitives:** dark blue and muted cobalt strip fills with warm paper lettering and pale-blue emphasis are fixed local materials in both themes. They do not replace the selected page palette. Frontmatter records the exact reusable strip primitives; folded-edge gradients stay in the sidecar snippet.
- Photographs and screenshots keep their original image colors.

**The Shared Materials Rule.** Apply one selected theme across hero, reel, case studies, About, contact, dialogs and photography; use orange sparingly for action and feedback.

## Typography

**Display Font:** Anybody, locally served as `Anybody`, with sans-serif fallback.
**Body Font:** Instrument Sans, locally served as `Instrument`, with sans-serif fallback.

The broad variable display face is closely spaced; reading text stays quiet and open. Frontmatter records active base roles, not a rigid modular scale.

### Hierarchy

- **Display:** exact live headline “I build software for creative work.” on two torn-paper strips. Desktop uses the display token; at (600px) and below it becomes `clamp(33px,8.5vw,48px)` with line-height (1.12). Text does not need letter movement to express motion.
- **Headline:** About greeting uses the headline role; personal-practice heading remains a smaller variant.
- **Title:** fluid case headings use `clamp(38px,4.8vw,72px)`; at (700px) and below, `clamp(31px,8.2vw,43px)`. Reel title uses `clamp(27px,3.5vw,52px)`, weight (450), then (34px) and (28px) at its responsive breakpoints.
- **Body:** normal body role is (16px/1.55); project reading text retains its open line spacing. Workspace paragraphs use (14px/1.7), maximum (55ch), then (13px) at narrower widths.
- **Photography display:** wall introduction retains the photography-display role; atlas mode compacts it to `clamp(38px,4.5vw,64px)` and (35px) below (480px). Archive reveal words remain inline-block to preserve the intended phone heading line-height.
- **Label:** small metadata and control text remain Instrument Sans. Reel and workspace navigation use (11–13px), with smaller phone labels. The full-name wordmark stays readable rather than becoming a decorative display title.

**The Two Voices Rule.** Anybody carries expressive headings; Instrument Sans carries reading and controls. Retained alternative font assets are inactive, not additional type roles.

## Layout

The main frame remains `min(1440px,88%)`; the reel breaks out to the viewport width. Header, name, credentials, anchor navigation, theme and Effects controls retain clear access. The fluid hero has an (88svh) minimum, (83svh) on phones. Its paper headline is offset and slightly rotated; identity context follows with breathing room.

The enhanced project reel spans (190svh) with a sticky stage. Desktop stage top is (80px), then (108px) at (1000px) and (104px) on phones; its viewport height subtracts that offset. Named choices sit above the image; title, description, Explore/details and previous/next controls sit below. At (1000px) captions reorganize into two columns; at (700px) the title takes the full row. Reduced motion and Effects off remove the sticky scroll runway and present a local stage with native controls.

Editorial case studies follow in document flow with (100px 0 140px) padding, reduced to (65px 0 80px) on phones. MotionStudio's inset screenshot and broad statement, PhotoMosaic's comparison split, and the Blender presentation retain distinct compositions. The About field has a softened top edge and retains biography beside a contextual lens on desktop, becoming normal flow on phones. Contact remains accessible after it.

The native project dialog opens at Overview with a large complete image. Interface, Features or Engineering reveal a left reading pane beside it. At (600px) and below, image and reading pane stack vertically with independent overflow. A persistent branch menu, breadcrumb and parent/back control preserve location. Individual features are a further level beneath Features.

Photography has three modes: Infinite atlas, Gallery wall and Contact sheet. The atlas occupies the remaining viewport below compact identity/controls and provides bottom navigation/zoom tools. Its coordinates recycle existing photographs in every direction. The wall retains a (4vw) inset, (5vw) on phones, desktop two-to-seven density (four initially), occasional double-width prints and eight-column contact sheet. Phone wall/sheet densities remain two/four. Orientation filtering applies to the same 253-photo snapshot in every mode. Wall and sheet remain available without atlas graphics.

## Elevation & Depth

Editorial reading surfaces stay flat. Depth belongs to image planes, screenshot presentation, paper folds and the contextual optical study. The reel uses shallow curved planes, visible neighbors and faint mirrored copies below on desktop; reflections disappear on phones. The atlas gives prints restrained depth and velocity-dependent flex without autonomous pan. Screenshot fields use the observed diffuse theme shadow (`0 24px 60px var(--shadow)`). Photography wall prints retain `0 16px 30px var(--shadow)`.

Paper strips use a drop shadow (`0 9px 12px var(--shadow)`) and a narrow gradient folded edge. Native dialogs use the selected material and backdrop; avoid a general floating-card shadow system.

**The Object Depth Rule.** Keep editorial containers flat; reserve dimensional treatment for screenshot presentation, photographic prints, paper folds and physical scene geometry.

## Shapes

Torn paper is a deliberate local material: irregular polygon edges, slight opposing strip rotations (-1.4° / .8°), and a narrow folding corner. It is not a global container treatment. Image fields use (14px) corners where implemented; the existing comparison retains its rounded frame and circular handle. About has (36px) upper corners, becoming (24px) on phones. Reel/atlas arrow and zoom controls are circular; workspace gallery navigation uses (8px) corners. The native sliding theme track stays (20px) with a circular thumb.

Rules, editorial regions, text links and the basic dialog remain restrained. Use thin inline SVG icons; retain clear control hit areas at responsive sizes.

## Components

### Paper title and procedural hero

The exact headline remains live HTML printed on dark blue/cobalt paper with warm lettering and pale-blue emphasis. Each whole strip reveals with a clipped paper entrance (950ms, second strip delayed 160ms), then continuously floats through a small translation and tilt (5.8s / 6.7s; second strip offset -2.4s). Motion stays within (±3px) horizontally and (±5px) vertically, with perspective rotation and a small angle change. Independent edge folds run continuously (4.8s / 5.6s; second edge offset -1.9s), without the former long hold. In-view state gates both loops; reduced motion and Effects off keep the paper static. This supersedes the previous contour trace and word-only hero entrance. Section typography can retain its existing independent reveals.

The blue particle ribbon/wireframe remains behind the paper, with (12,000) desktop / (4,500) narrow-viewport particles. Its render loop stops offscreen, hidden or with effects disabled; reduced motion skips hero WebGL. Software/unavailable/lost graphics retain live text. The byte-counted homepage loader retains Skip intro, releases inert content, and is bounded by a one-second minimum and twelve-second deadline. It does not preload the photography archive.

### Curved project reel

A scroll-scrubbed position and horizontal drag select among MotionStudio, PhotoMosaic and Smart Collection Manager. Named native buttons and previous/next controls provide explicit choices; Left/Right work on the stage. Exponential settling gives images momentum; velocity adds shallow flex. Metadata and selected underlines identify the active record. Explore or the central image opens the existing native-dialog flight; returning coordinates the selected image and focus with the reel.

The local renderer uses actual screenshots, shallow tessellated planes and the shared media shader. It pauses offscreen/hidden and disposes on exit. The native DOM image strip is the baseline. Failed/context-lost WebGL reveals it; reduced motion/Effects off use immediate native selection. The old rounded block selector is historical, not an active component.

### Progressive project workspace

Overview is the root. Interface exposes image inspection and Zoom 2× with native overflow pan; Features exposes named feature branches and an individual feature view; Engineering exposes the existing stack and engineering paragraphs. Project names in the breadcrumb return to Overview, the Features parent returns from a detail, and Back follows the same hierarchy. A PhotoMosaic feature can return to the live comparison. Source links remain available.

All project facts come from existing case DOM text and real image records. Branches do not invent product capabilities. Previous/next projects reset the tree. Close/Escape, modal focus, return focus and static gallery behavior remain part of the viewer. Animated image flights use the existing (900/760ms) desktop/phone open, (780/640ms) change and (680/560ms) close timing; the resting image is a sharp complete DOM image. The flight canvas renders only during transitions. Effects off, reduced motion, unavailable WebGL and context loss retain a working static gallery.

### Editorial projects and comparison

Distinct project compositions keep screenshots, factual summaries, source links and native engineering disclosures. Existing scroll surface enhancements remain scoped to these media frames; their absence never hides content. The reel owns the new sticky runway, while individual case enhancements retain their local frame geometry.

PhotoMosaic preserves its native range, Zoom 4×, X/Y pan and Enlarge. Pointer capture supports direct divider dragging. Optional bounded skew, drag blur and finite sparks yield to reduced motion and Effects off; the keyboard range remains the source of truth. A workspace Interface zoom is separate from the live comparison's 4× inspection.

### Photography atlas, wall and viewer

The atlas is an optional WebGL spatial browser of the same existing 253 local photographs. Dragging pans with release momentum, wheel pans, controls adjust zoom (.45–2), and previous/next plus arrow keys reach the filtered set. Enter opens the center photograph; pointer selection supplies its measured source rectangle. Images recycle across coordinates rather than adding generated content. The native photograph dialog retains complete-image fit, nearby thumbnails, arrows, Escape/Close, focus return and 2× overflow zoom. Opening uses (680ms); image changes use (480ms); closing is immediate.

The atlas defaults on only after successful initialization. Missing WebGL or `renderer=software` keeps Gallery wall; context loss returns there. Reduced motion or saved Effects off skips atlas initialization and uses Gallery wall/Contact sheet without WebGL; changing the preference during atlas use returns to the wall and stops frames. Restoring motion re-enables the available atlas. In normal motion it renders gentle surface drift only while visible, the document is shown and no photo dialog is open. The photography route honors both OS reduced motion and the saved homepage Effects preference (`sv-effects`); cross-tab changes update it live. Wall/contact sheet remain native image links without JavaScript. Do not claim that the photography route has no WebGL or no idle render loop.

Layout buttons use `aria-pressed`; orientation filtering and photo count remain shared. Wall density is disabled in contact sheet mode; the same Distance range changes atlas zoom where shown. Content-based descriptions label all photo links, full images and nearby-thumbnail buttons. Local originals remain untouched; the public archive stays a static snapshot of orientation-corrected WebP previews/full views with stripped metadata.

### Navigation, controls and themes

Use understated text controls and orange hover/focus. Preserve the native Effects pressed state, keyboard ranges, visible focus and source links. Focus generally uses a (2px) orange outline; the theme track has its own offset. Most controls use (44px) interaction heights; compact reel/workspace/phone controls retain their observed smaller sizing, so inspect those targets at actual widths.

The shared theme switch is a labeled native checkbox with `role="switch"`; checked means Dark theme. Early `theme-init.js` applies saved `sv-theme` or OS preference before styling. Unsaved OS changes and cross-tab storage changes stay live. A theme change updates browser chrome and emits `themechange`. When supported and motion is allowed, a (760ms) radial View Transition originates at the switch; reduced motion and Effects off apply immediately. Dark paper strip materials remain local fixed colors in both themes.

### Contextual lens and circuit material

The procedural lens stays within personal practice in About. Six groups separate along their optical axis through a scroll-seeked Anime.js timeline (duration 1200, stagger 75, easing `inOut(3)`). Reduced motion, Effects off and software rendering keep a labeled static lens. Technical vehicle drawings remain small pointer-transparent raster circuit details; licensed full meshes are not downloaded at runtime.

The fixed blue circuit plane keeps its central fading mask and upward (-10°) skew; subtle event-driven pointer/scroll movement and finite light segments remain subordinate to images and text. The selected theme retains the native cursor. Its short-lived decorative trail and screenshot hover motion are optional; no interest graphic becomes a click-operated exhibit.

### Scroll coordination and delivery

Local Lenis (1.3.27, MIT) smooths native page scrolling and anchors with lerp (.085), without synchronized touch scrolling. It is destroyed for reduced motion/Effects off and stopped for loader, modal or hidden-page state. Native scroll remains the fallback. Dialogs and input/select controls are excluded from its interception.

Delivery stays static HTML/CSS/JavaScript on GitHub Pages with vendored local libraries. No required framework, build step or backend is introduced. Preserve exact supplied names, qualifications, project evidence, asset licenses and links. The missing replacement resume remains a product content dependency, not a design asset to invent.

## Do's and Don'ts

### Do:
- Do preserve real screenshots, all 253 photographs and exact factual project content.
- Do keep named native controls, visible orange focus and a clear path back through each project branch.
- Do gate optional movement by the preferences implemented on each route and preserve static/native fallbacks.
- Do keep the lens contextual, circuit details faint, and the linked photography archive on its own route.

### Don't:
- Don't restore the superseded rounded block selector, contour title trace or letter-only hero treatment.
- Don't replace the system with generic card grids, decorative pills or burgundy page backgrounds.
- Don't require motion, hover or WebGL to reach factual content or photographs.
- Don't treat a recycled atlas position as a new photograph or alter local originals during archive updates.
