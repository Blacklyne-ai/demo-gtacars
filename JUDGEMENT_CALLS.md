# Judgement Calls & Operator-TODOs — GTA Cars Dubai

This is a demo redesign built from a verbatim scrape of **gtacars.ae**
(2026-06). Real logo, real brand colours, real inventory + prices, real
copy. The items below need the operator (GTA Cars) to confirm before go-live.

## Operator-TODOs (must confirm)

1. **Exact showroom address(es) + Google Place-ID.** gtacars.ae does **not**
   publish a street address (the contact page, footer and `locations.kml`
   have none). Third-party listings (Yandex/HiDubai/DubaiLocal) place GTA
   Cars in **Al Quoz, Dubai** across multiple showrooms (the press release
   names a third showroom in Al Quoz 3, ~10,000 sq ft). We show **"Al Quoz,
   Dubai"** as area only and a `mapQuery` search embed — confirm the exact
   unit(s) and Place-ID for a pinned map + real Google reviews badge. **No
   reviews are shown** (none verified) — do not fabricate.

2. **Email.** `info@gtacars.ae` (decoded from the Cloudflare-obfuscated
   contact page). Confirm this is the right inbound address.

3. **Inventory data source for production.** The demo ships a curated
   **snapshot of ~70 real vehicles** (one JSON per car in `src/content/cars`,
   images optimised to WebP in `public/images/cars`). The live site has 700+
   listings via WordPress + JetEngine. For production, couple the content
   collection to a feed (WP REST / headless export) or keep a maintained
   snapshot. Prices, specs and photos are all real as scraped.

4. **Form backends (no backend wired).** The **Sell**, **Consignment**,
   **Part Exchange** and **Finance** forms are front-end only. Decide where
   leads go — email, WhatsApp, or CRM (GHL etc.) — and wire the action.
   Currently each form’s primary CTA also routes to WhatsApp/phone so no lead
   is lost.

5. **Social profiles.** We use the **correct** `instagram.com/gtacars.ae`
   and `facebook.com/gtacars.ae`. The OLD site’s footer "CONNECT" block linked
   to **"BlacklineMotorCompany"** Facebook/Instagram — that looks like a
   leftover template error and was **deliberately NOT carried over**. Confirm.

6. **Trade Licence / legal entity** for the footer + Privacy/Terms
   (Dubai DED licence number, registered name). Placeholder legal copy is
   marked in `/privacy` and `/terms`.

7. **Finance terms.** "Flexible repayment terms up to 5 years" and "low down
   payment / competitive rates" are verbatim marketing. **No specific rate or
   APR is invented.** Actual rates are bank-confirmed on application.

8. **Phone numbers.** Header line `+971 58 512 1860` (WhatsApp + call) and
   landline `+971 4 3233 216` are from the site. The five **purchasing
   specialists** (Alex, Talat, Aqeel, Levan, Mina) and their direct numbers
   are verbatim from the Sell page.

9. **"Hundreds of years combined experience" / "100+ years" / "thousands of
   followers" / "three luxury showrooms" / "four showrooms"** — carried over
   **only as verbatim marketing copy**, not asserted as audited fact (the
   About and Consignment pages use both "three" and "four" — operator to
   reconcile).

10. **Hero film.** No customer hero clip was supplied. The hero uses a real
    inventory still (Ken-Burns drift). Swap in a supplied showroom/drive clip
    if available.

## Build judgement calls

- **Dark + brass** confirmed by logo pixel-analysis (`#AB9C34` core) and the
  old site’s own dark/gold styling. Direction kept, execution modernised.
- **Brand vs make:** "Range Rover" is kept as its own filter make (how buyers
  search), separate from "Land Rover". Mercedes variants normalised to
  "Mercedes-Benz".
- **Card name** = first comma-segment of the verbatim title with the leading
  model-year stripped; the full verbatim title is preserved on the detail page.
- **Descriptions:** where a listing had no prose, an **honest spec-only**
  sentence is synthesised from real fields (year/specs/mileage/service history)
  — no marketing invented.
- **No Arabic** version yet (site is EN-only) — Operator-TODO if wanted.
- **No cookie tracking**: only first-party localStorage (saved cars). The old
  site loaded GTM/Meta Pixel — those are **not** included; add behind consent.
