---
name: Sriakshay Vaitla Portfolio
description: A work-first editorial software portfolio with contextual creative interests.
colors:
  ink: "#111"
  paper: "#e9e7e1"
  muted: "#adada8"
  red: "#ff3b30"
  line: "#393939"
  about-ink: "#171715"
  about-muted: "#5a5954"
  about-line: "#c7c5bc"
  about-red: "#b4241d"
typography:
  display:
    fontFamily: "Anybody, sans-serif"
    fontSize: "clamp(44px,5.4vw,82px)"
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
    fontSize: "clamp(30px,3.3vw,50px)"
    fontWeight: 500
    lineHeight: 1.12
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
spacing:
  compact: "12px"
  control-gap: "16px"
  content-gap: "20px"
  section-gap: "30px"
components:
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
    backgroundColor: "{colors.paper}"
    textColor: "{colors.about-ink}"
---

# Design System: Sriakshay Vaitla Portfolio

## Overview

**Creative North Star: "Industrial Optical Monograph"**

An industrial optical monograph: wide, compactly spaced typography, charcoal fields, warm paper, and a vivid red signal. Software evidence appears in generous editorial compositions, with hairline divisions rather than enclosing cards.

Depth belongs to the objects and screenshots. Motion reveals the construction of a camera lens through native scrolling; it remains optional, and the static experience retains readable project evidence and contact access.

**Key Characteristics:**
- Wide display typography and restrained utility text.
- Flat editorial surfaces with real project screenshots.
- A compact optical study within personal context and faint vehicle margin marks.
- Native scrolling, visible focus, and static graphics fallbacks.

## Colors

A charcoal and warm-paper foundation uses vivid red as its sole interface accent. Frontmatter records the root CSS custom properties and the warm-paper About overrides.

### Primary

- **Red signal:** the introduction emphasis, hover feedback, range controls, focus outline, and full contact background.
- **About red:** darker interaction and focus emphasis on the paper field.

### Neutral

- **Ink:** main page background and text on paper.
- **Paper:** primary foreground and About field.
- **Muted:** supporting descriptions, dates, and utility text.
- **Line:** project divisions; About overrides this with a lighter line for its timeline and captions.

**The Red Signal Rule.** Use red for deliberate emphasis, interaction feedback, and the contact field; use the darker About red on warm paper.

## Typography

**Display Font:** Anybody, locally served under the CSS family `Anybody`, with sans-serif fallback.
**Body Font:** Instrument Sans, locally served under the CSS family `Instrument`, with sans-serif fallback.

The variable display face is broad and closely spaced. Reading text stays quiet and open. The frontmatter records the desktop base roles; responsive overrides are part of the implementation, not a rigid modular scale.

### Hierarchy

- **Display:** the creative-software introduction, with selective red emphasis; mobile uses `clamp(35px,8.8vw,56px)` and line-height (1.12). At 360px and below it becomes (32px).
- **Headline:** the About greeting, using the headline token; mobile size (31px). The personal-practice heading uses `clamp(26px,2.6vw,38px)` with line-height (1.15), becoming (28px) on mobile.
- **Title:** project headings; (31px) at the middle breakpoint and `clamp(27px,7vw,38px)` with line-height (1.18) on mobile.
- **Body:** project descriptions use line-height (1.65) and maximum width (64ch). About copy uses (16px/1.75), becoming (15px) on mobile.
- **Label:** dates, metadata, captions, and utility controls. Navigation and text links use (13px), without uppercase tracking. The full-name wordmark is Instrument Sans (18px/1.2, weight 600), with a smaller credential line; mobile uses (15px) and hides that secondary line.

**The Two Voices Rule.** Anybody carries expressive headings; Instrument Sans carries reading and controls. Retained alternative font assets are inactive, not additional type roles.

## Layout

The centered frame uses `min(1440px,88%)`. A compact introduction pairs a purpose statement with identity context at (1.8fr/1fr); the sticky header holds the full-name wordmark, credential line, anchor links, and effects control. The first project follows immediately after the introduction.

Project heading rows use three columns (1.4fr/1.15fr/auto). MotionStudio pairs a broad screenshot with a statement and explanation below. PhotoMosaic uses a (1.6fr/1fr) split, while Smart Collection Manager uses (1fr/1.7fr). Each case starts with a hairline rule and has (30px 0 100px) padding. Work has (12px) top padding.

About is a warm-paper field with (88px 0 96px) padding. Its (1.05fr/1fr) grid places biography and timeline on the left and a sticky personal-practice column on the right, offset (116px) from the top. The lens figure is (305px) high, growing to (365px) at 1600px and above. There is no independent optical scroll chapter: lens progress follows the natural About region.

At (1000px), gaps and type reduce and the lens becomes (285px) high. At (700px), introduction, project and About grids become single columns; personal practice becomes normal flow beneath the biography with a top rule, and the lens remains a compact (285px) figure. Case padding contracts to (22px 0 60px), About to (52px 0 72px). At (360px), the header wraps and navigation controls use (36px) minimum height. Space is contextual; frontmatter lists reused gaps only.

## Elevation & Depth

The interface is flat. Hairline borders and tonal changes distinguish regions, while the optical model provides physical material depth. A screenshot presentation alone uses the observed diffuse shadow (`0 18px 35px #0003`). Dialog depth comes from the dark backdrop (`#000e`) and a fine border, not a floating card shadow system.

**The Object Depth Rule.** Keep editorial containers flat; reserve dimensional treatment for screenshot presentation and physical scene geometry.

## Shapes

Editorial regions, links, screenshots, and dialogs have square corners. The before/after handle alone is circular (38px diameter). Optical rings belong to scene geometry; vehicle silhouettes are raster margin marks. Neither establishes a rounded container vocabulary. Interface icons use thin inline SVG strokes; the standard icon is (20px), with stroke width (1.6).

## Components

### Links and buttons

Understated text controls use an underline or bottom border, a minimum interaction height (44px, with the compact-header exception at 360px), and a red hover. The project screenshot button retains a zoom-in cursor and brightens its image on hover. Links and buttons transition color over (.18s ease). Keyboard focus uses a red outline (2px) offset by (6px). The effects button reports its pressed state and persists the preference.

### Navigation

A wordmark and compact right-aligned links share a fine bottom rule. The sticky header has an (86px) minimum navigation height, becoming (74px) on mobile. Work, About, Contact, and effects remain compact anchor controls; current location is red.

### Editorial project presentations

Each project starts at a rule and combines title, factual summary, source link, screenshot, and engineering disclosure. These are open compositions rather than reusable enclosed cards. Native details and summary preserve keyboard behavior.

### Comparison controls

The before/after view clips two images around a single divider with an SVG handle. Labeled native range inputs use the red accent and minimum interaction height (44px). Zoom reveals separate X/Y range controls. Text tags belong to image interpretation, not a general badge system.

### Optical study

Six procedural groups separate along the optical axis using an Anime.js timeline. Each group uses duration (1200), stagger offsets (75), and easing `inOut(3)`; native scroll seeks timeline progress rather than playing a timed loop. The figure sits beside biography and teaching history on desktop and follows them in normal flow on mobile. There are no projected leaders or part annotations. Static graphics explicitly say “Static lens study.”

The model uses dark metal, rubber, silver, and dark glass materials; these scene-specific colors are not additional page accent tokens. Aircraft and car references are small pointer-transparent WebP silhouettes in page margins (112px and 120px desktop widths), rather than runtime scenes. The custom pointer is browser-rendered SVG; its decorative trail expires after (180ms) and clears when effects disable, focus conditions change, or a dialog opens.

### Dialogs

Screenshot and credit dialogs use native dialog semantics, a dark surface, fine border, visible close control, and constrained viewport sizing. Preserve modal focus and Escape behavior.

## Do's and Don'ts

### Do:
- **Do** preserve real screenshots and distinct editorial project compositions.
- **Do** keep red focus outlines and controls with the existing interaction heights (44px generally, 36px in the narrowest header).
- **Do** provide the static lens state for reduced motion, effects off, and software rendering.
- **Do** use SVG paths for interface icons and keep vehicle silhouettes faint and subordinate.

### Don't:
- **Don't** replace this system with generic card grids, decorative pills, glowing gradients, or burgundy page backgrounds.
- **Don't** turn vehicles into click-operated exhibits or turn the camera theme into a photography gallery.
- **Don't** require motion, hover, or graphics to reach factual content.
