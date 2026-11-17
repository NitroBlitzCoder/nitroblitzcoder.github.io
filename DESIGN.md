---
name: "Sriakshay Vaitla Portfolio"
description: "A moving poster portfolio and photographic archive with warm sand and deep teal themes."
colors:
  poster-light-background: "#E8D5B7"
  poster-light-heading: "#A0522D"
  poster-light-body: "#7A3A1D"
  poster-light-accent: "#0047AB"
  poster-dark-background: "#0E4B44"
  poster-dark-text: "#F7F0DC"
  poster-dark-accent: "#FF6B1A"
  ink: "#0E4B44"
  paper: "#F7F0DC"
  muted: "#F7F0DC"
  red: "#F7F0DC"
  line: "color-mix(in srgb,#F7F0DC 30%,transparent)"
  control-line: "#F7F0DC"
  raised: "#0E4B44"
  hover: "color-mix(in srgb,#F7F0DC 8%,#0E4B44)"
  blue: "#F7F0DC"
  header: "#0E4B44"
  shadow: "rgba(0,28,25,.28)"
  image-mat: "#0E4B44"
  selection-ink: "#0E4B44"
  motion-paper-fill: "#F7F0DC"
  motion-paper-ink: "#0E4B44"
  light-motion-paper-fill: "#A0522D"
  light-motion-paper-ink: "#E8D5B7"
  light-shadow: "rgba(73,35,17,.18)"
typography:
  display:
    fontFamily: "Archivo Black, sans-serif"
    fontSize: "clamp(56px,8.7vw,154px)"
    fontWeight: 400
    lineHeight: 0.99
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Archivo Black, sans-serif"
    fontSize: "clamp(44px,6vw,88px)"
    fontWeight: 400
    lineHeight: 1.05
    letterSpacing: "-0.035em"
  case-title:
    fontFamily: "Archivo Black, sans-serif"
    fontSize: "clamp(42px,7.3vw,104px)"
    fontWeight: 400
    lineHeight: 1.06
    letterSpacing: "-0.035em"
  photography-display:
    fontFamily: "Archivo Black, sans-serif"
    fontSize: "clamp(58px,7.5vw,96px)"
    fontWeight: 400
    lineHeight: 1.03
    letterSpacing: "-0.035em"
  body:
    fontFamily: "Instrument, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Instrument, sans-serif"
    fontSize: "12px"
    fontWeight: 400
  primary-label:
    fontFamily: "Instrument, sans-serif"
    fontSize: "20px"
    fontWeight: 700
    lineHeight: 1.2
rounded:
  case-image: "4px"
  featured-image: "3px"
  archive-image: "2px"
  comparison-handle: "50%"
spacing:
  compact: "12px"
  control-gap: "16px"
  content-gap: "20px"
  section-gap: "30px"
components:
  poster-primary-light:
    backgroundColor: "{colors.poster-light-accent}"
    textColor: "{colors.poster-light-background}"
    typography: "{typography.primary-label}"
    padding: "17px 24px"
  poster-primary-dark:
    backgroundColor: "{colors.poster-dark-accent}"
    textColor: "{colors.poster-dark-background}"
    typography: "{typography.primary-label}"
    padding: "17px 24px"
  paper-title:
    backgroundColor: "{colors.motion-paper-fill}"
    textColor: "{colors.motion-paper-ink}"
    typography: "{typography.display}"
  paper-title-light:
    backgroundColor: "{colors.light-motion-paper-fill}"
    textColor: "{colors.light-motion-paper-ink}"
    typography: "{typography.display}"
  theme-button:
    textColor: "{colors.paper}"
    typography: "{typography.label}"
    padding: "0"
  effects-button:
    textColor: "{colors.paper}"
    padding: "0"
    typography: "{typography.label}"
  project-navigation:
    textColor: "{colors.paper}"
    typography: "{typography.label}"
  comparison-range:
    textColor: "{colors.paper}"
    width: "100%"
  photography-toolbar:
    backgroundColor: "{colors.header}"
    textColor: "{colors.paper}"
    padding: "16px 4vw"
    typography: "{typography.label}"
  photography-density:
    textColor: "{colors.paper}"
    typography: "{typography.label}"
  photography-viewer:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
  project-body:
    textColor: "{colors.paper}"
    typography: "{typography.body}"
---

# Design System: Sriakshay Vaitla Portfolio

## Overview

**Creative North Star: "The Moving Poster Studio"**

The moving poster studio pairs large, close-set typography with actual software evidence and photographic prints. Sand, terracotta and cobalt give the light theme its warmth and counterpoint; deep teal, cream and orange carry the dark theme. The shared identity reaches the complete main page and photography archive.

Real crumpled paper, faint procedural circuitry, the original Three field, curved project surfaces and the contextual separating lens supply material depth. New word, image and chronology treatments follow the existing content. Reading surfaces stay quiet enough to evaluate the work, and native controls preserve every route when effects stop.

This is a scan of the current implementation, not a claim that every viewport has passed visual review. The active contract is `.impeccable/surfaces/fluid-poster.md`. The 17 November restore-and-expand request supersedes the earlier hero-only review boundary and flat/no-3D restriction. Earlier palette accounts remain historical in PRODUCT.md and RESEARCH.md, rather than competing rules here.

**Key Characteristics:**
- Archivo Black display with Instrument Sans reading; Anybody remains inside retained viewer components.
- One opposite-temperature focal accent, with base-colored body text and controls.
- Real paper, screenshots and photographs supply the material identity.
- Distinct compositions and coordinated optional motion connect projects, biography and archive.
- Native navigation, focus, reduced motion and Effects off preserve access.

## Colors

Warm sand and terracotta meet a cobalt action in light mode; deep teal and cream meet an orange action in dark mode. The frontmatter owns the exact color values.

### Primary

- **Cobalt / Orange focal accent:** primary project action, reel Explore, selected details and restrained action underlines. The action label uses the theme background, including deep teal on orange.

### Neutral

- **Sand / Deep teal field:** full-page background, header, toolbar, image mats and modal fields.
- **Deep terracotta / Cream reading ink:** body, metadata, ordinary controls and focus. **Terracotta / Cream headline ink:** large display headings and structural details.
- **Paper tint and printed ink:** terracotta with sand lettering by day, cream with teal lettering by night. The photograph supplies the paper wrinkles; the existing alpha mask supplies its edge.
- **Shadow:** theme-specific translucent object shading. Fine rules mix body ink at (30%); hover fields mix body ink at (8%) into the canvas.

The retained CSS role names are compatibility aliases, not the former color identities: `ink` is the canvas; `paper`, `muted` and `control-line` use body ink; `red` and `blue` use headline ink; `raised`, `header` and `image-mat` use the canvas; `selection-ink` uses the canvas. `line`, `hover` and `shadow` retain their actual mixed/translucent definitions. These dark defaults are recorded in frontmatter. In light mode the same aliases resolve to light poster roles through `motion-site.css`; names containing red/blue do not mean those literal hues. Unused tile/blue-strong aliases, legacy `glow` and title-paper declarations are not additional palette commitments.

**The Shared Palette Rule.** Apply the poster roles across both routes; preserve original image and physical lens colors.

**The Accent Body Rule.** Use cobalt or orange for focal actions and selected details; never use orange as ordinary body text.

## Typography

**Display Font:** locally hosted Archivo Black, sans-serif fallback (400). Its heavy drawn forms do not require a synthetic bold weight.
**Body Font:** locally hosted Instrument Sans, exposed as `Instrument`, sans-serif fallback.
**Retained Viewer Font:** Anybody, sans-serif fallback, in the incumbent project/viewer patterns that still use it.

### Hierarchy

- **Display:** the three-line live headline uses the display role. Below (700px), it uses `clamp(40px,8.65vw,65px)` with (1.05) leading. Only the final line receives real paper.
- **Case title:** the case-title role spans the full case heading grid; below (700px), `clamp(36px,9.2vw,58px)`.
- **Headline:** About uses the headline role. The photography bridge uses `clamp(45px,7vw,100px)`, and the reel heading uses `clamp(32px,4.4vw,62px)`. Existing archive atlas/mobile rules compact the photography-display role.
- **Body:** hero context uses the body role; case reading uses (16px/1.7) with a maximum (58ch), and About uses (16px/1.75). Smaller factual descriptions retain their existing local sizes.
- **Label:** Instrument controls and metadata vary by context, generally (10–14px); use the recorded label role as the common base. Main primary action is (20px/1.2), weight (700), then (19px) at smaller widths.
- **Toolkit / Contact:** large Archivo Black connects the final sections. Toolkit uses `clamp(46px,5.5vw,82px)` and (1.25) leading; static mode wraps all words. Contact uses `clamp(50px,7vw,100px)` with a restrained accent underline.

**The Three Type Roles Rule.** Use Archivo Black for the new display hierarchy, Instrument Sans for reading and controls, and retain Anybody where existing viewers already use it.

## Layout

The main frame is `min(1440px,88%)`. The sticky desktop header is (78px); below (700px) its two-row navigation is (114px). The opening panel subtracts header height from (100svh), with (42px 0 62px) padding; phone padding is (45px 0 45px). Three held headline lines dominate the upper region; role/graduation and native actions share the bottom on desktop and stack on phones. The real featured screenshot follows in its own (120svh) evidence runway, reduced to (105svh)/(85svh) below (1000px)/(700px); its sticky image becomes ordinary flow when effects stop.

The curved reel keeps a measured sticky stage, named choices and explicit arrows, Explore and details controls. Text sits on opaque canvas backing above media. Cases use fine top rules, generous (95px 0 125px) spacing and full-width titles above asymmetric image/readout groups; phone case spacing becomes (65px 0 85px). Three real photo prints form a bridge to the archive.

About is an ordinary biography and chronology beside the contextual lens. Its (1.2fr/.8fr) grid and (9%) gap become one column below (1000px). The timeline has a following progress rail and sticky date labels on larger screens; dates return to ordinary flow below (700px). Toolkit now occupies its own section using the unchanged existing toolkit text. Its horizontal path is calculated from actual content and viewport widths so the complete line travels into view. Contact closes the page with direct email and retained footer links.

The project dialog keeps Overview as its root and Interface, Features and Engineering branches, with parent paths and native keyboard/close behavior. The archive retains all (253) figures, Infinite atlas, Gallery wall and Contact sheet, plus orientation filtering and desktop density. Wall and contact sheet preserve native image links; the full viewer fits each image rather than cropping it, with thumbnails and (2×) overflow zoom. Responsive gallery layouts remain in the existing archive stylesheets.

## Elevation & Depth

Reading regions are flat fields with fine rules. Original photographs and software images supply visual evidence; real paper and optional Three/curved media/lens provide depth around them. No generated artwork or raster composition was produced for this direction. Screenshot planes flatten from shallow perspective during scroll; photo prints open into a loose fan.

The paper uses `drop-shadow(2px 8px 9px var(--motion-shadow))`; featured evidence uses `drop-shadow(2px 22px 30px var(--motion-shadow))`; case images use `drop-shadow(2px 18px 25px var(--motion-shadow))`; portal prints use `2px 18px 30px var(--motion-shadow)`. These are object shadows rather than a global elevated-card system.

**The Object Depth Rule.** Keep editorial reading surfaces flat; concentrate material depth on real paper, screenshots, photographs and the contextual lens.

## Shapes

Square page regions and rectangular actions frame the content. Case images use (4px) corners, featured evidence (3px) and archive links (2px). Retain the comparison's circular handle and native range, circular reel navigation and the existing viewer's functional forms. The paper silhouette comes from `assets/paper-strip-mask.png`, not invented polygon geometry. There is no universal pill or card treatment.

## Components

### Header, preferences and actions

The native theme button remains visible on desktop and phone, with an action label for the destination theme. The shared controller persists `sv-theme` and follows the OS preference on first visit. Color transitions take (300ms), subject to reduced motion. Effects uses a native pressed state and `sv-effects`. Project action points to `#work`, Contact to `#contact`; primary action padding is (17px 24px), minimum height (62px), changing to (16px 19px)/(58px) on phones. Focus uses base ink with a (2px) outline and (6px) offset; the retained header/panel rule uses headline ink. Navigation rolls its existing labels on hover/focus; touch retains explicit links.

### Live title and evidence

GSAP SplitText (3.15.1) creates masked word pieces for the finite title entrance, with shallow rotation and blur resolving to readable text. The supporting sentence uses a separate brief blur reveal. The final headline line is a real crumpled-paper strip, using twelve held rotations over (3s), or (4fps). Paper motion pauses offscreen and when the document is hidden; reduced motion and Effects off remove it. The faint original Three field is optional atmosphere and stops rendering offscreen/hidden. The featured image unfolds from shallow perspective into a flat screenshot as it enters; its native link and exact caption remain useful without effects.

### Reel, project workspace and comparison

Actual screenshot planes keep the original curved reel and full branching workspace. Named native choices, previous/next, Explore, case links, Close/Escape and return focus remain essential. PhotoMosaic retains its meaningful original/result comparison, labelled native range, pointer divider, enlargement and zoom/pan controls. A viewer must settle to readable, sharp evidence and preserve its static fallback when graphics fail.

### Display movement, chronology and toolkit

Large section words lift through line masks with scroll; selected project text receives a short restrained blur/tilt treatment. About paragraphs and timeline entries shift without obscuring reading. The timeline rail fills with base body ink, and wide-screen year labels follow their entries. Fine-pointer magnetic actions provide bounded feedback. The toolkit line traverses exactly its overflow distance and applies clamped (±4deg) velocity skew that returns to zero at rest. Contact characters roll on pointer entry or keyboard focus. These are independently authored GSAP treatments informed by researched interaction ideas, not installed React Bits or Aceternity ports.

### Photography bridge and archive

The original three prints fan during scroll and link to the complete archive. The archive headline receives a finite word/blur entry; its original atlas, wall, sheet, filter, density and native full-photo viewer remain. Mode changes refresh enhancement geometry. Photograph colors and local originals remain unchanged.

### Motion lifecycle and attribution

Actual local GSAP SplitText (3.15.1) is reused under the GSAP Standard License with notices preserved; it is not MIT. React Bits and Aceternity inform independently authored behaviors only; see RESEARCH.md for source/license distinctions. Existing Lenis uses one coordinated clock; do not add another scroll smoother. Motion setup owns a GSAP context and SplitText instances; teardown reverts both and removes owned callbacks/tweens. Reduced motion or Effects off restores static words, removes character pieces, hides the optional hero renderer and wraps every toolkit skill. Toggling back reinitializes eligible enhancements. The original reel, comparison, project viewer, lens and photo atlas retain their own controls and preference handling. No blocking loader or mandatory click gates background effects.

## Do's and Don'ts

### Do:
- **Do** preserve exact factual content, actual screenshots and all 253 archive photographs.
- **Do** retain named native project choices, accessible comparison controls and a clear parent path through project branches.
- **Do** gate optional movement by reduced motion and Effects preferences and retain static image fallbacks.
- **Do** use the real crumpled-paper texture and alpha mask with held rotations.

### Don't:
- **Don't** require motion, hover, WebGL or a loading gate to reach the work.
- **Don't** substitute generated artwork or generic equal cards for actual project and photographic evidence.
- **Don't** treat historical hero-only, flat/no-3D or Solarin documentation as current authority.
- **Don't** mechanically invert photographs or alter local originals when updating the archive.
