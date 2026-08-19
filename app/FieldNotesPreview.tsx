"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
} from "react";
import type { Locale } from "@/lib/i18n/config";
import { localizePath } from "@/lib/i18n/config";
import { clampProgress, sceneFromProgress } from "./field-notes/scene-progress";
import styles from "./fieldnotes.module.css";

export default function FieldNotesPreview({ locale }: { locale: Locale }) {
  const judgments = locale === "en" ? [
    { number: "01", title: "Data does not equal value", body: "Data collection is not the finish line. Data enters the value chain only when it helps the business understand problems, support judgment and create action.", track: [{ label: "Collect", note: "Reliably capture data across the business process." }, { label: "Trust", note: "Use rules and validation to remove false signals." }, { label: "Decide", note: "Bring useful signals into judgment and action." }] },
    { number: "02", title: "A system does not equal a business loop", body: "A system can record processes and results, but solving problems still requires organizational coordination, management feedback and continuous adjustment.", track: [{ label: "System", note: "Record processes, states and business results." }, { label: "Mechanism", note: "Let coordination, feedback and rules change together." }, { label: "Action", note: "Turn management requirements into field change." }] },
    { number: "03", title: "Go-live does not equal continued use", body: "Go-live only means that a capability has entered the organization. Real change depends on smooth processes, accepted roles and mechanisms that keep adoption moving.", track: [{ label: "Deploy", note: "Bring the capability into the organization." }, { label: "Use", note: "Help roles enter the process and keep operating." }, { label: "Adopt", note: "Make the system part of daily business and management." }] },
  ] : locale === "ja" ? [
    { number: "01", title: "データは価値そのものではない", body: "データ収集は終点ではありません。業務の理解、判断、行動につながって初めて、データは価値の流れに入ります。", track: [{ label: "収集", note: "業務プロセスを安定して記録する。" }, { label: "信頼", note: "ルールと検証で誤った信号を除く。" }, { label: "判断", note: "有効な信号を判断と行動につなげる。" }] },
    { number: "02", title: "システムは業務の完結ではない", body: "システムはプロセスと結果を記録できますが、問題を解くには組織の連携、管理のフィードバック、継続的な調整が必要です。", track: [{ label: "システム", note: "プロセス、状態、業務結果を記録する。" }, { label: "仕組み", note: "連携、フィードバック、ルールを一緒に変える。" }, { label: "行動", note: "管理要件を現場の変化につなげる。" }] },
    { number: "03", title: "稼働は継続利用を意味しない", body: "稼働は機能が組織に入ったことを示すだけです。本当の変化には、円滑なプロセス、受け入れられる役割、利用を支える仕組みが必要です。", track: [{ label: "導入", note: "機能を組織に届け、技術提供を終える。" }, { label: "利用", note: "役割を担う人がプロセスを使い続ける。" }, { label: "定着", note: "システムを日常業務と管理の一部にする。" }] },
  ] : [
    { number: "01", title: "数据不等于价值", body: "数据采集不是终点。只有当数据能够帮助业务理解问题、支持判断并产生行动时，数据才真正进入业务价值链。", track: [{ label: "采集", note: "稳定获得覆盖业务过程的数据。" }, { label: "可信", note: "通过规则和验证排除错误信号。" }, { label: "决策", note: "让有效信号进入判断与行动。" }] },
    { number: "02", title: "系统不等于业务闭环", body: "系统可以记录流程和结果，但问题的解决仍然需要组织协同、管理反馈和持续调整。", track: [{ label: "系统", note: "记录流程、状态与业务结果。" }, { label: "机制", note: "组织协同、反馈和规则同步改变。" }, { label: "行动", note: "管理要求真正转化为现场变化。" }] },
    { number: "03", title: "上线不等于持续使用", body: "系统完成上线，只代表功能进入了组织。真正的改变还取决于流程是否顺畅、角色是否接受，以及管理机制是否能够持续推动使用。", track: [{ label: "部署", note: "功能进入组织，完成技术交付。" }, { label: "使用", note: "角色愿意进入流程并持续操作。" }, { label: "采用", note: "系统成为日常业务与管理的一部分。" }] },
  ] as const;
  const labels = locale === "en" ? {
    section: "Field Notes", note: ["Data does not equal value", "A system does not equal a business loop", "Go-live does not equal continued use"], open: "Open field note ↗"
  } : locale === "ja" ? {
    section: "業界ノート", note: ["データは価値そのものではない", "システムは業務の完結ではない", "稼働は継続利用を意味しない"], open: "ノートを読む ↗"
  } : {
    section: "行业思考", note: ["数据不等于价值", "系统不等于业务闭环", "上线不等于持续使用"], open: "打开行业笔记 ↗"
  };
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const sceneRefs = useRef<Array<HTMLElement | null>>([]);
  const activeSceneRef = useRef(0);
  const reducedMotionRef = useRef(false);
  const narrowViewportRef = useRef(false);
  const pointerFrameRef = useRef<number | null>(null);
  const pointerPositionRef = useRef({ x: 0, y: 0 });
  const [activeScene, setActiveScene] = useState(0);
  const [activeSteps, setActiveSteps] = useState([0, 0, 0]);
  const [isNearEnd, setIsNearEnd] = useState(false);
  const [activeFeatured, setActiveFeatured] = useState<number | null>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isNarrow, setIsNarrow] = useState(false);
  const staticLayout = prefersReducedMotion || isNarrow;
  const visualScene = activeScene;

  useEffect(() => {
    const motionMedia = window.matchMedia("(prefers-reduced-motion: reduce)");
    const narrowMedia = window.matchMedia("(max-width: 760px)");
    const updatePreference = () => {
      reducedMotionRef.current = motionMedia.matches;
      narrowViewportRef.current = narrowMedia.matches;
      setPrefersReducedMotion(motionMedia.matches);
      setIsNarrow(narrowMedia.matches);

      if (motionMedia.matches || narrowMedia.matches) {
        if (pointerFrameRef.current !== null) {
          window.cancelAnimationFrame(pointerFrameRef.current);
          pointerFrameRef.current = null;
        }
        stageRef.current?.style.setProperty("--pointer-x", "0");
        stageRef.current?.style.setProperty("--pointer-y", "0");
      }
    };

    updatePreference();
    motionMedia.addEventListener("change", updatePreference);
    narrowMedia.addEventListener("change", updatePreference);

    return () => {
      motionMedia.removeEventListener("change", updatePreference);
      narrowMedia.removeEventListener("change", updatePreference);
    };
  }, []);

  useEffect(() => {
    if (staticLayout) return;

    const focusedElement = document.activeElement;
    const focusedSceneIndex = sceneRefs.current.findIndex((scene) => (
      scene?.contains(focusedElement) ?? false
    ));

    if (focusedSceneIndex >= 0 && focusedSceneIndex !== activeSceneRef.current) {
      (focusedElement as HTMLElement | null)?.blur();
    }
  }, [staticLayout]);

  useEffect(() => {
    if (staticLayout || reducedMotionRef.current || narrowViewportRef.current) return;

    const section = sectionRef.current;
    if (!section) return;

    let frame: number | null = null;
    const updateScene = () => {
      frame = null;
      const rect = section.getBoundingClientRect();
      const scrollable = Math.max(1, section.offsetHeight - window.innerHeight);
      const progress = clampProgress(-rect.top / scrollable);
      const nextScene = sceneFromProgress(progress);

      section.style.setProperty("--stage-progress", String(progress));
      setIsNearEnd(progress > 0.82);

      if (nextScene !== activeSceneRef.current) {
        const previousScene = sceneRefs.current[activeSceneRef.current];
        if (previousScene?.contains(document.activeElement)) {
          (document.activeElement as HTMLElement | null)?.blur();
        }
        activeSceneRef.current = nextScene;
        setActiveScene(nextScene);
      }
    };

    const handleScroll = () => {
      if (frame === null) frame = window.requestAnimationFrame(updateScene);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      if (frame !== null) window.cancelAnimationFrame(frame);
    };
  }, [staticLayout]);

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (staticLayout || reducedMotionRef.current || narrowViewportRef.current) return;

    pointerPositionRef.current = { x: event.clientX, y: event.clientY };
    if (pointerFrameRef.current !== null) return;

    pointerFrameRef.current = window.requestAnimationFrame(() => {
      pointerFrameRef.current = null;
      const stage = stageRef.current;
      if (!stage) return;
      const rect = stage.getBoundingClientRect();
      const x = Math.min(1, Math.max(-1, ((pointerPositionRef.current.x - rect.left) / Math.max(1, rect.width)) * 2 - 1));
      const y = Math.min(1, Math.max(-1, ((pointerPositionRef.current.y - rect.top) / Math.max(1, rect.height)) * 2 - 1));

      stage.style.setProperty("--pointer-x", x.toFixed(3));
      stage.style.setProperty("--pointer-y", y.toFixed(3));
    });
  };

  const resetPointer = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (pointerFrameRef.current !== null) {
      window.cancelAnimationFrame(pointerFrameRef.current);
      pointerFrameRef.current = null;
    }
    event.currentTarget.style.setProperty("--pointer-x", "0");
    event.currentTarget.style.setProperty("--pointer-y", "0");
  };

  useEffect(() => () => {
    if (pointerFrameRef.current !== null) {
      window.cancelAnimationFrame(pointerFrameRef.current);
    }
  }, []);

  const activateStep = (sceneIndex: number, stepIndex: number) => {
    setActiveSteps((current) => current.map((value, index) => (
      index === sceneIndex ? stepIndex : value
    )));
  };

  return (
    <section
      ref={sectionRef}
      className={`${styles.fieldNotesPreview} ${isNearEnd ? styles.fieldNotesPreviewNearEnd : ""}`}
      aria-label="FMCG Field Notes"
    >
      <div
        ref={stageRef}
        className={`${styles.stickyStage} ${isNearEnd ? styles.stickyStageNearEnd : ""}`}
        onPointerMove={staticLayout ? undefined : handlePointerMove}
        onPointerLeave={staticLayout ? undefined : resetPointer}
      >
        <aside className={styles.chapterRail}>
          <span>02</span>
          <p>{labels.section}<br /><small>FMCG FIELD NOTES</small></p>
          <i
            style={{ "--scene-index": activeScene } as CSSProperties}
            aria-hidden="true"
          />
        </aside>
        <div className={styles.stageContent}>
          <header className={styles.stageHeader}>
            <p>{locale === "en" ? "Industry judgment comes before project experience" : locale === "ja" ? "業界の判断を、プロジェクト経験の前に" : "行业判断先于项目经验"}</p>
            <span>{String(activeScene + 1).padStart(2, "0")} / 03</span>
          </header>
          <div className={styles.scenes}>
            {judgments.map((judgment, index) => (
              <article
                className={`${styles.scene} ${index === visualScene ? styles.sceneActive : ""}`}
                aria-hidden={staticLayout ? undefined : index !== visualScene}
                data-scene={index + 1}
                key={judgment.title}
                ref={(node) => { sceneRefs.current[index] = node; }}
              >
                <span className={styles.giantNumber} aria-hidden="true">{judgment.number}</span>
                <div className={styles.thesis}>
                  <p>JUDGEMENT {judgment.number}</p>
                  <h2>{judgment.title}</h2>
                  <div>{judgment.body}</div>
                </div>
                <nav className={styles.judgmentNav} aria-label="行业判断">
                  {judgment.track.map((step, stepIndex) => (
                    <button
                      className={stepIndex === activeSteps[index] ? styles.judgmentNavActive : ""}
                      key={step.label}
                      type="button"
                      tabIndex={staticLayout || index === visualScene ? 0 : -1}
                      onPointerEnter={() => activateStep(index, stepIndex)}
                      onFocus={() => activateStep(index, stepIndex)}
                    >
                      <span>{step.label}</span>
                    </button>
                  ))}
                  <p className={styles.judgmentNote}>{judgment.track[activeSteps[index]].note}</p>
                </nav>
                <ol className={styles.relationshipTrack}>
                  <svg
                    className={styles.trackPath}
                    viewBox="0 0 32 260"
                    role="presentation"
                    aria-hidden="true"
                  >
                    <path
                      d={index === 2 ? "M16 16 V116 C16 150 82 165 82 205 C82 228 50 244 16 244" : "M16 16 V244"}
                      pathLength="1"
                    />
                  </svg>
                  {judgment.track.map((step, stepIndex) => (
                    <li
                      key={step.label}
                      className={stepIndex === activeSteps[index] ? styles.stepActive : ""}
                    >
                      <button
                        type="button"
                        tabIndex={staticLayout || index === activeScene ? 0 : -1}
                        onPointerEnter={() => activateStep(index, stepIndex)}
                        onFocus={() => activateStep(index, stepIndex)}
                      >
                        <span>{step.label}</span>
                        <small>{step.note}</small>
                      </button>
                    </li>
                  ))}
                </ol>
              </article>
            ))}
          </div>
        </div>
      </div>
      <div className={styles.featuredNotes} onPointerLeave={() => setActiveFeatured(null)}>
        <a
          className={`${styles.featuredNote} ${activeFeatured === 0 ? styles.featuredNoteActive : ""}`}
          href={localizePath("/notes", locale)}
          onFocus={() => setActiveFeatured(0)}
          onPointerEnter={() => setActiveFeatured(0)}
          onBlur={() => setActiveFeatured(null)}
        >
          <small>{labels.section} / FIELD NOTE 01</small>
          <strong>{labels.note[0]}</strong>
          <span>{labels.open}</span>
        </a>
        <a
          className={`${styles.featuredNote} ${activeFeatured === 1 ? styles.featuredNoteActive : ""}`}
          href={localizePath("/notes/system-process", locale)}
          onFocus={() => setActiveFeatured(1)}
          onPointerEnter={() => setActiveFeatured(1)}
          onBlur={() => setActiveFeatured(null)}
        >
          <small>{labels.section} / FIELD NOTE 02</small>
          <strong>{labels.note[1]}</strong>
          <span>{labels.open}</span>
        </a>
        <a
          className={`${styles.featuredNote} ${activeFeatured === 2 ? styles.featuredNoteActive : ""}`}
          href={localizePath("/notes/continuous-use", locale)}
          onFocus={() => setActiveFeatured(2)}
          onPointerEnter={() => setActiveFeatured(2)}
          onBlur={() => setActiveFeatured(null)}
        >
          <small>{labels.section} / FIELD NOTE 03</small>
          <strong>{labels.note[2]}</strong>
          <span>{labels.open}</span>
        </a>
      </div>
    </section>
  );
}
