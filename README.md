# Handoff: Kopi Kebun Bintaro — Digital Menu Site (Next.js)

## Overview
A single-page, mobile-first digital menu for **Kopi Kebun Bintaro**, an Indonesian
coffee shop / kitchen ("kebun kota" = urban garden theme). The page is a long
scrolling menu: an animated hero, a scrolling marquee, a sticky category nav that
scroll-spies the active section, a signature feature spread, drink & food category
sections (each with dotted price leaders), photo bands, a footer, and a floating
"Kategori" filter that opens a bottom sheet for quick jumping between categories.

**Target framework:** Build this as a **Next.js project** (App Router,
`app/` directory). See "Recommended Next.js structure" below.

## About the Design Files
The files in `design_reference/` are **design references created in HTML** — a
prototype showing the intended look, motion, and behavior. They are **not**
production code to copy directly.

- `kopi-kebun-bintaro-v2.html` — self-contained rendered prototype. Open it in a
  browser to see the final design and all animations. Assets are inlined.
- `source-component.dc.html` — the authoring source. **This is the most useful
  file**: it contains the exact markup, all inline styles, the animation keyframes,
  the JavaScript behaviors (parallax, scroll-spy, bottom sheet), and the **complete
  menu data** in the `rawData()` method. Read it to get exact values.
- `design_reference/img/` — all image assets (webp). Copy these into the Next.js
  `public/img/` folder.

Your task is to **recreate this design in a fresh Next.js codebase** using its
conventions (React components, CSS Modules or Tailwind — your choice), not to ship
the HTML directly.

## Fidelity
**High-fidelity (hifi).** Colors, typography, spacing, and interactions are final.
Recreate the UI pixel-perfectly. Exact hex values, fonts, and the full data model
are documented below and in `source-component.dc.html`.

## Recommended Next.js structure
```
app/
  layout.tsx        # <html>/<body>, font loading, global CSS
  page.tsx          # composes the sections in order
  globals.css       # keyframes, body reset, font-smoothing (the only global CSS)
components/
  Hero.tsx
  Marquee.tsx
  StickyNav.tsx        # 'use client' — scroll-spy
  SignatureSpread.tsx
  MenuSection.tsx      # reused for every drink & food category
  PhotoBand.tsx        # "Dari Dapur" band
  Footer.tsx
  CategoryFilter.tsx   # 'use client' — floating button + bottom sheet
lib/
  menu.ts           # the menu data (see Data Model)
public/
  img/              # copy from design_reference/img/
```
- The page is a **fixed-width mobile column** centered on screen. The root wrapper
  is `max-width: 520px; margin: 0 auto` on a dark page background — it looks like a
  phone-width strip on desktop, full-width on mobile. Keep this; it is intentional.
- Components with scroll listeners, mouse parallax, or open/close state must be
  Client Components (`'use client'`). Static sections can stay Server Components.
- Load Google Fonts via `next/font/google` (Oswald, DM Sans, Fraunces) instead of
  `<link>` tags. Expose them as CSS variables and reference in the font stacks.

## Design Tokens

### Colors
| Token | Hex | Use |
|---|---|---|
| Cream (page light bg) | `#f3ecdb` | Drinks section bg, primary light text on dark |
| Cream alt (food bg) | `#efe6d0` | Food sections bg |
| Deep green (root dark) | `#0d1812` | Body/page background behind the column |
| Green 900 | `#16241c` | Marquee, dark bands, signature bg, sheet, active pill, FAB |
| Green 800 gradient top | `#23402c` | Hero/footer radial gradient start |
| Ink (body text on cream) | `#1c3026` / `#16241c` | Item names, headings |
| Muted green | `#5e7a5f` / `#7c8a73` | Section notes, item descriptions |
| Sage (labels on dark) | `#bcd0a8` / `#cdd8bf` | Eyebrow labels, italic subcopy on dark |
| Copper / accent | `#a9783c` | Prices, "Baru" badge, sheet active pill, footer dots |
| Copper light | `#e0b27a` | Signature prices on dark |

### Typography
- **Fraunces** (serif) — display headings, section titles, italic subcopy. Weights
  400/500/600, optical sizing on. Italic used heavily for subcopy.
- **Oswald** (condensed sans) — eyebrow labels, nav pills, prices, badges. Weights
  500/600/700. Uppercase, wide letter-spacing (`0.08em`–`0.42em`).
- **DM Sans** — body / menu item names. Weights 400–700.

Representative sizes (px): hero wordmark 62 / Fraunces 500 / line-height 0.88;
section titles 34–52; big faded category numbers 120 (Fraunces 600 at ~12% opacity,
absolutely positioned top-right of each section); item name 15.5; price 15.5;
description 12.5 italic; eyebrow labels 10–11 Oswald uppercase.

### Other
- Border radius: pills `999px`; badges `3px`; bottom sheet `20px 20px 0 0`.
- Dotted price leader: a flex row `[name] [flex:1 dotted border-bottom] [price]`,
  the leader nudged up `transform: translateY(-4px)`.
- Shadows: drink photos `drop-shadow(0 20px 24px rgba(20,32,22,0.28))`; column
  `box-shadow: 0 0 70px rgba(0,0,0,0.5)`; FAB `0 10px 26px rgba(13,24,18,0.42)`.

## Screens / Views
Single scrolling page, top → bottom:

1. **Hero** (`height:100vh; min-height:660px`) — radial-gradient dark green bg.
   Contains: top bar (cream logo left, "BINTARO" label right); centered bean logo
   with two rising **steam** wisps and a slow **breathe** scale animation; eyebrow
   "EST · KEBUN KOTA"; "Kopi Kebun" wordmark; italic tagline; a **crossfading
   floating drink** (three images: signature / mocktail / coffeelatte cycling via
   `kk-fade` 13.5s, each also floating via `kk-float`); four **falling leaf**
   particles; a **mouse-parallax** effect (layers with `data-depth` translate on
   mousemove, plus a radial spotlight following the cursor); a bobbing scroll cue.
2. **Marquee** — dark green strip, one line of menu keywords separated by ✦,
   scrolling left infinitely (duplicated span, `kk-marquee` 32s linear).
3. **Sticky Nav** — sticky top pill bar, horizontally scrollable, one pill per
   category. Active pill is filled dark green; others outlined. Scroll-spy sets the
   active pill and auto-scrolls it into view.
4. **Signature Spread** — dark green feature section (`height:560px`) with the
   signature drink photo floating at top, gradient fade to dark at bottom, "No. 01 —
   Speciality" eyebrow, big "Signature" title, two dotted price rows, italic note.
5. **Drinks** (`bg:#f3ecdb`) — one `MenuSection` per drink category (coffee,
   manualbrew, coldbrew, bottle, tea, noncoffee, mocktail). Some have a centered
   floating product photo with a soft radial halo; mocktail shows a "Baru" badge.
6. **Photo Band "Dari Dapur"** — full-bleed dimsum photo (`height:440px`) with a
   slow **pan/zoom** (`kk-pan`), dark gradient overlays top & bottom, heading
   "Gigitan kecil, sepanjang hari" and italic subcopy.
7. **Food** (`bg:#efe6d0`) — one `MenuSection` per food category (hotsnack,
   noodles, rice, burger, extra).
8. **Footer** — radial dark-green gradient, cream logo, italic "Sampai jumpa lagi
   di kebun.", three copper dots, uppercase handle line.
9. **Floating Filter** — fixed "Kategori" FAB bottom-right (aligned to the 520px
   column). Tapping opens a **bottom sheet** (slide up, backdrop fade) with a grab
   handle, title, close ×, and a wrapped grid of category pills. Tapping a pill
   smooth-scrolls to that section and closes the sheet. Active pill is copper.

## MenuSection component (the workhorse)
Props: `id`, `num` (e.g. "02"), `name`, optional `note`, optional `photo`,
optional `isNew`, `items[]`. Each item: `name`, optional `desc`, `price`.
Layout per section: `padding:46px 24px 32px; border-top:1px solid rgba(44,74,55,.10)`;
a large faded `num` absolutely top-right; title row (Fraunces 34px + optional copper
"Baru" badge); optional italic note; optional centered floating photo with radial
halo; then the item list — each item is the dotted-leader row plus an optional
italic description below.

## Interactions & Behavior
- **Scroll-spy** (client): on scroll (rAF-throttled), find the last `[data-sec]`
  whose top is above `scrollY + 160`; set it active; smooth-scroll its nav pill to
  nav center. In Next.js use a ref-based effect with `IntersectionObserver`
  (preferred) or replicate the scroll math.
- **Nav / sheet click**: smooth-scroll to `section.top + scrollY - 116` (nav offset).
- **Bottom sheet**: `filterOpen` boolean. Sheet `translateY(100%)`→`0`
  (`transition .35s cubic-bezier(.2,.7,.3,1)`); backdrop opacity 0→1; FAB hidden
  while open. Close via backdrop, ×, or after a pill jump.
- **Hero parallax** (client, pointer devices): on mousemove over the hero, translate
  each `.kk-par` layer by `depth * normalizedCursor`, and move a radial spotlight to
  the cursor; reset on mouseleave.
- **Keyframe animations** (put in `globals.css`): `kk-breathe`, `kk-leaf`,
  `kk-steam`, `kk-float`, `kk-floatsoft`, `kk-glow`, `kk-marquee`, `kk-pan`,
  `kk-bob`, `kk-fade` — copy exact definitions from `source-component.dc.html`
  `<style>` block.
- Respect `prefers-reduced-motion`: consider disabling the looping animations.

## State Management
Local component state only — no server data, no fetching.
- `active: string` — current category id (drives nav + sheet active pill).
- `filterOpen: boolean` — bottom sheet visibility.
Everything else is static menu data imported from `lib/menu.ts`.

## Data Model
The **complete menu data** is in `source-component.dc.html` → `rawData()`. Port it
verbatim into `lib/menu.ts` as a typed array. Shape:
```ts
type MenuItem = { name: string; desc?: string; price: string };
type Category = {
  id: string; name: string; nav: string;
  note?: string; photo?: string; isNew?: boolean;
  items: MenuItem[];
};
```
Category order (drives numbering 01–14): signature, coffee, manualbrew, coldbrew,
bottle, tea, noncoffee, mocktail, hotsnack, noodles, rice, burger, extra.
- Drinks group: coffee, manualbrew, coldbrew, bottle, tea, noncoffee, mocktail.
- Food group: hotsnack, noodles, rice, burger, extra.
- `signature` is rendered by the Signature Spread, not a normal MenuSection.
- `num` is derived: index in the full ordered list, `String(i+1).padStart(2,'0')`.
- Prices are strings ("27K", "40 / 75K", "18–24K"). Footer notes prices are in
  thousands of Rupiah (K). Keep the exact strings.

## Assets
All in `design_reference/img/` → copy to `public/img/`:
- Logos: `logo-cream.webp`, `logo-bean.webp`, `logo-green.webp`
- Drinks/hero: `signature.webp`, `signaturedark.webp`, `mocktail.webp`,
  `coffeelatte.webp`, `coffee.webp`, `coldbrew.webp`, `tea.webp`, `manualbrew.webp`,
  `noncoffee.webp`
- Food: `bread.webp`, `dimsum.webp`, `noodles.webp`, `rice.webp`, `platter.webp`
Use `next/image` where practical (product photos, band). Note several images are
transparent-background product cutouts meant to float with drop-shadows.
All copy is Indonesian — keep it exact.

## Files
- `design_reference/source-component.dc.html` — authoritative markup + styles +
  behavior + full data. **Start here.**
- `design_reference/kopi-kebun-bintaro-v2.html` — open in browser for the live look.
- `design_reference/img/` — image assets.
