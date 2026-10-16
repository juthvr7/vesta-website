import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
import { dirname, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { locales } from "../content/site-content.mjs";
import { site } from "../content/site-config.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
// Locale structure is a publishing contract: a new section cannot silently disappear in one language.
function shape(value) {
  if (Array.isArray(value)) return value.map(shape);
  if (value && typeof value === "object") return Object.fromEntries(Object.entries(value).map(([k,v]) => [k,shape(v)]));
  return typeof value;
}
assert.deepEqual(shape(locales.en), shape(locales.zh), "Locale content structures differ");
const checked = new Set();
for (const [path, lang] of [["index.html", "en"], ["zh/index.html", "zh-CN"]]) {
  const file = resolve(root, path);
  const html = await readFile(file, "utf8");
  assert(!html.includes("�"), `${path}: invalid text`);
  assert(html.includes(`<html lang="${lang}">`));
  assert(html.includes(`rel="canonical" href="${site.url}${path.startsWith("zh/") ? "zh/" : ""}"`));
  for (const code of ["en", "zh-CN", "x-default"]) assert(html.includes(`hreflang="${code}"`));
  assert(!html.includes("explorations/"), `${path}: prototype dependency`);
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(m => m[1]);
  assert.equal(new Set(ids).size, ids.length, `${path}: duplicate IDs`);
  for (const id of ["top", "vision", "motion", "unreal", "agent", "progress"]) assert(ids.includes(id), `${path}: missing chapter ${id}`);
  assert.equal([...html.matchAll(/<video\b/g)].length, 3);
  for (const match of html.matchAll(/<video\b([^>]*)>/g)) for (const attr of ["muted", "loop", "playsinline", "controls"]) assert(match[1].includes(attr));
  for (const match of html.matchAll(/<img\b([^>]+)>/g)) assert(/\balt="[^"]*"/.test(match[1]), `${path}: image missing alt`);
  const refs = [...html.matchAll(/\b(?:src|href|poster|data-image)="([^"]+)"/g)].map(m => m[1]);
  for (const srcset of html.matchAll(/\bsrcset="([^"]+)"/g)) refs.push(...srcset[1].split(",").map(s => s.trim().split(/\s+/)[0]));
  for (const ref of refs) {
    if (/^(https?:|mailto:)/.test(ref)) continue;
    if (ref.startsWith("#")) {assert(ids.includes(ref.slice(1)), `${path}: broken anchor ${ref}`); continue;}
    let target = resolve(dirname(file), ref.split(/[?#]/)[0]);
    assert(target === root || target.startsWith(`${root}${sep}`), `${path}: reference escapes package: ${ref}`);
    if (ref.split(/[?#]/)[0].endsWith("/")) target = resolve(target, "index.html");
    const info = await stat(target);
    assert(info.size > 0, `${ref}: empty asset`);
    if (!checked.has(target) && /\.(webp|mp4)$/.test(target)) {
      checked.add(target);
      assert(info.size < (target.endsWith("mp4") ? 6_000_000 : 1_500_000), `${ref}: exceeds media budget`);
      const bytes = await readFile(target);
      assert(target.endsWith("mp4") ? bytes.subarray(4,8).toString() === "ftyp" : bytes.subarray(8,12).toString() === "WEBP", `${ref}: wrong media format`);
    }
  }
  assert(html.includes('data-image="' + (lang === 'en' ? './' : '../') + site.media + 'unreal-vda.webp"'), `${path}: missing authentic UE capture`);
}
const sitemap = await readFile(resolve(root,"sitemap.xml"),"utf8");
for (const path of ["", "zh/"]) assert(sitemap.includes(`<loc>${site.url}${path}</loc>`));
console.log(`Bilingual parity, metadata, chapter links and ${checked.size} local media assets verified.`);
