"use client";

import { useRef } from "react";
import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";
import { Section } from "@/components/ui/Section";

const ROADS = [
  "M-20 180 C 300 220, 520 120, 760 300 S 1180 640, 1460 560",
  "M120 920 C 260 700, 420 560, 700 520 S 1100 360, 1460 120",
  "M-20 640 L 480 600 L 900 760 L 1460 820",
  "M520 -20 L 640 300 L 700 520 L 760 940",
  "M980 -20 C 1000 200, 1080 340, 1240 420 S 1420 520, 1460 520",
  "M300 -20 L 420 260 L 480 600",
  "M860 300 L 1040 160 L 1200 -20",
  "M640 300 L 900 380 L 1180 300",
  "M200 420 L 480 420 L 640 300",
  "M900 760 L 1000 940",
];
const RIVER = "M-40 520 C 160 480, 240 600, 300 760 S 420 960, 520 940";
const HIGHWAY = "M380 -40 C 760 240, 1000 520, 1480 700";
const METRO = [
  [470, 330],
  [560, 380],
  [610, 470],
  [720, 610],
  [880, 290],
  [1010, 470],
];
const PINS: Array<[number, number, string]> = [
  [820, 440, "1"],
  [420, 700, "2"],
  [950, 330, "3"],
  [1040, 640, "4"],
  [260, 300, "5"],
];
const LABELS: Array<[number, number, string, number?]> = [
  [1140, 330, "Historical park"],
  [300, 860, "Landscape park"],
  [900, 560, "Highway", 28],
  [1180, 210, "Highway", 32],
  [40, 560, "River", 70],
];

/** Stylised line map with numbered points of interest (reference "Map of the area"). */
export function MapArea() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const st = { trigger: root.current, start: "top 60%", once: true };
      gsap.from("[data-road]", { strokeDashoffset: 2000, duration: 2.4, ease: "lux", stagger: 0.05, scrollTrigger: st });
      gsap.from("[data-pin]", { scale: 0, transformOrigin: "50% 50%", duration: 0.9, ease: "back.out(2)", stagger: 0.08, delay: 0.8, scrollTrigger: st });
    },
    { scope: root },
  );

  return (
    <Section theme="dark" className="h-svh min-h-[560px] overflow-hidden">
      <div ref={root} className="absolute inset-0" role="img" aria-label="Map of the area">
        <h2 className="sr-only">Map of the area</h2>
        <svg viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 size-full" aria-hidden>
          <defs>
            <pattern id="dots" width="6" height="6" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="0.8" fill="rgba(255,255,255,.22)" />
            </pattern>
          </defs>
          <path d="M-20 80 C 160 60, 260 160, 240 300 S 120 520, -20 560 Z" fill="url(#dots)" />
          <path d="M1060 260 C 1180 220, 1300 300, 1280 400 S 1120 480, 1060 420 Z" fill="url(#dots)" />
          <path d="M160 760 C 260 700, 420 760, 440 860 L 440 940 L 120 940 Z" fill="url(#dots)" />
          <path data-road d={RIVER} stroke="rgba(255,255,255,.35)" strokeWidth="38" fill="none" strokeDasharray="2000" />
          <path d={RIVER} stroke="#000" strokeWidth="36" fill="none" />
          <path data-road d={HIGHWAY} stroke="rgba(255,255,255,.55)" strokeWidth="1.5" fill="none" strokeDasharray="2000" />
          {ROADS.map((d, i) => (
            <path key={i} data-road d={d} stroke="rgba(255,255,255,.25)" strokeWidth="1" fill="none" strokeDasharray="2000" />
          ))}
          {LABELS.map(([x, y, text, r = 0], i) => (
            <text key={i} x={x} y={y} fill="rgba(255,255,255,.6)" fontSize="10" letterSpacing=".3" transform={`rotate(${r} ${x} ${y})`} className="uppercase">
              {text}
            </text>
          ))}
          {METRO.map(([x, y], i) => (
            <g key={i} data-pin>
              <circle cx={x} cy={y} r="9" fill="#000" stroke="rgba(255,255,255,.6)" />
              <text x={x} y={y + 3.5} textAnchor="middle" fill="#fff" fontSize="9">
                M
              </text>
            </g>
          ))}
          {PINS.map(([x, y, n]) => (
            <g key={n} data-pin>
              <circle cx={x} cy={y} r="13" fill="#fff" />
              <text x={x} y={y + 4} textAnchor="middle" fill="#000" fontSize="11" fontWeight="600">
                {n}
              </text>
            </g>
          ))}
          <g data-pin>
            <circle cx="700" cy="520" r="34" fill="#a0725b" />
            <text x="700" y="527" textAnchor="middle" fill="#fff" fontSize="17">
              N°7
            </text>
          </g>
        </svg>
      </div>
    </Section>
  );
}
