"use client";

import { useState } from "react";
import { apartments } from "@/content/site";
import { cn } from "@/lib/cn";
import { Lines, Reveal } from "@/components/motion/Reveal";
import { Parallax } from "@/components/motion/Parallax";
import { Img } from "@/components/ui/Img";
import { Section } from "@/components/ui/Section";

/** Simple line-drawn plan; the room layout shifts per tab. */
function Plan({ variant }: { variant: number }) {
  const split = 120 + variant * 18;
  return (
    <svg viewBox="0 0 300 260" className="h-auto w-full max-w-[300px]" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden>
      <rect x="10" y="10" width="280" height="240" />
      <rect x="14" y="14" width="272" height="232" strokeOpacity=".4" />
      <path d={`M10 ${split}H${150 - variant * 6}M${150 - variant * 6} 10V${split}`} />
      <path d={`M${210 - variant * 4} 10V100H290`} />
      <path d="M210 160h80M250 160v90" strokeOpacity=".7" />
      <circle cx="235" cy="60" r="16" strokeOpacity=".5" />
      <rect x="40" y={split + 30} width="70" height="44" rx="4" strokeOpacity=".5" />
      <path d={`M${150 - variant * 6} ${split - 40}a40 40 0 0 1 40 40`} strokeOpacity=".5" />
      <text x="60" y="60" fill="currentColor" stroke="none" fontSize="9">
        {(14 + variant * 3.2).toFixed(2)}
      </text>
      <text x="230" y="135" fill="currentColor" stroke="none" fontSize="9">
        {(5 + variant * 0.8).toFixed(2)}
      </text>
      <text x="90" y={split + 100} fill="currentColor" stroke="none" fontSize="9">
        {(19.5 + variant * 4).toFixed(2)}
      </text>
    </svg>
  );
}

export function Apartments() {
  const [tab, setTab] = useState(0);
  const current = apartments.tabs[tab];

  return (
    <Section id="apartments" theme="dark" themeLeft="dark" className="md:h-svh md:min-h-[680px]">
      <div className="flex h-full flex-col-reverse md:flex-row">
        <div className="flex flex-col px-g pt-10 pb-g md:w-[var(--col)] md:pt-[130px]">
          <p className="t-tiny max-w-[360px] text-white/80">{apartments.text}</p>
          <div className="t-tiny mt-8 flex flex-wrap gap-x-4 gap-y-2 border-b border-white/20 pb-2" role="tablist">
            {apartments.tabs.map((t, i) => (
              <button
                key={t.label}
                type="button"
                role="tab"
                aria-selected={i === tab}
                onClick={() => setTab(i)}
                className={cn("transition-colors duration-400 ease-lux", i === tab ? "text-bronze" : "hover:text-white/60")}
              >
                {t.label}
              </button>
            ))}
          </div>
          <p key={current.label} className="t-h2 mt-5 animate-[fadeUp_.8s_var(--ease-lux)]">
            {current.area}
            <span className="ml-1 align-top text-[0.45em]">M²</span>
          </p>
          <div key={`plan-${tab}`} className="mt-8 animate-[fadeUp_.8s_var(--ease-lux)] md:mt-auto md:mb-auto">
            <Plan variant={tab} />
          </div>
          <p className="t-tiny mt-8">
            <span className="text-bronze">{apartments.conditionsLabel}</span>
            <br />
            {apartments.conditions}
          </p>
        </div>
        <div className="relative aspect-[3/4] flex-1 md:aspect-auto">
          <Parallax className="absolute inset-0" travel={15}>
            <Img src={apartments.image} sizes="(min-width: 768px) 67vw, 100vw" className="object-[50%_25%]" />
          </Parallax>
          <Reveal as="h2" type="chars" className="t-h2 absolute right-g bottom-g text-right">
            <Lines lines={apartments.title} />
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
