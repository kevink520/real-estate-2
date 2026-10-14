"use client";

import Lenis from "lenis";
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { gsap, prefersReducedMotion, ScrollTrigger } from "@/lib/gsap";

/** intro: "loading" (preloader up) → "reveal" (wipe running, hero text may animate) → "done". */
type IntroStage = "loading" | "reveal" | "done";

type AppState = {
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
  introStage: IntroStage;
  setIntroStage: (stage: IntroStage) => void;
  scrollTo: (target: string | number) => void;
};

const AppContext = createContext<AppState | null>(null);

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used inside <AppProvider>");
  return ctx;
}

export function AppProvider({ children }: { children: React.ReactNode }) {
  const lenis = useRef<Lenis | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [introStage, setIntroStage] = useState<IntroStage>("loading");

  // Smooth scroll mirrors Locomotive's lerp 0.1. Touch devices keep native scrolling.
  useEffect(() => {
    history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
    if (prefersReducedMotion()) return;

    const instance = new Lenis({ lerp: 0.1, smoothWheel: true });
    instance.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => instance.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    lenis.current = instance;

    return () => {
      gsap.ticker.remove(tick);
      instance.destroy();
      lenis.current = null;
    };
  }, []);

  // Lock scrolling while the preloader or menu is up.
  const locked = menuOpen || introStage === "loading";
  useEffect(() => {
    document.documentElement.style.overflow = locked ? "hidden" : "";
    if (locked) lenis.current?.stop();
    else lenis.current?.start();
  }, [locked]);

  const scrollTo = useCallback(
    (target: string | number) => {
      if (lenis.current) lenis.current.scrollTo(target, { duration: 1.6, easing: (t) => 1 - Math.pow(1 - t, 4) });
      else if (typeof target === "number") window.scrollTo({ top: target, behavior: "smooth" });
      else document.querySelector(target)?.scrollIntoView({ behavior: "smooth" });
    },
    [],
  );

  const value = useMemo(
    () => ({ menuOpen, setMenuOpen, introStage, setIntroStage, scrollTo }),
    [menuOpen, introStage, scrollTo],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
