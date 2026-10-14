"use client";

import { useEffect, useRef, useState } from "react";
import { residences } from "@/content/site";
import { gsap, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/cn";
import { useApp } from "@/components/providers/AppProvider";

/** Private-viewing request drawer. Front-end only: nothing is sent anywhere. */
export function EnquiryDrawer() {
  const { enquiryOpen, setEnquiryOpen } = useApp();
  const root = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);
  const [sent, setSent] = useState(false);

  useGSAP(
    () => {
      tl.current = gsap
        .timeline({ paused: true, defaults: { ease: "expo" } })
        .set(root.current, { visibility: "visible" })
        .fromTo("[data-veil]", { opacity: 0 }, { opacity: 1, duration: 0.8 })
        .fromTo("[data-panel]", { xPercent: 100 }, { xPercent: 0, duration: 1.1 }, 0)
        .fromTo("[data-field]", { y: 30, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 1, stagger: 0.05 }, 0.25);
    },
    { scope: root },
  );

  useEffect(() => {
    if (!tl.current) return;
    if (enquiryOpen) {
      tl.current.timeScale(1).play();
      setTimeout(() => root.current?.querySelector<HTMLElement>("input")?.focus({ preventScroll: true }), 500);
    } else {
      tl.current.timeScale(1.6).reverse();
      setTimeout(() => setSent(false), 800);
    }
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setEnquiryOpen(false);
    if (enquiryOpen) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [enquiryOpen, setEnquiryOpen]);

  const field = "w-full border-b border-line bg-transparent py-3 t-lead outline-none placeholder:text-dim focus:border-copper transition-colors";

  return (
    <div ref={root} className="scope-noir invisible fixed inset-0 z-[85]" aria-hidden={!enquiryOpen} role="dialog" aria-label="Arrange a private viewing">
      <div data-veil className="absolute inset-0 bg-noir/60 backdrop-blur-sm" onClick={() => setEnquiryOpen(false)} />
      <div data-panel className="absolute inset-y-0 right-0 flex w-full flex-col overflow-y-auto bg-noir-2 px-g pt-g pb-g text-bone md:w-[min(560px,42vw)] md:px-10">
        <div data-field className="t-mono flex items-center justify-between">
          <span>Private viewing</span>
          <button type="button" onClick={() => setEnquiryOpen(false)} className="link-line" tabIndex={enquiryOpen ? 0 : -1}>
            Close ✕
          </button>
        </div>
        {sent ? (
          <div className="flex flex-1 flex-col justify-center">
            <p className="t-h2">
              Thank you.
              <br />
              <em>We’ll be in touch.</em>
            </p>
            <p className="t-body mt-6 max-w-sm text-dim">This is a concept site, so your details went nowhere — but in a real sales gallery, a host would call within the day.</p>
          </div>
        ) : (
          <form
            className="mt-16 flex flex-1 flex-col gap-6"
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
          >
            <h2 data-field className="t-h2 mb-6">
              Arrange a<br />
              <em>private</em> viewing.
            </h2>
            <label data-field className="block">
              <span className="t-mono text-dim">Name</span>
              <input required name="name" autoComplete="name" className={field} tabIndex={enquiryOpen ? 0 : -1} />
            </label>
            <label data-field className="block">
              <span className="t-mono text-dim">Email</span>
              <input required type="email" name="email" autoComplete="email" className={field} tabIndex={enquiryOpen ? 0 : -1} />
            </label>
            <fieldset data-field>
              <legend className="t-mono mb-3 text-dim">Residence</legend>
              <div className="flex flex-wrap gap-2">
                {residences.plans.map((p, i) => (
                  <label key={p.label} className="t-mono cursor-pointer">
                    <input type="radio" name="residence" value={p.label} defaultChecked={i === 2} className="peer sr-only" tabIndex={enquiryOpen ? 0 : -1} />
                    <span className="block rounded-full border border-line px-4 py-2 transition-colors duration-300 peer-checked:border-bone peer-checked:bg-bone peer-checked:text-noir peer-focus-visible:outline peer-focus-visible:outline-copper">
                      {p.label}
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>
            <div data-field className="mt-auto pt-8">
              <button
                type="submit"
                tabIndex={enquiryOpen ? 0 : -1}
                className={cn("t-mono w-full rounded-full bg-copper py-5 text-bone transition-colors duration-500 hover:bg-copper-2")}
              >
                Request a viewing →
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
