import { cp, mkdir, rm } from "node:fs/promises";

const output = new URL("../dist/", import.meta.url);
await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });

for (const file of ["index.html", "styles.css", "site.js", "robots.txt", "sitemap.xml"]) {
  await cp(new URL(`../${file}`, import.meta.url), new URL(file, output));
}

try {
  await cp(new URL("../og.png", import.meta.url), new URL("og.png", output));
} catch (error) {
  if (error.code !== "ENOENT") throw error;
}

console.log("Built static site in dist/.");
