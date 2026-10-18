import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
import { dirname, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { locales } from "../content/site-content.mjs";
import { site } from "../content/site-config.mjs";
import { createHash } from "node:crypto";
import { validationUi, studies } from "../content/validation-content.mjs";
import { validationRecords, validationRoute, chapterRoute, bundleIdentity } from "./render-validation.mjs";
import { frameworkUi, chapters } from "../content/creation-framework.mjs";
import {helpContracts,helpTargets,referenceRoute,parameterAnchor} from '../content/help-model.mjs';
import {referenceCopy} from '../content/help/reference-copy.mjs';
import {editorialCopy,explanationsComplete} from '../content/help/reference-status.mjs';
import {helpMedia} from './render-implemented-help.mjs';
import helpResolver from '../help-resolver.js';
import {nodeDirectory,libraryRoute,libraryAnchor,libraryCategories} from '../content/node-library.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
// Locale structure is a publishing contract: a new section cannot silently disappear in one language.
function shape(value) {
  if (Array.isArray(value)) return value.map(shape);
  if (value && typeof value === "object") return Object.fromEntries(Object.entries(value).map(([k,v]) => [k,shape(v)]));
  return typeof value;
}
assert.deepEqual(shape(locales.en), shape(locales.zh), "Locale content structures differ");
assert.deepEqual(shape(validationUi.en),shape(validationUi.zh),'Validation UI translations differ');
assert.deepEqual(shape(frameworkUi.en),shape(frameworkUi.zh),'Framework UI translations differ');
for(const c of chapters)assert.deepEqual(shape(c.en),shape(c.zh),'Chapter translations differ');
assert.deepEqual(chapters.flatMap(c=>c.studies).sort(),validationRecords.map(r=>r.id).sort(),'Study must belong to exactly one capability chapter');
for(const item of Object.values(studies))assert.deepEqual(shape(item.en),shape(item.zh),'Study translations differ');
const checked = new Set();
for (const [path, lang] of [["index.html", "en"], ["zh/index.html", "zh-CN"]]) {
  const file = resolve(root, path);
  const html = await readFile(file, "utf8");
  assert(!html.includes("\uFFFD"), `${path}: invalid text`);
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

const galleryPaths=['en','zh'].flatMap(lang=>[...[undefined,...validationRecords].map(r=>({path:validationRoute(lang,r),record:r,lang})),...chapters.map(c=>({path:chapterRoute(lang,c),chapter:c,lang})),...helpContracts.topics.map(t=>({path:referenceRoute(lang,t),topic:t,lang})),...[undefined,...libraryCategories].map(category=>({path:libraryRoute(lang,category),library:true,category,lang}))]);
const manualHtml=new Map();
for(const entry of galleryPaths){
  const file=resolve(root,entry.path,'index.html');const html=await readFile(file,'utf8');
  manualHtml.set(entry.path+'index.html',html);
  assert(!/gaea|houdini|target\/|[A-Z]:\\/i.test(html),entry.path+': non-neutral/private text');
  assert(html.includes(`name="validation-bundle" content="${bundleIdentity}"`));
  assert(html.includes(`<html lang="${entry.lang==='en'?'en':'zh-CN'}">`));
  assert(html.includes(`rel="canonical" href="${site.url}${entry.path}"`));
  assert(sitemap.includes(`<loc>${site.url}${entry.path}</loc>`));
  for(const lang of ['en','zh'])assert(html.includes(`${site.url}${entry.library?libraryRoute(lang,entry.category):entry.topic?referenceRoute(lang,entry.topic):entry.chapter?chapterRoute(lang,entry.chapter):validationRoute(lang,entry.record)}`),'Missing same-version language alternate');
  const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);assert.equal(new Set(ids).size,ids.length);
  for(const m of html.matchAll(/<img\b([^>]+)>/g))assert(/\balt="[^"]*"/.test(m[1]),'Missing gallery alt');
  const refs=[...html.matchAll(/\b(?:src|href|poster|data-image)="([^"]+)"/g)].map(m=>m[1]);
  for(const m of html.matchAll(/\bsrcset="([^"]+)"/g))refs.push(...m[1].split(',').map(s=>s.trim().split(/\s+/)[0]));
  for(const ref of refs){
    if(/^(https?:|mailto:)/.test(ref))continue;
    if(ref.startsWith('#')){assert(ids.includes(ref.slice(1)),`${entry.path}: broken ${ref}`);continue;}
    let target=resolve(dirname(file),ref.split(/[?#]/)[0]);assert(target===root||target.startsWith(`${root}${sep}`),'Gallery path escapes package');
    if(ref.split(/[?#]/)[0].endsWith('/'))target=resolve(target,'index.html');
    assert((await stat(target)).size>0,`${entry.path}: missing ${ref}`);
    if(ref.includes('#')&&target.endsWith('.html'))assert((await readFile(target,'utf8')).includes(`id="${ref.split('#')[1]}"`),'Broken chapter deep link');
  }
}
for(const r of validationRecords){
  const text=JSON.stringify(r);assert(!/gaea|houdini|target\/|[A-Z]:\\/i.test(text),'Non-neutral public record');
  const d=r.evidence;assert(d.passed&&d.rerun===false);assert(d.observed_max_abs<=d.tolerance);
  if(r.group==='terrain'){
    assert.equal(d.cases.length,d.case_count);assert.equal(new Set(d.cases.map(c=>c.case_id)).size,d.case_count);
    assert.equal(Math.max(...d.cases.map(c=>c.observed_max_abs)),d.observed_max_abs);
    assert.deepEqual([...new Set(d.cases.map(c=>c.resolution))].sort((a,b)=>a-b),d.resolutions);
  }else{assert(d.observed_mean_abs<=d.mean_tolerance);assert.equal(d.landscape_resolution[0],1021);}
  assert.deepEqual(JSON.parse(await readFile(resolve(root,`validation/data/${r.id}.json`),'utf8')),d);
  for(const m of r.media)for(const v of m.variants){
    const bytes=await readFile(resolve(root,`assets/validation/${r.id}/${v.file}`));
    assert.equal(createHash('sha256').update(bytes).digest('hex'),v.sha256,'Imported media hash changed');
    assert.equal(bytes.subarray(8,12).toString(),'WEBP');assert(bytes.length<1_500_000,'Gallery image exceeds budget');
  }
}
const searchScript=await readFile(resolve(root,'manual-search-index.js'),'utf8');
// Protect the cross-host help contract: exact versions, full parameter identity and local targets.
assert.equal(new Set(helpTargets.topics.map(t=>`${t.id}@${t.operation_version}`)).size,helpTargets.topics.length);
for(const t of helpContracts.topics){
  assert(!/gaea|houdini|[A-Z]:[\\/]/i.test(JSON.stringify(t)));
  assert.equal(createHash('sha256').update(JSON.stringify(t.contract)).digest('hex'),t.contract_sha256);
  assert.equal(t.contract.version,t.operation_version);
  const prose=editorialCopy(t);
  if(prose){
    assert.deepEqual(Object.keys(prose.parameters).sort(),t.contract.parameters.map(p=>p.key).sort());
    assert(explanationsComplete(t),'Editorial entry must explain every parameter');
  }
  for(const lang of ['en','zh']){
    const html=await readFile(resolve(root,referenceRoute(lang,t),'index.html'),'utf8');
    for(const p of t.contract.parameters){
      if(prose)assert(prose.parameters[p.key][lang]);
      else assert(html.includes(lang==='zh'?'行为说明待补':'Behavioral explanation is pending'));
      const result=helpResolver.resolve(helpTargets,{topic:t.id,version:t.operation_version,lang:lang==='zh'?'zh-CN':'en',parameter:p.key});
      assert.equal(result.status,'resolved');assert.equal(result.path,referenceRoute(lang,t)+'index.html');
      assert.equal(result.fragment,parameterAnchor(p.key));assert(html.includes(`id="${result.fragment}"`));
    }
  }
  assert.equal(helpResolver.resolve(helpTargets,{topic:t.id,version:t.operation_version+100}).reason,'version-not-found');
  assert.equal(helpResolver.resolve(helpTargets,{topic:t.id,version:t.operation_version,parameter:'__missing__'}).reasons[0],'parameter-not-found');
  assert.equal(helpResolver.resolve(helpTargets,{topic:t.id,version:t.operation_version,lang:'fr'}).reasons[0],'language-fallback');
}
// Presentation assets are actual captured outputs, with separate source/master/
// derivative identities. Their existence never adds numerical acceptance.
for(const m of helpMedia.examples){
 assert(!/gaea|houdini|[A-Z]:[\\/]/i.test(JSON.stringify(m)));
 assert.equal(m.kind,'actual-result-render');assert.equal(m.backend,'CPU');
 assert.equal(m.text_overlay,false);assert.deepEqual(m.pixel_size,[1600,1000]);
 const t=helpContracts.topics.find(t=>t.id===m.id&&t.operation_version===m.operation_version);
 assert(t,'Media must bind an exact reference version');
 assert(m.variants.length>0);assert.equal(new Set(m.variants.map(v=>v.id)).size,m.variants.length);
 assert.deepEqual(JSON.parse(await readFile(resolve(root,`reference/data/${m.id}-v${m.operation_version}-media.json`),'utf8')),m);
 for(const variant of m.variants){
  assert.equal(createHash('sha256').update(JSON.stringify(variant.recipe)).digest('hex'),variant.recipe_sha256);
  assert.equal(variant.recipe.executable_author_document,false);
  assert(variant.recipe.nodes.some(n=>n.id===variant.recipe.target));
  for(const key of ['master_sha256','source_result_sha256'])assert(/^[a-f0-9]{64}$/.test(variant[key]));
  for(const d of variant.variants){
   const bytes=await readFile(resolve(root,`assets/validation/help/${m.slug}/${d.file}`));
   assert.equal(createHash('sha256').update(bytes).digest('hex'),d.sha256);
   assert.equal(bytes.subarray(8,12).toString(),'WEBP');assert(bytes.length<1_500_000);
  }
 }
}
assert.equal(helpResolver.resolve(helpTargets,{topic:'missing',version:1}).reason,'topic-not-found');
assert.equal(helpResolver.resolve(helpTargets,{topic:'node.edge',version:'1'}).status,'invalid-request');
assert.equal(helpResolver.resolve({...helpTargets,schema_version:99},{topic:'node.edge',version:1}).reason,'unsupported-manifest');
const legacyTargets={schema_version:1,topics:helpTargets.topics.filter(t=>t.kind==='reference').map(({kind,...t})=>t)};
assert.equal(helpResolver.resolve(legacyTargets,{topic:'node.edge',version:1,parameter:'Style'}).status,'resolved');
assert.equal(helpResolver.resolve({...helpTargets,topics:[null]},{topic:'node.edge',version:1}).reason,'invalid-manifest');
const duplicate={...helpTargets,topics:[...helpTargets.topics,helpTargets.topics[0]]};
assert.equal(helpResolver.resolve(duplicate,{topic:helpTargets.topics[0].id,version:helpTargets.topics[0].operation_version}).reason,'ambiguous-version');
const injected=structuredClone(helpTargets);injected.topics[0].paths.en='https://example.com/';
assert.equal(helpResolver.resolve(injected,{topic:injected.topics[0].id,version:injected.topics[0].operation_version}).reason,'invalid-target');
assert.equal(parameterAnchor('Style')===parameterAnchor('style'),false);
assert.equal(parameterAnchor('a-b')===parameterAnchor('a_b'),false);
assert.deepEqual(JSON.parse(await readFile(resolve(root,'help-targets.json'),'utf8')),helpTargets);
const search=JSON.parse(searchScript.slice('window.VESTA_MANUAL_INDEX = '.length).trim().replace(/;$/,''));
assert.equal(search.filter(p=>p.kind!=='catalog-entry').length,galleryPaths.length);
assert.equal(search.filter(p=>p.kind==='catalog-entry').length,nodeDirectory.nodes.length*2);
for(const page of search){
 assert(page.title&&page.body&&page.path.split('#')[0].endsWith('/index.html'));assert(!/gaea|houdini/i.test(JSON.stringify(page)));
 if(page.path.includes('#'))assert(manualHtml.get(page.path.split('#')[0])?.includes(`id="${page.path.split('#')[1]}"`));
}
assert.equal(new Set(nodeDirectory.nodes.map(n=>n.id)).size,nodeDirectory.nodes.length);
assert(!/gaea|houdini|[A-Z]:[\\/]/i.test(JSON.stringify(nodeDirectory)));
for(const n of nodeDirectory.nodes){
 assert(typeof n.cpu_registered==='boolean');
 const t=helpContracts.topics.find(t=>t.id===n.id&&t.operation_version===n.operation_version);
 for(const lang of ['en','zh']){
  const r=helpResolver.resolve(helpTargets,{topic:n.id,version:n.operation_version,lang:lang==='zh'?'zh-CN':'en'});
  if(t){assert.equal(r.status,'resolved');assert.equal(r.path,referenceRoute(lang,t)+'index.html');}
  else{assert.equal(r.status,'fallback');assert(r.reasons.includes('reference-not-written'));assert.equal(r.fragment,libraryAnchor(n));assert.equal(r.path,libraryRoute(lang,n.category)+'index.html');}
  assert(manualHtml.get(libraryRoute(lang,n.category)+'index.html').includes(`id="${libraryAnchor(n)}"`));
 }
}
const manual=JSON.parse(await readFile(resolve(root,'downloads/manual-manifest.json'),'utf8'));
assert.equal(manual.search_pages,galleryPaths.length);assert.equal(manual.search_entries,search.length);assert.equal(manual.requires_server,false);
assert.equal(manual.help_targets_sha256,createHash('sha256').update(await readFile(resolve(root,'help-targets.json'))).digest('hex'));
assert.equal(createHash('sha256').update(await readFile(resolve(root,'downloads/vesta-manual.zip'))).digest('hex'),manual.sha256);
console.log(`Bilingual parity, metadata, chapter links and ${checked.size} local media assets verified.`);
console.log(`${galleryPaths.length} neutral gallery pages, same-study alternates, dated evidence and media hashes verified.`);
console.log(`${chapters.length} capability chapters, local search corpus and downloadable offline manual verified.`);
console.log(`${helpContracts.topics.length} versioned references, ${nodeDirectory.nodes.length} catalog entries and contextual-help v1/v2 resolution verified.`);
