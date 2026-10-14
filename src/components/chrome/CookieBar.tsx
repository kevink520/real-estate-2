"use client";

import { useSyncExternalStore } from "react";
import { cn } from "@/lib/cn";
import { useApp } from "@/components/providers/AppProvider";

const KEY = "verne-cookies";
const listeners = new Set<() => void>();
const read = () => {
  try {
    return localStorage.getItem(KEY) === "1";
  } catch {
    return false;
  }
};
const subscribe = (fn: () => void) => {
  listeners.add(fn);
  return () => listeners.delete(fn);
};

/** Slim mono consent strip, bottom-right, after the intro. */
export function CookieBar() {
  const accepted = useSyncExternalStore(subscribe, read, () => true);
  const { introStage } = useApp();
  if (accepted) return null;

  const accept = () => {
    try {
      localStorage.setItem(KEY, "1");
    } catch {}
    listeners.forEach((fn) => fn());
  };

  return (
    <div
      className={cn(
        "t-mono scope-noir fixed right-g bottom-g z-40 flex max-w-[calc(100vw-2*var(--gutter))] items-center gap-6 border border-bone/15 bg-noir/85 py-3 pr-3 pl-4 text-bone backdrop-blur-md transition-[opacity,transform] duration-1000 ease-expo",
        introStage === "done" ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0",
      )}
      role="region"
      aria-label="Cookie notice"
    >
      <span>We use cookies to remember your visit.</span>
      <button type="button" onClick={accept} className="bg-bone px-3 py-2 text-noir transition-colors duration-500 hover:bg-copper hover:text-bone">
        Accept
      </button>
    </div>
  );
}
