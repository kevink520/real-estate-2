import type { Metadata, Viewport } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

// Free geometric stand-in for the reference's Gilroy SemiBold.
const outfit = Outfit({ variable: "--font-outfit", subsets: ["latin"], weight: ["400", "500", "600"] });

export const metadata: Metadata = {
  title: "VERNE N°7 — Private residence",
  description: "Three neoclassical towers with the service of a grand hotel. A concept landing page.",
};

export const viewport: Viewport = { themeColor: "#000" };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={outfit.variable}>
      <body>{children}</body>
    </html>
  );
}
