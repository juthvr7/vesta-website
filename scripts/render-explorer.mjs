const topics = {
 'node.catalog-92d7f361ba014377c079':'dragon',
 'node.catalog-2c621e59a0965b544c17':'bunny',
 'node.catalog-dc6814932211a6f4ff94':'teapot',
 'node.catalog-b0458f77c1d9de39d734':'torus',
 'node.catalog-a695f736133790a90aad':'box',
 'node.catalog-3b6f268370b1db771192':'ridge',
};
export const explorerModel = topic => topics[topic];
export function explorerBody(lang,topic,base){
 const model=topics[topic];if(!model)return '';
 const zh=lang==='zh';
 return `<!-- explorer:start --><section class="result-explorer" data-explorer="${model}" data-assets="${base}assets/previews/" data-lang="${lang}" id="interactive">
 <div class="explorer-heading"><div><p class="kicker">VESTA / INTERACTIVE RESULTS</p><h3>${zh?'把结果拿在手里看':'A closer look, from every angle'}</h3></div><span class="explorer-badge">WASM + WEBGL2</span></div>
 <p class="explorer-intro">${zh?'切换真实模型、观察网格与截面，或探索山脊的光照、等高线和水位。':'Switch real models, inspect the mesh and sections, or explore ridge lighting, contours and water level.'}</p>
 <div class="explorer-stage" tabindex="0" role="region" aria-label="${zh?'交互式三维结果查看器':'Interactive 3D result viewer'}"><canvas hidden aria-label="${zh?'拖动旋转，滚轮缩放；方向键旋转，+/-缩放':'Drag to orbit, scroll to zoom; arrow keys orbit, +/- zoom'}"></canvas><div class="explorer-start"><span class="explorer-mark">◈</span><p>${zh?'一个结果，无数种观察方式。':'One result. A thousand perspectives.'}</p><button type="button" data-start>${zh?'启动交互预览':'Explore in 3D'} <span aria-hidden="true">↗</span></button><small>${zh?'点击后按需载入模型；生成算法不会下载到浏览器。':'Models load on demand. Generation kernels stay off the browser.'}</small></div><span class="explorer-gesture" hidden>${zh?'拖动旋转 · 滚轮缩放':'DRAG TO ORBIT · SCROLL TO ZOOM'}</span></div>
 <div class="explorer-panel" hidden><div class="explorer-selectors"><label>${zh?'模型':'Model'}<select data-model aria-label="${zh?'模型':'Model'}"></select></label><label>${zh?'预计算样本':'Precomputed sample'}<select data-preset aria-label="${zh?'预计算样本':'Precomputed sample'}"></select></label><a data-reference>${zh?'对应节点参考':'Node reference'} ↗</a></div>
 <div class="explorer-controls"></div><div class="explorer-switches"><label><input type="checkbox" data-wire> ${zh?'线框叠加':'Wire overlay'}</label><label><input type="checkbox" data-normals> ${zh?'法线着色':'Normal colors'}</label><label data-terrain hidden><input type="checkbox" data-contours> ${zh?'等高线':'Contours'}</label><button type="button" data-reset>${zh?'重置视图':'Reset view'}</button><button type="button" data-close>${zh?'收起并释放':'Close viewer'}</button></div></div>
 <p class="explorer-status" role="status" aria-live="polite">${zh?'尚未加载':'Not loaded'}</p><p class="explorer-note">${zh?'本地交互仅调整显示。模型与地形是已保存的真实输出；切换样本不代表现场生成或模拟。下载版手册保留静态效果图，交互预览需通过HTTP/HTTPS打开。':'Local interaction changes presentation only. Models and terrain are captured results; sample changes do not run generation or simulation. The offline manual retains the images; interactive preview requires HTTP/HTTPS.'}</p>
 </section><!-- explorer:end -->`;
}
