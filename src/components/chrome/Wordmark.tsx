import { cn } from "@/lib/cn";

const LETTERS = ["V", "E", "R", "N", "E"];

/**
 * "VERNE N°7" set as spaced geometric capitals that fill their container's
 * width (container-query units). Each glyph sits in its own mask so the intro
 * can raise letters one by one (`data-letter`).
 */
export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn("block w-full [container-type:inline-size]", className)} aria-label="VERNE N°7" role="img">
      <span className="flex w-full items-end justify-between font-normal" style={{ fontSize: "18.6cqw" }} aria-hidden>
        {LETTERS.map((l, i) => (
          <Glyph key={i}>{l}</Glyph>
        ))}
        <span className="w-[0.12em]" />
        <Glyph>N</Glyph>
        <span className="block h-[0.72em] overflow-hidden">
          <span data-letter className="flex h-[0.72em] flex-col items-center pt-[0.01em]">
            <span className="block h-[0.3em] w-[0.26em] rounded-full border-[0.035em] border-current" />
            <span className="mt-[0.06em] h-[0.035em] w-[0.26em] bg-current" />
          </span>
        </span>
        <Glyph>7</Glyph>
      </span>
    </span>
  );
}

function Glyph({ children }: { children: React.ReactNode }) {
  return (
    <span className="block h-[0.72em] overflow-hidden leading-none">
      <span data-letter className="-mt-[0.14em] block">
        {children}
      </span>
    </span>
  );
}
