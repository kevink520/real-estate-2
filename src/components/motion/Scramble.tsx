"use client";

import { useRef } from "react";
import { gsap, prefersReducedMotion, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/cn";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/°—·";

/** Mono label that resolves out of random glyphs when it scrolls into view (or when `text` changes). */
export function Scramble({ text, className, delay = 0, as: Tag = "span" }: { text: string; className?: string; delay?: number; as?: "span" | "p" | "div" }) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      if (prefersReducedMotion()) {
        el.textContent = text;
        return;
      }
      const state = { p: 0 };
      const render = () => {
        const shown = Math.floor(state.p * text.length);
        let out = "";
        for (let i = 0; i < text.length; i++) {
          const c = text[i];
          out += i < shown || c === " " ? c : GLYPHS[(Math.random() * GLYPHS.length) | 0];
        }
        el.textContent = out;
      };
      const tween = gsap.to(state, { p: 1, duration: 0.5 + text.length * 0.025, ease: "none", delay, paused: true, onUpdate: render });
      const st = ScrollTrigger.create({ trigger: el, start: "top 95%", once: true, onEnter: () => tween.play() });
      render();
      return () => {
        st.kill();
        tween.kill();
      };
    },
    { dependencies: [text] },
  );

  return (
    <Tag ref={ref as never} className={cn("whitespace-pre", className)} aria-label={text}>
      {text}
    </Tag>
  );
}
