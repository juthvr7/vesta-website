import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { locales } from "../content/site-content.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const siteUrl = "https://juthvr7.github.io/vesta-website/";
const checkOnly = process.argv.includes("--check");

const escapeHtml = (value) =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");

const e = escapeHtml;

function renderPage(localeKey, copy) {
  const isChinese = localeKey === "zh";
  const base = isChinese ? "../" : "./";
  const canonical = isChinese ? `${siteUrl}zh/` : siteUrl;
  const enHref = isChinese ? "../" : "./";
  const zhHref = isChinese ? "./" : "./zh/";
  const navItems = [
    ["system", copy.nav.system],
    ["data", copy.nav.data],
    ["studio", copy.nav.studio],
    ["roadmap", copy.nav.roadmap],
  ];

  const nav = navItems
    .map(([target, label]) => `<a href="#${target}" data-nav-link>${e(label)}</a>`)
    .join("");

  const heroSignals = copy.hero.signals
    .map(
      ([title, description], index) => `
            <article class="signal-card" data-reveal style="--delay: ${index * 70}ms">
              <span>0${index + 1}</span>
              <div><strong>${e(title)}</strong><small>${e(description)}</small></div>
            </article>`,
    )
    .join("");

  const heroFlow = copy.hero.flowSteps
    .map(
      (label, index) => `
              <div class="hero-flow-step${index === 0 ? " is-active" : ""}" data-hero-flow-step>
                <span>0${index + 1}</span><i></i><b>${e(label)}</b>
              </div>${index < copy.hero.flowSteps.length - 1 ? '<span class="hero-flow-link"><i></i></span>' : ""}`,
    )
    .join("");

  const thesisProof = copy.thesis.proof
    .map(
      ([title, description], index) => `
              <article data-reveal style="--delay: ${index * 80}ms">
                <span>0${index + 1}</span>
                <h3>${e(title)}</h3>
                <p>${e(description)}</p>
              </article>`,
    )
    .join("");

  const systemSteps = copy.system.steps
    .map(
      ([number, title, description], index) => `
              <article class="system-step" data-system-step="${index}" data-reveal style="--delay: ${index * 90}ms">
                <span class="step-number">${e(number)}</span>
                <div class="step-node" aria-hidden="true"><i></i></div>
                <h3>${e(title)}</h3>
                <p>${e(description)}</p>
              </article>`,
    )
    .join("");

  const systemRail = copy.system.rail
    .map((item, index) => `<span><i></i>${e(item)}<small>0${index + 1}</small></span>`)
    .join("");

  const dataTypes = copy.data.types
    .map(
      ([title, description], index) => `
              <article data-reveal style="--delay: ${index * 65}ms">
                <span>0${index + 1}</span>
                <div><h3>${e(title)}</h3><p>${e(description)}</p></div>
              </article>`,
    )
    .join("");

  const dataChips = copy.data.chips.map((chip) => `<span>${e(chip)}</span>`).join("");

  const studioFacts = copy.studio.facts
    .map(
      ([title, description], index) => `
              <article data-reveal style="--delay: ${index * 70}ms">
                <span>0${index + 1}</span><strong>${e(title)}</strong><p>${e(description)}</p>
              </article>`,
    )
    .join("");

  const domains = copy.composition.domains
    .map((domain) => `<span>${e(domain)}</span><i aria-hidden="true"></i>`)
    .join("");

  const hostChips = copy.architecture.hosts.map((host) => `<span>${e(host)}</span>`).join("");
  const coreChips = copy.architecture.core.map((item) => `<span>${e(item)}</span>`).join("");
  const backendChips = copy.architecture.backends
    .map(
      ([name, state], index) => `<span class="backend ${index === 0 ? "backend-active" : "backend-future"}"><i></i>${e(name)}<small>${e(state)}</small></span>`,
    )
    .join("");
  const resultChips = copy.architecture.results.map((item) => `<span>${e(item)}</span>`).join("");

  const roadmapStages = copy.roadmap.stages
    .map(
      ([state, title, description, status], index) => `
              <article class="roadmap-card roadmap-${e(status)}" data-reveal style="--delay: ${index * 85}ms">
                <div class="roadmap-index">0${index + 1}</div>
                <p class="roadmap-state"><i></i>${e(state)}</p>
                <h3>${e(title)}</h3>
                <p>${e(description)}</p>
              </article>`,
    )
    .join("");

  return `<!DOCTYPE html>
<html lang="${e(copy.htmlLang)}" data-locale="${localeKey}">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="theme-color" content="#080b0a">
    <meta name="description" content="${e(copy.description)}">
    <meta property="og:type" content="website">
    <meta property="og:locale" content="${e(copy.ogLocale)}">
    <meta property="og:url" content="${canonical}">
    <meta property="og:title" content="${e(copy.title)}">
    <meta property="og:description" content="${e(copy.description)}">
    <meta property="og:image" content="${siteUrl}og.png">
    <meta property="og:image:alt" content="${e(copy.title)}">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${e(copy.title)}">
    <meta name="twitter:description" content="${e(copy.description)}">
    <meta name="twitter:image" content="${siteUrl}og.png">
    <title>${e(copy.title)}</title>
    <link rel="canonical" href="${canonical}">
    <link rel="alternate" hreflang="en" href="${siteUrl}">
    <link rel="alternate" hreflang="zh-CN" href="${siteUrl}zh/">
    <link rel="alternate" hreflang="x-default" href="${siteUrl}">
    <link rel="preload" as="image" href="${base}assets/world-system.webp" fetchpriority="high">
    <link rel="stylesheet" href="${base}vesta-site.css">
    <script src="${base}vesta-site.js" defer></script>
  </head>
  <body>
    <a class="skip-link" href="#main">${isChinese ? "跳至主要内容" : "Skip to main content"}</a>
    <div class="scroll-progress" aria-hidden="true"><span></span></div>
    <div class="ambient-layer" aria-hidden="true"><i></i><i></i><i></i></div>

    <header class="site-header" data-header>
      <a class="brand" href="#top" aria-label="Vesta home">
        <span class="brand-mark" aria-hidden="true"><i></i><b>V</b></span>
        <span class="brand-name">Vesta</span>
      </a>
      <nav class="site-nav" aria-label="${isChinese ? "主要导航" : "Primary navigation"}" data-nav>
        ${nav}
      </nav>
      <div class="header-actions">
        <p class="build-label"><span></span>${e(copy.status)}</p>
        <div class="locale-switch" role="group" aria-label="${isChinese ? "语言" : "Language"}">
          <a class="locale-link" href="${enHref}" lang="en"${!isChinese ? ' aria-current="page"' : ""}>EN</a>
          <i aria-hidden="true"></i>
          <a class="locale-link" href="${zhHref}" lang="zh-CN"${isChinese ? ' aria-current="page"' : ""}>中文</a>
        </div>
        <button class="menu-toggle" type="button" aria-label="${e(copy.menuOpen)}" aria-expanded="false" data-open-label="${e(copy.menuOpen)}" data-close-label="${e(copy.menuClose)}" data-menu-toggle>
          <span></span><span></span>
        </button>
      </div>
    </header>

    <main id="main">
      <section class="hero" id="top" data-hero>
        <div class="hero-media" aria-hidden="true">
          <video poster="${base}assets/world-system.webp" autoplay muted loop playsinline preload="metadata" data-hero-video>
            <source src="${base}assets/vesta-worlds-loop.mp4" type="video/mp4">
          </video>
          <div class="hero-media-grid"></div>
          <div class="hero-media-scan"></div>
          <div class="hero-media-vignette"></div>
        </div>
        <div class="hero-copy">
          <p class="eyebrow hero-eyebrow" data-reveal><span>V / 01</span>${e(copy.hero.eyebrow)}</p>
          <h1 data-reveal style="--delay: 80ms">
            <span>${e(copy.hero.lineOne)}</span>
            <em>${e(copy.hero.lineTwo)}</em>
          </h1>
          <p class="hero-lede" data-reveal style="--delay: 150ms">${e(copy.hero.lede)}</p>
          <div class="hero-actions" data-reveal style="--delay: 220ms">
            <a class="button button-primary" href="#system">${e(copy.hero.primaryCta)}<span aria-hidden="true">↘</span></a>
            <a class="button button-quiet" href="#studio">${e(copy.hero.secondaryCta)}<span aria-hidden="true">→</span></a>
          </div>
        </div>
        <aside class="hero-proof" aria-label="${e(copy.hero.proofLabel)}" data-reveal style="--delay: 250ms">
          <div class="hero-proof-heading">
            <span><i></i>${e(copy.hero.flowLabel)}</span>
            <b>${e(copy.hero.flowState)}</b>
          </div>
          <div class="hero-proof-flow">${heroFlow}</div>
          <a class="hero-build-preview" href="#studio">
            <figure>
              <img src="${base}assets/studio-current.webp" alt="" width="1800" height="1125">
              <i aria-hidden="true"></i>
            </figure>
            <div>
              <span>${e(copy.hero.buildLabel)}</span>
              <strong>${e(copy.hero.buildTitle)}</strong>
              <small>${e(copy.hero.buildMeta)}</small>
            </div>
            <b aria-hidden="true">↘</b>
          </a>
        </aside>
        <div class="hero-visual-note" data-reveal style="--delay: 280ms">
          <span><i></i>${e(copy.hero.visualLabel)}</span>
          <button type="button" data-video-toggle data-label-pause="${e(copy.hero.videoPause)}" data-label-play="${e(copy.hero.videoPlay)}" aria-label="${e(copy.hero.videoPause)}">
            <i></i><b>${isChinese ? "动态" : "Motion"}</b>
          </button>
        </div>
        <div class="hero-signals">${heroSignals}</div>
      </section>

      <div class="signal-marquee" aria-hidden="true">
        <div>
          <span>GRAPH</span><i></i><span>GEOMETRY</span><i></i><span>HEIGHTFIELD</span><i></i><span>RASTER</span><i></i><span>CURVES</span><i></i><span>POINTS</span><i></i><span>COMPUTE</span><i></i><span>DELIVER</span><i></i>
          <span>GRAPH</span><i></i><span>GEOMETRY</span><i></i><span>HEIGHTFIELD</span><i></i><span>RASTER</span><i></i><span>CURVES</span><i></i><span>POINTS</span><i></i><span>COMPUTE</span><i></i><span>DELIVER</span><i></i>
        </div>
      </div>

      <section class="thesis section" id="vision">
        <p class="section-index" data-reveal>${e(copy.thesis.index)}</p>
        <div class="thesis-copy">
          <h2 data-reveal>${e(copy.thesis.title)}</h2>
          <p data-reveal>${e(copy.thesis.body)}</p>
        </div>
        <div class="thesis-proof">
          <p class="micro-label" data-reveal>${e(copy.thesis.proofLabel)}</p>
          <div>${thesisProof}</div>
        </div>
      </section>

      <section class="system section" id="system" data-system>
        <div class="section-heading">
          <div>
            <p class="eyebrow" data-reveal><span>02</span>${e(copy.system.eyebrow)}</p>
            <h2 data-reveal>${e(copy.system.title)}</h2>
          </div>
          <p data-reveal>${e(copy.system.intro)}</p>
        </div>
        <div class="system-stage">
          <div class="system-track" aria-hidden="true"><i data-system-tracer></i></div>
          <div class="system-steps">${systemSteps}</div>
          <div class="system-rail" data-reveal>${systemRail}</div>
        </div>
      </section>

      <section class="data-section section" id="data">
        <div class="data-layout">
          <div class="data-copy">
            <p class="eyebrow" data-reveal><span>03</span>${e(copy.data.eyebrow)}</p>
            <h2 data-reveal>${e(copy.data.title)}</h2>
            <p class="section-lede" data-reveal>${e(copy.data.body)}</p>
            <div class="data-type-list">${dataTypes}</div>
          </div>
          <figure class="data-visual" data-reveal data-visual>
            <img src="${base}assets/unified-data.webp" alt="${e(copy.data.imageAlt)}" loading="lazy" width="1920" height="819">
            <div class="data-lens" aria-hidden="true"></div>
            <figcaption><span><i></i>${e(copy.data.visualLabel)}</span><b>DATA / 001</b></figcaption>
          </figure>
        </div>
        <div class="data-chips" data-reveal>${dataChips}</div>
      </section>

      <section class="studio section" id="studio">
        <div class="section-heading">
          <div>
            <p class="eyebrow" data-reveal><span>04</span>${e(copy.studio.eyebrow)}</p>
            <h2 data-reveal>${e(copy.studio.title)}</h2>
          </div>
          <p data-reveal>${e(copy.studio.body)}</p>
        </div>
        <figure class="studio-window" data-reveal>
          <div class="window-bar" aria-hidden="true">
            <span><i></i><i></i><i></i></span>
            <b>VESTA STUDIO / DEVELOPMENT BUILD</b>
            <small>LOCAL CPU</small>
          </div>
          <div class="studio-screen">
            <img src="${base}assets/studio-current.webp" alt="${e(copy.studio.imageAlt)}" loading="lazy" width="1800" height="1125">
            <div class="studio-scanline" aria-hidden="true"></div>
          </div>
          <figcaption>
            <span><i></i>${e(copy.studio.captureLabel)}</span>
            <p>${e(copy.studio.captureNote)}</p>
          </figcaption>
        </figure>
        <div class="studio-facts">${studioFacts}</div>
      </section>

      <section class="composition" id="composition">
        <div class="composition-media">
          <img src="${base}assets/world-composition.webp" alt="${e(copy.composition.imageAlt)}" loading="lazy" width="1536" height="1024">
          <div class="composition-shade" aria-hidden="true"></div>
          <div class="composition-copy">
            <p class="eyebrow" data-reveal><span>05</span>${e(copy.composition.eyebrow)}</p>
            <h2 data-reveal>${e(copy.composition.title)}</h2>
            <p data-reveal>${e(copy.composition.body)}</p>
          </div>
          <p class="composition-label"><i></i>${e(copy.composition.visualLabel)}</p>
        </div>
        <div class="domain-marquee" aria-hidden="true"><div>${domains}${domains}</div></div>
      </section>

      <section class="architecture section" id="architecture">
        <div class="section-heading">
          <div>
            <p class="eyebrow" data-reveal><span>06</span>${e(copy.architecture.eyebrow)}</p>
            <h2 data-reveal>${e(copy.architecture.title)}</h2>
          </div>
          <p data-reveal>${e(copy.architecture.body)}</p>
        </div>
        <div class="architecture-map" data-reveal>
          <div class="architecture-grid" aria-hidden="true"></div>
          <div class="architecture-layer architecture-hosts">
            <p>${e(copy.architecture.hostsLabel)}</p><div>${hostChips}</div>
          </div>
          <div class="architecture-flow" aria-hidden="true"><i></i><span>INTENT</span></div>
          <div class="architecture-core">
            <div class="core-heading"><p>${e(copy.architecture.coreLabel)}</p><span>ENGINE INDEPENDENT</span></div>
            <div>${coreChips}</div>
          </div>
          <div class="architecture-flow" aria-hidden="true"><i></i><span>PLAN</span></div>
          <div class="architecture-bottom">
            <div class="architecture-layer architecture-backends"><p>${e(copy.architecture.backendLabel)}</p><div>${backendChips}</div></div>
            <div class="architecture-layer architecture-results"><p>${e(copy.architecture.resultLabel)}</p><div>${resultChips}</div></div>
          </div>
        </div>
      </section>

      <section class="roadmap section" id="roadmap">
        <div class="section-heading">
          <div>
            <p class="eyebrow" data-reveal><span>07</span>${e(copy.roadmap.eyebrow)}</p>
            <h2 data-reveal>${e(copy.roadmap.title)}</h2>
          </div>
          <p data-reveal>${e(copy.roadmap.body)}</p>
        </div>
        <div class="roadmap-grid">${roadmapStages}</div>
      </section>

      <section class="closing section" id="preview">
        <div class="closing-visual" aria-hidden="true"><i></i><i></i><i></i><span>V</span></div>
        <p class="eyebrow" data-reveal><span>08</span>${e(copy.closing.eyebrow)}</p>
        <h2 data-reveal><span>${e(copy.closing.titleOne)}</span><em>${e(copy.closing.titleTwo)}</em></h2>
        <p data-reveal>${e(copy.closing.body)}</p>
        <a class="button button-primary" href="#top" data-reveal>${e(copy.closing.backToTop)}<span aria-hidden="true">↑</span></a>
      </section>
    </main>

    <footer class="site-footer">
      <a class="brand" href="#top" aria-label="Vesta home">
        <span class="brand-mark" aria-hidden="true"><i></i><b>V</b></span><span class="brand-name">Vesta</span>
      </a>
      <p>${e(copy.footer.descriptor)}</p>
      <p>${e(copy.footer.state)}</p>
    </footer>
  </body>
</html>
`;
}

const outputs = [
  [resolve(root, "index.html"), renderPage("en", locales.en)],
  [resolve(root, "zh", "index.html"), renderPage("zh", locales.zh)],
];

for (const [path, rendered] of outputs) {
  if (checkOnly) {
    const existing = await readFile(path, "utf8");
    if (existing !== rendered) {
      throw new Error(`Generated page is stale: ${path}`);
    }
  } else {
    await mkdir(dirname(path), { recursive: true });
    await writeFile(path, rendered, "utf8");
  }
}

console.log(checkOnly ? "Generated pages are current." : "Rendered English and Chinese pages.");
