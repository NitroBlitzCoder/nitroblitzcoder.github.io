# Cinematic viewer verification

User chose the cinematic project viewer with the approved layout and blue circuit material preserved.

25 tests pass: existing cursor/effects/comparison lifecycle, ambient-motion lifecycle, and source crop/aspect-fit/exact flight endpoints/gallery and mobile geometry. JavaScript syntax and git diff --check pass; local HTML assets and anchors resolve, with no duplicate IDs.

Browser verification at 1280x720 and390x844: actual WebGL lift/curvature/reflection, opposing gallery rotations, sharp DOM resting image, close flight into a different selected project, correct trigger focus, rapid Next/Next then Escape without hidden source residue, zero modal scroll, 44px phone controls, no phone overflow. Resizing during a gallery change settles into a visible image.

Effects off keeps the gallery static. Explicit renderer=software still opens/navigates/closes with keyboard and focus intact. Browser reported no errors or warnings. GPU frames run only during active transitions; recording screenshots adds observable capture overhead, so no physical-phone or cross-browser frame-rate certification is claimed.

Captures: cinema-desktop.jpg and cinema-mobile.jpg are settled viewport states; cinema-opening-flight.jpg is an actual in-flight viewport. Original source meshes/licenses and project imagery remain credited. No deployment performed.
