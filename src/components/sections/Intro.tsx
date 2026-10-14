"use client";

import { useEffect, useRef, useState } from "react";
import { intro } from "@/content/site";
import { cn } from "@/lib/cn";
import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";
import { useApp } from "@/components/providers/AppProvider";
import { Lines, Reveal } from "@/components/motion/Reveal";
import { Arrow } from "@/components/ui/Arrow";
import { Img } from "@/components/ui/Img";

/** Day ↔ night crossfade (reference contentAnimation: fadeIn 2s, autoplay every 7s). */
function HeroBackground() {
  const [night, setNight] = useState(false);
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const id = setInterval(() => setNight((n) => !n), 7000);
    return () => clearInterval(id);
  }, []);
  return (
    <div data-hero-bg className="absolute inset-0">
      <Img src={intro.bg.dusk} preload sizes="(min-width: 768px) 67vw, 100vw" className="object-[50%_30%]" />
      <div className={cn("absolute inset-0 transition-opacity duration-[2000ms] ease-linear", night ? "opacity-100" : "opacity-0")}>
        <Img src={intro.bg.night} sizes="(min-width: 768px) 67vw, 100vw" className="object-[50%_30%]" />
      </div>
    </div>
  );
}

/**
 * Sticky hero that the next section slides over (reference: sticky--under-next,
 * sectionOutTiny). The giant bronze wordmark is the header logo in its "big" state.
 */
export function Intro() {
  const root = useRef<HTMLElement>(null);
  const content = useRef<HTMLDivElement>(null);
  const shade = useRef<HTMLDivElement>(null);
  const { scrollTo } = useApp();

  useGSAP(() => {
    if (prefersReducedMotion()) return;
    const st = { trigger: root.current, start: "top top", end: "bottom top", scrub: true };
    gsap.to(content.current, { yPercent: 18, ease: "none", scrollTrigger: st });
    gsap.fromTo(shade.current, { opacity: 0 }, { opacity: 0.6, ease: "none", scrollTrigger: st });
  });

  return (
    <section ref={root} id="top" data-theme="dark" className="sticky top-0 z-0 h-svh overflow-hidden bg-black text-white">
      <div ref={content} className="absolute inset-0">
        <div data-hero-media className="absolute inset-x-0 top-0 h-[62%] overflow-hidden md:inset-y-0 md:left-[var(--col)] md:h-auto">
          <HeroBackground />
        </div>
        <div
          data-hero-media
          data-hero-cutout
          className="absolute bottom-[9%] left-1/2 h-[58%] w-auto -translate-x-1/2 md:bottom-0 md:left-[23vw] md:h-[84%] md:translate-x-0"
          style={{ aspectRatio: "820 / 1142" }}
        >
          <Img src={intro.cutout} preload sizes="(min-width: 768px) 30vw, 60vw" className="object-contain object-bottom" />
        </div>
      </div>

      <div className="relative px-g pt-g md:w-[var(--col)]">
        <Reveal as="h1" type="chars" intro className="t-h2 max-w-[300px] md:max-w-none">
          <span className="sr-only">VERNE N°7 — </span>
          <Lines lines={intro.title} />
        </Reveal>
        <button
          type="button"
          data-intro="fade"
          onClick={() => scrollTo("#about")}
          aria-label="Scroll to content"
          className="mt-6 block transition-opacity duration-400 hover:opacity-50"
        >
          <Arrow />
        </button>
      </div>

      <div ref={shade} className="pointer-events-none absolute inset-0 bg-black opacity-0" />
    </section>
  );
}
