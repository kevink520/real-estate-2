import { manifesto } from "@/content/site";
import { Odometer } from "@/components/motion/Odometer";
import { Rule } from "@/components/motion/Rule";
import { ScrubWords } from "@/components/motion/ScrubWords";
import { Label } from "@/components/ui/Label";
import { Section } from "@/components/ui/Section";

/** Manifesto: a statement that brightens word by word, then the house in numbers. */
export function About() {
  return (
    <Section id="manifesto" theme="noir" chapter="02" className="px-g py-sec">
      <Rule />
      <div className="grid-12 mt-6 gap-y-10">
        <Label n="02" className="col-span-12 md:col-span-3">
          {manifesto.label}
        </Label>
        <ScrubWords parts={manifesto.parts} className="t-statement col-span-12 md:col-span-9" />
      </div>

      <div className="grid-12 mt-[18vh] gap-y-12">
        <p className="t-mono col-span-12 text-dim md:col-span-3">The house in numbers</p>
        <dl className="col-span-12 grid grid-cols-2 gap-x-g gap-y-12 md:col-span-9 md:grid-cols-4">
          {manifesto.stats.map((s) => (
            <div key={s.label} className="flex flex-col border-t border-line pt-5">
              <dt className="t-mono order-2 mt-4 text-dim">{s.label}</dt>
              <dd className="font-display serif-em text-[clamp(64px,8vw,148px)] leading-none tracking-[-0.05em]">
                <Odometer value={s.value} />
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <a
        href="#residences"
        className="group mt-[14vh] flex flex-col gap-4 border-y border-line py-8 transition-colors duration-700 hover:bg-fg/[0.04] md:flex-row md:items-center md:justify-between md:px-6"
      >
        <span className="t-mono text-copper">{manifesto.offer.label}</span>
        <span className="t-h3">{manifesto.offer.text}</span>
        <span className="t-mono flex items-center gap-3">
          {manifesto.offer.link}
          <span className="inline-block transition-transform duration-700 ease-expo group-hover:translate-x-2">→</span>
        </span>
      </a>
    </Section>
  );
}
