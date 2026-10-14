"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { Arrow } from "@/components/ui/Arrow";

type Mode = "view" | "arrows" | null;

/**
 * Reference cursors: `cursor--gallery` (120px outlined "VIEW" disc) and
 * `cursor--arrow` (prev/next outlined discs over carousels). Elements opt in
 * with data-cursor="view" | "arrows". Pointer-fine devices only.
 */
export function Cursor() {
  const el = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<Mode>(null);
  const [right, setRight] = useState(true);

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const target = { x: -200, y: -200 };
    const pos = { ...target };
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      const host = (e.target as Element | null)?.closest<HTMLElement>("[data-cursor]");
      const next = (host?.dataset.cursor as Mode) ?? null;
      setMode(next);
      if (host && next === "arrows") {
        const r = host.getBoundingClientRect();
        setRight(e.clientX > r.left + r.width / 2);
      }
    };
    const loop = () => {
      pos.x += (target.x - pos.x) * 0.18;
      pos.y += (target.y - pos.y) * 0.18;
      if (el.current) el.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={el} className="pointer-events-none fixed top-0 left-0 z-[70] hidden md:block" aria-hidden>
      <div
        className={cn(
          "t-label absolute grid size-[120px] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white/70 text-white backdrop-blur-[2px] transition-[transform,opacity] duration-400 ease-lux",
          mode ? "scale-100 opacity-100" : "scale-0 opacity-0",
        )}
      >
        {mode === "view" && "View"}
        {mode === "arrows" && <Arrow dir={right ? "right" : "left"} className="w-9" />}
      </div>
    </div>
  );
}
