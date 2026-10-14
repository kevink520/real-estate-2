"use client";

import { useRef, useState } from "react";
import { services } from "@/content/site";
import { cn } from "@/lib/cn";
import { gsap, useGSAP } from "@/lib/gsap";
import { Lines } from "@/components/motion/Reveal";
import { RollText } from "@/components/motion/RollText";
import { Img } from "@/components/ui/Img";
import { Section } from "@/components/ui/Section";

// Mask shape per step: arch → lozenge → square, morphing as the service changes.
const MASKS = ["inset(0% 0% 0% 0% round 999px 999px 0px 0px)", "inset(6% 4% 6% 4% round 48px)", "inset(0% 0% 0% 0% round 0px)"];

/** Pinned: the sticky image morphs its mask and dissolves as each service takes the stage. */
export function Services() {
  const root = useRef<HTMLDivElement>(null);
  const mask = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const N = services.items.length;

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.6,
            onUpdate: (self) => setActive(Math.min(N - 1, Math.floor(self.progress * N * 0.999))),
          },
        });
        tl.fromTo(mask.current, { clipPath: MASKS[0] }, { clipPath: MASKS[1], duration: 1 }).to(mask.current, { clipPath: MASKS[2], duration: 1 });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <Section id="services" theme="noir">
      <div ref={root} className="relative md:h-[300svh]">
        <div className="grid-12 gap-y-12 px-g py-sec md:sticky md:top-0 md:h-svh md:py-0 md:pt-28 md:pb-g">
          <div className="col-span-12 md:col-span-5">
            <div ref={mask} className="grade relative aspect-[4/5] overflow-hidden md:aspect-auto md:h-full" style={{ clipPath: MASKS[0] }}>
              {services.items.map((s, i) => (
                <div key={s.title} className={cn("absolute inset-0 transition-[opacity,transform] duration-[1.4s] ease-expo", i === active ? "scale-100 opacity-100" : "scale-110 opacity-0")}>
                  <Img src={s.image} sizes="(min-width: 768px) 42vw, 100vw" alt={s.title} />
                </div>
              ))}
            </div>
          </div>
          <div className="col-span-12 flex flex-col justify-between md:col-span-6 md:col-start-7">
            <h2 className="t-h2 em-copper">
              <Lines lines={services.title} />
            </h2>
            <ol className="mt-12">
              {services.items.map((s, i) => (
                <li key={s.title} className="border-t border-line">
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    className={cn("group grid w-full grid-cols-[4ch_1fr] gap-4 py-6 text-left transition-opacity duration-700", i === active ? "opacity-100" : "opacity-35 hover:opacity-70")}
                  >
                    <span className="t-mono pt-3 text-copper">0{i + 1}</span>
                    <span>
                      <span className="t-h2 block">
                        <RollText>{s.title}</RollText>
                      </span>
                      <span className={cn("grid transition-[grid-template-rows] duration-700 ease-expo", i === active ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}>
                        <span className="t-body block max-w-[440px] overflow-hidden text-dim">
                          <span className="block pt-4">{s.text}</span>
                        </span>
                      </span>
                    </span>
                  </button>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </Section>
  );
}
