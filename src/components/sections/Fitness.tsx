"use client";

import { useRef } from "react";
import { wellness } from "@/content/site";
import { cn } from "@/lib/cn";
import { gsap, prefersReducedMotion, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { scrollState } from "@/lib/scroll";
import { Lines } from "@/components/motion/Reveal";
import { Img } from "@/components/ui/Img";
import { Section } from "@/components/ui/Section";

/**
 * Horizontal wellness track. Vertical scroll drives the row sideways; images skew
 * with scroll velocity and swell slightly as they pass the centre of the screen.
 * Below md it is a native swipe row.
 */
export function Fitness() {
  const section = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add("(min-width: 768px)", () => {
      const s = section.current!;
      const t = track.current!;
      const distance = () => t.scrollWidth - window.innerWidth;
      const size = () => (s.style.height = `${distance() + window.innerHeight}px`);
      size();
      ScrollTrigger.addEventListener("refreshInit", size);
      gsap.to(t, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: { trigger: s, start: "top top", end: "bottom bottom", scrub: 0.5, invalidateOnRefresh: true },
      });

      const cards = Array.from(t.querySelectorAll<HTMLElement>("[data-media]"));
      let skew = 0;
      const tick = () => {
        if (prefersReducedMotion()) return;
        skew += (gsap.utils.clamp(-6, 6, scrollState.velocity * 0.12) - skew) * 0.1;
        const cx = window.innerWidth / 2;
        cards.forEach((c) => {
          const r = c.getBoundingClientRect();
          if (r.right < 0 || r.left > window.innerWidth) return;
          const d = Math.min(1, Math.abs(r.left + r.width / 2 - cx) / cx);
          c.style.transform = `skewX(${-skew}deg) scale(${1 + (1 - d) * 0.05})`;
        });
      };
      gsap.ticker.add(tick);
      return () => {
        gsap.ticker.remove(tick);
        ScrollTrigger.removeEventListener("refreshInit", size);
        s.style.height = "";
      };
    });
    return () => mm.revert();
  });

  return (
    <Section id="wellness" theme="bone">
      <div ref={section} className="relative">
        <div className="no-scrollbar overflow-x-auto md:sticky md:top-0 md:h-svh md:overflow-hidden">
          <div ref={track} className="flex h-[88svh] w-max items-start gap-[6vh] px-g pt-24 md:h-svh md:gap-[8vh] md:pr-[20vw]">
            <h2 className="t-display em-copper shrink-0 self-center pr-[6vh]">
              <Lines lines={wellness.title} />
            </h2>
            {wellness.blocks.map((b, i) =>
              b.kind === "image" ? (
                <figure key={i} className="shrink-0" style={{ marginTop: `${b.top * 0.8}svh`, width: `${b.w}svh` }}>
                  <div data-media className="grade relative overflow-hidden will-change-transform" style={{ height: `${b.h}svh` }}>
                    <Img src={b.src} sizes={`${b.w}vh`} alt={"caption" in b ? b.caption : ""} />
                  </div>
                  {"caption" in b && <figcaption className="t-mono mt-3">{b.caption}</figcaption>}
                </figure>
              ) : (
                <p
                  key={i}
                  className={cn("shrink-0", "large" in b && b.large ? "t-h3 w-[46svh]" : "t-lead w-[38svh]")}
                  style={{ marginTop: `${b.top}svh` }}
                >
                  {b.text}
                </p>
              ),
            )}
          </div>
        </div>
      </div>
    </Section>
  );
}
