// Only package-owned relative targets may be opened. No Graph/native execution.
const helpQuery=new URLSearchParams(location.search);
const helpRequest={topic:helpQuery.get('topic'),version:/^[1-9][0-9]*$/.test(helpQuery.get('version')??'')?Number(helpQuery.get('version')):null,lang:helpQuery.get('lang')??document.documentElement.lang};
if(helpQuery.has('parameter'))helpRequest.parameter=helpQuery.get('parameter');
const helpResult=VestaHelp.resolve(window.VESTA_HELP_TARGETS,helpRequest);
const helpLanguage=helpRequest.lang==='zh-CN'?'zh-CN':'en';
const helpCopy=helpLanguage==='zh-CN'?{title:'打开上下文帮助',continue:'打开匹配的参考页 →',home:'浏览手册 ↗',resolved:'正在打开参考页…',fallback:'请求未完全匹配，请检查下面的回退说明。',failed:'此手册没有匹配的帮助页。请核对节点版本或浏览目录。',reasons:{'version-not-found':'请求的节点版本未收录，未替换为其他版本。','topic-not-found':'此节点帮助未收录。','language-fallback':'请求语言未收录，使用英文。','parameter-not-found':'此参数未收录，可打开同版本节点参考。'}}:{title:'Open contextual help',continue:'Open the matching reference →',home:'Browse the manual ↗',resolved:'Opening the reference…',fallback:'The request needs an explicit fallback. Review the details below.',failed:'No matching help is included. Check the operation version or browse the manual.',reasons:{'version-not-found':'The requested operation version is not included. No other version was substituted.','topic-not-found':'This help topic is not included.','language-fallback':'The requested language is unavailable; English is offered.','parameter-not-found':'The parameter is unavailable; the same node version is offered.'}};
document.documentElement.lang=helpLanguage;document.title=helpCopy.title+' — Vesta';
helpCopy.reasons['reference-not-written']=helpLanguage==='zh-CN'?'此节点的完整说明尚未编写，可查看同版本的目录登记项。':'The full reference has not been written. The matching Catalog entry is offered.';
document.querySelector('h1').textContent=helpCopy.title;
const helpHome=new URL(document.querySelector('[data-help-root]').dataset.helpRoot+(helpLanguage==='zh-CN'?'zh/':'')+'validation/index.html',location.href);
document.querySelector('.logo').href=helpHome.href;
const helpHomeLink=document.querySelector('[data-help-home]');helpHomeLink.href=helpHome.href;helpHomeLink.textContent=helpCopy.home;
document.querySelector('[data-help-status]').textContent=helpResult.status==='resolved'?helpCopy.resolved:helpResult.status==='fallback'?helpCopy.fallback:helpCopy.failed;
document.querySelector('[data-help-reasons]').textContent=helpCopy.reasons[helpResult.reason]??'';
if(helpResult.path){
 const target=new URL(document.querySelector('[data-help-root]').dataset.helpRoot+helpResult.path,location.href);target.hash=helpResult.fragment;
 const link=document.querySelector('[data-help-target]');link.href=target.href;link.textContent=helpResult.reasons.includes('reference-not-written')?(helpLanguage==='zh-CN'?'查看目录登记项 →':'View the Catalog entry →'):helpCopy.continue;link.hidden=false;
 document.querySelector('[data-help-reasons]').textContent=(helpResult.reasons??[]).map(r=>helpCopy.reasons[r]).join(' ');
 if(helpResult.status==='resolved')location.replace(target.href);
}
