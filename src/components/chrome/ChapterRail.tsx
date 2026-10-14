"use client";

import { useEffect, useRef, useState } from "react";
import { chapters } from "@/content/site";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { cn } from "@/lib/cn";

/**
 * Top-centre index: "03 / 09 — Place" with the chapter number rolling between
 * values and a hairline filling with progress through the chapter. Blends by
 * difference so it reads on any page colour or image.
 */
export function ChapterRail() {
  const [active, setActive] = useState(0);
  const [shown, setShown] = useState(false);
  const bar = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const starts = chapters.map((c) => document.querySelector<HTMLElement>(`[data-chapter="${c.n}"]`));
    const footer = document.querySelector<HTMLElement>("footer");
    const triggers = starts.map((el, i) => {
      if (!el) return null;
      const next = starts.slice(i + 1).find(Boolean) ?? footer;
      return ScrollTrigger.create({
        trigger: el,
        start: "top 50%",
        endTrigger: next ?? undefined,
        end: "top 50%",
        onToggle: (self) => self.isActive && setActive(i),
        onUpdate: (self) => bar.current && gsap.set(bar.current, { scaleX: self.progress }),
      });
    });
    const show = ScrollTrigger.create({ start: () => window.innerHeight * 0.6, end: "max", onToggle: (self) => setShown(self.isActive) });
    return () => {
      triggers.forEach((t) => t?.kill());
      show.kill();
    };
  }, []);

  const chapter = chapters[active];
  return (
    <div
      className={cn(
        "t-mono pointer-events-none fixed top-[calc(var(--gutter)-2px)] left-1/2 z-[45] hidden -translate-x-1/2 items-center gap-4 text-bone mix-blend-difference transition-opacity duration-700 lg:flex",
        shown ? "opacity-100" : "opacity-0",
      )}
      aria-hidden
    >
      <span className="relative block h-[1.45em] w-[2ch] overflow-hidden">
        {chapters.map((c, i) => (
          <span key={c.n} className="absolute inset-0 transition-transform duration-1000 ease-expo" style={{ transform: `translateY(${(i - active) * 100}%)` }}>
            {c.n}
          </span>
        ))}
      </span>
      <span className="opacity-50">/ {String(chapters.length).padStart(2, "0")}</span>
      <span className="relative block h-px w-16 bg-bone/30">
        <span ref={bar} className="absolute inset-0 origin-left scale-x-0 bg-bone" />
      </span>
      <span className="relative block h-[1.45em] w-[14ch] overflow-hidden">
        <span key={chapter.n} className="absolute inset-0 animate-[fadeUp_0.9s_var(--ease-expo)]">
          {chapter.title}
        </span>
      </span>
    </div>
  );
}
