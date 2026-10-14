import { cn } from "@/lib/cn";

/**
 * Hover roll: the roman line slides up and out while an italic copy rises in.
 * The trigger is the nearest `group` ancestor.
 */
export function RollText({ children, className, italic = true }: { children: string; className?: string; italic?: boolean }) {
  return (
    <span className={cn("relative inline-block overflow-hidden align-bottom", className)}>
      <span className="block transition-transform duration-700 ease-expo group-hover:-translate-y-full group-focus-visible:-translate-y-full">
        {children}
      </span>
      <span
        aria-hidden
        className={cn(
          "absolute inset-0 block translate-y-full transition-transform duration-700 ease-expo group-hover:translate-y-0 group-focus-visible:translate-y-0",
          italic && "serif-em",
        )}
      >
        {children}
      </span>
    </span>
  );
}
