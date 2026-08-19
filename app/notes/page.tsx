import Link from "next/link";
import { fieldNotes } from "@/lib/portfolio";
import EvidencePortal from "./EvidencePortal";
import LanguageSwitcher from "@/app/LanguageSwitcher";
import { getRequestLocale } from "@/lib/i18n/server";
import { localizePath } from "@/lib/i18n/config";
import styles from "./notes.module.css";

export default function FieldNotesPage() {
  const note = fieldNotes[0];
  const locale = getRequestLocale();
  const ui = locale === "en" ? { brand: "Modern Field Notes", home: "Work home", system: "A system does not equal a business loop", dms: "DMS case", about: "About me", question: "What does this note explore?", aside: "Why can data, once collected, still fail to enter real business decisions?", back: "← Back to work home" } : locale === "ja" ? { brand: "現代の仕事ノート", home: "仕事のホーム", system: "システムは業務の完結ではない", dms: "DMS ケース", about: "私について", question: "このノートのテーマ", aside: "データを集めても、なぜ実際の業務判断につながらないのでしょうか。", back: "← 仕事のホームへ" } : { brand: "现代工作笔记", home: "工作首页", system: "系统不等于业务闭环", dms: "DMS 案例", about: "关于我", question: "文章讨论什么？", aside: "不是如何建设一套 DMS，而是为什么有系统、有数据，仍然可能停留在管理要求，没有进入真实经营。", back: "← 回到工作首页" };
  const article = locale === "en" ? {
    title: "Data does not equal value", subtitle: "Why can companies gain more channel data without gaining better business judgment?", judgment: "FMCG data is produced across headquarters, sales, distributors and stores. Headquarters gains visibility and management evidence, while sales and distributors carry the cost of collection, persuasion, exposure and execution. When cost and value belong to different roles, collection becomes a management task instead of business collaboration.", roles: [{ title: "Headquarters", cost: "Wants to see the real channel.", benefit: "Gains channel visibility and management evidence.", ownership: "Receives visibility and a basis for management." }, { title: "Sales", cost: "Carries the cost of persuasion, explanation, training and follow-up.", benefit: "Gains a basis for market judgment and business development.", ownership: "Carries the cost of coordination and follow-through." }, { title: "Distributor", cost: "Carries contribution cost, execution burden and exposure risk.", benefit: "Expects data to improve the business in return.", ownership: "Carries contribution cost and cooperation risk." }], movementLabels: ["Continuous collection", "Reliable data", "Driving change"], chainTitle: "Data value still needs a complete chain", chainLabel: "FROM RECORD TO ACTION", conclusion: "There is still a distance to repair between contributing data and changing action.", conclusionBody: "System building is only one part. Data becomes better business understanding only when the costs and value of each role are understood, and data enters reliable governance, concrete judgment and management action.", boundary: "Company, brand and internal system details are anonymized; the project validates process operation and adoption, without over-attributing business growth.", band: "THE HIDDEN ASYMMETRY OF DATA VALUE", rolesLabel: "Roles, value and cost"
  } : locale === "ja" ? {
    title: "データは価値そのものではない", subtitle: "チャネルデータが増えても、なぜ経営判断は同じように良くならないのでしょうか。", judgment: "FMCG のデータは本部、営業、販売代理店、店舗をまたいで生まれます。本部は可視性と管理の根拠を得る一方、営業と販売代理店は収集、働きかけ、情報開示、実行のコストを負います。貢献のコストとデータの価値が異なる役割に分かれると、収集は協業ではなく管理業務になりやすいのです。", roles: [{ title: "本部", cost: "実際のチャネルを見たい。", benefit: "チャネルの可視性と管理の根拠を得る。", ownership: "可視性と管理の根拠を得る。" }, { title: "営業", cost: "働きかけ、説明、研修、フォローのコストを負う。", benefit: "市場判断と営業推進の根拠を得る。", ownership: "推進と調整のコストを負う。" }, { title: "販売代理店", cost: "貢献コスト、実行負担、情報開示のリスクを負う。", benefit: "データが経営改善に戻ることを期待する。", ownership: "貢献コストと協力リスクを負う。" }], movementLabels: ["継続収集", "データの信頼性", "変化を進める"], chainTitle: "データの価値には、完全な連鎖が必要", chainLabel: "記録から行動へ", conclusion: "データを提供することと、行動を変えることの間には、まだ修復すべき距離があります。", conclusionBody: "システム構築は一部にすぎません。役割ごとのコストと価値を理解し、データを信頼できる管理、具体的な判断、管理行動につなげて初めて、データは経営理解に変わります。", boundary: "会社、ブランド、内部システムの詳細は匿名化しています。プロジェクトはプロセス運用と利用定着を検証するもので、業績成長への過度な帰属は行いません。", band: "データ価値の非対称性", rolesLabel: "役割、価値、コスト"
  } : { title: note.title, subtitle: note.subtitle, judgment: note.judgment, roles: note.roles.map((role) => ({ ...role, ownership: role.title === "总部" ? "获得的是可见性与管理依据。" : role.title === "销售" ? "承担的是推动与协调成本。" : "承担的是贡献成本与合作风险。" })), movementLabels: ["持续采集", "数据可靠", "推动改变"], chainTitle: "数据价值最终仍需要一条完整链路", chainLabel: "从记录到行动", conclusion: "从贡献数据到改变行动，中间仍有一段需要被修复的距离。", conclusionBody: "系统建设只是其中一部分。只有重新理解不同角色承担的成本与获得的价值，并让数据进入可靠治理、具体判断和管理行动，更多数据才可能转化为更好的经营认知。", boundary: note.boundary, band: "THE HIDDEN ASYMMETRY OF DATA VALUE", rolesLabel: "角色、收益与成本" };

  return (
    <main className={styles.page}>
      <nav className={styles.nav} aria-label="Field Notes 导航">
        <Link href={localizePath("/", locale)} className={styles.brand}><strong>{ui.brand}</strong><span>Modern Field Notes</span></Link>
        <div className={styles.navLinks}><Link href={localizePath("/", locale)}>{ui.home}</Link><Link href={localizePath("/notes/system-process", locale)}>{ui.system}</Link><Link href={localizePath("/cases/dms", locale)}>{ui.dms}</Link><Link href={localizePath("/about", locale)}>{ui.about}</Link></div><LanguageSwitcher locale={locale} pathname="/notes" />
      </nav>

      <header className={styles.header}>
        <div className={styles.headerIndex}>01</div>
        <div className={styles.headerContent}>
          <p className={styles.eyebrow}>FMCG DATA DIGITALIZATION</p>
          <h1>{article.title}</h1>
          <p className={styles.headerQuestion}>{article.subtitle}</p>
          <p className={styles.subtitle}>{article.judgment}</p>
        </div>
        <aside className={styles.headerAside}><strong>{ui.question}</strong><p>{ui.aside}</p></aside>
      </header>

      <section className={styles.thesisBand}><div className={styles.thesisMark}>“</div><div><p>{article.judgment}</p><span>{article.band}</span></div></section>

      <section className={styles.rolesSection}>
        <div className={styles.sectionHead}><h2>{locale === "en" ? "The same data means different things to three roles." : locale === "ja" ? "同じデータでも、三つの役割が見るものは同じではありません。" : "同一份数据，三个角色看到的并不是同一件事。"}</h2><span>{article.rolesLabel}</span></div>
        <div className={styles.rolesGrid}>{article.roles.map((role, index) => <article className={styles.roleCard} key={role.title}><small>{String(index + 1).padStart(2, "0")} / {role.title}</small><h3>{role.cost}</h3><p>{role.benefit}</p><strong>{role.ownership}</strong></article>)}</div>
      </section>

      <article className={styles.essay}>
        {note.movements.map((movement, index) => <section className={styles.movement} key={movement.title}>
          <div className={styles.movementIndex}><strong>{String(index + 1).padStart(2, "0")}</strong><span>{article.movementLabels[index]}</span></div>
          <div className={styles.movementCopy}><h2>{movement.title}</h2>{movement.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}<p className={styles.pullQuote}>{movement.pull}</p></div>
          <aside className={styles.experienceSource}><small>{locale === "en" ? "FIELD OBSERVATION" : locale === "ja" ? "実際の観察" : "真实观察"} / {String(index + 1).padStart(2, "0")}</small><h3>{movement.sourceTitle}</h3><p>{movement.source}</p>{index === 2 ? <EvidencePortal /> : <Link href={localizePath("/cases/dms", locale)} className={styles.sourceLink}>{locale === "en" ? "Open related practice ↗" : locale === "ja" ? "関連する実践を見る ↗" : "展开相关实践 ↗"}</Link>}</aside>
        </section>)}
      </article>

      <section className={styles.chainSection}><div className={styles.sectionHead}><h2>{article.chainTitle}</h2><span>{article.chainLabel}</span></div><div className={styles.chain}>{(locale === "en" ? [["Stable collection", "Participants keep contributing"], ["Reliable data", "Rules and exceptions can be identified"], ["Form judgment", "Data answers a concrete question"], ["Drive action", "Roles and processes carry the judgment"], ["Feedback", "Results keep correcting the mechanism"]] : locale === "ja" ? [["安定収集", "参加者が継続して貢献する"], ["信頼できるデータ", "ルールと異常を識別できる"], ["判断を形成", "データが具体的な問いに答える"], ["行動を進める", "役割とプロセスが判断を受け止める"], ["結果のフィードバック", "結果が仕組みを修正し続ける"]] : note.valueChain.map((step) => [step.label, step.note])).map(([label, noteText], index) => <div className={styles.chainStep} key={label}><small>{String(index + 1).padStart(2, "0")}</small><strong>{label}</strong><p>{noteText}</p></div>)}</div></section>

      <section className={styles.conclusion}><div className={styles.conclusionMark}>→</div><div><h2>{article.conclusion}</h2><p>{article.conclusionBody}</p><p className={styles.boundary}>{article.boundary}</p></div></section>

      <footer className={styles.footer}><Link href={localizePath("/", locale)}>{ui.back}</Link><span>FMCG FIELD NOTES / 01</span></footer>
    </main>
  );
}
