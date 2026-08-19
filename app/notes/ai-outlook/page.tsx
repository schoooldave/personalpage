import Link from "next/link";
import { getRequestLocale } from "@/lib/i18n/server";
import styles from "../system-process/system-process.module.css";

const copy = {
  "zh-CN": {
    navLabel: "Field Notes 导航",
    brand: "现代工作笔记",
    noteLabel: "FMCG FIELD NOTES / 04",
    number: "04",
    hero: {
      eyebrow: "FROM DIGITAL PRACTICE TO AI CAPABILITY",
      title: "从真实业务问题，走向下一代工作方式",
      subtitle: "我关注的不是给系统增加一个 AI 功能，而是让它开始理解业务现场、辅助判断，并推动下一步行动。",
      lead: "AI 展望不是对过去项目的重新包装，而是从真实业务问题继续向前推演。",
      asideTitle: "这篇文章讨论什么？",
      asideBody: "当数据、系统和组织之间仍有断点，AI 可以在哪些环节真正帮助业务？",
    },
    compare: {
      title: "AI 的价值，不在于增加一个入口，而在于缩短问题到行动的距离。",
      label: "FROM PROBLEM TO ACTION",
      understanding: { small: "理解", title: "先看懂业务现场", itemTitle: "识别异常", body: "从库存、分销、门店和执行数据中发现值得关注的变化。" },
      judgment: { small: "判断", title: "帮助人理解问题", itemTitle: "解释原因", body: "把异常放回业务情境，帮助角色理解发生了什么。" },
    },
    sections: [
      {
        index: "数据 / 从记录到判断",
        title: "数据需要先被理解，才可能产生价值。",
        paragraphs: [
          "在分销数据治理中，系统能够获得经销商上传的数据，但数据本身并不会自动变成经营判断。下一步的 AI 能力，应该帮助识别异常、解释变化，并把信息转成业务角色能够理解的行动线索。",
          "这不是替代销售或管理者做决定，而是减少他们在整理、比对和定位问题上的重复工作。",
        ],
        quote: "让数据从“被提交”走向“能被使用”。",
        sourceSmall: "实践来源 / DMS",
        sourceTitle: "分销数据治理项目",
        source: "原始文件解析、上传治理、异常处理和管理追踪，为 AI 识别与解释提供了真实问题场景。",
        sourceLink: "查看 DMS 项目 ↗",
        sourceHref: "/cases/dms",
      },
      {
        index: "执行 / 从填报到协助",
        title: "AI 应该首先减少一线的重复负担。",
        paragraphs: [
          "销售执行中，复杂的门店标准往往被拆成大量字段、选择项和评分规则。一线需要花时间完成记录，系统却不一定能减少判断成本。",
          "通过图片识别、语音输入和智能预填，AI 可以辅助识别门店陈列、产品铺货与执行结果，让销售把更多时间放回门店沟通和业务改善。",
        ],
        quote: "从“完成填报”走向“改善执行”。",
        sourceSmall: "实践来源 / SFA",
        sourceTitle: "销售执行产品线",
        source: "门店评分、陈列标准和一线填写负担，构成了 AI 识别与自动采集的真实应用基础。",
        sourceLink: "查看 SFA 项目 ↗",
        sourceHref: "/cases/sfa",
      },
      {
        index: "组织 / 从建议到行动",
        title: "AI 可以辅助判断，但不能替代组织协同。",
        paragraphs: [
          "AI 能够识别问题、解释原因并给出建议，但目标设定、利益协调、责任分配和最终决策仍然属于组织。真正有效的 AI，需要进入已有的流程和管理机制，成为角色之间更短的反馈链路。",
          "因此，AI 的落地不是单独部署一个模型，而是重新思考问题如何被发现、分派、处理和反馈。",
        ],
        quote: "AI 增强人的判断，组织承接判断的结果。",
        sourceSmall: "能力展望 / 04",
        sourceTitle: "从项目经验继续向前",
        source: "未来的重点不是预测一个漂亮的结果，而是让问题更早被看见，让下一步动作更容易发生。",
      },
    ],
    ending: {
      mark: "→",
      title: "下一代工作方式，不是让系统替人工作，而是让人更少被系统的重复工作拖住。",
      body: "这也是我从数字化项目继续走向 AI 能力时，最想保留的判断。",
    },
    footerHome: "← 回到工作首页",
    footerNote: "从真实问题出发，继续推演下一步。",
  },
  en: {
    navLabel: "Field Notes navigation",
    brand: "Modern Work Notes",
    noteLabel: "FMCG FIELD NOTES / 04",
    number: "04",
    hero: {
      eyebrow: "FROM DIGITAL PRACTICE TO AI CAPABILITY",
      title: "From Real Business Problems to the Next Way of Working",
      subtitle: "I am not focused on adding an AI feature to a system, but on helping it understand the field, support judgment, and move the next action forward.",
      lead: "This AI outlook is not a repackaging of past projects. It is a continuation from real business problems.",
      asideTitle: "What does this note discuss?",
      asideBody: "When data, systems, and organizations still have gaps between them, where can AI genuinely help the business?",
    },
    compare: {
      title: "AI's value is not another entry point. It is shortening the distance from problem to action.",
      label: "FROM PROBLEM TO ACTION",
      understanding: { small: "Understand", title: "Read the business field first", itemTitle: "Detect anomalies", body: "Find changes worth attention across inventory, distribution, store, and execution data." },
      judgment: { small: "Judge", title: "Help people understand the problem", itemTitle: "Explain causes", body: "Put anomalies back into business context so each role can understand what happened." },
    },
    sections: [
      {
        index: "Data / From records to judgment",
        title: "Data needs to be understood before it can create value.",
        paragraphs: [
          "In distribution data governance, the system can receive data uploaded by distributors, but the data itself does not automatically become operating judgment. The next AI capability should help detect anomalies, explain changes, and turn information into action cues that business roles can understand.",
          "This is not about replacing salespeople or managers in decision-making. It is about reducing repetitive work in organizing, comparing, and locating problems.",
        ],
        quote: "Move data from being submitted to being usable.",
        sourceSmall: "Practice source / DMS",
        sourceTitle: "Distribution Data Governance Project",
        source: "Raw file parsing, upload governance, exception handling, and management tracking provide real problem scenarios for AI detection and explanation.",
        sourceLink: "View DMS project ↗",
        sourceHref: "/cases/dms",
      },
      {
        index: "Execution / From reporting to assistance",
        title: "AI should first reduce repetitive burden for frontline teams.",
        paragraphs: [
          "In sales execution, complex store standards are often split into many fields, choices, and scoring rules. Frontline teams spend time completing records, while the system may not reduce the cost of judgment.",
          "Through image recognition, voice input, and intelligent prefilling, AI can help identify store displays, product availability, and execution results, giving sales teams more time for store communication and business improvement.",
        ],
        quote: "Move from completing reports to improving execution.",
        sourceSmall: "Practice source / SFA",
        sourceTitle: "Sales Execution Product Line",
        source: "Store scoring, display standards, and frontline reporting burden form the real application base for AI recognition and automated collection.",
        sourceLink: "View SFA project ↗",
        sourceHref: "/cases/sfa",
      },
      {
        index: "Organization / From advice to action",
        title: "AI can support judgment, but it cannot replace organizational coordination.",
        paragraphs: [
          "AI can detect problems, explain causes, and offer suggestions, but goal setting, interest alignment, responsibility assignment, and final decisions still belong to the organization. Effective AI needs to enter existing processes and management mechanisms, becoming a shorter feedback chain between roles.",
          "So AI implementation is not just deploying a model. It is rethinking how problems are discovered, assigned, handled, and fed back.",
        ],
        quote: "AI strengthens human judgment. The organization carries the result of that judgment.",
        sourceSmall: "Capability outlook / 04",
        sourceTitle: "Continuing Forward from Project Experience",
        source: "The future focus is not predicting an impressive result, but making problems visible earlier and making the next action easier to take.",
      },
    ],
    ending: {
      mark: "→",
      title: "The next way of working is not about systems replacing people, but about people being less trapped by repetitive system work.",
      body: "That is the judgment I most want to keep as I move from digital projects toward AI capability.",
    },
    footerHome: "← Back to Work Home",
    footerNote: "Start from real problems and keep reasoning toward the next step.",
  },
  ja: {
    navLabel: "Field Notes ナビゲーション",
    brand: "現代の仕事ノート",
    noteLabel: "FMCG FIELD NOTES / 04",
    number: "04",
    hero: {
      eyebrow: "FROM DIGITAL PRACTICE TO AI CAPABILITY",
      title: "実際の業務課題から、次世代の働き方へ",
      subtitle: "私が見ているのは、システムに AI 機能を一つ足すことではなく、現場を理解し、判断を支え、次の行動を前に進める力です。",
      lead: "AI の展望は過去プロジェクトの言い換えではなく、実際の業務課題から続く推論です。",
      asideTitle: "この記事で扱うこと",
      asideBody: "データ、システム、組織の間にまだ断点があるとき、AI はどの場面で本当に業務を助けられるのか。",
    },
    compare: {
      title: "AI の価値は入口を増やすことではなく、問題から行動までの距離を短くすることにあります。",
      label: "FROM PROBLEM TO ACTION",
      understanding: { small: "理解", title: "まず業務現場を読み取る", itemTitle: "異常を見つける", body: "在庫、流通、店舗、実行データから注目すべき変化を見つけます。" },
      judgment: { small: "判断", title: "人が問題を理解できるようにする", itemTitle: "原因を説明する", body: "異常を業務文脈に戻し、各役割が何が起きたのかを理解できるようにします。" },
    },
    sections: [
      {
        index: "データ / 記録から判断へ",
        title: "データは理解されて初めて価値を生みます。",
        paragraphs: [
          "流通データガバナンスでは、システムは代理店がアップロードしたデータを取得できます。しかしデータそのものが自動的に経営判断になるわけではありません。次の AI 能力は、異常を見つけ、変化を説明し、業務担当者が理解できる行動の手がかりへ変えるべきです。",
          "これは営業や管理者の意思決定を置き換えることではなく、整理、比較、問題特定にかかる反復作業を減らすことです。",
        ],
        quote: "データを「提出されたもの」から「使えるもの」へ。",
        sourceSmall: "実践ソース / DMS",
        sourceTitle: "流通データガバナンスプロジェクト",
        source: "原始ファイル解析、アップロード管理、例外処理、管理追跡が、AI による検知と説明の現実的な課題場面を提供しました。",
        sourceLink: "DMS プロジェクトを見る ↗",
        sourceHref: "/cases/dms",
      },
      {
        index: "実行 / 入力から支援へ",
        title: "AI はまず、現場の反復負担を減らすべきです。",
        paragraphs: [
          "営業実行では、複雑な店舗基準が多くの項目、選択肢、採点ルールに分解されがちです。現場は記録に時間を使いますが、システムが判断コストを減らすとは限りません。",
          "画像認識、音声入力、スマートな事前入力により、AI は店舗陳列、商品展開、実行結果の把握を支援し、営業が店舗との対話や業務改善により多くの時間を戻せるようにします。",
        ],
        quote: "「入力を完了する」から「実行を改善する」へ。",
        sourceSmall: "実践ソース / SFA",
        sourceTitle: "営業実行プロダクトライン",
        source: "店舗採点、陳列基準、現場入力の負担が、AI 認識と自動収集の現実的な応用基盤になります。",
        sourceLink: "SFA プロジェクトを見る ↗",
        sourceHref: "/cases/sfa",
      },
      {
        index: "組織 / 提案から行動へ",
        title: "AI は判断を支援できますが、組織の協働を代替することはできません。",
        paragraphs: [
          "AI は問題を見つけ、原因を説明し、提案を出せます。しかし目標設定、利害調整、責任分担、最終判断は依然として組織のものです。有効な AI は既存のプロセスと管理メカニズムに入り、役割間のフィードバックを短くする必要があります。",
          "したがって AI の導入は、モデルを単独で配置することではなく、問題がどのように発見され、割り当てられ、処理され、フィードバックされるかを考え直すことです。",
        ],
        quote: "AI は人の判断を強化し、組織がその結果を受け止めます。",
        sourceSmall: "能力展望 / 04",
        sourceTitle: "プロジェクト経験からさらに先へ",
        source: "今後の重点は美しい予測結果ではなく、問題をより早く見えるようにし、次の行動を起こしやすくすることです。",
      },
    ],
    ending: {
      mark: "→",
      title: "次世代の働き方とは、システムが人の代わりに働くことではなく、人がシステム上の反復作業に縛られにくくなることです。",
      body: "これは、デジタル化プロジェクトから AI 能力へ進むときに、私が最も残しておきたい判断です。",
    },
    footerHome: "← 仕事ホームへ戻る",
    footerNote: "実際の問題から出発し、次の一歩を考え続けます。",
  },
} as const;

export default function AiOutlookPage() {
  const locale = getRequestLocale();
  const page = copy[locale];

  return (
    <main className={styles.page} lang={locale === "zh-CN" ? "zh-CN" : locale}>
      <nav className={styles.nav} aria-label={page.navLabel}><Link href="/" className={styles.brand}>{page.brand}</Link><span>{page.noteLabel}</span></nav>
      <header className={styles.hero}>
        <div className={styles.number}>{page.number}</div>
        <div><p className={styles.eyebrow}>{page.hero.eyebrow}</p><h1>{page.hero.title}</h1><h2>{page.hero.subtitle}</h2><p>{page.hero.lead}</p></div>
        <aside className={styles.aside}><strong>{page.hero.asideTitle}</strong><p>{page.hero.asideBody}</p></aside>
      </header>

      <section className={styles.compare}><div className={styles.sectionHead}><h2>{page.compare.title}</h2><span>{page.compare.label}</span></div><div className={styles.compareGrid}><div className={styles.compareColumn}><h3><small>{page.compare.understanding.small}</small>{page.compare.understanding.title}</h3><div className={styles.compareItem}><b>{page.compare.understanding.itemTitle}</b><p>{page.compare.understanding.body}</p></div></div><div className={`${styles.compareColumn} ${styles.compareReal}`}><h3><small>{page.compare.judgment.small}</small>{page.compare.judgment.title}</h3><div className={styles.compareItem}><b>{page.compare.judgment.itemTitle}</b><p>{page.compare.judgment.body}</p></div></div></div></section>

      <article className={styles.essay}>
        {page.sections.map((section, index) => <section className={styles.section} key={section.title}><div className={styles.index}><strong>{String(index + 1).padStart(2, "0")}</strong><span>{section.index}</span></div><div className={styles.copy}><h2>{section.title}</h2>{section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}<p className={styles.quote}>{section.quote}</p></div><aside className={styles.source}><small>{section.sourceSmall}</small><h3>{section.sourceTitle}</h3><p>{section.source}</p>{"sourceLink" in section ? <Link href={section.sourceHref} className={styles.sourceLink}>{section.sourceLink}</Link> : null}</aside></section>)}
      </article>

      <section className={styles.ending}><div className={styles.mark}>{page.ending.mark}</div><div><h2>{page.ending.title}</h2><p>{page.ending.body}</p></div></section>
      <footer className={styles.footer}><Link href="/">{page.footerHome}</Link><span>{page.footerNote}</span></footer>
    </main>
  );
}
