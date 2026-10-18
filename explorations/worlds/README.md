# Vesta / Worlds by you

Local media-led website proposal, 2026-10-16. Not included in the production build.

## Product authority

This iteration incorporates the user's explicit direction: Vesta is an Agent-centered
world creation tool. World Builder will replace Studio as existing professional authoring
capabilities are integrated. Studio is shown only as current implementation evidence,
not as a permanent peer product in a three-product suite. Agent conversation ownership
remains separate from Builder's world context, and Agent adapters remain replaceable.

## Art direction

Lead with an immersive environment and a clear creative ambition. Follow with multiple
large environment images, three actual result-visualization films, Agent-centered
creation, current development evidence and a clearly qualified roadmap.

The Gaea product page's media-led Create/Simulate/Surface progression informed the
presentation approach: https://www.quadspinner.com/Gaea/. No Gaea media is reused.

The world, city and biome images are generated concept imagery. They are explicitly
labeled as vision, never current Vesta output. The films render actual immutable Vesta
CLI heightfields; they animate only the camera, not generation or erosion simulation.
Image prompts and the built-in image generation provenance are saved in `ASSETS.md`.

The current Studio image and 512-heightfield sources are shared with the first proposal
in `../atlas/`. The original bilingual website is unchanged. Open this `index.html`
directly or serve the repository root and visit `/explorations/worlds/`.

## Interaction

Videos have native controls and play only when visible; respect reduced motion and the
global pause button. Environment images open in an accessible native dialog. No model
requests, pretend live generation, download signup or other external side effects.

## Verification and local preview

2026-10-16: original bilingual site `npm run check` passes; proposal JavaScript syntax,
UTF-8, local references and fragment anchors pass. Native browser checks cover 1440,
768 and 320-pixel layouts without text overflow; image dialog open/close, actual
H.264 playback, six-second media metadata, responsive portrait comparison and global
pause are verified. The initial empty video reads occurred while rendering, before
the final reload; no failed reads are claimed as successful playback.

The user is actively reviewing the local HTTP preview at
`http://127.0.0.1:8765/explorations/worlds/`. The owned loopback-only Python server is
PID 6416 (exec session 30377); retained as the interactive preview, not a Cargo build
or a second Vesta executable. All terrain-rendering Python/ffmpeg processes have
completed and retired. Temporary QA tabs and viewport overrides are removed.
The browser's file-URL policy prevented a direct offline-opening check; that check
was not bypassed. HTTP preview is the verified viewing path. No publication occurred.
