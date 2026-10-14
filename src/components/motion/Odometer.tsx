"use client";

import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion, ScrollTrigger } from "@/lib/gsap";
import { cn } from "@/lib/cn";

const DIGITS = "0123456789";

/**
 * Rolling numerals: each digit is a 0–9 column that slides to its value.
 * Non-digits (".", "–") render as static glyphs. Rolls in from 0 when first seen,
 * then rolls between values when `value` changes.
 */
export function Odometer({ value, className, stagger = 0.06 }: { value: string; className?: string; stagger?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const seen = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const cols = Array.from(el.querySelectorAll<HTMLElement>("[data-col]"));
    const go = (instant = false) =>
      cols.forEach((col, i) => {
        const d = Number(col.dataset.col);
        gsap.to(col, { yPercent: -d * 10, duration: instant ? 0 : 1.6, ease: "expo", delay: instant ? 0 : i * stagger, overwrite: true });
      });
    if (prefersReducedMotion()) return go(true);
    if (seen.current) return go();
    const st = ScrollTrigger.create({
      trigger: el,
      start: "top 92%",
      once: true,
      onEnter: () => {
        seen.current = true;
        go();
      },
    });
    return () => st.kill();
  }, [value, stagger]);

  return (
    <span ref={ref} className={cn("inline-flex overflow-hidden leading-none tabular-nums", className)} aria-label={value}>
      {value.split("").map((ch, i) =>
        DIGITS.includes(ch) ? (
          <span key={i} aria-hidden className="relative inline-block h-[1em] overflow-hidden">
            <span data-col={ch} className="flex flex-col">
              {DIGITS.split("").map((d) => (
                <span key={d} className="block h-[1em]">
                  {d}
                </span>
              ))}
            </span>
          </span>
        ) : (
          <span key={i} aria-hidden className="inline-block h-[1em]">
            {ch}
          </span>
        ),
      )}
    </span>
  );
}
