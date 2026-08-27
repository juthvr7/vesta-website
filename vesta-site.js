document.documentElement.classList.add("js");

const menuQuery = window.matchMedia("(max-width: 1180px)");

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
