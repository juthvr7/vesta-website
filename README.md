# Vesta Website

The bilingual public website for Vesta, an Agent-centered world creation tool in development. World Builder is the future creative environment; current Studio capabilities will progressively move into Builder.

- English: `/`
- 简体中文: `/zh/`
- Existing publication destination: <https://juthvr7.github.io/vesta-website/>

Both languages share `scripts/render-site.mjs` and parallel copy in `content/site-content.mjs`. The language switch preserves the current chapter. Site URL, asset version and content date live in `content/site-config.mjs`. Do not edit generated HTML directly.

## Work locally

```powershell
npm run render
npm run check
npm run build
python -m http.server 8765 --bind 127.0.0.1
```

Preview the production package at `/dist/` and `/dist/zh/`. The package contains only production pages and media; `explorations/` holds earlier local proposals and is not a production dependency. The checks protect bilingual parity, generated-file freshness, metadata, links and local media references. Responsive layout, native video controls, navigation and image dialogs are checked in the browser.

## Media and product claims

`assets/worlds/` is self-contained. Concept images illustrate the world-creation vision and are labeled as concepts. Terrain films visualize actual precomputed Vesta CLI heightfields; camera motion does not represent live generation or erosion time. The Unreal section uses an actual editor capture of an evaluated Erosion2 VDA. Studio is shown as current implementation evidence, not a second permanent product.

See [MEDIA.md](MEDIA.md) for source records and display treatment. Keep both languages equally explicit about implemented slices, work in progress and long-term direction.

The current checkout contains the replacement source and generated pages. Deployment must be reported as complete only after the existing hosted URL has been checked against the new page identity.
