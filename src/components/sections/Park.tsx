import { park } from "@/content/site";
import { Parallax } from "@/components/motion/Parallax";
import { Lines, Reveal } from "@/components/motion/Reveal";
import { Img } from "@/components/ui/Img";
import { Section } from "@/components/ui/Section";

/** The park, on copper: three photographs moving at three different depths around the headline. */
export function Park() {
  return (
    <Section id="park" theme="copper" className="overflow-hidden px-g py-sec">
      <div className="grid-12 relative gap-y-10">
        <Parallax className="grade col-span-7 aspect-[3/4] md:col-span-3 md:col-start-1 md:mt-[18vh]" travel={40}>
          <Img src={park.small} sizes="(min-width: 768px) 25vw, 60vw" alt="Sculpture in the park" />
        </Parallax>
        <div className="col-span-12 md:col-span-5 md:col-start-5">
          <Reveal as="h2" className="t-h1">
            <Lines lines={park.title} />
          </Reveal>
          <Reveal className="t-lead mt-10 max-w-[440px]">{park.text}</Reveal>
        </div>
        <Parallax className="grade col-span-9 col-start-4 aspect-[4/5] md:col-span-3 md:col-start-10 md:-mt-[10vh]" travel={16}>
          <Img src={park.large} sizes="(min-width: 768px) 25vw, 75vw" alt="The fountain" />
        </Parallax>
      </div>
      <Parallax className="grade mt-[12vh] aspect-[16/9] md:mx-[8vw] md:aspect-[21/9]" travel={28}>
        <Img src={park.wide} sizes="90vw" alt="The courtyard garden" />
      </Parallax>
    </Section>
  );
}
