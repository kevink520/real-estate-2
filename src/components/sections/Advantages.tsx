"use client";

import { useRef, useState } from "react";
import { advantages } from "@/content/site";
import { cn } from "@/lib/cn";
import { gsap, useGSAP } from "@/lib/gsap";
import { Lines } from "@/components/motion/Reveal";
import { Img } from "@/components/ui/Img";
import { Section } from "@/components/ui/Section";

const N = advantages.items.length;

/**
 * Pinned stack (reference `advantages` / `advantagesImage` patterns): each step of
 * 100vh reveals the next image with clip-path polygon from the bottom plus a 5svh
 * rise, while the left panel swaps the title, copy and "n — 5" counter.
 */
export function Advantages() {
  const root = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
        const images = gsap.utils.toArray<HTMLElement>("[data-adv-image]");
        const texts = gsap.utils.toArray<HTMLElement>("[data-adv-text]");
        gsap.set(images.slice(1), { clipPath: "inset(100% 0% 0% 0%)", y: "5svh" });
        gsap.set(texts.slice(1), { autoAlpha: 0, y: 30 });
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "bottom bottom",
            scrub: true,
            onUpdate: (self) => setActive(Math.min(N - 1, Math.round(self.progress * (N - 1)))),
          },
        });
        for (let i = 1; i < N; i++) {
          const at = i - 1 + 0.15;
          tl.to(images[i], { clipPath: "inset(0% 0% 0% 0%)", y: 0, duration: 0.7 }, at)
            .to(images[i - 1], { y: "-5svh", duration: 0.7 }, at)
            .to(texts[i - 1], { autoAlpha: 0, y: -30, duration: 0.3 }, at + 0.1)
            .to(texts[i], { autoAlpha: 1, y: 0, duration: 0.35 }, at + 0.4);
        }
        tl.to({}, { duration: 0.15 });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <Section id="advantages" theme="dark" themeLeft="dark">
      <h2 className="sr-only">{advantages.label}</h2>

      {/* Desktop: pinned stack */}
      <div ref={root} className="relative hidden md:block" style={{ height: `${N * 100}svh` }}>
        <div className="sticky top-0 flex h-svh overflow-hidden">
          <div className="relative w-[var(--col)] shrink-0 bg-black">
            <p className="t-tiny absolute top-[150px] left-g flex items-center gap-2">
              <span className="inline-block w-3 text-center">{active + 1}</span>
              <span className="h-px w-3 bg-white/40" />
              <span className="text-white/40">{N}</span>
            </p>
            {advantages.items.map((item, i) => (
              <div key={i} data-adv-text className="absolute inset-0">
                <h3 className="t-lead absolute top-[45%] left-g">
                  <Lines lines={item.title} />
                </h3>
                <p className="t-tiny absolute right-g bottom-g left-[22%]">{item.text}</p>
              </div>
            ))}
          </div>
          <div className="relative flex-1 overflow-hidden">
            {advantages.items.map((item, i) => (
              <div key={i} data-adv-image className="absolute inset-0 overflow-hidden" style={{ zIndex: i }}>
                <Img src={item.image} sizes="67vw" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile: stacked cards */}
      <div className="md:hidden">
        {advantages.items.map((item, i) => (
          <article key={i} className={cn("bg-black", i > 0 && "mt-[5px]")}>
            <div className="relative aspect-[4/3]">
              <Img src={item.image} sizes="100vw" />
            </div>
            <div className="px-g pt-4 pb-8">
              <p className="t-tiny text-white/40">
                {i + 1} — {N}
              </p>
              <h3 className="t-lead mt-6">
                <Lines lines={item.title} />
              </h3>
              <p className="t-tiny mt-10 ml-[30%]">{item.text}</p>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
