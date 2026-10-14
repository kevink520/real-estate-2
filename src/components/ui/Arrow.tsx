import { cn } from "@/lib/cn";

/** Thin long arrow used for scroll cues and carousel controls. */
export function Arrow({ dir = "down", className }: { dir?: "down" | "up" | "left" | "right"; className?: string }) {
  if (dir === "left" || dir === "right") {
    return (
      <svg viewBox="0 0 42 12" fill="none" className={cn("h-3 w-[42px]", className)} style={dir === "left" ? { transform: "scaleX(-1)" } : undefined} aria-hidden>
        <path d="M0 6h41M36 1l5 5-5 5" stroke="currentColor" strokeWidth="1" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 12 42" fill="none" className={cn("h-[42px] w-3", className)} style={dir === "up" ? { transform: "scaleY(-1)" } : undefined} aria-hidden>
      <path d="M6 0v41M1 36l5 5 5-5" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}
