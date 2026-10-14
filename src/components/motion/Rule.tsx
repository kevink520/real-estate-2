"use client";

import { useRef } from "react";
import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/cn";

/** Hairline that draws in from the left when it enters — the chapter motif. */
export function Rule({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    if (!ref.current || prefersReducedMotion()) return;
    gsap.from(ref.current, {
      scaleX: 0,
      duration: 1.6,
      ease: "expo",
      scrollTrigger: { trigger: ref.current, start: "top 92%", once: true },
    });
  });
  return <div ref={ref} className={cn("h-px origin-left bg-line", className)} aria-hidden />;
}
