"use client";

import { useState } from "react";
import { infrastructure } from "@/content/site";
import { cn } from "@/lib/cn";
import { Lines, Reveal } from "@/components/motion/Reveal";
import { Parallax } from "@/components/motion/Parallax";
import { Arrow } from "@/components/ui/Arrow";
import { Img } from "@/components/ui/Img";
import { Section } from "@/components/ui/Section";

export function Infrastructure() {
  const [index, setIndex] = useState(0);
  const n = infrastructure.items.length;
  const go = (dir: 1 | -1) => setIndex((i) => (i + dir + n) % n);

  return (
    <>
      <Section id="infrastructure" theme="dark" className="h-svh min-h-[560px] overflow-hidden">
        <Parallax className="absolute inset-0" travel={20}>
          <Img src={infrastructure.hero} className="object-[30%_50%]" />
        </Parallax>
        <Reveal as="h2" type="chars" className="t-h2 absolute top-1/2 right-g -translate-y-1/2">
          {infrastructure.title}
        </Reveal>
      </Section>

      <Section theme="dark" themeLeft="light" className="md:h-svh md:min-h-[600px]">
        <div className="flex h-full flex-col md:flex-row">
          <div className="relative bg-white px-g pt-[90px] pb-g md:w-[var(--col)] md:pt-[120px]">
            <div className="relative aspect-square overflow-hidden">
              {infrastructure.items.map((it, i) => (
                <div key={i} className={cn("absolute inset-0 transition-[clip-path] duration-1200 ease-lux", i === index ? "[clip-path:inset(0_0_0_0)]" : "[clip-path:inset(0_0_100%_0)]")} style={{ zIndex: i === index ? 2 : 1 }}>
                  <Img src={it.image} sizes="(min-width: 768px) 30vw, 100vw" />
                </div>
              ))}
            </div>
          </div>
          <div
            data-cursor="arrows"
            className="relative min-h-[420px] flex-1 bg-black"
            onClick={(e) => {
              if (!window.matchMedia("(hover: hover)").matches) return;
              const r = e.currentTarget.getBoundingClientRect();
              go(e.clientX > r.left + r.width / 2 ? 1 : -1);
            }}
          >
            <p className="t-tiny absolute top-[120px] left-g hidden md:block">{infrastructure.title}</p>
            <div className="absolute top-g left-g flex gap-5 md:top-1/2 md:-translate-y-1/2">
              <button type="button" aria-label="Previous" onClick={(e) => (e.stopPropagation(), go(-1))} className="transition-opacity hover:opacity-50">
                <Arrow dir="left" className="w-8" />
              </button>
              <button type="button" aria-label="Next" onClick={(e) => (e.stopPropagation(), go(1))} className="transition-opacity hover:opacity-50">
                <Arrow dir="right" className="w-8" />
              </button>
            </div>
            <p className="t-tiny absolute top-g right-g md:top-1/2 md:-translate-y-1/2">
              {index + 1} <span className="text-white/40">— {n}</span>
            </p>
            {infrastructure.items.map((it, i) => (
              <div key={i} className={cn("absolute inset-x-g bottom-g transition-[opacity,transform] duration-800 ease-lux", i === index ? "opacity-100" : "pointer-events-none translate-y-4 opacity-0")}>
                <h3 className="t-lead">
                  <Lines lines={it.title} />
                </h3>
                <p className="t-tiny mt-6 md:ml-auto md:max-w-[440px]">{it.text}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}
