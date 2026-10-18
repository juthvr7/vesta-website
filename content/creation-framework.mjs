// Editorial capability navigation. Evidence stays in the imported dated records.
export const frameworkUi={
  en:{name:'User manual',directory:'Browse the framework',overview:'Start here',title:'A world takes shape, one capability at a time.',intro:'Start with what you want to create. Follow the capabilities that connect intent, terrain, world systems, reusable assets and engine delivery. Open a study when you need to inspect a specific result.',process:'The creation path',chapters:'Explore the capability framework',contents:'In this chapter',inputs:'Starts with',outputs:'Produces',next:'Continue through the framework',studies:'Functions and verification',studyNote:'These studies support this chapter. Their dated records qualify specific slices of the capability.',plannedNote:'This chapter describes the intended direction. It does not imply these tools or an end-to-end workflow are complete.',states:{slices:'Verified slices',active:'In development',planned:'Planned direction',foundation:'Shared foundation'},flow:['Describe the place','Shape the terrain','Connect world systems','Build reusable assets','Deliver into the engine']},
  zh:{name:'用户手册',directory:'浏览能力框架',overview:'从这里开始',title:'沿着创作过程，理解每一项能力。',intro:'先明确想创造什么，再沿着意图、地形、世界系统、可复用资产和引擎交付逐层浏览。需要了解具体结果时，再进入对应的功能与验证记录。',process:'世界如何逐步成形',chapters:'按能力框架浏览',contents:'本章内容',inputs:'从什么开始',outputs:'得到什么',next:'继续沿框架探索',studies:'具体功能与验证',studyNote:'以下实证支撑本章中的具体能力，日期与范围只对应各自已验证的切片。',plannedNote:'本章说明长期方向，不代表相关工具或完整工作流已经实现。',states:{slices:'已有验证切片',active:'建设中',planned:'规划方向',foundation:'共享基础'},flow:['描述想创造的地方','塑造地形','连接世界系统','形成可复用资产','带入引擎']},
};
Object.assign(frameworkUi.en,{search:'Search the manual',searchResults:'Search results',clearSearch:'Clear search',noResults:'No matching chapters or functions.',download:'Download offline manual',downloadNote:'HTML · search · local media'});
Object.assign(frameworkUi.zh,{search:'搜索手册',searchResults:'搜索结果',clearSearch:'清除搜索',noResults:'没有匹配的章节或功能。',download:'下载离线手册',downloadNote:'HTML · 全文搜索 · 本地素材'});

const section=(id,enTitle,zhTitle,en,zh)=>({id,enTitle,zhTitle,en,zh});
export const chapters=[
  {id:'agent-creation',state:'active',studies:[],
    en:{title:'Agent-led creation',summary:'Turn a creative intent into a controlled, inspectable process.',intro:'Describe a place, its constraints and the result you want. An Agent connects that intent to available tools, while the creator can inspect, change and take over the work.',input:'A project, creative intent and explicit constraints.',output:'A reviewable plan, tool actions and feedback on the resulting world.',sections:[
      section('brief','Intent and constraints','目标与约束','Begin with the place you want to make and the parts that must remain under your control.','从想创造的地方出发，说明目标、约束和需要保留人工控制的部分。'),
      section('collaboration','Builder and the connected Agent','Builder与连接的Agent','World context and preview stay in Builder; conversations and model execution stay with the connected Agent. A Vesta Agent connection exists; broader creation workflows remain in development.','世界上下文与预览留在Builder，会话和模型执行由连接的Agent持有。Vesta Agent连接已有切片，完整创作流程仍在建设。'),
      section('review','Inspect, refine and keep control','检查、调整与接管','Tool execution, result review and manual editing form the intended loop. Individual connection or tool checks do not qualify the entire loop.','工具执行、结果检查和手工编辑共同构成目标闭环。单项连接或工具检查不代表整条闭环已经验收。')],},
    zh:{title:'Agent协作创作',summary:'把创作意图，转化为可检查的过程。',intro:'描述一个地方、它的约束以及希望得到的结果。Agent把意图连接到已有工具，创作者始终可以检查、修改并接管工作。',input:'当前项目、创作意图和明确约束。',output:'可审查的计划、工具操作与世界结果的反馈。'},
  },
  {id:'terrain',state:'slices',studies:['edge','terraces','fold','soft-clip'],
    en:{title:'Terrain',summary:'Create the landform, then shape how it behaves and meets its surroundings.',intro:'Terrain is the first domain in Vesta’s world-creation path. Browse it by the job you need to do: generate a starting form, reshape its structure, simulate change or control local influence.',input:'A bounded heightfield, seed and parameters; optional masks or layers.',output:'Editable terrain data that can continue through the same Graph and asset workflow.',sections:[
      section('generate','Generate a starting landform','生成基础地貌','Establish scale and structure with a starting heightfield. Existing ridge results provide the inputs used by the shaping studies below.','先形成有尺度和结构的高度场。下面塑形实证使用已有山脊结果作为输入。'),
      section('shape','Reshape the terrain','地形塑形','Change a specific aspect of the land: layered slopes, height rhythm, height range or the outer boundary. Start with the effect you need, then inspect the relevant function.','按想改变的特征选择工具：坡面的层状结构、高度起伏的节奏、高度范围或外围边界。先找能力，再查看具体功能。'),
      section('simulate','Erosion and material change','侵蚀与物质变化','Explore how terrain changes through erosion. The engine-delivery chapter contains an existing ridge-and-erosion execution study; that is a specific slice, not a qualification of every simulation workflow.','查看侵蚀如何改变地形。引擎交付章节已有山脊与侵蚀链的执行实证；它是具体切片，不代表全部模拟工作流通过。'),
      section('layers','Masks and local control','遮罩、图层与局部控制','Use explicit layers and masks to define where an operation acts. A dedicated public verification set for these controls will be organized separately.','通过明确的图层和遮罩控制操作的作用范围。对应的公开专项验证将单独整理。')],},
    zh:{title:'地形',summary:'先形成地貌，再控制结构、变化与边界。',intro:'地形是Vesta世界创作主线的首个领域。按实际任务浏览：生成起始形态、重塑结构、模拟变化，或控制局部作用范围。',input:'有界高度场、种子与参数，以及可选遮罩和图层。',output:'可继续进入同一Graph与资产流程的地形数据。'},
  },
  {id:'geometry-tools',state:'slices',studies:[],librarySection:'geometry',
    en:{title:'Geometry and node tools',summary:'Build and reshape assets through typed geometry, attributes and groups.',intro:'Terrain is one part of Vesta. Existing node registrations also cover geometry creation, topology, attributes, groups, curves, volumes and UVs. Browse the full Catalog below; implementation and documentation status are shown separately.',input:'Typed geometry and its point, vertex, primitive and detail attributes; explicit parameters.',output:'Geometry and data that continue through the same Graph, asset and engine-delivery contracts.',sections:[
      section('primitives','Primitives and transformations','基础几何与变换','Start from geometric primitives and compose modifications. Registered templates are not all implemented or accepted.','从基础几何生成与修改开始组合；已登记模板不代表全部实现或验收。'),
      section('topology','Topology and surfaces','拓扑与曲面','Polygon, surface, packing and merge categories describe different geometry jobs. Distinct operations with similar names retain distinct identities.','多边形、曲面、封装与合并对应不同几何任务；同名但契约不同的操作保留独立身份。'),
      section('attributes','Groups and attributes','分组与属性','Use typed attributes and element groups to address local work. The directory includes these existing node families; detailed prose is added incrementally.','用类型化属性和元素分组控制局部操作；目录纳入已有节点族，逐项补齐详细说明。'),
      section('curves-volumes','Curves, volumes and UVs','曲线、体积与UV','These are part of the same node system, not separate runtimes. Check the registration and documentation labels before treating a catalog entry as a working tool.','这些能力属于同一节点系统，不建立独立运行时；使用前应区分登记、实现与文档状态。')
    ]},
    zh:{title:'几何与节点工具',summary:'用类型化几何、属性与分组构造和修改资产。',intro:'地形只是Vesta的一部分。现有节点登记还涵盖几何生成、拓扑、属性、分组、曲线、体积与UV。下面的完整目录分别显示实现登记与文档状态。',input:'类型化几何及其点、顶点、面和Detail属性，以及显式参数。',output:'继续进入同一Graph、资产与引擎交付契约的几何和数据。'}},
  {id:'world-systems',state:'planned',studies:[],
    en:{title:'Connected world systems',summary:'Let roads, settlements and ecosystems respond to the same place.',intro:'The long-term direction connects domains around one world context. These capabilities belong in the framework now so their relationships are clear; they are not presented as finished tools.',input:'Terrain, world constraints and domain-specific intent.',output:'The intended composition of connected environments and world systems.',sections:[
      section('roads','Roads and movement','道路与通行','Connect destinations while responding to terrain, scale and access constraints.','在地形、尺度与可达性约束下连接目的地。'),
      section('settlements','Blocks, buildings and settlements','街区、建筑与聚落','Organize built places through reusable domain assets and shared spatial relationships.','通过可复用领域资产与共同空间关系组织建成环境。'),
      section('ecosystems','Biomes and ecosystems','生物群落与生态','Connect water, climate and placement relationships as these domain kernels mature.','随领域算法逐步成熟，连接水系、气候与放置关系。')],},
    zh:{title:'世界系统',summary:'让道路、聚落与生态回应同一个地方。',intro:'长期方向是在共同世界上下文中连接多个领域。现在先让这些能力在框架中有清晰位置与关系，不把它们展示为已完成工具。',input:'地形、世界约束和具体领域的创作意图。',output:'目标是能够相互关联的环境与世界系统组合。'},
  },
  {id:'graph-assets',state:'slices',studies:[],
    en:{title:'Graphs and reusable assets',summary:'Keep the process editable, and carry it into the next context.',intro:'A result is one stage of creation. Graph structure and Vesta Digital Assets preserve an inspectable process with a published interface, so the work can be reused and evaluated in another host.',input:'A procedural Graph, its inputs and selected public parameters.',output:'A versioned asset definition and an explicit interface for instances and execution.',sections:[
      section('graph','An inspectable process','可检查的过程','Operations share typed data and an execution model. Professional graph visibility and manual control remain part of the intended creative environment.','算子共用类型化数据与执行模型。Graph可见性和专业手工控制保留在目标创作环境中。'),
      section('interface','Published parameters and outputs','公开参数与输出','A VDA exposes a deliberate interface, keeping the reusable definition separate from instance overrides.','VDA通过明确接口公开参数与输出，将可复用定义与实例覆盖分开。'),
      section('reuse','Reuse across hosts','跨宿主复用','The Unreal study demonstrates one asset-loading and heightfield-evaluation slice. Broader authoring and production delivery have their own gates.','Unreal实证展示资产加载与高度场求值的一项切片。更完整的作者流程与生产交付各有独立门禁。')],},
    zh:{title:'Graph与可复用资产',summary:'保留可编辑的过程，让工作可以继续复用。',intro:'结果只是创作中的一个阶段。Graph结构与Vesta Digital Asset保存可检查的过程，通过公开接口让工作能在其他上下文继续使用和求值。',input:'程序化Graph、输入与选定的公开参数。',output:'版本化资产定义，以及面向实例和执行的明确接口。'},
  },
  {id:'engine-delivery',state:'slices',studies:['vda-unreal'],
    en:{title:'Engine delivery',summary:'Take an editable process into the environment where it is used.',intro:'Follow an asset from its definition into an engine: import it, override its controls, evaluate and inspect the generated result. Start with the verified heightfield slice in Unreal.',input:'A VDA definition, instance overrides and an execution request.',output:'The verified slice produces engine-side terrain data and a Landscape preview.',sections:[
      section('import','Import and parameter controls','导入与参数控制','Keep a stable asset definition and expose its selected controls inside the engine.','保留稳定资产定义，在引擎中使用其公开参数。'),
      section('evaluate','Evaluate and inspect','求值与检查','CPU and selected UE RHI stages participate in one explicit execution chain. The current study records actual engine output data.','CPU与选定的UE RHI阶段进入同一条明确执行链，当前实证保存真实引擎输出数据。'),
      section('delivery','Preview and production delivery','预览与生产交付','A Landscape preview is a bounded deliverable. Complete Bake, all data types and every engine workflow require separate qualification.','Landscape预览是有界交付切片。完整Bake、全部数据类型和完整引擎工作流需要单独验收。')],},
    zh:{title:'引擎交付',summary:'把可编辑的过程，带入实际使用环境。',intro:'沿着资产定义进入引擎：导入、覆盖公开参数、求值并检查生成结果。当前先查看Unreal高度场的已验证切片。',input:'VDA定义、实例参数覆盖与执行请求。',output:'当前已验证切片产生引擎侧地形数据和Landscape预览。'},
  },
  {id:'execution',state:'foundation',studies:[],
    en:{title:'Data and execution',summary:'One data and execution foundation, across tools and hosts.',intro:'Heightfields, masks and other spatial data pass through the same typed Graph and Executor. Hosts convert user intent to this shared model instead of owning separate operation semantics.',input:'Typed spatial data and a bounded, explicit request.',output:'Results, diagnostics and observable CPU / GPU execution stages.',sections:[
      section('data','Typed spatial data','类型化空间数据','Keep distinct data meanings explicit, even when data shares raster storage.','即使共用栅格存储，也保留不同数据的明确语义。'),
      section('backends','CPU and GPU capabilities','CPU与GPU能力','Backend support belongs to an operation implementation. A GPU stage elsewhere in a chain does not make every operation GPU-verified.','后端能力属于具体算子实现。链上出现GPU阶段，不代表每个算子都已验证GPU。'),
      section('evidence','Read verification in context','按上下文阅读验证','Read the host, backend, version, resolution and date together. A picture shows appearance; numerical and interaction records establish different kinds of evidence.','一起查看宿主、后端、版本、分辨率与日期。图片说明外观，数值与交互记录提供不同类型的证据。')],},
    zh:{title:'数据与执行基础',summary:'跨工具与宿主，共用一套数据和执行基础。',intro:'高度场、遮罩与其他空间数据进入同一类型化Graph和Executor。宿主把用户意图转换到共享模型中，不各自拥有一套算子语义。',input:'类型化空间数据与明确、有界的请求。',output:'结果、诊断，以及可观察的CPU／GPU执行阶段。'},
  },
];

// Section text has one bilingual owner; localized chapter copy stays parallel.
for(const c of chapters){
  const sections=c.en.sections;delete c.en.sections;
  c.en.sections=sections.map(s=>({id:s.id,title:s.enTitle,body:s.en}));
  c.zh.sections=sections.map(s=>({id:s.id,title:s.zhTitle,body:s.zh}));
}
