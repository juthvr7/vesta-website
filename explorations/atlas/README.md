# Vesta / Atlas website exploration

Superseded for product direction by `../worlds/`, following the user's explicit
request for an Agent-centered Builder that will replace Studio, and a more immersive
image/video-led presentation. This first study remains only as a comparison.

Local design proposal, 2026-10-16. This directory is not included in the production
build or deployment. The existing bilingual website remains unchanged.

## Direction

Use the visual language of a terrain atlas: warm paper, dark green ink, geological
clay, quiet orange annotations, large type, open editorial layouts and honest image
captions. Show real output before architecture. Use ordinary scrolling instead of
forcing visitors through twelve full-screen slides.

The narrative is: a world worth shaping -> one real terrain transformation -> how
human/Agent collaboration works -> complementary products -> long-term horizon ->
current verified slices, work in progress and future scope.

Studio remains the concrete professional authoring example. World Builder is the
independent evolving workspace, and Vesta Agent owns conversations. The connection
illustration and Builder workspace list are explanatory diagrams, not fabricated
screenshots or claims that complete world generation has shipped.

## Open

Open `index.html` directly in a browser, or serve the repository root with a static
HTTP server and visit `/explorations/atlas/`.

The comparison slider reveals precomputed result images; it does not invoke a model
or run Vesta in the browser. Product tabs, keyboard navigation, mobile navigation,
in-page anchors, source disclosure and the link to the existing Chinese site work
without third-party services, fonts, frameworks or package installation.

## Visual provenance

`assets/provenance.json` identifies the immutable CLI exports behind the terrain
images. `tools/render-terrain.py` re-renders these scientific surface plots from
explicit source paths. It uses the same camera and display relief for comparison.
The surface examples were exported at 512 x 512. The Studio screenshot is the real
2026-10-16 Terraces VDA preview at 1024 x 1024, not the source of the 512 comparison.
The existing world-composition image is reused only as clearly labeled future
concept imagery.

This proposal intentionally contains no invented testimonials, production readiness
claims, live AI generation, waitlist collection or download buttons.

## Checks

- `node --check explorations/atlas/atlas.js`
- `npm run check` (existing bilingual production website)
- Browser inspection at desktop, tablet and narrow mobile sizes; comparison,
  keyboard tabs, navigation and overflow checks.

Promotion into the bilingual production content/template and new media optimization
is a subsequent integration step after visual review. No publication was performed.
