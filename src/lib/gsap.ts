"use client";

import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText, CustomEase, useGSAP);
  // Reference easings (landing.js): easeOut [.7,0,.3,1], easeInOut [.55,0,.1,1].
  CustomEase.create("lux", "M0,0 C0.7,0 0.3,1 1,1");
  CustomEase.create("luxInOut", "M0,0 C0.55,0 0.1,1 1,1");
}

export const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export { gsap, ScrollTrigger, SplitText, useGSAP };
