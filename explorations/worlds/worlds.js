const videos = [...document.querySelectorAll('video')];
const toggle = document.querySelector('.motion-toggle');
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
let paused = reduced.matches;
const syncButton = () => {
  toggle.setAttribute('aria-pressed', String(paused));
  toggle.innerHTML = paused ? '播放效果短片 <span aria-hidden="true">▷</span>' : '暂停所有短片 <span aria-hidden="true">Ⅱ</span>';
};
const visibility = new Map();
const playVisible = () => videos.forEach(video => {
  if (paused || !visibility.get(video) || document.hidden) video.pause();
  else video.play().catch(() => {});
});
new IntersectionObserver(entries => {
  entries.forEach(entry => visibility.set(entry.target, entry.isIntersecting));
  playVisible();
}, {threshold:.25}).observe(document.querySelector('.film-main video'));
const secondaryObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => visibility.set(entry.target, entry.isIntersecting));
  playVisible();
}, {threshold:.25});
videos.slice(1).forEach(video => secondaryObserver.observe(video));
toggle.addEventListener('click', () => {paused = !paused; syncButton(); playVisible();});
reduced.addEventListener('change', () => {paused = reduced.matches;syncButton();playVisible();});
document.addEventListener('visibilitychange', playVisible);
syncButton();

const lightbox = document.querySelector('.lightbox');
const close = document.querySelector('.lightbox-close');
let opener;
document.querySelectorAll('[data-image]').forEach(button => button.addEventListener('click', () => {
  opener = button;
  const image = lightbox.querySelector('img');
  image.src = button.dataset.image;
  image.alt = button.querySelector('img').alt;
  lightbox.querySelector('p').textContent = button.dataset.caption;
  lightbox.showModal();
}));
close.addEventListener('click', () => lightbox.close());
lightbox.addEventListener('click', event => {if(event.target===lightbox)lightbox.close();});
lightbox.addEventListener('close', () => opener?.focus());
