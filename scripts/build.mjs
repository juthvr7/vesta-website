import { cp, mkdir, rm } from "node:fs/promises";

const output = new URL("../dist/", import.meta.url);
await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });

for (const file of [
  "index.html",
  "vesta-site.css",
  "vesta-site.js",
  "robots.txt",
  "sitemap.xml",
  "og.png",
  "favicon.svg",
  "validation.css",
  "validation.js",
  "manual-search.js",
  "manual-search-index.js",
  "help-resolver.js",
  "help-request.js",
  "help-targets.js",
  "help-targets.json",
  "explorer.css",
  "explorer.js",
  "explorer-renderer.js",
]) {
  await cp(new URL(`../${file}`, import.meta.url), new URL(file, output));
}

for (const directory of ["assets/worlds", "assets/validation", "assets/previews", "validation", "reference", "help", "zh", "downloads"]) {
  await cp(new URL(`../${directory}/`, import.meta.url), new URL(`${directory}/`, output), {
    recursive: true,
  });
}

console.log("Built bilingual static site in dist/ (production media only).");
