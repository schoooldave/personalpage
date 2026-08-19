"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import styles from "./page.module.css";
import effects from "./effects.module.css";
import MotionLayer from "./MotionLayer";
import FieldNotesPreview from "./FieldNotesPreview";
import AIOutlook from "./AIOutlook";
import PersonalWorld from "./PersonalWorld";
import PersonalHero from "./PersonalHero";
import { portfolioSummary, workCases } from "@/lib/portfolio";
import { usePathname } from "next/navigation";
import { normalizeLocale } from "@/lib/i18n/config";
import { localizedPortfolio } from "@/lib/i18n/portfolio";
import { siteContent } from "@/lib/i18n/content";
import LanguageSwitcher from "./LanguageSwitcher";

function StarMap({ active }: { active: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerRef = useRef({ x: 0.5, y: 0.45 });

  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;
    const stars = Array.from({ length: 72 }, (_, index) => ({
      x: (index * 47 % 100) / 100, y: (index * 83 % 100) / 100,
      radius: index % 9 === 0 ? 1.8 : 0.7 + (index % 3) * 0.35,
      alpha: 0.38 + (index % 5) * 0.1,
    }));
    const draw = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      const width = canvas.clientWidth; const height = canvas.clientHeight;
      canvas.width = width * ratio; canvas.height = height * ratio;
      context.setTransform(ratio, 0, 0, ratio, 0, 0); context.clearRect(0, 0, width, height);
      const { x, y } = pointerRef.current;
      const gradient = context.createRadialGradient(width * x, height * y, 0, width * x, height * y, width * 0.7);
      gradient.addColorStop(0, "rgba(106, 114, 255, .2)"); gradient.addColorStop(1, "rgba(8, 10, 31, 0)");
      context.fillStyle = gradient; context.fillRect(0, 0, width, height);
      stars.forEach((star, index) => {
        context.beginPath(); context.arc(star.x * width, star.y * height + Math.sin(Date.now() / 1800 + index) * 0.5, star.radius, 0, Math.PI * 2);
        context.fillStyle = `rgba(222, 225, 255, ${star.alpha})`; context.fill();
      });
    };
    let frame = requestAnimationFrame(function animate() { draw(); frame = requestAnimationFrame(animate); });
    window.addEventListener("resize", draw);
    return () => { cancelAnimationFrame(frame); window.removeEventListener("resize", draw); };
  }, [active]);

  if (!active) return null;
  return <canvas ref={canvasRef} className={styles.starMap} aria-label="随鼠标移动产生微光变化的个人星图" onPointerMove={(event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    pointerRef.current = { x: (event.clientX - rect.left) / rect.width, y: (event.clientY - rect.top) / rect.height };
  }} />;
}

function PointerEffects() {
  const orbRef = useRef<HTMLElement>(null);
  const trailRefs = useRef<Array<HTMLElement | null>>([]);
  const target = useRef({ x: -100, y: -100 });
  const positions = useRef(Array.from({ length: 5 }, () => ({ x: -100, y: -100 })));
  const frameRef = useRef<number | null>(null);
  useEffect(() => {
    const animate = () => {
      frameRef.current = null;
      let moving = false;
      positions.current.forEach((position, index) => {
        const source = index === 0 ? target.current : positions.current[index - 1];
        const dx = source.x - position.x;
        const dy = source.y - position.y;
        position.x += dx * (index === 0 ? 0.24 : 0.16);
        position.y += dy * (index === 0 ? 0.24 : 0.16);
        moving ||= Math.abs(dx) > 0.2 || Math.abs(dy) > 0.2;
        const node = index === 0 ? orbRef.current : trailRefs.current[index - 1];
        if (node) node.style.transform = `translate3d(${position.x}px, ${position.y}px, 0)`;
      });
      if (moving) frameRef.current = window.requestAnimationFrame(animate);
    };
    const schedule = () => { if (frameRef.current === null) frameRef.current = window.requestAnimationFrame(animate); };
    const move = (event: PointerEvent) => { target.current = { x: event.clientX, y: event.clientY }; schedule(); };
    const leave = () => { target.current = { x: -100, y: -100 }; schedule(); };
    window.addEventListener("pointermove", move); window.addEventListener("pointerleave", leave);
    return () => { if (frameRef.current !== null) window.cancelAnimationFrame(frameRef.current); window.removeEventListener("pointermove", move); window.removeEventListener("pointerleave", leave); };
  }, []);
  return <div className={effects.pointerEffects} aria-hidden="true"><span ref={orbRef} className={effects.pointerOrb} />{Array.from({ length: 4 }, (_, index) => <span key={index} ref={(node) => { trailRefs.current[index] = node; }} className={effects.pointerTrail} />)}</div>;
}

export default function Home() {
  const pathname = usePathname();
  const locale = normalizeLocale(pathname.split("/")[1] ?? "") ?? "zh-CN";
  const copy = siteContent[locale];
  const localized = localizedPortfolio[locale];
  const [world, setWorld] = useState<"personal" | "work">("personal");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const toggleWorld = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    window.setTimeout(() => setWorld(world === "personal" ? "work" : "personal"), 220);
    window.setTimeout(() => setIsTransitioning(false), 720);
  };
  return <main className={`${styles.site} ${world === "work" ? styles.workWorld : styles.personalWorld}`}>
    <MotionLayer world={world} />
    <div className={`${styles.transitionVeil} ${isTransitioning ? styles.transitionVeilActive : ""}`} aria-hidden="true" />
    <PointerEffects />
    <StarMap active={world === "personal"} />
    <nav className={styles.nav} aria-label={copy.nav.mainLabel}>
      <span className={styles.brand}>{world === "work" ? <><b>{copy.nav.brandWorkTitle}</b><small>{copy.nav.brandWorkSubtitle}</small></> : copy.nav.brandPersonal}</span>
      <div className={styles.navLinks}>{world === "work" && <a href="#cases">{copy.nav.workFiles}</a>}{world === "work" && <a href="/notes">{copy.nav.fieldNotes}</a>}<a href="/about">{copy.nav.about}</a><LanguageSwitcher locale={locale} pathname={pathname} /><button type="button" onClick={toggleWorld}>{world === "personal" ? copy.nav.enterWork : copy.nav.enterPersonal}</button></div>
    </nav>
    {world === "personal" ? <PersonalHero onToggle={toggleWorld} copy={copy.personalHero} /> : <section className={styles.hero} id="about">
      <p className={styles.eyebrow}>{copy.home.workHero.eyebrow}</p>
      <h1>{copy.home.workHero.title.split("\n").map((line) => <span key={line}>{line}<br /></span>)}</h1>
      <p className={styles.heroCopy}>{copy.home.workHero.body}</p>
      <div className={styles.heroActions}><a className={styles.primaryAction} href="#cases">{copy.home.workHero.primaryAction} <span>↘</span></a><button className={styles.textAction} type="button" onClick={toggleWorld}>{copy.nav.switchView}</button></div>
      <div className={styles.orbitNote} aria-hidden="true">{copy.home.workHero.orbit.map((item) => <span key={item}>{item}</span>)}</div>
      <div className={`${effects.workHeroVisual} ${world === "work" ? effects.workVisualActive : ""}`} aria-hidden="true"><Image src="/images/work-world-field.png" alt="" fill priority sizes="(max-width: 720px) 92vw, 45vw" /></div>
      {world === "work" && <div className={styles.industryMark} aria-label={copy.home.workHero.industry.label}><span>{copy.home.workHero.industry.label}</span><small>{copy.home.workHero.industry.caption}</small><b>●</b></div>}
    </section>}
    {world === "work" && <section className={`${styles.careerArc} motion-career-arc`} aria-label="能力路径"><div className={styles.arcTitle}><span>01</span><p>能力路径<br /><small>CAPABILITY ARC</small></p><h2>从业务洞察，<br />到系统化解题</h2><p className={styles.arcIntro}>在 FMCG 一线业务与数字化实践之间，形成从问题识别、系统构建到管理协同的能力路径。</p></div><div className={styles.arcSteps}><div className="motion-arc-step"><b>业务洞察</b><strong>从一线业务中识别关键问题</strong><p>通过一线市场与终端执行，理解渠道、门店、销售与经销商之间的真实业务关系，结合业务目标、执行流程与现场结果，识别影响落地的关键差距。</p><em>一线业务实践 · 2020—2022<br />代表实践：终端门店执行 · 渠道现场反馈</em></div><div className="motion-arc-step"><b>数字化构建</b><strong>将业务问题转化为系统能力</strong><p>从业务流程、角色协同与数据关系出发，完成需求分析、方案设计、产品协同与上线验证，将一线问题转化为可运行、可追踪的产品与系统方案。</p><em>数字化产品与系统实践 · 2022—2023<br />代表实践：SFA 深度迭代 · 数据权限治理</em></div><div className="motion-arc-step"><b>管理变革</b><strong>推动管理机制与数字化能力协同演进</strong><p>围绕业务目标、组织协同与数据反馈，推动管理规则与工作方式持续调整，使数字化能力从系统应用延伸到日常管理，并形成可持续的运行机制。</p><em>产品经理职能 · 2023—2025<br />代表实践：全国分销数据治理项目</em></div></div></section>}
    {world === "work" && <FieldNotesPreview />}
    {world === "personal" && <PersonalWorld onToggle={toggleWorld} copy={copy.personalWorld} />}
    {world === "work" && <section className={`${styles.cases} motion-cases`} id="cases">
      <div className={styles.sectionLabel}><span>{copy.home.cases.index}</span><p>{copy.home.cases.label}<br /><small>{copy.home.cases.caption}</small></p></div>
      <div className={styles.caseGrid}>{localized.workCases.map((item, index) => <article className={`${styles.caseCard} motion-case-card`} key={item.id}><p className={styles.cardIndex}>0{index + 1} / 02</p><p className={styles.cardPeriod}>{item.period}</p><h2>{item.title}</h2><div className={styles.cardMetric}><strong className="motion-case-metric">{item.metric}</strong><span>{item.metricLabel}</span></div><a href={`/cases/${item.id}`}>{copy.home.cases.open} <span>→</span></a></article>)}</div>
    </section>}
    {world === "work" && <AIOutlook copy={copy.aiOutlookPreview} />}
    {world === "work" && <section className={styles.recruiterBar} aria-label="招聘方快速阅读">
      <p><span>{copy.home.recruiterBar.label}</span> {copy.home.recruiterBar.body}</p>
      <div><a href="/about">{copy.home.recruiterBar.about} <span>↗</span></a><a href="mailto:schooldave@live.com">{copy.home.recruiterBar.email} <span>↗</span></a></div>
    </section>}
  </main>;
}
