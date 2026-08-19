"use client";

import Image from "next/image";
import styles from "./personal-world.module.css";

export default function PersonalHero({ onToggle }: { onToggle: () => void }) {
  return <section className={styles.personalHero} id="about">
    <div className={styles.personalHeroCopy}><p className={styles.personalEyebrow}>A PERSONAL UNIVERSE, ALWAYS IN MOTION</p><h1>在现实里生活，<br />也给自己保留一点<span>自由</span>。</h1><p>我喜欢读书，也想学会钢琴。生活让我不得不向钱看齐，于是我开始用 AI 试探更多可能——在理想、压力和行动之间，慢慢搭建属于自己的世界。</p></div>
    <div className={styles.personalHeroEarth} aria-hidden="true"><div className={styles.personalEarthGlow} /><Image src="/images/personal-earth.png" alt="" fill priority sizes="(max-width: 720px) 72vw, 39vw" /></div><span className={styles.personalPlanetTwo} aria-hidden="true" />
    <span className={styles.personalHeroHint}>SCROLL / FOLLOW THE ORBIT ↓</span>
    <button type="button" className={styles.personalHeroToggle} onClick={onToggle}>切换视角</button>
  </section>;
}
