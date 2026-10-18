// Cross-language display contract: bounded captured data, exact assets, no imports.
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {spawnSync} from 'node:child_process';
import {helpContracts} from '../content/help-model.mjs';
const root=new URL('../',import.meta.url),asset=new URL('assets/previews/',root);
for(const name of ['explorer.js','explorer-renderer.js','assets/previews/viewer-worker.js','scripts/render-explorer.mjs']){
 const check=spawnSync(process.execPath,['--input-type=module','--check'],{input:readFileSync(new URL(name,root),'utf8'),encoding:'utf8'});
 assert.equal(check.status,0,check.stderr);
}
const read=name=>readFileSync(new URL(name,asset));
const sha=b=>createHash('sha256').update(b).digest('hex');
const manifest=JSON.parse(read('manifest.json'));
assert.equal(manifest.schema_version,1);assert.equal(manifest.display_only,true);assert.equal(manifest.operation_kernels_included,false);
assert(!/gaea|houdini|[A-Z]:[\\/]/i.test(JSON.stringify(manifest)));
const wasm=read(manifest.wasm.file);assert.equal(sha(wasm),manifest.wasm.sha256);
const module=new WebAssembly.Module(wasm);assert.deepEqual(WebAssembly.Module.imports(module),[]);
const r=new WebAssembly.Instance(module,{}).exports;assert.equal(r.preview_version(),1);
assert.equal(r.positions_allocate(3_000_001),0);assert.equal(r.indices_allocate(6_000_001),0);
let count=0,total=0;
for(const model of manifest.models){
 const topic=helpContracts.topics.find(t=>t.id===model.topic&&t.operation_version===model.operation_version);assert(topic,'exact reference');
 for(const p of model.presets){
  assert.equal(p.precomputed,true);assert(/^[a-f0-9]{64}$/.test(p.source_result_sha256));assert(!p.file.includes('/'));
  const bytes=read(p.file);assert.equal(bytes.length,p.bytes);assert.equal(sha(bytes),p.sha256);
  const b=bytes.buffer.slice(bytes.byteOffset,bytes.byteOffset+bytes.byteLength),header=new DataView(b);
  assert.equal(header.getUint32(0,true),0x31525056);assert.equal(header.getUint32(4,true),1);
  const v=header.getUint32(8,true),n=header.getUint32(12,true);assert.equal(v,p.vertices);assert.equal(n,p.triangles*3);
  assert(v>0&&v<=1_000_000&&n>0&&n<=6_000_000&&n%3===0);assert.equal(bytes.length,16+v*12+n*4);
  const positions=new Float32Array(b,16,v*3),indices=new Uint32Array(b,16+v*12,n);
  const pp=r.positions_allocate(v*3),ip=r.indices_allocate(n);
  new Float32Array(r.memory.buffer,pp,v*3).set(positions);new Uint32Array(r.memory.buffer,ip,n).set(indices);
  assert.equal(r.mesh_prepare(),1);assert(new Float32Array(r.memory.buffer,r.normals_pointer(),v*3).every(Number.isFinite));
  const edge=new Uint32Array(r.memory.buffer,r.edges_pointer(),n*2);assert.equal(edge[0],indices[0]);assert.equal(edge[1],indices[1]);
  const mp=r.camera(1.4,.6,.4,4,1,1,1,0);assert(mp);assert(new Float32Array(r.memory.buffer,mp,32).every(Number.isFinite));
  // Malformed indices must be rejected at the actual WASM boundary.
  new Uint32Array(r.memory.buffer,ip,n)[0]=v;assert.equal(r.mesh_prepare(),0);
  total+=bytes.length;count++;
 }
 for(const lang of ['','zh/']){
  const html=readFileSync(new URL(`${lang}reference/nodes/${model.topic}/v${model.operation_version}/index.html`,root),'utf8');
  assert(html.includes(`data-explorer="${model.id}"`));assert(html.includes('id="interactive"'));
 }
}
assert.equal(r.camera(0,0,0,0,1,1,1,0),0);
assert.equal(manifest.models.length,6);assert.equal(count,9);
console.log(`Display WASM ABI, ${manifest.models.length} models / ${count} captured presets, ${total} data bytes and exact reference links verified.`);
