# Style Guide — GTA Cars Dubai

A cinematic, dark-luxury 2026 build for a Dubai pre-owned car **dealer**.
Buy + Sell under one roof. Inventory platform like a flagship showroom; a
strong **Sell Your Car** flow as the primary entry point. Not a rental.

## Logo colours (pixel-extracted)

`public/logo.png` (1500×800, transparent). Dominant cluster — a muted
**brass / olive-gold**:

| Read | Hex | RGB | Use |
|---|---|---|---|
| Logo core (most frequent ~390px) | `#AB9C34` | 171 156 52 | `gold-deep` — logo-true, borders/hover |
| Accent (bright) | `#C2AE4A` | 194 174 74 | `gold` — prices, CTAs, eyebrows |
| Highlight | `#DCCB72` | 220 203 114 | `gold-lite` — shimmer/hover |

The logo is gold-on-transparent → sits directly on the dark canvas. **Logo
pixel-analysis has priority** and confirmed the dark+brass direction the old
site already used.

## Palette (cinematic dark)

| Token | Hex | Use |
|---|---|---|
| `ink` | `#0A0A0B` | page ground |
| `coal` | `#121214` | alternating section |
| `graphite` | `#18181B` | cards / panels |
| `steel` | `#232327` | raised / fill / borders |
| `ivory` | `#F4F2EC` | primary text |
| `mist` | `#B4AFA4` | secondary text |
| `faint` | `#7C786F` | faint labels |
| `gold` | `#C2AE4A` | accent — used **sparingly** (AED prices, CTAs, hairlines) |

Source of truth: `src/styles/global.css :root` (RGB triplets for Tailwind
alpha). Tokens map in `tailwind.config.mjs`.

## Type

- **Display:** Sora 600/700 — architectural, modern, suits machinery & AED
  prices. Self-hosted, `font-display: optional` (CLS ≈ 0).
- **UI / specs / prices:** Inter Variable. Tabular numerals for AED.

## ★ Mobile rule (non-negotiable)

Vehicle grids: **`grid-cols-1`** on mobile → `sm:grid-cols-2` →
`lg:grid-cols-3`. **Never two cars side-by-side on a phone** — one full-width
card, then the next. Applies to inventory, highlights, similar, previously
sold, and the specialist contact cards. Build & test mobile-first at 390px.

## Voice

Souverän, knapp, serviceorientiert, vertrauensbildend — English (Dubai /
international). Verbatim trust language is welcome: *"fair, friendly and
efficient"*, *"no hidden or unexpected fees"*, *"under one roof"*, *"no
obligation"*, *"Creating a 5-Star Customer Experience"*. No market-shouting,
no invented stats, no "Where cars meet passion" cringe.

## Motion

Dezent. Lenis + GSAP scrub parallax on hero/section imagery; IntersectionObserver
reveals. All gated on `html.js` and disabled under `prefers-reduced-motion`.
Hero headline is transform-only (LCP-safe), never fade-in.

## Components

Reused dark system: `.btn-gold`, `.btn-primary`, `.btn-dark`, `.card`,
`.eyebrow`, `.cat-pill`, `.chip`, `.rule-gold`. Lucide icons only (no emojis).
WhatsApp persistent button + per-specialist call/WhatsApp.
