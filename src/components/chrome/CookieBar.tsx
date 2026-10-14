"use client";

import { useSyncExternalStore } from "react";
import { cn } from "@/lib/cn";

const KEY = "verne-cookie-consent";
const EVENT = "verne-cookie-change";

const subscribe = (cb: () => void) => {
  window.addEventListener(EVENT, cb);
  window.addEventListener("storage", cb);
  return () => {
    window.removeEventListener(EVENT, cb);
    window.removeEventListener("storage", cb);
  };
};
const accepted = () => {
  try {
    return localStorage.getItem(KEY) === "1";
  } catch {
    return false;
  }
};

export function CookieBar() {
  // Server snapshot reports "accepted" so the bar never flashes in pre-rendered HTML.
  const isAccepted = useSyncExternalStore(subscribe, accepted, () => true);

  const accept = () => {
    try {
      localStorage.setItem(KEY, "1");
    } catch {}
    window.dispatchEvent(new Event(EVENT));
  };

  return (
    <div
      className={cn(
        "t-tiny fixed bottom-2.5 left-1/2 z-30 flex w-[calc(100%-2*var(--gutter))] -translate-x-1/2 items-center justify-between border border-white/20 bg-black px-5 py-[17px] text-white transition-[opacity,transform] duration-800 ease-lux md:w-[360px]",
        isAccepted ? "pointer-events-none translate-y-4 opacity-0" : "opacity-100",
      )}
      role="region"
      aria-label="Cookie notice"
    >
      <span>This site uses cookies</span>
      <button type="button" onClick={accept} className="text-bronze underline underline-offset-4 transition-opacity duration-400 hover:opacity-60">
        Accept
      </button>
    </div>
  );
}
