import { about } from "@/content/site";
import { Lines, Reveal } from "@/components/motion/Reveal";
import { Parallax } from "@/components/motion/Parallax";
import { Appear } from "@/components/motion/Appear";
import { Img } from "@/components/ui/Img";
import { Section } from "@/components/ui/Section";

export function About() {
  return (
    <Section id="about" theme="dark" className="h-svh min-h-[560px] overflow-hidden">
      <Parallax className="absolute inset-0" travel={20}>
        <Img src={about.image} />
      </Parallax>
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30" />

      <Reveal as="h2" type="chars" className="t-h2 absolute top-[52%] left-g md:top-[62%]">
        <Lines lines={about.title} />
      </Reveal>

      <Appear className="absolute right-g bottom-[84px] flex gap-0 md:bottom-g">
        <button
          type="button"
          className="t-tiny group flex h-[160px] w-[150px] flex-col justify-between bg-black p-2.5 text-left text-white md:h-[260px] md:w-[210px]"
        >
          <span>{about.video}</span>
          <span className="grid size-10 place-items-center self-center rounded-full border border-white/30 transition-colors duration-400 ease-lux group-hover:bg-white group-hover:text-black">
            <svg viewBox="0 0 8 10" className="ml-0.5 size-2.5" aria-hidden>
              <path d="M0 0l8 5-8 5z" fill="currentColor" />
            </svg>
          </span>
          <span />
        </button>
        <a href="#apartments" className="t-tiny group flex h-[160px] w-[150px] flex-col justify-between bg-white p-2.5 text-black md:h-[260px] md:w-[210px]">
          <span>
            <Lines lines={about.offer.label} />
          </span>
          <span className="t-body self-center text-center">
            <Lines lines={about.offer.title} />
          </span>
          <span className="self-center text-bronze underline underline-offset-4 transition-opacity duration-400 group-hover:opacity-60">
            {about.offer.link}
          </span>
        </a>
      </Appear>
    </Section>
  );
}
