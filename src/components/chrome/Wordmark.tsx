import { cn } from "@/lib/cn";

const LETTERS = ["V", "E", "R", "N", "E"];

/**
 * "VERNE n°7" set in light Fraunces display capitals with an italic superior
 * numeral. Sized in container-query units so it always fills its box; each glyph
 * sits in its own mask so the intro can raise letters one by one (`data-letter`).
 */
export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn("block w-full [container-type:inline-size]", className)} aria-label="VERNE N°7" role="img">
      <span
        className="flex w-full items-start justify-between font-display leading-none whitespace-nowrap"
        style={{ fontSize: "26.2cqw", letterSpacing: "-0.04em" }}
        aria-hidden
      >
        {LETTERS.map((l, i) => (
          <Glyph key={i}>{l}</Glyph>
        ))}
        <span className="block overflow-hidden pt-[0.05em] text-[0.3em]">
          <span data-letter className="serif-em block leading-none">
            n°7
          </span>
        </span>
      </span>
    </span>
  );
}

function Glyph({ children }: { children: string }) {
  return (
    <span className="block h-[0.74em] overflow-hidden">
      <span data-letter className="-mt-[0.17em] block leading-none">
        {children}
      </span>
    </span>
  );
}
