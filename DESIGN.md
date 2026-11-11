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
typography:
  display:
    fontFamily: "Anybody, sans-serif"
    fontSize: "clamp(58px,7.4vw,112px)"
    fontWeight: 500
    lineHeight: 1.025
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

Depth belongs to procedural geometry, screenshots, and prints. The full-viewport hero introduces the experience with a blue particle ribbon; native-scroll project surfaces and the contextual lens carry it onward. Optional motion adds expression while static text, images, controls, and contact access remain available.

**Key Characteristics:**
- Wide display typography and restrained utility text.
- Flat editorial surfaces with real project screenshots.
- Persistent day/night materials shared with the photography archive.
- Split/blur live text and a direct, elastic image comparison.
- A compact optical study within personal context and an upward-angled circuit plane with faint technical vehicle drawings.
- Native scrolling, visible focus, and static graphics fallbacks.

## Colors

The light theme pairs cream fields with light-blue surfaces and blue type accents; the CobaltSky dark theme pairs deep navy with warm cream text and sky-blue structure. Frontmatter keeps the active dark token names and records every light counterpart with a `light-` prefix. `theme.css` remains the runtime source of truth: `ink` means page background and `paper` means foreground in both themes, and the legacy `red` name now means orange interaction signal.

### Primary

- **Sky blue / day blue (`blue`):** hero emphasis and procedural geometry, circuit routing, contact link and photography identity accents.
- **Strong blue (`blue-strong`):** the defined companion blue token; do not introduce additional uses without a component need.

### Secondary

- **Orange signal (`red`):** focus, hover feedback, ranges, active tile markers, comparison divider and theme thumb. Dark mode uses warm peach-orange; light mode uses a deeper burnt orange for contrast.

### Neutral

- **Navy / cream (`ink`):** page and dialog fields.
- **Warm cream / blue ink (`paper`):** primary readable foreground.
- **Muted:** supporting text and metadata; **line:** rules and control borders.
- **Raised and hover:** About, contact, switch track and selected/hover surfaces. About and contact inherit the chosen theme rather than using separate paper/red palettes.
- **Header, glow and shadow:** translucent sticky chrome, a restrained blue hero atmosphere and object depth. **Image mat:** screenshot backing.
- **Tile idle, key and active:** theme-aware project-field materials. **Selection ink:** text on the orange selection and switch thumb.
- The photography toolbar, rules, captions, selected modes, ranges, focus and viewer use these same roles. Photography assets and their intrinsic colors remain unchanged.

**The Shared Materials Rule.** Apply one selected theme across hero, project field, case studies, About, contact, dialogs and photography; use orange sparingly for action and feedback.

## Typography

**Display Font:** Anybody, locally served under the CSS family `Anybody`, with sans-serif fallback.
**Body Font:** Instrument Sans, locally served under the CSS family `Instrument`, with sans-serif fallback.

The variable display face is broad and closely spaced. Reading text stays quiet and open. The frontmatter records the desktop base roles; responsive overrides are part of the implementation, not a rigid modular scale.

### Hierarchy

- **Display:** the existing creative-software introduction, with blue emphasis on its final phrase; mobile uses `clamp(42px,9.2vw,64px)` and line-height (1.09), with tracking (-.035em). Wide screens cap at (112px).
- **Headline:** the About greeting, using the headline token; mobile size (31px). The personal-practice heading uses `clamp(26px,2.6vw,38px)` with line-height (1.15), becoming (28px) on mobile.
- **Title:** project headings; (31px) at the middle breakpoint and `clamp(27px,7vw,38px)` with line-height (1.18) on mobile.
- **Body:** project descriptions use line-height (1.65) and maximum width (64ch). About copy uses (16px/1.75), becoming (15px) on mobile.
- **Photography display:** the archive introduction uses the photography-display token on desktop and (54px) on phones; reading text is (15px/1.5), introduction copy (13px), and print captions (10px desktop / 9px phone).
- **Label:** dates, metadata, captions, and utility controls. Navigation and text links use (13px), without uppercase tracking. The full-name wordmark is Instrument Sans (18px/1.2, weight 600), with a smaller credential line; mobile uses (15px) and hides that secondary line.

**The Two Voices Rule.** Anybody carries expressive headings; Instrument Sans carries reading and controls. Retained alternative font assets are inactive, not additional type roles.

## Layout

The centered frame uses `min(1440px,88%)`. The full-width hero fills the viewport below the measured header using `100svh`; its inner frame retains the centered width. The introduction is a live two-line headline, followed by compact identity context and a direct project link. The work section starts with the rounded project selector before the three case studies. The sticky header holds the full-name wordmark, credential line, anchor links, effects control and sliding theme switch.

Project heading rows use three columns (1.4fr/1.15fr/auto). MotionStudio pairs a broad screenshot with a statement and explanation below. PhotoMosaic uses a (1.6fr/1fr) split, while Smart Collection Manager uses (1fr/1.7fr). Each case starts with a hairline rule and has (30px 0 100px) padding. Work has (12px) top padding.

About is a theme-raised field with (88px 0 96px) padding. Its (1.05fr/1fr) grid places biography and timeline on the left and a sticky personal-practice column on the right, offset (116px) from the top. The lens figure is (305px) high, growing to (365px) at 1600px and above. There is no independent optical scroll chapter: lens progress follows the natural About region.

At (1000px), gaps and type reduce and the lens becomes (285px) high. At (700px), introduction, project and About grids become single columns; personal practice becomes normal flow beneath the biography with a top rule, and the lens remains a compact (285px) figure. Case padding contracts to (22px 0 60px), About to (52px 0 72px). At (850px), the header wraps navigation below the wordmark and theme switch; the switch narrows from (76px) to (68px). At (360px), the header retains its compact control sizing and navigation controls use (36px) minimum height. Space is contextual; frontmatter lists reused gaps only.

The photography surface uses a wider (4vw) page inset, becoming (5vw) on phones. Its native-scroll wall starts with four columns; a desktop range chooses two through seven. Staggered offsets and occasional double-width desktop prints create pacing. Contact sheet mode uses eight compact columns, with density fixed; at (700px) and below the wall uses two columns and contact sheet four. The toolbar remains sticky. This image archive grid does not replace the software page’s editorial project compositions. See `.impeccable/surfaces/photography.md` for the surface-specific layout and controls.

## Elevation & Depth

The interface is flat. Hairline borders and tonal changes distinguish regions, while the optical model provides physical material depth. A screenshot presentation alone uses the observed diffuse shadow (`0 18px 35px #0003`). Dialog depth comes from the dark backdrop (`#000e`) and a fine border, not a floating card shadow system.

Photography prints use the selected theme shadow (`0 16px 30px var(--shadow)`); the contact sheet keeps its compact print sizing. The full-image stage is flat and uses the selected page field. Hover briefly gives the print slight perspective and brightness; reduced motion removes the spatial transform.

**The Object Depth Rule.** Keep editorial containers flat; reserve dimensional treatment for screenshot presentation, photographic prints and physical scene geometry.

## Shapes

Editorial regions, links, ordinary screenshots, and dialogs retain square corners. The comparison frame has a deliberate (14px) radius and a circular (48px) handle; project-field link plates use (8px), and the theme track uses (20px) with a circular (26px) sliding thumb. Optical rings belong to scene geometry; vehicle drawings are raster circuit details. Neither establishes a rounded container vocabulary. Interface icons use thin inline SVG strokes; the standard icon is (20px), with stroke width (1.6).

## Components

### Links and buttons

Understated text controls use an underline or bottom border, a minimum interaction height (44px, with the compact-header exception at 360px), and an orange hover. The project screenshot button retains a zoom-in cursor and brightens its image on hover. Links and buttons transition color over (.18s ease). Keyboard focus uses the orange signal outline (2px), with the theme stylesheet setting the general offset to (5px) and the switch track to (4px). The effects button reports its pressed state and persists the preference.

### Navigation

A wordmark and compact right-aligned links share a fine bottom rule. The sticky header has an (86px) minimum navigation height, becoming (74px) on mobile. Work, About, Contact, and effects remain compact anchor controls; current location uses the orange signal.

### Editorial project presentations

Each project starts at a rule and combines title, factual summary, source link, screenshot, and engineering disclosure. These are open compositions rather than reusable enclosed cards. Native details and summary preserve keyboard behavior.

### Comparison controls

The before/after view clips the same two images around an orange divider with an SVG handle. Drag anywhere on the unzoomed image, or drag the handle while zoomed; pointer capture supports movement outside the frame. Pointer position writes the existing native range and dispatches its input event, preserving it as the keyboard slider and source of truth. The existing Zoom 4×, separate X/Y ranges and Enlarge remain available. Focus on the range outlines the visual handle. The Aceternity-inspired elastic treatment uses a bounded divider skew, slight drag blur, a growing handle and short-lived sparks; release restores the divider. Reduced motion and Effects off suppress the JS bend, blur and sparks while comparison still works. Text tags remain image interpretation, not a general badge system.

### Optical study

Six procedural groups separate along the optical axis using an Anime.js timeline. Each group uses duration (1200), stagger offsets (75), and easing `inOut(3)`; native scroll seeks timeline progress rather than playing a timed loop. The figure sits beside biography and teaching history on desktop and follows them in normal flow on mobile. There are no projected leaders or part annotations. Static graphics explicitly say “Static lens study.”

The model uses dark metal, rubber, silver, and dark glass materials; these scene-specific colors are not additional page accent tokens. Aircraft and car references are pointer-transparent technical WebP drawings (155px and 205px desktop widths), embedded within the fixed circuitry plane. Licensed meshes are projected offline with visibility-tested crease lines. The full vehicle models are not downloaded at runtime. The active theme restores the native pointer. Its decorative trail takes the current orange signal on each stroke, expires after (180ms), and clears when effects disable, pointer/focus conditions change, or a dialog opens; the hero suppresses the trail. Circuit details stay pointer-transparent.

### Photography controls and viewer

Text buttons switch wall/contact-sheet modes; an orange underline and `aria-pressed` identify the selection. A labeled native range changes desktop wall density; it is disabled in contact sheet mode and hidden on phones. A labeled native select filters image orientation. The photograph count is a status region. Prints preserve aspect ratio, and each remains an ordinary link to its local full-view file. Content-based descriptions label all 253 photographs, their links and nearby-thumbnail controls; filenames remain visual metadata. Photography navigation, close and arrow controls use thin inline SVG icons (16px standard / 24px viewer arrows, stroke width 1.5).

The photography viewer is an independent native dialog, with a complete aspect-fit photograph at rest, close and zoom controls, side arrows, filename/counter, and a horizontal strip of up to fifteen nearby thumbnails. Arrow keys navigate the filtered set; Escape closes and restores the originating link’s focus. Touch swipe changes images outside zoom. Zoom uses a 200% image inside native overflow scrolling. Opening animates from the print’s measured position (680ms); changes use a shorter (480ms) entrance. These finite DOM animations and optional CSS view-timeline drift respect reduced motion. There is no photography WebGL context or idle frame loop.

### Dialogs

Screenshot and credit dialogs use native dialog semantics, the selected theme surface, fine border, visible close control, and constrained viewport sizing. Preserve modal focus and Escape behavior.

### Circuit material and supporting motion

The body uses the selected theme background. A fixed, pointer-transparent circuit plane uses the theme blue routing at 28% opacity (21% on phones), a central fading mask, and a -10° vertical skew. This gives traces an upward slope without tilting content. Camera/sensor, CPU, and dimensioned volume diagrams connect to routed traces; vehicle drawings share their color and material. The About surface uses the theme raised material and the same foreground, muted and line roles.

Only the circuit plane has a small pointer-dependent shift (at most 2.5px horizontally) and bounded scroll drift (32px). Four light segments progress along traces in response to native scroll. ambient.js coalesces background changes into one scheduled frame and has no idle animation loop. Screenshot hover tilts by at most one degree and receives a brief reflective sweep. Navigation labels roll once on hover/focus; link arrows and underlines confirm interaction. Effects off and reduced motion suppress spatial motion. Touch does not tilt images. The separating lens remains the contextual About interaction.

### Cinematic project viewer

The approved page composition and circuitry field stay fixed. The primary motion is a reversible journey from a project image to a full-screen native-dialog gallery. Its three records are the real MotionStudio, PhotoMosaic, and Smart Collection Manager images; PhotoMosaic adds an Enlarge action beside the existing comparison controls.

Opening uses a 900ms desktop / 760ms phone flight. A tessellated WebGL image plane lifts, turns by up to about 26 degrees, bends slightly along both image axes, receives a traveling reflection, and resolves into an ordinary sharp DOM image. Texture crop coordinates interpolate from the visible source crop to the full image. The destination fits the complete image inside the available stage with no distortion. Closing takes 680ms / 560ms and returns the image to its project; if gallery navigation chose another project, the inert page moves behind the cover before the return flight.

Gallery changes take 780ms / 640ms: outgoing and incoming image planes travel through depth in opposite directions. Metadata follows with a 420ms masked-opacity/blur transition, and circuit signals run for a finite 1000–1100ms. The viewer uses the same selected day/night material as the page, a 100px desktop header, 93px footer, and the site's 88% frame. Phone controls retain 44px targets, the header can wrap, and footer navigation sits below the description.

Left/Right arrows navigate. Escape and Close reverse the flight, including during an opening or gallery change. Native dialog semantics protect focus; return restores focus to the relevant project trigger. Rapid navigation retains the latest requested destination. Resize settles the active image without leaving a hidden source. Effects off, reduced motion, unavailable WebGL and context loss retain a working static gallery. If the animation module fails, the pre-existing native screenshot viewer still works.

The WebGL context is created on first animated open and uses a capped pixel ratio (1.5 desktop / 1.25 phone). Only active flights request frames; the GPU canvas is hidden and cleared at rest. Project textures are cached, and resources are disposed on page exit. Lens scroll motion now settles toward its native-scroll target over about 75ms; it still has no idle loop or additional scroll chapter.

### Native-scroll project surfaces

The page keeps the same layout boxes, theme-blue circuit material, real images, and cinematic click viewer. Ordinary scroll now gives each project its own material response. MotionStudio is a continuous curved editor surface, PhotoMosaic assembles 24×14 image tiles over its original-image comparison, and Smart Collection Manager aligns three panels into the Blender workspace. Each settles into the exact native image crop as it reaches the reading area and reverses when scrolling back. Intro lines drift in opposite directions as they leave; project headings turn into their existing baselines; the contact link settles within the raised contact close. The existing About lens remains scroll-responsive.

scroll.js reads visible frame geometry, follows native progress with a short time-based settling response, and drives scroll-renderer.js. The renderer uses one lazy WebGL context for all three project surfaces and clips drawing to each existing frame. Texture crop coordinates account for object-fit cover and the Blender screenshot's crop. The comparison split remains a native range; focusing the controls settles the tiles, and zoom/pan update the same underlying image. No pinned sections, extra scroll height, forced wheel handling, or sound are introduced.

Images remain native DOM content by default. Only a successfully rendered image receives the hidden-source class. Effects off, reduced motion, missing WebGL, and context loss reveal the native images. Opening the cinematic viewer pauses and clears the scroll canvas; closing resynchronizes the page surface. Hidden pages and offscreen regions stop rendering. Active settling requests frames only until it converges. Pixel ratio is capped at 1.4 desktop / 1.1 phone; phone spatial amplitude is 55% of desktop.

Circuit density increases by ten routed traces and matching pads in the margins. The upward 10-degree angle, vehicles, camera/modeling details, and the central fading mask stay unchanged.

### Rounded project field

The work section begins with a physical selector under “Choose a project.” It uses 26×13 beveled, rounded blocks on desktop and 18×11 on narrow screens. Seeded resting heights, a spring-damped radial pointer mound, directional shadows and theme-aware blue metal give the field depth. Project anchors remain semantic, 44px-minimum links projected onto the actual blocks; the long Blender label turns inward to stay in bounds. Hover/focus selects a project image across the front faces while the project block stays distinct.

The field opens the existing viewer with a source rectangle derived from the projected board. Closing returns to the field and restores the selected project link; gallery changes update the return preview. Detailed case studies remain below in normal document flow. The scene sleeps when settled, offscreen, hidden, or during viewer flights. Resolution is capped at 1.45 desktop / 1.1 phone. Reduced motion and Effects off use static geometry with immediate preview changes. A CSS rounded-tile field and native case-study anchors survive a module or WebGL failure. No sound, asset, environment, or code from the reference was reused.

### Theme switch and state

A labeled native checkbox with `role="switch"` and the accessible name “Dark theme” supplies the state. Checked means dark. Its (44px) hit area encloses a (34px) track with separate sun/moon SVG silhouettes and a physically sliding thumb. Keyboard Space operates the same input. The shared `sv-theme` local-storage preference persists across routes; `theme-init.js` runs before styles to apply a saved valid theme or the operating system preference on a first visit. Unsaved OS changes remain live. Storage events synchronize other open tabs. Runtime application updates the browser theme-color and emits `themechange`; the hero and project-field renderer read the active CSS colors rather than keeping lime or legacy red materials.

When supported, reduced motion is absent and Effects are enabled, changing theme reveals the new root through a radial View Transition centered on the switch (760ms, `cubic-bezier(.16,1,.3,1)`). Unsupported transitions, reduced motion and Effects off apply the theme immediately. Ordinary surface color transitions are (450ms background / 350ms foreground and border), removed by reduced motion.

### Live text and hero experience

ReactBits-inspired split/blur typography is adapted to native DOM and Web Animations without React or a build step. The exact existing text and emphasis elements survive word wrapping. Hero words resolve from blur, low opacity and a small rotated lift (950ms, 65ms word staggering). Section/project headings, About headings and the archive introduction resolve once at half visibility (780ms, 55ms stagger capped at 220ms). Case statements resolve their words from a readable base opacity (.48) as they cross the native-scroll reading line, with at most (1.4px) blur. Reduced motion and Effects off leave these statements fully resolved and skip new entrances.

The hero's toroidal particle ribbon and twisted wireframe use blue from the selected theme, with (12,000) desktop / (4,500) phone particles and pixel-ratio caps (1.5 / 1.15). Slow rotation, damped pointer reaction and native-scroll rotation stop when offscreen, hidden or effects are disabled. Reduced motion skips its WebGL and loader. Software or unavailable/lost WebGL retains the plain live-text hero. The byte-counted loader retains Skip intro, releases inert content on completion, and is bounded by a one-second minimum and twelve-second deadline; it fetches homepage assets rather than the separate photography archive. Existing scroll and lens enhancements load near their sections after scrolling, and the cinematic viewer loads on relevant pointer/focus intent. This is a static HTML/CSS/JS site using local Three.js/Anime.js, with no new framework, backend or build pipeline.

## Do's and Don'ts

### Do:
- **Do** preserve real screenshots and distinct editorial project compositions.
- **Do** keep orange focus outlines and controls with the existing interaction heights (44px generally, 36px in the narrowest header).
- **Do** provide the static lens state for reduced motion, effects off, and software rendering.
- **Do** use SVG paths for interface icons and keep circuit details faint and subordinate.

### Don't:
- **Don't** replace this system with generic card grids, decorative pills, or burgundy page backgrounds.
- **Don't** turn vehicles into click-operated exhibits or replace the homepage’s contextual optical study with the photography archive; keep the archive on its own linked route.
- **Don't** require motion, hover, or graphics to reach factual content.
