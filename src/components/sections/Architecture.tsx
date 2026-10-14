import { architecture as a } from "@/content/site";
import { Lines, Reveal } from "@/components/motion/Reveal";
import { Parallax } from "@/components/motion/Parallax";
import { Appear } from "@/components/motion/Appear";
import { Img } from "@/components/ui/Img";
import { Section } from "@/components/ui/Section";

export function Architecture() {
  return (
    <Section id="architecture" theme="light" className="pb-g">
      <h2 className="sr-only">{a.label}</h2>
      <Reveal className="t-lead px-g pt-[160px] md:ml-[calc(var(--col)-8vw)] md:max-w-[560px] md:px-0 md:pt-[200px]">{a.text}</Reveal>

      <Parallax className="mx-g mt-10 aspect-[4/3] md:mt-[20px] md:aspect-[1380/560]" travel={25}>
        <Img src={a.wide} sizes="100vw" />
      </Parallax>

      <Reveal as="h3" className="t-lead mt-4 px-g md:mt-5">
        <Lines lines={a.lightingTitle} />
      </Reveal>

      <div className="mt-12 grid grid-cols-[1fr_2fr] items-start gap-[5px] px-g md:mt-[60px] md:ml-[var(--col)] md:grid-cols-[300px_1fr] md:pl-0">
        <Parallax className="mt-[35%] aspect-[3/4] md:mt-[90px] md:aspect-auto md:h-[240px]">
          <Img src={a.lightingSmall} sizes="300px" />
        </Parallax>
        <Parallax className="aspect-[4/5] md:aspect-auto md:h-[440px]">
          <Img src={a.lightingLarge} sizes="(min-width: 768px) 50vw, 66vw" />
        </Parallax>
      </div>
      <Reveal as="h3" className="t-lead mt-4 px-g text-right">
        <Lines lines={a.materialsTitle} />
      </Reveal>

      <Appear className="relative mx-auto mt-16 aspect-square w-[80vw] md:mt-10 md:w-[440px]">
        <Img src={a.materials} sizes="440px" className="object-contain mix-blend-multiply" />
      </Appear>

      <Reveal className="t-tiny mt-10 px-g md:mt-[60px] md:max-w-[520px]">{a.materialsText}</Reveal>
      <div className="mt-5 grid grid-cols-2 gap-[5px] px-g">
        <Parallax className="aspect-[3/4] md:aspect-[690/560]">
          <Img src={a.interiorA} sizes="50vw" />
        </Parallax>
        <Parallax className="aspect-[3/4] md:aspect-[690/560]">
          <Img src={a.interiorB} sizes="50vw" />
        </Parallax>
      </div>
    </Section>
  );
}
