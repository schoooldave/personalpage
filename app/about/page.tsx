import Link from "next/link";
import { getRequestLocale } from "@/lib/i18n/server";
import { localizePath } from "@/lib/i18n/config";
import { siteContent } from "@/lib/i18n/content";
import styles from "./about.module.css";
import contactStyles from "./contact.module.css";
import LanguageSwitcher from "../LanguageSwitcher";

export default function AboutPage() {
  const locale = getRequestLocale();
  const copy = siteContent[locale].about;
  return <main className={styles.page} lang={locale === "zh-CN" ? "zh-CN" : locale}>
    <nav className={styles.nav}><Link href={localizePath("/", locale)}>DAVE / FIELD NOTES</Link><div><LanguageSwitcher locale={locale} pathname="/about" /> <Link href={localizePath("/", locale)}>{copy.nav.personal}</Link></div></nav>
    <header className={styles.hero}><p className={styles.eyebrow}>{copy.hero.eyebrow}</p><h1>{copy.hero.title}</h1><p className={styles.lead}>{copy.hero.lead}</p></header>
    <section className={styles.timeline}><div className={styles.timelineTitle}><span>{copy.timeline.index}</span><p>{copy.timeline.label}<br /><small>{copy.timeline.caption}</small></p></div><div className={styles.steps}>{copy.timeline.steps.map((step) => <div key={step.period}><b>{step.period}</b><strong>{step.title}</strong><p>{step.body}</p></div>)}</div></section>
    <section className={styles.strengths}><div className={styles.sectionHead}><p className={styles.eyebrow}>{copy.strengths.eyebrow}</p><h2>{copy.strengths.title}</h2></div><div className={styles.grid}>{copy.strengths.items.map((item, index) => <article key={item.title}><span>0{index + 1}</span><h3>{item.title}</h3><p>{item.body}</p></article>)}</div></section>
    <section className={contactStyles.contact} id="contact"><p className={styles.eyebrow}>{copy.contact.eyebrow}</p><h2>{copy.contact.title}</h2><div className={contactStyles.contactGrid}><div><span>{copy.contact.resumeLabel}</span><strong>{copy.contact.resumeTitle}</strong><p>{copy.contact.resumeBody}</p><a className={contactStyles.placeholder} href="#contact">{copy.contact.resumeAction}</a></div><div><span>{copy.contact.contactLabel}</span><strong>{copy.contact.email}</strong><p>{copy.contact.contactBody}</p><a className={contactStyles.placeholder} href="mailto:schooldave@live.com">{copy.contact.emailAction}</a></div></div></section>
    <footer className={styles.footer}><Link href={localizePath("/", locale)}>{copy.footer.home}</Link><Link href={localizePath("/cases/dms", locale)}>{copy.footer.cases}</Link></footer>
  </main>;
}
