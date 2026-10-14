"use client";

import { useEffect, useRef } from "react";
import { brand } from "@/content/site";
import { cn } from "@/lib/cn";
import { gsap, useGSAP } from "@/lib/gsap";
import { useApp } from "@/components/providers/AppProvider";
import { Wordmark } from "./Wordmark";

/** Collapsed logo width in px (mobile / desktop). */
const SMALL = { base: 104, md: 136 };
const smallScale = (el: HTMLElement) => (window.innerWidth >= 768 ? SMALL.md : SMALL.base) / el.offsetWidth;

export function Header() {
  const { menuOpen, setMenuOpen, setEnquiryOpen, scrollTo } = useApp();
  const logo = useRef<HTMLAnchorElement>(null);

  // The wordmark is laid out full-bleed at the foot of the hero and scrubs up into
  // the header as the first viewport scrolls away (scaling down keeps the glyphs crisp).
  useGSAP(() => {
    const el = logo.current;
    if (!el) return;
    const g = () => parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--gutter")) || 24;
    const bigY = () => window.innerHeight - 2 * g() - el.offsetHeight;
    gsap.fromTo(
      el,
      { scale: 1, y: () => bigY() },
      {
        scale: () => smallScale(el),
        y: 0,
        ease: "none",
        scrollTrigger: { start: 0, end: () => window.innerHeight * 0.85, scrub: 0.4, invalidateOnRefresh: true },
      },
    );
  });

  // With the menu open the logo snaps to its collapsed size wherever the page is.
  useEffect(() => {
    if (menuOpen && logo.current) logo.current.style.setProperty("--logo-small", String(smallScale(logo.current)));
  }, [menuOpen]);

  const close = () => setMenuOpen(false);

  return (
    <header
      className={cn("pointer-events-none fixed inset-x-0 top-0 z-50 px-g pt-g transition-colors duration-700", menuOpen ? "text-bone" : "text-fg")}
    >
      <a
        ref={logo}
        href="#top"
        onClick={(e) => {
          e.preventDefault();
          close();
          scrollTo(0);
        }}
        className={cn(
          "pointer-events-auto relative block w-[calc(100vw-2*var(--gutter))] origin-top-left",
          menuOpen && "header-collapsed",
        )}
        aria-label={`${brand.name} — back to top`}
      >
        <Wordmark />
      </a>

      <div className="absolute top-g right-g flex items-center gap-8">
        <button
          type="button"
          data-intro="fade"
          onClick={() => {
            close();
            setEnquiryOpen(true);
          }}
          className="t-mono link-line pointer-events-auto hidden md:block"
        >
          {brand.cta}
        </button>
        <button
          type="button"
          data-intro="fade"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
          className="group t-mono pointer-events-auto flex items-center gap-3"
        >
          <span className="relative block h-[1.45em] overflow-hidden">
            <span className={cn("block transition-transform duration-700 ease-expo", menuOpen && "-translate-y-full")}>
              <span className="block">Menu</span>
              <span className="block">Close</span>
            </span>
          </span>
          <span className="relative block h-[7px] w-8" aria-hidden>
            <span
              className={cn(
                "absolute inset-x-0 top-0 h-px bg-current transition-transform duration-700 ease-expo",
                menuOpen ? "translate-y-[3px] rotate-[20deg]" : "group-hover:scale-x-75 origin-right",
              )}
            />
            <span
              className={cn(
                "absolute inset-x-0 bottom-0 h-px bg-current transition-transform duration-700 ease-expo",
                menuOpen ? "-translate-y-[3px] -rotate-[20deg]" : "origin-left group-hover:scale-x-50",
              )}
            />
          </span>
        </button>
      </div>
    </header>
  );
}
