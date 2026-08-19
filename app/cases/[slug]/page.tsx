import Link from "next/link";
import { notFound } from "next/navigation";
import { getRequestLocale } from "@/lib/i18n/server";
import { localizedPortfolio } from "@/lib/i18n/portfolio";
import styles from "./case.module.css";
import { SfaCaseContent } from "./SfaCaseContent";
import LanguageSwitcher from "../../LanguageSwitcher";

export function generateStaticParams() { return [{ slug: "dms" }, { slug: "sfa" }]; }

export default function CasePage({ params }: { params: { slug: string } }) {
  const locale = getRequestLocale();
  const portfolio = localizedPortfolio[locale];
  const detail = portfolio.caseDetails[params.slug as keyof typeof portfolio.caseDetails];
  if (!detail) notFound();
  const isDms = params.slug === "dms";
  const dms = portfolio.caseDetails.dms;
  const chrome = portfolio.portfolioPageChrome;
  const otherSlug = isDms ? "sfa" : "dms";
  return <main className={styles.page} lang={locale === "zh-CN" ? "zh-CN" : locale}>
    <nav className={styles.nav}><Link href="/">{chrome.nav.home}</Link><div><LanguageSwitcher locale={locale} pathname={`/cases/${params.slug}`} /> <Link href="/#cases">{chrome.nav.backToCases}</Link></div></nav>
    <header className={styles.header}><p className={styles.eyebrow}>{detail.label}</p><h1>{detail.title}</h1><p className={styles.summary}>{detail.summary}</p><div className={styles.meta}><span>{detail.period}</span><span>{detail.role}</span></div></header>
    <section className={styles.content}><div className={styles.signalRow}>{detail.signals.map(([value, label]) => <div key={label}><strong>{value}</strong><span>{label}</span></div>)}</div>
      {isDms ? <><div className={styles.judgment}><p className={styles.label}>{chrome.dms.judgmentLabel}</p><p>{dms.judgment}</p></div><div className={styles.block}><p className={styles.label}>{chrome.dms.originLabel}</p><div><h2>{chrome.dms.originTitle}</h2><p>{dms.background}</p></div></div><div className={styles.tensionBlock}><div><p className={styles.label}>{chrome.dms.decisionLabel}</p><h2>{chrome.dms.decisionTitle}</h2></div><div className={styles.tensions}>{dms.solutionOptions.map((item) => <article key={item.title}><strong>{item.title}</strong><p>{item.body}</p></article>)}</div></div><div className={styles.tensionBlock}><div><p className={styles.label}>{chrome.dms.frictionLabel}</p><h2>{chrome.dms.frictionTitle}</h2></div><div className={styles.tensions}>{dms.tensions.map((item) => <article key={item.title}><strong>{item.title}</strong><p>{item.body}</p></article>)}</div></div><div className={styles.methodBlock}><p className={styles.label}>{chrome.dms.methodLabel}</p><div className={styles.method}>{dms.method.map((step, index) => <article key={step.title}><b>0{index + 1}</b><div><h3>{step.title}</h3><p>{step.body}</p></div></article>)}</div></div><div className={styles.block}><p className={styles.label}>{chrome.dms.contributionLabel}</p><div><h2>{chrome.dms.contributionTitle}</h2><div className={styles.contributions}>{dms.contributions.map((item, index) => <article key={item.title}><b>0{index + 1}</b><div><strong>{item.title}</strong><p>{item.body}</p></div></article>)}</div><p className={styles.note}>{chrome.dms.contributionNote}</p></div></div><div className={styles.block}><p className={styles.label}>{chrome.dms.outcomeLabel}</p><div><h2>{chrome.dms.outcomeTitle}</h2><ul>{dms.outcomes.map((outcome) => <li key={outcome}>{outcome}</li>)}</ul></div></div><div className={styles.learning}><p className={styles.label}>{chrome.dms.learningLabel}</p><h2>{chrome.dms.learningTitle}</h2><p>{dms.learning}</p></div></> : <SfaCaseContent locale={locale} />}
      <aside className={styles.boundary}><strong>{chrome.boundaryLabel}</strong><p>{detail.boundary}</p></aside>
    </section><footer className={styles.footer}><Link href={`/cases/${otherSlug}`}>{chrome.nextProject}{chrome.otherLabels[otherSlug]} <span>→</span></Link><Link href="/">{chrome.backHome}</Link></footer>
  </main>;
}
