# Vesta Website

Public website for Vesta, an engine-independent procedural editor and spatial computing platform. The English site is served from `/`; the Chinese site is served from `/zh/`.

The generated HTML pages share one structured source in `content/site-content.mjs`. Edit the content or template, then render both locales before committing.

## Local validation

```powershell
npm run render
npm run check
npm run build
```

`npm run build` refreshes both generated pages and assembles the complete static site in `dist/`.
