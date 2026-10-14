"use client";

import { useRef } from "react";
import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/cn";
import { Img } from "@/components/ui/Img";

type Part = string | { readonly pill: string };

/**
 * Statement paragraph whose words brighten one by one as it scrolls through
 * the viewport. `{pill}` parts become small inline photographs that widen on hover.
 */
export function ScrubWords({ parts, className }: { parts: readonly Part[]; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || prefersReducedMotion()) return;
      const words = el.querySelectorAll("[data-w]");
      gsap.fromTo(
        words,
        { opacity: 0.16 },
        {
          opacity: 1,
          ease: "none",
          stagger: 0.1,
          scrollTrigger: { trigger: el, start: "top 78%", end: "bottom 52%", scrub: 0.6 },
        },
      );
      gsap.from(el.querySelectorAll("[data-pill] > *"), {
        scale: 1.6,
        clipPath: "inset(50% 50% 50% 50% round 999px)",
        duration: 1.6,
        ease: "expo",
        stagger: 0.12,
        scrollTrigger: { trigger: el, start: "top 70%", once: true },
      });
    },
    { scope: ref },
  );

  return (
    <p ref={ref} className={cn(className)}>
      {parts.map((part, i) =>
        typeof part === "string" ? (
          part.split(" ").map((w, j) => (
            <span key={`${i}-${j}`} data-w className="inline-block whitespace-pre">
              {w}{" "}
            </span>
          ))
        ) : (
          <span
            key={i}
            data-pill
            className="relative mr-[0.25em] inline-block h-[0.78em] w-[1.9em] overflow-hidden rounded-full align-[-0.04em] transition-[width] duration-700 ease-expo hover:w-[3.4em]"
          >
            <span className="absolute inset-0 block">
              <Img src={part.pill} sizes="160px" />
            </span>
          </span>
        ),
      )}
    </p>
  );
}
