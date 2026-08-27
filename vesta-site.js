document.documentElement.classList.add("js");

const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
const mobileQuery = window.matchMedia("(max-width: 860px)");
const menuQuery = window.matchMedia("(max-width: 1180px)");
const reducedMotion = reducedMotionQuery.matches;

const revealItems = document.querySelectorAll("[data-reveal]:not(.is-visible)");
if (reducedMotion || !("IntersectionObserver" in window)) {
  revealItems.forEach((item) => item.classList.add("is-visible"));
} else {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { rootMargin: "0px 0px -8%", threshold: 0.12 },
  );
  revealItems.forEach((item) => revealObserver.observe(item));
}

const header = document.querySelector("[data-header]");
const progressBar = document.querySelector(".scroll-progress span");
let scrollFrame = 0;

const updateScrollState = () => {
  scrollFrame = 0;
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollable > 0 ? window.scrollY / scrollable : 0;
  if (progressBar) {
    progressBar.style.transform = `scaleX(${Math.min(1, Math.max(0, progress))})`;
  }
  header?.classList.toggle("is-scrolled", window.scrollY > 24);
};

const requestScrollUpdate = () => {
  if (scrollFrame) return;
  scrollFrame = window.requestAnimationFrame(updateScrollState);
};

updateScrollState();
window.addEventListener("scroll", requestScrollUpdate, { passive: true });
window.addEventListener("resize", requestScrollUpdate, { passive: true });

const menuToggle = document.querySelector("[data-menu-toggle]");
const nav = document.querySelector("[data-nav]");

const setMenuOpen = (open) => {
  document.body.classList.toggle("menu-open", open);
  menuToggle?.setAttribute("aria-expanded", String(open));
  if (menuToggle) {
    menuToggle.setAttribute(
      "aria-label",
      open ? menuToggle.dataset.closeLabel : menuToggle.dataset.openLabel,
    );
  }
};

menuToggle?.addEventListener("click", () => {
  setMenuOpen(menuToggle.getAttribute("aria-expanded") !== "true");
});

nav?.addEventListener("click", (event) => {
  if (event.target.closest("a")) setMenuOpen(false);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") setMenuOpen(false);
});

const closeDesktopMenu = (event) => {
  if (!event.matches) setMenuOpen(false);
};
menuQuery.addEventListener?.("change", closeDesktopMenu);

document.querySelectorAll(".locale-link").forEach((link) => {
  link.addEventListener("click", (event) => {
    const target = new URL(link.href, window.location.href);
    target.hash = window.location.hash;
    try {
      window.localStorage.setItem("vesta-locale", link.lang.startsWith("zh") ? "zh" : "en");
    } catch {
      // Language switching remains functional when storage is unavailable.
    }
    event.preventDefault();
    window.location.assign(target.href);
  });
});

const navLinks = [...document.querySelectorAll("[data-nav-link]")];
const observedSections = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

if ("IntersectionObserver" in window && observedSections.length) {
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      navLinks.forEach((link) => {
        const active = link.getAttribute("href") === `#${visible.target.id}`;
        link.classList.toggle("is-active", active);
        if (active) link.setAttribute("aria-current", "location");
        else link.removeAttribute("aria-current");
      });
    },
    { rootMargin: "-25% 0px -60%", threshold: [0, 0.25, 0.55] },
  );
  observedSections.forEach((section) => sectionObserver.observe(section));
}

const system = document.querySelector("[data-system]");
const systemSteps = [...document.querySelectorAll("[data-system-step]")];
const systemTracer = document.querySelector("[data-system-tracer]");
let systemTimer = 0;
let activeSystemStep = 0;

const showSystemStep = (index) => {
  activeSystemStep = index;
  systemSteps.forEach((step, stepIndex) => step.classList.toggle("is-active", stepIndex === index));
  if (!systemTracer || systemSteps.length < 2) return;
  const position = `${(index / (systemSteps.length - 1)) * 100}%`;
  if (mobileQuery.matches) {
    systemTracer.style.top = position;
    systemTracer.style.left = "50%";
  } else {
    systemTracer.style.left = position;
    systemTracer.style.top = "50%";
  }
};

const stopSystemCycle = () => {
  window.clearInterval(systemTimer);
  systemTimer = 0;
};

const startSystemCycle = () => {
  if (reducedMotion || systemTimer || systemSteps.length < 2) return;
  systemTimer = window.setInterval(() => {
    showSystemStep((activeSystemStep + 1) % systemSteps.length);
  }, 1550);
};

if (system && systemSteps.length) {
  showSystemStep(0);
  if (!reducedMotion && "IntersectionObserver" in window) {
    const systemObserver = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? startSystemCycle() : stopSystemCycle()),
      { threshold: 0.2 },
    );
    systemObserver.observe(system);
  }
  mobileQuery.addEventListener?.("change", () => showSystemStep(activeSystemStep));
}

const dataVisual = document.querySelector("[data-visual]");
if (dataVisual && !reducedMotion && window.matchMedia("(pointer: fine)").matches) {
  dataVisual.addEventListener("pointermove", (event) => {
    const bounds = dataVisual.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width) * 100;
    const y = ((event.clientY - bounds.top) / bounds.height) * 100;
    dataVisual.style.setProperty("--lens-x", `${Math.max(0, Math.min(100, x))}%`);
    dataVisual.style.setProperty("--lens-y", `${Math.max(0, Math.min(100, y))}%`);
  });
  dataVisual.addEventListener("pointerleave", () => {
    dataVisual.style.setProperty("--lens-x", "64%");
    dataVisual.style.setProperty("--lens-y", "40%");
  });
}
