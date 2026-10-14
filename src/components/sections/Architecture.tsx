import { architecture } from "@/content/site";
import { GLImage } from "@/components/gl/GLImage";
import { Parallax } from "@/components/motion/Parallax";
import { Lines, Reveal } from "@/components/motion/Reveal";
import { Rule } from "@/components/motion/Rule";
import { Img } from "@/components/ui/Img";
import { Label } from "@/components/ui/Label";
import { Section } from "@/components/ui/Section";

/** Editorial spread: three images on different parallax depths, a colophon of materials, then the lobby full-bleed. */
export function Architecture() {
  return (
    <Section id="architecture" theme="bone" chapter="04" className="py-sec">
      <div className="px-g">
        <Rule />
        <div className="grid-12 mt-6 gap-y-10">
          <Label n="04" className="col-span-12 md:col-span-3">
            {architecture.label}
          </Label>
          <Reveal as="h2" type="chars" className="t-display em-copper col-span-12 md:col-span-9">
            <Lines lines={architecture.title} />
          </Reveal>
        </div>

        <div className="grid-12 mt-[12vh] gap-y-12">
          <Parallax className="col-span-12 aspect-[4/5] md:col-span-6 md:row-span-2" travel={22}>
            <Img src={architecture.facade} sizes="(min-width: 768px) 50vw, 100vw" alt="Limestone facade with bronze fins" />
          </Parallax>

          <div className="col-span-12 md:col-span-5 md:col-start-8">
            <Reveal className="t-lead">{architecture.text}</Reveal>
            <dl className="t-mono mt-12">
              {architecture.colophon.map(([k, v]) => (
                <div key={k} className="grid grid-cols-[12ch_1fr] border-t border-line py-3">
                  <dt className="text-dim">{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>
          </div>

          <Parallax className="col-span-8 col-start-5 aspect-[3/4] md:col-span-4 md:col-start-9 md:mt-[10vh]" travel={34}>
            <Img src={architecture.stair} sizes="(min-width: 768px) 33vw, 66vw" alt="Spiral stair in plaster and travertine" />
          </Parallax>
        </div>

        <div className="grid-12 mt-[10vh] items-end gap-y-8">
          <Parallax className="col-span-10 aspect-square md:col-span-4 md:col-start-3" travel={14}>
            <Img src={architecture.materials} sizes="(min-width: 768px) 33vw, 80vw" alt="Material samples: travertine, marble, bronze, oak, linen" />
          </Parallax>
          <p className="t-h3 col-span-12 md:col-span-4 md:col-start-8">
            Every finish was chosen <em>to age,</em> not to date.
          </p>
        </div>
      </div>

      <figure className="mt-[16vh]">
        <GLImage srcs={[architecture.lobby]} alt="The double-height lobby" parallax={0.08} sizes="100vw" className="h-[62vw] max-h-[110vh] md:h-[56vw]" />
        <figcaption className="t-mono mt-4 px-g text-dim">{architecture.lobbyCaption}</figcaption>
      </figure>
    </Section>
  );
}
