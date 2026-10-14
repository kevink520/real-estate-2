"use client";

import { footer } from "@/content/site";
import { useApp } from "@/components/providers/AppProvider";
import { Arrow } from "@/components/ui/Arrow";
import { Wordmark } from "./Wordmark";

export function Footer() {
  const { scrollTo } = useApp();
  return (
    <footer data-theme="dark" className="relative z-10 bg-black text-white">
      <div className="border-t border-white/20">
        <button
          type="button"
          onClick={() => scrollTo(0)}
          aria-label="Back to top"
          className="mx-auto grid h-[130px] w-full place-items-center transition-opacity duration-400 hover:opacity-50"
        >
          <Arrow dir="up" />
        </button>
      </div>
      <div className="mx-auto w-[46vw] pb-10 text-bronze md:hidden">
        <Wordmark />
      </div>
      <div className="t-tiny flex justify-between px-g pb-g">
        <span>{footer.copyright}</span>
        <span>{footer.credit}</span>
      </div>
    </footer>
  );
}
