import Link from "next/link";
import { fieldNotes } from "@/lib/portfolio";
import styles from "./notes.module.css";
import essayStyles from "./essay.module.css";

export default function FieldNotesPage() {
  const note = fieldNotes[0];

  return (
    <main className={styles.page}>
      <nav className={styles.nav} aria-label="Field Notes 导航">
        <Link href="/" className={styles.brand}><strong>现代工作笔记</strong><span>Modern Field Notes</span></Link>
        <div><Link href="/">工作首页</Link><Link href="/cases/dms">DMS 案例</Link></div>
      </nav>
      <header className={styles.header}>
        <p className={styles.eyebrow}>FMCG FIELD NOTES / 01</p>
        <h1>{note.title}</h1>
        <p className={styles.subtitle}>{note.subtitle}</p>
        <div className={styles.meta}><span>行业判断</span><span>案例证据</span><span>未来推演</span></div>
      </header>

      <section className={`${styles.section} ${styles.judgment}`}>
        <div className={styles.sectionMark}>01</div>
        <div><p className={styles.label}>核心判断 / JUDGMENT</p><h2>{note.judgment}</h2></div>
      </section>

      <article className={essayStyles.thoughtSection}>
        <div className={styles.sectionMark}>02</div>
        <div>
          <p className={styles.label}>行业思考 / FIELD ESSAY</p>
          {note.thought.map((paragraph) => <p className={essayStyles.essay} key={paragraph}>{paragraph}</p>)}
        </div>
      </article>

      <section className={styles.splitSection}>
        <div className={styles.sectionMark}>03</div>
        <div><p className={styles.label}>项目验证 / PROJECT EVIDENCE</p><p className={styles.body}>{note.scene}</p></div>
      </section>

      <section className={styles.evidenceSection}>
        <div className={styles.sectionMark}>04</div>
        <div><p className={styles.label}>案例证据 / EVIDENCE</p><p className={styles.body}>{note.evidence}</p><p className={styles.result}>{note.result}</p><Link className={styles.arrowLink} href="/cases/dms">打开 DMS 项目档案 <span>↗</span></Link></div>
      </section>

      <section className={styles.aiSection}>
        <div className={styles.sectionMark}>04</div>
        <div><p className={styles.label}>AI / 未来推演</p><h2>{note.aiProjection}</h2><p className={styles.aiNote}>不是把 AI 叠加在报表上，而是让系统从“记录发生了什么”继续走向“解释为什么发生、下一步做什么”。</p></div>
      </section>

      <aside className={styles.boundary}><span>公开边界 / BOUNDARY</span><p>{note.boundary}</p></aside>
      <footer className={styles.footer}><Link href="/">← 回到工作首页</Link><span>从现场出发，回到现场验证。</span></footer>
    </main>
  );
}
