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

## Palette — LAYERED (light content + dark cinematic bands)

The real gtacars.ae is light content (inventory/services) with dark hero/footer
bands. We mirror that: **warm-light surfaces** for content, **dark cinematic
image bands** for hero / stats / CTA / footer. One brass-gold accent throughout.

**Light surfaces (default `:root`)**

| Token | Hex | Use |
|---|---|---|
| `ink` | `#F7F5F0` | warm paper — page ground |
| `coal` | `#F0EDE6` | bone — alternating section |
| `graphite` | `#FFFFFF` | cards / panels |
| `steel` | `#E8E4DB` | raised / fill / soft border |
| `ivory` | `#1A1712` | PRIMARY text / hairlines |
| `mist` | `#5A564E` | secondary text |
| `faint` | `#6E6860` | faint labels (AA-safe) |
| `gold` | `#A39030` | brass — **backgrounds, large numbers, icons** |
| `gold-deep` | `#72641E` | **small gold TEXT on light** (AA-safe) |

**Dark bands** — wrap any section in **`.band-dark`**, which locally remaps the
same tokens to a deep warm-black scheme (`ink #0C0C0D`, `ivory #F4F2EC`, brighter
`gold #C6B25C`). Because every component is token-based, it themes itself
correctly with no per-context markup. Used by: Hero, StatsBand, the /our-cars
hero band, Footer.

Source of truth: `src/styles/global.css :root` + `.band-dark`. Tokens map in
`tailwind.config.mjs`.

**Accessibility rule:** brass `gold` is for fills / large display numbers /
icons only; use `gold-deep` for any small gold text on light. All pages pass
Lighthouse a11y (contrast AA).

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
