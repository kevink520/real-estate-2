"use client";

import { useEffect, useRef, useState } from "react";
import { brand, contact, nav } from "@/content/site";
import { gsap, isFinePointer, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/cn";
import { useApp } from "@/components/providers/AppProvider";
import { RollText } from "@/components/motion/RollText";
import { Img } from "@/components/ui/Img";

/**
 * Full-screen noir menu. The panel wipes down from the top, rows rise in
 * sequence, and hovering a destination floats its photograph beside the pointer.
 */
export function Menu() {
  const { menuOpen, setMenuOpen, setEnquiryOpen, scrollTo } = useApp();
  const root = useRef<HTMLDivElement>(null);
  const preview = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);
  const [hover, setHover] = useState<number | null>(null);

  useGSAP(
    () => {
      tl.current = gsap
        .timeline({ paused: true, defaults: { ease: "expo" } })
        .set(root.current, { visibility: "visible" })
        .fromTo(root.current, { clipPath: "inset(0% 0% 100% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1, ease: "lux" })
        .fromTo("[data-menu-row]", { yPercent: 110 }, { yPercent: 0, duration: 1.3, stagger: 0.055 }, 0.35)
        .fromTo("[data-menu-rule]", { scaleX: 0 }, { scaleX: 1, duration: 1.4, stagger: 0.055 }, 0.3)
        .fromTo("[data-menu-meta]", { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 1, stagger: 0.06 }, 0.6);
    },
    { scope: root },
  );

  useEffect(() => {
    if (!tl.current) return;
    if (menuOpen) {
      tl.current.timeScale(1).play();
      const first = root.current?.querySelector<HTMLElement>("[data-menu-row]");
      setTimeout(() => first?.focus({ preventScroll: true }), 400);
    } else {
      tl.current.timeScale(1.8).reverse();
    }
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    if (menuOpen) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen, setMenuOpen]);

  // Floating preview follows the pointer with a little lag.
  useEffect(() => {
    const el = preview.current;
    if (!el || !isFinePointer()) return;
    const x = gsap.quickTo(el, "x", { duration: 0.9, ease: "expo" });
    const y = gsap.quickTo(el, "y", { duration: 0.9, ease: "expo" });
    const move = (e: PointerEvent) => {
      x(e.clientX + 40);
      y(e.clientY - el.offsetHeight / 2);
    };
    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, []);

  const go = (href: string) => {
    setMenuOpen(false);
    setTimeout(() => scrollTo(href), 300);
  };

  return (
    <div
      ref={root}
      className="scope-noir invisible fixed inset-0 z-[46] flex flex-col bg-noir text-bone"
      style={{ clipPath: "inset(0% 0% 100% 0%)" }}
      aria-hidden={!menuOpen}
      role="dialog"
      aria-label="Menu"
    >
      <nav className="flex flex-1 flex-col justify-center px-g pt-24">
        <ul onPointerLeave={() => setHover(null)}>
          {nav.map((item, i) => (
            <li key={item.href} className="relative overflow-hidden">
              <span data-menu-rule className="absolute inset-x-0 top-0 h-px origin-left bg-line" aria-hidden />
              <a
                data-menu-row
                href={item.href}
                tabIndex={menuOpen ? 0 : -1}
                onPointerEnter={() => setHover(i)}
                onFocus={() => setHover(i)}
                onClick={(e) => {
                  e.preventDefault();
                  go(item.href);
                }}
                className={cn(
                  "group grid grid-cols-[3ch_1fr_auto] items-baseline gap-4 py-2 transition-opacity duration-500 md:grid-cols-[8ch_1fr_auto] md:py-1.5",
                  hover !== null && hover !== i && "opacity-30",
                )}
              >
                <span className="t-mono text-copper">0{i + 1}</span>
                <span className="font-display text-[clamp(40px,7vw,112px)] leading-[1] tracking-[-0.04em]">
                  <RollText>{item.label}</RollText>
                </span>
                <span className="t-mono hidden translate-x-4 opacity-0 transition-[opacity,transform] duration-500 ease-expo group-hover:translate-x-0 group-hover:opacity-100 md:block">
                  Go →
                </span>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="t-mono grid grid-cols-2 gap-6 border-t border-line px-g pt-6 pb-g md:grid-cols-4">
        <p data-menu-meta>
          {contact.address[0]}
          <br />
          <span className="text-dim">{contact.address[1]}</span>
        </p>
        <p data-menu-meta>
          <a href={`tel:${contact.phone.replace(/\s/g, "")}`} className="link-line">{contact.phone}</a>
          <br />
          <a href={`mailto:${contact.email}`} className="link-line">{contact.email}</a>
        </p>
        <p data-menu-meta className="flex gap-4">
          {contact.social.map((s) => (
            <a key={s} href="#" className="link-line" onClick={(e) => e.preventDefault()}>
              {s}
            </a>
          ))}
        </p>
        <p data-menu-meta className="md:text-right">
          <button
            type="button"
            tabIndex={menuOpen ? 0 : -1}
            onClick={() => {
              setMenuOpen(false);
              setEnquiryOpen(true);
            }}
            className="link-line is-on text-copper-2"
          >
            {brand.cta} →
          </button>
        </p>
      </div>

      <div ref={preview} className="pointer-events-none fixed top-0 left-0 z-10 hidden h-[34vh] w-[26vh] md:block" aria-hidden>
        {nav.map((item, i) => (
          <div
            key={item.href}
            className="absolute inset-0 overflow-hidden transition-[clip-path] duration-700 ease-expo"
            style={{ clipPath: hover === i ? "inset(0% 0% 0% 0%)" : "inset(100% 0% 0% 0%)" }}
          >
            <div className={cn("absolute inset-0 transition-transform duration-1000 ease-expo", hover === i ? "scale-100" : "scale-125")}>
              <Img src={item.image} sizes="30vh" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
