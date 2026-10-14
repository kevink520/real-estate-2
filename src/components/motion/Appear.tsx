"use client";

import { useRef, type ReactNode } from "react";
import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";

/** The reference's `appear` plugin: fade + short rise once the element enters. */
export function Appear({ children, className, delay = 0, y = 40 }: { children: ReactNode; className?: string; delay?: number; y?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    if (!ref.current || prefersReducedMotion()) return;
    gsap.from(ref.current, {
      autoAlpha: 0,
      y,
      duration: 1.6,
      ease: "lux",
      delay,
      scrollTrigger: { trigger: ref.current, start: "top 90%", once: true },
    });
  });
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
