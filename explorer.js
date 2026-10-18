import {ResultRenderer} from './explorer-renderer.js';

for(const host of document.querySelectorAll('[data-explorer]')){
 const zh=host.dataset.lang==='zh',q=s=>host.querySelector(s),canvas=q('canvas'),stage=q('.explorer-stage'),status=q('[role=status]');
 const modelSelect=q('[data-model]'),presetSelect=q('[data-preset]'),start=q('[data-start]');
 let worker,renderer,manifest,model,preset,loaded=false,generation=0,revision=0,scheduled=false,startedAt,timeout;
 let state;
 const resetState=()=>{state={yaw:.65,pitch:.38,distance:3.8,sx:1,sy:1,sz:1,rotation:0,clip:1.5,light:-.75,water:0,wire:false,normals:false,contours:false,terrain:false,low:0,high:1};};resetState();
 const say=(text,error=false)=>{status.textContent=text;status.classList.toggle('explorer-error',error);};
 function close(){
  generation++;revision++;clearTimeout(timeout);worker?.terminate();worker=null;renderer?.destroy();renderer=null;loaded=false;
  canvas.hidden=true;q('.explorer-start').hidden=false;q('.explorer-panel').hidden=true;q('.explorer-gesture').hidden=true;
  start.disabled=false;start.textContent=zh?'启动交互预览 ↗':'Explore in 3D ↗';
 }
 function error(code){close();say((zh?'交互预览暂不可用，仍可查看下方静态效果图。原因：':'Preview unavailable; the images below remain available. Reason: ')+code,true);}
 function camera(){
  if(!worker||!loaded||scheduled)return;scheduled=true;
  requestAnimationFrame(()=>{scheduled=false;if(!worker||!loaded)return;const b=canvas.getBoundingClientRect();
   if(b.width<=0||b.height<=0)return;
   const aspect=b.width/b.height,distance=Math.min(20,state.distance*(aspect<1?1.3/aspect:1));
   worker.postMessage({type:'camera',generation,revision:++revision,values:[aspect,state.yaw,state.pitch,distance,state.sx,state.sy,state.sz,state.rotation]});});
 }
 const definitions=[
  ['sx',zh?'显示缩放 X':'Display scale X',.2,2,.01,1,false],['sy',zh?'显示缩放 Y':'Display scale Y',.2,2,.01,1,false],['sz',zh?'显示缩放 Z':'Display scale Z',.2,2,.01,1,false],
  ['rotation',zh?'模型旋转':'Model rotation',-180,180,1,0,false],['clip',zh?'X 轴截面':'Section along X',-1.4,1.5,.01,1.5,false],['light',zh?'光源方位':'Light direction',-180,180,1,-43,false],
  ['water',zh?'显示水位':'Display water level',0,.9,.01,0,true],
 ];
 for(const [key,label,min,max,step,value,terrain] of definitions){
  const field=document.createElement('div');field.className='explorer-control';if(terrain)field.dataset.terrain='';
  const title=document.createElement('label'),text=document.createElement('span'),out=document.createElement('output'),input=document.createElement('input');
  const id='display-'+host.dataset.explorer+'-'+key;text.textContent=label;title.htmlFor=id;out.textContent=String(value);title.append(text,out);
  Object.assign(input,{type:'range',min,max,step,value,id});input.dataset.control=key;input.setAttribute('aria-label',label);
  input.addEventListener('input',()=>{out.textContent=input.value;state[key]=Number(input.value)*(key==='rotation'||key==='light'?Math.PI/180:1);camera();});
  field.append(title,input);q('.explorer-controls').append(field);
 }
 function syncControls(){
  for(const [key,,,,,value,terrain] of definitions){const input=q(`[data-control=${key}]`);input.value=value;input.previousElementSibling.querySelector('output').textContent=String(value);if(terrain)input.parentElement.hidden=!state.terrain;}
  for(const key of ['wire','normals','contours'])q('[data-'+key+']').checked=false;
  for(const el of host.querySelectorAll('[data-terrain]'))el.hidden=!state.terrain;
 }
 function selectModel(id){
  model=manifest.models.find(m=>m.id===id)??manifest.models[0];modelSelect.value=model.id;
  presetSelect.replaceChildren(...model.presets.map(p=>new Option(p.name[zh?'zh':'en'],p.id)));
  resetState();state.terrain=model.kind==='terrain';if(state.terrain){state.pitch=.62;state.distance=3.6;}
  syncControls();
  const lang=zh?'zh/':'';q('[data-reference]').href=new URL('../../'+lang+'reference/nodes/'+model.topic+'/v'+model.operation_version+'/#examples',new URL(host.dataset.assets,location.href));
  loadPreset();
 }
 function loadPreset(){
  preset=model.presets.find(p=>p.id===presetSelect.value)??model.presets[0];presetSelect.value=preset.id;
  state.low=preset.bounds[0][1];state.high=preset.bounds[1][1];loaded=false;startedAt=performance.now();generation++;revision++;
  say(zh?'正在加载真实结果并由 WASM 准备显示…':'Loading captured result; WASM is preparing the display…');
  clearTimeout(timeout);timeout=setTimeout(()=>error('load_timeout'),25000);
  worker.postMessage({type:'load',generation,model:model.id,preset:preset.id});
 }
 start.addEventListener('click',()=>{
  if(location.protocol==='file:'){say(zh?'请通过官网打开交互预览；离线图片仍可使用。':'Open this reference online for the explorer; offline images remain available.',true);return;}
  try{
   start.disabled=true;start.textContent=zh?'准备查看器…':'Preparing viewer…';
   canvas.hidden=false;renderer=new ResultRenderer(canvas);q('.explorer-start').hidden=true;
   worker=new Worker(new URL('viewer-worker.js',new URL(host.dataset.assets,location.href)));
   const current=worker;
   worker.onerror=()=>{if(worker===current)error('worker_failed');};
   worker.onmessage=({data})=>{
    if(worker!==current)return;
    if(data.type==='ready'){
     clearTimeout(timeout);manifest=data.manifest;q('.explorer-panel').hidden=false;q('.explorer-gesture').hidden=false;
     modelSelect.replaceChildren(...manifest.models.map(m=>new Option(m.name,m.id)));selectModel(modelSelect.value===host.dataset.explorer?modelSelect.value:host.dataset.explorer);
    }else if(data.type==='mesh'&&data.generation===generation){
     clearTimeout(timeout);renderer.upload(data);loaded=true;camera();
     const grid=preset.display.display_grid?.join(' × '),detail=grid?` · ${zh?'显示网格':'display grid'} ${grid}`:'';
     say(`${model.name} · ${preset.vertices.toLocaleString()} ${zh?'顶点':'vertices'} · ${preset.triangles.toLocaleString()} ${zh?'三角形':'triangles'}${detail} · WASM ${(performance.now()-startedAt).toFixed(0)} ms ${zh?'载入及准备':'load + prepare'} · ${zh?'预计算结果':'captured result'}`);
    }else if(data.type==='camera'&&data.generation===generation&&data.revision===revision){renderer.draw(data.matrices,state);
    }else if(data.type==='error'&&(data.generation===undefined||data.generation===generation))error(data.code);
   };
   timeout=setTimeout(()=>error('initialization_timeout'),20000);
   worker.postMessage({type:'init',root:new URL(host.dataset.assets,location.href).href});
  }catch(e){error(e.message);}
 });
 modelSelect.addEventListener('change',()=>selectModel(modelSelect.value));presetSelect.addEventListener('change',loadPreset);
 for(const key of ['wire','normals','contours'])q('[data-'+key+']').addEventListener('change',e=>{state[key]=e.target.checked;camera();});
 q('[data-reset]').addEventListener('click',()=>{const terrain=state.terrain,low=state.low,high=state.high;resetState();Object.assign(state,{terrain,low,high});if(terrain){state.pitch=.62;state.distance=3.6;}syncControls();camera();});
 q('[data-close]').addEventListener('click',()=>{close();say(zh?'查看器已释放':'Viewer released');start.focus();});
 let pointer;
 canvas.addEventListener('pointerdown',e=>{pointer={id:e.pointerId,x:e.clientX,y:e.clientY};canvas.setPointerCapture(e.pointerId);stage.focus({preventScroll:true});});
 canvas.addEventListener('pointermove',e=>{if(pointer?.id!==e.pointerId)return;state.yaw-=(e.clientX-pointer.x)*.008;state.pitch=Math.max(-1.3,Math.min(1.3,state.pitch+(e.clientY-pointer.y)*.008));pointer.x=e.clientX;pointer.y=e.clientY;camera();});
 for(const event of ['pointerup','pointercancel','lostpointercapture'])canvas.addEventListener(event,()=>{pointer=null;});
 canvas.addEventListener('wheel',e=>{if(!loaded)return;e.preventDefault();state.distance=Math.max(1.2,Math.min(12,state.distance*Math.exp(e.deltaY*.001)));camera();},{passive:false});
 stage.addEventListener('keydown',e=>{
  if(!loaded||e.target!==stage)return;const changes={ArrowLeft:()=>state.yaw-=.12,ArrowRight:()=>state.yaw+=.12,ArrowUp:()=>state.pitch=Math.min(1.3,state.pitch+.1),ArrowDown:()=>state.pitch=Math.max(-1.3,state.pitch-.1),'+':()=>state.distance=Math.max(1.2,state.distance-.2),'-':()=>state.distance=Math.min(12,state.distance+.2)};
  if(changes[e.key]){e.preventDefault();changes[e.key]();camera();}
 });
 new ResizeObserver(camera).observe(stage);
 canvas.addEventListener('webglcontextlost',e=>{e.preventDefault();error('graphics_context_lost');});
 window.addEventListener('pagehide',close);
}
