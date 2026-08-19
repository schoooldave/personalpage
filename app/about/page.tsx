import Link from "next/link";
import styles from "./about.module.css";
import contactStyles from "./contact.module.css";

const strengths = [
  ["现场判断", "从一线督导和经销商沟通开始，先理解问题如何发生，再决定系统如何介入。"],
  ["产品推进", "能够独立完成需求梳理、方案设计、数据结构、页面设计、研发协作和上线验证。"],
  ["组织协同", "在业务、销售、经销商、研发和管理部门之间建立共同语言，把复杂流程推进到可执行。"],
  ["持续治理", "上线不是终点，会继续观察使用数据、异常来源、培训效果和规则是否真正被执行。"],
];

export default function AboutPage() {
  return <main className={styles.page}>
    <nav className={styles.nav}><Link href="/">DAVE / FIELD NOTES</Link><Link href="/">回到个人世界 ↗</Link></nav>
    <header className={styles.hero}><p className={styles.eyebrow}>ABOUT / A WORKING METHOD</p><h1>我不是只做系统，<br />我负责让系统在现场发生作用。</h1><p className={styles.lead}>从一线业务到总部产品与项目主导，我持续参与快消行业数字化实践。擅长把模糊的业务问题，整理成可以被理解、被执行、被追踪的系统。</p></header>
    <section className={styles.timeline}><div className={styles.timelineTitle}><span>01</span><p>经历路径<br /><small>CAREER ARC</small></p></div><div className={styles.steps}><div><b>2020—2022</b><strong>区域渠道督导</strong><p>接触门店、经销商和销售执行，建立对业务现场的直接理解。</p></div><div><b>2022—2025</b><strong>销售数字化产品负责人（SFA / DMS）</strong><p>负责 SFA 与 DMS 产品体系，持续推进销售执行产品迭代，并主导全国分销数据治理项目的方案建设、上线推广、指标治理与管理机制落地。</p></div><div><b>2025—2026</b><strong>阶段性空档期</strong><p>处理个人生活事项，系统探索 AI 应用，并重新梳理职业经验与下一阶段方向。</p></div></div></section>
    <section className={styles.strengths}><div className={styles.sectionHead}><p className={styles.eyebrow}>WHAT I BRING</p><h2>我能带来的，不只是一个交付结果。</h2></div><div className={styles.grid}>{strengths.map(([title, text], index) => <article key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{text}</p></article>)}</div></section>
    <section className={contactStyles.contact} id="contact"><p className={styles.eyebrow}>OPEN TO A CONVERSATION</p><h2>如果你正在寻找这样的产品伙伴，欢迎继续了解。</h2><div className={contactStyles.contactGrid}><div><span>RESUME</span><strong>简历版本待接入</strong><p>正式 PDF 将在后续加入，当前保留占位入口。</p><a className={contactStyles.placeholder} href="#contact">准备中 ↗</a></div><div><span>CONTACT</span><strong>schooldave@live.com</strong><p>欢迎通过邮件交流产品、项目和数字化业务机会。</p><a className={contactStyles.placeholder} href="mailto:schooldave@live.com">发送邮件 ↗</a></div></div></section>
    <footer className={styles.footer}><Link href="/">← 回到首页</Link><Link href="/cases/dms">查看代表项目 ↗</Link></footer>
  </main>;
}
