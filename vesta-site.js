const header = document.querySelector('.header');
const menu = document.querySelector('.menu-toggle');
function setMenu(open) {
  header.classList.toggle('nav-open', open);
  menu.setAttribute('aria-expanded', String(open));
  menu.setAttribute('aria-label', open ? menu.dataset.closeLabel : menu.dataset.openLabel);
}
menu.addEventListener('click', () => setMenu(menu.getAttribute('aria-expanded') !== 'true'));
header.querySelectorAll('nav a').forEach(link => link.addEventListener('click', () => setMenu(false)));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') {setMenu(false); menu.focus();}
});
window.matchMedia('(min-width:761px)').addEventListener('change', event => {if (event.matches) setMenu(false);});

// Keep the reader in the same chapter when changing languages; both routes work without JS.
const languageLinks = [...document.querySelectorAll('[data-language-link]')];
const syncLanguages = () => languageLinks.forEach(link => {
  const url = new URL(link.href);
  url.hash = window.location.hash;
  link.href = url.href;
});
window.addEventListener('hashchange', syncLanguages);
syncLanguages();

const videos = [...document.querySelectorAll('video')];
const toggle = document.querySelector('.motion-toggle');
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
let paused = reduced.matches;
const syncButton = () => {
  toggle.setAttribute('aria-pressed', String(paused));
  toggle.querySelector('.toggle-label').textContent = paused ? toggle.dataset.playLabel : toggle.dataset.pauseLabel;
  toggle.querySelector('.toggle-symbol').textContent = paused ? '▷' : 'Ⅱ';
};
const visibility = new Map();
const playVisible = () => videos.forEach(video => {
  if (paused || !visibility.get(video) || document.hidden) video.pause();
  else video.play().catch(() => {});
});
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => visibility.set(entry.target, entry.isIntersecting && entry.intersectionRatio >= .25));
  playVisible();
}, {threshold:[0, .25]});
videos.forEach(video => observer.observe(video));
toggle.addEventListener('click', () => {paused = !paused; syncButton(); playVisible();});
reduced.addEventListener('change', () => {paused = reduced.matches; syncButton(); playVisible();});
document.addEventListener('visibilitychange', playVisible);
syncButton();

const lightbox = document.querySelector('.lightbox');
let opener;
document.querySelectorAll('[data-image]').forEach(button => button.addEventListener('click', () => {
  opener = button;
  const image = lightbox.querySelector('img');
  image.src = button.dataset.image;
  image.alt = button.querySelector('img').alt;
  lightbox.setAttribute('aria-label', button.getAttribute('aria-label'));
  lightbox.querySelector('p').textContent = button.dataset.caption;
  lightbox.showModal();
}));
document.querySelector('.lightbox-close').addEventListener('click', () => lightbox.close());
lightbox.addEventListener('click', event => {if (event.target === lightbox) lightbox.close();});
lightbox.addEventListener('close', () => opener?.focus());
