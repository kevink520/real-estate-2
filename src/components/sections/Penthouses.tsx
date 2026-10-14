import { penthouses as p } from "@/content/site";
import { Lines, Reveal } from "@/components/motion/Reveal";
import { Parallax } from "@/components/motion/Parallax";
import { Appear } from "@/components/motion/Appear";
import { Img } from "@/components/ui/Img";
import { Section } from "@/components/ui/Section";

export function Penthouses() {
  return (
    <Section id="penthouses" theme="dark" className="pb-[60px]">
      <div className="relative h-svh min-h-[600px] overflow-hidden">
        <Parallax className="absolute inset-0" travel={20}>
          <Img src={p.hero} />
        </Parallax>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />
        <Reveal className="t-tiny absolute bottom-[120px] left-g max-w-[300px] md:top-[62%] md:bottom-auto md:max-w-[560px]">{p.intro}</Reveal>
        <Reveal as="h2" type="chars" className="t-h2 absolute right-g bottom-[84px] text-right md:bottom-g">
          <Lines lines={p.title} />
        </Reveal>
      </div>

      <div className="relative mt-[5px]">
        <Parallax className="aspect-[4/3] md:ml-[24vw] md:aspect-auto md:h-[62svh] md:w-[52vw]" travel={20}>
          <Img src={p.woman} sizes="(min-width: 768px) 52vw, 100vw" className="object-[55%_30%]" />
        </Parallax>
        <Reveal className="t-lead relative mt-6 px-g md:-mt-[34px] md:max-w-[880px]">{p.text}</Reveal>
      </div>

      <div className="mt-20 grid gap-[5px] px-g md:mt-[120px] md:grid-cols-[440px_1fr_600px] md:items-start">
        {p.stats.map((s, i) => (
          <Appear key={s.value} className={i === 1 ? "md:col-start-3 md:mt-[180px]" : ""}>
            <div className={`relative overflow-hidden ${i === 0 ? "aspect-[4/3]" : "aspect-[10/7]"}`}>
              <Img src={s.image} sizes="(min-width: 768px) 600px, 100vw" />
              <div className="absolute bottom-3 left-3 text-white">
                <p className="t-stat">{s.value}</p>
                <p className="t-tiny mt-1">{s.label}</p>
              </div>
            </div>
          </Appear>
        ))}
      </div>

      <div className="mt-24 md:mt-[140px]">
        <Reveal as="h2" type="chars" className="t-h2 px-g text-right">
          <Lines lines={p.terraceTitle} />
        </Reveal>
        <div className="mt-6 md:flex md:items-end md:gap-g">
          <Parallax className="aspect-[4/3] md:aspect-auto md:h-[440px] md:w-[76vw]" travel={20}>
            <Img src={p.terrace} sizes="(min-width: 768px) 76vw, 100vw" />
          </Parallax>
          <Reveal className="t-tiny mt-6 px-g md:mt-0 md:mb-[180px] md:max-w-[300px] md:px-0 md:pr-g">{p.terraceText}</Reveal>
        </div>
      </div>
    </Section>
  );
}
