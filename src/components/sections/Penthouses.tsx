"use client";

import { useRef } from "react";
import { epilogue } from "@/content/site";
import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";
import { useApp } from "@/components/providers/AppProvider";
import { GLImage } from "@/components/gl/GLImage";
import { Magnetic } from "@/components/motion/Magnetic";
import { Odometer } from "@/components/motion/Odometer";
import { Parallax } from "@/components/motion/Parallax";
import { Lines, Reveal } from "@/components/motion/Reveal";
import { Rule } from "@/components/motion/Rule";
import { Img } from "@/components/ui/Img";
import { Label } from "@/components/ui/Label";
import { Section } from "@/components/ui/Section";

/** Epilogue: the glass-roofed penthouse crops in to full bleed, the numbers, the terrace, then the invitation. */
export function Penthouses() {
  const hero = useRef<HTMLDivElement>(null);
  const { setEnquiryOpen } = useApp();

  useGSAP(() => {
    if (!hero.current || prefersReducedMotion()) return;
    gsap.fromTo(
      hero.current,
      { clipPath: "inset(14% 18% 14% 18%)" },
      {
        clipPath: "inset(0% 0% 0% 0%)",
        ease: "none",
        scrollTrigger: { trigger: hero.current, start: "top bottom", end: "top top", scrub: 0.6 },
      },
    );
  });

  return (
    <Section id="epilogue" theme="noir" chapter="09" className="pb-sec">
      <div className="px-g pt-sec">
        <Rule />
        <Label n="09" className="mt-6">
          Epilogue
        </Label>
      </div>

      <div ref={hero} className="relative mt-[8vh] h-svh" style={{ clipPath: "inset(14% 18% 14% 18%)" }}>
        <GLImage srcs={[epilogue.hero]} alt="A penthouse salon under a glass roof at sunset" parallax={0.06} className="absolute inset-0" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-noir/70 via-noir/10 to-transparent" />
        <Reveal as="h2" className="t-h1 absolute inset-x-g bottom-g text-bone">
          <Lines lines={epilogue.title} />
        </Reveal>
      </div>

      <div className="grid-12 mt-[12vh] gap-y-12 px-g">
        <Reveal className="t-lead col-span-12 md:col-span-5">{epilogue.text}</Reveal>
        <dl className="col-span-12 grid grid-cols-3 gap-x-g md:col-span-6 md:col-start-7">
          {epilogue.stats.map((s) => (
            <div key={s.label} className="flex flex-col border-t border-line pt-4">
              <dt className="t-mono order-2 mt-3 text-dim">{s.label}</dt>
              <dd className="font-display serif-em text-[clamp(44px,5.4vw,104px)] leading-none tracking-[-0.05em]">
                <Odometer value={s.value} />
                <span className="t-mono ml-1 not-italic">{s.unit}</span>
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="grid-12 mt-[14vh] items-end gap-y-8 px-g">
        <Parallax className="col-span-12 aspect-[4/5] md:col-span-5" travel={26}>
          <Img src={epilogue.terrace} sizes="(min-width: 768px) 42vw, 100vw" alt="A penthouse terrace at night" />
        </Parallax>
        <p className="t-h3 col-span-12 md:col-span-4 md:col-start-7">{epilogue.terraceText}</p>
      </div>

      <div className="relative mt-[18vh] overflow-hidden px-g">
        <div className="grid-12 items-center gap-y-12">
          <h2 className="t-display em-copper col-span-12 md:col-span-8">
            <Lines lines={epilogue.cta.title} />
          </h2>
          <div className="col-span-12 flex items-center gap-8 md:col-span-4 md:flex-col md:items-end">
            <Parallax className="aspect-[3/4] w-1/2 md:w-[70%]" travel={30}>
              <Img src={epilogue.cta.image} sizes="25vw" alt="The entrance at night" />
            </Parallax>
            <Magnetic strength={0.45}>
              <button
                type="button"
                onClick={() => setEnquiryOpen(true)}
                className="t-mono grid size-36 place-items-center rounded-full bg-copper text-bone transition-[background-color,transform] duration-700 ease-expo hover:scale-110 hover:bg-copper-2 md:size-44"
              >
                {epilogue.cta.button} →
              </button>
            </Magnetic>
          </div>
        </div>
      </div>
    </Section>
  );
}
