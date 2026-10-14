import { location } from "@/content/site";
import { Reveal } from "@/components/motion/Reveal";
import { Parallax } from "@/components/motion/Parallax";
import { Img } from "@/components/ui/Img";
import { Section } from "@/components/ui/Section";
import { DragRow } from "@/components/ui/DragRow";

export function Location() {
  return (
    <Section id="location" theme="light" className="pb-g md:pb-[60px]">
      <div className="pt-[90px] md:pt-[90px]">
        <Parallax className="aspect-[16/10] md:ml-[var(--col)] md:aspect-auto md:h-[530px]" travel={22}>
          <Img src={location.image} sizes="(min-width: 768px) 67vw, 100vw" />
        </Parallax>
      </div>
      <p className="t-tiny mt-3 px-g md:ml-[var(--col)] md:px-0 md:pl-0">{location.label}</p>

      <Reveal className="t-lead mt-16 px-g md:mt-[110px] md:mr-[24vw] md:ml-[var(--col)] md:px-0">
        <span className="inline-block w-[22%] md:w-[26%]" />
        {location.text}
      </Reveal>

      <Reveal as="h2" type="chars" className="t-h2 mt-20 px-g text-right md:mt-[110px]">
        {location.title}
      </Reveal>
      <div className="mt-4 border-t border-theme" />

      <DragRow className="mt-g px-g">
        {location.cards.map((card) => (
          <article key={card.title} className="relative h-[220px] w-[78vw] shrink-0 overflow-hidden md:h-[280px] md:w-[420px]">
            <Img src={card.image} sizes="(min-width: 768px) 420px, 78vw" className="transition-transform duration-[1200ms] ease-lux hover:scale-105" />
            <h3 className="t-body pointer-events-none absolute bottom-3 left-3 text-white">{card.title}</h3>
          </article>
        ))}
      </DragRow>
    </Section>
  );
}
