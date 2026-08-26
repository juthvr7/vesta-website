document.documentElement.classList.add("js");

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const revealItems = document.querySelectorAll(".reveal:not(.is-visible)");

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

const progressBar = document.querySelector(".scroll-progress span");
const updateProgress = () => {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollable > 0 ? window.scrollY / scrollable : 0;
  progressBar.style.transform = `scaleX(${Math.min(1, Math.max(0, progress))})`;
};

updateProgress();
window.addEventListener("scroll", updateProgress, { passive: true });

if (!reducedMotion) {
  const tiltSurface = document.querySelector("[data-tilt-surface]");
  tiltSurface?.addEventListener("pointermove", (event) => {
    const bounds = tiltSurface.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    tiltSurface.style.setProperty("--pointer-x", `${x * 9}px`);
    tiltSurface.style.setProperty("--pointer-y", `${y * 9}px`);
  });

  tiltSurface?.addEventListener("pointerleave", () => {
    tiltSurface.style.setProperty("--pointer-x", "0px");
    tiltSurface.style.setProperty("--pointer-y", "0px");
  });
}
