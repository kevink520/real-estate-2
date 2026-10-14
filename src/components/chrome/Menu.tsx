"use client";

import { useRef } from "react";
import { menu, nav } from "@/content/site";
import { gsap, useGSAP } from "@/lib/gsap";
import { useApp } from "@/components/providers/AppProvider";
import { Img } from "@/components/ui/Img";

/** Full-screen menu: black panel wipes up from the bottom, then links rise in sequence. */
export function Menu() {
  const { menuOpen, setMenuOpen, scrollTo } = useApp();
  const root = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);

  useGSAP(
    () => {
      tl.current = gsap
        .timeline({ paused: true, defaults: { ease: "lux" } })
        .set(root.current, { visibility: "visible" })
        .fromTo(root.current, { clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.8 })
        .fromTo("[data-menu-image]", { yPercent: 12, scale: 1.08 }, { yPercent: 0, scale: 1, duration: 1.2 }, 0)
        .fromTo("[data-menu-link]", { yPercent: 110 }, { yPercent: 0, duration: 0.9, stagger: 0.04 }, 0.25)
        .fromTo("[data-menu-card]", { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.8 }, 0.4);
    },
    { scope: root },
  );

  useGSAP(() => {
    if (!tl.current) return;
    if (menuOpen) tl.current.timeScale(1).play();
    else tl.current.timeScale(1.6).reverse();
  }, [menuOpen]);

  const go = (href: string) => {
    setMenuOpen(false);
    // Let the panel start closing before the long scroll begins.
    setTimeout(() => scrollTo(href), 250);
  };

  return (
    <div ref={root} className="invisible fixed inset-0 z-40 bg-black text-white" style={{ clipPath: "inset(100% 0% 0% 0%)" }} aria-hidden={!menuOpen}>
      <div className="grid h-full md:grid-cols-2">
        <div className="relative hidden overflow-hidden md:block">
          <div data-menu-image className="absolute inset-0">
            <Img src={menu.image} sizes="50vw" className="object-[50%_20%]" />
          </div>
          <a
            href="#gallery"
            data-menu-card
            onClick={(e) => {
              e.preventDefault();
              go("#gallery");
            }}
            className="t-tiny group absolute bottom-g left-g flex h-[60px] w-[120px] flex-col justify-between border border-white/40 bg-black/20 p-2.5 backdrop-blur-sm transition-colors duration-400 ease-lux hover:bg-white hover:text-black md:h-[80px] md:w-[240px]"
          >
            <span>
              {menu.card[0]}
              <br />
              {menu.card[1]}
            </span>
            <span className="self-end">›</span>
          </a>
        </div>
        <nav className="flex flex-col justify-end border-white/20 px-g pb-[calc(var(--gutter)+60px)] md:border-l md:pb-g">
          <ul>
            {nav.map((item) => (
              <li key={item.href} className="overflow-hidden">
                <a
                  data-menu-link
                  href={item.href}
                  tabIndex={menuOpen ? 0 : -1}
                  onClick={(e) => {
                    e.preventDefault();
                    go(item.href);
                  }}
                  className="block text-[20px] leading-[24px] transition-opacity duration-400 ease-lux hover:opacity-50 md:text-[14px] md:leading-[15px]"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}
