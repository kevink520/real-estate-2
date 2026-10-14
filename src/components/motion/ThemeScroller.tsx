"use client";

import { useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export const THEMES = {
  noir: { bg: "#0e0c0a", fg: "#ede6da" },
  bone: { bg: "#ede6da", fg: "#0e0c0a" },
  copper: { bg: "#b4683e", fg: "#120d0a" },
} as const;
export type ThemeName = keyof typeof THEMES;

/** Tween the page colours on <html>; sections drive it, and the day chapter scrubs it directly. */
export function setPageTheme(bg: string, fg: string, duration = 1.1) {
  // A section that scrubs the colours itself (data-theme="custom") holds the lock while active.
  if (document.documentElement.dataset.themeLock) return;
  gsap.to(document.documentElement, { "--bg": bg, "--fg": fg, duration, ease: "power2.inOut", overwrite: "auto" });
}

/**
 * Each section with data-theme="noir|bone|copper" claims the page colour while
 * it crosses the middle of the viewport. Sections with data-theme="custom" manage it themselves.
 */
export function ThemeScroller() {
  useEffect(() => {
    const triggers = Array.from(document.querySelectorAll<HTMLElement>("[data-theme]")).map((section) =>
      ScrollTrigger.create({
        trigger: section,
        start: "top 55%",
        end: "bottom 55%",
        onToggle(self) {
          const name = section.dataset.theme as ThemeName | "custom";
          if (!self.isActive || name === "custom") return;
          setPageTheme(THEMES[name].bg, THEMES[name].fg);
        },
      }),
    );
    return () => triggers.forEach((t) => t.kill());
  }, []);
  return null;
}
