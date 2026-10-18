import {readFileSync} from 'node:fs';
import {nodeDirectory,libraryRoute,libraryAnchor} from './node-library.mjs';
import {createHash} from 'node:crypto';
const original=JSON.parse(readFileSync(new URL('./help/contracts.json',import.meta.url),'utf8'));
const implemented=JSON.parse(readFileSync(new URL('./help/implemented-contracts.json',import.meta.url),'utf8'));
// Preserve already published contracts byte-for-byte, including their identity.
export const helpContracts={schema_version:1,edition:implemented.edition,topics:[...original.topics,...implemented.topics.filter(t=>!original.topics.some(p=>p.id===t.id&&p.operation_version===t.operation_version))]};
export const referenceRoute=(lang,t)=>`${lang==='zh'?'zh/':''}reference/nodes/${t.id}/v${t.operation_version}/`;
// Full case-sensitive UTF-8 key avoids collisions from punctuation/case folding.
export const parameterAnchor=key=>'parameter-'+Buffer.from(key,'utf8').toString('hex');
export const helpTargets={
 schema_version:2,edition:helpContracts.edition,
 directory_sha256:createHash('sha256').update(JSON.stringify(nodeDirectory)).digest('hex'),
 topics:[...helpContracts.topics.map(t=>({kind:'reference',id:t.id,operation_version:t.operation_version,contract_sha256:t.contract_sha256,paths:{en:referenceRoute('en',t)+'index.html','zh-CN':referenceRoute('zh',t)+'index.html'},parameters:Object.fromEntries(t.contract.parameters.map(p=>[p.key,parameterAnchor(p.key)]))})),...nodeDirectory.nodes.filter(n=>!helpContracts.topics.some(t=>t.id===n.id&&t.operation_version===n.operation_version)).map(n=>({kind:'catalog-entry',id:n.id,operation_version:n.operation_version,paths:{en:libraryRoute('en',n.category)+'index.html','zh-CN':libraryRoute('zh',n.category)+'index.html'},fragment:libraryAnchor(n),parameters:{}}))]
};
