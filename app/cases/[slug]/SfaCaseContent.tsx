import { localizedPortfolio } from "@/lib/i18n/portfolio";
import type { Locale } from "@/lib/i18n/config";
import styles from "./sfa.module.css";

export function SfaCaseContent({ locale }: { locale: Locale }) {
  const portfolio = localizedPortfolio[locale];
  const sfa = portfolio.caseDetails.sfa;
  const chrome = portfolio.portfolioPageChrome.sfa;
  return <>
    <section className={styles.judgment}><p className={styles.label}>{chrome.judgmentLabel}</p><p>{sfa.judgment}</p><div className={styles.domains}>{sfa.domains.map((domain) => <span key={domain}>{domain}</span>)}</div></section>
    <section className={styles.lifecycleSection}><p className={styles.label}>{chrome.lifecycleLabel}</p><h2>{chrome.lifecycleTitle}</h2><p style={{ maxWidth: 760, margin: "0 0 30px", fontSize: 16, lineHeight: 1.9, opacity: 0.68 }}>{chrome.lifecycleBody}</p><div className={styles.lifecycle}>{sfa.lifecycle.map((step, index) => <article key={step.title}><b>{String(index + 1).padStart(2, "0")}</b><h3>{step.title}</h3><p>{step.body}</p></article>)}</div></section>
    <section className={styles.iterations}><p className={styles.label}>{chrome.iterationsLabel}</p><h2>{chrome.iterationsTitle}</h2><p style={{ maxWidth: 760, margin: "0 0 30px", fontSize: 16, lineHeight: 1.9, opacity: 0.68 }}>{chrome.iterationsBody}</p>{sfa.iterations.map((iteration) => <article className={styles.iteration} key={iteration.id}><header><b>{iteration.number}</b><div><h3>{iteration.title}</h3><p>{iteration.subtitle}</p></div></header><div className={styles.problem}><strong>{chrome.problem}</strong><p>{iteration.problem}</p></div><div className={styles.evidence}>{iteration.evidence.map((item) => <span key={item}>{item}</span>)}</div><div className={styles.caseGrid}><div><strong>{chrome.responsibility}</strong><p>{iteration.responsibility}</p></div><div><strong>{chrome.contribution}</strong><ul>{iteration.contribution.map((item) => <li key={item}>{item}</li>)}</ul></div><div><strong>{chrome.outcome}</strong><ul>{iteration.outcome.map((item) => <li key={item}>{item}</li>)}</ul></div></div><blockquote>{iteration.insight}</blockquote></article>)}</section>
  </>;
}
