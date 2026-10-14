import { park } from "@/content/site";
import { Lines, Reveal } from "@/components/motion/Reveal";
import { Parallax } from "@/components/motion/Parallax";
import { Img } from "@/components/ui/Img";
import { Section } from "@/components/ui/Section";

export function Park() {
  return (
    <Section theme="light" className="pb-g">
      <Reveal className="t-tiny px-g pt-[120px] md:max-w-[460px] md:pt-[150px]">{park.intro}</Reveal>
      <Reveal as="h2" type="chars" className="t-h2 mt-16 px-g text-right md:mt-[80px]">
        <Lines lines={park.title} />
      </Reveal>
      <div className="mt-6 grid grid-cols-[1fr_2fr] items-start gap-[5px] px-g md:ml-[11vw] md:grid-cols-[300px_600px] md:pl-0">
        <Parallax className="aspect-square md:h-[300px]">
          <Img src={park.small} sizes="300px" />
        </Parallax>
        <Parallax className="aspect-[6/5] md:h-[520px] md:aspect-auto">
          <Img src={park.large} sizes="(min-width: 768px) 600px, 66vw" />
        </Parallax>
      </div>
      <Reveal className="t-lead mt-6 px-g md:ml-[calc(11vw+305px)] md:max-w-[640px] md:px-0">{park.text}</Reveal>
      <Parallax className="mx-g mt-16 aspect-[4/3] md:mt-[100px] md:aspect-[1380/600]" travel={25}>
        <Img src={park.wide} sizes="100vw" />
      </Parallax>
    </Section>
  );
}
