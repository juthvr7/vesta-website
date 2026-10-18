// Explanatory prose only. Types, defaults, ranges and port identities come from Catalog snapshots.
const p=(en,zh)=>({en,zh});
export const referenceCopy={
 'node.edge@1':{
  inputs:p(['Terrain heightfield carried by the Geometry input.'],['Geometry输入承载的地形高度场。']),
  outputs:p(['Terrain with its outer region attenuated by the selected boundary profile.'],['按所选边界轮廓衰减外围后的地形。']),
  parameters:{
   Style:p('Choose Round, Square or Precise. Round uses a softened radial boundary, Square uses a rectangular profile, and Precise keeps an explicit pixel margin.','选择Round、Square或Precise。Round使用柔化的径向边界，Square使用矩形轮廓，Precise按像素保留明确边缘带。'),
   Size:p('Controls the boundary profile in Round and Square. Precise uses Pixels instead. Compare the same input when changing the extent.','控制Round和Square的边界轮廓。Precise改用Pixels；比较范围时应使用同一输入。'),
   Pixels:p('Sets the integer margin in Precise mode. This control does not affect Round or Square. A margin that leaves a constant mask produces a zero result.','设置Precise模式的整数像素边距，不影响Round或Square。若边距使遮罩成为常量，结果会归零。'),
   Softness:p('Softens the Round mask. It does not affect Square or Precise; keep the mode in mind when comparing this control.','柔化Round遮罩，不影响Square或Precise；比较此参数时应保持模式一致。')
  }
 },
 'node.terraces@2':{
  inputs:p(['Terrain heightfield to reshape.'],['待塑形的地形高度场。']),
  outputs:p(['Heightfield with a layered elevation profile, blended by Intensity.'],['按Intensity混合层状高度轮廓后的高度场。']),
  parameters:{
   NumTerraces:p('Number of levels used to build the terrace profile. Evaluation needs at least two levels and remains subject to the request resource budget.','构建岩台轮廓的层数。求值至少需要两层，并受请求的资源预算约束。'),
   Uniformity:p('Controls regularity of the level distribution. Seed controls the repeatable variation of nonuniform levels.','控制层级分布的均匀程度；非均匀层级的可重复变化由Seed控制。'),
   Steepness:p('Shapes the transition between terrace levels. Compare it at a fixed level count to judge the slope profile.','塑造层级之间的过渡。固定层数后调整，更容易观察坡面轮廓的变化。'),
   Intensity:p('Blends the terraced profile with the original terrain. Zero retains the input; one applies the full profile.','在原地形与分层轮廓之间混合。零保留输入，一完整应用分层轮廓。'),
   Seed:p('Explicit seed for the nonuniform level table. Identical inputs and execution conditions retain the deterministic contract.','非均匀层级表的显式种子；相同输入和执行条件遵循确定性契约。')
  }
 },
 'node.fold@2':{
  inputs:p(['Required terrain heightfield.','Optional per-sample frequency modulation. Its grid resolution must match the terrain; it is not an output opacity mask.'],['必需的地形高度场。','可选的逐样本频率调制；网格分辨率必须与地形一致，它不是结果透明度遮罩。']),
  outputs:p(['Height values remapped through the selected waveform.'],['经过所选波形重映射的高度值。']),
  parameters:{
   Waveform:p('Select Sine, Triangle or Sawtooth. The result study compares all three using the same terrain and display treatment.','选择Sine、Triangle或Sawtooth。效果研究以同一地形和显示处理比较三种波形。'),
   Folds:p('Controls waveform frequency across the height range. The optional second input modulates this frequency per sample.','控制高度范围内的波形频率；可选第二输入会逐样本调制该频率。'),
   Symmetric:p('Offsets the waveform input around the height midpoint before folding. It changes the profile alignment rather than blending the result.','折叠前围绕高度中点偏移波形输入，改变轮廓对齐方式，不是混合结果的开关。')
  }
 },
 'node.soft-clip@2':{
  inputs:p(['Required terrain heightfield.','An optional Threshold port is preserved in the contract, but the current implementation does not read it. Supplying a map does not override the scalar Threshold parameter.'],['必需的地形高度场。','契约保留可选Threshold端口，但当前实现不读取它；连接贴图不会覆盖标量Threshold参数。']),
  outputs:p(['A softly compressed heightfield with the recorded output-range behavior.'],['按柔性压缩轮廓及已记录的输出范围行为生成的高度场。']),
  parameters:{
   ClipMode:p('AboveThreshold shapes peaks above the threshold; BelowThreshold shapes the lower region.','AboveThreshold处理高于阈值的山峰；BelowThreshold处理较低区域。'),
   Threshold:p('Scalar elevation threshold for the selected mode. The optional input does not modulate this parameter in the current version.','所选模式的标量高度阈值；当前版本的可选输入不调制此参数。'),
   Softness:p('Width of the soft transition. Zero is not a substitute for a hard clip: affected samples follow the recorded zero-output boundary behavior.','柔性过渡宽度。零不能当作硬裁切的替代：受影响样本遵循已记录的归零边界行为。'),
   Clipping:p('Controls the amount of compression beyond the transition. Compare it with a fixed threshold and nonzero softness.','控制过渡之外的压缩程度；建议固定阈值并保持非零Softness后比较。')
  }
 }
};

export const helpUi={
 en:{reference:'Node reference',purpose:'Purpose',ports:'Inputs and outputs',inputs:'Inputs',outputs:'Outputs',parameters:'Parameters',examples:'Examples and verification',related:'Related content',version:'Operation version',identity:'Stable help topic',default:'Default',type:'Type',range:'Range endpoints',strict:'strict',soft:'soft',unbounded:'not declared',required:'required',optional:'optional',choices:'Accepted values',catalog:'Contract fields come from a dated Catalog snapshot. Soft slider endpoints do not define hard validation limits.',scope:'This reference explains the current contract; its linked evidence qualifies only the stated backend and cases.',openStudy:'Explore the result study',openReference:'Node reference and parameter help',contract:'Download reference contract',missing:'Explanation not yet written; the parameter remains in the full contract.',compatibility:'This page documents this exact operation version. Documentation edition and backend implementation versions are separate.',entry:'Open contextual help',fallback:'The exact request could not be opened automatically.',continue:'Open the matching reference',home:'Browse the manual',failure:'No matching reference is included in this manual. Check the operation version or browse the manual.'},
 zh:{reference:'节点参考',purpose:'用途',ports:'输入与输出',inputs:'输入',outputs:'输出',parameters:'参数',examples:'效果示例与验证',related:'相关内容',version:'节点逻辑版本',identity:'稳定帮助身份',default:'默认值',type:'类型',range:'范围端点',strict:'严格约束',soft:'软范围',unbounded:'未声明',required:'必需',optional:'可选',choices:'允许值',catalog:'契约字段来自有日期的Catalog快照。滑块软范围端点不等于硬验证范围。',scope:'参考页解释当前契约；链接的证据仅覆盖其中注明的后端和用例。',openStudy:'查看效果与验证记录',openReference:'节点参考与参数帮助',contract:'下载参考契约',missing:'说明尚未补齐；此参数仍完整保留在契约中。',compatibility:'本页对应这个确切的节点逻辑版本。文档打包版本与后端实现版本分别记录。',entry:'打开上下文帮助',fallback:'无法自动打开完全匹配的请求。',continue:'打开匹配的参考页',home:'浏览手册',failure:'此手册未包含匹配的参考页，请核对节点版本或浏览目录。'}
};
Object.assign(helpUi.en,{edition:'Documentation edition',enabled:'On',disabled:'Off',displayPrecision:'Numeric defaults use a readable display precision; exact typed values remain in the downloadable contract.'});
Object.assign(helpUi.zh,{edition:'文档版本',enabled:'开启',disabled:'关闭',displayPrecision:'数值默认值采用便于阅读的显示精度，精确值保留在可下载契约中。'});
