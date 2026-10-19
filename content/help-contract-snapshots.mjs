// Documentation projection only. Never a runtime parameter registry.
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
export const contractHash=value=>createHash('sha256').update(JSON.stringify(value)).digest('hex');
export const presentationFields=new Set(['label','group','disableWhen','hideWhen','joinWithNext']);
const segment=s=>typeof s==='string'&&/^[a-z0-9]+(?:[-.][a-z0-9]+)*$/.test(s)&&!/gaea|houdini/i.test(s);
export const snapshotRoute=r=>`reference/snapshots/${r.topic}/v${r.operation_version}/${r.id}`;

export function applyContractSnapshots(original,manifest){
 assert.equal(manifest.schema_version,1,'unsupported help snapshot schema');
 assert(Array.isArray(manifest.snapshots),'invalid snapshot list');
 const topics=structuredClone(original),archives=new Map(),seen=new Set();
 for(const r of manifest.snapshots){
  assert(segment(r.id)&&segment(r.topic)&&Number.isSafeInteger(r.operation_version)&&r.operation_version>0,'invalid snapshot identity');
  const identity=`${r.topic}@${r.operation_version}/${r.id}`;
  assert(!seen.has(identity),'duplicate help snapshot');seen.add(identity);
  const at=topics.findIndex(t=>t.id===r.topic&&t.operation_version===r.operation_version);
  assert(at>=0,'unknown exact help version');
  const before=topics[at],after=r.replacement;
  assert.equal(contractHash(before.contract),before.contract_sha256,'invalid predecessor contract');
  assert.equal(r.previous_contract_sha256,before.contract_sha256,'stale help predecessor');
  assert.equal(after.id,before.id,'changed help identity');
  assert.equal(after.operation_version,before.operation_version,'changed operation version');
  assert.equal(after.contract_sha256,contractHash(after.contract),'invalid replacement hash');
  assert(/^[a-f0-9]{64}$/.test(after.catalog_snapshot_sha256),'invalid Catalog identity');
  const {contract:oldContract,contract_sha256:oldHash,catalog_snapshot_sha256:oldCatalog,contract_snapshot:oldSnapshot,...oldOuter}=before;
  const {contract:newContract,contract_sha256:newHash,catalog_snapshot_sha256:newCatalog,...newOuter}=after;
  assert.deepEqual(newOuter,oldOuter,'changed reference binding');
  assert(Array.isArray(r.changes)&&r.changes.length,'empty help update');
  assert(r.summary?.en?.trim()&&r.summary?.zh?.trim(),'missing bilingual snapshot reason');
  const authorized=structuredClone(oldContract),fields=new Set();
  for(const change of r.changes){
   assert(presentationFields.has(change.field),'semantic contract change requires a version migration');
   const key=`${change.parameter}:${change.field}`;
   assert(!fields.has(key),'duplicate changed field');fields.add(key);
   const parameter=authorized.parameters.find(p=>p.key===change.parameter);
   const replacement=newContract.parameters.find(p=>p.key===change.parameter);
   assert(parameter&&replacement,'unknown parameter key');
   assert.deepEqual(parameter[change.field],change.before,'stale parameter field');
   assert.deepEqual(replacement[change.field],change.after,'declared field differs from captured contract');
   assert.notDeepEqual(change.before,change.after,'unchanged parameter field');
   if(change.field==='joinWithNext')assert.equal(typeof change.after,'boolean','invalid presentation field type');
   else if(change.field==='hideWhen'||change.field==='disableWhen')assert(change.after===null||typeof change.after==='string','invalid presentation field type');
   else assert.equal(typeof change.after,'string','invalid presentation field type');
   parameter[change.field]=structuredClone(change.after);
  }
  assert.deepEqual(authorized,newContract,'undeclared contract change');
  assert(!/gaea|houdini|[A-Z]:[\\/]/i.test(JSON.stringify(r)),'private wording in public help snapshot');
  const route=snapshotRoute(r);
  archives.set(route+'-previous.json',before);
  archives.set(route+'.json',r);
  topics[at]={...after,contract_snapshot:{id:r.id,previous_contract_sha256:oldHash,summary:r.summary,record:route+'.json',previous:route+'-previous.json'}};
 }
 return {topics,archives};
}
