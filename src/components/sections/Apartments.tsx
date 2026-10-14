"use client";

import { useEffect, useRef, useState } from "react";
import { residences } from "@/content/site";
import { cn } from "@/lib/cn";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { useApp } from "@/components/providers/AppProvider";
import { Magnetic } from "@/components/motion/Magnetic";
import { Odometer } from "@/components/motion/Odometer";
import { Lines, Reveal } from "@/components/motion/Reveal";
import { Rule } from "@/components/motion/Rule";
import { Label } from "@/components/ui/Label";
import { Section } from "@/components/ui/Section";

/**
 * Residence explorer. Tabs switch the plan: walls redraw themselves, the area
 * range rolls, and rooms and their schedule rows highlight one another on hover.
 */
export function Apartments() {
  const [tab, setTab] = useState(2);
  const [room, setRoom] = useState<number | null>(null);
  const plan = residences.plans[tab];
  const svg = useRef<SVGSVGElement>(null);
  const { setEnquiryOpen } = useApp();

  useEffect(() => {
    const el = svg.current;
    if (!el || prefersReducedMotion()) return;
    const walls = el.querySelectorAll("[data-wall]");
    const labels = el.querySelectorAll("[data-label]");
    gsap.fromTo(walls, { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 1.6, ease: "expo", stagger: 0.07 });
    gsap.fromTo(labels, { autoAlpha: 0, y: 2 }, { autoAlpha: 1, y: 0, duration: 1, ease: "expo", stagger: 0.07, delay: 0.4 });
  }, [tab]);

  const total = plan.rooms.reduce((a, r) => a + r.area, 0);

  return (
    <Section id="residences" theme="bone" chapter="08" className="px-g py-sec">
      <Rule />
      <div className="grid-12 mt-6 gap-y-10">
        <Label n="08" className="col-span-12 md:col-span-3">
          {residences.label}
        </Label>
        <Reveal as="h2" className="t-h1 col-span-12 md:col-span-9">
          <Lines lines={residences.title} />
        </Reveal>
        <Reveal className="t-lead col-span-12 max-w-[520px] md:col-span-5 md:col-start-4">{residences.text}</Reveal>
      </div>

      <div className="grid-12 mt-[12vh] gap-y-12">
        <div className="col-span-12 flex flex-col md:col-span-5">
          <div role="tablist" aria-label="Residence types" className="flex flex-wrap gap-2">
            {residences.plans.map((p, i) => (
              <button
                key={p.label}
                role="tab"
                aria-selected={i === tab}
                onClick={() => {
                  setTab(i);
                  setRoom(null);
                }}
                className={cn(
                  "t-mono rounded-full border px-4 py-2.5 transition-colors duration-500",
                  i === tab ? "border-fg bg-fg text-bg" : "border-line hover:border-fg",
                )}
              >
                {p.label}
              </button>
            ))}
          </div>

          <p className="mt-12 flex items-baseline gap-3">
            <span className="font-display serif-em text-[clamp(72px,9vw,168px)] leading-[0.85] tracking-[-0.05em]">
              <Odometer value={plan.area} stagger={0.03} />
            </span>
            <span className="t-mono">m²</span>
          </p>

          <table className="t-mono mt-10 w-full" onPointerLeave={() => setRoom(null)}>
            <caption className="sr-only">Room schedule for the {plan.label}</caption>
            <tbody>
              {plan.rooms.map((r, i) => (
                <tr
                  key={`${plan.label}-${i}`}
                  onPointerEnter={() => setRoom(i)}
                  className={cn("border-t border-line transition-opacity duration-500", room !== null && room !== i && "opacity-35")}
                >
                  <td className="py-3 text-copper">0{i + 1}</td>
                  <td className="py-3">{r.name}</td>
                  <td className="py-3 text-right tabular-nums">{r.area.toFixed(1)} m²</td>
                </tr>
              ))}
              <tr className="border-t border-fg">
                <td />
                <td className="py-3 text-dim">Total, example plan</td>
                <td className="py-3 text-right tabular-nums">{total.toFixed(1)} m²</td>
              </tr>
            </tbody>
          </table>

          <p className="t-mono mt-8 text-dim">{residences.conditions}</p>
          <Magnetic className="mt-10 self-start">
            <button
              type="button"
              onClick={() => setEnquiryOpen(true)}
              className="t-mono rounded-full bg-fg px-7 py-5 text-bg transition-colors duration-500 hover:bg-copper hover:text-bone"
            >
              {residences.cta} →
            </button>
          </Magnetic>
        </div>

        <div className="relative col-span-12 md:col-span-7 md:col-start-6">
          <div className="sticky top-24 bg-fg/[0.035] p-[6%]">
            <svg ref={svg} viewBox="-2 -2 104 74" className="w-full overflow-visible" role="img" aria-label={`Floor plan: ${plan.label}`}>
              {plan.rooms.map((r, i) => {
                const [x, y, w, h] = r.r;
                return (
                  <g key={`${plan.label}-${i}`} onPointerEnter={() => setRoom(i)} onPointerLeave={() => setRoom(null)} className="cursor-default">
                    <rect
                      x={x}
                      y={y}
                      width={w}
                      height={h}
                      className={cn("transition-[fill] duration-500", room === i ? "fill-copper/25" : "fill-transparent")}
                    />
                    <rect data-wall x={x} y={y} width={w} height={h} pathLength={1} strokeDasharray="1" fill="none" stroke="currentColor" strokeWidth={0.6} />
                    <g data-label>
                      <text x={x + 2.2} y={y + 4.6} fontSize={2.3} className="fill-current font-mono uppercase" letterSpacing={0.15}>
                        {r.name}
                      </text>
                      <text x={x + 2.2} y={y + 8.4} fontSize={2.9} className="fill-current font-serif italic">
                        {r.area.toFixed(1)} m²
                      </text>
                    </g>
                  </g>
                );
              })}
              {/* window bands along the top facade */}
              <line x1="0" y1="-1.2" x2="100" y2="-1.2" stroke="currentColor" strokeOpacity=".35" strokeWidth=".3" strokeDasharray="6 2" />
            </svg>
            <div className="t-mono mt-6 flex justify-between text-dim">
              <span>Plan — {plan.label}</span>
              <span>N ↑ · 1:100</span>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
