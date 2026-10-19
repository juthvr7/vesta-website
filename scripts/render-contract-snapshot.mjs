// An explicit documentation edition, separate from the operation version.
const escape=s=>String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
export function contractSnapshotBody(lang,topic,base){
 const r=topic.contract_snapshot;if(!r)return '';
 const zh=lang==='zh';
 return `<aside class="reference-note"><strong>${zh?'文档展示快照':'Documentation snapshot'} · ${escape(r.id)}</strong><p>${escape(r.summary[lang])}</p><p><a href="${base}${r.record}">${zh?'本次变更记录':'Snapshot change record'} ↗</a> · <a href="${base}${r.previous}">${zh?'先前参考契约':'Previous reference contract'} ↗</a></p></aside>`;
}
