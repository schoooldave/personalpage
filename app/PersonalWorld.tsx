"use client";
import { useEffect, useRef } from "react";
import styles from "./personal-world.module.css";
import type { SiteContent } from "@/lib/i18n/content";
import { localizePath, type Locale } from "@/lib/i18n/config";

export default function PersonalWorld({ onToggle, copy, locale }: { onToggle: () => void; copy: SiteContent["personalWorld"]; locale: Locale }) {
  const universeRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const universe = universeRef.current;
    if (!universe) return;
    let frame = 0;
    const update = () => { frame = 0; const rect = universe.getBoundingClientRect(); const progress = Math.min(1, Math.max(0, (window.innerHeight * .72 - rect.top) / (rect.height * .82))); universe.style.setProperty("--orbit-progress", progress.toFixed(3)); };
    const request = () => { if (!frame) frame = window.requestAnimationFrame(update); };
    update(); window.addEventListener("scroll", request, { passive: true }); window.addEventListener("resize", request);
    return () => { window.removeEventListener("scroll", request); window.removeEventListener("resize", request); if (frame) window.cancelAnimationFrame(frame); };
  }, []);
  return <div className={styles.personalWorldContent}>
    <section ref={universeRef} className={styles.universe}>
      <div className={styles.path}><span className={styles.pathProgress} /></div>
      <article className={`${styles.thought} ${styles.read}`}><small className={styles.orbitalLabel}><i />{copy.reading.label}</small><h2>{copy.reading.title}</h2><p>{copy.reading.body}</p></article>
      <article className={`${styles.thought} ${styles.piano}`}><small className={styles.orbitalLabel}><i />{copy.piano.label}</small><h2>{copy.piano.title}</h2><p>{copy.piano.body}</p><div className={styles.waves}>{[10,32,18,40,14].map((height,index)=><i key={index} style={{height}} />)}</div></article>
      <article className={`${styles.thought} ${styles.ai}`}><small className={styles.orbitalLabel}><i />{copy.ai.label}</small><h2>{copy.ai.title}</h2><p>{copy.ai.body}</p></article>
    </section>
    <section className={styles.ideas}><small className={styles.orbitalLabel}><i />{copy.ideas.label}</small><h2>{copy.ideas.title.split("\n")[0]}<br />{copy.ideas.title.split("\n")[1]}<span>{copy.ideas.emphasis}</span>。</h2><div className={styles.ideaField}><svg className={styles.ideaConstellation} viewBox="0 0 1000 520" aria-hidden="true"><path className={styles.ideaOpenOrbit} d="M90 390 C220 120 410 55 620 145 S820 360 930 105" /><circle className={styles.ideaOrbiter} r="4"><animateMotion dur="20s" repeatCount="indefinite" path="M90 390 C220 120 410 55 620 145 S820 360 930 105" /></circle></svg>{copy.ideas.items.map((item) => <span className={styles.idea} key={item}>{item}</span>)}</div></section>
    <section className={styles.ending}><div><h2>{copy.ending.title.split("\n")[0]}<br />{copy.ending.title.split("\n")[1]}</h2><p>{copy.ending.body}</p><div className={styles.endingLinks}><a href={localizePath("/about", locale)}>{copy.ending.about} ↗</a><button type="button" onClick={onToggle}>{copy.ending.work} ↗</button></div></div><span>{copy.ending.signature}</span></section>
  </div>;
}
