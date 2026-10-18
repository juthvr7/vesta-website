import {readFile} from 'node:fs/promises';
import {site} from '../content/site-config.mjs';
import {validationUi, studies} from '../content/validation-content.mjs';
import {frameworkUi, chapters} from '../content/creation-framework.mjs';
import {helpContracts,helpTargets,referenceRoute} from '../content/help-model.mjs';
import {helpUi} from '../content/help/reference-copy.mjs';
import {referenceBody,helpEntry} from './render-help.mjs';
import {implementedReferenceBody,helpMedia} from './render-implemented-help.mjs';
import {referenceName,editorialCopy,explanationsComplete} from '../content/help/reference-status.mjs';
import {chapterHelpLinks} from '../content/help/chapter-links.mjs';
import {nodeDirectory,libraryRoute,libraryCategories,libraryUi,categoryName} from '../content/node-library.mjs';
import {libraryBody,librarySearchEntries} from './render-library.mjs';
import {explorerBody,explorerModel} from './render-explorer.mjs';

const imported=JSON.parse(await readFile(new URL('../content/validation/evidence.json',import.meta.url),'utf8'));
export const validationRecords=imported.records;
export const bundleIdentity=imported.bundle_sha256;
const e=x=>String(x).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#39;');
const route=(lang,record)=>`${lang==='zh'?'zh/':''}validation/${record?`${record.group}/${record.id}/`:''}`;
export const validationRoute=route;
export const chapterRoute=(lang,c)=>`${lang==='zh'?'zh/':''}validation/guide/${c.id}/`;
const imagePath=(base,record,id)=>`${base}assets/validation/${record.id}/${id}.webp`;
const number=x=>x===0?'0':x.toExponential(4);

function image(base,record,id,alt,{hero=false}={}) {
  const media=record.media.find(m=>m.id===id);
  if(!media)throw Error(`${record.id}: missing ${id} media`);
  const srcset=media.variants.map(v=>`${base}assets/validation/${record.id}/${v.file} ${v.width}w`).join(', ');
  return `<img src="${imagePath(base,record,id)}" srcset="${srcset}" sizes="(max-width:760px) 100vw, ${hero?'60vw':'48vw'}" alt="${e(alt)}" width="1600" height="1000" ${hero?'fetchpriority="high"':'loading="lazy"'} decoding="async">`;
}

function directory(lang,base,context) {
  const {record,chapter,helpTopic}=context;
  const isLibrary=context.kind==='library';
  const f=frameworkUi[lang];
  const helpNode=helpTopic?nodeDirectory.nodes.find(n=>n.id===helpTopic.id):null;
  const active=chapter?.id??(record?(record.group==='terrain'?'terrain':'engine-delivery'):helpNode?.section==='geometry'?'geometry-tools':helpNode?.section==='terrain'?'terrain':helpNode?.section==='data'?'execution':null);
  const labels=lang==='zh'?{edge:'地形收边',terraces:'岩层分层',fold:'波形重塑','soft-clip':'柔性高度控制','vda-unreal':'VDA → Unreal实证'}:{edge:'Terrain boundaries',terraces:'Layered slopes',fold:'Height waveforms','soft-clip':'Soft height control','vda-unreal':'VDA → Unreal study'};
  return `<aside class="framework-sidebar"><details class="framework-directory" open><summary>${f.directory}</summary><label class="manual-search-box"><span>${f.search}</span><input type="search" data-manual-search placeholder="${f.search}" aria-label="${f.search}" autocomplete="off"></label><nav aria-label="${f.directory}"><a class="framework-start" href="${base}${route(lang)}" ${!record&&!chapter&&!isLibrary&&!helpTopic?'aria-current="page"':''}>${f.overview}</a>${chapters.map((c,i)=>`<div class="framework-group ${active===c.id?'active-chapter':''}"><a class="chapter-link" href="${base}${chapterRoute(lang,c)}" ${chapter?.id===c.id?'aria-current="page"':''}><span>${String(i+1).padStart(2,'0')}</span>${c[lang].title}<small class="chapter-state">${f.states[c.state]}</small></a>${c.id==='terrain'?`<div class="framework-branches">${c[lang].sections.map(s=>`<a href="${base}${chapterRoute(lang,c)}#${s.id}">${s.title}</a>${s.id==='shape'?`<div class="framework-leaves">${c.studies.map(id=>{const r=validationRecords.find(r=>r.id===id);return `<a href="${base}${route(lang,r)}" ${!helpTopic&&record?.id===id?'aria-current="page"':''}>${labels[id]}</a>`;}).join('')}</div>`:''}`).join('')}</div>`:c.studies.length?`<div class="framework-leaves">${c.studies.map(id=>`<a href="${base}${route(lang,validationRecords.find(r=>r.id===id))}" ${!helpTopic&&record?.id===id?'aria-current="page"':''}>${labels[id]}</a>`).join('')}</div>`:''}</div>`).join('')}</nav><nav class="reference-directory" aria-label="${helpUi[lang].reference}"><p>${helpUi[lang].reference}</p><a href="${base}${libraryRoute(lang)}" ${isLibrary?'aria-current="page"':''}>${libraryUi[lang].title} <small>${nodeDirectory.nodes.length}</small></a><a href="${base}${libraryRoute(lang)}#implemented">${lang==='zh'?'已实现节点的参数参考':'Implemented node references'} <small>${helpContracts.topics.length}</small></a>${helpContracts.topics.filter(t=>t.study).map(t=>`<a href="${base}${referenceRoute(lang,t)}" ${helpTopic?.id===t.id&&helpTopic?.operation_version===t.operation_version?'aria-current="page"':''}>${e(referenceName(t))} <small>v${t.operation_version}</small></a>`).join('')}</nav><a class="manual-download" data-offline-download href="${base}downloads/vesta-manual.zip">${f.download} ↓<small>${f.downloadNote}</small></a></details></aside>`;
}

function frame(lang,context,body) {
  const {record,chapter,helpTopic}=context;
  const isLibrary=context.kind==='library';
  const u=validationUi[lang],s=record?studies[record.id][lang]:null;
  const f=frameworkUi[lang];
  const path=isLibrary?libraryRoute(lang,context.category):helpTopic?referenceRoute(lang,helpTopic):chapter?chapterRoute(lang,chapter):route(lang,record),base='../'.repeat(path.split('/').filter(Boolean).length);
  const title=`${isLibrary?(context.category?categoryName(lang,context.category):libraryUi[lang].title)+' · ':helpTopic?referenceName(helpTopic)+' · ':s?s.name+' · ':chapter?chapter[lang].title+' · ':''}${helpTopic?helpUi[lang].reference+' · ':''}${f.name} — Vesta`;
  const description=isLibrary?libraryUi[lang].intro:helpTopic?editorialCopy(helpTopic)?.purpose?.[lang]??helpUi[lang].scope:s?s.description:chapter?chapter[lang].intro:f.intro;
  const sample=helpTopic?helpMedia.examples.find(m=>m.id===helpTopic.id&&m.operation_version===helpTopic.operation_version):null;
  const shareImage=sample?`assets/validation/help/${sample.slug}/${sample.variants.at(-1).id}.webp`:`assets/validation/${record?.id??'edge'}/${record?studies[record.id].hero:'round'}.webp`;
  const localAlternate=l=>isLibrary?libraryRoute(l,context.category):helpTopic?referenceRoute(l,helpTopic):chapter?chapterRoute(l,chapter):route(l,record);
  const alternate=l=>`${site.url}${localAlternate(l)}`;
  const links=helpTopic?'':record?`<a href="#study">${u.study}</a><a href="#evidence">${u.evidence}</a>`:'';
  if(record&&!helpTopic){
    const topic=helpContracts.topics.filter(t=>t.study===record.id).sort((a,b)=>b.operation_version-a.operation_version)[0];
    if(topic){const original=body;body=base=>`<div class="reference-access wrap"><a href="${base}${referenceRoute(lang,topic)}">${helpUi[lang].openReference} · v${topic.operation_version} ↗</a></div>`+original(base);}
  }
  if(helpTopic&&explorerModel(helpTopic.id)){
    const original=body;
    const marker=`<section class="capability-section" id="examples"><h2>${helpUi[lang].examples}</h2>`;
    body=base=>original(base).replace(marker,marker+explorerBody(lang,helpTopic.id,base));
  }
  return `<!doctype html>
<html lang="${u.lang}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="theme-color" content="#101713"><meta name="description" content="${e(description)}"><title>${e(title)}</title>
<meta name="validation-bundle" content="${bundleIdentity}"><link rel="canonical" href="${site.url}${path}"><link rel="alternate" hreflang="en" href="${alternate('en')}"><link rel="alternate" hreflang="zh-CN" href="${alternate('zh')}"><link rel="alternate" hreflang="x-default" href="${alternate('en')}">
<meta property="og:type" content="website"><meta property="og:site_name" content="Vesta"><meta property="og:locale" content="${u.locale}"><meta property="og:title" content="${e(title)}"><meta property="og:description" content="${e(description)}"><meta property="og:url" content="${site.url}${path}"><meta property="og:image" content="${site.url}${shareImage}"><meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="${base}favicon.svg" type="image/svg+xml"><link rel="stylesheet" href="${base}vesta-site.css?v=${site.version}"><link rel="stylesheet" href="${base}validation.css?v=${site.version}"><script src="${base}validation.js?v=${site.version}" defer></script>${helpTopic&&explorerModel(helpTopic.id)?`<link rel="stylesheet" href="${base}explorer.css?v=${site.version}"><script type="module" src="${base}explorer.js?v=${site.version}"></script>`:""}<script src="${base}manual-search-index.js?v=${site.version}" defer></script><script src="${base}manual-search.js?v=${site.version}" data-manual-root="${base}" defer></script></head>
<body class="validation-page"><a class="skip" href="#main">${u.skip}</a>
<header class="header"><a class="logo" href="${base}${lang==='zh'?'zh/':''}" aria-label="Vesta">vesta<span>.</span></a><nav id="navigation" aria-label="${u.navigation}"><a href="${base}${lang==='zh'?'zh/':''}">${u.home}</a><a href="${base}${route(lang)}" ${!record&&!chapter&&!isLibrary&&!helpTopic?'aria-current="page"':''}>${f.name}</a>${links}</nav><div class="languages"><a href="${base}${localAlternate('en')}" data-language-link lang="en" ${lang==='en'?'aria-current="page"':''}>EN</a><span>/</span><a href="${base}${localAlternate('zh')}" data-language-link lang="zh-CN" ${lang==='zh'?'aria-current="page"':''}>中文</a></div><button class="menu-toggle" type="button" aria-controls="navigation" aria-expanded="false" aria-label="${u.menu}" data-open-label="${u.menu}" data-close-label="${u.close}">${u.menu} ☰</button></header>
<div class="framework-layout">${directory(lang,base,context)}<main class="framework-main" id="main"><section class="manual-search-results wrap" hidden><h1>${f.searchResults}</h1><button type="button" data-clear-search>${f.clearSearch}</button><p role="status" data-search-status data-empty="${f.noResults}"></p><ol></ol></section><div class="manual-document-body">${body(base)}</div></main></div>
<footer class="validation-footer"><div class="wrap"><a class="logo" href="${base}${lang==='zh'?'zh/':''}">vesta<span>.</span></a><div><p>${u.footer}</p><span>${u.footerNote}</span></div><a href="${base}${route(lang)}">${f.name} ↗</a></div></footer>
<dialog class="lightbox" aria-label="${u.study}"><button class="lightbox-close" type="button" aria-label="${u.close}">${u.close} ×</button><img alt=""><p></p></dialog></body></html>\n`;
}

function overview(lang) {
  const f=frameworkUi[lang];
  const flow=['agent-creation','terrain','world-systems','graph-assets','engine-delivery'];
  return frame(lang,{},base=>`<section class="framework-overview wrap"><p class="kicker">VESTA / ${f.name}</p><h1>${f.title}</h1><p class="framework-lead">${f.intro}</p><section class="creation-path"><h2>${f.process}</h2><ol>${flow.map((id,i)=>`<li><a href="${base}${chapterRoute(lang,chapters.find(c=>c.id===id))}"><span>${String(i+1).padStart(2,'0')}</span>${f.flow[i]}<i>↗</i></a></li>`).join('')}</ol></section><section class="chapter-catalog"><h2>${f.chapters}</h2><div class="chapter-cards">${chapters.map((c,i)=>`<a href="${base}${chapterRoute(lang,c)}"><p><span>${String(i+1).padStart(2,'0')}</span><small class="state-${c.state}">${f.states[c.state]}</small></p><h3>${c[lang].title}<i>↗</i></h3><p>${c[lang].summary}</p></a>`).join('')}</div></section></section>`);
}

function sectionReferences(lang,base,chapter,section){
 const aliases=chapterHelpLinks[chapter]?.[section]??[];
 if(!aliases.length)return '';
 const items=aliases.map(alias=>{const n=nodeDirectory.nodes.find(n=>n.cpu_registered&&n.search_alias===alias),t=helpContracts.topics.find(t=>t.id===n?.id&&t.operation_version===n.operation_version);if(!t)throw Error(`Missing editorial help link: ${alias}`);return t;});
 return `<div class="chapter-reference-links">${items.map(t=>`<a href="${base}${referenceRoute(lang,t)}"><strong>${e(referenceName(t))}</strong><small>v${t.operation_version} · ${explanationsComplete(t)?libraryUi[lang].explained:libraryUi[lang].reference} ↗</small></a>`).join('')}</div>`;
}
function chapterPage(lang,c) {
  const f=frameworkUi[lang],p=c[lang];
  return frame(lang,{chapter:c},base=>`<article class="capability-chapter wrap"><p class="chapter-breadcrumb"><a href="${base}${route(lang)}">${f.name}</a> / ${p.title}</p><p class="kicker state-${c.state}">${f.states[c.state]}</p><h1>${p.title}</h1><p class="framework-lead">${p.intro}</p><dl class="chapter-io"><div><dt>${f.inputs}</dt><dd>${p.input}</dd></div><div><dt>${f.outputs}</dt><dd>${p.output}</dd></div></dl>${c.state==='planned'?`<p class="planned-note">${f.plannedNote}</p>`:''}${c.librarySection?`<p><a class="text-link" href="${base}${libraryRoute(lang)}#section-${c.librarySection}">${libraryUi[lang].title} ↗</a></p>`:''}<nav class="chapter-toc" aria-label="${f.contents}">${p.sections.map(s=>`<a href="#${s.id}">${s.title}</a>`).join('')}</nav>${p.sections.map(s=>`<section class="capability-section" id="${s.id}"><h2>${s.title}</h2><p>${s.body}</p>${sectionReferences(lang,base,c.id,s.id)}${c.id==='terrain'&&s.id==='shape'?functionsInChapter(lang,base,c):''}</section>`).join('')}${c.studies.length&&c.id!=='terrain'?functionsInChapter(lang,base,c):''}<section class="chapter-next"><h2>${f.next}</h2><div>${chapters.filter(x=>x.id!==c.id).map(x=>`<a href="${base}${chapterRoute(lang,x)}">${x[lang].title} ↗</a>`).join('')}</div></section></article>`);
}

function functionsInChapter(lang,base,c){
  const f=frameworkUi[lang];
  return `<section class="chapter-functions"><h3>${f.studies}</h3><p>${f.studyNote}</p><div>${c.studies.map(id=>{const r=validationRecords.find(r=>r.id===id),s=studies[id][lang];return `<a href="${base}${route(lang,r)}"><span><strong>${s.name}</strong>${s.short}</span><small>${r.evidence.verified_at} ↗</small></a>`;}).join('')}</div></section>`;
}

function feature(lang,r) {
  const c=studies[r.id],s=c[lang],u=validationUi[lang],d=r.evidence,isWorkflow=r.group==='workflows';
  return frame(lang,{record:r},base=>{
    const publicData=`${base}validation/data/${r.id}.json`;
    const metrics=[[u.caseCount,String(d.case_count)],[u.resolution,d.resolutions.map(n=>`${n}²`).join(' / ')],[u.tolerance,number(d.tolerance)+(isWorkflow?' m':'')],[u.residual,number(d.observed_max_abs)+(isWorkflow?' m':'')]];
    if(isWorkflow)metrics.push([u.mean,number(d.observed_mean_abs)+' m'],[u.engineSamples,`${d.resolutions[0]}² → ${d.landscape_resolution[0]}²`],[u.engineParameters,String(d.published_parameters)]);
    const parent=chapters.find(c=>c.id===(isWorkflow?'engine-delivery':'terrain'));
    return `<section class="feature-hero wrap"><div class="feature-heading"><a class="breadcrumb" href="${base}${chapterRoute(lang,parent)}${isWorkflow?'':'#shape'}">${parent[lang].title} / ${isWorkflow?'VDA':parent[lang].sections.find(s=>s.id==='shape').title} / ${s.name}</a><p class="kicker">${r.group==='terrain'?u.terrain:u.workflows} / ${u.verified}</p><h1>${e(s.name)}</h1><h2>${e(s.title)}</h2><p>${e(s.description)}</p><div class="feature-tags"><span>${e(s.scope)}</span><span>${d.verified_at}</span></div><a class="text-link" href="#evidence">${u.proof} ↓</a></div><figure class="feature-art">${image(base,r,c.hero,s.short,{hero:true})}<figcaption>${u.render} · ${r.render.source_layout.shape[1]}²</figcaption></figure></section>
<div class="feature-sections wrap"><nav class="section-nav" aria-label="${u.navigation}"><a href="#study">01 / ${u.study}</a><a href="#evidence">02 / ${u.evidence}</a><a href="#limits">03 / ${u.limits}</a></nav><div class="feature-content">
<section id="study" class="result-study"><p class="kicker">01 / ${u.study}</p><h2>${u.variants}</h2><p class="section-lead">${e(s.use)}</p><div class="variant-grid">${c.variants.map(v=>`<figure><button class="image-button" type="button" data-image="${imagePath(base,r,v.id)}" data-caption="${e(v[lang]+(v.preset?' · '+v.preset:''))}" aria-label="${e(v[lang])}">${image(base,r,v.id,v[lang])}<span class="image-expand" aria-hidden="true">↗</span></button><figcaption><h3>${e(v[lang])}</h3>${v.preset?`<code>${e(v.preset)}</code>`:''}</figcaption></figure>`).join('')}</div><p class="media-note">${u.renderNote} ${isWorkflow?u.workflowNote:u.compareNote}</p></section>
${c.film?`<section class="study-film"><h2>${u.film}</h2><video src="${base}assets/worlds/terraces-orbit.mp4" poster="${base}assets/worlds/terraces.webp" controls muted loop playsinline preload="metadata" aria-label="${e(s.name)}"></video><p class="media-note">${u.filmNote}</p></section>`:''}
<section id="evidence" class="evidence-section"><p class="kicker">02 / ${u.technical}</p><h2>${u.evidence}</h2><p class="record-date">${u.historical} · ${d.verified_at}</p><dl class="evidence-grid">${metrics.map(([k,v])=>`<div><dt>${k}</dt><dd>${e(v)}</dd></div>`).join('')}</dl><details class="record-details"><summary>${u.proof}</summary><p>${u.backend}: ${isWorkflow?u.mixed:'CPU'} · ${u.date}: ${d.verified_at}</p>${!isWorkflow?`<p>${u.version}: ${d.operation_version} / ${d.implementation_version}</p>`:`<p>CPU → UE RHI → CPU · ${d.sample_count.toLocaleString('en-US')} samples</p>`}<p><a href="${publicData}">${u.download} ↗</a></p><p><a href="${base}validation/data/${r.id}-media.json">${u.treatment} ↗</a></p><code class="snapshot-id">${d.snapshot_id}</code></details></section>
<section id="limits" class="scope-section"><p class="kicker">03 / ${u.scope}</p><h2>${u.notes}</h2><ul>${s.limits.map(t=>`<li>${e(t)}</li>`).join('')}</ul></section>
</div></div><section class="related-studies"><div class="wrap"><h2>${u.related}</h2><div class="related-links">${validationRecords.filter(x=>x.id!==r.id).map(x=>`<a href="${base}${route(lang,x)}">${e(studies[x.id][lang].name)} <span>↗</span></a>`).join('')}</div></div></section>`;
  });
}

export function validationOutputs() {
  const outputs=new Map();
  for(const lang of ['en','zh']) {
    outputs.set(route(lang)+'index.html',overview(lang));
    for(const c of chapters)outputs.set(chapterRoute(lang,c)+'index.html',chapterPage(lang,c));
    for(const r of validationRecords)outputs.set(route(lang,r)+'index.html',feature(lang,r));
    for(const t of helpContracts.topics){
      const record=validationRecords.find(r=>r.id===t.study);
      outputs.set(referenceRoute(lang,t)+'index.html',frame(lang,{record,helpTopic:t},base=>t.study?referenceBody(lang,t,base):implementedReferenceBody(lang,t,base)));
    }
    for(const category of [undefined,...libraryCategories])outputs.set(libraryRoute(lang,category)+'index.html',frame(lang,{kind:'library',category},base=>libraryBody(lang,category,base)));
    outputs.set(`${lang==='zh'?'zh/':''}help/index.html`,helpEntry(lang));
  }
  outputs.set('help-targets.json',JSON.stringify(helpTargets,null,2)+'\n');
  outputs.set('reference/data/node-directory.json',JSON.stringify(nodeDirectory,null,2)+'\n');
  outputs.set('reference/data/help-coverage.json',JSON.stringify({schema_version:1,edition:helpContracts.edition,implementation_registration_is_acceptance:false,counts:{registered:nodeDirectory.nodes.length,contract_references:helpContracts.topics.length,behavior_explained:helpContracts.topics.filter(explanationsComplete).length,parameters:helpContracts.topics.reduce((n,t)=>n+t.contract.parameters.length,0)},topics:helpContracts.topics.map(t=>({id:t.id,operation_version:t.operation_version,name:referenceName(t),behavior_explained:explanationsComplete(t),media_available:Boolean(t.study||helpMedia.examples.some(m=>m.id===t.id&&m.operation_version===t.operation_version))}))},null,2)+'\n');
  outputs.set('help-targets.js',`window.VESTA_HELP_TARGETS = ${JSON.stringify(helpTargets).replaceAll('<','\\u003c')};\n`);
  for(const t of helpContracts.topics)outputs.set(`reference/data/${t.id}-v${t.operation_version}.json`,JSON.stringify(t,null,2)+'\n');
  for(const m of helpMedia.examples)outputs.set(`reference/data/${m.id}-v${m.operation_version}-media.json`,JSON.stringify(m,null,2)+'\n');
  for(const r of validationRecords) {
    outputs.set(`validation/data/${r.id}.json`,JSON.stringify(r.evidence,null,2)+'\n');
    outputs.set(`validation/data/${r.id}-media.json`,JSON.stringify({render:r.render,derivatives:r.media},null,2)+'\n');
  }
  const text=html=>html.replace(/<[^>]+>/g,' ').replace(/&(?:amp|lt|gt|quot|#39);/g,m=>({'&amp;':'&','&lt;':'<','&gt;':'>','&quot;':'"','&#39;':"'"}[m])).replace(/\s+/g,' ').trim();
  const corpus=[...outputs].filter(([p,h])=>p.endsWith('.html')&&h.includes('manual-document-body')).map(([path,html])=>{const body=html.match(/<div class="manual-document-body">([\s\S]*?)<\/main>/)?.[1]??'';return {path,lang:path.startsWith('zh/')?'zh-CN':'en',title:text(body.match(/<h1[^>]*>([\s\S]*?)<\/h1>/)?.[1]??''),body:[nodeDirectory.nodes.find(n=>path.includes('/reference/nodes/'+n.id+'/')||path.startsWith('reference/nodes/'+n.id+'/'))?.search_alias??'',text(body)].join(' ').trim()};});
  corpus.push(...librarySearchEntries());
  // Classic local script avoids file:// fetch/module restrictions in the offline edition.
  outputs.set('manual-search-index.js',`window.VESTA_MANUAL_INDEX = ${JSON.stringify(corpus).replaceAll('<','\\u003c')};\n`);
  return outputs;
}

export function validationSitemapEntries() {
  const urls=[undefined,...validationRecords].map(r=>l=>route(l,r)).concat(chapters.map(c=>l=>chapterRoute(l,c)),helpContracts.topics.map(t=>l=>referenceRoute(l,t)),[undefined,...libraryCategories].map(c=>l=>libraryRoute(l,c)));
  return urls.flatMap(url=>['en','zh'].map(lang=>`  <url><loc>${site.url}${url(lang)}</loc><lastmod>${site.updated}</lastmod><xhtml:link rel="alternate" hreflang="en" href="${site.url}${url('en')}"/><xhtml:link rel="alternate" hreflang="zh-CN" href="${site.url}${url('zh')}"/></url>`)).join('\n');
}
