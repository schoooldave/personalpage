import Link from "next/link";
import { notFound } from "next/navigation";
import { caseDetails } from "@/lib/portfolio";
import styles from "./case.module.css";
import { SfaCaseContent } from "./SfaCaseContent";

export function generateStaticParams() {
  return Object.keys(caseDetails).map((slug) => ({ slug }));
}

export default function CasePage({ params }: { params: { slug: string } }) {
  const detail = caseDetails[params.slug as keyof typeof caseDetails];
  if (!detail) notFound();
  const isDms = params.slug === "dms";
  const dms = caseDetails.dms;
  const otherSlug = params.slug === "dms" ? "sfa" : "dms";
  const otherLabel = params.slug === "dms" ? "SFA 销售执行与权限治理" : "全国分销数据治理项目";

  return <main className={styles.page}>
    <nav className={styles.nav}><Link href="/">DAVE / FIELD NOTES</Link><Link href="/#cases">返回工作档案 ↗</Link></nav>
    <header className={styles.header}><p className={styles.eyebrow}>{detail.label}</p><h1>{detail.title}</h1><p className={styles.summary}>{detail.summary}</p><div className={styles.meta}><span>{detail.period}</span><span>{detail.role}</span></div></header>
    <section className={styles.content}>
      <div className={styles.signalRow}>{detail.signals.map(([value, label]) => <div key={label}><strong>{value}</strong><span>{label}</span></div>)}</div>
      {isDms ? <>
        <div className={styles.judgment}><p className={styles.label}>01 / PROJECT JUDGMENT</p><p>{dms.judgment}</p></div>
        <div className={styles.block}><p className={styles.label}>02 / ORIGIN</p><div><h2>问题从哪里开始</h2><p>{dms.background}</p></div></div>
        <div className={styles.tensionBlock}><div><p className={styles.label}>03 / DECISION</p><h2>为什么最终选择这个方案</h2></div><div className={styles.tensions}>{dms.solutionOptions.map((item) => <article key={item.title}><strong>{item.title}</strong><p>{item.body}</p></article>)}</div></div>
        <div className={styles.tensionBlock}><div><p className={styles.label}>04 / ROLLOUT FRICTION</p><h2>真正需要解决的，不只是上线</h2></div><div className={styles.tensions}>{dms.tensions.map((item) => <article key={item.title}><strong>{item.title}</strong><p>{item.body}</p></article>)}</div></div>
        <div className={styles.methodBlock}><p className={styles.label}>05 / HOW I MOVED IT FORWARD</p><div className={styles.method}>{dms.method.map((step, index) => <article key={step.title}><b>0{index + 1}</b><div><h3>{step.title}</h3><p>{step.body}</p></div></article>)}</div></div>
        <div className={styles.block}><p className={styles.label}>06 / MY CONTRIBUTION</p><div><h2>我具体做了什么</h2><div className={styles.contributions}>{dms.contributions.map((item, index) => <article key={item.title}><b>0{index + 1}</b><div><strong>{item.title}</strong><p>{item.body}</p></div></article>)}</div><p className={styles.note}>系统操作、文件解析和异常分派是方案落地的实施证据；项目重点在于我如何把这些能力组织成经销商愿意接受、销售能够推动、总部可以管理的机制。</p></div></div>
        <div className={styles.block}><p className={styles.label}>07 / OUTCOME & METRIC</p><div><h2>结果如何变化</h2><ul>{dms.outcomes.map((outcome) => <li key={outcome}>{outcome}</li>)}</ul></div></div>
        <div className={styles.learning}><p className={styles.label}>08 / WHAT REMAINS</p><h2>项目留下的方法</h2><p>{dms.learning}</p></div>
      </> : <SfaCaseContent />}
      <aside className={styles.boundary}><strong>公开边界</strong><p>{detail.boundary}</p></aside>
    </section>
    <footer className={styles.footer}><Link href={`/cases/${otherSlug}`}>下一个项目：{otherLabel} <span>→</span></Link><Link href="/">回到首页 ↗</Link></footer>
  </main>;
}
