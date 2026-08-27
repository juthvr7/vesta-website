document.documentElement.classList.add("js");

const menuQuery = window.matchMedia("(max-width: 1180px)");
const snapViewportQuery = window.matchMedia("(min-width: 861px)");
const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
const MAGNETIC_WHEEL_THRESHOLD = 42;
const MAGNETIC_LOCK_MS = 640;

let magneticWheelTotal = 0;
let magneticWheelResetTimer = 0;
let magneticUnlockTimer = 0;
let magneticLocked = false;
let magneticLockUntil = 0;

const magneticScrollEnabled = () =>
  snapViewportQuery.matches && !reducedMotionQuery.matches;

const updateMagneticScroll = () => {
  document.documentElement.classList.toggle(
    "magnetic-scroll",
    magneticScrollEnabled(),
  );
  magneticWheelTotal = 0;
};

const buildMagneticStops = () => {
  const maxScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
  const anchors = [...document.querySelectorAll("[data-snap-page]")]
    .map((page) =>
      Math.min(maxScroll, Math.max(0, page.getBoundingClientRect().top + window.scrollY)),
    )
    .filter((position, index, positions) => index === 0 || position > positions[index - 1] + 4);
  if (!anchors.length || anchors[0] > 4) anchors.unshift(0);
  if (maxScroll > anchors.at(-1) + 4) anchors.push(maxScroll);
  return anchors;
};

const nestedScrollerCanMove = (target, delta) => {
  let element = target instanceof Element ? target : null;
  while (element && element !== document.body) {
    const style = window.getComputedStyle(element);
    const scrollable = /(auto|scroll|overlay)/.test(style.overflowY);
    if (scrollable && element.scrollHeight > element.clientHeight + 1) {
      if (delta > 0 && element.scrollTop + element.clientHeight < element.scrollHeight - 1) return true;
      if (delta < 0 && element.scrollTop > 1) return true;
    }
    element = element.parentElement;
  }
  return false;
};

const scheduleMagneticUnlock = () => {
  window.clearTimeout(magneticUnlockTimer);
  const wait = Math.max(160, magneticLockUntil - performance.now());
  magneticUnlockTimer = window.setTimeout(() => {
    if (performance.now() < magneticLockUntil) {
      scheduleMagneticUnlock();
      return;
    }
    magneticLocked = false;
    document.documentElement.classList.remove("is-magnetic-scrolling");
  }, wait);
};

const handleMagneticWheel = (event) => {
  if (
    !magneticScrollEnabled() ||
    event.defaultPrevented ||
    event.ctrlKey ||
    event.metaKey ||
    Math.abs(event.deltaX) > Math.abs(event.deltaY)
  ) {
    return;
  }

  const modeScale = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? window.innerHeight : 1;
  const delta = event.deltaY * modeScale;
  if (!delta || nestedScrollerCanMove(event.target, delta)) return;

  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  if ((delta < 0 && window.scrollY <= 1) || (delta > 0 && window.scrollY >= maxScroll - 1)) return;

  event.preventDefault();

  if (magneticLocked) {
    scheduleMagneticUnlock();
    return;
  }

  if (Math.sign(magneticWheelTotal) !== Math.sign(delta)) magneticWheelTotal = 0;
  magneticWheelTotal += delta;

  window.clearTimeout(magneticWheelResetTimer);
  magneticWheelResetTimer = window.setTimeout(() => {
    magneticWheelTotal = 0;
  }, 150);

  if (Math.abs(magneticWheelTotal) < MAGNETIC_WHEEL_THRESHOLD) return;

  const direction = Math.sign(magneticWheelTotal);
  const current = window.scrollY;
  const tolerance = Math.max(18, window.innerHeight * 0.025);
  const stops = buildMagneticStops();
  const target = direction > 0
    ? stops.find((position) => position > current + tolerance)
    : [...stops].reverse().find((position) => position < current - tolerance);

  magneticWheelTotal = 0;
  if (target === undefined) return;

  magneticLocked = true;
  magneticLockUntil = performance.now() + MAGNETIC_LOCK_MS;
  document.documentElement.classList.add("is-magnetic-scrolling");
  window.scrollTo({ top: target, behavior: "smooth" });
  scheduleMagneticUnlock();
};

updateMagneticScroll();
snapViewportQuery.addEventListener?.("change", updateMagneticScroll);
reducedMotionQuery.addEventListener?.("change", updateMagneticScroll);
window.addEventListener("wheel", handleMagneticWheel, { passive: false });

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
    const activePage = [...document.querySelectorAll("[data-snap-page][id]")]
      .map((page) => ({
        page,
        distance: Math.abs(page.getBoundingClientRect().top),
      }))
      .sort((a, b) => a.distance - b.distance)[0]?.page;
    target.hash = activePage?.id ? `#${activePage.id}` : window.location.hash;
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
