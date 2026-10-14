"use client";

import { useRef } from "react";
import { brand } from "@/content/site";
import { gsap, prefersReducedMotion, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { useApp } from "@/components/providers/AppProvider";

const MIN_HOLD = 1.9;

/** Resolve once fonts and the hero imagery are decoded (capped so a slow image never blocks). */
async function heroReady() {
  const imgs = Array.from(document.querySelectorAll<HTMLImageElement>("[data-hero-media] img"));
  const decode = Promise.all(imgs.map((img) => (img.complete ? Promise.resolve() : img.decode().catch(() => undefined))));
  const timeout = new Promise((r) => setTimeout(r, 5000));
  await Promise.race([Promise.all([document.fonts.ready, decode]), timeout]);
}

/**
 * 1. A mono counter runs to 100 while "n°7" gains weight (wght 100 → 420).
 * 2. The numeral lifts out of its mask; the two noir leaves part to a thin slit,
 *    hold, then open fully (the aperture) while the hero settles from 1.25 to 1.
 * 3. Wordmark letters rise, the headline reveals, chrome fades in.
 */
export function Preloader() {
  const root = useRef<HTMLDivElement>(null);
  const { setIntroStage } = useApp();

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      const q = gsap.utils.selector(el);
      const letters = document.querySelectorAll("header [data-letter]");
      const fades = document.querySelectorAll("[data-intro='fade']");
      const media = document.querySelector("[data-hero-media]");

      if (prefersReducedMotion()) {
        gsap.set(el, { display: "none" });
        setIntroStage("done");
        return;
      }

      gsap.set(letters, { yPercent: 115 });
      gsap.set(fades, { autoAlpha: 0 });
      gsap.set(media, { scale: 1.25 });

      const counter = { v: 0 };
      const num = q("[data-count]")[0];
      const mark = q("[data-mark]")[0];
      const load = gsap.timeline();
      load
        .to(counter, {
          v: 100,
          duration: MIN_HOLD,
          ease: "power2.inOut",
          onUpdate: () => (num.textContent = String(Math.round(counter.v)).padStart(3, "0")),
        })
        .fromTo(mark, { "--w": 100 }, { "--w": 420, duration: MIN_HOLD, ease: "power2.inOut" }, 0)
        .from(q("[data-meta]"), { autoAlpha: 0, y: 12, duration: 1, ease: "expo", stagger: 0.08 }, 0.1)
        .from(mark, { yPercent: 100, duration: 1.4, ease: "expo" }, 0);

      const out = gsap.timeline({ paused: true, defaults: { ease: "lux" } });
      out
        .to(q("[data-meta]"), { autoAlpha: 0, duration: 0.5, ease: "power2.out" })
        .to(mark, { yPercent: -135, duration: 0.9, ease: "expo.in" }, 0)
        .to(q("[data-leaf='l']"), { xPercent: -96, duration: 0.9, ease: "expo.out" }, 0.75)
        .to(q("[data-leaf='r']"), { xPercent: 96, duration: 0.9, ease: "expo.out" }, 0.75)
        .to(q("[data-leaf='l']"), { xPercent: -100.5, duration: 1.4 }, 1.55)
        .to(q("[data-leaf='r']"), { xPercent: 100.5, duration: 1.4 }, 1.55)
        .to(media, { scale: 1, duration: 2.6, ease: "expo" }, 0.85)
        .set(el, { display: "none" }, 2.95)
        .to(letters, { yPercent: 0, duration: 1.5, ease: "expo", stagger: 0.07 }, 1.9)
        .add(() => setIntroStage("reveal"), 2.0)
        .to(fades, { autoAlpha: 1, duration: 1.2, ease: "power2.out" }, 2.4)
        .add(() => {
          setIntroStage("done");
          ScrollTrigger.refresh();
        });

      let cancelled = false;
      Promise.all([heroReady(), new Promise((r) => load.eventCallback("onComplete", r))]).then(() => {
        if (!cancelled) out.play();
      });
      return () => {
        cancelled = true;
        load.kill();
        out.kill();
      };
    },
    { scope: root },
  );

  return (
    <div ref={root} className="fixed inset-0 z-[80] text-bone" aria-hidden>
      <div data-leaf="l" className="absolute inset-y-0 left-0 w-1/2 bg-noir" />
      <div data-leaf="r" className="absolute inset-y-0 right-0 w-1/2 bg-noir" />

      <div className="absolute inset-0 grid place-items-center">
        <span className="block overflow-hidden px-[0.05em] pt-[0.04em] pb-[0.14em] text-[34vw] leading-[0.8] md:text-[22vw]">
          <span
            data-mark
            className="font-display serif-em block"
            style={{ fontVariationSettings: '"wght" var(--w, 100), "opsz" 144, "SOFT" 100, "WONK" 1' } as React.CSSProperties}
          >
            n°7
          </span>
        </span>
      </div>

      <div className="t-mono absolute inset-x-g top-g flex justify-between">
        <span data-meta>{brand.name}</span>
        <span data-meta className="hidden md:block">{brand.tagline}</span>
      </div>
      <div className="t-mono absolute inset-x-g bottom-g flex items-end justify-between">
        <span data-meta>
          <span data-count className="font-display not-italic text-[56px] leading-none tracking-[-0.04em] md:text-[88px]">
            000
          </span>
        </span>
        <span data-meta className="text-right">
          {brand.coords[0]}
          <br />
          {brand.coords[1]}
        </span>
      </div>
    </div>
  );
}
