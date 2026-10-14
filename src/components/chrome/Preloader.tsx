"use client";

import { useRef } from "react";
import { brand } from "@/content/site";
import { gsap, prefersReducedMotion, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { useApp } from "@/components/providers/AppProvider";
import { Wordmark } from "./Wordmark";

const MIN_HOLD = 1400;

/** Resolve once fonts and the hero imagery are decoded (capped so a slow image never blocks). */
async function heroReady() {
  const imgs = Array.from(document.querySelectorAll<HTMLImageElement>("[data-hero-media] img"));
  const decode = Promise.all(imgs.map((img) => (img.complete ? Promise.resolve() : img.decode().catch(() => undefined))));
  const timeout = new Promise((r) => setTimeout(r, 4000));
  await Promise.race([Promise.all([document.fonts.ready, decode]), timeout]);
}

/**
 * Reference sequence (frames captured at 100ms):
 * 1. black screen + outlined card;
 * 2. the black panel's right edge wipes left to the hero's ⅓ column (1.6s, easeOut) while the card rides along;
 * 3. the cutout slides in faster than the background (intro-decor);
 * 4. the bronze wordmark letters rise from their masks;
 * 5. headline lines reveal and the CTA / burger fade in.
 * Below 768px the panel simply fades.
 */
export function Preloader() {
  const root = useRef<HTMLDivElement>(null);
  const card = useRef<HTMLDivElement>(null);
  const { setIntroStage } = useApp();

  useGSAP(() => {
    const el = root.current;
    if (!el) return;
    const letters = document.querySelectorAll("header [data-letter]");
    const fades = document.querySelectorAll("[data-intro='fade']");
    const bg = document.querySelector("[data-hero-bg]");
    const cutout = document.querySelector("[data-hero-cutout]");

    if (prefersReducedMotion()) {
      gsap.set(el, { display: "none" });
      setIntroStage("done");
      return;
    }

    const desktop = window.matchMedia("(min-width: 768px)").matches;
    gsap.set(letters, { yPercent: 110 });
    gsap.set(fades, { autoAlpha: 0 });
    gsap.set(bg, { scale: 1.12 });
    gsap.set(cutout, { xPercent: desktop ? 45 : 0, autoAlpha: desktop ? 1 : 0 });

    const tl = gsap.timeline({ paused: true, defaults: { ease: "lux" } });
    if (desktop) {
      tl.to(el, { clipPath: "inset(0% 66.6667% 0% 0%)", duration: 1.6 })
        .to(card.current, { x: () => -window.innerWidth * 0.62, duration: 1.6 }, 0)
        .to(bg, { scale: 1, duration: 2.2 }, 0)
        .to(cutout, { xPercent: 0, duration: 1.9 }, 0.1)
        .set(el, { display: "none" }, 1.6);
    } else {
      tl.to(card.current, { autoAlpha: 0, duration: 0.6 })
        .to(el, { autoAlpha: 0, duration: 0.9 }, 0.2)
        .to(bg, { scale: 1, duration: 2 }, 0.2)
        .to(cutout, { autoAlpha: 1, duration: 1.2 }, 0.4)
        .set(el, { display: "none" });
    }
    tl.to(letters, { yPercent: 0, duration: 1.2, stagger: 0.06 }, desktop ? 1.35 : 0.8)
      .add(() => setIntroStage("reveal"), desktop ? 1.45 : 0.9)
      .to(fades, { autoAlpha: 1, duration: 1 }, desktop ? 1.8 : 1.2)
      .add(() => {
        setIntroStage("done");
        ScrollTrigger.refresh();
      });

    const started = performance.now();
    let cancelled = false;
    heroReady().then(() => {
      const wait = Math.max(0, MIN_HOLD - (performance.now() - started));
      setTimeout(() => !cancelled && tl.play(), wait);
    });
    return () => {
      cancelled = true;
      tl.kill();
    };
  });

  return (
    <div ref={root} className="fixed inset-0 z-[60] grid place-items-center bg-black" style={{ clipPath: "inset(0% 0% 0% 0%)" }} aria-hidden>
      <div ref={card} className="flex h-[230px] w-[160px] flex-col items-center justify-between border border-white/30 px-3 pt-3 pb-4 text-white">
        <Wordmark className="w-[118px]" />
        <p className="t-tiny text-center text-[7px] leading-[9px]">
          {brand.tagline[0]}
          <br />
          {brand.tagline[1]}
        </p>
      </div>
    </div>
  );
}
