"use client";
import { useEffect, useRef } from "react";
import styles from "./personal-world.module.css";

export default function PersonalWorld({ onToggle }: { onToggle: () => void }) {
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
      <article className={`${styles.thought} ${styles.read}`}><small className={styles.orbitalLabel}><i />READING / INNER FREEDOM</small><h2>阅读，是为了看见那些无形的枷锁。</h2><p>读书让我更深地认识世界。理解得越多，越有机会突破被习惯、环境和已有经验限制的思维，让自己获得更真实的自由。</p></article>
      <article className={`${styles.thought} ${styles.piano}`}><small className={styles.orbitalLabel}><i />PIANO / SOMEDAY</small><h2>有一天，想真正学会钢琴。</h2><p>它的声音很优美，也能让人安静下来。我想探索音乐能带来的情绪——这是一件不着急，但愿意长期靠近的事。</p><div className={styles.waves}>{[10,32,18,40,14].map((height,index)=><i key={index} style={{height}} />)}</div></article>
      <article className={`${styles.thought} ${styles.ai}`}><small className={styles.orbitalLabel}><i />AI / IDEAS IN MOTION</small><h2>想到什么，就先让它靠近现实一点。</h2><p>语言学习、线下活动、自我约束与成长记录……这些想法时不时冒出来。我想试试，AI 能不能把其中一些变成真正有用、也能创造收入的产品。</p></article>
    </section>
    <section className={styles.ideas}><small className={styles.orbitalLabel}><i />IDEA PARKING ORBIT</small><h2>还没有完成，<br />但已经开始<span>发光</span>。</h2><div className={styles.ideaField}><svg className={styles.ideaConstellation} viewBox="0 0 1000 520" aria-hidden="true"><path className={styles.ideaOpenOrbit} d="M90 390 C220 120 410 55 620 145 S820 360 930 105" /><circle className={styles.ideaOrbiter} r="4"><animateMotion dur="20s" repeatCount="indefinite" path="M90 390 C220 120 410 55 620 145 S820 360 930 105" /></circle></svg><span className={styles.idea}>AI 语言学习伙伴</span><span className={styles.idea}>附近值得去的展览</span><span className={styles.idea}>博物馆与博览会地图</span><span className={styles.idea}>自我约束记录</span><span className={styles.idea}>成长轨迹与反馈</span></div></section>
    <section className={styles.ending}><div><h2>这是我的另一面。<br />工作，只是其中一部分。</h2><p>继续认识我，或者进入那个更理性、更结构化的工作世界。</p><div className={styles.endingLinks}><a href="/about">关于我 ↗</a><button type="button" onClick={onToggle}>进入工作世界 ↗</button></div></div><span>BUILT WHILE FIGURING THINGS OUT</span></section>
  </div>;
}
