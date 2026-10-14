import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Props = {
  id?: string;
  theme: "dark" | "light";
  /** Theme of the left third column, used to recolour the part of the logo over it. */
  themeLeft?: "dark" | "light";
  className?: string;
  children: ReactNode;
};

export function Section({ id, theme, themeLeft, className, children }: Props) {
  return (
    <section id={id} data-theme={theme} data-theme-left={themeLeft} className={cn("relative z-10 bg-theme text-theme", className)}>
      {children}
    </section>
  );
}
