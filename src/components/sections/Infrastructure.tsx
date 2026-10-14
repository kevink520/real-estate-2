import { neighbourhood } from "@/content/site";
import { Marquee } from "@/components/motion/Marquee";
import { Parallax } from "@/components/motion/Parallax";
import { Lines, Reveal } from "@/components/motion/Reveal";
import { Rule } from "@/components/motion/Rule";
import { Img } from "@/components/ui/Img";
import { Label } from "@/components/ui/Label";
import { Section } from "@/components/ui/Section";

/** Neighbourhood: a velocity marquee of everything downstairs, the street, and three addresses. */
export function Infrastructure() {
  return (
    <Section id="neighbourhood" theme="noir" chapter="07" className="overflow-hidden py-sec">
      <div className="px-g">
        <Rule />
        <Label n="07" className="mt-6">
          {neighbourhood.label}
        </Label>
      </div>

      <Marquee className="mt-[8vh] border-y border-line py-6">
        {neighbourhood.marquee.map((w, i) => (
          <span key={i} className="font-display flex items-center text-[clamp(56px,9vw,168px)] leading-none tracking-[-0.04em]">
            <span className={i % 2 ? "serif-em" : ""}>{w}</span>
            <span className="mx-[0.35em] text-[0.4em] text-copper">✦</span>
          </span>
        ))}
      </Marquee>
      <h2 className="sr-only">{neighbourhood.marquee.join(", ")}</h2>

      <div className="grid-12 mt-[12vh] items-end gap-y-10 px-g">
        <Reveal as="h3" className="t-h1 col-span-12 md:col-span-6">
          <Lines lines={neighbourhood.title} />
        </Reveal>
        <Parallax className="grade col-span-12 aspect-[16/10] md:col-span-6" travel={24}>
          <Img src={neighbourhood.street} sizes="(min-width: 768px) 50vw, 100vw" alt="The street outside N°7" />
        </Parallax>
      </div>

      <ul className="grid-12 mt-[10vh] gap-y-12 px-g">
        {neighbourhood.items.map((it, i) => (
          <li key={it.title} className="group col-span-12 md:col-span-4">
            <div className="grade relative aspect-[4/5] overflow-hidden">
              <Img src={it.image} sizes="(min-width: 768px) 33vw, 100vw" alt={it.title} className="transition-transform duration-[1.6s] ease-expo group-hover:scale-[1.06]" />
            </div>
            <div className="mt-5 flex items-baseline justify-between border-t border-line pt-4">
              <h4 className="t-h3">{it.title}</h4>
              <span className="t-mono text-copper">0{i + 1}</span>
            </div>
            <p className="t-body mt-2 text-dim">{it.text}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
