// Shared pure resolver: classic script in file:// packages and CommonJS in contract checks.
(function(root){
 'use strict';
 function resolveHelp(manifest,request){
  const fail=reason=>({status:'not-found',reason});
  if(!manifest||![1,2].includes(manifest.schema_version)||!Array.isArray(manifest.topics))return fail('unsupported-manifest');
  if(manifest.topics.some(t=>!t||typeof t!=='object'||typeof t.id!=='string'||!Number.isSafeInteger(t.operation_version)))return fail('invalid-manifest');
  if(!request||typeof request.topic!=='string'||!Number.isSafeInteger(request.version)||request.version<1||request.parameter!==undefined&&typeof request.parameter!=='string'||request.lang!==undefined&&typeof request.lang!=='string')return {status:'invalid-request',reason:'invalid-request'};
  const topics=manifest.topics.filter(t=>t.id===request.topic);
  if(!topics.length)return fail('topic-not-found');
  const versions=topics.filter(t=>t.operation_version===request.version);
  if(versions.length!==1)return fail(versions.length?'ambiguous-version':'version-not-found');
  const topic=versions[0],requested=request.lang??'en';
  if(!topic.paths||typeof topic.paths!=='object'||!topic.parameters||typeof topic.parameters!=='object')return fail('invalid-target');
  const language=Object.hasOwn(topic.paths,requested)?requested:Object.hasOwn(topic.paths,'en')?'en':null;
  if(!language)return fail('language-not-found');
  const path=topic.paths[language];
  const kind=topic.kind??'reference';
  if(!['reference','catalog-entry'].includes(kind)||manifest.schema_version===1&&kind!=='reference')return fail('invalid-target');
  const validPath=kind==='reference'?/^(?:zh\/)?reference\/nodes\/[a-z][a-z0-9.-]*\/v[1-9][0-9]*\/index\.html$/:/^(?:zh\/)?reference\/library\/[a-z][a-z0-9-]*\/index\.html$/;
  if(typeof path!=='string'||!validPath.test(path))return fail('invalid-target');
  const reasons=[];
  if(language!==requested)reasons.push('language-fallback');
  let fragment=kind==='catalog-entry'?topic.fragment:'';
  if(kind==='catalog-entry'){
   if(typeof fragment!=='string'||!/^entry-node\.[a-z0-9.-]+-v[1-9][0-9]*$/.test(fragment))return fail('invalid-target');
   reasons.push('reference-not-written');
  }
  if(request.parameter!==undefined){
   if(Object.hasOwn(topic.parameters,request.parameter))fragment=topic.parameters[request.parameter];
   else reasons.push('parameter-not-found');
  }
  if(fragment&&kind==='reference'&&!/^parameter-[0-9a-f]+$/.test(fragment))return fail('invalid-target');
  return {status:reasons.length?'fallback':'resolved',reasons,path,fragment,language,topic:topic.id,operation_version:topic.operation_version};
 }
 const api={resolve:resolveHelp};
 if(typeof module==='object'&&module.exports)module.exports=api;else root.VestaHelp=api;
})(globalThis);
