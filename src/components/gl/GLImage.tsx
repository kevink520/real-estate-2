"use client";

import { Mesh, Program, Renderer, Texture, Triangle } from "ogl";
import { useEffect, useRef, useState, type MutableRefObject, type ReactNode } from "react";
import { gsap, isFinePointer, prefersReducedMotion } from "@/lib/gsap";
import { scrollState } from "@/lib/scroll";
import { cn } from "@/lib/cn";
import { Img } from "@/components/ui/Img";

/** Mutable controls a parent can drive every frame (e.g. from a scrubbed timeline). */
export type GLControls = { zoom?: number };

type Props = {
  srcs: string[];
  /** Index of the visible image; changes dissolve through noise in the shader (CSS crossfade fallback). */
  index?: number;
  alt?: string;
  className?: string;
  sizes?: string;
  preload?: boolean;
  /** Slow liquid drift (0 = still). */
  ambient?: number;
  /** Scroll parallax range in UV units (0.05 ≈ 5% of the frame). */
  parallax?: number;
  /** Seconds for an index dissolve. */
  duration?: number;
  controls?: MutableRefObject<GLControls>;
  /** DOM-image class (fallback / pre-GL). */
  imgClassName?: string;
  children?: ReactNode;
};

const vertex = /* glsl */ `
attribute vec2 uv;
attribute vec2 position;
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 0.0, 1.0);
}`;

const fragment = /* glsl */ `
precision highp float;
uniform sampler2D t0;
uniform sampler2D t1;
uniform vec2 uS0;
uniform vec2 uS1;
uniform vec2 uRes;
uniform vec2 uMouse;
uniform float uTime;
uniform float uMix;
uniform float uHover;
uniform float uVel;
uniform float uAmb;
uniform float uPar;
uniform float uZoom;
varying vec2 vUv;

float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise(vec2 p) {
  vec2 i = floor(p); vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x), mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}
vec2 cover(vec2 uv, vec2 img) {
  vec2 s = uRes / img;
  float sc = max(s.x, s.y);
  vec2 size = img * sc;
  return (uv * uRes - (uRes - size) * 0.5) / size;
}
vec3 sampleShift(sampler2D t, vec2 uv, float sh) {
  return vec3(texture2D(t, uv + vec2(sh, 0.0)).r, texture2D(t, uv).g, texture2D(t, uv - vec2(sh, 0.0)).b);
}

void main() {
  vec2 uv = (vUv - 0.5) / uZoom + 0.5;
  uv.y += uPar;
  // velocity bend: the image sags in the direction of travel
  uv.y += sin(vUv.x * 3.14159) * uVel * 0.035;
  // ambient liquid drift
  float n1 = noise(uv * 2.6 + vec2(uTime * 0.07, uTime * 0.05));
  float n2 = noise(uv * 4.1 - vec2(uTime * 0.04, uTime * 0.06));
  uv += (vec2(n1, n2) - 0.5) * uAmb * 0.018;
  // hover ripple around the pointer
  vec2 asp = vec2(uRes.x / uRes.y, 1.0);
  vec2 dv = (vUv - uMouse) * asp;
  float d = length(dv);
  float rip = sin(d * 26.0 - uTime * 3.2) * exp(-d * 4.5) * uHover * 0.011;
  uv += normalize(dv + 1e-5) * rip / asp;
  uv = (uv - 0.5) / (1.0 + uHover * 0.035) + 0.5;
  // noisy dissolve between t0 and t1
  float edge = noise(vUv * 3.5 + uTime * 0.05) * 0.8 + noise(vUv * 14.0) * 0.2;
  float m = smoothstep(edge - 0.18, edge + 0.18, uMix * 1.36 - 0.18);
  float sh = abs(uVel) * 0.0045 + uHover * 0.0012;
  vec3 c0 = sampleShift(t0, cover(uv, uS0), sh);
  vec3 c1 = sampleShift(t1, cover(uv, uS1), sh);
  vec3 col = mix(c0, c1, m);
  // soft vignette
  vec2 q = vUv - 0.5;
  col *= 1.0 - dot(q, q) * 0.28;
  gl_FragColor = vec4(col, 1.0);
}`;

const WIDTHS = [640, 750, 828, 1080, 1200, 1920, 2048];
const optimised = (src: string, px: number) =>
  `/_next/image?url=${encodeURIComponent(src)}&w=${WIDTHS.find((w) => w >= px) ?? 2048}&q=75`;

function loadImage(url: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    img.decoding = "async";
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = url;
  });
}

/**
 * Image frame rendered through a small OGL canvas: noise dissolve between
 * images, pointer ripple, scroll-velocity bend and parallax. A stacked
 * next/image set stays underneath as the fallback (touch, reduced motion, no WebGL).
 */
export function GLImage({
  srcs,
  index = 0,
  alt = "",
  className,
  sizes = "100vw",
  preload,
  ambient = 0,
  parallax = 0.04,
  duration = 1.8,
  controls,
  imgClassName,
  children,
}: Props) {
  const frame = useRef<HTMLDivElement>(null);
  const api = useRef<{ show: (i: number) => void } | null>(null);
  const [ready, setReady] = useState(false);
  const srcKey = srcs.join("|");

  useEffect(() => {
    const el = frame.current;
    if (!el || !isFinePointer() || prefersReducedMotion()) return;

    // A fresh canvas per mount: a context lost in cleanup can't be reused.
    const cv = document.createElement("canvas");
    cv.setAttribute("aria-hidden", "true");
    cv.className = "absolute inset-0 size-full opacity-0 transition-opacity duration-700";
    el.querySelector("[data-gl-fallback]")?.after(cv);

    let renderer: Renderer;
    try {
      renderer = new Renderer({ canvas: cv, dpr: Math.min(window.devicePixelRatio, 1.5), alpha: false, antialias: false });
    } catch {
      cv.remove();
      return;
    }
    const gl = renderer.gl;
    const list = srcKey.split("|");
    const textures = list.map(() => new Texture(gl, { generateMipmaps: false, minFilter: gl.LINEAR }));
    const sizesPx = list.map(() => [1, 1]);
    const uniforms = {
      t0: { value: textures[0] },
      t1: { value: textures[0] },
      uS0: { value: [1, 1] },
      uS1: { value: [1, 1] },
      uRes: { value: [1, 1] },
      uMouse: { value: [0.5, 0.5] },
      uTime: { value: 0 },
      uMix: { value: 0 },
      uHover: { value: 0 },
      uVel: { value: 0 },
      uAmb: { value: ambient },
      uPar: { value: 0 },
      uZoom: { value: 1 },
    };
    const program = new Program(gl, { vertex, fragment, uniforms });
    const mesh = new Mesh(gl, { geometry: new Triangle(gl), program });

    let current = 0;
    let visible = false;
    let alive = true;
    const mouse = { x: 0.5, y: 0.5 };

    // Layout size, not the transformed rect: parents may be mid-scale (intro, zoom-through).
    const resize = () => {
      const width = el.offsetWidth;
      const height = el.offsetHeight;
      renderer.setSize(Math.max(1, width), Math.max(1, height));
      uniforms.uRes.value = [Math.max(1, width), Math.max(1, height)];
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(el);

    const want = el.offsetWidth * Math.min(window.devicePixelRatio, 1.5);
    Promise.all(list.map((s) => loadImage(optimised(s, want)))).then((imgs) => {
      if (!alive) return;
      imgs.forEach((img, i) => {
        textures[i].image = img;
        sizesPx[i] = [img.naturalWidth, img.naturalHeight];
      });
      uniforms.t0.value = textures[current];
      uniforms.t1.value = textures[current];
      uniforms.uS0.value = sizesPx[current];
      uniforms.uS1.value = sizesPx[current];
      renderer.render({ scene: mesh, frustumCull: false, sort: false });
      cv.style.opacity = "1";
      setReady(true);
    }).catch(() => undefined);

    let mixTween: gsap.core.Tween | null = null;
    api.current = {
      show(next) {
        if (next === current || !textures[next]) return;
        mixTween?.progress(1);
        uniforms.t0.value = textures[current];
        uniforms.uS0.value = sizesPx[current];
        uniforms.t1.value = textures[next];
        uniforms.uS1.value = sizesPx[next];
        uniforms.uMix.value = 0;
        mixTween = gsap.to(uniforms.uMix, {
          value: 1,
          duration,
          ease: "power2.inOut",
          onComplete() {
            current = next;
            uniforms.t0.value = textures[next];
            uniforms.uS0.value = sizesPx[next];
            uniforms.uMix.value = 0;
          },
        });
      },
    };

    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting), { rootMargin: "10% 0px" });
    io.observe(el);

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      mouse.x = (e.clientX - r.left) / r.width;
      mouse.y = 1 - (e.clientY - r.top) / r.height;
    };
    const onEnter = () => gsap.to(uniforms.uHover, { value: 1, duration: 0.8, ease: "expo" });
    const onLeave = () => gsap.to(uniforms.uHover, { value: 0, duration: 1.2, ease: "expo" });
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerenter", onEnter);
    el.addEventListener("pointerleave", onLeave);

    const tick = (time: number) => {
      if (!visible || !textures[0].image) return;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const progress = gsap.utils.clamp(0, 1, (r.top + r.height) / (vh + r.height));
      const zoom = controls?.current.zoom ?? 1;
      uniforms.uTime.value = time;
      uniforms.uPar.value = (progress - 0.5) * parallax;
      uniforms.uZoom.value = zoom * (1.02 + parallax * 0.6 + ambient * 0.01);
      uniforms.uVel.value += (gsap.utils.clamp(-1, 1, scrollState.velocity / 60) - uniforms.uVel.value) * 0.08;
      const m = uniforms.uMouse.value;
      m[0] += (mouse.x - m[0]) * 0.08;
      m[1] += (mouse.y - m[1]) * 0.08;
      renderer.render({ scene: mesh, frustumCull: false, sort: false });
    };
    gsap.ticker.add(tick);

    return () => {
      alive = false;
      gsap.ticker.remove(tick);
      mixTween?.kill();
      io.disconnect();
      ro.disconnect();
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerenter", onEnter);
      el.removeEventListener("pointerleave", onLeave);
      api.current = null;
      gl.getExtension("WEBGL_lose_context")?.loseContext();
      cv.remove();
      setReady(false);
    };
  }, [srcKey, ambient, parallax, duration, controls]);

  useEffect(() => {
    api.current?.show(index);
  }, [index]);

  return (
    <div ref={frame} className={cn("overflow-hidden", !className?.includes("absolute") && "relative", className)} data-gl-ready={ready ? "" : undefined}>
      <div data-gl-fallback className="absolute inset-0">
        {srcs.map((src, i) => (
          <Img
            key={src}
            src={src}
            alt={i === 0 ? alt : ""}
            sizes={sizes}
            preload={preload && i === 0}
            className={cn("transition-opacity duration-[1.8s] ease-in-out", i === index ? "opacity-100" : "opacity-0", imgClassName)}
          />
        ))}
      </div>
      {children}
    </div>
  );
}
