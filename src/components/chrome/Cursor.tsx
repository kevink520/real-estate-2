"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

type Mode = "view" | "drag" | "prev" | "next" | "link" | null;
const LABEL: Partial<Record<NonNullable<Mode>, string>> = { view: "View", drag: "Drag", prev: "←", next: "→" };

/**
 * A dot that tracks the pointer exactly plus a ring that lags behind, both
 * blended by difference. Elements opt into labelled states with
 * data-cursor="view|drag|arrows"; links and buttons swell the ring.
 */
export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<Mode>(null);
  const [down, setDown] = useState(false);
  const [on, setOn] = useState(false);

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const target = { x: -100, y: -100 };
    const pos = { x: -100, y: -100 };
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      setOn(true);
      const t = e.target as Element | null;
      const host = t?.closest<HTMLElement>("[data-cursor]");
      if (host) {
        const kind = host.dataset.cursor;
        if (kind === "arrows") {
          const r = host.getBoundingClientRect();
          setMode(e.clientX > r.left + r.width / 2 ? "next" : "prev");
        } else setMode(kind as Mode);
      } else setMode(t?.closest("a, button, [role='tab'], label, input, select, textarea") ? "link" : null);
    };
    const loop = () => {
      pos.x += (target.x - pos.x) * 0.16;
      pos.y += (target.y - pos.y) * 0.16;
      if (dot.current) dot.current.style.transform = `translate3d(${target.x}px, ${target.y}px, 0)`;
      if (ring.current) ring.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    const onDown = () => setDown(true);
    const onUp = () => setDown(false);
    const onLeave = () => setOn(false);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    document.documentElement.addEventListener("pointerleave", onLeave);
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  const label = mode ? LABEL[mode] : undefined;
  const big = Boolean(label);

  return (
    <div className={cn("pointer-events-none fixed inset-0 z-[95] hidden mix-blend-difference transition-opacity duration-300 md:block", on ? "opacity-100" : "opacity-0")} aria-hidden>
      <div ref={dot} className="absolute top-0 left-0">
        <div className={cn("size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-bone transition-transform duration-300", (big || mode === "link") && "scale-0")} />
      </div>
      <div ref={ring} className="absolute top-0 left-0">
        <div
          className={cn(
            "t-mono grid -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-bone text-bone transition-[width,height,background-color,color,transform] duration-500 ease-expo",
            big ? "size-[92px] bg-bone text-noir" : mode === "link" ? "size-14" : "size-8",
            down && "scale-90",
          )}
        >
          <span className={cn("transition-opacity duration-300", big ? "opacity-100" : "opacity-0")}>{label}</span>
        </div>
      </div>
    </div>
  );
}
