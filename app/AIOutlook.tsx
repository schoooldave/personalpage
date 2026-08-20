import styles from "./ai-outlook.module.css";
import type { SiteContent } from "@/lib/i18n/content";
import { localizedNotePath } from "@/lib/i18n/routes";
import type { Locale } from "@/lib/i18n/config";

export default function AIOutlook({ copy, locale }: { copy: SiteContent["aiOutlookPreview"]; locale: Locale }) {
  return (
    <section className={`${styles.section} motion-ai-outlook`} id="ai-outlook" aria-labelledby="ai-outlook-title">
      <div className={styles.sectionLabel}>
        <span>{copy.index}</span>
        <p>{copy.label}<br /><small>{copy.caption}</small></p>
      </div>
      <div className={styles.content}>
        <p className={`${styles.eyebrow} motion-ai-eyebrow`}>{copy.eyebrow}</p>
        <h2 className="motion-ai-title" id="ai-outlook-title">{copy.title}</h2>
        <p className={`${styles.lead} motion-ai-lead`}>{copy.lead}</p>
        <a className={`${styles.cta} motion-ai-cta`} href={localizedNotePath("ai-outlook", locale)}>{copy.cta} <span>→</span></a>
      </div>
    </section>
  );
}
