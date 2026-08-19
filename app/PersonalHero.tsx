"use client";

import Image from "next/image";
import styles from "./personal-world.module.css";
import type { SiteContent } from "@/lib/i18n/content";

export default function PersonalHero({ onToggle, copy }: { onToggle: () => void; copy: SiteContent["personalHero"] }) {
  return <section className={styles.personalHero} id="about">
    <div className={styles.personalHeroCopy}><p className={styles.personalEyebrow}>{copy.eyebrow}</p><h1>{copy.title.split("\n")[0]}<br />{copy.title.split("\n")[1]}<span>{copy.emphasis}</span>。</h1><p>{copy.body}</p></div>
    <div className={styles.personalHeroEarth} aria-hidden="true"><div className={styles.personalEarthGlow} /><Image src="/images/personal-earth.png" alt="" fill priority sizes="(max-width: 720px) 72vw, 39vw" /></div><span className={styles.personalPlanetTwo} aria-hidden="true" />
    <span className={styles.personalHeroHint}>{copy.scroll}</span>
    <button type="button" className={styles.personalHeroToggle} onClick={onToggle}>{copy.toggle}</button>
  </section>;
}
