const comparison = document.querySelector('.comparison');
const range = document.querySelector('.compare-range');
range.addEventListener('input', () => {
  comparison.style.setProperty('--split', `${range.value}%`);
  range.setAttribute('aria-valuetext', `对比位置 ${range.value}%`);
});

const menu = document.querySelector('.menu-button');
const navigation = document.getElementById('navigation');
const closeMenu = () => {
  menu.setAttribute('aria-expanded', 'false');
  navigation.classList.remove('is-open');
};
menu.addEventListener('click', () => {
  const open = menu.getAttribute('aria-expanded') !== 'true';
  menu.setAttribute('aria-expanded', String(open));
  navigation.classList.toggle('is-open', open);
});
navigation.addEventListener('click', (event) => {
  if (event.target.closest('a')) closeMenu();
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') {
    closeMenu();
    menu.focus();
  }
});
window.matchMedia('(max-width: 760px)').addEventListener('change', closeMenu);

const tabs = [...document.querySelectorAll('[role="tab"]')];
const activate = (selected) => {
  for (const tab of tabs) {
    const active = tab === selected;
    tab.setAttribute('aria-selected', String(active));
    tab.tabIndex = active ? 0 : -1;
    document.getElementById(tab.getAttribute('aria-controls')).hidden = !active;
  }
};
tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => activate(tab));
  tab.addEventListener('keydown', (event) => {
    let next;
    if (['ArrowDown', 'ArrowRight'].includes(event.key)) next = (index + 1) % tabs.length;
    if (['ArrowUp', 'ArrowLeft'].includes(event.key)) next = (index + tabs.length - 1) % tabs.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = tabs.length - 1;
    if (next === undefined) return;
    event.preventDefault();
    activate(tabs[next]);
    tabs[next].focus();
  });
});
const mobileTabs = window.matchMedia('(max-width: 760px)');
const setOrientation = () => document.querySelector('[role="tablist"]').setAttribute('aria-orientation', mobileTabs.matches ? 'horizontal' : 'vertical');
setOrientation();
mobileTabs.addEventListener('change', setOrientation);
