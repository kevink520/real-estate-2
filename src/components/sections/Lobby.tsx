import { lobby } from "@/content/site";
import { Lines, Reveal } from "@/components/motion/Reveal";
import { Parallax } from "@/components/motion/Parallax";
import { Img } from "@/components/ui/Img";
import { Section } from "@/components/ui/Section";

export function Lobby() {
  return (
    <Section theme="dark" className="h-svh min-h-[600px] overflow-hidden">
      <Parallax className="absolute inset-0" travel={20}>
        <Img src={lobby.image} className="object-[60%_50%]" />
      </Parallax>
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
      <Reveal className="t-tiny absolute bottom-[110px] left-g max-w-[260px] md:bottom-[90px] md:max-w-[300px]">{lobby.text}</Reveal>
      <Reveal as="h2" type="chars" className="t-h2 absolute right-g bottom-[84px] text-right md:bottom-g">
        <Lines lines={lobby.title} />
      </Reveal>
    </Section>
  );
}
