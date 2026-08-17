import Link from "next/link";
import { fieldNoteJudgments } from "@/lib/portfolio";
import styles from "../system-process/system-process.module.css";

const note = fieldNoteJudgments[2];

const sections = [
  {
    title: "部署不是改变",
    label: "部署 / 不是改变",
    paragraphs: [
      "系统完成上线，只代表功能进入了组织。它解决了技术交付的问题，却没有自动解决业务为什么要用、谁来使用，以及使用过程中遇到问题由谁承接。",
      "如果上线被当作项目终点，团队容易把注意力停留在功能是否完成、账号是否开通、流程是否跑通，却忽略了现场是否真的开始按照新的方式工作。",
    ],
    quote: "上线是功能进入组织的时刻，不是组织完成改变的时刻。",
    sourceTitle: "从上线目标到真实采用",
    source: "DMS 项目中，上线率不仅是技术指标，也与销售推动、经销商意愿、培训和管理要求直接相关。",
  },
  {
    title: "使用不是采用",
    label: "使用 / 不是采用",
    paragraphs: [
      "一次登录、一次上传或一次流程提交，只能说明系统被使用过。真正的采用，是角色愿意把系统放进日常工作，并且在流程不顺、规则变化或出现例外时，仍然能够继续使用。",
      "这要求产品设计同时面对操作负担和组织关系：培训要解释为什么做，流程要降低不必要的阻力，系统要保留必要的灵活性，管理者还要持续观察使用情况。",
    ],
    quote: "使用是一次动作，采用是工作方式发生了迁移。",
    sourceTitle: "把上线前后的工作连起来",
    source: "通过上线前培训、上线后使用培训、差异化上传频率和定期使用统计，减少销售与经销商在实际执行中的阻力。",
  },
  {
    title: "采用需要机制承接",
    label: "采用 / 需要承接",
    paragraphs: [
      "当系统进入日常使用后，组织仍然需要持续反馈：哪些规则不适配，哪些角色负担过重，哪些问题反复出现，哪些数据已经能够支持管理判断。没有反馈，系统就会慢慢退回到形式上的使用。",
      "因此，上线治理不是不断催促用户，而是让系统机制与管理机制一起调整。系统限制入口、记录状态和统计使用，管理机制则负责解释目标、调整要求、承接问题并推动反馈闭环。",
    ],
    quote: "持续使用不是靠一次推动完成，而是靠系统与管理共同维护。",
    sourceTitle: "系统与管理共同变化",
    source: "设计周报、月报和使用统计，推动管理部门执行，并根据不同渠道调整上传频率，让系统使用逐步稳定下来。",
  },
] as const;

export default function ContinuousUsePage() {
  return (
    <main className={styles.page}>
      <nav className={styles.nav} aria-label="Field Notes 导航">
        <Link href="/" className={styles.brand}>现代工作笔记</Link>
        <span>FMCG FIELD NOTES / 03</span>
      </nav>

      <header className={styles.hero}>
        <div className={styles.number}>03</div>
        <div>
          <p className={styles.eyebrow}>FMCG ADOPTION &amp; CHANGE</p>
          <h1>{note.title}</h1>
          <h2>{note.body}</h2>
          <p>为什么系统已经上线，真实业务却仍然没有形成稳定的使用方式？</p>
        </div>
        <aside className={styles.aside}>
          <strong>这篇文章讨论什么？</strong>
          <p>从技术交付走向组织采用，真正的变化发生在哪里？</p>
        </aside>
      </header>

      <section className={styles.compare}>
        <div className={styles.sectionHead}>
          <h2>上线之后，变化才真正开始。</h2>
          <span>DEPLOY / USE / ADOPT</span>
        </div>
        <div className={styles.compareGrid}>
          {note.track.map((step) => (
            <div className={styles.compareColumn} key={step.label}>
              <h3><small>{step.label}</small>{step.note}</h3>
              <div className={styles.compareItem}><b>{step.label}</b><p>{step.note}</p></div>
            </div>
          ))}
        </div>
      </section>

      <article className={styles.essay}>
        {sections.map((section, index) => (
          <section className={styles.section} key={section.title}>
            <div className={styles.index}><strong>{String(index + 1).padStart(2, "0")}</strong><span>{section.label}</span></div>
            <div className={styles.copy}><h2>{section.title}</h2>{section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}<p className={styles.quote}>{section.quote}</p></div>
            <aside className={styles.source}><small>实践来源 / {String(index + 1).padStart(2, "0")}</small><h3>{section.sourceTitle}</h3><p>{section.source}</p><Link href="/cases/dms" className={styles.sourceLink}>展开项目证据 ↗</Link></aside>
          </section>
        ))}
      </article>

      <section className={styles.ending}><div className={styles.mark}>→</div><div><h2>上线不是终点，持续采用才是数字化真正进入业务的标志。</h2><p>系统完成部署之后，产品工作才从功能交付转向使用治理：让角色愿意使用，让流程能够运行，让问题能够反馈，让管理机制能够持续推动调整。</p></div></section>
      <footer className={styles.footer}><Link href="/">← 回到工作首页</Link><span>系统进入组织之后，改变才真正开始。</span></footer>
    </main>
  );
}
