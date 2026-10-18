# Production media provenance

## Vision concepts

`world-hero.webp`, `world-city.webp` and `world-biome.webp` were generated with the built-in image generation tool for the October 16, 2026 visual proposal approved by the user. They depict the long-term world, city and ecosystem direction. They are not Vesta output. The page states this next to each image. Responsive 768/1280 variants contain the same image with routine resize and WebP encoding.

Original generation identifiers:

- Hero: `exec-2bc18e19-bf4f-435d-9276-df56c0513ba5.png`
- City: `exec-2fade3d2-cfdc-47d5-adbb-ad41543b6650.png`
- Biome: `exec-b251d368-ee47-46d1-be97-aa867d9493e1.png`

## Actual heightfield output

`ridge-orbit.mp4`, `terraces-orbit.mp4`, `shape-study.mp4` and its mobile portrait layout visualize the two 512² Vesta CLI results recorded in `assets/worlds/provenance.json`. Each clip is six seconds at 18 fps, H.264/yuv420p. They use a shared camera and 20% display relief, sampling every fourth source point. Colors are presentation shading. Only the camera moves; source heights are unchanged. These are not performance benchmarks or recordings of the future Builder UI. `ridge.webp` and `terraces.webp` are still presentation renders of those samples.

## Current implementation captures

`studio.webp` is an actual October 16, 2026 Studio Terraces VDA preview showing public parameters, graph and terrain. The page describes its planned migration into Builder.

`unreal-vda.webp` is an actual October 16, 2026 UE 5.8 editor capture, showing the Erosion2 VDA in the VestaTest comparison map with public parameter controls and an evaluated Landscape. Capture preparation changed only the disposable editor session: lighting, a sky atmosphere and the camera; neither the map nor author assets were saved. The image is encoded to WebP without generative alteration. Evaluation uses a 1024² request with UE RHI GPU Ridge/Erosion2 segments and CPU input/output stages; the Landscape uses 1021² samples. This is evidence of the current Heightfield slice, not complete engine integration or every parameter-widget type.

The local evaluation receipt and source capture are kept under the Vesta default `target/website-unreal/`; public product claims are deliberately narrower than the full future roadmap.

## Capability manual media

`assets/validation/` contains 48 WebP derivatives at 768, 1280 and 1600 pixels wide, exported from 16 text-free masters rendered from saved actual results. Edge, Fold and SoftClip use 1024² samples; the Terraces display pair uses 512². The engine-delivery pair uses saved 1024² CPU and Unreal results. The shared render profile records camera, height treatment and color range; image and master hashes are retained in `content/validation/evidence.json`.

Four CPU records retain their original validation dates and case counts. The engine comparison retains its October 15 receipt and represents one bounded full-chain result, not all parameter combinations. These are result renders, not new native UI captures or fresh execution evidence. No generative alteration is used. New feature pages, media names and captions use neutral capability names; internal reference provenance is excluded from the website bundle.

The manual also includes the existing six-second, 18 fps Terraces camera film and its poster unchanged. It depicts precomputed output; it is not a live computation recording.
# Node reference media — 2026-10-19

`assets/validation/help/` contains 70 new text-free actual-result renders for
30 nodes, with 768/1280/1600 WebP derivatives. `content/help/result-media.json`
records exact node versions, source result and master hashes, display treatment,
and effective typed-parameter recipes. These are CPU examples evaluated through
the standard Vesta CLI, not screenshots, concepts, a timing claim, or a new
numerical-acceptance matrix. Four unchanged recipe results are labeled as such.

Mesh profile `mesh-comparison-v2` preserves every face, uses a shared group
bounding box/camera and two-sided neutral lighting. The earlier darker v1
masters remain private. Terrain profile `terrain-comparison-v2` chooses one
common full-group range and a 0.20 display relief; it does not stretch each
variant separately. The earlier four node studies keep their original v1
profile and historical acceptance dates. Do not compare display height across
unrelated groups as a physical-unit measurement.

Raw results, source fixture snapshots, CLI identities and clean 1600×1000 PNG
masters remain in Vesta's documentation evidence. Public names and assets do
not contain upstream product names. This block supplements the existing media
records above; it does not replace their historical scope.
