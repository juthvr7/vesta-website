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
