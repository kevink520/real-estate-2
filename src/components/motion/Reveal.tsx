"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";
import { gsap, prefersReducedMotion, SplitText, useGSAP } from "@/lib/gsap";
import { useApp } from "@/components/providers/AppProvider";

type Props = {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  /** "chars" mirrors .animation--title (10ms/char), "lines" mirrors .animation--text (40ms/line). */
  type?: "lines" | "chars";
  delay?: number;
  /** Wait for the intro reveal instead of a scroll trigger. */
  intro?: boolean;
  start?: string;
};

/** Masked slide-up text reveal, 1.6s on the reference's easeOut curve. */
export function Reveal({ as: Tag = "div", children, className, type = "lines", delay = 0, intro = false, start = "top 88%" }: Props) {
  const ref = useRef<HTMLElement>(null);
  const tween = useRef<gsap.core.Tween | null>(null);
  const { introStage } = useApp();

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || prefersReducedMotion()) return;
      const split = SplitText.create(el, {
        type: type === "chars" ? "lines,chars" : "lines",
        mask: "lines",
        autoSplit: true,
        onSplit(self) {
          const targets = type === "chars" ? self.chars : self.lines;
          const played = tween.current ? tween.current.progress() === 1 : false;
          tween.current = gsap.fromTo(
            targets,
            { yPercent: 110 },
            {
              yPercent: 0,
              duration: 1.6,
              ease: "lux",
              stagger: type === "chars" ? 0.01 : 0.04,
              delay,
              paused: intro,
              scrollTrigger: intro ? undefined : { trigger: el, start, once: true },
            },
          );
          if (played) tween.current.progress(1);
          return tween.current;
        },
      });
      return () => split.revert();
    },
    { scope: ref },
  );

  useEffect(() => {
    if (intro && introStage !== "loading") tween.current?.play();
  }, [intro, introStage]);

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}

/** Explicit line breaks for headings: ["Line one", "Line two"]. */
export function Lines({ lines }: { lines: readonly string[] }) {
  return lines.map((line, i) => (
    <span key={i} className="block">
      {line}
    </span>
  ));
}
