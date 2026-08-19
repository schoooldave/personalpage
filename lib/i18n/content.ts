export type Locale = "zh-CN" | "en" | "ja";

export type SiteContent = {
  nav: {
    mainLabel: string;
    brandPersonal: string;
    brandWorkTitle: string;
    brandWorkSubtitle: string;
    workFiles: string;
    fieldNotes: string;
    about: string;
    enterWork: string;
    enterPersonal: string;
    switchView: string;
  };
  home: {
    workHero: {
      eyebrow: string;
      title: string;
      body: string;
      primaryAction: string;
      orbit: string[];
      industry: { label: string; caption: string };
    };
    careerArc: {
      index: string;
      label: string;
      caption: string;
      title: string;
      intro: string;
      steps: Array<{ title: string; headline: string; body: string; meta: string }>;
    };
    cases: { index: string; label: string; caption: string; open: string };
    recruiterBar: { label: string; body: string; about: string; email: string };
  };
  personalHero: {
    eyebrow: string;
    title: string;
    emphasis: string;
    body: string;
    scroll: string;
    toggle: string;
  };
  personalWorld: {
    reading: { label: string; title: string; body: string };
    piano: { label: string; title: string; body: string };
    ai: { label: string; title: string; body: string };
    ideas: { label: string; title: string; emphasis: string; items: string[] };
    ending: { title: string; body: string; about: string; work: string; signature: string };
  };
  aiOutlookPreview: {
    index: string;
    label: string;
    caption: string;
    eyebrow: string;
    title: string;
    lead: string;
    emphasis: string[];
    cta: string;
  };
  about: {
    nav: { home: string; personal: string };
    hero: { eyebrow: string; title: string; lead: string };
    timeline: {
      index: string;
      label: string;
      caption: string;
      steps: Array<{ period: string; title: string; body: string }>;
    };
    strengths: {
      eyebrow: string;
      title: string;
      items: Array<{ title: string; body: string }>;
    };
    contact: {
      eyebrow: string;
      title: string;
      resumeLabel: string;
      resumeTitle: string;
      resumeBody: string;
      resumeAction: string;
      contactLabel: string;
      email: string;
      contactBody: string;
      emailAction: string;
    };
    footer: { home: string; cases: string };
  };
};

const zhSiteContent: SiteContent = {
  nav: {
    mainLabel: "主导航",
    brandPersonal: "DAVE / FIELD NOTES",
    brandWorkTitle: "现代工作笔记",
    brandWorkSubtitle: "Modern Field Notes",
    workFiles: "工作档案",
    fieldNotes: "Field Notes",
    about: "关于我",
    enterWork: "进入工作世界 ↗",
    enterPersonal: "回到个人世界 ↗",
    switchView: "切换视角",
  },
  home: {
    workHero: {
      eyebrow: "MODERN FIELD NOTES / 01",
      title: "从一线，理解问题；\n在系统，解决问题；\n让管理，与系统共变。",
      body: "从一线现场识别问题，在系统中形成方案，让管理机制同步改变。",
      primaryAction: "查看代表项目",
      orbit: ["现场", "产品", "组织", "增长"],
      industry: { label: "FMCG / 快消品数字化", caption: "连接业务与系统" },
    },
    careerArc: {
      index: "01",
      label: "能力路径",
      caption: "CAPABILITY ARC",
      title: "从业务洞察，\n到系统化解题",
      intro: "在 FMCG 一线业务与数字化实践之间，形成从问题识别、系统构建到管理协同的能力路径。",
      steps: [
        {
          title: "业务洞察",
          headline: "从一线业务中识别关键问题",
          body: "通过一线市场与终端执行，理解渠道、门店、销售与经销商之间的真实业务关系，结合业务目标、执行流程与现场结果，识别影响落地的关键差距。",
          meta: "一线业务实践 · 2020—2022\n代表实践：终端门店执行 · 渠道现场反馈",
        },
        {
          title: "数字化构建",
          headline: "将业务问题转化为系统能力",
          body: "从业务流程、角色协同与数据关系出发，完成需求分析、方案设计、产品协同与上线验证，将一线问题转化为可运行、可追踪的产品与系统方案。",
          meta: "数字化产品与系统实践 · 2022—2023\n代表实践：SFA 深度迭代 · 数据权限治理",
        },
        {
          title: "管理变革",
          headline: "推动管理机制与数字化能力协同演进",
          body: "围绕业务目标、组织协同与数据反馈，推动管理规则与工作方式持续调整，使数字化能力从系统应用延伸到日常管理，并形成可持续的运行机制。",
          meta: "产品经理职能 · 2023—2025\n代表实践：全国分销数据治理项目",
        },
      ],
    },
    cases: { index: "03", label: "代表项目", caption: "SELECTED WORK", open: "打开项目档案" },
    recruiterBar: {
      label: "FOR RECRUITERS",
      body: "如果你正在寻找能把业务现场、产品方案和组织协同串起来的人，可以从这里开始。",
      about: "先认识我",
      email: "发送邮件",
    },
  },
  personalHero: {
    eyebrow: "A PERSONAL UNIVERSE, ALWAYS IN MOTION",
    title: "在现实里生活，\n也给自己保留一点",
    emphasis: "自由",
    body: "我喜欢读书，也想学会钢琴。生活让我不得不向钱看齐，于是我开始用 AI 试探更多可能——在理想、压力和行动之间，慢慢搭建属于自己的世界。",
    scroll: "SCROLL / FOLLOW THE ORBIT ↓",
    toggle: "切换视角",
  },
  personalWorld: {
    reading: {
      label: "READING / INNER FREEDOM",
      title: "阅读，是为了看见那些无形的枷锁。",
      body: "读书让我更深地认识世界。理解得越多，越有机会突破被习惯、环境和已有经验限制的思维，让自己获得更真实的自由。",
    },
    piano: {
      label: "PIANO / SOMEDAY",
      title: "有一天，想真正学会钢琴。",
      body: "它的声音很优美，也能让人安静下来。我想探索音乐能带来的情绪——这是一件不着急，但愿意长期靠近的事。",
    },
    ai: {
      label: "AI / IDEAS IN MOTION",
      title: "想到什么，就先让它靠近现实一点。",
      body: "语言学习、线下活动、自我约束与成长记录……这些想法时不时冒出来。我想试试，AI 能不能把其中一些变成真正有用、也能创造收入的产品。",
    },
    ideas: {
      label: "IDEA PARKING ORBIT",
      title: "还没有完成，\n但已经开始",
      emphasis: "发光",
      items: ["AI 语言学习伙伴", "附近值得去的展览", "博物馆与博览会地图", "自我约束记录", "成长轨迹与反馈"],
    },
    ending: {
      title: "这是我的另一面。\n工作，只是其中一部分。",
      body: "继续认识我，或者进入那个更理性、更结构化的工作世界。",
      about: "关于我 ↗",
      work: "进入工作世界 ↗",
      signature: "BUILT WHILE FIGURING THINGS OUT",
    },
  },
  aiOutlookPreview: {
    index: "04",
    label: "AI 能力展望",
    caption: "FROM PRACTICE TO AI",
    eyebrow: "FROM DIGITAL PRACTICE TO AI CAPABILITY",
    title: "从真实业务问题，走向下一代工作方式",
    lead: "我关注的不是给系统增加一个 AI 功能，而是让它开始理解业务现场、辅助判断，并推动下一步行动。",
    emphasis: ["理解业务现场", "辅助判断", "推动下一步行动"],
    cta: "完整 AI 能力展望",
  },
  about: {
    nav: { home: "DAVE / FIELD NOTES", personal: "回到个人世界 ↗" },
    hero: {
      eyebrow: "ABOUT / A WORKING METHOD",
      title: "我不是只做系统，\n我负责让系统在现场发生作用。",
      lead: "从一线业务到总部产品与项目主导，我持续参与快消行业数字化实践。擅长把模糊的业务问题，整理成可以被理解、被执行、被追踪的系统。",
    },
    timeline: {
      index: "01",
      label: "经历路径",
      caption: "CAREER ARC",
      steps: [
        { period: "2020—2022", title: "区域渠道督导", body: "接触门店、经销商和销售执行，建立对业务现场的直接理解。" },
        { period: "2022—2025", title: "销售数字化产品负责人（SFA / DMS）", body: "负责 SFA 与 DMS 产品体系，持续推进销售执行产品迭代，并主导全国分销数据治理项目的方案建设、上线推广、指标治理与管理机制落地。" },
        { period: "2025—2026", title: "阶段性空档期", body: "处理个人生活事项，系统探索 AI 应用，并重新梳理职业经验与下一阶段方向。" },
      ],
    },
    strengths: {
      eyebrow: "WHAT I BRING",
      title: "我能带来的，不只是一个交付结果。",
      items: [
        { title: "现场判断", body: "从一线督导和经销商沟通开始，先理解问题如何发生，再决定系统如何介入。" },
        { title: "产品推进", body: "能够独立完成需求梳理、方案设计、数据结构、页面设计、研发协作和上线验证。" },
        { title: "组织协同", body: "在业务、销售、经销商、研发和管理部门之间建立共同语言，把复杂流程推进到可执行。" },
        { title: "持续治理", body: "上线不是终点，会继续观察使用数据、异常来源、培训效果和规则是否真正被执行。" },
      ],
    },
    contact: {
      eyebrow: "OPEN TO A CONVERSATION",
      title: "如果你正在寻找这样的产品伙伴，欢迎继续了解。",
      resumeLabel: "RESUME",
      resumeTitle: "简历版本待接入",
      resumeBody: "正式 PDF 将在后续加入，当前保留占位入口。",
      resumeAction: "准备中 ↗",
      contactLabel: "CONTACT",
      email: "schooldave@live.com",
      contactBody: "欢迎通过邮件交流产品、项目和数字化业务机会。",
      emailAction: "发送邮件 ↗",
    },
    footer: { home: "← 回到首页", cases: "查看代表项目 ↗" },
  },
};

const enSiteContent: SiteContent = {
  nav: {
    mainLabel: "Main navigation",
    brandPersonal: "DAVE / FIELD NOTES",
    brandWorkTitle: "Modern Field Notes",
    brandWorkSubtitle: "Modern Field Notes",
    workFiles: "Work files",
    fieldNotes: "Field Notes",
    about: "About",
    enterWork: "Enter work world ↗",
    enterPersonal: "Back to personal world ↗",
    switchView: "Switch view",
  },
  home: {
    workHero: {
      eyebrow: "MODERN FIELD NOTES / 01",
      title: "Understand problems in the field;\nsolve them in systems;\nlet management and systems evolve together.",
      body: "I identify problems from frontline operations, turn them into system solutions, and help management mechanisms change with them.",
      primaryAction: "View selected work",
      orbit: ["Field", "Product", "Organization", "Growth"],
      industry: { label: "FMCG / Consumer Goods Digitalization", caption: "Connecting business and systems" },
    },
    careerArc: {
      index: "01",
      label: "Capability path",
      caption: "CAPABILITY ARC",
      title: "From business insight\nto systematic problem solving",
      intro: "Between frontline FMCG operations and digital product practice, I have built a path from problem discovery to system design and management coordination.",
      steps: [
        {
          title: "Business insight",
          headline: "Identify the real problems from frontline work",
          body: "Through market and store execution work, I learned the real relationships among channels, stores, sales teams and distributors, then used business goals, workflows and field outcomes to identify the gaps that block execution.",
          meta: "Frontline business practice · 2020—2022\nRepresentative work: store execution · channel feedback",
        },
        {
          title: "Digital system building",
          headline: "Turn business problems into system capabilities",
          body: "Starting from workflows, role coordination and data relationships, I handled requirement analysis, solution design, product collaboration and launch validation, turning field problems into runnable and traceable product solutions.",
          meta: "Digital product and system practice · 2022—2023\nRepresentative work: SFA deep iteration · data permission governance",
        },
        {
          title: "Management change",
          headline: "Align management mechanisms with digital capabilities",
          body: "Around business targets, organizational coordination and data feedback, I helped management rules and ways of working adjust continuously, so digital capabilities could move from system usage into daily management.",
          meta: "Product manager function · 2023—2025\nRepresentative work: nationwide distribution data governance project",
        },
      ],
    },
    cases: { index: "03", label: "Selected work", caption: "SELECTED WORK", open: "Open project file" },
    recruiterBar: {
      label: "FOR RECRUITERS",
      body: "If you are looking for someone who can connect field reality, product solutions and organizational coordination, this is a good place to start.",
      about: "Meet me first",
      email: "Send email",
    },
  },
  personalHero: {
    eyebrow: "A PERSONAL UNIVERSE, ALWAYS IN MOTION",
    title: "Living in reality,\nwhile keeping a little",
    emphasis: "freedom",
    body: "I love reading, and I want to truly learn piano someday. Life also pushed me to think more seriously about money, so I started using AI to test more possibilities, slowly building my own world between ideals, pressure and action.",
    scroll: "SCROLL / FOLLOW THE ORBIT ↓",
    toggle: "Switch view",
  },
  personalWorld: {
    reading: {
      label: "READING / INNER FREEDOM",
      title: "Reading helps me notice invisible constraints.",
      body: "Books help me understand the world more deeply. The more I understand, the more likely I am to break through habits, environment and past experience, and get closer to a real sense of freedom.",
    },
    piano: {
      label: "PIANO / SOMEDAY",
      title: "Someday, I want to truly learn piano.",
      body: "Its sound is beautiful and calming. I want to explore the emotions music can bring. It is not urgent, but it is something I am willing to move toward for a long time.",
    },
    ai: {
      label: "AI / IDEAS IN MOTION",
      title: "When an idea appears, I try to move it closer to reality.",
      body: "Language learning, offline activities, self-discipline records, growth tracking. These ideas keep surfacing. I want to see whether AI can turn some of them into useful products that can also create income.",
    },
    ideas: {
      label: "IDEA PARKING ORBIT",
      title: "Not finished yet,\nbut already starting to",
      emphasis: "glow",
      items: ["AI language learning partner", "Nearby exhibitions worth visiting", "Museum and expo map", "Self-discipline log", "Growth timeline and feedback"],
    },
    ending: {
      title: "This is another side of me.\nWork is only one part.",
      body: "Keep getting to know me, or step into the more rational, more structured work world.",
      about: "About me ↗",
      work: "Enter work world ↗",
      signature: "BUILT WHILE FIGURING THINGS OUT",
    },
  },
  aiOutlookPreview: {
    index: "04",
    label: "AI capability outlook",
    caption: "FROM PRACTICE TO AI",
    eyebrow: "FROM DIGITAL PRACTICE TO AI CAPABILITY",
    title: "From real business problems to the next way of working",
    lead: "I am not focused on adding an AI feature to a system. I care about helping systems understand field reality, support judgment, and move the next action forward.",
    emphasis: ["understand field reality", "support judgment", "move the next action forward"],
    cta: "Full AI capability outlook",
  },
  about: {
    nav: { home: "DAVE / FIELD NOTES", personal: "Back to personal world ↗" },
    hero: {
      eyebrow: "ABOUT / A WORKING METHOD",
      title: "I do not just build systems.\nI am responsible for making them work in the field.",
      lead: "From frontline business work to headquarters product and project ownership, I have stayed close to FMCG digitalization practice. I am good at turning ambiguous business problems into systems that can be understood, executed and tracked.",
    },
    timeline: {
      index: "01",
      label: "Career arc",
      caption: "CAREER ARC",
      steps: [
        { period: "2020—2022", title: "Regional channel supervisor", body: "Worked directly with stores, distributors and sales execution, building a firsthand understanding of business reality." },
        { period: "2022—2025", title: "Sales digital product owner (SFA / DMS)", body: "Owned the SFA and DMS product systems, continuously advanced sales execution product iterations, and led the nationwide distribution data governance project across solution design, rollout, metric governance and management adoption." },
        { period: "2025—2026", title: "Transitional personal interval", body: "Handled personal life matters, systematically explored AI applications, and reorganized my professional experience and next-stage direction." },
      ],
    },
    strengths: {
      eyebrow: "WHAT I BRING",
      title: "What I bring is more than a delivery result.",
      items: [
        { title: "Field judgment", body: "I start from frontline supervision and distributor conversations, understand how problems happen, then decide how a system should intervene." },
        { title: "Product execution", body: "I can independently handle requirements, solution design, data structures, page design, engineering collaboration and launch validation." },
        { title: "Organizational coordination", body: "I build a shared language among business teams, sales, distributors, engineering and management, moving complex processes toward execution." },
        { title: "Continuous governance", body: "Launch is not the endpoint. I keep watching usage data, exception sources, training effects and whether rules are truly executed." },
      ],
    },
    contact: {
      eyebrow: "OPEN TO A CONVERSATION",
      title: "If you are looking for this kind of product partner, welcome to keep exploring.",
      resumeLabel: "RESUME",
      resumeTitle: "Resume version pending",
      resumeBody: "The formal PDF will be added later. For now, this entry is kept as a placeholder.",
      resumeAction: "Coming soon ↗",
      contactLabel: "CONTACT",
      email: "schooldave@live.com",
      contactBody: "Feel free to email me about product, project and digital business opportunities.",
      emailAction: "Send email ↗",
    },
    footer: { home: "← Back to home", cases: "View selected work ↗" },
  },
};

const jaSiteContent: SiteContent = {
  nav: {
    mainLabel: "メインナビゲーション",
    brandPersonal: "DAVE / FIELD NOTES",
    brandWorkTitle: "現代の仕事ノート",
    brandWorkSubtitle: "Modern Field Notes",
    workFiles: "仕事の記録",
    fieldNotes: "Field Notes",
    about: "私について",
    enterWork: "仕事の世界へ ↗",
    enterPersonal: "個人の世界へ戻る ↗",
    switchView: "視点を切り替える",
  },
  home: {
    workHero: {
      eyebrow: "MODERN FIELD NOTES / 01",
      title: "現場で問題を理解し、\nシステムで解き、\n管理とシステムを共に変えていく。",
      body: "一線の現場から問題を見つけ、システム上の解決策に落とし込み、管理の仕組みも同時に変えていきます。",
      primaryAction: "代表プロジェクトを見る",
      orbit: ["現場", "プロダクト", "組織", "成長"],
      industry: { label: "FMCG / 消費財デジタル化", caption: "業務とシステムをつなぐ" },
    },
    careerArc: {
      index: "01",
      label: "能力の軌跡",
      caption: "CAPABILITY ARC",
      title: "業務洞察から\nシステムで解く力へ",
      intro: "FMCG の一線業務とデジタル実践の間で、問題発見、システム構築、管理連携へとつながる能力の軌跡を形にしてきました。",
      steps: [
        {
          title: "業務洞察",
          headline: "一線業務から重要な問題を見つける",
          body: "市場と店舗の実行を通じて、チャネル、店舗、営業、販売代理店の実際の関係を理解し、業務目標、実行プロセス、現場結果を合わせて、定着を妨げる差分を見つけます。",
          meta: "一線業務実践 · 2020—2022\n代表実践：店舗実行 · チャネル現場フィードバック",
        },
        {
          title: "デジタル構築",
          headline: "業務問題をシステム能力へ変換する",
          body: "業務プロセス、役割連携、データ関係から出発し、要件分析、方案設計、プロダクト連携、リリース検証を行い、一線の問題を動き、追跡できるプロダクトとシステムの方案に変えます。",
          meta: "デジタルプロダクトとシステム実践 · 2022—2023\n代表実践：SFA 深度改善 · データ権限ガバナンス",
        },
        {
          title: "管理変革",
          headline: "管理の仕組みとデジタル能力を共に進化させる",
          body: "業務目標、組織連携、データフィードバックを軸に、管理ルールと働き方の継続的な調整を進め、デジタル能力をシステム利用から日常管理へ広げます。",
          meta: "プロダクトマネージャー職能 · 2023—2025\n代表実践：全国分销データガバナンスプロジェクト",
        },
      ],
    },
    cases: { index: "03", label: "代表プロジェクト", caption: "SELECTED WORK", open: "プロジェクト記録を開く" },
    recruiterBar: {
      label: "FOR RECRUITERS",
      body: "業務現場、プロダクト方案、組織連携をつなげられる人を探しているなら、ここから見てください。",
      about: "まず私を知る",
      email: "メールを送る",
    },
  },
  personalHero: {
    eyebrow: "A PERSONAL UNIVERSE, ALWAYS IN MOTION",
    title: "現実を生きながら、\n自分の中に少しの",
    emphasis: "自由",
    body: "本を読むことが好きで、いつか本当にピアノも弾けるようになりたい。生活はお金にも向き合うことを求めてきたので、AI を使ってより多くの可能性を試し始めました。理想、プレッシャー、行動の間で、自分の世界を少しずつ作っています。",
    scroll: "SCROLL / FOLLOW THE ORBIT ↓",
    toggle: "視点を切り替える",
  },
  personalWorld: {
    reading: {
      label: "READING / INNER FREEDOM",
      title: "読書は、見えない鎖に気づくためのもの。",
      body: "本は世界をより深く理解させてくれます。理解が増えるほど、習慣、環境、過去の経験に縛られた考え方を越え、本当の自由に近づける可能性が高まります。",
    },
    piano: {
      label: "PIANO / SOMEDAY",
      title: "いつか、本当にピアノを学びたい。",
      body: "その音は美しく、人を静かにしてくれます。音楽がもたらす感情を探ってみたい。急ぐことではないけれど、長く近づいていきたいことです。",
    },
    ai: {
      label: "AI / IDEAS IN MOTION",
      title: "思いついたことを、まず少し現実に近づける。",
      body: "語学学習、オフライン活動、自己規律の記録、成長の記録。こうしたアイデアが時々浮かびます。AI がその一部を、本当に役に立ち、収入も生み出せるプロダクトに変えられるか試したいと思っています。",
    },
    ideas: {
      label: "IDEA PARKING ORBIT",
      title: "まだ完成していない。\nでも、もう",
      emphasis: "光り始めている",
      items: ["AI 語学学習パートナー", "近くで行きたい展覧会", "博物館と博覧会のマップ", "自己規律の記録", "成長軌跡とフィードバック"],
    },
    ending: {
      title: "これは私のもう一つの面。\n仕事は、その一部にすぎません。",
      body: "さらに私を知るか、より理性的で構造化された仕事の世界へ進んでください。",
      about: "私について ↗",
      work: "仕事の世界へ ↗",
      signature: "BUILT WHILE FIGURING THINGS OUT",
    },
  },
  aiOutlookPreview: {
    index: "04",
    label: "AI 能力展望",
    caption: "FROM PRACTICE TO AI",
    eyebrow: "FROM DIGITAL PRACTICE TO AI CAPABILITY",
    title: "現実の業務問題から、次の働き方へ",
    lead: "私が注目しているのは、システムに AI 機能を一つ足すことではありません。システムが業務現場を理解し、判断を助け、次の行動を進められるようにすることです。",
    emphasis: ["業務現場を理解する", "判断を助ける", "次の行動を進める"],
    cta: "AI 能力展望を読む",
  },
  about: {
    nav: { home: "DAVE / FIELD NOTES", personal: "個人の世界へ戻る ↗" },
    hero: {
      eyebrow: "ABOUT / A WORKING METHOD",
      title: "私はシステムを作るだけではありません。\n現場で機能させることに責任を持ちます。",
      lead: "一線業務から本部のプロダクトとプロジェクト主導まで、FMCG 業界のデジタル化実践に継続して関わってきました。曖昧な業務問題を、理解でき、実行でき、追跡できるシステムへ整理することが得意です。",
    },
    timeline: {
      index: "01",
      label: "経験の軌跡",
      caption: "CAREER ARC",
      steps: [
        { period: "2020—2022", title: "地域チャネルスーパーバイザー", body: "店舗、販売代理店、営業実行に直接触れ、業務現場への直接的な理解を築きました。" },
        { period: "2022—2025", title: "営業デジタルプロダクト責任者（SFA / DMS）", body: "SFA と DMS のプロダクト体系を担当し、営業実行プロダクトの継続的な改善を進め、全国分销データガバナンスプロジェクトの方案構築、展開、指標治理、管理机制の定着を主導しました。" },
        { period: "2025—2026", title: "一時的な空白期間", body: "個人生活上の事情に対応し、AI 応用を体系的に探索しながら、職業経験と次の方向性を整理しました。" },
      ],
    },
    strengths: {
      eyebrow: "WHAT I BRING",
      title: "私が提供できるのは、単なる納品結果ではありません。",
      items: [
        { title: "現場判断", body: "一線監督と販売代理店との対話から始め、問題がどのように起きるかを先に理解し、その後でシステムがどう介入すべきかを判断します。" },
        { title: "プロダクト推進", body: "要件整理、方案設計、データ構造、画面設計、開発連携、リリース検証を独立して進められます。" },
        { title: "組織連携", body: "業務、営業、販売代理店、開発、管理部門の間に共通言語を作り、複雑なプロセスを実行可能な状態へ進めます。" },
        { title: "継続的ガバナンス", body: "リリースは終点ではありません。利用データ、例外の発生源、研修効果、ルールが本当に実行されているかを継続して観察します。" },
      ],
    },
    contact: {
      eyebrow: "OPEN TO A CONVERSATION",
      title: "このようなプロダクトパートナーを探しているなら、ぜひ続けてご覧ください。",
      resumeLabel: "RESUME",
      resumeTitle: "履歴書バージョンは準備中",
      resumeBody: "正式な PDF は今後追加予定です。現在は入口だけを残しています。",
      resumeAction: "準備中 ↗",
      contactLabel: "CONTACT",
      email: "schooldave@live.com",
      contactBody: "プロダクト、プロジェクト、デジタル業務の機会について、メールでお気軽にご連絡ください。",
      emailAction: "メールを送る ↗",
    },
    footer: { home: "← ホームへ戻る", cases: "代表プロジェクトを見る ↗" },
  },
};

export const siteContent: Record<Locale, SiteContent> = {
  "zh-CN": zhSiteContent,
  en: enSiteContent,
  ja: jaSiteContent,
};
