// Contract-history and semantic-migration boundaries, not visual snapshots.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {applyContractSnapshots,contractHash} from '../content/help-contract-snapshots.mjs';
const read=name=>JSON.parse(fs.readFileSync(new URL('../content/help/'+name,import.meta.url),'utf8'));
const a=read('contracts.json'),b=read('implemented-contracts.json');
const base=[...a.topics,...b.topics.filter(t=>!a.topics.some(p=>p.id===t.id&&p.operation_version===t.operation_version))];
const manifest=read('contract-snapshots.json');
assert.deepEqual(applyContractSnapshots(base,{schema_version:1,snapshots:[]}).topics,base);
const actual=applyContractSnapshots(base,manifest);assert.equal(actual.archives.size,manifest.snapshots.length*2);
assert(manifest.snapshots.length,'preserve the first explicit documentation update');
const rejected=[];
function refusal(name,mutate){
 const changed=structuredClone(manifest);mutate(changed);
 assert.throws(()=>applyContractSnapshots(base,changed),undefined,name);rejected.push(name);
}
const first=m=>m.snapshots[0];
for(const [name,mutate] of [
 ['changed default',r=>r.replacement.contract.parameters[0].default.value=3.25],
 ['changed range',r=>r.replacement.contract.parameters[0].max=2],
 ['removed parameter',r=>r.replacement.contract.parameters.pop()],
 ['changed port identity',r=>r.replacement.contract.inputs[0].id=99],
 ['changed required input',r=>r.replacement.contract.inputs[0].required=false],
 ['changed parameter type',r=>r.replacement.contract.parameters[0].valueType='Text'],
])refusal(name,m=>{const r=first(m);mutate(r);r.replacement.contract_sha256=contractHash(r.replacement.contract);});
refusal('semantic field declared as presentation',m=>first(m).changes[0].field='default');
refusal('missing change declaration',m=>first(m).changes=[]);
refusal('stale predecessor',m=>first(m).previous_contract_sha256='0'.repeat(64));
refusal('wrong declared value',m=>first(m).changes[0].after='{ Automatic == 0 }');
refusal('wrong presentation field type',m=>{const r=first(m);r.changes[0].after=7;r.replacement.contract.parameters[0].hideWhen=7;r.replacement.contract_sha256=contractHash(r.replacement.contract);});
refusal('wrong exact version',m=>first(m).operation_version+=100);
refusal('case-sensitive parameter key',m=>first(m).changes[0].parameter='__missing__');
refusal('duplicate snapshot',m=>m.snapshots.push(structuredClone(first(m))));
refusal('escaped snapshot path',m=>first(m).id='../outside');
refusal('source branding',m=>first(m).summary.en='Gaea');
refusal('missing language',m=>delete first(m).summary.zh);
console.log(JSON.stringify({contract_snapshots:manifest.snapshots.length,unchanged_base_topics:base.length,archives:actual.archives.size,rejected}));
