export const locales = {
  en: {
    validationNav: "User manual",
    htmlLang: "en", ogLocale: "en_US", title: "Vesta — Worlds, by you.",
    description: "An Agent-centered world creation tool in development. Shape terrain, connect systems, and keep your worlds open to change.",
    skip: "Skip to content", home: "Vesta home", navLabel: "Main navigation",
    nav: ["Vision", "Films", "In Unreal", "Agent-led creation", "Progress"],
    menu: "Menu", menuOpen: "Open navigation", menuClose: "Close navigation", languages: "Language", headerCta: "See it take shape",
    hero: {
      kicker: "A WORLD OF YOUR MAKING.", first: "Worlds,", second: "by ", emphasis: "you.",
      description: ["An Agent-centered world creation tool.", "From a first idea to a world you can keep shaping."],
      cta: "Explore the Vesta vision", ctaDetail: "IMAGINE WHAT COMES NEXT", study: "01 / THE RIFT VALLEY",
      story: ["Between mountains,", "a world finds its story."], principle: "AGENT-LED. PROCEDURALLY GROUNDED.", scroll: "Explore below", concept: "Vision concept · not current product output",
      alt: "World vision concept: a jade river threads through terraced cliffs, forests, bridges and a hill settlement. AI concept imagery, not current Vesta output.",
    },
    vision: {
      kicker: "THE VISION", title: ["Turn places you imagine", "into worlds you can shape."],
      body: "Terrain is the beginning. Roads connect settlements, buildings respond to place, and ecosystems follow water and climate. Vesta's vision is for Agents and procedural tools to understand, shape and refine these relationships together.",
      gallery: [
        { id: "city", category: "01 / CIVILISATION", title: "Make room for life.", body: "Terrain, roads, blocks and buildings", note: "Vision concept · domain tools are being developed", open: "Enlarge the city and roads vision concept", caption: "Make room for life / Cities and roads · vision concept imagery", alt: "City vision concept: a coastal town follows the hills, connecting harbor, bridges, neighborhoods and greenery. AI concept imagery." },
        { id: "biome", category: "02 / LIVING WORLDS", title: "Let nature connect.", body: "Waterways, biomes and ecosystems", note: "Vision concept · complete ecosystem creation is not yet implemented", open: "Enlarge the ecosystem vision concept", caption: "Let nature connect / Biomes and ecosystems · vision concept imagery", alt: "Ecosystem vision concept: conifers, wetlands, moss and a river form a coherent mountain valley. AI concept imagery." },
      ],
      bridge: "From landforms to environments. From individual assets to connected worlds.",
    },
    motion: {
      kicker: "REAL OUTPUT. REAL POSSIBILITIES.", title: ["Give a patch of terrain", "a character of its own."],
      body: ["These films visualize existing Vesta heightfield results.", "From continuous ridges to layered rock terraces,", "each form comes from a reusable procedural process."],
      pause: "Pause all films", play: "Play the films", mainLabel: "Side-by-side camera study of actual Ridge and Terraces results", ridgeLabel: "Orbit study of an actual Vesta Ridge heightfield result", terracesLabel: "Orbit study of an actual Vesta Terraces heightfield result",
      titleCategory: "SHAPE / TERRAIN", mainTitle: "One starting point. Different expressions.", outputLabel: ["Ridge → Terraces", "Actual samples · presentation render"], ridgeCaption: "Shape a continuous mountain ridge.", terracesCaption: "Carve a rhythm of layered rock.",
      note: "Based on actual 512² Vesta CLI output. Only the presentation camera is animated.", sourceToggle: "About these films", sourceBody: "These films visualize precomputed heightfields. They are not recordings of real-time generation, erosion over time, or the Builder interface. Both result sets share the same display relief; original heights are unchanged.", sourceLink: "Sample provenance",
    },
    unreal: {
      kicker: "FROM ASSET TO ENGINE", title: ["Take the process", "into Unreal."],
      body: "A Vesta Digital Asset carries its procedural definition and published parameters into Unreal Engine. Import a VDA, work with its parameters, and evaluate the terrain through the Vesta plugin inside the engine.",
      open: "Enlarge the real Unreal VDA demonstration", alt: "Actual Unreal Engine editor capture showing the Vesta Erosion2 VDA, exposed parameters and evaluated Landscape preview.", caption: "VDA in Unreal Engine / actual development capture",
      steps: [["01 / IMPORT", "Bring the VDA in."], ["02 / PARAMETERS", "Adjust its published controls."], ["03 / EVALUATE", "See the terrain in Unreal."]],
      note: "Current verified slice: VDA import, parameter overrides and Heightfield evaluation. Selected terrain operations use UE RHI GPU. This is not a claim that all data types, GPU operations or production delivery workflows are complete.",
    },
    agent: {
      kicker: "AN AGENT AT THE HEART OF CREATION", title: ["You bring the imagination.", "Let an Agent help you create."],
      body: "Vesta is building an Agent-centered World Builder: plan around your intent, call tools, observe results, and refine together. Professional editing capabilities will come together in the same creative environment, with manual control always available.",
      steps: [["01 / BRIEF", "Describe a place worth making.", "Turn atmosphere, environments and constraints into a clear creative direction."], ["02 / CREATE", "Connect intent to tools.", "An Agent uses controlled tools to work with the computation and asset capabilities implemented today."], ["03 / REFINE", "Look closer. Keep shaping.", "Adjust parameters, inspect the process and refine a part of the world without losing the whole."]],
      environment: "ONE CREATIVE ENVIRONMENT", builderTitle: "Create with tools, refine with an Agent", builderBody: "Builder brings together the world preview, node graph and parameter editing. Developer Agent is available inside Builder and in its own desktop app; it manages conversations, models and history. External Agents can connect to the running Builder through controlled tools.",
      mapLabel: "Agent collaboration at the center of a World Builder loop linking intent, world preview, procedural tools and manual editing", orbit: ["Creative intent", "World preview", "Procedural tools", "Manual editing"], orbitCore: "At the heart of creation",
      transition: "Node editing, parameters and result display are already taking shape in Builder. The remaining Studio capabilities are moving across in stages; the full migration and creation workflow are still in development.",
    },
    process: {
      title: ["Imagine freely.", "Stay in control of the process."], body: ["Agents move the work forward. Procedural structure keeps it editable.", "Inspect, change, undo, and keep what works", "for the next scene and the next idea."],
      alt: "World Builder development capture showing a Dragon mesh in the world viewport, its node graph and parameters.", caption: "World Builder / Dragon / October 27, 2026", note: "Actual native editor capture, with the full Dragon mesh and an attribute-processing display step. Authoring migration into Builder remains in progress.",
    },
    progress: {
      kicker: "A WORLD IN PROGRESS", title: ["An ambitious vision.", "Built on tangible progress."], body: ["Vesta is in technical-preview development.", "We are refining terrain and the authoring foundation first,", "then growing the scale and complexity of world creation."],
      stages: [
        { state: "Verified slices", style: "ready", title: "A tangible beginning.", items: ["Graph / VDA and CLI execution", "Builder node graph, parameters and result display", "CPU / GPU implementations for selected terrain operations", "Unreal Heightfield execution", "Live Scene editing through controlled Agent tools", "Developer Agent in Builder and on the desktop"] },
        { state: "In development", style: "active", title: "A connected creative experience.", items: ["Complete Studio-to-Builder authoring migration", "Asset tools, contextual help and editing consistency", "Agent-led creation, result review and repair", "Broader external Agent workflows"] },
        { state: "Long-term vision", style: "future", title: "Worlds that work together.", items: ["Terrain, roads, buildings and ecosystems", "Goal-driven planning, evaluation and repair", "Reusable assets and continuous world iteration", "Later expansion into characters and animation", "More complete engine delivery workflows"] },
      ],
      note: "Status reviewed October 27, 2026. Each study retains its original evidence date and scope. Verified slices do not imply a complete product or qualified production delivery.",
    },
    closing: { intro: "From a first idea to a world of your own.", first: "What will", second: "you create?", cta: "Follow the progress", detail: "FOLLOW THE DEVELOPMENT" },
    footer: { state: "AGENTIC WORLD CREATOR / IN DEVELOPMENT", top: "Back to top", copyright: "© 2026 Vesta" }, lightboxClose: "Close image",
  },
  zh: {
    validationNav: "用户手册",
    htmlLang: "zh-CN", ogLocale: "zh_CN", title: "Vesta — 世界，由你创造。",
    description: "正在构建的 Agent 中心世界创作工具。从地形出发，连接道路、建筑与生态，让每个世界都能持续编辑和演进。",
    skip: "跳至内容", home: "Vesta 首页", navLabel: "主导航", nav: ["世界愿景", "效果短片", "Unreal 实证", "Agent 创作", "开发进展"],
    menu: "菜单", menuOpen: "打开导航", menuClose: "关闭导航", languages: "语言", headerCta: "看见变化",
    hero: {
      kicker: "A WORLD OF YOUR MAKING.", first: "世界，", second: "由你", emphasis: "创造。", description: ["以 Agent 为中心的世界创作工具。", "从一个想法出发，塑造一个可以持续演进的世界。"], cta: "探索 Vesta 的愿景", ctaDetail: "IMAGINE WHAT COMES NEXT", study: "01 / THE RIFT VALLEY", story: ["山川之间，", "世界开始有了故事。"], principle: "AGENT-LED. PROCEDURALLY GROUNDED.", scroll: "向下探索", concept: "愿景概念影像 · 非当前产品输出", alt: "世界愿景概念：河流穿行于层状峡谷，森林、桥梁与聚落沿地形生长。AI 概念影像，非 Vesta 当前生成结果。",
    },
    vision: {
      kicker: "THE VISION", title: ["把想象中的地方，", "变成可以创造的世界。"], body: "地形是起点。道路连接聚落，建筑回应场所，生态沿水系与气候展开。Vesta 的愿景，是让 Agent 与程序化工具共同理解、塑造和迭代这些关系。",
      gallery: [
        { id: "city", category: "01 / CIVILISATION", title: "连接生活的尺度。", body: "地形、道路、街区与建筑", note: "愿景概念 · 领域能力逐步建设", open: "放大城市与道路愿景概念图", caption: "连接生活的尺度 / 城市与道路 · 愿景概念影像", alt: "城市与道路的愿景概念：沿海城市顺应山坡，桥梁、港湾、街区和绿地共同构成环境。AI 概念影像。" },
        { id: "biome", category: "02 / LIVING WORLDS", title: "让自然彼此关联。", body: "水系、生物群落与生态系统", note: "愿景概念 · 完整生态创作尚未实现", open: "放大生态愿景概念图", caption: "让自然彼此关联 / 生物群落与生态 · 愿景概念影像", alt: "生态愿景概念：森林、湿地、苔藓与河流在山谷中形成连贯生态。AI 概念影像。" },
      ], bridge: "从地貌到环境，从单个资产到连贯世界。",
    },
    motion: {
      kicker: "REAL OUTPUT. REAL POSSIBILITIES.", title: ["先让一片地形，", "有自己的性格。"], body: ["下面是 Vesta 已有高度场结果的展示短片。", "从连续山脊，到层叠岩台，", "每一种形态都来自可复用的程序化过程。"], pause: "暂停所有短片", play: "播放效果短片", mainLabel: "Ridge 与 Terraces 的真实计算结果同相机展示短片", ridgeLabel: "Ridge 连续山脊的真实计算结果环绕展示短片", terracesLabel: "Terraces 层状岩台的真实计算结果环绕展示短片", titleCategory: "SHAPE / 形态", mainTitle: "相同的起点，不同的表达。", outputLabel: ["Ridge → Terraces", "真实样本 · 展示渲染"], ridgeCaption: "塑造连绵的山脊。", terracesCaption: "刻出层叠的岩台。", note: "基于 Vesta CLI 真实输出的 512² 地形；动画仅改变展示相机。", sourceToggle: "查看展示说明", sourceBody: "这些是已计算高度场的可视化短片，不是实时生成速度、侵蚀演化过程或 Builder 界面录屏。两组样本使用相同显示起伏，源高度未改动。", sourceLink: "样本来源记录",
    },
    unreal: {
      kicker: "FROM ASSET TO ENGINE", title: ["在 Unreal 中，", "继续创造。"], body: "Vesta Digital Asset 把程序化资产定义与公开参数带进 Unreal Engine。导入 VDA，在引擎里调整参数，通过 Vesta 插件求值并查看地形结果。", open: "放大 Unreal 中运行 VDA 的真实演示", alt: "Unreal Engine 真实编辑器画面，展示 Vesta Erosion2 VDA、公开参数和求值后的 Landscape 预览。", caption: "VDA 在 Unreal Engine 中运行 / 真实开发画面", steps: [["01 / IMPORT", "把 VDA 带入引擎。"], ["02 / PARAMETERS", "调整公开参数。"], ["03 / EVALUATE", "在 Unreal 中查看地形。"]], note: "当前已验证 VDA 导入、参数覆盖和 Heightfield 执行切片；部分地形算子使用 UE RHI GPU。这不代表所有数据类型、GPU 算子或生产交付流程均已完成。",
    },
    agent: {
      kicker: "AN AGENT AT THE HEART OF CREATION", title: ["你负责想象。", "让 Agent 参与创造。"], body: "Vesta 正在构建以 Agent 为中心的 World Builder：围绕你的意图提出计划、调用工具、观察结果，再一起修正。专业编辑能力融入同一个创作环境，随时允许人工接管。", steps: [["01 / BRIEF", "说出你想去的地方。", "把环境、气氛与约束，变成清晰的创作方向。"], ["02 / CREATE", "让意图接上工具。", "Agent 通过受控工具使用当前已实现的计算与资产能力。"], ["03 / REFINE", "看见，然后继续雕琢。", "修改参数、检查过程、调整局部，让世界持续演进。"]], environment: "ONE CREATIVE ENVIRONMENT", builderTitle: "用工具塑造，与 Agent 一起完善", builderBody: "Builder 汇聚世界预览、节点图与参数编辑。Developer Agent 可在 Builder 内使用，也有独立桌面入口，负责会话、模型与历史；外部 Agent 则通过受控工具连接正在运行的 Builder。", mapLabel: "World Builder 以 Agent 协作为中心，围绕创作意图、世界预览、程序化工具和人工编辑构建创作闭环", orbit: ["创作意图", "世界预览", "程序化工具", "人工编辑"], orbitCore: "协作的中心", transition: "Builder 已有节点编辑、参数与结果显示切片。Studio 的其余能力正在分批迁入，完整迁移与连续创作流程仍在建设。",
    },
    process: {
      title: ["想象可以自由。", "过程仍然可控。"], body: ["Agent 推进工作，程序化过程保留结构。", "你可以查看、修改、撤销，并把有效的过程留下来，", "用于下一个场景、下一次创作。"], alt: "World Builder 开发实机画面：世界视口中的龙模型，以及对应节点图和参数面板。", caption: "World Builder / 龙模型 / 2026.10.27", note: "原生编辑器真实截屏，展示完整龙模型及显示前的属性处理节点。创作能力向 Builder 的完整迁移仍在进行。",
    },
    progress: {
      kicker: "A WORLD IN PROGRESS", title: ["愿景很远。", "从真实的进展出发。"], body: ["Vesta 处于技术预览开发阶段。", "当前先打磨地形与创作底座，", "再逐步拓展世界的规模和复杂度。"], stages: [
        { state: "已有验证切片", style: "ready", title: "可以看见的起点。", items: ["Graph / VDA 与 CLI 执行链", "Builder 节点图、参数与结果显示", "部分地形算子的 CPU / GPU 实现", "Unreal 高度场执行", "受控 Agent 工具编辑当前 Scene", "Builder 内嵌与独立 Developer Agent"] },
        { state: "正在建设", style: "active", title: "连续的创作体验。", items: ["Studio 创作能力向 Builder 完整迁移", "资产工具、上下文帮助与编辑一致性", "Agent 创作、结果检查与修复闭环", "更广泛的外部 Agent 工作流"] },
        { state: "长期愿景", style: "future", title: "彼此关联的世界。", items: ["地形、道路、建筑与生态组合", "围绕目标的计划、评价与修复", "可复用资产与持续世界迭代", "角色与动画的后续扩展", "更完整的引擎交付流程"] },
      ], note: "进展核对：2026.10.27。各实证保留原有日期与范围；已有切片不代表完整产品或生产交付流程已经验收。",
    },
    closing: { intro: "从一个想法，到一个世界。", first: "What will", second: "you create?", cta: "了解当前进展", detail: "FOLLOW THE DEVELOPMENT" },
    footer: { state: "AGENTIC WORLD CREATOR / IN DEVELOPMENT", top: "返回顶部", copyright: "© 2026 Vesta" }, lightboxClose: "关闭大图",
  },
};
