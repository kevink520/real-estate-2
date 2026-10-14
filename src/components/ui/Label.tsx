import { Scramble } from "@/components/motion/Scramble";
import { cn } from "@/lib/cn";

/** Chapter label: "03 — Place" in mono, the number in copper. */
export function Label({ n, children, className }: { n?: string; children: string; className?: string }) {
  return (
    <p className={cn("t-mono flex items-baseline gap-3", className)}>
      {n && <span className="text-copper">{n}</span>}
      {n && <span className="h-px w-8 translate-y-[-3px] bg-line" aria-hidden />}
      <Scramble text={children} />
    </p>
  );
}
