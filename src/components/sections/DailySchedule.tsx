"use client";

import { useState } from "react";
import { schedule } from "@/content/site";
import { cn } from "@/lib/cn";
import { Arrow } from "@/components/ui/Arrow";
import { Img } from "@/components/ui/Img";
import { Section } from "@/components/ui/Section";

/** Carousel with a large dial: image left third, time on the arc, copy bottom-right. */
export function DailySchedule() {
  const [index, setIndex] = useState(0);
  const count = schedule.items.length;
  const go = (dir: 1 | -1) => setIndex((i) => (i + dir + count) % count);
  const item = schedule.items[index];
  const angle = -38 + (index / (count - 1)) * 76; // the dot travels along the visible arc

  return (
    <Section theme="dark" themeLeft="dark" className="md:h-svh md:min-h-[620px]">
      <h2 className="sr-only">{schedule.label}</h2>
      <div className="flex h-full flex-col md:flex-row">
        <div className="relative aspect-[4/5] overflow-hidden md:aspect-auto md:h-full md:w-[var(--col)]">
          {schedule.items.map((it, i) => (
            <div key={it.time} className={cn("absolute inset-0 transition-[opacity,transform] duration-1200 ease-lux", i === index ? "scale-100 opacity-100" : "scale-105 opacity-0")}>
              <Img src={it.image} sizes="(min-width: 768px) 34vw, 100vw" />
            </div>
          ))}
        </div>

        <div
          data-cursor="arrows"
          className="relative min-h-[420px] flex-1 overflow-hidden"
          onClick={(e) => {
            if (!window.matchMedia("(hover: hover)").matches) return;
            const r = e.currentTarget.getBoundingClientRect();
            go(e.clientX > r.left + r.width / 2 ? 1 : -1);
          }}
        >
          {/* Dial: a circle centred on the column edge, so only its right arc shows. */}
          <svg className="absolute top-1/2 left-0 h-[150%] -translate-x-1/2 -translate-y-1/2 md:h-[130%]" viewBox="0 0 200 200" aria-hidden>
            <circle cx="100" cy="100" r="99.5" fill="none" stroke="rgba(255,255,255,.25)" strokeWidth=".3" />
            <g style={{ transform: `rotate(${angle}deg)`, transformOrigin: "100px 100px", transition: "transform 1.2s cubic-bezier(.7,0,.3,1)" }}>
              <circle cx="199.5" cy="100" r="1.2" fill="#fff" />
            </g>
          </svg>
          <div className="t-lead absolute top-1/2 left-[calc(35%+var(--gutter))] -translate-y-1/2 md:left-[26%]">
            {schedule.items.map((it, i) => (
              <span key={it.time} className={cn("absolute top-0 left-0 transition-[opacity,transform] duration-800 ease-lux", i === index ? "opacity-100" : "translate-y-3 opacity-0")}>
                {it.time}
              </span>
            ))}
            <span className="invisible">00:00</span>
          </div>
          <div className="absolute top-1/2 right-g flex -translate-y-1/2 gap-5">
            <button type="button" aria-label="Previous" onClick={(e) => (e.stopPropagation(), go(-1))} className="transition-opacity hover:opacity-50">
              <Arrow dir="left" className="w-8" />
            </button>
            <button type="button" aria-label="Next" onClick={(e) => (e.stopPropagation(), go(1))} className="transition-opacity hover:opacity-50">
              <Arrow dir="right" className="w-8" />
            </button>
          </div>
          <p key={item.time} className="t-tiny absolute right-g bottom-g left-[35%] animate-[fadeUp_1.2s_var(--ease-lux)] md:left-[26%] md:max-w-[300px]">
            {item.text}
          </p>
        </div>
      </div>
    </Section>
  );
}
