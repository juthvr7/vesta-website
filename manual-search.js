// One local corpus serves online pages and extracted file:// manuals.
const manualInput=document.querySelector('[data-manual-search]');
const manualPanel=document.querySelector('.manual-search-results');
const manualBody=document.querySelector('.manual-document-body');
const manualRoot=document.querySelector('[data-manual-root]').dataset.manualRoot;
const normalize=s=>s.normalize('NFKC').toLocaleLowerCase();
function searchManual(){
 const query=manualInput.value.trim();
 document.body.classList.toggle('manual-search-active',!!query);
 manualPanel.hidden=!query;manualBody.hidden=!!query;
 const list=manualPanel.querySelector('ol');list.replaceChildren();
 if(!query)return;
 const terms=normalize(query).split(/\s+/).filter(Boolean);
 const matches=(window.VESTA_MANUAL_INDEX??[]).filter(p=>p.lang===document.documentElement.lang&&terms.every(t=>normalize(p.title+' '+p.body).includes(t))).sort((a,b)=>Number(terms.every(t=>normalize(b.title).includes(t)))-Number(terms.every(t=>normalize(a.title).includes(t))));
 const status=manualPanel.querySelector('[data-search-status]');status.textContent=matches.length?`${matches.length} / ${query}`:status.dataset.empty;
 for(const page of matches){
  const item=document.createElement('li'),link=document.createElement('a'),excerpt=document.createElement('p');
  link.textContent=page.title;link.href=new URL(manualRoot+page.path,document.baseURI).href;
  const at=normalize(page.body).indexOf(terms[0]),start=Math.max(0,at-45);
  excerpt.textContent=(start?'…':'')+page.body.slice(start,start+190)+'…';item.append(link,excerpt);list.append(item);
 }
}
manualInput.addEventListener('input',searchManual);
manualInput.addEventListener('keydown',event=>{if(event.key==='Escape'){manualInput.value='';searchManual();}});
document.querySelector('[data-clear-search]').addEventListener('click',()=>{manualInput.value='';searchManual();manualInput.focus();});
