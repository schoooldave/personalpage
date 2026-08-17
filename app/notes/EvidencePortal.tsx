"use client";

import {
  type AnimationEvent,
  type CSSProperties,
  type MouseEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";

import {
  closeEvidencePortal,
  completeEvidencePortalTransition,
  createEvidencePortalState,
  openEvidencePortal,
} from "./evidence-portal";
import styles from "./notes.module.css";

const evidenceGroups = [
  {
    title: "现实矛盾",
    body: "一线业务已经进入更高频、更复杂的协同状态，但旧系统仍停留在记录结果：数据上传慢、过程不可见、管理层只能事后追问。",
  },
  {
    title: "我的判断",
    body: "数字化的价值不只是把表搬到线上，而是把业务判断前移，让系统能暴露问题、提示优先级，并帮助团队形成共同语言。",
  },
  {
    title: "推动改变",
    body: "我从调研、需求梳理、流程设计到业务与研发协调，持续推动培训、上线节奏和上传治理，让新流程能被真实组织接住。",
  },
  {
    title: "结果验证",
    body: "一年多时间上线 600+ 重点经销商，覆盖核心业务场景；上传率由约 70%→90%，证明改变不是停留在方案里，而是进入了日常工作。",
  },
];

type BodyStyleSnapshot = Pick<CSSStyleDeclaration, "position" | "top" | "width" | "overflowY">;
type InertHTMLElement = HTMLElement & { inert?: boolean };
type BackgroundIsolationSnapshot = {
  element: InertHTMLElement;
  ariaHidden: string | null;
  inertAttribute: string | null;
  inertProperty: boolean | undefined;
};

const focusableSelector = [
  "a[href]",
  "button:not([disabled])",
  "textarea:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(",");

export default function EvidencePortal() {
  const [portalState, setPortalState] = useState(() => createEvidencePortalState());
  const [mounted, setMounted] = useState(false);
  const [origin, setOrigin] = useState({ x: 0, y: 0 });
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);
  const bodyStyleRef = useRef<BodyStyleSnapshot | null>(null);
  const backgroundIsolationRef = useRef<BackgroundIsolationSnapshot[] | null>(null);
  const savedScrollRef = useRef(0);
  const reducedMotionRef = useRef(false);

  const isVisible = portalState.phase !== "closed";

  useEffect(() => {
    setMounted(true);

    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncPreference = () => {
      reducedMotionRef.current = media.matches;
      setPortalState((current) => ({ ...current, reducedMotion: media.matches }));
    };

    syncPreference();
    media.addEventListener("change", syncPreference);

    return () => {
      media.removeEventListener("change", syncPreference);
    };
  }, []);

  const lockBody = useCallback((scrollY: number) => {
    if (bodyStyleRef.current) return;

    savedScrollRef.current = scrollY;
    bodyStyleRef.current = {
      position: document.body.style.position,
      top: document.body.style.top,
      width: document.body.style.width,
      overflowY: document.body.style.overflowY,
    };

    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";
    document.body.style.overflowY = "scroll";
  }, []);

  const restoreBodyAndFocus = useCallback(() => {
    const previousBodyStyle = bodyStyleRef.current;

    if (previousBodyStyle) {
      document.body.style.position = previousBodyStyle.position;
      document.body.style.top = previousBodyStyle.top;
      document.body.style.width = previousBodyStyle.width;
      document.body.style.overflowY = previousBodyStyle.overflowY;
      bodyStyleRef.current = null;
      window.scrollTo(0, savedScrollRef.current);
    }

    returnFocusRef.current?.focus();
    returnFocusRef.current = null;
  }, []);

  const isolateBackground = useCallback(() => {
    if (backgroundIsolationRef.current) return;

    const portal = dialogRef.current;
    if (!portal) return;

    const backgroundElements = Array.from(document.body.children).filter(
      (element): element is InertHTMLElement =>
        element instanceof HTMLElement && element !== portal && !portal.contains(element),
    );

    backgroundIsolationRef.current = backgroundElements.map((element) => ({
      element,
      ariaHidden: element.getAttribute("aria-hidden"),
      inertAttribute: element.getAttribute("inert"),
      inertProperty: typeof element.inert === "boolean" ? element.inert : undefined,
    }));

    backgroundElements.forEach((element) => {
      element.setAttribute("aria-hidden", "true");
      element.setAttribute("inert", "");
      if (typeof element.inert === "boolean") element.inert = true;
    });
  }, []);

  const restoreBackgroundIsolation = useCallback(() => {
    const snapshots = backgroundIsolationRef.current;
    if (!snapshots) return;

    snapshots.forEach(({ element, ariaHidden, inertAttribute, inertProperty }) => {
      if (ariaHidden === null) element.removeAttribute("aria-hidden");
      else element.setAttribute("aria-hidden", ariaHidden);

      if (inertAttribute === null) element.removeAttribute("inert");
      else element.setAttribute("inert", inertAttribute);

      if (typeof inertProperty === "boolean") element.inert = inertProperty;
    });

    backgroundIsolationRef.current = null;
  }, []);

  const handleOpen = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      const trigger = event.currentTarget;
      const rect = trigger.getBoundingClientRect();
      const scrollY = window.scrollY;

      returnFocusRef.current = trigger;
      setOrigin({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
      lockBody(scrollY);
      setPortalState(openEvidencePortal(createEvidencePortalState(reducedMotionRef.current), scrollY));
    },
    [lockBody],
  );

  const handleClose = useCallback(() => {
    setPortalState((current) => closeEvidencePortal(current));
  }, []);

  useEffect(() => {
    if (!isVisible) return undefined;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleClose();
        return;
      }

      if (event.key !== "Tab") return;

      const dialog = dialogRef.current;
      if (!dialog) return;

      const focusableElements = Array.from(
        dialog.querySelectorAll<HTMLElement>(focusableSelector),
      ).filter((element) => element.offsetParent !== null || element === closeButtonRef.current);

      if (focusableElements.length === 0) {
        event.preventDefault();
        closeButtonRef.current?.focus();
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleClose, isVisible]);

  useEffect(() => {
    if (portalState.phase === "opening" || portalState.phase === "open") {
      closeButtonRef.current?.focus();
    }
  }, [portalState.phase]);

  useEffect(() => {
    if (portalState.phase === "closed") {
      restoreBackgroundIsolation();
      restoreBodyAndFocus();
      return;
    }

    isolateBackground();
  }, [isolateBackground, portalState.phase, restoreBackgroundIsolation, restoreBodyAndFocus]);

  useEffect(
    () => () => {
      restoreBackgroundIsolation();
      restoreBodyAndFocus();
    },
    [restoreBackgroundIsolation, restoreBodyAndFocus],
  );

  const handleAnimationEnd = (event: AnimationEvent<HTMLDivElement>) => {
    if (event.currentTarget !== event.target) return;

    setPortalState((current) => completeEvidencePortalTransition(current));
  };

  const portalStyle = {
    "--portal-origin-x": `${origin.x}px`,
    "--portal-origin-y": `${origin.y}px`,
  } as CSSProperties;

  return (
    <>
      <div className={styles.evidencePrompt}>
        <p className={styles.evidencePromptText}>
          这篇判断保留主叙事，背后的案例证据单独展开。
        </p>
        <button className={styles.evidencePromptButton} type="button" onClick={handleOpen}>
          查看这项判断从何而来
        </button>
      </div>

      {mounted && isVisible
        ? createPortal(
            <div
              ref={dialogRef}
              aria-labelledby="evidence-portal-title"
              aria-modal="true"
              className={`${styles.portalBackdrop} ${styles[`phase${portalState.phase}`]}`}
              role="dialog"
              style={portalStyle}
              onAnimationEnd={handleAnimationEnd}
            >
              <div className={styles.portalChrome}>
                <button
                  ref={closeButtonRef}
                  aria-label="关闭证据门户"
                  className={styles.portalClose}
                  type="button"
                  onClick={handleClose}
                >
                  关闭
                </button>

                <section className={styles.portalContent}>
                  <p className={styles.portalEyebrow}>Evidence Portal</p>
                  <h2 id="evidence-portal-title">这项判断从何而来</h2>
                  <p className={styles.portalIntro}>
                    证据不进入正文打断阅读，而是在这里说明：真实矛盾是什么，我如何判断，怎样推动改变，以及结果如何验证。
                  </p>

                  <div className={styles.portalGrid}>
                    {evidenceGroups.map((group, index) => (
                      <article
                        className={styles.portalCard}
                        key={group.title}
                        style={{ "--stagger-index": index } as CSSProperties}
                      >
                        <span>{String(index + 1).padStart(2, "0")}</span>
                        <h3>{group.title}</h3>
                        <p>{group.body}</p>
                      </article>
                    ))}
                  </div>
                </section>
              </div>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
