# Photography archive

A separate static page at `/photography/`, linked from the software portfolio.

## Images

Photographs supplied by Sriakshay Vaitla from Pictures/Lightroom Saved Photos, with the Drive folder shared in this task as an alternate source. `images/` contains web-resolution copies (maximum 2000px); `thumbs/` contains 560px previews. All 253 JPEGs in the local saved-photo folder are included, including differently edited versions. Camera RAW and non-image sidecar files are excluded. Local originals remain in their existing folder; source file sizes and modification timestamps were checked before and after conversion. Images are orientation-corrected and exported without EXIF/GPS metadata. No stock or generated photographs are used.

The public gallery does not depend on Drive access, expiring URLs, OAuth, API keys, or client-side requests to Google. The checked-in optimized assets are served directly by GitHub Pages. `photos.json` records local file IDs, original display filenames and dimensions. It contains no local filesystem paths, Drive URLs or credentials.

## Updating

Add new JPEG exports to the same local folder (or the shared Drive folder) and ask Codex to sync this archive. This is a static snapshot, not an automatic Drive sync. Keep all originals in their existing locations; never move or alter them during a sync. Future photos need optimized thumbnail/full-view copies, matching metadata and an HTML figure; don't commit the full-resolution source files. `index.html` is deliberately prerendered so images and their full-view links remain available without JavaScript.

## Interaction

Gallery wall / contact sheet, desktop density adjustment, orientation filter, native image links as a fallback, native modal focus, previous/next keyboard controls, touch swipe, thumbnail navigation and 2× zoom with native scrolling. Spatial motion follows reduced-motion preferences. No idle animation loops or WebGL dependencies.

## References

- https://www.tylermitchell.co/ — image-density controls and a direct, image-first archive; inspected in browser.
- https://www.romainlaprade.com/ — compact image index and deliberate pacing; inspected in browser.

The palette and type extend the portfolio's existing deep navy, ice-blue, red signal, Anybody and Instrument Sans system. No reference imagery, source code, names or branding were reused.
