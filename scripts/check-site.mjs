import { access, readFile } from "node:fs/promises";

const requiredFiles = ["index.html", "styles.css", "site.js"];
await Promise.all(requiredFiles.map((file) => access(file)));

const html = await readFile("index.html", "utf8");
const requiredMarkers = [
  "<title>Vesta — Worlds, composed.</title>",
  'id="architecture"',
  'id="platform"',
  'id="progress"',
  'name="description"',
  'property="og:title"',
  'property="og:image"',
  'name="twitter:image"',
];

for (const marker of requiredMarkers) {
  if (!html.includes(marker)) {
    throw new Error(`Missing required site marker: ${marker}`);
  }
}

const localReferences = [...html.matchAll(/(?:href|src)="\.\/([^"?#]+)"/g)].map(
  (match) => match[1],
);
await Promise.all(localReferences.map((file) => access(file)));

console.log(`Site check passed (${requiredFiles.length} files, ${localReferences.length} local references).`);
