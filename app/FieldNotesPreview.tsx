"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { fieldNoteJudgments } from "@/lib/portfolio";
import type { Locale } from "@/lib/i18n/config";
import { clampProgress, sceneFromProgress } from "./field-notes/scene-progress";
import styles from "./fieldnotes.module.css";

export default function FieldNotesPreview({ locale }: { locale: Locale }) {
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
            <p>行业判断先于项目经验</p>
            <span>{String(activeScene + 1).padStart(2, "0")} / 03</span>
          </header>
          <div className={styles.scenes}>
            {fieldNoteJudgments.map((judgment, index) => (
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
          href="/notes"
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
          href="/notes/system-process"
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
          href="/notes/continuous-use"
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
