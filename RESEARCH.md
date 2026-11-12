# Portfolio reference study — October 28, 2026

Primary sites inspected in the browser, including their scrolling work presentations:

- [Dennis Snellenberg](https://dennissnellenberg.com/) and [work](https://dennissnellenberg.com/work): identity and navigation remain clear; actual projects carry the visual weight. Applied by moving MotionStudio into the first viewport and keeping a compact persistent navigation.
- [14islands](https://www.14islands.com/): confident typography gives way to real project imagery. Applied with generous screenshot compositions and few UI containers.
- [Locomotive](https://locomotive.ca/en): editorial rules, strong title hierarchy, and a compact navigation make expressive work navigable. Applied to the project headings, dividers, and page rhythm.
- [Brittany Chiang](https://brittanychiang.com/): professional evidence is easy to scan while personal interests provide context. Applied by joining biography, education, teaching, and a smaller creative-practice column.
- [Active Theory](https://activetheory.net/): a full rendered world works because it is the studio's product. This portfolio instead gives its real software the foreground; hobby references remain small and subdued.

The user liked the Anime.js separating lens but rejected an unrelated standalone exhibit. The lens now accompanies photography and modeling in About. It separates during ordinary scrolling through that section without requiring a dedicated tall scroll chapter. Aircraft and car models became tiny low-contrast raster margin marks; their large runtime scenes were removed.

These are structural references, not claims of reproducing these studios' work or visual effects.

## Requested motion references — circuit refinement

- [A24 by Ravi Klaassens](https://a24.raviklaassens.com/): inspected its disc gallery and keyboard transition to the next film. The strong lesson is continuity and spatial depth tied to actual content. Applied as restrained screenshot hover perspective and consistent link feedback while preserving the established lens sequence. No film artwork was reused.
- [Christen Dijoux](https://christendijoux.com/): inspected the rendered portfolio introduction and scrolled into its large kinetic type transition. Its layered dither field, technical atmosphere and compact navigation inspired a subtle background material; this portfolio uses user-requested blue circuit routing instead of copying the monochrome dither shader, preloader or foreground logo.

The circuit field slopes upward by 10 degrees. Visibility-tested vehicle line drawings come from the already licensed source meshes; camera/sensor and modeling diagrams share the circuit material. Content and typography remain upright.

## Cinematic viewer direction

The user approved the cinematic viewer option after requesting A24-level animation ambition. A24's gallery was inspected again for spatial selection and object reversal. The implementation uses original project imagery on tessellated planes, not film discs or copied artwork: a matched crop-to-full-image flight, curved reflection during motion, opposing depth rotations between projects, and a reversible return to the page. Stable native content remains the resting state.

## Fabian Tjoe-A-On — native-scroll refinement

[Fabian Tjoe-A-On](https://fabiantjoeaon.com/) was inspected in-browser, entering without sound, scrolling through scene changes, and activating a project tile preview. Its project labels and preview imagery live in a responsive, rippling tile matrix within a dimensional scene. The useful lesson is to make project media behave like a physical surface rather than only animate interface controls.

This portfolio keeps its approved editorial layout and blue circuits. MotionStudio gets a continuous curved editor plane, PhotoMosaic assembles image tiles, and the Blender workspace aligns from three panels. Native scrolling drives and reverses these surfaces, which settle into their actual readable images. No reference artwork, sound, loader, environment or source code was copied.

## Fabian — explicit tile-field request

The user clarified that the desired reference is the selectable rounded tile matrix, its radial hover displacement, and differing block heights. The reference was revisited in-browser without sound. This iteration implements that interaction directly as the portfolio’s project selector, using the portfolio’s own screenshots, blue circuit backdrop, three project choices, and existing viewer. It does not recreate the reference’s sound, full-screen terrain, project work, assets, or source.


## Photography archive — November 8, 2026

The following primary sites were inspected in the browser for this surface:

- [Tyler Mitchell](https://www.tylermitchell.co/): an image-first archive with adjustable image density. Applied as an explicit Gallery wall / Contact sheet choice and a desktop density range, so visitors can move between overview and individual photographs.
- [Romain Laprade](https://www.romainlaprade.com/): a compact image index and deliberate spacing let the photographs carry the sequence. Applied as restrained navigation, full-ratio prints, varied spacing, occasional double-width images and an unobtrusive nearby-thumbnail strip in the full viewer.

These references inform archive behavior and pacing. The implementation retains Sriakshay’s existing navy/ice-blue/red palette, Anybody and Instrument Sans typography, original photographs and separate software homepage. No reference photographs, branding or source code were reused. Image enlargement uses finite DOM motion, native-dialog focus and static reduced-motion behavior rather than introducing a new rendering engine.


# Portfolio design research — 12 November 2026

Scope: a static, no-build creative developer portfolio preserving the existing factual content, three software projects and complete 253-image photography archive. Production source was read only. The decisions below are design inferences informed by primary sources, not claims that a particular visual treatment is universally preferred.

## Reference interpretation

[Dominik Fojcik's own portfolio](https://www.fojcikdominik.com/) explicitly separates Selected work, About and Contact and identifies project roles. Take the clear identity/work hierarchy and the feeling of an authored experience; do not borrow his portrait treatment, artwork or code. [Ravi Klaassens's own A24 case study](https://www.raviklaassens.com/work/a24) describes physical media as the organizing metaphor, opening objects into detail and moving continuously between film and television. Take continuity and meaningful object-to-detail transformation, not discs, film artwork or the same layout. [Fabian Tjoe-A-On's portfolio](https://fabiantjoeaon.com/) was identified but could not be retrieved by the research browser; no unverified claims about its current implementation are used here.

## Seven decisions

### 1. Make the hierarchy legible before making it theatrical

**Decision:** Identity and a short positioning statement lead into three selected projects, then personal practice/photography, About and Contact. Give the work the largest visual area, with title, actual purpose and repository link always available. Keep the archive as a clearly named destination rather than mixing 253 photographs with three projects.

**Why:** W3C recommends logical heading ranks and descriptive headings so structure remains navigable independently of visual styling. Fojcik's selected-work/role structure is a relevant first-party precedent. This does not prescribe a bland visual layout: overscale type and asymmetric image composition can sit on a simple semantic structure. [W3C headings tutorial](https://www.w3.org/WAI/tutorials/page-structure/headings/)

**Implementation:** One H1; section H2s; project H3s or correctly nested article headings. Use real anchor destinations and a visible Work/Photography/About/Contact navigation. Maintain the existing factual award, education, dates, toolkit, teaching experience and credits.

**Risk:** A pinned visual reel can obscure the work overview. Show a persistent three-item index and direct project links so readers can choose immediately.

### 2. Disclose engineering depth, not basic meaning

**Decision:** Keep a one-sentence purpose, concrete capability and stack visible. Put longer engineering explanations behind an explicit disclosure. Image enlargement and project reading are separate, clearly labelled actions.

**Why:** W3C's disclosure pattern defines an operable control with an expanded/collapsed state and Enter/Space activation. It supports optional depth without requiring hidden hover content. [W3C disclosure pattern](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/)

**Implementation:** Retain native `details/summary` for long engineering copy; use links for navigation and buttons for opening viewers. Preserve usable document order without JavaScript. Reserve animation for the panel transition, not the availability of the information.

**Risk:** Over-disclosure can erase evidence of competence. Never hide the award, project purpose, repository link or first useful description.

### 3. Use hue relationships and saturation to allocate attention

**Decision:** Build the chrome around a low-chroma blue-green/teal family with adjacent cool surface hues; add a warm terracotta near-complement only for a small number of editorial accents. Photographs and project results supply the richest colors. Warm paper against cool ink gives the light theme a different temperature balance from the cool dark theme.

**Why:** Adobe identifies complementary relationships as opposing hues and analogous relationships as neighboring hues. These are compositional tools, not guarantees of harmony. Use the analogous family to connect surfaces and the warm/cool opposition to create a deliberate point of tension. [Adobe's complementary-color guide](https://www.adobe.com/uk/creativecloud/design/discover/complementary-colors.html)

**Implementation:** Keep surface chroma low; reserve the strongest chroma for the active state/accent, and let imagery dominate broad colored areas. No rainbow project categories or equal-strength competing accent colors. Author adjustments with separate hue/chroma/lightness controls in OKLCH; Ottosson's original account explains why HSV's equal values can yield visibly unequal lightness. [Ottosson, Oklab](https://bottosson.github.io/posts/oklab/), [W3C CSS Color 4](https://www.w3.org/TR/css-color/)

**Risk:** A wheel-derived complement can look harsh beside image colors. Treat hue relationships as a starting hypothesis and preview against the real screenshots and photographs.

### 4. Tune two contextual palettes rather than invert one

**Decision:** Use semantic color roles and test each mode separately. Proposed sRGB starting tokens:

| Role | Light | Dark |
| --- | --- | --- |
| Canvas | `#F2F0E9` | `#101B20` |
| Main text | `#17252A` | `#EEECE4` |
| Secondary text | `#526168` | `#A6B4B7` |
| Teal action/focus | `#075966` | `#74CED4` |
| Warm editorial accent | `#A8442D` | `#E99C80` |

**Why:** The Albers Foundation emphasizes observing color in context; the Colour Literacy Project explains that neighboring color can alter perceived hue, lightness and vividness. Thus a photograph or accent will not necessarily feel equally bright or saturated on both surrounds. Keep image-viewer surrounds neutral and inspect both themes with the actual images. [Albers Foundation](https://www.albersfoundation.org/alberses/teaching/interaction-of-color), [Colour Literacy Project](https://colourliteracy.org/simultaneous-contrast)

**Implementation:** Independently calculated WCAG sRGB luminance ratios on the listed canvases: main text 13.80/14.80; secondary 5.63/8.20; teal 7.00/9.60; warm accent 5.22/7.95 (light/dark). These verify only those opaque pairs, not all possible uses. Test buttons, hover, focus, overlays and actual adjacent surfaces. Normal text needs 4.5:1; large text 3:1; meaningful component/state cues generally 3:1. Color alone must not carry selection: pair it with labels, underline, shape or position. [W3C text contrast](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html), [non-text contrast](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html), [use of color](https://www.w3.org/WAI/WCAG22/Understanding/use-of-color.html)

**Risk:** Low-chroma borders may fail when used as essential control boundaries; choose stronger control tokens separately. An OKLCH lightness value is not a WCAG contrast score.

### 5. Create one ambitious image-led scroll sequence with intelligible handoffs

**Decision:** Use a reversible work sequence: the selected image expands from an editorial overview into a dominant project frame, its title/index travel with it, then the next image enters as the previous one recedes. Finish the sequence by handing the same alignment/grid into the project details. Treat a photograph preview as a visual bridge to the archive. The continuity comes from the same objects retaining identity through scale, crop and position.

**Why:** The A24 maker's object-to-detail account supports a coherent interaction metaphor; GSAP ScrollTrigger provides scrubbed timelines and pinned sections. This supports a substantial art-directed transition without reproducing the reference's disc metaphor. [A24 first-party case](https://www.raviklaassens.com/work/a24), [GSAP ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/)

**Implementation:** Use one master timeline per pinned work scene; hold a stable text rail and map image states to clear timeline labels. Reserve pinning for the three-work presentation, not the archive or About. Use shared transform origins, consistent easing for non-scrubbed interactions, and geometry-based start/end states. Do not apply a separate easing curve to every scrubbed object. Mobile can use shorter sequential panels while retaining the same crop/scale language.

**Risk:** Long pins and repeated easing can make scroll feel delayed. Keep exits obvious, permit reverse scrolling, provide direct links, and test fast wheel, trackpad, keyboard and touch input.

### 6. Synchronize GSAP and the existing Lenis on one clock

**Decision:** Keep the authorized GSAP+Lenis architecture; fluidity requires synchronized state rather than multiple smoothing systems.

**Why:** Lenis's own GSAP integration connects `lenis.on('scroll', ScrollTrigger.update)` and calls `lenis.raf(time * 1000)` from the GSAP ticker. Its documentation also supplies no-build script usage. [Lenis official README](https://github.com/darkroomengineering/lenis#gsap-scrolltrigger)

**Implementation:** One Lenis instance, one ticker integration, no concurrent `autoRaf` loop when manually ticking. Use the bundled version's documented APIs; current online documentation may include newer options. Refresh ScrollTrigger after image/font layout settles and after disclosures resize the document. Keep native anchors/focus and explicit modal scroll handling. Favor transforms/opacity over layout animation where possible. [Motion performance guide](https://motion.dev/docs/performance)

**Risk:** Double ticking, mismatched time units and stale image dimensions cause perceived jitter. Validate resize, zoom, back navigation and closing viewers, not merely a single downward scroll.

### 7. Give ambitious motion a complete alternative and make images worth the wait

**Decision:** Reduced-motion/effects-off and script-failure states show the same projects in a normal-flow image-led layout. No loader or mandatory animated journey gates the portfolio. Keep all archive photographs reachable; curate the home preview without removing archive content.

**Why:** W3C's animation-from-interactions criterion (AAA) supports disabling non-essential spatial motion; automatic motion running beside content for more than five seconds generally needs a pause/stop/hide mechanism under the separate Level A criterion. Image alternatives depend on purpose, not merely appearance. [W3C interaction motion](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html), [pause/stop/hide](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html), [images tutorial](https://www.w3.org/WAI/tutorials/images/)

**Implementation:** Honor `prefers-reduced-motion` at startup and on change; revert pins/spatial transforms and stop smoothing. Retain useful imagery and content. Supply meaningful screenshot/photo descriptions; decorative art has empty alt. Keep image dimensions/aspect ratios reserved, load the initial focal image promptly, and lazy-load archive images outside the first screen. Viewer controls remain conventional, labelled and keyboard operable.

**Risk:** Hiding content in base CSS makes failed enhancement blank. Start with visible semantic content and enable animated states only after setup succeeds. Archive curation must never silently reduce the 253-image collection.

## Review gates

Verify the three projects and all archive items remain reachable with scripts disabled, reduced motion and effects off; compare real images in both themes; measure every control/text state rather than only palette swatches; test the continuous sequence in both scroll directions, touch, keyboard, resize and viewer-return flows. Confirm factual copy and third-party asset credits against the existing site before release.

## GSAP vendoring verification

Verified 12 November 2026 against the [official repository package metadata](https://raw.githubusercontent.com/greensock/GSAP/master/package.json) and the headers of [core](https://raw.githubusercontent.com/greensock/GSAP/master/dist/gsap.min.js) and [ScrollTrigger](https://raw.githubusercontent.com/greensock/GSAP/master/dist/ScrollTrigger.min.js): both are **3.15.1**, committed 4 November according to the [official commit history](https://github.com/greensock/GSAP/commits). Vendor matching versions together, retaining the copyright/license header. Fully pinned package-distribution URLs are [gsap.min.js 3.15.1](https://cdn.jsdelivr.net/npm/gsap@3.15.1/dist/gsap.min.js) and [ScrollTrigger.min.js 3.15.1](https://cdn.jsdelivr.net/npm/gsap@3.15.1/dist/ScrollTrigger.min.js). Do not use floating `@latest` or `@3` when downloading the production copies. Load core before ScrollTrigger and register the plugin before authoring timelines; retain local fallbacks.

GSAP uses its **Standard License, not MIT**. The [official license](https://gsap.com/community/standard-license/) allows commercial usage at no charge, prohibits removing/altering proprietary notices, and restricts competing visual animation-builder products; its FAQ explicitly allows AI-generated GSAP code. Record GSAP and ScrollTrigger with this license in the site's credits. This portfolio presentation fits ordinary website animation usage.


# Color and attention research for the portfolio

Research date: 2026-11-12. Read-only inspection: `theme.css` and `editorial.css` in the portfolio repository. No source changes.

## Findings and limits

**There is no scientifically established universally most attractive website color.** Palmer and Schloss's original ecological-valence experiment supports a relationship between preferences and affective associations with colored objects. Their sample and color patches do not establish which portfolio palette improves engagement or conversions. Blue/teal is a reasonable identity choice; claims that it intrinsically creates trust or maximizes clicks would overstate this evidence. [Palmer & Schloss, 2010, PNAS](https://pmc.ncbi.nlm.nih.gov/articles/PMC2889342/)

**Relative salience and the viewer's goal matter.** In an original fMRI/visual-search experiment, a salient color distractor captured attention with diffuse attention but did not do so when participants initially focused centrally, despite identical displays. Inference for this site: a contrasting accent can distinguish the intended next action, but the research does not guarantee attention or prove a specific hue wins. [Belopolsky et al., 2011, Cerebral Cortex, abstract](https://pubmed.ncbi.nlm.nih.gov/21637812/)

**Prioritize luminance contrast over a hue-only difference.** WCAG 2.2 calls for 4.5:1 for ordinary text and 3:1 for large text. Use at least 3:1 for meaningful control/state graphics against adjacent colors; purely decorative separators need not meet that threshold. Links, active navigation, and states should have visible non-color cues such as underlines, shape, text or inversion. [W3C text contrast](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html), [W3C non-text contrast](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html), [W3C use of color](https://www.w3.org/WAI/WCAG22/Understanding/use-of-color.html)

**Light and dark should be separately tuned.** A 2007 proofreading experiment favored dark text on a light surface; the authors' 2009 experiment found that advantage disappeared when overall display luminance was equated. This is task/display evidence, not a universal claim that dark themes harm eyes or light themes are always preferred. Keep both readable and let the visitor choose. [Buchner & Baumgartner, 2007](https://pubmed.ncbi.nlm.nih.gov/17510822/), [Buchner, Mayr & Brandt, 2009, university-hosted original paper](https://www.hhu.de/fileadmin/redaktion/Oeffentliche_Medien/Fakultaeten/Mathematisch-Naturwissenschaftliche_Fakultaet/Psychologie/AAP/Publikationen/2009/Buchner_Mayr_Brandt__2009_.pdf)

## Recommended palette

These hex values and their aesthetic character are a design recommendation, not an experimentally proven optimum. Retain the current warm parchment / cool petrol / copper identity; refine the light background and surface separation. Teal and orange-red are separated in hue and temperature, giving a coherent cool structure with a warm action signal. The reason to use copper sparingly is visual hierarchy, not a universal psychological property of orange.

| Role | Light | Dark | Application |
|---|---|---|---|
| Canvas | `#F5F2EA` | `#101B20` | Main page and header |
| Raised surface | `#E6EBE5` | `#192D33` | About, footer, controls and photo mats |
| Main text | `#17282D` | `#EEECE4` | Headings and body |
| Secondary text | `#526168` | `#A6B4B7` | Captions and context; keep full opacity |
| Teal | `#075C65` | `#79D0D4` | Hero emphasis and ordinary links |
| Copper | `#A8442D` | `#E99C80` | Primary action, selected control and focus |
| Text on copper | `#FFFAF1` | `#101B20` | Filled action buttons and toggle thumb |
| Strong control border | `#758585` | `#627B80` | Controls that rely on an outline to be recognized |

Keep a separate lower-contrast `--line` for decorative editorial rules, e.g. existing `#B7C2C0` / `#42565A`; do not require decorative lines to be as prominent as controls. Avoid using a pale teal token from dark mode as small text on the light canvas.

## Computed contrast

Own calculation using WCAG relative luminance, opaque sRGB hex values; ratios below are rounded for display only. Each ordinary text pair clears 4.5:1 on both recommended surfaces. This checks token combinations, not complete WCAG conformance or rendered overlays.

| Pair | Light canvas / raised | Dark canvas / raised |
|---|---|---|
| Main text | 13.62 / 12.61 | 14.80 / 12.12 |
| Secondary text | 5.74 / 5.32 | 8.20 / 6.72 |
| Teal | 6.88 / 6.37 | 9.82 / 8.05 |
| Copper | 5.32 / 4.92 | 7.95 / 6.51 |
| Strong border | 3.44 / 3.19 | 3.89 / 3.19 |

Filled copper action text: light 5.72:1; dark 7.95:1. Recompute final hover colors and any alpha-composited colors against actual backgrounds.

## Attention strategy for implementation

1. Let the large project imagery and heading dominate. Keep background circuitry low-contrast; avoid competing colored glows and many simultaneously saturated accents.
2. Use one warm, clearly actionable focal point in the hero (the existing project-open mark or primary work CTA). Use teal for supporting emphasis and regular links, with an underline or recognizable link treatment.
3. Keep role consistency across modes: copper is action/selection; teal is structure/emphasis. Change luminance and saturation per mode, rather than simply inverting colors.
4. Apply copper focus outlines with sufficient offset so they touch the canvas/surface instead of a same-color filled button; use a two-color ring if a control crosses image content.
5. Keep selected states recognizable through a marker, underline, filled shape, or label in addition to hue. A checked toggle already supplies physical position; retain that distinction.
6. Read the system light/dark preference initially and preserve an explicit visitor override. The CSS media feature is defined specifically to detect a user preference for light/dark schemes; it is not a measurement of ambient light. [W3C Media Queries Level 5](https://www.w3.org/TR/mediaqueries-5/#prefers-color-scheme)

Validate in real page contexts after implementation: hero word surfaces, project images, theme toggle icons, hover states, focus outlines, small captions, and photography toolbar. These recommendations do not establish that engagement increased; that would require representative user testing.


## User-led palette correction — 12 November 2026

The user finds teal bland. Palette selection now prioritizes that expressed preference: warm cream with light blue raised surfaces, deep navy in dark mode, cobalt title paper and restrained warm orange actions. Contextual preference research does not establish teal as a requirement or a universally attractive hue. All main/secondary/accent text pairs exceed 4.5:1 on canvas, raised and hover surfaces; control edges exceed 3:1. Color roles retain their labels, underlines and physical toggle position. Earlier teal/petrol recommendations are historical.


12 November 2026 — latest user palette: creamy beige light theme; dark theme follows [the supplied Solarin reference](https://visme.co/blog/wp-content/uploads/2016/09/website16.jpg), with #2C3531 gunmetal, #116466 sapphire, #D9B08C tan, #FFCB9A peach and #D1E8E2 platinum. This supersedes previous cobalt/teal recommendations. Real title paper and ink now change with the mode. Preserve layout, motion, factual content and security policy.
