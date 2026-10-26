# Vesta Website

The bilingual public website for Vesta, an Agent-centered world creation tool in development. World Builder already brings together node editing, parameters and result display; the remaining Studio capabilities are moving across in stages. Developer Agent runs in Builder and as a standalone desktop app; external Agents connect to the running Builder through controlled tools.

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

`assets/worlds/` is self-contained. Concept images illustrate the world-creation vision and are labeled as concepts. Terrain films visualize actual precomputed Vesta CLI heightfields; camera motion does not represent live generation or erosion time. The Unreal section uses an actual editor capture of an evaluated Erosion2 VDA. The authoring section shows the October 27, 2026 native Builder Dragon capture, with its full node chain and preserved media provenance. The older Studio capture remains unchanged in the media archive.

See [MEDIA.md](MEDIA.md) for source records and display treatment. Keep both languages equally explicit about implemented slices, work in progress and long-term direction.

The current checkout contains the replacement source and generated pages. Deployment must be reported as complete only after the existing hosted URL has been checked against the new page identity.

## Capability framework and offline manual

`/validation/` and `/zh/validation/` follow seven chapters: Agent-led creation, terrain, geometry/node tools, world systems, Graph and assets, engine delivery, and execution foundations. The collaboration chapter describes Builder, Developer Agent, external connections and manually maintained Task records. A persistent chapter tree leads to supporting studies and the complete node directory. Planned capabilities remain explicit; the structure is not a gallery of available images.

`content/creation-framework.mjs` owns this editorial structure, `content/validation-content.mjs` owns study copy, and `content/validation/evidence.json` contains reviewed neutral snapshots imported from Vesta. These are presentation records, not another operation registry. Builds are self-contained and do not run Core or access the Vesta checkout.

`npm run build` requires Node.js and Python 3. It generates 314 bilingual content pages and 1,602 search entries, including 644 node entries in both languages, plus `downloads/vesta-manual.zip`. Search entries with category anchors are not separate authored pages. The ZIP includes a bilingual `index.html` entry, local HTML links, images and the included short film; no server, fetch, module loader or online runtime is required.

ZIP CRC, relative links, search corpus and manifest hashes are checked. Direct `file://` UI testing was blocked by the current in-app browser policy and remains unqualified; HTTP preview checks do not replace that test. The manual and framework are included in the production publication package. Verify the hosted manifest and page identity after each deployment.

## Contextual node help

The 111 CPU implementation registrations now have exact-version parameter references, covering 1,018 parameters. Of these, 48 have reviewed explanations for all 256 of their parameters; the remaining 63 explicitly retain pending behavioral prose. These documentation states do not grant operation acceptance. `contracts.json` preserves the original four contracts; `implemented-contracts.json` adds a dated implementation projection. `reference-copy.mjs` and `implemented-copy.mjs` contain bilingual explanations keyed to the exact version. Types, defaults, ranges, conditions, repeated rows and choices remain tied to the capture. A source-branded algorithm token has a neutral display alias only in an explicitly non-executable presentation projection; the original stays private. No runtime parameter is changed.

`result-media.json` binds 70 new text-free images to 30 exact node versions. Along with the four earlier illustrated references, 34 nodes have effect media. Mesh and terrain use separate comparison profiles with common camera, bounds and shading within each group. Every image records result/master/derivative hashes, effective typed parameters, upstream recipe and the actual CPU evaluation scope. Recipes are documentation records, not author documents. Unchanged samples are labeled honestly. The images are newly evaluated examples, not a new parity or interaction qualification. Capability sections link directly to these references.

`help-targets.json` schema v2 distinguishes versioned `reference` and `catalog-entry` targets; the shared resolver retains v1 compatibility. A host may open `help/index.html?topic=node.edge&version=1&parameter=Style&lang=zh-CN`. Unknown versions never become the latest version. An entry without a parameter reference explicitly offers its same-version category anchor, not another node's reference. Website and extracted ZIP use the same request. The ZIP manifest records its target hash, physical page count, search-entry count and exact package hash separately.

`content/help/directory.json` projects all 644 CLI registry entries into 32 neutral categories. Catalog registration, CPU registration (111), parameter-reference availability (111), explained references (48), effect-media availability (34) and acceptance are different facts. `reference/data/help-coverage.json` exposes the documentation coverage. Names are display metadata; source identifiers and provenance stay internal. Do not manufacture parameter explanations or reuse unrelated images to make unfinished references look complete. The category renderer and per-entry search are shared by online and offline builds.

The draft download may be rebuilt; a date alone is not an immutable release identity. Its edition date comes from `content/site-config.mjs`, separately from each study's historical evidence date. Preserve previous operation versions and their matching prose when adding a new contract. Native help actions are being integrated and qualified by the hosts; immutable hosted releases remain future work.

## Interactive result explorers

Six references include an explicitly activated, shared WebGL2 viewer: Dragon,
Bunny, Teapot, Torus, Box and Ridge. Five mesh models and nine captured presets
share a dependency-free display WASM module (about 35 KB). WASM prepares normals,
wire edges and camera/model matrices. It contains no Graph runtime, operation
catalog, generation, noise or erosion kernel. Sample changes load saved results;
scale, rotation, clipping, lighting, contours and water are display controls.

`assets/previews/manifest.json` binds exact topic/version, source-result and
packaged-asset hashes. The web worker validates hashes, bounded binary geometry
and ABI version, cancels replaced downloads and rejects obsolete generations.
Closing the viewer terminates its worker and deletes graphics resources.
`scripts/check-explorer.mjs` verifies the actual WASM/data boundary in addition
to the normal site checks. Vesta owns the display source and export/build tools
under ADR-0449; the website build uses the already packaged assets independently.

Interactive modules require HTTP/HTTPS and WebGL2. Static images remain present;
the offline manual strips the interactive module and links to the online viewer.
No external rendering library, remote evaluation service or user data upload is
required. Result data is intentionally public; generator implementations are not
included in this distribution.
