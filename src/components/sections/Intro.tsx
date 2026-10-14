"use client";

import { useEffect, useRef, useState } from "react";
import { brand, hero } from "@/content/site";
import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";
import { useApp } from "@/components/providers/AppProvider";
import { GLImage } from "@/components/gl/GLImage";
import { Lines, Reveal } from "@/components/motion/Reveal";
import { Section } from "@/components/ui/Section";

const CYCLE = 7000;

function useClock() {
  const [now, setNow] = useState<string | null>(null);
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", second: "2-digit", timeZone: "Europe/Paris" });
    const tick = () => setNow(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return now;
}

/**
 * Prologue. Full-bleed GL hero dissolving between golden and blue hour every 7s,
 * mixed roman/italic headline, live coordinates and clock. The wordmark at its foot
 * belongs to the header (it scrubs up into the logo). The hero pins while the
 * manifesto slides over it, sinking and dimming as it goes.
 */
export function Intro() {
  const root = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const { introStage } = useApp();
  const time = useClock();

  useEffect(() => {
    if (introStage !== "done") return;
    const id = setInterval(() => setIndex((i) => (i + 1) % hero.images.length), CYCLE);
    return () => clearInterval(id);
  }, [introStage]);

  useGSAP(() => {
    if (!root.current || !inner.current || prefersReducedMotion()) return;
    gsap.to(inner.current, {
      yPercent: 18,
      scale: 0.94,
      opacity: 0.35,
      ease: "none",
      scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true, pin: true, pinSpacing: false },
    });
  });

  return (
    <Section id="top" theme="noir" chapter="01" className="h-svh overflow-hidden !bg-noir text-bone">
      <div ref={root} className="h-svh">
        <div ref={inner} className="relative h-full origin-bottom">
          <div data-hero-media className="absolute inset-0">
            <GLImage srcs={hero.images} index={index} alt="The VERNE N°7 tower above the rooftops" preload ambient={0.45} parallax={0} className="size-full" duration={2.4} />
          </div>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-noir/55 via-transparent via-40% to-noir/50" aria-hidden />

          <div className="relative grid-12 h-full px-g pt-[22svh] md:pt-[19svh]">
            <div className="col-span-12 md:col-span-8">
              <Reveal as="h1" intro className="t-h1">
                <Lines lines={hero.title} />
              </Reveal>
            </div>
            <div className="col-span-12 mt-8 md:col-span-3 md:col-start-10 md:mt-3">
              <Reveal intro delay={0.25} className="t-body max-w-[300px] text-bone/80">
                {hero.intro}
              </Reveal>
            </div>
          </div>

          <div data-intro="fade" className="t-mono absolute inset-x-g bottom-[calc(var(--gutter)*2+19.5vw)] flex items-end justify-between">
            <p>
              {brand.coords[0]} · {brand.coords[1]}
              <br />
              <span className="tabular-nums">{time ?? "--:--:--"}</span> Paris
            </p>
            <p className="flex items-center gap-3">
              <span className="relative block size-2 overflow-hidden rounded-full border border-current">
                <span className="absolute inset-0 bg-current transition-transform duration-[2.4s] ease-in-out" style={{ transform: `translateX(${index ? -100 : 0}%)` }} />
              </span>
              <span className="relative block h-[1.45em] w-[11ch] overflow-hidden">
                {hero.states.map((s, i) => (
                  <span
                    key={s}
                    className="absolute inset-0 transition-transform duration-1000 ease-expo"
                    style={{ transform: `translateY(${(i - index) * 100}%)` }}
                  >
                    {s}
                  </span>
                ))}
              </span>
            </p>
            <p className="hidden items-center gap-3 md:flex">
              Scroll
              <span className="relative block h-px w-14 overflow-hidden bg-bone/30">
                <span className="absolute inset-0 origin-left animate-[scrollcue_2.4s_var(--ease-expo)_infinite] bg-bone" />
              </span>
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}
