import { lobby } from "@/content/site";
import { Parallax } from "@/components/motion/Parallax";
import { Lines, Reveal } from "@/components/motion/Reveal";
import { Img } from "@/components/ui/Img";
import { Section } from "@/components/ui/Section";

/** A pull quote on arrival, with a small portrait drifting on its own depth. */
export function Lobby() {
  return (
    <Section theme="noir" className="px-g py-sec">
      <div className="grid-12 items-center gap-y-12">
        <div className="relative col-span-12 md:col-span-8">
          <span className="t-h1 absolute -top-[0.15em] -left-[0.05em] text-copper md:-left-[0.42em]" aria-hidden>
            “
          </span>
          <Reveal as="blockquote" className="t-h1 em-copper pl-[0.4em] md:pl-0">
            <Lines lines={lobby.quote} />
          </Reveal>
        </div>
        <div className="col-span-12 md:col-span-3 md:col-start-10">
          <Parallax className="grade aspect-[3/4] w-2/3 md:w-full" travel={30}>
            <Img src={lobby.image} sizes="(min-width: 768px) 25vw, 66vw" alt="A resident crossing the lobby" />
          </Parallax>
          <p className="t-body mt-6 max-w-[320px] text-dim">{lobby.text}</p>
        </div>
      </div>
    </Section>
  );
}
