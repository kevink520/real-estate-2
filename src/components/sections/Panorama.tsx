import { panorama } from "@/content/site";
import { Lines, Reveal } from "@/components/motion/Reveal";
import { Parallax } from "@/components/motion/Parallax";
import { Img } from "@/components/ui/Img";
import { Section } from "@/components/ui/Section";

export function Panorama() {
  return (
    <Section theme="dark" className="h-[150svh] min-h-[900px] overflow-hidden">
      <Parallax className="absolute inset-0" travel={25}>
        <Img src={panorama.image} className="object-[50%_70%]" />
      </Parallax>
      <div className="absolute inset-0 bg-gradient-to-b from-[#0b1426]/70 via-transparent to-transparent" />
      <div className="relative px-g pt-[28svh]">
        <div className="border-t border-white/20 pt-3 md:flex md:gap-0">
          <p className="t-tiny md:w-[calc(var(--col)+11vw)]">
            <Lines lines={panorama.label} />
          </p>
          <Reveal className="t-lead mt-6 max-w-[620px] md:mt-[40px]">{panorama.text}</Reveal>
        </div>
      </div>
    </Section>
  );
}
