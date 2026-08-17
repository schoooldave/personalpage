import Link from "next/link";
import { systemProcessNote } from "@/lib/portfolio";
import styles from "./system-process.module.css";

export default function SystemProcessPage() {
  const note = systemProcessNote;

  return (
    <main className={styles.page}>
      <nav className={styles.nav} aria-label="Field Notes 导航"><Link href="/" className={styles.brand}>现代工作笔记</Link><span>FMCG FIELD NOTES / 03</span></nav>
      <header className={styles.hero}>
        <div className={styles.number}>03</div>
        <div><p className={styles.eyebrow}>{note.eyebrow}</p><h1>{note.title}</h1><h2>{note.judgment}</h2><p>{note.question}</p></div>
        <aside className={styles.aside}><strong>这篇文章讨论什么？</strong><p>系统里的步骤都正确，为什么到了现场仍然需要解释、协调和绕行？</p></aside>
      </header>

      <section className={styles.compare}><div className={styles.sectionHead}><h2>系统记录的是步骤，真实业务运行的是关系。</h2><span>SYSTEM / PROCESS</span></div><div className={styles.compareGrid}><div className={styles.compareColumn}><h3><small>系统里的流程</small>可以被配置的步骤</h3>{note.comparison.system.map((item) => <div className={styles.compareItem} key={item.title}><b>{item.title}</b><p>{item.body}</p></div>)}</div><div className={`${styles.compareColumn} ${styles.compareReal}`}><h3><small>真实的流程</small>需要被组织承接的关系</h3>{note.comparison.real.map((item) => <div className={styles.compareItem} key={item.title}><b>{item.title}</b><p>{item.body}</p></div>)}</div></div></section>

      <article className={styles.essay}>{note.sections.map((section, index) => <section className={styles.section} key={section.title}><div className={styles.index}><strong>{String(index + 1).padStart(2, "0")}</strong><span>{section.label}</span></div><div className={styles.copy}><h2>{section.title}</h2>{section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}<p className={styles.quote}>{section.quote}</p></div><aside className={styles.source}><small>实践来源 / {String(index + 1).padStart(2, "0")}</small><h3>{section.sourceTitle}</h3><p>{section.source}</p>{index === 1 ? <Link href="/cases/sfa" className={styles.sourceLink}>查看权限治理证据 ↗</Link> : index === 0 ? <Link href="/cases/sfa" className={styles.sourceLink}>展开 SFA 实践证据 ↗</Link> : <Link href="/cases/sfa" className={styles.sourceLink}>打开项目证据空间 ↗</Link>}</aside></section>)}</article>

      <section className={styles.ending}><div className={styles.mark}>→</div><div><h2>{note.conclusion}</h2><p>数字化产品真正要做的，不是把所有事情都固化成按钮，而是把业务关系表达清楚，让标准流程能够运行，让例外能够被承接，让责任能够继续向前传递。</p><p className={styles.boundary}>{note.boundary}</p></div></section>
      <footer className={styles.footer}><Link href="/">← 回到工作首页</Link><span>流程被写进系统之前，先要被业务真正理解。</span></footer>
    </main>
  );
}
