import styles from "./ai-outlook.module.css";

export default function AIOutlook() {
  return (
    <section className={`${styles.section} motion-ai-outlook`} id="ai-outlook" aria-labelledby="ai-outlook-title">
      <div className={styles.sectionLabel}>
        <span>04</span>
        <p>AI 能力展望<br /><small>FROM PRACTICE TO AI</small></p>
      </div>
      <div className={styles.content}>
        <p className={`${styles.eyebrow} motion-ai-eyebrow`}>FROM DIGITAL PRACTICE TO AI CAPABILITY</p>
        <h2 className="motion-ai-title" id="ai-outlook-title">从真实业务问题，走向下一代工作方式</h2>
        <p className={`${styles.lead} motion-ai-lead`}>我关注的不是给系统增加一个 AI 功能，而是让它开始<span className={styles.emphasis}>理解业务现场</span>、<span className={styles.emphasis}>辅助判断</span>，并<span className={styles.emphasis}>推动下一步行动</span>。</p>
        <a className={`${styles.cta} motion-ai-cta`} href="/notes/ai-outlook">完整 AI 能力展望 <span>→</span></a>
      </div>
    </section>
  );
}
