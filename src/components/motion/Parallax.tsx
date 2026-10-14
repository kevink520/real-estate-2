"use client";

import { useRef, type ReactNode } from "react";
import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/cn";

type Props = {
  children: ReactNode;
  className?: string;
  /** Extra inner height (percent of the frame) that the image travels through. */
  travel?: number;
  axis?: "y" | "x";
};

/**
 * The reference's `imageMove` pattern: the picture sits in a crop larger than
 * its frame and moves from −(inner−frame) to 0 while the frame crosses the viewport.
 */
export function Parallax({ children, className, travel = 18, axis = "y" }: Props) {
  const frame = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!frame.current || !inner.current || prefersReducedMotion()) return;
    const f = frame.current;
    const i = inner.current;
    const offset = () => (axis === "y" ? i.offsetHeight - f.offsetHeight : i.offsetWidth - f.offsetWidth);
    gsap.fromTo(
      i,
      { [axis]: () => -offset() },
      {
        [axis]: 0,
        ease: "none",
        scrollTrigger: { trigger: f, start: "top bottom", end: "bottom top", scrub: true, invalidateOnRefresh: true },
      },
    );
  });

  return (
    <div ref={frame} className={cn("overflow-hidden", !className?.includes("absolute") && "relative", className)}>
      <div
        ref={inner}
        className="absolute top-0 left-0"
        style={axis === "y" ? { width: "100%", height: `${100 + travel}%` } : { height: "100%", width: `${100 + travel}%` }}
      >
        {children}
      </div>
    </div>
  );
}
