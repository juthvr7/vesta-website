const header=document.querySelector('.header');
const directory=document.querySelector('.framework-directory');
const compact=matchMedia('(max-width:760px)');
const syncDirectory=()=>{if(directory)directory.open=!compact.matches;};
compact.addEventListener('change',syncDirectory);syncDirectory();
const menu=document.querySelector('.menu-toggle');
const setMenu=open=>{header.classList.toggle('nav-open',open);menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?menu.dataset.closeLabel:menu.dataset.openLabel);};
menu.addEventListener('click',()=>setMenu(menu.getAttribute('aria-expanded')!=='true'));
header.querySelectorAll('nav a').forEach(a=>a.addEventListener('click',()=>setMenu(false)));
matchMedia('(min-width:761px)').addEventListener('change',e=>{if(e.matches)setMenu(false);});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&menu.getAttribute('aria-expanded')==='true'){setMenu(false);menu.focus();}});
const languages=[...document.querySelectorAll('[data-language-link]')];
function syncLanguage(){for(const a of languages){const u=new URL(a.href);u.hash=location.hash;a.href=u.href;}}
addEventListener('hashchange',syncLanguage);syncLanguage();

const dialog=document.querySelector('.lightbox');let opener;
document.querySelectorAll('[data-image]').forEach(button=>button.addEventListener('click',()=>{opener=button;const image=dialog.querySelector('img');image.src=button.dataset.image;image.alt=button.querySelector('img').alt;dialog.querySelector('p').textContent=button.dataset.caption;dialog.setAttribute('aria-label',button.getAttribute('aria-label'));dialog.showModal();}));
dialog.querySelector('.lightbox-close').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close();});dialog.addEventListener('close',()=>opener?.focus());
