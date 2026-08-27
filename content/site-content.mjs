export const locales = {
  en: {
    htmlLang: "en",
    ogLocale: "en_US",
    title: "Vesta — One graph. Every world.",
    description:
      "Vesta is an engine-independent procedural editor and deterministic spatial computing platform for building coherent worlds.",
    localeName: "EN",
    nav: {
      product: "Product",
      workflow: "Workflow",
      studio: "Studio",
      roadmap: "Roadmap",
    },
    status: "In development",
    menuOpen: "Open navigation",
    menuClose: "Close navigation",
    hero: {
      eyebrow: "Engine-independent procedural systems",
      lineOne: "One graph.",
      lineTwo: "Every world.",
      lede:
        "Vesta is an engine-independent procedural worldbuilding and spatial computing system. One typed graph connects terrain, roads, cities, buildings, and ecosystems.",
      primaryCta: "See the system",
      secondaryCta: "View the current build",
      visualLabel: "Conceptual system visualization",
      proofLabel: "Vesta computation path",
      flowLabel: "Live computation path",
      flowState: "Deterministic / CPU",
      flowSteps: ["Graph", "Validate", "Evaluate", "Result"],
      buildLabel: "Authentic build",
      buildTitle: "Vesta Studio",
      buildMeta: "Graph / Viewport / CPU preview",
      signals: [
        ["Typed graph", "One language for spatial data"],
        ["Deterministic", "Explicit seeds and versioned semantics"],
        ["On demand", "Bounds, resolution, LOD, output"],
        ["Host neutral", "Studio, CLI, Worker, engines"],
      ],
    },
    thesis: {
      index: "01 / Product",
      title: "Turn a fragmented toolchain into one composable system.",
      body:
        "Terrain, geometry, raster processing, placement, and engine delivery usually live in separate tools. Vesta connects them through one authoritative graph and one execution model.",
      proofLabel: "What defines Vesta",
      proof: [
        ["Typed by design", "Ports and data preserve meaning instead of collapsing into generic values."],
        ["Reproducible", "Versioned semantics, explicit seeds, and deterministic execution make results durable."],
        ["Host neutral", "The same Core serves Studio, CLI, Worker, and future engine adapters."],
      ],
    },
    system: {
      eyebrow: "The system",
      title: "Intent becomes a reproducible result.",
      intro:
        "Every request follows one observable execution chain. No hidden engine branch, no duplicated node semantics.",
      imageAlt:
        "Conceptual spatial computation journey from a typed graph and layered data through tiled execution planning into terrain, roads, cities, and ecosystems",
      visualLabel: "Concept visual / Graph to world",
      executionEyebrow: "Execution chain",
      executionTitle: "Every step stays explicit.",
      executionBody:
        "Graph source becomes a validated plan, a deterministic invocation, and an immutable result—without hidden host logic.",
      steps: [
        ["01", "Author", "Typed ports, stable identity, versioned parameters."],
        ["02", "Validate", "Structured diagnostics before a plan can exist."],
        ["03", "Plan & evaluate", "Explicit backend, bounds, LOD, seed, budget, and cache."],
        ["04", "Deliver", "Immutable typed results for Studio, CLI, Worker, or engine adapters."],
      ],
      rail: ["Graph source", "Execution plan", "CPU reference", "Result handle"],
    },
    data: {
      eyebrow: "Unified spatial data",
      title: "Different data. One execution language.",
      body:
        "A heightfield is not an image. A mask is not a field. Vesta keeps their semantics explicit while letting them move through the same typed graph and evaluation model.",
      imageAlt:
        "Conceptual data landscape transitioning from heightfield contours to mesh, curves, and point instances",
      visualLabel: "Concept visual / shared data model",
      types: [
        ["Geometry", "Points, vertices, primitives, typed attributes"],
        ["Heightfield", "Units, bounds, resolution, halo-aware evaluation"],
        ["Raster & fields", "Explicit channel, range, coordinate, and conversion semantics"],
        ["Curves & points", "Stable elements for roads, placement, and spatial composition"],
      ],
      chips: ["Mesh", "Heightfield", "Image2D", "Mask2D", "Field2D", "Curves", "Points", "Instances"],
    },
    studio: {
      eyebrow: "Vesta Studio",
      title: "Built as a real desktop tool.",
      body:
        "Studio is the authoring host around the same Core used by automation and future engine adapters. Its workspace, docking system, viewport, CPU reference preview, and operation development tools are already running; authoring and input gates continue to advance.",
      imageAlt:
        "Current Vesta Studio development build showing a 3D viewport, details panel, node network, and desktop workspace",
      captureLabel: "Current development capture",
      captureNote: "Authentic Vesta Studio build — interface and workflows continue to evolve.",
      detailEyebrow: "Inside Studio",
      detailTitle: "See the graph and the result together.",
      detailBody:
        "Viewport, details, docking, and operation status remain connected in one authoring context.",
      gallery: [
        [
          "Graph to viewport",
          "A typed SOP chain, its details, and the CPU reference result remain visible together.",
          "Vesta Studio screenshot showing a 3D primitive preview and a typed SOP node chain",
          "studio-graph-view.webp",
        ],
        [
          "Workspace language",
          "Docking, viewport controls, iconography, and operation status share one visual system.",
          "Vesta Studio screenshot showing the viewport, details panel, docking tabs, and operation board",
          "studio-workspace-view.webp",
        ],
      ],
      availableEyebrow: "Available now",
      availableTitle: "A working execution spine, not a concept reel.",
      availableBody:
        "The current build already carries authored graph data through validation, planning, deterministic CPU execution, caching, preview, and export.",
      available: [
        ["Versioned Graph", "Source, schema, validation, and compilation"],
        ["Explicit planning", "Backend assignment, bounds, LOD, seed, and budget"],
        ["CPU reference", "Deterministic evaluation with cooperative cancellation"],
        ["Content cache", "Request-aware, content-addressed reusable results"],
        ["CLI pipeline", "Load, validate, plan, execute, and export"],
        ["Studio workspace", "Docking, viewport, graph tools, and CPU preview"],
      ],
      facts: [
        ["Native", "Rust + Bevy/wgpu desktop application"],
        ["Shared", "The UI does not own a second graph runtime"],
        ["Responsive", "Long evaluation stays off the UI thread"],
      ],
    },
    composition: {
      eyebrow: "World composition",
      title: "From primitive operations to coherent worlds.",
      body:
        "General data and graph foundations sit below domain packages. Terrain, roads, urban systems, buildings, biomes, and ecosystems can then compose without collapsing into one monolith.",
      bridgeEyebrow: "From data to domains",
      bridgeTitle: "Typed foundations below. Composable domains above.",
      bridgeBody:
        "General operations remain reusable while domain packages add the rules needed to coordinate terrain, infrastructure, buildings, and ecosystems.",
      imageAlt:
        "Conceptual procedural world progressing from mountain terrain and rivers to roads, urban blocks, buildings, and vegetation",
      visualLabel: "Concept visual / future domain composition",
      domains: ["Terrain", "Roads", "Blocks", "Buildings", "Biomes", "Ecosystems"],
    },
    architecture: {
      eyebrow: "Architecture",
      title: "One enduring core. Thin hosts. Explicit backends.",
      body:
        "Vesta separates authoring data, execution plans, and generated results. Hosts express intent; Core owns semantics; backends execute prepared invocations.",
      hostsLabel: "Hosts",
      hosts: ["Studio", "CLI", "Worker", "Engine adapters"],
      coreLabel: "Authoritative Core",
      core: ["Graph", "Compiler", "Planner", "Executor", "Cache", "Diagnostics"],
      backendLabel: "Execution",
      backends: [
        ["CPU reference", "active"],
        ["GPU compute", "future"],
        ["External worker", "future"],
      ],
      resultLabel: "Typed results",
      results: ["Geometry", "Heightfield", "Raster", "Curves", "Points", "Instances"],
    },
    roadmap: {
      eyebrow: "Development",
      title: "Build the semantics first. Scale the experience outward.",
      body:
        "The roadmap deliberately establishes deterministic behavior and authoring foundations before widening the integration surface.",
      stages: [
        [
          "Available now",
          "Core execution spine",
          "Versioned graph source, validation, compilation, explicit backend assignment, deterministic CPU evaluation, content-addressed caching, and CLI execution.",
          "done",
        ],
        [
          "Active",
          "Studio & operation depth",
          "Desktop workspace, viewport and graph workflows, performance work, operation parity, and the remaining interaction acceptance gates.",
          "active",
        ],
        [
          "Next",
          "Stable integration surface",
          "Versioned SDK/C ABI, the first Unreal vertical slice, and focused GPU backend validation behind an explicit contract.",
          "next",
        ],
      ],
    },
    closing: {
      eyebrow: "Vesta / Technical preview",
      titleOne: "Compose systems.",
      titleTwo: "Shape worlds.",
      body: "A private technical preview is in preparation.",
      backToTop: "Back to top",
    },
    footer: {
      descriptor: "Independent procedural systems",
      state: "Built in public iteration / 2026",
    },
  },

  zh: {
    htmlLang: "zh-CN",
    ogLocale: "zh_CN",
    title: "Vesta — 一张图，构成万千世界。",
    description:
      "Vesta 是一个引擎无关的程序化编辑器与确定性空间计算平台，用统一系统构建连贯世界。",
    localeName: "中文",
    nav: {
      product: "产品",
      workflow: "工作方式",
      studio: "Studio",
      roadmap: "路线",
    },
    status: "开发中",
    menuOpen: "打开导航",
    menuClose: "关闭导航",
    hero: {
      eyebrow: "引擎无关的程序化世界系统",
      lineOne: "一张图谱，",
      lineTwo: "构成万千世界。",
      lede:
        "Vesta 是一套引擎无关的程序化世界构建与空间计算系统，用同一张类型化 Graph 连接地形、道路、城市、建筑与生态系统。",
      primaryCta: "了解系统",
      secondaryCta: "查看当前构建",
      visualLabel: "系统概念视觉",
      proofLabel: "Vesta 计算链路",
      flowLabel: "实时计算链路",
      flowState: "确定性 / CPU",
      flowSteps: ["Graph", "验证", "求值", "结果"],
      buildLabel: "真实构建",
      buildTitle: "Vesta Studio",
      buildMeta: "Graph / 视口 / CPU 预览",
      signals: [
        ["类型化图谱", "让空间数据使用同一种语言"],
        ["确定性", "显式 Seed 与版本化语义"],
        ["按需求值", "范围、分辨率、LOD 与目标输出"],
        ["宿主无关", "Studio、CLI、Worker 与引擎"],
      ],
    },
    thesis: {
      index: "01 / 产品",
      title: "让世界构建从工具拼接，变成可组合系统。",
      body:
        "地形、几何、栅格处理、资产放置与引擎交付通常分散在不同工具中。Vesta 用一份权威 Graph 与一套执行模型把它们连接起来。",
      proofLabel: "Vesta 的核心定义",
      proof: [
        ["类型即语义", "端口与数据保持明确含义，不退化成通用属性集合。"],
        ["结果可复现", "版本化语义、显式 Seed 与确定性执行让结果长期可靠。"],
        ["宿主无关", "同一套 Core 服务于 Studio、CLI、Worker 与未来的引擎适配器。"],
      ],
    },
    system: {
      eyebrow: "系统链路",
      title: "让意图成为可复现的结果。",
      intro:
        "每次请求只走一条可观察的执行链。不隐藏引擎分支，也不复制节点语义。",
      imageAlt: "空间计算概念视觉：类型化 Graph 与分层数据经过分块规划，最终形成地形、道路、城市与生态系统",
      visualLabel: "概念视觉 / 从 Graph 到世界",
      executionEyebrow: "执行链",
      executionTitle: "每一步，都保持显式。",
      executionBody: "Graph 源数据依次成为通过验证的计划、确定性 Invocation 与不可变结果，不隐藏宿主逻辑。",
      steps: [
        ["01", "创作", "类型化端口、稳定身份与版本化参数。"],
        ["02", "验证", "只有结构化诊断通过，才允许生成计划。"],
        ["03", "规划与求值", "显式后端、范围、LOD、Seed、预算与缓存。"],
        ["04", "交付", "向 Studio、CLI、Worker 或引擎适配器返回不可变类型化结果。"],
      ],
      rail: ["Graph 源数据", "执行计划", "CPU 参考后端", "结果句柄"],
    },
    data: {
      eyebrow: "统一空间数据",
      title: "数据各有语义，执行共享语言。",
      body:
        "Heightfield 不是普通图片，Mask 也不是 Field。Vesta 显式保留它们的语义，同时让所有数据进入同一套类型化 Graph 与求值模型。",
      imageAlt: "概念数据地形，从等高线过渡到网格、曲线与点实例",
      visualLabel: "概念视觉 / 统一数据模型",
      types: [
        ["几何", "Point、Vertex、Primitive 与类型化 Attribute"],
        ["高度场", "单位、范围、分辨率与 Halo 感知求值"],
        ["栅格与场", "显式通道、数值范围、坐标与转换语义"],
        ["曲线与点", "为道路、放置和空间组合提供稳定元素"],
      ],
      chips: ["Mesh", "Heightfield", "Image2D", "Mask2D", "Field2D", "Curves", "Points", "Instances"],
    },
    studio: {
      eyebrow: "Vesta Studio",
      title: "把它做成真正的桌面创作工具。",
      body:
        "Studio 是围绕同一套 Core 构建的创作宿主，自动化与未来的引擎适配器也使用这套 Core。工作区、Dock、视口、CPU 参考预览与算子开发工具已经运行；创作能力与输入门禁仍在持续推进。",
      imageAlt: "当前 Vesta Studio 开发构建，包含三维视口、详情面板、节点网络与桌面工作区",
      captureLabel: "当前开发构建",
      captureNote: "真实 Vesta Studio 截图——界面与工作流仍在持续演进。",
      detailEyebrow: "Studio 内部",
      detailTitle: "同时看见 Graph 与结果。",
      detailBody: "视口、详情、Dock 与算子状态保持在同一创作上下文中。",
      gallery: [
        [
          "Graph 到视口",
          "类型化 SOP 链、详情数据与 CPU 参考结果在同一工作区内可见。",
          "Vesta Studio 真实截图，显示三维基础体预览与类型化 SOP 节点链",
          "studio-graph-view.webp",
        ],
        [
          "工作区语言",
          "Dock、视口控制、图标与算子状态遵循同一套视觉体系。",
          "Vesta Studio 真实截图，显示视口、详情面板、Dock 标签与算子状态面板",
          "studio-workspace-view.webp",
        ],
      ],
      availableEyebrow: "当前可用",
      availableTitle: "已经运行的执行主干，而不是概念演示。",
      availableBody:
        "当前构建已经能够让作者 Graph 经过验证、规划、确定性 CPU 执行、缓存、预览与导出。",
      available: [
        ["版本化 Graph", "Source、Schema、验证与编译"],
        ["显式规划", "后端分配、范围、LOD、Seed 与预算"],
        ["CPU 参考后端", "确定性求值与协作式取消"],
        ["内容缓存", "感知请求、内容寻址的可复用结果"],
        ["CLI 全链路", "加载、验证、规划、执行与导出"],
        ["Studio 工作区", "Dock、视口、Graph 工具与 CPU 预览"],
      ],
      facts: [
        ["原生桌面", "Rust + Bevy/wgpu 应用"],
        ["共享权威", "UI 不拥有第二套 Graph Runtime"],
        ["保持响应", "长时间求值不会阻塞 UI 主线程"],
      ],
    },
    composition: {
      eyebrow: "世界组合",
      title: "从基础算子，走向连贯世界。",
      body:
        "通用 Data 与 Graph 位于领域包下方。地形、道路、城市、建筑、生物群落与生态系统在其上组合，而不坍缩成一个巨型单体。",
      bridgeEyebrow: "从数据到领域",
      bridgeTitle: "下层保持类型化，上层实现可组合。",
      bridgeBody:
        "通用算子保持复用，领域包在其上加入必要规则，让地形、基础设施、建筑与生态系统彼此协调。",
      imageAlt: "程序化世界概念视觉，从山地河流逐步发展为道路、城市街区、建筑与植被",
      visualLabel: "概念视觉 / 未来领域组合",
      domains: ["地形", "道路", "街区", "建筑", "生物群落", "生态系统"],
    },
    architecture: {
      eyebrow: "架构",
      title: "一个持久核心，轻量宿主，显式后端。",
      body:
        "Vesta 分离作者数据、执行计划与生成结果。宿主表达意图，Core 拥有语义，Backend 只执行准备完成的 Invocation。",
      hostsLabel: "宿主",
      hosts: ["Studio", "CLI", "Worker", "引擎适配器"],
      coreLabel: "权威 Core",
      core: ["Graph", "Compiler", "Planner", "Executor", "Cache", "Diagnostics"],
      backendLabel: "执行后端",
      backends: [
        ["CPU 参考后端", "已启用"],
        ["GPU Compute", "后续"],
        ["外部 Worker", "后续"],
      ],
      resultLabel: "类型化结果",
      results: ["Geometry", "Heightfield", "Raster", "Curves", "Points", "Instances"],
    },
    roadmap: {
      eyebrow: "开发路线",
      title: "先稳定语义，再向外扩展体验。",
      body:
        "路线会先建立确定性行为与创作基础，再逐步扩大集成边界。",
      stages: [
        [
          "当前可用",
          "Core 执行主干",
          "版本化 Graph Source、验证、编译、显式后端分配、确定性 CPU 求值、内容寻址缓存与 CLI 全链路。",
          "done",
        ],
        [
          "持续推进",
          "Studio 与算子深度",
          "桌面工作区、视口与 Graph 工作流、性能、算子对齐，以及尚未完成的交互验收门禁。",
          "active",
        ],
        [
          "下一阶段",
          "稳定集成边界",
          "版本化 SDK/C ABI、第一条 Unreal 垂直切片，以及位于显式契约之后的 GPU 后端验证。",
          "next",
        ],
      ],
    },
    closing: {
      eyebrow: "Vesta / 技术预览",
      titleOne: "组合系统，",
      titleTwo: "塑造世界。",
      body: "私有技术预览正在准备中。",
      backToTop: "返回顶部",
    },
    footer: {
      descriptor: "独立程序化世界系统",
      state: "持续公开迭代 / 2026",
    },
  },
};
