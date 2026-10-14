import Image from "next/image";
import { cn } from "@/lib/cn";

type Props = {
  src: string;
  alt?: string;
  sizes?: string;
  className?: string;
  preload?: boolean;
};

/** Fill-mode next/image; the parent must be positioned. */
export function Img({ src, alt = "", sizes = "100vw", className, preload }: Props) {
  return <Image src={src} alt={alt} fill sizes={sizes} preload={preload} className={cn("object-cover", className)} draggable={false} />;
}
