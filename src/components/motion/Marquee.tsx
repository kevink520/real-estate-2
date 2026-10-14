"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { scrollState } from "@/lib/scroll";

/** Endless strip; drifts slowly, speeds up with scroll velocity and follows scroll direction. */
export function Marquee({ children, speed = 0.6, className }: { children: ReactNode; speed?: number; className?: string }) {
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = track.current;
    if (!el || prefersReducedMotion()) return;
    let x = 0;
    let dir = 1;
    const tick = () => {
      const v = scrollState.velocity;
      if (Math.abs(v) > 0.5) dir = Math.sign(v);
      x -= dir * (speed + Math.min(14, Math.abs(v) * 0.25));
      const half = el.scrollWidth / 2;
      if (x <= -half) x += half;
      if (x > 0) x -= half;
      el.style.transform = `translate3d(${x}px,0,0)`;
    };
    gsap.ticker.add(tick);
    return () => gsap.ticker.remove(tick);
  }, [speed]);

  return (
    <div className={className} aria-hidden>
      <div ref={track} className="flex w-max will-change-transform">
        <div className="flex shrink-0">{children}</div>
        <div className="flex shrink-0">{children}</div>
      </div>
    </div>
  );
}
