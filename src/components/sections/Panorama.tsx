"use client";

import { useRef } from "react";
import { panorama } from "@/content/site";
import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";
import { GLImage, type GLControls } from "@/components/gl/GLImage";
import { Rich } from "@/components/motion/Reveal";
import { Section } from "@/components/ui/Section";

/**
 * Zoom-through: a small window into the panorama widens to the full viewport
 * while its two flanking words part; the image itself eases from 1.3× to 1×.
 */
export function Panorama() {
  const root = useRef<HTMLDivElement>(null);
  const controls = useRef<GLControls>({ zoom: 1.3 });

  useGSAP(
    () => {
      const reduced = prefersReducedMotion();
      const narrow = window.innerWidth < 768;
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: reduced ? undefined : { trigger: root.current, start: "top top", end: "bottom bottom", scrub: 0.6 },
      });
      if (reduced) {
        gsap.set("[data-window]", { clipPath: "inset(0% 0% 0% 0%)" });
        controls.current.zoom = 1;
        return;
      }
      tl.fromTo(
        "[data-window]",
        { clipPath: narrow ? "inset(32% 12% 32% 12% round 999px)" : "inset(30% 36% 30% 36% round 999px)" },
        { clipPath: "inset(0% 0% 0% 0% round 0px)", duration: 1 },
      )
        .fromTo(controls.current, { zoom: 1.3 }, { zoom: 1, duration: 1 }, 0)
        .fromTo("[data-gl-fallback]", { scale: 1.3 }, { scale: 1, duration: 1 }, 0)
        .to("[data-word='l']", { xPercent: -60, autoAlpha: 0, duration: 0.6 }, 0)
        .to("[data-word='r']", { xPercent: 60, autoAlpha: 0, duration: 0.6 }, 0)
        .from("[data-last] > *", { yPercent: 40, autoAlpha: 0, duration: 0.35, stagger: 0.08 }, 0.7)
        .to({}, { duration: 0.25 });
    },
    { scope: root },
  );

  return (
    <Section theme="noir" className="!bg-noir text-bone">
      <div ref={root} className="relative h-[320vh]">
        <div className="sticky top-0 h-svh overflow-hidden">
          <div data-window className="absolute inset-0" style={{ clipPath: "inset(30% 36% 30% 36% round 999px)" }}>
            <GLImage srcs={[panorama.image]} alt="A living room high above the city at dusk" controls={controls} parallax={0} className="absolute inset-0" />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-noir/70 via-transparent to-transparent" />
          </div>

          <div className="t-h1 pointer-events-none absolute inset-x-g top-1/2 flex -translate-y-1/2 justify-between">
            <span data-word="l">{panorama.left}</span>
            <span data-word="r">
              <Rich text={panorama.right} />
            </span>
          </div>

          <div data-last className="absolute inset-x-g bottom-g grid-12 items-end gap-y-6">
            <p className="t-h1 col-span-12 md:col-span-8">{panorama.last}</p>
            <p className="t-body col-span-12 max-w-[340px] text-bone/80 md:col-span-3 md:col-start-10">{panorama.caption}</p>
          </div>
        </div>
      </div>
    </Section>
  );
}
