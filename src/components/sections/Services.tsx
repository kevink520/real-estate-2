"use client";

import { useRef, useState } from "react";
import { services } from "@/content/site";
import { cn } from "@/lib/cn";
import { gsap, useGSAP } from "@/lib/gsap";
import { Lines } from "@/components/motion/Reveal";
import { Img } from "@/components/ui/Img";
import { Section } from "@/components/ui/Section";

const N = services.items.length;

/** Pinned: images reveal from the bottom while the matching outlined card lights up. */
export function Services() {
  const root = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
        const images = gsap.utils.toArray<HTMLElement>("[data-svc-image]");
        gsap.set(images.slice(1), { clipPath: "inset(100% 0% 0% 0%)" });
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "bottom bottom",
            scrub: true,
            onUpdate: (self) => setActive(Math.min(N - 1, Math.floor(self.progress * N))),
          },
        });
        for (let i = 1; i < N; i++) {
          tl.to(images[i], { clipPath: "inset(0% 0% 0% 0%)", duration: 0.7 }, i - 1 + 0.3).fromTo(
            images[i].firstElementChild,
            { scale: 1.15 },
            { scale: 1, duration: 0.7 },
            "<",
          );
        }
        tl.to({}, { duration: 0.3 });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <Section id="services" theme="dark">
      <div ref={root} className="relative md:h-[300svh]">
        <div className="md:sticky md:top-0 md:flex md:h-svh md:overflow-hidden">
          <div className="relative hidden flex-[2] overflow-hidden md:block">
            {services.items.map((it, i) => (
              <div key={i} data-svc-image className="absolute inset-0 overflow-hidden" style={{ zIndex: i }}>
                <div className="absolute inset-0">
                  <Img src={it.image} sizes="67vw" />
                </div>
              </div>
            ))}
          </div>
          <div className="relative px-g pt-[100px] pb-g md:flex-1 md:pt-[70px]">
            <h2 className="t-body text-right">
              <Lines lines={services.title} />
            </h2>
            <ol className="mt-10 flex flex-col gap-[5px] md:mt-[110px] md:max-w-[260px]">
              {services.items.map((it, i) => (
                <li
                  key={i}
                  className={cn(
                    "border border-white/60 p-2.5 transition-opacity duration-800 ease-lux md:min-h-[150px]",
                    i === active ? "md:opacity-100" : "md:opacity-25",
                  )}
                >
                  <div className="relative mb-4 aspect-[4/3] md:hidden">
                    <Img src={it.image} sizes="100vw" />
                  </div>
                  <h3 className="t-tiny flex justify-between">
                    {it.title}
                    <span className="text-white/40">
                      {i + 1} — {N}
                    </span>
                  </h3>
                  <p className="t-tiny mt-10">{it.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </Section>
  );
}
