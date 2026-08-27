import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { locales } from "../content/site-content.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const siteUrl = "https://juthvr7.github.io/vesta-website/";
const assetVersion = "20260828-page-snap-v3";
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
    ["product", copy.nav.product],
    ["workflow", copy.nav.workflow],
    ["studio", copy.nav.studio],
    ["roadmap", copy.nav.roadmap],
  ];

  const nav = navItems
    .map(([target, label]) => `<a href="#${target}" data-nav-link>${e(label)}</a>`)
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
              <article class="system-step">
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

  const studioGallery = copy.studio.gallery
    .map(
      ([title, description, alt, image], index) => `
              <figure class="studio-detail-card" data-reveal style="--delay: ${index * 80}ms">
                <div class="studio-detail-media">
                  <img src="${base}assets/${e(image)}" alt="${e(alt)}" loading="lazy" width="1800" height="1125">
                </div>
                <figcaption>
                  <span>0${index + 1}</span>
                  <div><h3>${e(title)}</h3><p>${e(description)}</p></div>
                </figcaption>
              </figure>`,
    )
    .join("");

  const studioAvailable = copy.studio.available
    .map(
      ([title, description], index) => `
              <article>
                <span>0${index + 1}</span><div><strong>${e(title)}</strong><p>${e(description)}</p></div>
              </article>`,
    )
    .join("");

  const domains = copy.composition.domains
    .map((domain) => `<span>${e(domain)}</span><i aria-hidden="true"></i>`)
    .join("");
  const domainChips = copy.composition.domains.map((domain) => `<span>${e(domain)}</span>`).join("");

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
    <link rel="preload" as="image" href="${base}assets/world-composition.webp" fetchpriority="high">
    <link rel="stylesheet" href="${base}vesta-site.css?v=${assetVersion}">
    <script src="${base}vesta-site.js?v=${assetVersion}" defer></script>
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

    <main id="main" data-snap-root>
      <section class="hero snap-page" id="top" data-hero data-snap-page>
        <div class="hero-media" aria-hidden="true">
          <img class="hero-poster" src="${base}assets/world-composition.webp" alt="" width="1536" height="1024" fetchpriority="high">
          <div class="hero-media-vignette"></div>
        </div>
        <div class="hero-copy">
          <p class="eyebrow hero-eyebrow"><span>V / 01</span>${e(copy.hero.eyebrow)}</p>
          <h1>${e(copy.composition.title)}</h1>
          <p class="hero-lede">${e(copy.hero.lede)}</p>
        </div>
        <div class="hero-visual-note">
          <span><i></i>${e(copy.composition.visualLabel)}</span>
        </div>
      </section>

      <section class="domain-strip" aria-label="${isChinese ? "领域组合" : "Composable domains"}">
        <div class="domain-strip-track">
          <div class="domain-strip-set">${domains}</div>
          <div class="domain-strip-set" aria-hidden="true">${domains}</div>
        </div>
      </section>

      <section class="thesis section snap-page" id="product" data-snap-page>
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

      <section class="system section paged-section" aria-labelledby="workflow-title">
        <div class="snap-page system-overview-page" id="workflow" data-snap-page>
          <div class="section-heading">
            <div>
              <p class="eyebrow" data-reveal><span>02</span>${e(copy.system.eyebrow)}</p>
              <h2 id="workflow-title" data-reveal>${e(copy.system.title)}</h2>
            </div>
            <p data-reveal>${e(copy.system.intro)}</p>
          </div>
          <figure class="system-visual" data-reveal>
            <img src="${base}assets/graph-to-world.webp" alt="${e(copy.system.imageAlt)}" loading="lazy" width="1920" height="853">
            <figcaption><span><i></i>${e(copy.system.visualLabel)}</span><b>GRAPH / PLAN / WORLD</b></figcaption>
          </figure>
        </div>
        <div class="snap-page system-execution-page" data-snap-page>
          <div class="system-stage">
            <div class="system-track" aria-hidden="true"></div>
            <div class="system-steps">${systemSteps}</div>
            <div class="system-rail">${systemRail}</div>
          </div>
        </div>
      </section>

      <section class="data-section section paged-section" aria-labelledby="capabilities-title">
        <div class="snap-page data-model-page" id="capabilities" data-snap-page>
          <div class="data-layout">
            <div class="data-copy">
              <p class="eyebrow" data-reveal><span>03</span>${e(copy.data.eyebrow)}</p>
              <h2 id="capabilities-title" data-reveal>${e(copy.data.title)}</h2>
              <p class="section-lede" data-reveal>${e(copy.data.body)}</p>
              <div class="data-type-list">${dataTypes}</div>
            </div>
            <figure class="data-visual" data-reveal>
              <img src="${base}assets/unified-data.webp" alt="${e(copy.data.imageAlt)}" loading="lazy" width="1920" height="819">
              <figcaption><span><i></i>${e(copy.data.visualLabel)}</span><b>DATA / 001</b></figcaption>
            </figure>
          </div>
          <div class="data-chips" data-reveal>${dataChips}</div>
        </div>
        <div class="snap-page domain-bridge-page" data-snap-page>
          <div class="domain-bridge">
            <div class="domain-bridge-copy">
              <p class="eyebrow"><span>03 / B</span>${e(copy.composition.bridgeEyebrow)}</p>
              <h3>${e(copy.composition.bridgeTitle)}</h3>
              <p>${e(copy.composition.bridgeBody)}</p>
            </div>
            <div class="domain-chip-grid">${domainChips}</div>
          </div>
        </div>
      </section>

      <section class="studio section paged-section" aria-labelledby="studio-title">
        <div class="snap-page studio-overview-page" id="studio" data-snap-page>
          <div class="section-heading">
            <div>
              <p class="eyebrow" data-reveal><span>04</span>${e(copy.studio.eyebrow)}</p>
              <h2 id="studio-title" data-reveal>${e(copy.studio.title)}</h2>
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
            </div>
            <figcaption>
              <span><i></i>${e(copy.studio.captureLabel)}</span>
              <p>${e(copy.studio.captureNote)}</p>
            </figcaption>
          </figure>
        </div>
        <div class="snap-page studio-details-page" data-snap-page>
          <div class="studio-gallery">${studioGallery}</div>
          <div class="studio-facts">${studioFacts}</div>
        </div>
        <div class="snap-page available-page" data-snap-page>
          <div class="available-now">
            <div class="available-heading">
              <p class="eyebrow"><span>04 / B</span>${e(copy.studio.availableEyebrow)}</p>
              <h3>${e(copy.studio.availableTitle)}</h3>
              <p>${e(copy.studio.availableBody)}</p>
            </div>
            <div class="available-grid">${studioAvailable}</div>
          </div>
        </div>
      </section>

      <section class="future section paged-section" aria-labelledby="roadmap-title">
        <div class="snap-page architecture-page" id="roadmap" data-snap-page>
          <div class="section-heading">
            <div>
              <p class="eyebrow" data-reveal><span>05</span>${e(copy.architecture.eyebrow)}</p>
              <h2 id="roadmap-title" data-reveal>${e(copy.architecture.title)}</h2>
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
        </div>
        <div class="snap-page roadmap-page" data-snap-page>
          <div class="roadmap-block">
            <div class="section-heading">
              <div>
                <p class="eyebrow"><span>05 / B</span>${e(copy.roadmap.eyebrow)}</p>
                <h2>${e(copy.roadmap.title)}</h2>
              </div>
              <p>${e(copy.roadmap.body)}</p>
            </div>
            <div class="roadmap-grid">${roadmapStages}</div>
          </div>
        </div>
      </section>

      <section class="closing section snap-page" id="preview" data-snap-page>
        <div class="closing-visual" aria-hidden="true"><i></i><i></i><i></i><span>V</span></div>
        <p class="eyebrow"><span>VESTA</span>${e(copy.closing.eyebrow)}</p>
        <h2><span>${e(copy.closing.titleOne)}</span><em>${e(copy.closing.titleTwo)}</em></h2>
        <p>${e(copy.closing.body)}</p>
        <a class="button button-primary" href="#top">${e(copy.closing.backToTop)}<span aria-hidden="true">↑</span></a>
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
