---
name: Sriakshay Vaitla Portfolio
description: An editorial software portfolio with an industrial optical study.
colors:
  ink: "#111"
  paper: "#e9e7e1"
  muted: "#adada8"
  red: "#ff3b30"
  line: "#393939"
  optical-red: "#d32c25"
  optical-red-hover: "#b4241d"
typography:
  display:
    fontFamily: "Anybody, sans-serif"
    fontSize: "clamp(68px,9.9vw,160px)"
    fontWeight: 550
    lineHeight: 1
    letterSpacing: "-0.04em"
    fontVariation: "'wdth' 105"
  headline:
    fontFamily: "Anybody, sans-serif"
    fontSize: "clamp(38px,4.3vw,70px)"
    fontWeight: 500
    lineHeight: 1.08
    letterSpacing: "-0.04em"
  title:
    fontFamily: "Anybody, sans-serif"
    fontSize: "clamp(27px,3.2vw,50px)"
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
  optical-field:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
---

# Design System: Sriakshay Vaitla Portfolio

## Overview

**Creative North Star: "Industrial Optical Monograph"**

An industrial optical monograph: wide, compactly spaced typography, charcoal fields, warm paper, and a vivid red signal. Software evidence appears in generous editorial compositions, with hairline divisions rather than enclosing cards.

Depth belongs to the objects and screenshots. Motion reveals the construction of a camera lens through native scrolling; it remains optional, and the static experience retains readable project evidence and contact access.

**Key Characteristics:**
- Wide display typography and restrained utility text.
- Flat editorial surfaces with real project screenshots.
- Physical optical geometry and quiet ambient vehicles.
- Native scrolling, visible focus, and static graphics fallbacks.

## Colors

A charcoal and warm-paper foundation uses vivid red as its sole interface accent. Frontmatter records the actual CSS custom properties plus the optical section's explicit red variants.

### Primary

- **Red signal:** the name accent, hover feedback, range controls, focus outline, and full contact background.
- **Optical red / optical red hover:** darker red emphasis and interaction feedback on the paper field.

### Neutral

- **Ink:** main page background and text on paper.
- **Paper:** primary foreground and optical field.
- **Muted:** supporting descriptions, dates, and utility text.
- **Line:** project and timeline divisions.

**The Red Signal Rule.** Use red for deliberate emphasis, interaction feedback, and the contact field; use the darker optical red on warm paper.

## Typography

**Display Font:** Anybody, locally served under the CSS family `Anybody`, with sans-serif fallback.
**Body Font:** Instrument Sans, locally served under the CSS family `Instrument`, with sans-serif fallback.

The variable display face is broad and closely spaced. Reading text stays quiet and open. The frontmatter records the desktop base roles; responsive overrides are part of the implementation, not a rigid modular scale.

### Hierarchy

- **Display:** the hero name, using the display token and width axis (105); at the mobile breakpoint it becomes two lines, with `clamp(47px,12vw,82px)` sizing and line-height (1.06).
- **Headline:** major section headings; mobile size (35px). The optical heading is its own observed variant: `clamp(48px,6.5vw,105px)` with line-height (.98), becoming (52px/1) on mobile.
- **Title:** project headings; (30px) at the middle breakpoint and (26px/1.18) on mobile.
- **Body:** the base role; project descriptions use line-height (1.65) and maximum width (64ch). About copy uses (17px/1.7).
- **Label:** dates, metadata, captions, and utility controls. Other navigation and link text uses (13px), without uppercase tracking.

**The Two Voices Rule.** Anybody carries expressive headings; Instrument Sans carries reading and controls. Retained alternative font assets are inactive, not additional type roles.

## Layout

The centered frame uses `min(1440px,88%)`. Wide sections use asymmetric or paired columns with generous separation. Project heading rows use three columns; project explanations pair a large statement with evidence. The mosaic uses a (1.6fr/1fr) split; the collection project reverses this emphasis at (1fr/1.7fr). The timeline occupies the right half on wide screens.

At (1000px), gaps and type reduce. At (700px), project and about grids become single columns, the timeline fills the frame, and the collection screenshot precedes its text. A (1600px) minimum-width query caps the hero name and enlarges ambient aircraft space. Space is contextual, not a universal scale: the frontmatter lists reused gaps only. Work begins with (110px) top padding, about with (120px), and mobile spacing contracts to (60px) and (65px).

The lens chapter uses a sticky viewport inside a long scroll region: (245svh), minimum (1550px), on desktop; (230svh), minimum (1350px), on mobile. Its final mobile stage has full width and inset (235px 0 80px). Reduced-motion, effects-off, and software modes collapse the long narrative to a static viewport.

## Elevation & Depth

The interface is flat. Hairline borders and tonal changes distinguish regions, while the optical model provides physical material depth. A screenshot presentation alone uses the observed diffuse shadow (`0 18px 35px #0003`). Dialog depth comes from the dark backdrop (`#000e`) and a fine border, not a floating card shadow system.

**The Object Depth Rule.** Keep editorial containers flat; reserve dimensional treatment for screenshot presentation and physical scene geometry.

## Shapes

Editorial regions, links, screenshots, and dialogs have square corners. The before/after handle alone is circular (38px diameter). Optical rings and vehicle silhouettes belong to scene geometry, not a rounded container vocabulary. Interface icons use thin inline SVG strokes; the standard icon is (20px), with stroke width (1.6).

## Components

### Links and buttons

Understated text controls use an underline or bottom border, a minimum interaction height (44px), and a red hover. The project screenshot button retains a zoom-in cursor and brightens its image on hover. Links and buttons transition color over (.18s ease). Keyboard focus uses a red outline (2px) offset by (6px). The effects button reports its pressed state and persists the preference.

### Navigation

A wordmark and compact right-aligned links share a fine bottom rule. The header is (82px) high, becoming (72px) on mobile. Mobile hides the Interests navigation link while the native scroll section remains available.

### Editorial project presentations

Each project starts at a rule and combines title, factual summary, source link, screenshot, and engineering disclosure. These are open compositions rather than reusable enclosed cards. Native details and summary preserve keyboard behavior.

### Comparison controls

The before/after view clips two images around a single divider with an SVG handle. Labeled native range inputs use the red accent and minimum interaction height (44px). Zoom reveals separate X/Y range controls. Text tags belong to image interpretation, not a general badge system.

### Optical study

Six procedural groups separate along the optical axis using an Anime.js timeline. Each group uses duration (1200), stagger offsets (75), and easing `inOut(3)`; native scroll seeks timeline progress rather than playing a timed loop. Projected SVG leaders track actual group anchors and appear during separation. Mobile computes the annotation viewBox from the stage dimensions. Static graphics explicitly say “Static lens study.”

The model uses dark metal, rubber, silver, and dark glass materials; these scene-specific colors are not additional page accent tokens. Vehicles remain pointer-transparent ambient stages. The custom pointer is browser-rendered SVG; its decorative trail expires after (180ms) and clears when effects disable, focus conditions change, or a dialog opens.

### Dialogs

Screenshot and credit dialogs use native dialog semantics, a dark surface, fine border, visible close control, and constrained viewport sizing. Preserve modal focus and Escape behavior.

## Do's and Don'ts

### Do:
- **Do** preserve real screenshots and distinct editorial project compositions.
- **Do** keep red focus outlines and controls with at least the existing 44px interaction height.
- **Do** provide the static lens state for reduced motion, effects off, and software rendering.
- **Do** use SVG paths for interface icons and keep vehicles ambient.

### Don't:
- **Don't** replace this system with generic card grids, decorative pills, glowing gradients, or burgundy page backgrounds.
- **Don't** turn vehicles into click-operated exhibits or turn the camera theme into a photography gallery.
- **Don't** require motion, hover, or graphics to reach factual content.
