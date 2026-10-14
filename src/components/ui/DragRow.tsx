"use client";

import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Horizontally scrollable row that also drags with the mouse. */
export function DragRow({ children, className }: { children: ReactNode; className?: string }) {
  const row = useRef<HTMLDivElement>(null);
  const drag = useRef<{ x: number; left: number; moved: boolean } | null>(null);

  return (
    <div
      ref={row}
      className={cn("no-scrollbar flex cursor-grab gap-[5px] overflow-x-auto overscroll-x-contain active:cursor-grabbing", className)}
      onPointerDown={(e) => {
        if (e.pointerType !== "mouse" || !row.current) return;
        drag.current = { x: e.clientX, left: row.current.scrollLeft, moved: false };
      }}
      onPointerMove={(e) => {
        if (!drag.current || !row.current) return;
        const dx = e.clientX - drag.current.x;
        if (Math.abs(dx) > 3) drag.current.moved = true;
        row.current.scrollLeft = drag.current.left - dx;
      }}
      onPointerUp={() => (drag.current = null)}
      onPointerLeave={() => (drag.current = null)}
      onClickCapture={(e) => {
        if (drag.current?.moved) e.preventDefault();
      }}
    >
      {children}
    </div>
  );
}
