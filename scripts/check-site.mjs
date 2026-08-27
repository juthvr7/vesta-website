import { access, readFile, stat } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { locales } from "../content/site-content.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const fromRoot = (...parts) => resolve(root, ...parts);
const siteUrl = "https://juthvr7.github.io/vesta-website/";

const requiredFiles = [
  "index.html",
  "zh/index.html",
  "vesta-site.css",
  "vesta-site.js",
  "robots.txt",
  "sitemap.xml",
  "og.png",
  "content/site-content.mjs",
  "scripts/render-site.mjs",
  "assets/world-system.webp",
  "assets/unified-data.webp",
  "assets/world-composition.webp",
  "assets/studio-current.webp",
  "assets/vesta-worlds-loop.mp4",
];

await Promise.all(requiredFiles.map((file) => access(fromRoot(file))));

const pages = [
  {
    path: "index.html",
    locale: locales.en,
    lang: "en",
    canonical: siteUrl,
    stylesheet: "./vesta-site.css",
  },
  {
    path: "zh/index.html",
    locale: locales.zh,
    lang: "zh-CN",
    canonical: `${siteUrl}zh/`,
    stylesheet: "../vesta-site.css",
  },
];

const checkedReferences = new Set();

for (const page of pages) {
  const absolutePath = fromRoot(page.path);
  const html = await readFile(absolutePath, "utf8");
  const markers = [
    `<html lang="${page.lang}"`,
    `<title>${page.locale.title}</title>`,
    `<link rel="canonical" href="${page.canonical}"`,
    '<link rel="alternate" hreflang="en"',
    '<link rel="alternate" hreflang="zh-CN"',
    '<link rel="alternate" hreflang="x-default"',
    `href="${page.stylesheet}"`,
    'id="system"',
    'id="data"',
    'id="studio"',
    'id="architecture"',
    'id="roadmap"',
    'data-hero-video',
    'data-video-toggle',
    'class="hero-proof"',
    'data-hero-flow-step',
    'class="hero-build-preview"',
    'class="locale-switch"',
  ];

  for (const marker of markers) {
    if (!html.includes(marker)) {
      throw new Error(`${page.path} is missing required marker: ${marker}`);
    }
  }

  const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map((match) => match[1]);
  const duplicateIds = ids.filter((id, index) => ids.indexOf(id) !== index);
  if (duplicateIds.length) {
    throw new Error(`${page.path} contains duplicate ids: ${[...new Set(duplicateIds)].join(", ")}`);
  }

  const references = [...html.matchAll(/(?:href|src|poster)="([^"]+)"/g)].map(
    (match) => match[1],
  );

  for (const reference of references) {
    if (
      reference.startsWith("#") ||
      reference.startsWith("http://") ||
      reference.startsWith("https://") ||
      reference.startsWith("mailto:") ||
      reference.startsWith("data:")
    ) {
      continue;
    }
    const cleanReference = reference.split(/[?#]/, 1)[0];
    const target = resolve(dirname(absolutePath), cleanReference);
    await access(target);
    checkedReferences.add(target);
  }
}

const css = await readFile(fromRoot("vesta-site.css"), "utf8");
for (const match of css.matchAll(/url\(["']?([^"')]+)["']?\)/g)) {
  const reference = match[1];
  if (reference.startsWith("data:") || reference.startsWith("http")) continue;
  const target = resolve(root, reference.split(/[?#]/, 1)[0]);
  await access(target);
  checkedReferences.add(target);
}

const mediaLimits = [
  ["assets/vesta-worlds-loop.mp4", 5_000_000],
  ["assets/world-system.webp", 750_000],
  ["assets/unified-data.webp", 750_000],
  ["assets/world-composition.webp", 750_000],
  ["assets/studio-current.webp", 750_000],
];

for (const [file, maxBytes] of mediaLimits) {
  const details = await stat(fromRoot(file));
  if (details.size > maxBytes) {
    throw new Error(`${file} is ${(details.size / 1_000_000).toFixed(2)} MB; limit is ${maxBytes / 1_000_000} MB.`);
  }
}

const sitemap = await readFile(fromRoot("sitemap.xml"), "utf8");
for (const url of [siteUrl, `${siteUrl}zh/`]) {
  if (!sitemap.includes(`<loc>${url}</loc>`)) throw new Error(`Sitemap is missing ${url}`);
}

console.log(
  `Site check passed (${requiredFiles.length} required files, ${pages.length} locales, ${checkedReferences.size} local references).`,
);
