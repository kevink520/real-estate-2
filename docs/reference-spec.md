# Reference spec: zorge9.estate → VERNE N°7

This document records how the reference landing page was inspected and how its
effects map onto this Next.js build. The brand, copy and imagery here are
fictional and AI-generated (MiniMax image-01 via Treg). No reference photography
or copy is reused.

## Investigation record (REA)
REA was not registered at first. You ran `npx rea-agents@latest setup --client claude_code` and restarted, which fixed that. Chrome on :9222 was started without command-line flags (debugging was switched on through chrome://inspect), so `/json/*` returned 404 and `list_browser_targets` failed. To work around it, I launched an isolated Chrome on **:9223** with a throwaway profile in the scratchpad.

REA tools used:
- `list_browser_targets` returned evidence `ev_5ef925…`.
- `inspect_web_page` ran twice: once for DOM/accessibility/resources (4,628 nodes) and once with script sources (`ev_c7948e…`).
- `capture_web_screenshot`
- `analyze_web_bundle` (`ev_c22ae8…`): 6 scripts, no source maps, no vendor fingerprints matched.
- `export_web_scripts` (`ev_321ac5…`): `shared.js` 326 KB and `landing.js` 197 KB, saved to the scratchpad.
- `capture_browser_scenario` **failed** in both connect and launch modes (`cleanup_incomplete` / `unreadable_output`). As a fallback, I scrolled and clicked with a small CDP script (`scratchpad/tools/*.mjs`) and captured 150+ desktop (1440×750) and mobile (390×844) frames.

CSS and HTML were fetched directly so I could extract design tokens.

### Verified findings (from bundle code, CSS, or screenshots)
- **Stack:**
  - jQuery 3.7.1
  - @barba/core 2.10.3 (page transitions; this page uses it for modals only)
  - Locomotive Scroll v4 smooth mode (`lerp: .1`, `is-inview`, `data-scroll-section`, `data-scroll-sticky`, `data-scroll-snap-point`, `has-scroll-smooth`)
  - A custom `$.fn.parallax` pattern engine that is scroll-progress driven
  - A popmotion-style tween helper
  - **No GSAP, canvas, WebGL, shaders, or video.** No `getContext` or `<canvas>` anywhere, and no `<video>` tags on the page.
- **Type:**
  - Gilroy SemiBold (600), `Gilroy, Helvetica, Arial`, uppercase almost everywhere
  - `html` 10px, body 14px/18px, small labels 12px with `letter-spacing .03em`
  - h2 36px/38px. The display wordmark is an SVG, 673×87 viewBox.
- **Colors:**
  - black `#000`, white `#fff`, bronze `#a0725b` (the wordmark in the hero)
  - grays `#666`, `#aaa`, `#555`
  - lines `rgba(255,255,255,.2)` on dark, `rgba(0,0,0,.1)` on light
  - Each section sets a `ui-dark` or `ui-light` theme. The header uses `data-themed-class` and swaps colors with a **0.8s** transition.
- **Easings and durations:**
  - `easeOut = cubic-bezier(.7,0,.3,1)`
  - `easeInOut = (.55,0,.1,1)`
  - `easeInOutSubtle = (.25,.1,.25,1)`
  - Intro, preloader and menu run **1.6s**. Theme color changes take 0.8s, hovers 0.4s.
  - Title reveal lasts `chars×10ms + 1.6s`; text reveal lasts `lines×40ms + 1.6s`.
- **Layout (1440 desktop):**
  - 30px gutter. Header is fixed and 145px tall.
  - The logo is 660×85 at (30,30) when collapsed.
  - "Choose an apartment" sits at x≈1080 and y≈40. The burger is 60×8 (two lines) at the right edge.
  - Many sections split into a ⅓ black or white column (480px) and ⅔ media.
- **Preloader:**
  - Black screen with a centred outlined card (~160×230) holding a small logo and the tagline "THE LUXURY OF EXPERIENCE".
  - Once loaded, a **black panel wipes from right to left**, revealing the hero. The card travels left with it. The panel settles as the hero's left ⅓ black column (≈1.6s, easeOut).
  - Next, the woman cutout layer slides in from the right faster than the background, a parallax offset (`animation--intro-decor`).
  - Then the **giant bronze wordmark rises from below** behind a mask.
  - Finally, the headline lines reveal, and the arrow, CTA and burger fade in (`intro-menu`, `intro-back`).
  - On mobile it's a simple crossfade instead of a wipe.
- **Hero background:** a `contentAnimation` crossfade between day and night photos (`fadeIn`, 2s, autoplay every **7s**).
- **Logo morph:** the `logo` parallax pattern sets `--logo-scale = (innerWidth−2·left)/logoWidth`.
  - While the hero is in view, the header logo is "big": full width, bronze, at the bottom of the hero.
  - Across the first viewport of scroll it shrinks to scale 1 at the top-left, and its color follows the section theme.
  - A `header__logo-zebra` copy, clipped to the left ⅓ column, recolors the logo where it overlaps a contrasting column.
- **Section stacking:** the hero is `sticky--under-next`, so the next section slides over it.
  - `sectionOutTiny`, `sectionOutHalf` and `sectionOutFade` translate the outgoing section by up to −100lvh and fade its opacity to 0.4 or 0, using `easeSection`.
- **imageMove parallax (60 images):** each picture inside a crop translates from −(wrapperH−cropH)/wrapperH·100% to 0% as it crosses the viewport. Inside a sticky-slider it uses X instead of Y.
- **Advantages (pinned):** a sticky section with 5 slides (lobby, concierge, community, co-working, courtyard). The left black panel shows the title, a "1 — 5" counter and the copy.
  - Each image reveals with `clip-path: polygon(0 100%…)` → full, plus translateY 5svh → 0.
- **Fitness (horizontal):** a sticky-slider where vertical scroll drives translateX of a long row of mixed-size images and text blocks.
- **Services:** pinned, with an image swap on the left and 3 outlined text cards on the right that dim as they deactivate.
- **Menu:** a black panel wipes up from the bottom (~0.5s).
  - Left ⅓ holds a portrait image, plus a "Gallery of completed residences" outlined card at bottom-left.
  - Links (Location / Design / Infrastructure / Amenities / Apartments / Services / Parking) sit at the bottom-left of the right area. The burger turns into an outlined ✕ box.
- **Cursor:** `cursor--gallery` is a 120px outlined circle reading "VIEW" that follows the mouse over the gallery. `cursor--arrow` shows prev/next outlined circles over carousels (Daily schedule, Infrastructure). There is also a `cursor--zoom`.
- **Other:**
  - The cookie bar is centred at the bottom (bordered black pill; "ACCEPT" in bronze, underlined).
  - The footer is a black panel with a ↑ to-top arrow, "© 2026", and "Site by …". On mobile it shows a small bronze logo.
- **Mobile (390):**
  - The hero stacks: headline at the top, towers, cutout, wordmark at the bottom.
  - Smooth scroll is off (`no-scroll-smooth`).
  - The logo becomes a compact fixed bar with the burger.
  - Advantages and services become stacked cards: image on top, black text panel below.
  - Fitness stays a horizontal-ish offset collage. Footer has a small bronze logo.
- **Breakpoints:** xs < 568, md ≥ 568/668 (aspect-ratio dependent), lg ≥ 980, xl ≥ 1440, xxl ≥ 1920.

### Inferred (not directly proven)
- Exact per-letter stagger of the wordmark rise (it looks like ~60ms per letter, 1.2s each).
- Menu link hover: probably the standard `.btn--link` underline or opacity at 0.4s.
- Text appear masks: lines slide up from `translateY(100%)` inside overflow-hidden wrappers. The CSS shows the timing, but the transforms come from JS.
- Snap points (`data-scroll-snap-point`) suggest gentle snapping at section boundaries on desktop. I won't implement them in v1, to avoid scroll-jacking.

### Could not inspect
- Barba transitions to other routes (out of scope: single page).
- Map, plan, and video modals beyond their closed state.
- Exact cursor easing (I'll use a lerp of 0.15).
- Licensed Gilroy font files. I'll substitute a free font.

## Implementation spec

**Stack:**
- `create-next-app@latest` with App Router, TS, Tailwind v4, and `src/`
- `lenis` for smooth scroll, matching Locomotive's `lerp .1`, disabled on touch
- `gsap` + `ScrollTrigger` + `@gsap/react` for pins, scrubbed parallax, the horizontal track and timelines. GSAP is free now, and pinning maps cleanly onto Locomotive sticky.
- `next/font/google` **Outfit** (500/600) as the Gilroy stand-in. It's isolated in one CSS var so licensed Gilroy can be dropped in later.

**Tokens** (`src/app/globals.css`, `@theme`):
- colors `--color-bronze #a0725b`, `ink #000`, `paper #fff`, `muted #666`
- `--ease-out-expo: cubic-bezier(.7,0,.3,1)`, `--ease-inout: cubic-bezier(.55,0,.1,1)`
- type scale 12 / 14 / 20 / 36, display via SVG
- gutter `30px` (16px mobile)
- `.ui-dark` and `.ui-light` theme classes setting `--t-bg`, `--t-text`, `--t-line`

**Files:**
- `src/content/site.ts`: all copy, nav and section data for the fictional brand
- `src/app/layout.tsx`, `src/app/page.tsx` (composes the sections)
- `src/components/providers/SmoothScroll.tsx`: Lenis + ScrollTrigger sync, the `has-smooth` flag, and `prefers-reduced-motion` handling
- `src/components/chrome/`:
  - `Preloader.tsx`
  - `Header.tsx`, including the scroll-scrubbed `Logo` morph, the zebra clip, and theme detection via IntersectionObserver on `[data-theme]` sections
  - `Menu.tsx`, `Cursor.tsx`, `CookieBar.tsx`, `Footer.tsx`
  - `Wordmark.tsx`: an SVG wordmark I design myself, a geometric "VERNE N°7"
- `src/components/motion/`:
  - `RevealText.tsx`: line and char split, mask slide-up, 10ms/char and 40ms/line stagger
  - `ParallaxImage.tsx`: the imageMove pattern
  - `Appear.tsx`: fade/translate on enter
  - `StickyUnderNext.tsx`: the sectionOut patterns
- `src/components/sections/`, 16 files: `Intro`, `About`, `Location`, `MapArea` (an SVG line map I draw myself with numbered pins), `Panorama`, `Architecture`, `Gallery`, `DailySchedule` (carousel + circular dial), `Lobby`, `Advantages` (pinned clip-path stack), `Fitness` (horizontal pin), `Infrastructure` (carousel), `Park`, `Apartments` (tabs + area figures + SVG floor plan), `Services` (pinned cards), `Penthouses`

**Effect → implementation map:**

| Effect | Trigger | Properties | Timing | Implementation |
|---|---|---|---|---|
| Preloader wipe | fonts and hero images loaded | panel `clip-path`/width 100%→33.33%, card translateX | 1.6s easeOut | GSAP timeline in `Preloader` that then calls `intro.play()` |
| Cutout slide-in | intro step 2 | translateX 30vw→0 | 1.6s easeOut, +0.2s | same timeline |
| Wordmark rise | intro step 3 | per-letter translateY 110%→0 inside a mask | 1.2s, 0.06s stagger | same timeline |
| Headline/menu in | intro step 4 | line mask slide-up; CTA and burger opacity | 1.6s + 40ms/line | `RevealText` |
| Hero day↔night | autoplay | opacity crossfade | 2s every 7s | interval + CSS transition |
| Logo morph | scroll 0→100vh | scale `--logo-scale`→1, translateY bottom→top, color bronze→theme | scrubbed | ScrollTrigger `scrub:true` |
| Header theme | section crosses header | color/fill | 0.8s easeOut | IntersectionObserver toggles `.ui-dark`/`.ui-light` |
| Section under-next | scroll | translateY 0→−100lvh (or 25lvh), opacity→0.4 | scrubbed | pin `pinSpacing:false` + scrub |
| imageMove | element in view | inner yPercent −x%→0 | scrubbed | `ParallaxImage` |
| Text appear | enters viewport | line mask slide-up, opacity | 1.6s + stagger | ScrollTrigger `once` |
| Advantages | pinned, 5×100vh | per-slide clip-path bottom→full, y 5svh→0; counter and copy swap | scrubbed | pin + timeline (md-up); stacked cards below md |
| Fitness | pinned | track translateX 0→−(w−vw) | scrubbed | pin + horizontal tween; native overflow-x below md |
| Services | pinned, 3 steps | image swap, card opacity 1↔0.3 | scrubbed | pin + timeline |
| Menu | burger click | panel clip-path inset(100% 0 0 0)→0, links stagger, burger→✕ | 0.5–0.8s easeOut | GSAP timeline; Lenis stopped while open |
| Cursor VIEW/arrows | hover over gallery/carousels | follow position, scale 0→1 | lerp 0.15, 0.4s | `Cursor` with rAF; hidden on touch |
| Hovers | pointer | link opacity and underline, outlined-button border fill | 0.4s easeOut | Tailwind transitions |

Reduced motion: no Lenis, no pins (static stack), and reveals switch to instant opacity.

**Images:** Treg via `catalog_search` → `catalog_get` for price, then generate. The set:
- hero towers ×2 (day and night)
- woman cutout (generated, then background removed into a transparent PNG)
- about building, car portrait, location cards ×4, panorama couple, architecture ×4, materials collage
- lobby and interior ×3, gallery ×6, schedule ×5, advantages ×5, fitness ×7, infrastructure ×4, park ×3, apartments portrait, services ×3, penthouses ×5, menu portrait

That's about 70 images, all sized for `next/image` and saved under `public/images/<section>/`. I'll quote the batch cost before generating and can trim duplicates, for example by reusing images across carousels.

**Build order:**
1. Scaffold and install dependencies.
2. Tokens and fonts.
3. Static layout of all sections, with gradient stand-ins until the images arrive.
4. Generate images.
5. Header, logo, preloader and intro.
6. Scroll systems: Lenis, parallax, pins, horizontal track.
7. Menu, cursor, hovers.
8. Responsive pass.

I'll also save this findings section as `docs/reference-spec.md` in the project.


## Build notes (deviations from the reference)
- Brand renamed to **VERNE N°7**; the wordmark is HTML glyphs in container-query units (`src/components/chrome/Wordmark.tsx`).
- Font: Outfit stands in for the licensed Gilroy SemiBold. Swap `next/font` in `src/app/layout.tsx` to change it.
- Locomotive Scroll → Lenis (`lerp: 0.1`); pinning uses CSS `position: sticky` with scrubbed GSAP ScrollTrigger timelines instead of Locomotive sticky.
- Not rebuilt: Barba route transitions, the gallery lightbox, video/plan modals, and section snap points.
- Hero cutout: the generated portrait was keyed out of its grey studio background with an ImageMagick flood fill.
