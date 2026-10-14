"use client";

import { useRef, useState } from "react";
import { amenities } from "@/content/site";
import { cn } from "@/lib/cn";
import { gsap, useGSAP } from "@/lib/gsap";
import { Odometer } from "@/components/motion/Odometer";
import { Img } from "@/components/ui/Img";
import { Label } from "@/components/ui/Label";
import { Section } from "@/components/ui/Section";

const N = amenities.items.length;
const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Pinned deck. Each step raises the next card from below through a clip reveal
 * while the card beneath recedes (scale, dim); the giant italic numeral rolls
 * like an odometer and the title and copy swap.
 */
export function Advantages() {
  const root = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
        const cards = gsap.utils.toArray<HTMLElement>("[data-card]");
        gsap.set(cards, { filter: "brightness(1)" });
        gsap.set(cards.slice(1), { clipPath: "inset(100% 0% 0% 0%)", yPercent: 12 });
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.6,
            onUpdate: (self) => setActive(Math.min(N - 1, Math.round(self.progress * (N - 1)))),
          },
        });
        for (let i = 1; i < N; i++) {
          const t = i - 1 + 0.15;
          tl.to(cards[i], { clipPath: "inset(0% 0% 0% 0%)", yPercent: 0, duration: 0.75 }, t)
            .to(cards[i].querySelector("[data-inner]"), { scale: 1, duration: 0.75 }, t)
            .to(cards[i - 1], { scale: 0.9, yPercent: -4, filter: "brightness(0.6)", duration: 0.75 }, t);
          if (i > 1) tl.to(cards[i - 2], { autoAlpha: 0, duration: 0.4 }, t + 0.3);
        }
        tl.to({}, { duration: 0.2 });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  const item = amenities.items[active];

  return (
    <Section id="amenities" theme="noir" chapter="06">
      {/* Desktop: pinned deck (stacked cards instead under reduced motion) */}
      <div ref={root} className="relative hidden md:motion-safe:block" style={{ height: `${N * 90}svh` }}>
        <div className="sticky top-0 grid-12 h-svh px-g pt-28 pb-g">
          <div className="col-span-4 flex flex-col justify-between">
            <Label n="06">{amenities.label}</Label>
            <p className="font-display serif-em text-copper text-[clamp(120px,17vw,320px)] leading-[0.8] tracking-[-0.06em]" aria-label={`${active + 1} of ${N}`}>
              <Odometer value={pad(active + 1)} stagger={0.05} />
            </p>
            <div className="grid">
              {amenities.items.map((it, i) => (
                <div
                  key={it.title}
                  className={cn(
                    "col-start-1 row-start-1 transition-[opacity,transform] duration-1000 ease-expo",
                    i === active ? "opacity-100" : "pointer-events-none translate-y-6 opacity-0",
                  )}
                  aria-hidden={i !== active}
                >
                  <h3 className="t-h2">{it.title}</h3>
                  <p className="t-body mt-5 max-w-[380px] text-dim">{it.text}</p>
                </div>
              ))}
            </div>
            <p className="t-mono text-dim">
              {pad(active + 1)} / {pad(N)} — {item.title}
            </p>
          </div>
          <div className="relative col-span-7 col-start-6">
            {amenities.items.map((it, i) => (
              <div key={it.title} data-card className="grade absolute inset-0 origin-top overflow-hidden" style={{ zIndex: i }}>
                <div data-inner className="absolute inset-0 scale-[1.15]" style={i === 0 ? { transform: "none" } : undefined}>
                  <Img src={it.image} sizes="60vw" alt={it.title} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile: stacked cards */}
      <div className="px-g py-sec md:motion-safe:hidden">
        <Label n="06">{amenities.label}</Label>
        {amenities.items.map((it, i) => (
          <article key={it.title} className="mt-14">
            <div className="grade relative aspect-[4/5] overflow-hidden">
              <Img src={it.image} sizes="100vw" alt={it.title} />
            </div>
            <div className="mt-5 flex items-baseline gap-4">
              <span className="font-display serif-em text-copper text-[64px] leading-none">{pad(i + 1)}</span>
              <h3 className="t-h3">{it.title}</h3>
            </div>
            <p className="t-body mt-3 text-dim">{it.text}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}
