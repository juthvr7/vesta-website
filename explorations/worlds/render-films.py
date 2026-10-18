"""Make three media studies from the immutable Vesta CLI result pair.

Run with the website checkout as cwd. Requires matplotlib, numpy and the isolated
imageio-ffmpeg package under .design-tools. Animation is camera motion, not a
recording of operation execution or a simulated erosion time sequence.
"""

import json
import math
import sys
from pathlib import Path

sys.path.insert(0, str(Path(".design-tools").resolve()))
import imageio_ffmpeg
import matplotlib

matplotlib.use("Agg")
import matplotlib.pyplot as plt
from matplotlib.colors import LightSource, LinearSegmentedColormap
import numpy as np

source = Path("D:/Vesta/target/gaea-terraces")
out = Path("explorations/worlds/assets")
out.mkdir(parents=True, exist_ok=True)
docs = [json.loads((source / name).read_text(encoding="utf-8")) for name in ["relief-before.json", "relief-after.json"]]
grids = [np.asarray(d["samples"], dtype=np.float32).reshape(d["height"], d["width"]) for d in docs]
factor = 64 * .2 / float(np.ptp(grids[0]))
cmap = LinearSegmentedColormap.from_list("vesta-surface", ["#223a30", "#6e8261", "#b9b18a", "#d7c7a5", "#f2ead6"])
figures = []
axes = []
for grid in grids:
    z = grid[::4, ::4] * factor
    y, x = np.mgrid[0:z.shape[0], 0:z.shape[1]] * 64 / (z.shape[0] - 1)
    fig = plt.figure(figsize=(9.6, 6.4), dpi=100, facecolor="#18251f")
    ax = fig.add_axes([-.09, -.14, 1.18, 1.3], projection="3d", computed_zorder=False)
    ax.set_facecolor("#18251f")
    colors = LightSource(305, 40).shade(z, cmap, vert_exag=1, dx=.5, dy=.5, blend_mode="soft")
    ax.plot_surface(x, y, z, facecolors=colors, rcount=z.shape[0], ccount=z.shape[1], shade=False, linewidth=0, antialiased=False)
    ax.set_box_aspect((1, 1, .37))
    ax.set_proj_type("ortho")
    ax.set_xlim(0, 64)
    ax.set_ylim(0, 64)
    ax.set_zlim(float(grids[0].min() * factor) - 1, float(grids[0].max() * factor) + 1)
    ax.set_axis_off()
    figures.append(fig)
    axes.append(ax)

names = ["ridge-orbit.mp4", "terraces-orbit.mp4", "shape-study.mp4", "shape-study-tall.mp4"]
sizes = [(960, 640), (960, 640), (1920, 640), (960, 1280)]
writers = [imageio_ffmpeg.write_frames(str(out / name), size, fps=18, codec="libx264", pix_fmt_out="yuv420p", quality=8, macro_block_size=1, output_params=["-movflags", "+faststart", "-preset", "fast"]) for name, size in zip(names, sizes)]
for writer in writers:
    writer.send(None)
try:
    for index in range(108):
        phase = index / 108 * math.tau
        frames = []
        for fig, ax in zip(figures, axes):
            ax.view_init(elev=38 + 3 * math.sin(phase), azim=-58 + 19 * math.sin(phase))
            fig.canvas.draw()
            frames.append(np.asarray(fig.canvas.buffer_rgba())[:, :, :3].copy())
        writers[0].send(frames[0])
        writers[1].send(frames[1])
        writers[2].send(np.concatenate(frames, axis=1))
        writers[3].send(np.concatenate(frames, axis=0))
        if index % 27 == 0:
            print(f"Rendered {index + 1}/108 frames", flush=True)
finally:
    for writer in writers:
        writer.close()
    for fig in figures:
        plt.close(fig)
print(json.dumps({"films": names, "frames": 108, "fps": 18, "duration_seconds": 6, "source_resolution": [512, 512], "render_mesh_sampling": "every fourth sample per axis", "animation": "shared camera only"}), flush=True)
