# Poster hero — review checkpoint

Implemented only the first-step header/hero requested on 17 November 2026. The next section redesign awaits user review. Changes are local, uncommitted and unpushed.

## Changed files

- index.html: semantic poster headline with the exact current text, existing role/graduation copy, project CTA and Contact link; real native theme button; local font/style/module links. Original featured software screenshot and caption remain below the opening poster panel.
- poster-hero.css: exact user-pinned theme roles, Archivo Black display, responsive flat composition, single accent CTA, 300ms color fade and reduced-motion styles.
- poster-hero.js: finite initial headline/bottom reveal, motion preference cancellation, optional existing lower-page enhancements retained while their redesign waits.
- theme.js: native button plus compatible existing photography checkbox; stored preference, system fallback, cross-tab synchronization, no circular wipe.
- editorial.js: skips legacy choreography on the new hero route, keeps existing featured-image viewer wiring.
- assets/ArchivoBlack-Regular.ttf, assets/ArchivoBlack-OFL.txt and CREDITS.txt: locally hosted official Google Fonts distribution and license.
- tests/theme.test.cjs: five preference/toggle regression scenarios.
- PRODUCT.md, DESIGN.md, .impeccable/design.json and .impeccable/surfaces/poster-hero.md: scoped hero contract and tokens; lower-page legacy documentation preserved.

## Content preservation

Project article HTML, complete About/timeline block and footer were compared byte-for-byte against the original index and match. H1 normalized text remains exactly “I build software for creative work.”, including its existing period. All three descriptions, technical details/stacks, coursework, experience, links and separate photography archive remain. No factual copy was authored. CTA Contact is an existing navigation label reused for the requested route.

## Verify locally

From the repository:

```sh
python3 -m http.server 8091 --bind 127.0.0.1
```

Open http://127.0.0.1:8091/ . Test theme button with click, Enter and Space; reload to confirm persistence. With no saved sv-theme preference, initial theme follows system. Projects and Contact target the existing #work and #contact routes. The lower-page presentation is still the prior version.

```sh
node --test tests/*.test.*
python3 tests/check_static_site.py
git diff --check
```

Results: 54 tests passed; 573 local resources, route anchors and module syntax passed; whitespace check passed. Browser captures cover 1280×720 desktop/default user width and 390×844 phone, both themes, with no horizontal overflow. Enter/Space, saved reload and Contact anchor were exercised. No console/security-policy errors appeared in the reviewed hero preview. Native OS reduced-motion was not toggled; source rules and preference tests cover suppression. No cross-browser certification is claimed.

## Exact contrast pairs

- #7A3A1D on #E8D5B7: 5.971:1 body.
- #A0522D on #E8D5B7: 3.913:1 large heading only.
- #0047AB / #E8D5B7: 5.878:1 CTA pair.
- #F7F0DC on #0E4B44: 8.751:1 body/heading.
- #0E4B44 on #FF6B1A: 3.495:1, bold 19–20px large CTA label only.

Accent appears only on the main hero CTA at rest; navigation, secondary Contact and theme control use base colors. Focus uses a base-color outline. The security policy and inline import-map hash remain unchanged.

## Tool limits

Impeccable context launcher failed permission; concept-seed via sh failed because engine0.1.18/cache unavailable. User-pinned composition/palette govern this code-led step; no generated comp, seed or detector pass is asserted. Independent screenshot review is recorded separately.
