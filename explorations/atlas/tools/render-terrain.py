"""Render website studies from immutable Vesta CLI heightfield exports.

python render-terrain.py --before <json> --after <json> --out <asset-directory>
The camera and display relief are shared. No samples are modified on disk.
"""

import argparse
import hashlib
import json
from pathlib import Path

import matplotlib

matplotlib.use("Agg")
import matplotlib.pyplot as plt
from matplotlib.colors import LightSource, LinearSegmentedColormap
import numpy as np

parser = argparse.ArgumentParser()
parser.add_argument("--before", type=Path, required=True)
parser.add_argument("--after", type=Path, required=True)
parser.add_argument("--out", type=Path, required=True)
args = parser.parse_args()
args.out.mkdir(parents=True, exist_ok=True)

docs = [json.loads(path.read_text(encoding="utf-8")) for path in [args.before, args.after]]
grids = [np.asarray(doc["samples"], dtype=np.float32).reshape(doc["height"], doc["width"]) for doc in docs]
span = float(docs[0]["bounds"]["width"])
display_scale = span * 0.2 / float(np.ptp(grids[0]))
palette = LinearSegmentedColormap.from_list("vesta-clay", ["#78644c", "#ad9270", "#dac29b", "#f0e3ca"])


def render_surface(grid, filename, *, hero=False):
    # Keep sufficient physical samples to expose the actual terrace profile.
    z = grid[::2, ::2] * display_scale
    nrows, ncols = z.shape
    y, x = np.mgrid[0:nrows, 0:ncols] * span / (nrows - 1)
    fig = plt.figure(figsize=(13, 10), dpi=160)
    ax = fig.add_axes([-.075, -.08, 1.15, 1.16], projection="3d", computed_zorder=False)
    colors = LightSource(305, 43).shade(z, palette, vert_exag=1, dx=span / ncols, dy=span / nrows, blend_mode="soft")
    ax.plot_surface(x, y, z, facecolors=colors, rcount=nrows, ccount=ncols, shade=False, linewidth=0, antialiased=False)
    ax.view_init(elev=43 if hero else 39, azim=-58)
    ax.set_box_aspect((1, 1, .37))
    ax.set_proj_type("ortho")
    ax.set_axis_off()
    ax.set_xlim(0, span)
    ax.set_ylim(0, span)
    ax.set_zlim(float(grids[0].min() * display_scale) - 1, float(grids[0].max() * display_scale) + 1)
    fig.savefig(args.out / filename, transparent=True, dpi=160)
    plt.close(fig)


render_surface(grids[1], "terrain-hero.png", hero=True)
render_surface(grids[0], "ridge.png")
render_surface(grids[1], "terraces.png")

fig, ax = plt.subplots(figsize=(10, 10))
fig.subplots_adjust(0, 0, 1, 1)
ax.contour(grids[1], levels=19, colors="#8c8270", linewidths=.7, alpha=.45)
ax.set_axis_off()
ax.set_aspect("equal")
fig.savefig(args.out / "contours.svg", transparent=True)
plt.close(fig)

manifest = {
    "kind": "Vesta CLI result visualization; not a live browser evaluation",
    "source_files": [
        {"name": path.name, "sha256": hashlib.sha256(path.read_bytes()).hexdigest()}
        for path in [args.before, args.after]
    ],
    "resolution": [docs[0]["width"], docs[0]["height"]],
    "chain": "Ridge -> Terraces",
    "parameters": {"NumTerraces": 12, "Uniformity": 1.0, "Steepness": .85, "Intensity": 1.0, "Seed": 0},
    "display": "Shared camera and display relief; before range occupies 20% of horizontal span.",
    "sample_range": [{"min": float(z.min()), "max": float(z.max())} for z in grids],
}
(args.out / "provenance.json").write_text(json.dumps(manifest, indent=2) + "\n", encoding="utf-8")
print(json.dumps({"assets": [p.name for p in args.out.iterdir()], "resolution": manifest["resolution"]}))
