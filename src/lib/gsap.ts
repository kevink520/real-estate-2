"use client";

import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { Flip } from "gsap/Flip";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText, CustomEase, Flip, useGSAP);
  // "lux" is the reference's easeOut; "expo" is the softer reveal curve of the redesign.
  CustomEase.create("lux", "M0,0 C0.7,0 0.3,1 1,1");
  CustomEase.create("luxInOut", "M0,0 C0.55,0 0.1,1 1,1");
  CustomEase.create("expo", "M0,0 C0.16,1 0.3,1 1,1");
}

export const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const isFinePointer = () =>
  typeof window !== "undefined" && window.matchMedia("(hover: hover) and (pointer: fine)").matches;

export { Flip, gsap, ScrollTrigger, SplitText, useGSAP };
