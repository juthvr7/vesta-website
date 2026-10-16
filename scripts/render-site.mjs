import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { locales } from "../content/site-content.mjs";
import { site } from "../content/site-config.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const checkOnly = process.argv.includes("--check");
const e = value => String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#39;");
const lines = values => values.map(e).join("<br>");
const title = values => `${e(values[0])}<br><span>${e(values[1])}</span>`;

function renderPage(lang, c) {
  const base = lang === "zh" ? "../" : "./";
  const media = `${base}${site.media}`;
  const canonical = `${site.url}${lang === "zh" ? "zh/" : ""}`;
  const image = (name, alt, {hero = false} = {}) => `<img src="${media}${name}.webp" srcset="${media}${name}-768.webp 768w, ${media}${name}-1280.webp 1280w, ${media}${name}.webp 1672w" sizes="${hero ? "100vw" : "(max-width:760px) 100vw, 55vw"}" alt="${e(alt)}" width="1672" height="941" ${hero ? 'class="hero-image" fetchpriority="high"' : 'loading="lazy" decoding="async"'}>`;
  const imageButton = (name, alt, label, caption, img) => `<button class="image-button" type="button" data-image="${media}${name}.webp" data-caption="${e(caption)}" aria-label="${e(label)}">${img}<span class="image-expand" aria-hidden="true">↗</span></button>`;
  const nav = ["vision", "motion", "unreal", "agent", "progress"].map((id, i) => `<a href="#${id}">${e(c.nav[i])}</a>`).join("");
  return `<!doctype html>
<html lang="${c.htmlLang}">
<head>
  <meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="theme-color" content="#101713"><meta name="description" content="${e(c.description)}">
  <title>${e(c.title)}</title>
  <link rel="canonical" href="${canonical}">
  <link rel="alternate" hreflang="en" href="${site.url}"><link rel="alternate" hreflang="zh-CN" href="${site.url}zh/"><link rel="alternate" hreflang="x-default" href="${site.url}">
  <meta property="og:type" content="website"><meta property="og:site_name" content="Vesta"><meta property="og:locale" content="${c.ogLocale}"><meta property="og:title" content="${e(c.title)}"><meta property="og:description" content="${e(c.description)}"><meta property="og:url" content="${canonical}"><meta property="og:image" content="${site.url}og.png"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="675"><meta name="twitter:card" content="summary_large_image">
  <link rel="icon" href="${base}favicon.svg" type="image/svg+xml">
  <link rel="stylesheet" href="${base}vesta-site.css?v=${site.version}"><script src="${base}vesta-site.js?v=${site.version}" defer></script>
</head>
<body>
  <a class="skip" href="#main">${e(c.skip)}</a>
  <header class="header"><a class="logo" href="#top" aria-label="${e(c.home)}">vesta<span>.</span></a><nav id="navigation" aria-label="${e(c.navLabel)}">${nav}</nav><div class="languages" aria-label="${e(c.languages)}"><a href="${base}" lang="en" hreflang="en" data-language-link ${lang === "en" ? 'aria-current="page"' : ''}>EN</a><span aria-hidden="true">/</span><a href="${base}zh/" lang="zh-CN" hreflang="zh-CN" data-language-link ${lang === "zh" ? 'aria-current="page"' : ''}>中文</a></div><a class="header-cta" href="#motion">${e(c.headerCta)} <span aria-hidden="true">↘</span></a><button class="menu-toggle" type="button" aria-controls="navigation" aria-expanded="false" aria-label="${e(c.menuOpen)}" data-open-label="${e(c.menuOpen)}" data-close-label="${e(c.menuClose)}">${e(c.menu)} <span aria-hidden="true">☰</span></button></header>
  <main id="main">
    <section class="hero" id="top" aria-labelledby="hero-title">
      ${image("world-hero", c.hero.alt, {hero:true})}<div class="hero-shade"></div>
      <div class="hero-copy"><p class="kicker"><i></i>${e(c.hero.kicker)}</p><h1 id="hero-title">${e(c.hero.first)}<br>${e(c.hero.second)}<span>${e(c.hero.emphasis)}</span></h1><p class="hero-description">${lines(c.hero.description)}</p><a class="round-link" href="#vision"><span class="round-arrow" aria-hidden="true">↗</span><span>${e(c.hero.cta)}<small>${e(c.hero.ctaDetail)}</small></span></a></div>
      <div class="hero-side"><span>${e(c.hero.study)}</span><p>${lines(c.hero.story)}</p></div><div class="hero-bottom"><p>${e(c.hero.principle)}</p><a href="#vision">${e(c.hero.scroll)} <span aria-hidden="true">↓</span></a><span>${e(c.hero.concept)}</span></div>
    </section>
    <section class="vision section" id="vision" aria-labelledby="vision-title"><div class="wrap"><p class="kicker"><span>01</span>${e(c.vision.kicker)}</p><div class="section-head"><h2 id="vision-title">${title(c.vision.title)}</h2><p>${e(c.vision.body)}</p></div></div>
      <div class="world-gallery">${c.vision.gallery.map(g => `<figure class="gallery-${g.id}">${imageButton(`world-${g.id}`, g.alt, g.open, g.caption, image(`world-${g.id}`, g.alt))}<figcaption><span>${e(g.category)}</span><h3>${e(g.title)}</h3><p>${e(g.body)}</p><small>${e(g.note)}</small></figcaption></figure>`).join("")}</div>
      <div class="wrap vision-line"><span>${e(c.vision.bridge)}</span><p>TERRAIN <i>→</i> ENVIRONMENTS <i>→</i> WORLDS</p></div>
    </section>
    <section class="motion section" id="motion" aria-labelledby="motion-title"><div class="wrap"><p class="kicker"><span>02</span>${e(c.motion.kicker)}</p><div class="section-head"><h2 id="motion-title">${title(c.motion.title)}</h2><div><p>${lines(c.motion.body)}</p><button class="motion-toggle" type="button" aria-pressed="false" data-play-label="${e(c.motion.play)}" data-pause-label="${e(c.motion.pause)}"><span class="toggle-label">${e(c.motion.pause)}</span><span class="toggle-symbol" aria-hidden="true">Ⅱ</span></button></div></div>
      <div class="film-grid"><figure class="film-main"><div class="film-frame"><video poster="${media}terraces.webp" muted loop playsinline controls preload="metadata" aria-label="${e(c.motion.mainLabel)}"><source src="${media}shape-study-tall.mp4" media="(max-width:760px)" type="video/mp4"><source src="${media}shape-study.mp4" type="video/mp4"></video><span class="film-stamp">VESTA / RESULT STUDY 001</span><div class="film-labels" aria-hidden="true"><span>RIDGE</span><span>TERRACES</span></div></div><figcaption><div><span>${e(c.motion.titleCategory)}</span><h3>${e(c.motion.mainTitle)}</h3></div><p>${lines(c.motion.outputLabel)}</p></figcaption></figure><div class="film-secondary">${["ridge", "terraces"].map(name => `<figure><div class="film-frame"><video src="${media}${name}-orbit.mp4" poster="${media}${name}.webp" muted loop playsinline controls preload="metadata" aria-label="${e(c.motion[`${name}Label`])}"></video></div><figcaption><span>${name.toUpperCase()}</span><p>${e(c.motion[`${name}Caption`])}</p></figcaption></figure>`).join("")}</div></div>
      <div class="result-note"><p><i></i>${e(c.motion.note)}</p><details><summary>${e(c.motion.sourceToggle)}</summary><p>${e(c.motion.sourceBody)} <a href="${media}provenance.json">${e(c.motion.sourceLink)} ↗</a></p></details></div>
    </div></section>
    <section class="unreal section" id="unreal" aria-labelledby="unreal-title"><div class="wrap"><p class="kicker"><span>03</span>${e(c.unreal.kicker)}</p><div class="section-head"><h2 id="unreal-title">${title(c.unreal.title)}</h2><p>${e(c.unreal.body)}</p></div><figure class="unreal-capture">${imageButton("unreal-vda", c.unreal.alt, c.unreal.open, c.unreal.caption, `<img src="${media}unreal-vda.webp" alt="${e(c.unreal.alt)}" width="1632" height="1107" loading="lazy" decoding="async">`)}<figcaption><span class="live-dot"></span>${e(c.unreal.caption)}<span class="capture-tag">EROSION2 / VDA → UE</span></figcaption></figure><div class="engine-steps">${c.unreal.steps.map(s => `<article><span>${e(s[0])}</span><h3>${e(s[1])}</h3></article>`).join("")}</div><p class="engine-note">${e(c.unreal.note)}</p></div></section>
    <section class="agent section" id="agent" aria-labelledby="agent-title"><div class="wrap"><p class="kicker"><span>04</span>${e(c.agent.kicker)}</p><div class="agent-heading"><h2 id="agent-title">${title(c.agent.title)}</h2><p>${e(c.agent.body)}</p></div><div class="creation-flow">${c.agent.steps.map(s => `<article><span>${e(s[0])}</span><h3>${e(s[1])}</h3><p>${e(s[2])}</p></article>`).join("")}</div><div class="builder-direction"><div><p class="kicker">${e(c.agent.environment)}</p><h3>World Builder<span>${e(c.agent.builderTitle)}</span></h3><p>${e(c.agent.builderBody)}</p></div><div class="orbit-map" role="img" aria-label="${e(c.agent.mapLabel)}">${c.agent.orbit.map((s,i) => `<span class="orbit-label orbit-${"abcd"[i]}">${e(s)}</span>`).join("")}<div class="orbit-core"><span>AGENT</span><small>${e(c.agent.orbitCore)}</small></div></div></div><p class="studio-transition">${e(c.agent.transition)}</p></div></section>
    <section class="process section"><div class="wrap"><div class="section-head"><h2>${title(c.process.title)}</h2><p>${lines(c.process.body)}</p></div><figure class="process-capture"><img src="${media}studio.webp" alt="${e(c.process.alt)}" width="1800" height="1125" loading="lazy" decoding="async"><figcaption><span>${e(c.process.caption)}</span><p>${e(c.process.note)}</p></figcaption></figure></div></section>
    <section class="progress section" id="progress" aria-labelledby="progress-title"><div class="wrap"><p class="kicker"><span>05</span>${e(c.progress.kicker)}</p><div class="section-head"><h2 id="progress-title">${title(c.progress.title)}</h2><p>${lines(c.progress.body)}</p></div><div class="progress-grid">${c.progress.stages.map(s => `<article><span class="state"><i class="${s.style}"></i>${e(s.state)}</span><h3>${e(s.title)}</h3><ul>${s.items.map(t => `<li>${e(t)}</li>`).join("")}</ul></article>`).join("")}</div><p class="progress-footnote">${e(c.progress.note)}</p></div></section>
    <section class="outro"><div class="wrap"><p>${e(c.closing.intro)}</p><h2>${e(c.closing.first)}<br><em>${e(c.closing.second)}</em></h2><a class="round-link" href="#progress"><span class="round-arrow" aria-hidden="true">↗</span><span>${e(c.closing.cta)}<small>${e(c.closing.detail)}</small></span></a><footer class="outro-bottom"><a class="logo" href="#top" aria-label="${e(c.home)}">vesta<span>.</span></a><span>${e(c.footer.state)}</span><a href="#top">${e(c.footer.top)} ↑</a><span>${e(c.footer.copyright)}</span></footer></div></section>
  </main>
  <dialog class="lightbox" aria-label="${e(c.unreal.open)}"><button class="lightbox-close" type="button" aria-label="${e(c.lightboxClose)}">${e(c.lightboxClose)} <span aria-hidden="true">×</span></button><img alt=""><p></p></dialog>
</body>
</html>
`;
}

const outputs = new Map(Object.entries(locales).map(([lang, copy]) => [lang === "zh" ? "zh/index.html" : "index.html", renderPage(lang, copy)]));
outputs.set("sitemap.xml", `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${["", "zh/"].map(path => `  <url><loc>${site.url}${path}</loc><lastmod>${site.updated}</lastmod><xhtml:link rel="alternate" hreflang="en" href="${site.url}"/><xhtml:link rel="alternate" hreflang="zh-CN" href="${site.url}zh/"/><xhtml:link rel="alternate" hreflang="x-default" href="${site.url}"/></url>`).join("\n")}\n</urlset>\n`);
for (const [path, contents] of outputs) {
  const destination = resolve(root, path);
  if (checkOnly) {
    if (await readFile(destination, "utf8") !== contents) throw new Error(`${path} is stale; run npm run render`);
  } else {
    await mkdir(dirname(destination), {recursive: true});
    await writeFile(destination, contents, "utf8");
  }
}
console.log(checkOnly ? "Generated bilingual pages are current." : "Rendered English and Chinese pages.");
