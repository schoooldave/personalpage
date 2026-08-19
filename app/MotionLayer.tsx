"use client";

import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function MotionLayer({ world }: { world: "personal" | "work" }) {
  useLayoutEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;
    const context = gsap.context(() => {
      const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
      intro.from(".hero .eyebrow", { y: 24, autoAlpha: 0, duration: 0.65 })
        .from(".hero h1", { y: 70, autoAlpha: 0, duration: 1.05 }, "-=0.35")
        .from(".heroCopy, .heroActions", { y: 24, autoAlpha: 0, duration: 0.7, stagger: 0.1 }, "-=0.5")
        .from(".workHeroVisual", { x: 90, scale: 1.08, autoAlpha: 0, duration: 1.1 }, "-=0.85");

      gsap.utils.toArray<HTMLElement>(".motion-career-arc, .motion-cases, .motion-ai-outlook, .recruiterBar").forEach((section) => {
        gsap.from(section, { y: 70, autoAlpha: 0, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: section, start: "top 82%", once: true } });
      });

      gsap.from(".motion-arc-step", { y: 50, autoAlpha: 0, duration: 0.75, stagger: 0.16, ease: "power3.out", scrollTrigger: { trigger: ".motion-career-arc", start: "top 78%", once: true } });
      ScrollTrigger.create({ trigger: ".motion-career-arc", start: "top 78%", once: true, onEnter: () => document.querySelector(".motion-career-arc")?.classList.add("is-visible") });
      gsap.from(".motion-case-card", { y: 50, autoAlpha: 0, duration: 0.75, stagger: 0.18, ease: "power3.out", scrollTrigger: { trigger: ".motion-cases", start: "top 78%", once: true } });
      gsap.from(".motion-case-metric", { y: 16, autoAlpha: 0, duration: 0.55, stagger: 0.16, ease: "power3.out", scrollTrigger: { trigger: ".motion-cases", start: "top 68%", once: true } });

      gsap.from(".motion-ai-eyebrow, .motion-ai-title, .motion-ai-lead", { y: 28, autoAlpha: 0, duration: 0.8, stagger: 0.12, ease: "power3.out", scrollTrigger: { trigger: ".motion-ai-outlook", start: "top 76%", once: true, onEnter: () => document.querySelector(".motion-ai-outlook")?.classList.add("is-visible") } });

      const magneticItems = gsap.utils.toArray<HTMLElement>(".primaryAction, .textAction, .navLinks button, .caseCard");
      magneticItems.forEach((item) => {
        const xTo = gsap.quickTo(item, "x", { duration: 0.35, ease: "power3" });
        const yTo = gsap.quickTo(item, "y", { duration: 0.35, ease: "power3" });
        const onMove = (event: MouseEvent) => { const box = item.getBoundingClientRect(); xTo((event.clientX - (box.left + box.width / 2)) * 0.12); yTo((event.clientY - (box.top + box.height / 2)) * 0.12); };
        const onLeave = () => { xTo(0); yTo(0); };
        item.addEventListener("mousemove", onMove); item.addEventListener("mouseleave", onLeave);
        context.add(() => { item.removeEventListener("mousemove", onMove); item.removeEventListener("mouseleave", onLeave); });
      });

      gsap.to(".workHeroVisual img", { x: 28, y: 12, scale: 1.06, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: 1 } });
    });
    return () => context.revert();
  }, [world]);
  return null;
}
