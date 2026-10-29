# Project tile field verification — 2026-10-28

- Inspected Fabian Tjoe-A-On’s selectable tile matrix in-browser, without sound.
- Desktop 1440×1000: true rounded blocks, varied resting height, radial native-pointer displacement (drag path), projected project labels, screenshot preview spanning block fronts.
- Mobile 390×844: compact 18×11 field, all three labels in bounds, no horizontal page overflow, project selection opens native modal.
- Keyboard: project link focus changes preview; Enter opens viewer; Escape returns to field and restores project link focus.
- Gallery navigation and interrupted return preserve the field context. All three project choices verified.
- Effects off: static height and immediate preview; field reports settled. Existing preference controls preserved.
- Software-renderer query: CSS field remains present; PhotoMosaic link opens static native viewer.
- Field reports settled=true after motion completes; renderer sleeps rather than looping at idle.
- Browser console: no shader errors or warnings in the checked rendering session.
- 34 UI, ambient, viewer, scroll and tile motion tests pass; syntax checks and git diff --check pass.

Screenshots: desktop-project-field.jpg and mobile-project-field.jpg. These checks are functional/visual evidence, not a device frame-rate certification.
