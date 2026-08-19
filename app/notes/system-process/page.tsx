import Link from "next/link";
import { systemProcessNote } from "@/lib/portfolio";
import { getRequestLocale } from "@/lib/i18n/server";
import LanguageSwitcher from "@/app/LanguageSwitcher";
import styles from "./system-process.module.css";

export default function SystemProcessPage() {
  const note = systemProcessNote;
  const locale = getRequestLocale();
  const ui = locale === "en" ? {
    essay: "What does this essay explore?", aside: "The steps in a system may be correct. Why does the field still need explanation, coordination and workarounds?", compare: "Systems record steps; real work runs on relationships.", system: "Configurable steps", real: "Relationships the organization must carry", source: "Practice source", evidence: ["Open SFA practice evidence ↗", "View permission governance evidence ↗", "Open project evidence space ↗"], back: "← Back to work home", footer: "Before a process is written into a system, the business must understand it."
  } : locale === "ja" ? {
    essay: "この記事のテーマ", aside: "システムの手順が正しくても、なぜ現場では説明、調整、迂回が必要になるのでしょうか。", compare: "システムが記録するのは手順。現場を動かすのは関係です。", system: "設定できる手順", real: "組織が受け止める関係", source: "実践の出典", evidence: ["SFA の実践を見る ↗", "権限ガバナンスを見る ↗", "プロジェクトの証拠を見る ↗"], back: "← 仕事のホームへ", footer: "業務をシステムに書き込む前に、まず現場に理解される必要があります。"
  } : {
    essay: "这篇文章讨论什么？", aside: "系统里的步骤都正确，为什么到了现场仍然需要解释、协调和绕行？", compare: "系统记录的是步骤，真实业务运行的是关系。", system: "可以被配置的步骤", real: "需要被组织承接的关系", source: "实践来源", evidence: ["展开 SFA 实践证据 ↗", "查看权限治理证据 ↗", "打开项目证据空间 ↗"], back: "← 回到工作首页", footer: "流程被写进系统之前，先要被业务真正理解。"
  };

  return (
    <main className={styles.page}>
      <nav className={styles.nav} aria-label="Field Notes navigation"><Link href="/" className={styles.brand}>{locale === "en" ? "Modern Field Notes" : locale === "ja" ? "現代の仕事ノート" : "现代工作笔记"}</Link><span>FMCG FIELD NOTES / 02</span><LanguageSwitcher locale={locale} pathname="/notes/system-process" /></nav>
      <header className={styles.hero}>
        <div className={styles.number}>02</div>
        <div><p className={styles.eyebrow}>{note.eyebrow}</p><h1>{note.title}</h1><h2>{note.judgment}</h2><p>{note.question}</p></div>
        <aside className={styles.aside}><strong>{ui.essay}</strong><p>{ui.aside}</p></aside>
      </header>

      <section className={styles.compare}><div className={styles.sectionHead}><h2>{ui.compare}</h2><span>SYSTEM / PROCESS</span></div><div className={styles.compareGrid}><div className={styles.compareColumn}><h3><small>{locale === "en" ? "System process" : locale === "ja" ? "システムの手順" : "系统里的流程"}</small>{ui.system}</h3>{note.comparison.system.map((item) => <div className={styles.compareItem} key={item.title}><b>{item.title}</b><p>{item.body}</p></div>)}</div><div className={`${styles.compareColumn} ${styles.compareReal}`}><h3><small>{locale === "en" ? "Real process" : locale === "ja" ? "現場のプロセス" : "真实的流程"}</small>{ui.real}</h3>{note.comparison.real.map((item) => <div className={styles.compareItem} key={item.title}><b>{item.title}</b><p>{item.body}</p></div>)}</div></div></section>

      <article className={styles.essay}>{note.sections.map((section, index) => <section className={styles.section} key={section.title}><div className={styles.index}><strong>{String(index + 1).padStart(2, "0")}</strong><span>{section.label}</span></div><div className={styles.copy}><h2>{section.title}</h2>{section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}<p className={styles.quote}>{section.quote}</p></div><aside className={styles.source}><small>{ui.source} / {String(index + 1).padStart(2, "0")}</small><h3>{section.sourceTitle}</h3><p>{section.source}</p><Link href={index === 1 ? "/cases/sfa" : "/cases/sfa"} className={styles.sourceLink}>{ui.evidence[index]}</Link></aside></section>)}</article>

      <section className={styles.ending}><div className={styles.mark}>→</div><div><h2>{note.conclusion}</h2><p>数字化产品真正要做的，不是把所有事情都固化成按钮，而是把业务关系表达清楚，让标准流程能够运行，让例外能够被承接，让责任能够继续向前传递。</p><p className={styles.boundary}>{note.boundary}</p></div></section>
      <footer className={styles.footer}><Link href="/">{ui.back}</Link><span>{ui.footer}</span></footer>
    </main>
  );
}
