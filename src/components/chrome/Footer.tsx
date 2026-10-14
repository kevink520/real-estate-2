"use client";

import { useEffect, useRef, useState } from "react";
import { brand, contact, footer, nav } from "@/content/site";
import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";
import { useApp } from "@/components/providers/AppProvider";
import { Magnetic } from "@/components/motion/Magnetic";
import { Wordmark } from "./Wordmark";

/**
 * Curtain footer: fixed beneath <main>, uncovered as the page lifts away.
 * Its content drifts up from below and the giant wordmark rises letter by letter.
 */
export function Footer() {
  const { scrollTo, setEnquiryOpen } = useApp();
  const root = useRef<HTMLElement>(null);
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: "Europe/Paris" });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 15000);
    return () => clearInterval(id);
  }, []);

  useGSAP(
    () => {
      const main = document.querySelector("main");
      if (!main || prefersReducedMotion()) return;
      const st = { trigger: main, start: "bottom bottom", end: "bottom 15%", scrub: true };
      gsap.fromTo("[data-footer-inner]", { yPercent: -28 }, { yPercent: 0, ease: "none", scrollTrigger: st });
      gsap.fromTo("[data-footer-word] [data-letter]", { yPercent: 115 }, { yPercent: 0, ease: "none", stagger: 0.08, scrollTrigger: { ...st, start: "bottom 70%" } });
    },
    { scope: root },
  );

  return (
    <footer ref={root} className="scope-noir fixed inset-x-0 bottom-0 z-0 h-[86svh] overflow-hidden bg-noir text-bone">
      <div data-footer-inner className="flex h-full flex-col justify-between px-g pt-[12svh] pb-g">
        <div className="grid-12 gap-y-10">
          <div className="col-span-12 md:col-span-6">
            <p className="t-h2">
              Come and see
              <br />
              <em>the light.</em>
            </p>
            <Magnetic className="mt-8">
              <button
                type="button"
                onClick={() => setEnquiryOpen(true)}
                className="t-mono rounded-full border border-bone/40 px-6 py-4 transition-colors duration-500 hover:border-copper hover:bg-copper"
              >
                {brand.cta} →
              </button>
            </Magnetic>
          </div>
          <ul className="t-mono col-span-6 space-y-2 md:col-span-2 md:col-start-8">
            {nav.map((n) => (
              <li key={n.href}>
                <a
                  href={n.href}
                  className="link-line"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo(n.href);
                  }}
                >
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="t-mono col-span-6 space-y-6 md:col-span-3">
            <p>
              {contact.address[0]}
              <br />
              <span className="text-dim">{contact.address[1]}</span>
            </p>
            <p>
              {contact.phone}
              <br />
              {contact.email}
            </p>
            <p className="text-dim">
              Paris <span className="tabular-nums text-bone">{time ?? "--:--"}</span>
            </p>
          </div>
        </div>

        <div>
          <div data-footer-word className="text-copper">
            <Wordmark />
          </div>
          <div className="t-mono mt-5 flex flex-wrap justify-between gap-2 text-dim">
            <span>{footer.copyright}</span>
            <span>{footer.credit}</span>
            <button type="button" onClick={() => scrollTo(0)} className="link-line text-bone">
              Back to top ↑
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
