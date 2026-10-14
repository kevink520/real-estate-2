"use client";

import { useState } from "react";
import { place } from "@/content/site";
import { cn } from "@/lib/cn";
import { Lines, Reveal } from "@/components/motion/Reveal";
import { Rule } from "@/components/motion/Rule";
import { Label } from "@/components/ui/Label";
import { Section } from "@/components/ui/Section";
import { PlaceMap } from "./MapArea";

/** Place: headline and copy, then a list of destinations linked to the district map. */
export function Location() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <Section id="place" theme="bone" chapter="03" className="px-g py-sec">
      <Rule />
      <div className="grid-12 mt-6 gap-y-10">
        <Label n="03" className="col-span-12 md:col-span-3">
          {place.label}
        </Label>
        <Reveal as="h2" className="t-h1 col-span-12 md:col-span-9">
          <Lines lines={place.title} />
        </Reveal>
        <Reveal className="t-lead col-span-12 max-w-[520px] md:col-span-5 md:col-start-4 md:mt-8">{place.text}</Reveal>
      </div>

      <div className="grid-12 mt-[14vh] gap-y-12">
        <ol className="col-span-12 self-end md:col-span-5 md:col-start-1" onPointerLeave={() => setActive(null)}>
          {place.places.map((p, i) => (
            <li key={p.name}>
              <button
                type="button"
                onPointerEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onBlur={() => setActive(null)}
                className={cn(
                  "grid w-full grid-cols-[3ch_1fr_auto] items-baseline gap-4 border-t border-line py-5 text-left transition-opacity duration-500",
                  active !== null && active !== i && "opacity-35",
                )}
              >
                <span className="t-mono text-copper">0{i + 1}</span>
                <span className="t-h3">{p.name}</span>
                <span className="t-mono tabular-nums">
                  {p.time} <span className="text-dim">{p.mode}</span>
                </span>
              </button>
            </li>
          ))}
        </ol>
        <div className="col-span-12 md:col-span-6 md:col-start-7">
          <PlaceMap active={active} onActive={setActive} />
        </div>
      </div>
    </Section>
  );
}
