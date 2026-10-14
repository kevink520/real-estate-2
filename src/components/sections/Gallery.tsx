"use client";

import { useEffect, useRef } from "react";
import { gallery } from "@/content/site";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { useLightbox } from "@/components/chrome/Lightbox";
import { Img } from "@/components/ui/Img";
import { Section } from "@/components/ui/Section";

/**
 * Draggable interiors strip with inertia. Cards skew and the gaps breathe with
 * drag velocity; clicking (without dragging) opens the lightbox from that card.
 */
export function Gallery() {
  const track = useRef<HTMLDivElement>(null);
  const viewport = useRef<HTMLDivElement>(null);
  const { show, node } = useLightbox(gallery.images);

  useEffect(() => {
    const vp = viewport.current;
    const tr = track.current;
    if (!vp || !tr) return;
    const cards = Array.from(tr.querySelectorAll<HTMLElement>("[data-card]"));
    const state = { x: 0, target: 0, vel: 0, down: false, startX: 0, startT: 0, moved: false };
    const max = () => Math.max(0, tr.scrollWidth - vp.clientWidth);
    const reduced = prefersReducedMotion();

    const down = (e: PointerEvent) => {
      state.down = true;
      state.moved = false;
      state.startX = e.clientX;
      state.startT = state.target;
    };
    const move = (e: PointerEvent) => {
      if (!state.down) return;
      const dx = e.clientX - state.startX;
      if (Math.abs(dx) > 4) state.moved = true;
      state.target = gsap.utils.clamp(-max() - 80, 80, state.startT + dx * 1.4);
    };
    const up = () => {
      state.down = false;
      state.target = gsap.utils.clamp(-max(), 0, state.target);
    };
    const wheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;
      e.preventDefault();
      state.target = gsap.utils.clamp(-max(), 0, state.target - e.deltaX);
    };
    const tick = () => {
      const prev = state.x;
      state.x += (state.target - state.x) * 0.09;
      state.vel += (state.x - prev - state.vel) * 0.2;
      tr.style.transform = `translate3d(${state.x}px,0,0)`;
      if (!reduced) {
        const skew = gsap.utils.clamp(-8, 8, state.vel * 0.35);
        cards.forEach((c) => (c.style.transform = `skewX(${-skew}deg)`));
      }
    };
    vp.addEventListener("pointerdown", down);
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    vp.addEventListener("wheel", wheel, { passive: false });
    gsap.ticker.add(tick);
    vp.dataset.dragging = "";
    const blockClick = (e: MouseEvent) => state.moved && e.stopPropagation();
    vp.addEventListener("click", blockClick, true);
    return () => {
      vp.removeEventListener("pointerdown", down);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
      vp.removeEventListener("wheel", wheel);
      vp.removeEventListener("click", blockClick, true);
      gsap.ticker.remove(tick);
    };
  }, []);

  return (
    <Section id="gallery" theme="noir" className="overflow-hidden pb-sec">
      <div className="flex items-end justify-between px-g">
        <h2 className="t-h1">
          {gallery.title}
          <sup className="t-mono ml-2 align-top text-copper">({String(gallery.images.length).padStart(2, "0")})</sup>
        </h2>
        <p className="t-mono hidden text-dim md:block">Drag to explore — click to open</p>
      </div>

      <div ref={viewport} data-cursor="drag" className="mt-12 touch-pan-y select-none">
        <div ref={track} className="flex w-max items-end gap-g px-g will-change-transform">
          {gallery.images.map((img, i) => (
            <figure key={img.src} data-card className="shrink-0 origin-bottom">
              <button
                type="button"
                data-cursor="view"
                aria-label={`Open ${img.caption}`}
                onClick={(e) => show(i, e.currentTarget)}
                className="group relative block h-[52vh] overflow-hidden md:h-[64vh]"
                style={{ aspectRatio: `${img.w} / ${img.h}` }}
              >
                <Img src={img.src} sizes="50vw" alt={img.caption} className="transition-transform duration-[1.4s] ease-expo group-hover:scale-[1.06]" />
              </button>
              <figcaption className="t-mono mt-3 flex justify-between gap-6">
                <span className="text-copper">{String(i + 1).padStart(2, "0")}</span>
                <span>{img.caption}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
      {node}
    </Section>
  );
}
