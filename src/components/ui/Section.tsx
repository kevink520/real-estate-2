import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import type { ThemeName } from "@/components/motion/ThemeScroller";

type Props = {
  id?: string;
  /** Page colour this section claims while it crosses mid-viewport ("custom" = managed by the section). */
  theme: ThemeName | "custom";
  /** Chapter number this section opens (feeds the chapter rail). */
  chapter?: string;
  className?: string;
  children: ReactNode;
};

export function Section({ id, theme, chapter, className, children }: Props) {
  return (
    <section id={id} data-theme={theme} data-chapter={chapter} className={cn("relative z-10 bg-bg text-fg", className)}>
      {children}
    </section>
  );
}
