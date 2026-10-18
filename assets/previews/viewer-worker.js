// Trusted display adapter only. No author API, graph runtime or generation kernels.
let runtime, manifest, root, generation=0, loading;
const fail = code => { throw new Error(code); };
async function verified(file,expected,limit,signal){
 const url=new URL(file,root);if(url.origin!==root.origin||!url.pathname.startsWith(root.pathname)||/[?#]/.test(file))fail('asset_path_invalid');
 const response=await fetch(url,{signal});if(!response.ok)fail('asset_http_'+response.status);
 const declared=Number(response.headers.get('Content-Length'));if(declared>limit)fail('asset_too_large');
 const reader=response.body.getReader(),chunks=[];let length=0;
 for(;;){const {value,done}=await reader.read();if(done)break;length+=value.byteLength;if(length>limit){await reader.cancel();fail('asset_too_large');}chunks.push(value);}
 const joined=new Uint8Array(length);let offset=0;for(const chunk of chunks){joined.set(chunk,offset);offset+=chunk.byteLength;}
 const bytes=joined.buffer;
 const digest=Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',bytes)),b=>b.toString(16).padStart(2,'0')).join('');
 if(digest!==expected)fail('asset_hash_mismatch');return bytes;
}
self.onmessage=async ({data})=>{
 const id=data.generation;
 try{
  if(data.type==='init'){
   root=new URL(data.root);if(root.origin!==self.location.origin)fail('origin_invalid');
   const response=await fetch(new URL('manifest.json',root));if(!response.ok)fail('manifest_http');
   manifest=await response.json();if(manifest.schema_version!==1||!manifest.display_only||manifest.operation_kernels_included!==false)fail('manifest_invalid');
   const bytes=await verified(manifest.wasm.file,manifest.wasm.sha256,2_000_000);
   const compiled=await WebAssembly.compile(bytes);if(WebAssembly.Module.imports(compiled).length)fail('unexpected_wasm_imports');
   runtime=(await WebAssembly.instantiate(compiled,{})).exports;
   if(runtime.preview_version()!==1)fail('abi_mismatch');
   postMessage({type:'ready',manifest});
  }else if(data.type==='load'){
   generation=id;
   loading?.abort();loading=new AbortController();
   const model=manifest.models.find(m=>m.id===data.model),preset=model?.presets.find(p=>p.id===data.preset);if(!preset)fail('sample_missing');
   const bytes=await verified(preset.file,preset.sha256,40_000_000,loading.signal);if(id!==generation)return;
   const header=new DataView(bytes);if(header.getUint32(0,true)!==0x31525056||header.getUint32(4,true)!==1)fail('mesh_header_invalid');
   const vertices=header.getUint32(8,true),count=header.getUint32(12,true);
   if(!vertices||vertices>1_000_000||!count||count>6_000_000||count%3||16+vertices*12+count*4!==bytes.byteLength)fail('mesh_size_invalid');
   const positions=new Float32Array(bytes,16,vertices*3),indices=new Uint32Array(bytes,16+vertices*12,count);
   const pp=runtime.positions_allocate(positions.length),ip=runtime.indices_allocate(count);if(!pp||!ip)fail('allocation_rejected');
   new Float32Array(runtime.memory.buffer,pp,positions.length).set(positions);
   new Uint32Array(runtime.memory.buffer,ip,count).set(indices);
   if(!runtime.mesh_prepare())fail('mesh_rejected');
   const normals=new Float32Array(runtime.memory.buffer,runtime.normals_pointer(),positions.length).slice();
   const edges=new Uint32Array(runtime.memory.buffer,runtime.edges_pointer(),count*2).slice();
   postMessage({type:'mesh',generation:id,model:model.id,preset:preset.id,positions,indices,normals,edges},[bytes,normals.buffer,edges.buffer]);
  }else if(data.type==='camera'){
   if(id!==generation)return;
   const pointer=runtime.camera(...data.values);if(!pointer)fail('camera_rejected');
   const matrices=new Float32Array(runtime.memory.buffer,pointer,32).slice();
   postMessage({type:'camera',generation:id,revision:data.revision,matrices},[matrices.buffer]);
  }
 }catch(error){if(error.name!=='AbortError')postMessage({type:'error',generation:id,code:String(error.message??error)});}
};
