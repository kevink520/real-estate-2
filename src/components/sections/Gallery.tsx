"use client";

import { useRef } from "react";
import { gallery } from "@/content/site";
import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";
import { Reveal } from "@/components/motion/Reveal";
import { Img } from "@/components/ui/Img";
import { Section } from "@/components/ui/Section";

// Positions measured from the 1440×750 reference frame; speed = scroll parallax factor.
const LAYOUT = [
  { cls: "left-0 top-0 w-[24vw] h-[30%] md:w-[10.5vw] md:h-[24%]", speed: 0.6 },
  { cls: "right-0 top-0 w-[30vw] h-[22%] md:w-[10vw] md:h-[18%]", speed: 0.9 },
  { cls: "left-[22vw] top-[30%] w-[56vw] h-[30%] md:left-[33vw] md:top-[11%] md:w-[21vw] md:h-[29%]", speed: 0.25 },
  { cls: "left-0 bottom-0 w-[38vw] h-[24%] md:w-[21.5vw] md:h-[31%]", speed: 0.75 },
  { cls: "right-0 bottom-0 w-[42vw] h-[28%] md:w-[18vw] md:h-[49%]", speed: 0.45 },
];

export function Gallery() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.utils.toArray<HTMLElement>("[data-speed]").forEach((el) => {
        const s = Number(el.dataset.speed);
        gsap.fromTo(
          el,
          { yPercent: 40 * s },
          { yPercent: -40 * s, ease: "none", scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true } },
        );
      });
    },
    { scope: root },
  );

  return (
    <Section id="gallery" theme="dark" className="h-svh min-h-[600px] overflow-hidden">
      <div ref={root} data-cursor="view" className="absolute inset-0">
        {gallery.images.map((src, i) => (
          <div key={src} data-speed={LAYOUT[i].speed} className={`absolute overflow-hidden ${LAYOUT[i].cls}`}>
            <Img src={src} sizes="(min-width: 768px) 22vw, 50vw" />
          </div>
        ))}
        <div className="absolute top-1/2 left-g flex -translate-y-1/2 items-start gap-1.5 md:left-[25vw]">
          <Reveal as="h2" type="chars" className="t-h2">
            {gallery.title}
          </Reveal>
          <span className="t-tiny mt-1">{gallery.count}</span>
        </div>
      </div>
    </Section>
  );
}
