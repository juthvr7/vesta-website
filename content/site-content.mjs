export const locales = {
  en: {
    htmlLang: "en",
    ogLocale: "en_US",
    title: "Vesta — One graph. Every world.",
    description:
      "Vesta is an engine-independent procedural editor and deterministic spatial computing platform for building coherent worlds.",
    localeName: "EN",
    nav: {
      system: "System",
      data: "Data",
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
        "Vesta unifies terrain, geometry, imagery, and placement in one typed, deterministic spatial computing system—shared by Studio, CLI, Worker, and engine adapters.",
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
      index: "01 / Thesis",
      title: "Worldbuilding tools should compose, not fragment.",
      body:
        "Terrain, geometry, raster processing, placement, and engine delivery are usually separate islands. Vesta turns them into one durable flow—from authored intent to reproducible result.",
      proofLabel: "The Vesta difference",
      proof: [
        ["One source", "A versioned graph remains the authority across every host."],
        ["One runtime", "Validation, planning, execution, caching, and diagnostics stay in Core."],
        ["Many outcomes", "The same system can produce geometry, fields, worlds, or engine-ready data."],
      ],
    },
    system: {
      eyebrow: "The system",
      title: "Intent becomes a reproducible result.",
      intro:
        "Every request follows one observable execution chain. No hidden engine branch, no duplicated node semantics.",
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
      system: "系统",
      data: "数据",
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
        "Vesta 将地形、几何、影像与放置统一到一套类型化、确定性的空间计算系统，并让同一份 Graph 运行于 Studio、CLI、Worker 与引擎适配器。",
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
      index: "01 / 命题",
      title: "世界构建工具应该彼此组合，而不是继续割裂。",
      body:
        "地形、几何、栅格处理、资产放置与引擎交付通常各自为岛。Vesta 把它们连接成一条持久链路——从创作意图到可复现结果。",
      proofLabel: "Vesta 的不同之处",
      proof: [
        ["一份源数据", "版本化 Graph 在所有宿主中保持权威。"],
        ["一套运行时", "验证、规划、执行、缓存与诊断统一归属 Core。"],
        ["多种结果", "同一个系统可以输出几何、场、世界或引擎可消费的数据。"],
      ],
    },
    system: {
      eyebrow: "系统链路",
      title: "让意图成为可复现的结果。",
      intro:
        "每次请求只走一条可观察的执行链。不隐藏引擎分支，也不复制节点语义。",
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
