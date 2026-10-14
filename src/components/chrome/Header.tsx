"use client";

import { useEffect, useRef, useState } from "react";
import { brand } from "@/content/site";
import { cn } from "@/lib/cn";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { useApp } from "@/components/providers/AppProvider";
import { Wordmark } from "./Wordmark";

type Theme = "dark" | "light";
const FG: Record<Theme, string> = { dark: "#fff", light: "#000" };

export function Header() {
  const { menuOpen, setMenuOpen, scrollTo } = useApp();
  const logo = useRef<HTMLAnchorElement>(null);
  const [theme, setTheme] = useState<Theme>("dark");
  const [themeLeft, setThemeLeft] = useState<Theme | null>(null);

  // Header colour follows whichever section sits under it (reference: data-themed-class, 0.8s).
  useEffect(() => {
    const line = () => (window.innerWidth >= 768 ? 70 : 40);
    const triggers = Array.from(document.querySelectorAll<HTMLElement>("section[data-theme]")).map((section) =>
      ScrollTrigger.create({
        trigger: section,
        start: () => `top ${line()}px`,
        end: () => `bottom ${line()}px`,
        onToggle: (self) => {
          if (!self.isActive) return;
          setTheme(section.dataset.theme as Theme);
          setThemeLeft((section.dataset.themeLeft as Theme) ?? null);
        },
      }),
    );
    return () => triggers.forEach((t) => t.kill());
  }, []);

  // Logo morph (reference `logo` parallax pattern): full-width bronze wordmark at the
  // bottom of the hero → 45.8vw logo at top-left across the first viewport of scroll.
  useGSAP(() => {
    const el = logo.current;
    if (!el) return;
    const big = () => {
      const g = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--gutter")) || 30;
      const scale = (window.innerWidth - 2 * g) / el.offsetWidth;
      return { scale, y: window.innerHeight - 2 * g - el.offsetHeight * scale };
    };
    gsap.fromTo(
      el,
      { scale: () => big().scale, y: () => big().y, "--mix": 1 },
      {
        scale: 1,
        y: 0,
        "--mix": 0,
        ease: "none",
        scrollTrigger: { start: 0, end: () => window.innerHeight * 0.9, scrub: true, invalidateOnRefresh: true },
      },
    );
  });

  const fg = menuOpen ? FG.dark : FG[theme];
  const zebraFg = themeLeft && !menuOpen && themeLeft !== theme ? FG[themeLeft] : null;

  return (
    <header
      className="pointer-events-none fixed inset-x-0 top-0 z-50 px-g pt-g"
      style={{ "--header-fg": fg, color: fg, transition: "color .8s var(--ease-lux)" } as React.CSSProperties}
    >
      <a
        ref={logo}
        href="#top"
        onClick={(e) => {
          e.preventDefault();
          setMenuOpen(false);
          scrollTo(0);
        }}
        className={cn("header-logo pointer-events-auto relative block w-[var(--logo-w)]", menuOpen && "is-collapsed")}
        aria-label={brand.name}
      >
        <Wordmark />
        {/* Zebra copy: recolours the part of the logo that sits over a contrasting left column. */}
        <span
          aria-hidden
          className="absolute inset-0 transition-opacity duration-800 ease-lux"
          style={{
            color: zebraFg ?? "transparent",
            opacity: zebraFg ? 1 : 0,
            clipPath: "inset(0 calc(100% - (var(--col) - var(--gutter))) 0 0)",
          }}
        >
          <Wordmark />
        </span>
      </a>

      <a
        href="#apartments"
        data-intro="fade"
        onClick={(e) => {
          e.preventDefault();
          setMenuOpen(false);
          scrollTo("#apartments");
        }}
        className="t-label pointer-events-auto absolute top-[calc(var(--gutter)+4px)] right-[calc(var(--gutter)+230px)] hidden transition-opacity duration-400 ease-lux hover:opacity-50 md:block"
      >
        {brand.cta}
      </a>

      <button
        type="button"
        data-intro="fade"
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen(!menuOpen)}
        className="pointer-events-auto absolute top-[var(--gutter)] right-[var(--gutter)] flex h-[30px] w-[60px] items-start justify-end"
      >
        <span className={cn("relative mt-[3px] block h-2 w-[60px] transition-opacity duration-400", menuOpen && "opacity-0")}>
          <span className="absolute inset-x-0 top-0 h-px bg-current" />
          <span className="absolute inset-x-0 bottom-0 h-px bg-current" />
        </span>
        <span
          className={cn(
            "absolute top-0 right-0 grid size-[30px] place-items-center border border-current transition-[opacity,transform] duration-600 ease-lux",
            menuOpen ? "scale-100 opacity-100" : "scale-75 opacity-0",
          )}
        >
          <svg viewBox="0 0 10 10" className="size-2.5" aria-hidden>
            <path d="M1 1l8 8M9 1L1 9" stroke="currentColor" strokeWidth="1" />
          </svg>
        </span>
      </button>
    </header>
  );
}
