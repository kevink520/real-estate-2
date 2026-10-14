"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { gsap } from "@/lib/gsap";
import { Img } from "@/components/ui/Img";
import { useApp } from "@/components/providers/AppProvider";

type Item = { src: string; caption: string };

/**
 * Gallery lightbox. Opens by growing a clone from the clicked thumbnail's rect to
 * a contained full-screen frame (FLIP), steps with arrows/keys, closes back to it.
 */
export function useLightbox(items: readonly Item[]) {
  const [open, setOpen] = useState<number | null>(null);
  const origin = useRef<HTMLElement | null>(null);
  const frame = useRef<HTMLDivElement>(null);
  const veil = useRef<HTMLDivElement>(null);
  const { setOverlayOpen } = useApp();

  useEffect(() => setOverlayOpen(open !== null), [open, setOverlayOpen]);

  const show = useCallback((i: number, from: HTMLElement) => {
    origin.current = from;
    setOpen(i);
  }, []);

  const flipFrom = (el: HTMLElement, from: DOMRect) => {
    const to = el.getBoundingClientRect();
    return {
      x: from.left - to.left,
      y: from.top - to.top,
      scaleX: from.width / to.width,
      scaleY: from.height / to.height,
    };
  };

  useEffect(() => {
    if (open === null || !frame.current || !origin.current) return;
    const from = origin.current.getBoundingClientRect();
    gsap.fromTo(frame.current, { ...flipFrom(frame.current, from), transformOrigin: "0 0" }, { x: 0, y: 0, scaleX: 1, scaleY: 1, duration: 1.1, ease: "expo" });
    gsap.fromTo(veil.current, { opacity: 0 }, { opacity: 1, duration: 0.6 });
    // only on open
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open !== null]);

  const close = useCallback(() => {
    if (!frame.current || !origin.current) return setOpen(null);
    const from = origin.current.getBoundingClientRect();
    gsap.to(veil.current, { opacity: 0, duration: 0.6 });
    gsap.to(frame.current, { ...flipFrom(frame.current, from), duration: 0.9, ease: "expo.inOut", onComplete: () => setOpen(null) });
  }, []);

  const step = useCallback((d: number) => setOpen((i) => (i === null ? i : (i + d + items.length) % items.length)), [items.length]);

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close, step]);

  const node =
    open === null ? null : createPortal(
      <div className="scope-noir fixed inset-0 z-[85] text-bone" role="dialog" aria-label="Image viewer">
        <div ref={veil} className="absolute inset-0 bg-noir/95" onClick={close} />
        <div className="pointer-events-none absolute inset-[8vh_4vw_12vh]">
          <div ref={frame} className="relative size-full">
            <Img key={items[open].src} src={items[open].src} sizes="90vw" className="!object-contain" />
          </div>
        </div>
        <div className="t-mono absolute inset-x-g bottom-g flex items-center justify-between">
          <span>
            {String(open + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")} — {items[open].caption}
          </span>
          <span className="flex gap-6">
            <button type="button" onClick={() => step(-1)} className="link-line">← Prev</button>
            <button type="button" onClick={() => step(1)} className="link-line">Next →</button>
            <button type="button" onClick={close} className="link-line" autoFocus>Close ✕</button>
          </span>
        </div>
      </div>,
      document.body,
    );

  return { show, node, open: open !== null };
}
