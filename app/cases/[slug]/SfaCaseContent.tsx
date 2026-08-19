import { caseDetails } from "@/lib/portfolio";
import styles from "./sfa.module.css";

const sfa = caseDetails.sfa;

export function SfaCaseContent() {
  return <>
    <section className={styles.judgment}><p className={styles.label}>01 / PRODUCT LINE</p><p>{sfa.judgment}</p><div className={styles.domains}>{sfa.domains.map((domain) => <span key={domain}>{domain}</span>)}</div></section>
    <section className={styles.lifecycleSection}><p className={styles.label}>02 / FROM REQUEST TO GOVERNANCE</p><h2>一条产品线，如何持续形成闭环</h2><p style={{ maxWidth: 760, margin: "0 0 30px", fontSize: 16, lineHeight: 1.9, opacity: 0.68 }}>日常需求不是零散功能的堆积，而是从业务问题出发，经过规则澄清、产品化和上线反馈，逐步沉淀为可维护的流程与关系模型。</p><div className={styles.lifecycle}>{sfa.lifecycle.map((step, index) => <article key={step.title}><b>{String(index + 1).padStart(2, "0")}</b><h3>{step.title}</h3><p>{step.body}</p></article>)}</div></section>
    <section className={styles.iterations}><p className={styles.label}>03 / TWO REPRESENTATIVE ITERATIONS</p><h2>两个案例，验证产品线能力</h2><p style={{ maxWidth: 760, margin: "0 0 30px", fontSize: 16, lineHeight: 1.9, opacity: 0.68 }}>下面两个迭代分别代表两类典型工作：把复杂业务标准转成系统能力，以及从功能异常继续追到组织关系问题。</p>{sfa.iterations.map((iteration) => <article className={styles.iteration} key={iteration.id}><header><b>{iteration.number}</b><div><h3>{iteration.title}</h3><p>{iteration.subtitle}</p></div></header><div className={styles.problem}><strong>业务问题</strong><p>{iteration.problem}</p></div><div className={styles.evidence}>{iteration.evidence.map((item) => <span key={item}>{item}</span>)}</div><div className={styles.caseGrid}><div><strong>责任边界</strong><p>{iteration.responsibility}</p></div><div><strong>我的动作</strong><ul>{iteration.contribution.map((item) => <li key={item}>{item}</li>)}</ul></div><div><strong>结果</strong><ul>{iteration.outcome.map((item) => <li key={item}>{item}</li>)}</ul></div></div><blockquote>{iteration.insight}</blockquote></article>)}</section>
  </>;
}
