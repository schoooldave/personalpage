import Link from "next/link";
import { getRequestLocale } from "@/lib/i18n/server";
import LanguageSwitcher from "@/app/LanguageSwitcher";
import styles from "../system-process/system-process.module.css";

const copy = {
  "zh-CN": {
    nav: "FMCG FIELD NOTES / 03", eyebrow: "FMCG ADOPTION & CHANGE", title: "上线不等于持续使用", body: "系统进入组织之后，真正的变化才开始。",
    question: "为什么系统已经上线，真实业务却仍然没有形成稳定的使用方式？", asideTitle: "这篇文章讨论什么？", asideBody: "从技术交付走向组织采用，真正的变化发生在哪里？",
    compareTitle: "上线之后，变化才真正开始。", compareLabel: "DEPLOY / USE / ADOPT", sourceLabel: "实践来源", sourceLink: "展开项目证据 ↗",
    sections: [
      { title: "部署不是改变", label: "部署 / 不是改变", paragraphs: ["系统完成上线，只代表功能进入了组织。它解决了技术交付的问题，却没有自动解决业务为什么要用、谁来使用，以及使用过程中遇到问题由谁承接。", "如果上线被当作项目终点，团队容易把注意力停留在功能是否完成、账号是否开通、流程是否跑通，却忽略了现场是否真的开始按照新的方式工作。"], quote: "上线是功能进入组织的时刻，不是组织完成改变的时刻。", sourceTitle: "从上线目标到真实采用", source: "DMS 项目中，上线率不仅是技术指标，也与销售推动、经销商意愿、培训和管理要求直接相关。" },
      { title: "使用不是采用", label: "使用 / 不是采用", paragraphs: ["一次登录、一次上传或一次流程提交，只能说明系统被使用过。真正的采用，是角色愿意把系统放进日常工作，并且在流程不顺、规则变化或出现例外时，仍然能够继续使用。", "这要求产品设计同时面对操作负担和组织关系：培训要解释为什么做，流程要降低不必要的阻力，系统要保留必要的灵活性，管理者还要持续观察使用情况。"], quote: "使用是一次动作，采用是工作方式发生了迁移。", sourceTitle: "把上线前后的工作连起来", source: "通过上线前培训、上线后使用培训、差异化上传频率和定期使用统计，减少销售与经销商在实际执行中的阻力。" },
      { title: "采用需要机制承接", label: "采用 / 需要承接", paragraphs: ["当系统进入日常使用后，组织仍然需要持续反馈：哪些规则不适配，哪些角色负担过重，哪些问题反复出现，哪些数据已经能够支持管理判断。没有反馈，系统就会慢慢退回到形式上的使用。", "因此，上线治理不是不断催促用户，而是让系统机制与管理机制一起调整。系统限制入口、记录状态和统计使用，管理机制则负责解释目标、调整要求、承接问题并推动反馈闭环。"], quote: "持续使用不是靠一次推动完成，而是靠系统与管理共同维护。", sourceTitle: "系统与管理共同变化", source: "设计周报、月报和使用统计，推动管理部门执行，并根据不同渠道调整上传频率，让系统使用逐步稳定下来。" }
    ], endingTitle: "上线不是终点，持续采用才是数字化真正进入业务的标志。", endingBody: "系统完成部署之后，产品工作才从功能交付转向使用治理：让角色愿意使用，让流程能够运行，让问题能够反馈，让管理机制能够持续推动调整。", footer: "系统进入组织之后，改变才真正开始。", back: "← 回到工作首页"
  },
  en: {
    nav: "FMCG FIELD NOTES / 03", eyebrow: "FMCG ADOPTION & CHANGE", title: "Deployment does not equal continued use", body: "Once a system enters an organization, the real change begins.",
    question: "Why can a system be live while the business still has no stable way of using it?", asideTitle: "What does this note explore?", asideBody: "Where does the real change happen when technical delivery becomes organizational adoption?", compareTitle: "The real change begins after deployment.", compareLabel: "DEPLOY / USE / ADOPT", sourceLabel: "FIELD EVIDENCE", sourceLink: "VIEW PROJECT EVIDENCE ↗",
    sections: [
      { title: "Deployment is not change", label: "DEPLOY / NOT CHANGE", paragraphs: ["A system going live only means that a capability has entered the organization. It solves technical delivery, but it does not answer why the business should use it, who will use it, or who will take ownership when problems arise.", "When go-live is treated as the end of a project, teams focus on completed features, activated accounts, and working flows. They can miss whether people on the ground have actually started working in the new way."], quote: "Go-live is when a capability enters the organization, not when the organization has changed.", sourceTitle: "From go-live targets to real adoption", source: "In the DMS project, the go-live rate was not only a technical metric. It also depended on sales enablement, distributor willingness, training, and management requirements." },
      { title: "Use is not adoption", label: "USE / NOT ADOPTION", paragraphs: ["One login, one upload, or one submitted workflow only shows that the system was used once. Adoption means that people are willing to make it part of daily work and continue using it when a process is difficult, rules change, or exceptions appear.", "That requires product design to address both operating effort and organizational relationships: training must explain why, workflows must remove unnecessary friction, the system must preserve essential flexibility, and managers must keep watching how it is used."], quote: "Use is an action; adoption is a shift in the way work gets done.", sourceTitle: "Connecting the work before and after go-live", source: "Pre-launch training, post-launch usage training, differentiated upload frequencies, and regular usage reporting helped reduce resistance from sales teams and distributors." },
      { title: "Adoption needs a mechanism to sustain it", label: "ADOPT / SUSTAIN", paragraphs: ["Once a system becomes part of daily work, the organization still needs continuous feedback: which rules do not fit, which roles carry too much burden, which issues recur, and which data can support management decisions. Without feedback, usage gradually becomes performative.", "Go-live governance is therefore not about repeatedly urging users. System mechanisms and management mechanisms must adjust together. The system controls entry points, records status, and measures usage; management explains goals, adjusts expectations, owns issues, and closes the feedback loop."], quote: "Continued use is not achieved by one push; it is maintained by the system and management together.", sourceTitle: "When systems and management change together", source: "Weekly and monthly reporting, usage tracking, management follow-up, and channel-specific upload frequencies helped make system use more stable over time." }
    ], endingTitle: "Go-live is not the finish line. Sustained adoption is when digitalization truly enters the business.", endingBody: "After deployment, product work moves from feature delivery to adoption governance: making use willing, workflows workable, feedback visible, and management capable of continuous adjustment.", footer: "Once a system enters the organization, change truly begins.", back: "← Back to Work World"
  },
  ja: {
    nav: "FMCG FIELD NOTES / 03", eyebrow: "FMCG ADOPTION & CHANGE", title: "導入は、継続利用を意味しない", body: "システムが組織に入ってから、本当の変化が始まる。",
    question: "システムは稼働しているのに、なぜ現場では安定した使い方が定着しないのか。", asideTitle: "このノートで考えること", asideBody: "技術の納品から組織への定着へ移るとき、本当の変化はどこで起きるのか。", compareTitle: "導入後に、本当の変化が始まる。", compareLabel: "DEPLOY / USE / ADOPT", sourceLabel: "実践の記録", sourceLink: "プロジェクトの証拠を見る ↗",
    sections: [
      { title: "導入は変化ではない", label: "導入 / 変化ではない", paragraphs: ["システムが稼働したことは、機能が組織に入ったことを示すだけだ。技術的な納品は解決できても、なぜ使うのか、誰が使うのか、利用中の問題を誰が受け止めるのかまでは自動的に解決できない。", "稼働をプロジェクトの終点と考えると、チームは機能の完成、アカウントの開通、フローの稼働に意識を向けがちになる。その結果、現場が本当に新しい方法で仕事を始めたかを見落としてしまう。"], quote: "稼働は機能が組織に入る瞬間であり、組織が変わり終える瞬間ではない。", sourceTitle: "稼働目標から実際の定着へ", source: "DMSプロジェクトでは、稼働率は技術指標だけではなく、営業の働きかけ、販売店の意思、研修、管理要件にも左右された。" },
      { title: "利用は定着ではない", label: "利用 / 定着ではない", paragraphs: ["一度のログイン、アップロード、申請だけでは、システムが一度使われたことしか分からない。本当の定着とは、役割を担う人が日常業務にシステムを組み込み、フローが滞ったりルールが変わったり例外が起きたりしても使い続けられることだ。", "そのためには、操作負担と組織上の関係を同時に考える必要がある。研修では理由を伝え、フローでは不要な抵抗を減らし、システムには必要な柔軟性を残し、管理者は利用状況を継続的に見ていく。"], quote: "利用は一つの行動であり、定着は仕事の進め方が移ることだ。", sourceTitle: "導入前後の仕事をつなぐ", source: "導入前研修、導入後の利用研修、アップロード頻度の調整、定期的な利用集計によって、営業と販売店の実行上の抵抗を減らした。" },
      { title: "定着には仕組みが必要", label: "定着 / 仕組みで支える", paragraphs: ["システムが日常業務に入った後も、組織には継続的なフィードバックが必要だ。合わないルール、負担が大きい役割、繰り返す問題、管理判断に使えるデータを見続けなければ、システムは形式的な利用へ戻ってしまう。", "導入後のガバナンスは、利用者を繰り返し催促することではない。システムの仕組みと管理の仕組みを一緒に調整することだ。システムは入口、状態、利用状況を記録し、管理側は目標を説明し、要求を調整し、問題を受け止め、フィードバックを完了させる。"], quote: "継続利用は一度の働きかけではなく、システムと管理がともに支えるものだ。", sourceTitle: "システムと管理がともに変わる", source: "週次・月次の報告、利用状況の集計、管理部門のフォロー、チャネルごとのアップロード頻度の調整によって、利用を徐々に安定させた。" }
    ], endingTitle: "導入は終点ではない。継続定着して初めて、デジタル化は業務に入る。", endingBody: "導入後、プロダクトの仕事は機能納品から利用のガバナンスへ移る。使いたいと思えること、動くフローであること、問題がフィードバックされること、管理の仕組みが調整を続けられることが重要になる。", footer: "システムが組織に入ってから、本当の変化が始まる。", back: "← Work World に戻る"
  }
} as const;

export default function ContinuousUsePage() {
  const locale = getRequestLocale();
  const text = copy[locale];
  return (
    <main className={styles.page}>
      <nav className={styles.nav} aria-label="Field Notes navigation">
        <Link href="/" className={styles.brand}>{locale === "zh-CN" ? "现代工作笔记" : locale === "en" ? "MODERN WORK NOTES" : "現代の仕事ノート"}</Link>
        <span>{text.nav}</span><LanguageSwitcher locale={locale} pathname="/notes/continuous-use" />
      </nav>

      <header className={styles.hero}>
        <div className={styles.number}>03</div>
        <div>
          <p className={styles.eyebrow}>{text.eyebrow}</p>
          <h1>{text.title}</h1>
          <h2>{text.body}</h2>
          <p>{text.question}</p>
        </div>
        <aside className={styles.aside}>
          <strong>{text.asideTitle}</strong>
          <p>{text.asideBody}</p>
        </aside>
      </header>

      <section className={styles.compare}>
        <div className={styles.sectionHead}>
          <h2>{text.compareTitle}</h2>
          <span>{text.compareLabel}</span>
        </div>
        <div className={`${styles.compareGrid} ${styles.threeColumnGrid}`}>
          {text.sections.map((step) => (
            <div className={styles.compareColumn} key={step.label}>
              <h3><small>{step.label}</small>{step.title}</h3>
              <div className={styles.compareItem}><b>{step.label}</b><p>{step.quote}</p></div>
            </div>
          ))}
        </div>
      </section>

      <article className={styles.essay}>
        {text.sections.map((section, index) => (
          <section className={styles.section} key={section.title}>
            <div className={styles.index}><strong>{String(index + 1).padStart(2, "0")}</strong><span>{section.label}</span></div>
            <div className={styles.copy}><h2>{section.title}</h2>{section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}<p className={styles.quote}>{section.quote}</p></div>
            <aside className={styles.source}><small>{text.sourceLabel} / {String(index + 1).padStart(2, "0")}</small><h3>{section.sourceTitle}</h3><p>{section.source}</p><Link href="/cases/dms" className={styles.sourceLink}>{text.sourceLink}</Link></aside>
          </section>
        ))}
      </article>

      <section className={styles.ending}><div className={styles.mark}>→</div><div><h2>{text.endingTitle}</h2><p>{text.endingBody}</p></div></section>
      <footer className={styles.footer}><Link href="/">{text.back}</Link><span>{text.footer}</span></footer>
    </main>
  );
}
