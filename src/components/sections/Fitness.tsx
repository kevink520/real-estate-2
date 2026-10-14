"use client";

import { useRef } from "react";
import { fitness } from "@/content/site";
import { cn } from "@/lib/cn";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { Lines } from "@/components/motion/Reveal";
import { Img } from "@/components/ui/Img";
import { Section } from "@/components/ui/Section";

// Block sizes were measured at a 750px-tall viewport; scale them with svh on desktop.
const sv = (px: number) => `${(px / 750) * 100}svh`;

/** Sticky horizontal track driven by vertical scroll (reference sticky-slider). */
export function Fitness() {
  const section = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
      const s = section.current!;
      const t = track.current!;
      const distance = () => t.scrollWidth - window.innerWidth;
      const size = () => {
        s.style.height = `${distance() + window.innerHeight}px`;
      };
      size();
      ScrollTrigger.addEventListener("refreshInit", size);
      gsap.to(t, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: { trigger: s, start: "top top", end: "bottom bottom", scrub: true, invalidateOnRefresh: true },
      });
      return () => {
        ScrollTrigger.removeEventListener("refreshInit", size);
        s.style.height = "";
      };
    });
    return () => mm.revert();
  });

  return (
    <Section theme="light" themeLeft="light">
      <div ref={section} className="relative">
        <div className="overflow-hidden md:sticky md:top-0 md:h-svh">
          <div ref={track} className="flex flex-col gap-10 px-g py-20 md:h-full md:w-max md:flex-row md:items-start md:gap-[5px] md:py-0 md:pr-[10vw]">
            <h2 className="t-label shrink-0 md:mt-[150px] md:w-[13vw]">
              <Lines lines={fitness.title} />
            </h2>
            {fitness.blocks.map((b, i) =>
              b.kind === "image" ? (
                <figure key={i} className="shrink-0 md:mt-[var(--top)]" style={{ "--top": sv(b.top) } as React.CSSProperties}>
                  <div className="relative aspect-[var(--ar)] w-full overflow-hidden md:h-[var(--h)] md:w-[var(--w)]" style={{ "--ar": `${b.w}/${b.h}`, "--w": sv(b.w), "--h": sv(b.h) } as React.CSSProperties}>
                    <Img src={b.src} sizes="(min-width: 768px) 40vw, 100vw" />
                  </div>
                  {"caption" in b && <figcaption className="t-tiny mt-3 max-w-[300px]">{b.caption}</figcaption>}
                </figure>
              ) : (
                <p
                  key={i}
                  className={cn("shrink-0 md:mt-[var(--top)] md:w-[260px] md:px-[40px] md:box-content", "large" in b && b.large ? "t-body" : "t-tiny")}
                  style={{ "--top": sv(b.top) } as React.CSSProperties}
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
