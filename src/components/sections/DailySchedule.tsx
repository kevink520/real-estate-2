"use client";

import { useRef, useState } from "react";
import { day } from "@/content/site";
import { gsap, prefersReducedMotion, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/cn";
import { GLImage } from "@/components/gl/GLImage";
import { setPageTheme, THEMES } from "@/components/motion/ThemeScroller";
import { Odometer } from "@/components/motion/Odometer";
import { Label } from "@/components/ui/Label";
import { Section } from "@/components/ui/Section";

const N = day.steps.length;
// Page colour stops across the chapter: noir (arriving) → dawn → noon → dusk → night.
const STOPS = [0, 0.12, 0.4, 0.66, 0.92];
const BG = ["#0e0c0a", ...day.palette.map((p) => p[0])];
const FG = ["#ede6da", ...day.palette.map((p) => p[1])];

/** Colour at progress p. Text (`snap`) flips at the midpoint instead of fading through grey. */
function at(colors: string[], p: number, snap = false) {
  const i = Math.max(0, STOPS.findLastIndex((s) => p >= s));
  if (i >= STOPS.length - 1) return colors[colors.length - 1];
  const t = (p - STOPS[i]) / (STOPS[i + 1] - STOPS[i]);
  if (snap) return t < 0.5 ? colors[i] : colors[i + 1];
  return gsap.utils.interpolate(colors[i], colors[i + 1], t);
}

/**
 * A day at N°7. The chapter pins for four steps; scrolling turns the sundial
 * from dawn to night, the time rolls, photographs dissolve in the shader and the
 * whole page warms from pale stone through copper dusk to noir.
 */
export function DailySchedule() {
  const root = useRef<HTMLDivElement>(null);
  const hand = useRef<SVGGElement>(null);
  const arc = useRef<SVGCircleElement>(null);
  const [active, setActive] = useState(0);

  useGSAP(
    () => {
      const html = document.documentElement;
      const hours = { h: day.steps[0].hour - 1 };
      const setHand = () => {
        const deg = (hours.h / 24) * 360;
        hand.current?.setAttribute("transform", `rotate(${deg} 100 100)`);
        arc.current?.setAttribute("stroke-dashoffset", String(1 - hours.h / 24));
      };
      setHand();

      // Page colour: from the moment the chapter reaches mid-screen until it leaves.
      const colour = ScrollTrigger.create({
        trigger: root.current,
        start: "top 55%",
        end: "bottom bottom",
        onToggle(self) {
          if (self.isActive) return void (html.dataset.themeLock = "1");
          // Both neighbours (gallery above, amenities below) are noir; their own triggers may
          // have fired while the lock was held, so hand the page back explicitly.
          delete html.dataset.themeLock;
          setPageTheme(THEMES.noir.bg, THEMES.noir.fg);
        },
        onUpdate(self) {
          gsap.killTweensOf(html);
          html.style.setProperty("--bg", at(BG, self.progress));
          html.style.setProperty("--fg", at(FG, self.progress, true));
        },
      });

      const steps = ScrollTrigger.create({
        trigger: root.current,
        start: "top top",
        end: "bottom bottom",
        onUpdate(self) {
          setActive(Math.min(N - 1, Math.floor(self.progress * N)));
        },
      });

      const dial = prefersReducedMotion()
        ? null
        : gsap.to(hours, {
            h: 24,
            ease: "none",
            onUpdate: setHand,
            scrollTrigger: { trigger: root.current, start: "top top", end: "bottom bottom", scrub: 0.8 },
          });

      return () => {
        delete html.dataset.themeLock;
        colour.kill();
        steps.kill();
        dial?.kill();
      };
    },
    { scope: root },
  );

  const step = day.steps[active];

  return (
    <Section id="day" theme="custom" chapter="05" >
      <div ref={root} className="relative" style={{ height: `${N * 100 + 40}svh` }}>
        <div className="sticky top-0 grid h-svh grid-rows-[1fr_auto] gap-g px-g pt-24 pb-g md:grid-cols-2 md:grid-rows-1 md:pt-g">
          <div className="relative order-2 flex flex-col justify-between md:order-1 md:pt-24">
            <Label n="05">{day.label}</Label>

            <div className="flex items-end gap-6 md:block">
              <svg viewBox="0 0 200 200" className="hidden size-[min(26vh,240px)] md:mb-8 md:block" aria-hidden>
                <circle cx="100" cy="100" r="92" fill="none" stroke="currentColor" strokeOpacity=".2" />
                <circle
                  ref={arc}
                  cx="100"
                  cy="100"
                  r="92"
                  fill="none"
                  className="stroke-copper"
                  strokeWidth="1.5"
                  pathLength={1}
                  strokeDasharray="1"
                  strokeDashoffset="1"
                  transform="rotate(-90 100 100)"
                />
                {Array.from({ length: 24 }, (_, h) => (
                  <line
                    key={h}
                    x1="100"
                    y1={h % 6 === 0 ? 14 : 10}
                    x2="100"
                    y2="4"
                    stroke="currentColor"
                    strokeOpacity={h % 6 === 0 ? 0.9 : 0.35}
                    transform={`rotate(${h * 15} 100 100)`}
                  />
                ))}
                {["00", "06", "12", "18"].map((t, i) => (
                  <text key={t} x="100" y="30" textAnchor="middle" fontSize="9" className="fill-current font-mono" transform={`rotate(${i * 90} 100 100)`}>
                    {t}
                  </text>
                ))}
                <g ref={hand}>
                  <line x1="100" y1="100" x2="100" y2="22" stroke="currentColor" strokeWidth="1" />
                  <circle cx="100" cy="12" r="6" className="fill-copper" />
                </g>
                <circle cx="100" cy="100" r="2.5" fill="currentColor" />
              </svg>

              <p className="font-display serif-em text-[clamp(72px,11vw,200px)] leading-[0.85] tracking-[-0.05em]">
                <Odometer value={step.time} stagger={0.04} />
              </p>
            </div>

            <div className="grid min-h-[8.5em] grid-cols-1 md:max-w-[440px]">
              {day.steps.map((s, i) => (
                <div
                  key={s.name}
                  className={cn(
                    "col-start-1 row-start-1 transition-[opacity,transform] duration-1000 ease-expo",
                    i === active ? "translate-y-0 opacity-100" : i < active ? "-translate-y-4 opacity-0" : "translate-y-4 opacity-0",
                  )}
                  aria-hidden={i !== active}
                >
                  <p className="t-mono text-copper">{s.name}</p>
                  <p className="t-lead mt-3">{s.text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative order-1 min-h-0 md:order-2">
            <GLImage
              srcs={day.steps.map((s) => s.image)}
              index={active}
              alt={`${step.name} at N°7`}
              sizes="(min-width: 768px) 50vw, 100vw"
              parallax={0}
              duration={1.4}
              className="h-full w-full md:ml-auto md:w-[min(100%,72vh)]"
            />
            <div className="t-mono absolute top-3 left-3 flex gap-2 text-bone md:left-[calc(100%-min(100%,72vh)+12px)]">
              {day.steps.map((s, i) => (
                <span key={s.name} className={cn("h-px w-6 self-center bg-bone transition-opacity duration-700", i === active ? "opacity-100" : "opacity-30")} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
