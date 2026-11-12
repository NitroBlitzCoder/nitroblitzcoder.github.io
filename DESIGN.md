---
name: Sriakshay Vaitla Portfolio
description: An editorial software portfolio and separate photographic archive in a shared optical identity.
colors:
  ink: "#2c3531"
  paper: "#d1e8e2"
  muted: "#b8c8c0"
  red: "#ffcb9a"
  line: "#52635b"
  control-line: "#91a79b"
  raised: "#35433d"
  hover: "#3d4c45"
  blue: "#d1e8e2"
  blue-strong: "#116466"
  glow: "rgba(17,100,102,.12)"
  header: "#2c3531"
  shadow: "rgba(9,19,16,.38)"
  tile-idle: "#3d4c45"
  tile-key: "#d9b08c"
  tile-active: "#ffcb9a"
  image-mat: "#d9b08c"
  selection-ink: "#2c3531"
  light-ink: "#f6efdf"
  light-paper: "#3b332a"
  light-muted: "#605342"
  light-red: "#834329"
  light-line: "#c5b398"
  light-control-line: "#7a674f"
  light-raised: "#e9ddc8"
  light-hover: "#ded0b8"
  light-blue: "#5f5443"
  light-blue-strong: "#947655"
  light-glow: "rgba(148,118,85,.07)"
  light-header: "#f6efdf"
  light-shadow: "rgba(79,57,30,.17)"
  light-tile-idle: "#ded0b8"
  light-tile-key: "#605342"
  light-tile-active: "#834329"
  light-image-mat: "#e5d3b7"
  light-selection-ink: "#fff8ec"
  paper-sheet: "#116466"
  paper-sheet-alt: "#0d5759"
  paper-ink: "#d1e8e2"
  paper-emphasis: "#ffcb9a"
typography:
  display:
    fontFamily: "Anybody, sans-serif"
    fontSize: "clamp(40px,4.4vw,64px)"
    fontWeight: 500
    lineHeight: 1.12
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Anybody, sans-serif"
    fontSize: "clamp(46px,6vw,80px)"
    fontWeight: 450
    lineHeight: 1.08
    letterSpacing: "-0.035em"
  title:
    fontFamily: "Anybody, sans-serif"
    fontSize: "clamp(44px,6vw,86px)"
    fontWeight: 450
    lineHeight: 1.04
    letterSpacing: "-0.035em"
  photography-display:
    fontFamily: "Anybody, sans-serif"
    fontSize: "clamp(58px,7.5vw,96px)"
    fontWeight: 450
    lineHeight: 1.03
    letterSpacing: "-0.035em"
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
    padding: "5px 12px 9px"
  paper-title-blue:
    backgroundColor: "{colors.paper-sheet-alt}"
    textColor: "{colors.paper-emphasis}"
    typography: "{typography.display}"
    padding: "5px 12px 9px"
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
    padding: "16px 4vw"
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

**Creative North Star: "Editorial Exposure Sheet"**

An editorial exposure sheet gives real software and photographs the weight of tangible objects. Warm parchment and cool petrol share a restrained copper interaction signal. Broad local typography, fine rules and generous asymmetric spacing make the work legible before optional movement begins.

The first viewport pairs the exact live paper headline with a real software screenshot. The crumpled-paper image and held rotations remain a supporting material; screenshot scale, curved project surfaces and scroll-fanning photographic prints carry the larger choreography. Both routes share the same material system. The active surface contract is `.impeccable/surfaces/editorial-studio.md`.

**Key Characteristics:**
- Actual software evidence shares the opening viewport with identity.
- Creamy beige by day; gunmetal, sapphire, platinum, peach and tan by night.
- Anybody headings pair with Instrument Sans reading and controls.
- Real crumpled paper holds twelve rotation poses over three seconds.
- Image continuity connects introduction, reel, workspace and photographic portal.
- Native controls, visible focus and static fallbacks preserve every content path.

## Colors

Creamy beige light surfaces pair with the user-supplied Solarin palette in dark mode. Frontmatter records the exact active `theme.css` primitives and the fixed title materials from the final editorial override. Existing keys remain stable: `ink` is background, `paper` is foreground, `blue` is cobalt-blue structure and legacy `red` is copper. The `light-` prefix records each day counterpart; it is not a second independent palette.

### Primary

- **Structural color (`blue`, `blue-strong`):** identity emphasis, circuit routing, procedural hero atmosphere and contact. The strong companion remains available where the source uses it.

### Secondary

- **Orange (`red`):** action, focus, selected underlines, comparison divider, range accents and switch thumb.

### Neutral

- **Deep navy / cream (`ink`):** page fields. **Warm paper / navy ink (`paper`):** primary text.
- **Muted, line, raised and hover:** metadata, rules and tonal control/background layers. **Header:** solid matching page material. **Glow, shadow and image mat:** atmosphere, object depth and image backing.
- **Tile idle/key/active:** retained legacy roles; their presence does not reinstate the old project selector. **Selection ink:** text on copper selection/thumb.
- **Paper sheet / alternate sheet:** theme-specific real-paper tints. **Paper ink / emphasis:** fixed warm lettering and pale emphasis. These print materials switch with the page theme: tan paper and dark ink by day, sapphire paper and platinum/peach lettering by night.
- Software screenshots and photographs retain their own colors.

**The Shared Materials Rule.** Apply the selected theme across both routes; reserve copper for action, focus and selected feedback. Preserve original image colors.

## Typography

**Display Font:** Anybody, locally served, with sans-serif fallback.
**Body Font:** Instrument Sans, locally served as Instrument, with sans-serif fallback.

Wide, closely spaced display lettering gives images an editorial counterpart. Body text has open leading; metadata stays quiet. Frontmatter records the implemented base roles rather than inventing a modular scale.

### Hierarchy

- **Display:** the supporting two-strip headline uses the display role, then `clamp(40px,7.3vw,60px)` below (850px) and `clamp(29px,7.6vw,42px)` with (1.14) leading below (600px).
- **Headline:** the About greeting uses the headline role; the personal-practice heading is a (30px) variant.
- **Title:** case headings use the title role; below (600px), `clamp(38px,10vw,52px)`. Reel titles use `clamp(32px,3.6vw,52px)`, then (32px)/(28px) at narrower breakpoints.
- **Photography display:** the archive introduction uses its own recorded role. Atlas mode compacts it to `clamp(48px,5.8vw,78px)`. The homepage portal uses `clamp(50px,7vw,96px)`.
- **Body:** the baseline role is (16px/1.55); case reading uses (16px/1.7), up to (58ch), and About uses (16px/1.75). Phone case text becomes (15px).
- **Label:** the recorded (12px) role supports controls and metadata; observed local variants span (10–14px). Main navigation uses (12px), then (11px) on phones.

**The Two Voices Rule.** Anybody carries expressive headings; Instrument Sans carries reading and controls. Retained alternative font assets are not additional type roles.

## Layout

The main frame is `min(1440px,88%)`. A fine header rule anchors navigation. Desktop introduction uses a two-column (1fr/1.1fr) grid with a (7%) gap and a viewport-height field below the header. The left holds title/context/Work; the right holds a slightly turned MotionStudio screenshot, two smaller real source previews and a readable caption. Below (850px) these become one column, with the evidence following context and Work. Header height is measured with ResizeObserver into `--site-header-height` for reel sticky top/height and anchor clearance. The lower Blender preview sits at (50%) from the top, (29%) wide and (-5%) left, keeping the featured caption clear.

The enhanced reel uses a (185svh) runway with a sticky stage below the measured header, named project choices, caption and native previous/next/open/details controls. The caption rests on opaque `var(--ink)` with (14px) top padding; the instruction is a separate opaque `var(--ink)` label above the media, at (106px) top on desktop, then (164px)/(137px)/(128px) at the (1100px)/(850px)/(600px) breakpoints. These backing fields preserve text contrast independently of screenshot colors. Reduced motion and Effects off use a local nonsticky stage. Cases return to document flow: fine top rules, (105px 0 135px) spacing, asymmetric screenshot/text layouts and distinct compositions. Below (600px), case spacing becomes (65px 0 80px); image/text groups stack. MotionStudio's screenshot occupies (87%) and offsets (13%) on desktop, then fills the frame on phones.

A large photography portal follows the cases: three actual prints overlap and fan during scroll. The link reaches the separate archive. About uses a flat tonal field and a two-column biography/lens layout, then a single column below (850px); direct contact closes the page.

The project dialog begins at Overview with a complete image. Interface, Features and Engineering add a reading pane; Features has named child branches and breadcrumb/back navigation. Below (600px), reading and image areas stack with independent overflow.

The archive retains Infinite atlas, Gallery wall and Contact sheet. Wall density is two-to-seven columns on desktop (four initially), two on phones; the sheet is eight columns, then four. A shared orientation filter applies to the same 253-photo set. The editorial wall uses (45px/28px) gaps, reduced to (28px/18px) at narrower widths. Native image links remain the baseline.

## Elevation & Depth

Reading fields and layout rules stay flat. Turned screenshot and print planes create object depth. The hero screenshot uses `drop-shadow(3px 18px 25px var(--shadow))`; case screenshots use `drop-shadow(2px 20px 28px var(--shadow))`. Portal prints use `2px 20px 35px var(--shadow)`, deepening on hover. The real paper uses two small diffuse drop shadows and its original crumple texture/alpha mask. It has no constructed polygon edge or independently animated fold. The reel/atlas keep restrained curvature; dialogs preserve image continuity before resting on sharp DOM images.

**The Object Depth Rule.** Keep editorial reading surfaces flat; concentrate depth on real screenshots, photographic prints and textured paper.

## Shapes

Use square editorial regions and fine rules. Screenshot corners are small (4px in cases; 5px in the hero). The native comparison retains its (14px) frame and circular handle, while its editorial outer view uses (4px). About has square corners. Portal prints use rectangular image mats; the archive image links use (2px) corners. Circular reel/hero action controls and the rounded sliding theme track are functional exceptions. The title edge comes from the real alpha mask, not geometric clipping.

## Components

### Evidence introduction and paper title

The exact live headline, “I build software for creative work.”, sits on two real textured strips beside real software. The title uses an alpha mask, multiply tint and twelve held rotation poses over (3s), changing at (4fps). The second strip is offset (-1.25s); phone amplitude is reduced. In-view state, reduced motion and Effects off gate animation. The finite whole-strip entrance uses (950ms) with (160ms) stagger. The loading curtain remains hidden; content is never inert behind it. The optional faint hero renderer is supporting atmosphere and pauses offscreen/hidden; failed graphics retain live content.

The featured screenshot is a native link to the case and optionally opens the existing project workspace from its measured image rectangle. Returning from another project updates the featured source, caption and link together. GSAP scroll choreography scales/turns this evidence and moves the small previews; ordinary text remains readable without it.

### Project reel and workspace

Actual screenshot planes bend shallowly during scroll/drag. Named native buttons, arrows and stage keyboard controls select the same three projects. Explore opens the workspace; return coordinates selection and focus. Explicit named selection survives programmatic and focus-driven scroll; wheel, touch, stage drag or navigation keys resume scroll selection. While the native modal is open, measured top/height values keep the reel stage fixed in viewport geometry. Before return, native scroll aligns instantly to the displayed project beneath the opaque modal; the viewer records that return position so closing and the next wheel movement remain coherent. Native DOM images remain available for reduced motion, Effects off and missing/lost WebGL. Overview is the root; Interface provides (2×) overflow inspection, Features exposes existing feature records, and Engineering shows original technical text. Close/Escape, source links, breadcrumbs and return focus remain intact.

### Cases and comparison

Distinct software compositions retain native engineering disclosures and source links. The PhotoMosaic native range is the comparison source of truth; pointer divider capture, Zoom (4×), X/Y pan and Enlarge remain. Optional bounded elasticity/blur/sparks yield to motion preferences. Workspace Interface zoom and the live comparison are separate controls.

### Photographic portal and archive

The portal's three real images fan from a compressed stack through a reversible GSAP scroll timeline. Without effects, their CSS layout remains visible and the archive link works. The archive keeps optional WebGL atlas browsing plus native wall/sheet, orientation filtering, density, count and full-photo viewer. The atlas recycles existing photos; it adds no records. Drag/wheel, arrows, Enter/open and zoom/reset retain explicit controls. Reduced motion, Effects off and unavailable/lost WebGL keep or return to native wall/sheet. Hidden documents and open dialogs stop atlas frames. The full viewer keeps aspect-fit originals, nearby thumbnails, arrows, Close/Escape and (2×) overflow zoom.

### Navigation, preferences and motion

Text controls use muted/default foreground and copper hover/focus; selected project/archive states use fine copper underlines. Focus is generally a (2px) outline with (5px) offset. Preserve the actual responsive control sizes and inspect them at each layout; do not infer every target is (44px).

The shared native checkbox switch is labeled Dark theme; checked means dark. Early initialization applies stored `sv-theme` or OS preference. Effects uses native pressed state and stored `sv-effects`. Local GSAP (3.15.1) and ScrollTrigger drive editorial choreography. Local Lenis (1.3.27) uses a single GSAP clock when available, otherwise its own RAF; it excludes dialogs/inputs/selects, pauses for modal/hidden state and is destroyed for reduced motion or Effects off. Native scroll remains the fallback. The archive honors the same motion preference while retaining its own native browsing paths.

## Do's and Don'ts

### Do:
- **Do** preserve exact factual content, actual screenshots and all 253 archive photographs.
- **Do** keep named native controls, copper focus and a clear parent path through project branches.
- **Do** gate optional movement by reduced motion and Effects preferences and retain static image fallbacks.
- **Do** use the real crumpled-paper assets and held rotations as a supporting title material.

### Don't:
- **Don't** require motion, hover, WebGL or a loading gate to reach the work.
- **Don't** substitute generated artwork or generic equal cards for actual project and photographic evidence.
- **Don't** describe the paper as polygon-cut geometry or continuously interpolated floating strips.
- **Don't** mechanically invert photographs or alter originals when updating the archive.

## Color and attention refinement — 12 November 2026

Primary research supports contextual preference and relative salience, not a universally attractive hue. Preserve the teal/copper identity and let photographs supply broad chroma. The lighter parchment and distinct raised surfaces improve separation; copper remains the action/selection signal. Strong control edges use `--control-line` (#6d7d9f day / #627B80 night), separately from decorative rules. The theme track, orientation selector and enabled reel/atlas navigation use this edge. Image-link focus has an opaque canvas moat behind its copper outline. Body/secondary/teal/copper pairs exceed 4.5:1 on both canvas and raised surfaces; control edges exceed 3:1. See RESEARCH.md for sources and limits. Browser theme metadata follows the actual canvas token.

## Palette correction — 12 November 2026

The user rejected teal as bland. Current authority is cream/sky blue by day, deep navy/cobalt by night, with warm orange actions. This supersedes earlier teal/petrol recommendations; research informs contrast and hierarchy but does not override the user’s aesthetic preference. The actual crumpled title paper is retinted cobalt (#456EE8 / #3A60CF). Layout, imagery and motion remain the same.

## User-selected themes — 12 November 2026

Current palette authority supersedes the previous cobalt direction. Light mode uses cream #F6EFDF, beige #E9DDC8, brown ink #3B332A and warm tan paper. Dark mode follows the supplied Solarin/Visme reference: gunmetal #2C3531, sapphire #116466, platinum #D1E8E2, peach #FFCB9A and tan #D9B08C. Derived surface and control tones preserve contrast. Title component aliases root `--title-paper`, `--title-paper-alt`, `--title-ink` and `--title-emphasis`; light paper uses soft-light blending, dark paper multiply. Texture, mask and four-fps motion remain original.
