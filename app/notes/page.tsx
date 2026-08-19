import Link from "next/link";
import { fieldNotes } from "@/lib/portfolio";
import EvidencePortal from "./EvidencePortal";
import LanguageSwitcher from "@/app/LanguageSwitcher";
import { getRequestLocale } from "@/lib/i18n/server";
import styles from "./notes.module.css";

export default function FieldNotesPage() {
  const note = fieldNotes[0];
  const locale = getRequestLocale();
  const ui = locale === "en" ? { brand: "Modern Field Notes", home: "Work home", system: "A system does not equal a business loop", dms: "DMS case", about: "About me", question: "What does this note explore?", aside: "Why can data, once collected, still fail to enter real business decisions?", back: "← Back to work home" } : locale === "ja" ? { brand: "現代の仕事ノート", home: "仕事のホーム", system: "システムは業務の完結ではない", dms: "DMS ケース", about: "私について", question: "このノートのテーマ", aside: "データを集めても、なぜ実際の業務判断につながらないのでしょうか。", back: "← 仕事のホームへ" } : { brand: "现代工作笔记", home: "工作首页", system: "系统不等于业务闭环", dms: "DMS 案例", about: "关于我", question: "文章讨论什么？", aside: "不是如何建设一套 DMS，而是为什么有系统、有数据，仍然可能停留在管理要求，没有进入真实经营。", back: "← 回到工作首页" };

  return (
    <main className={styles.page}>
      <nav className={styles.nav} aria-label="Field Notes 导航">
        <Link href="/" className={styles.brand}><strong>{ui.brand}</strong><span>Modern Field Notes</span></Link>
        <div className={styles.navLinks}><Link href="/">{ui.home}</Link><Link href="/notes/system-process">{ui.system}</Link><Link href="/cases/dms">{ui.dms}</Link><Link href="/about">{ui.about}</Link></div><LanguageSwitcher locale={locale} pathname="/notes" />
      </nav>

      <header className={styles.header}>
        <div className={styles.headerIndex}>01</div>
        <div className={styles.headerContent}>
          <p className={styles.eyebrow}>FMCG DATA DIGITALIZATION</p>
          <h1>{note.title}</h1>
          <p className={styles.headerQuestion}>{note.subtitle}</p>
          <p className={styles.subtitle}>{note.judgment}</p>
        </div>
        <aside className={styles.headerAside}><strong>{ui.question}</strong><p>{ui.aside}</p></aside>
      </header>

      <section className={styles.thesisBand}><div className={styles.thesisMark}>“</div><div><p>{note.judgment}</p><span>THE HIDDEN ASYMMETRY OF DATA VALUE</span></div></section>

      <section className={styles.rolesSection}>
        <div className={styles.sectionHead}><h2>同一份数据，三个角色看到的并不是同一件事。</h2><span>角色、收益与成本</span></div>
        <div className={styles.rolesGrid}>{note.roles.map((role, index) => <article className={styles.roleCard} key={role.title}><small>{String(index + 1).padStart(2, "0")} / {role.title}</small><h3>{role.cost}</h3><p>{role.benefit}</p><strong>{role.title === "总部" ? "获得的是可见性与管理依据。" : role.title === "销售" ? "承担的是推动与协调成本。" : "承担的是贡献成本与合作风险。"}</strong></article>)}</div>
      </section>

      <article className={styles.essay}>
        {note.movements.map((movement, index) => <section className={styles.movement} key={movement.title}>
          <div className={styles.movementIndex}><strong>{String(index + 1).padStart(2, "0")}</strong><span>{index === 0 ? "持续采集" : index === 1 ? "数据可靠" : "推动改变"}</span></div>
          <div className={styles.movementCopy}><h2>{movement.title}</h2>{movement.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}<p className={styles.pullQuote}>{movement.pull}</p></div>
          <aside className={styles.experienceSource}><small>真实观察 / {String(index + 1).padStart(2, "0")}</small><h3>{movement.sourceTitle}</h3><p>{movement.source}</p>{index === 2 ? <EvidencePortal /> : <Link href="/cases/dms" className={styles.sourceLink}>展开相关实践 ↗</Link>}</aside>
        </section>)}
      </article>

      <section className={styles.chainSection}><div className={styles.sectionHead}><h2>数据价值最终仍需要一条完整链路</h2><span>从记录到行动</span></div><div className={styles.chain}>{note.valueChain.map((step, index) => <div className={styles.chainStep} key={step.label}><small>{String(index + 1).padStart(2, "0")}</small><strong>{step.label}</strong><p>{step.note}</p></div>)}</div></section>

      <section className={styles.conclusion}><div className={styles.conclusionMark}>→</div><div><h2>从贡献数据到改变行动，中间仍有一段需要被修复的距离。</h2><p>系统建设只是其中一部分。只有重新理解不同角色承担的成本与获得的价值，并让数据进入可靠治理、具体判断和管理行动，更多数据才可能转化为更好的经营认知。</p><p className={styles.boundary}>{note.boundary}</p></div></section>

      <footer className={styles.footer}><Link href="/">{ui.back}</Link><span>FMCG FIELD NOTES / 01</span></footer>
    </main>
  );
}
