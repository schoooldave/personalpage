import { caseDetails } from "@/lib/portfolio";
import styles from "./sfa.module.css";

const sfa = caseDetails.sfa;

export function SfaCaseContent() {
  return <>
    <section className={styles.judgment}><p className={styles.label}>01 / PRODUCT LINE</p><p>{sfa.judgment}</p><div className={styles.domains}>{sfa.domains.map((domain) => <span key={domain}>{domain}</span>)}</div></section>
    <section className={styles.lifecycleSection}><p className={styles.label}>02 / PRODUCT LIFECYCLE</p><h2>日常迭代如何形成完整闭环</h2><div className={styles.lifecycle}>{sfa.lifecycle.map((step, index) => <article key={step.title}><b>{String(index + 1).padStart(2, "0")}</b><h3>{step.title}</h3><p>{step.body}</p></article>)}</div></section>
    <section className={styles.iterations}><p className={styles.label}>03 / REPRESENTATIVE ITERATIONS</p><h2>两个代表性迭代</h2>{sfa.iterations.map((iteration) => <article className={styles.iteration} key={iteration.id}><header><b>{iteration.number}</b><div><h3>{iteration.title}</h3><p>{iteration.subtitle}</p></div></header><div className={styles.problem}><strong>业务问题</strong><p>{iteration.problem}</p></div><div className={styles.evidence}>{iteration.evidence.map((item) => <span key={item}>{item}</span>)}</div><div className={styles.caseGrid}><div><strong>责任边界</strong><p>{iteration.responsibility}</p></div><div><strong>我的动作</strong><ul>{iteration.contribution.map((item) => <li key={item}>{item}</li>)}</ul></div><div><strong>结果</strong><ul>{iteration.outcome.map((item) => <li key={item}>{item}</li>)}</ul></div></div><blockquote>{iteration.insight}</blockquote></article>)}</section>
  </>;
}
