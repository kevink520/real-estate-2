"use client";

import { useRef } from "react";
import { place } from "@/content/site";
import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/cn";
import { Img } from "@/components/ui/Img";

const STREETS = [
  "M0 18 L100 26", "M0 41 L100 37", "M0 63 L100 69", "M0 88 L100 80",
  "M12 0 L20 100", "M37 0 L33 100", "M61 0 L66 100", "M86 0 L80 100",
  "M0 6 C 30 30, 60 10, 100 48", "M24 100 C 40 70, 70 64, 100 92",
];
const RIVER = "M-4 58 C 14 52, 22 66, 34 70 S 58 64, 70 76 S 92 96, 104 92";

const route = (p: { x: number; y: number }) => {
  const h = place.home;
  const cx = (h.x + p.x) / 2 + (p.y - h.y) * 0.25;
  const cy = (h.y + p.y) / 2 - (p.x - h.x) * 0.25;
  return `M${h.x} ${h.y} Q${cx} ${cy} ${p.x} ${p.y}`;
};

/**
 * Stylised district map. Streets and the river draw in as it scrolls into view;
 * routes from N°7 to each place sit dashed until a place is hovered (here or in
 * the list), when the route draws solid in copper and the place photo appears.
 */
export function PlaceMap({ active, onActive }: { active: number | null; onActive: (i: number | null) => void }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const st = { trigger: root.current, start: "top 85%", end: "center 55%", scrub: 0.8 };
      gsap.fromTo("[data-street]", { strokeDashoffset: 1 }, { strokeDashoffset: 0, ease: "none", stagger: 0.04, scrollTrigger: st });
      gsap.from("[data-pin]", { scale: 0, transformOrigin: "50% 50%", transformBox: "fill-box", ease: "back.out(2)", stagger: 0.06, duration: 1, scrollTrigger: { trigger: root.current, start: "top 55%", once: true } });
    },
    { scope: root },
  );

  return (
    <div ref={root} className="relative aspect-square w-full overflow-hidden bg-fg/[0.035]" role="img" aria-label="Map of the neighbourhood around VERNE N°7">
      <svg viewBox="0 0 100 100" className="absolute inset-0 size-full" aria-hidden>
        {STREETS.map((d, i) => (
          <path key={i} data-street d={d} pathLength={1} strokeDasharray="1" stroke="currentColor" strokeOpacity={0.18} strokeWidth={0.18} fill="none" />
        ))}
        <path data-street d={RIVER} pathLength={1} strokeDasharray="1" stroke="currentColor" strokeOpacity={0.12} strokeWidth={4.5} fill="none" strokeLinecap="round" />
        {place.places.map((p, i) => (
          <path
            key={p.name}
            d={route(p)}
            pathLength={1}
            fill="none"
            strokeWidth={active === i ? 0.45 : 0.22}
            strokeDasharray={active === i ? "1 0" : "0.012 0.012"}
            className={cn("transition-[stroke,stroke-width] duration-500", active === i ? "stroke-copper" : "stroke-current opacity-50")}
          />
        ))}
        {place.places.map((p, i) => (
          <g
            key={p.name}
            data-pin
            className="cursor-pointer"
            onPointerEnter={() => onActive(i)}
            onPointerLeave={() => onActive(null)}
          >
            <circle cx={p.x} cy={p.y} r={2.6} className={cn("transition-colors duration-500", active === i ? "fill-copper" : "fill-fg")} />
            <text x={p.x} y={p.y + 0.95} textAnchor="middle" fontSize={2.6} className="fill-bg font-mono">
              {i + 1}
            </text>
          </g>
        ))}
        <g data-pin>
          <circle cx={place.home.x} cy={place.home.y} r={6} className="fill-copper/25">
            <animate attributeName="r" values="4.5;8;4.5" dur="3.2s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="1;0;1" dur="3.2s" repeatCount="indefinite" />
          </circle>
          <circle cx={place.home.x} cy={place.home.y} r={4.4} className="fill-copper" />
          <text x={place.home.x} y={place.home.y + 1.1} textAnchor="middle" fontSize={3.1} className="fill-bone font-serif italic">
            n°7
          </text>
        </g>
      </svg>

      {place.places.map((p, i) => (
        <div
          key={p.name}
          className="pointer-events-none absolute right-4 bottom-4 aspect-[4/5] w-[34%] overflow-hidden transition-[clip-path] duration-700 ease-expo grade"
          style={{ clipPath: active === i ? "inset(0% 0% 0% 0%)" : "inset(100% 0% 0% 0%)" }}
          aria-hidden
        >
          <Img src={p.image} sizes="20vw" />
          <span className="t-mono absolute bottom-2 left-2 text-bone">{p.time} {p.mode}</span>
        </div>
      ))}
    </div>
  );
}
