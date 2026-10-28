# Task 1: Design system, and proving the agent used it

## What this task was

Build a design system for AsoHub, a made-to-measure tailoring studio app. Export it as tokens, convert it to CSS with an agent, then prove the agent actually consumed it and show what happens when token referencing breaks.

## What I built

- **Business brief** (`docs/business-brief.md`).
- **Colour system in Figma:** nine palettes from approved key colours, with Primary Olive `#727C3D` pinned at tone 40, light and dark roles (66 each), and functional colours for error, warning, success and info. Contrast was checked with the WCAG formula (`docs/colour-roles.md`, `docs/contrast-table.md`).
- **Typography:** 15 styles. Source Serif 4 for Display and Headline, Source Sans for Title, Body and Label (`docs/type-scale.md`).
- **Shadows:** Soft, Medium and Hard elevation (`docs/shadows.md`).
- **Token pipeline:** Figma JSON export, then `scripts/tokens-to-css.mjs`, then `src/styles/asohub-tokens.css` (157 primitives, 132 semantic aliases, 15 type styles, 3 elevations). A checker, `scripts/check-token-usage.mjs`, fails if UI code uses primitives or raw colours.
- **Proof of consumption:** one screen built without the system (`evidence/09`) and with it (`evidence/10`), a raw-value search (`evidence/07`), and the agent's own answer about typography styles (`evidence/08`).
- **Regression test:** a branch that hardcoded one colour role and changed the brand colour (`evidence/11`, `evidence/12`). The branch commit was `41bb84f`. It was deleted without merging.
- **Prompts** are recorded verbatim in `docs/prompts.md`, including the failed attempts.

## What I decided

- **Olive over indigo.** Indigo felt corporate and technology-focused. Olive felt warm, refined and personal for tailoring. I refined the shade so white text on primary buttons clears 4.5:1.
- **Custom HSL palettes, not Material's HCT.** Tone 40 is anchored to each key colour. This is explainable and reproducible, but it is not a native Material palette.
- **Shadow colour departs from the brief.** The brief asks for shadows built from the primary colour. I used Neutral/30 (`#4C544B`) because olive tinted elevated surfaces green. Recorded in `docs/divergences.md`.
- **Section titles use Headline Small** (Source Serif 4) instead of changing the Title role. This avoided re-exporting tokens and kept the system as the single source of truth.
- **Four divergences from Material:** font family, Display Large size and tracking, Body Medium size and line height, and shadow colour. Each lists where it would be wrong (`docs/divergences.md`).

## What I got wrong

- **Primary colour contrast.** My first olive was below 4.5:1 on white. I tweaked it until it passed, and it now sits at 4.500714:1, a margin of 0.0007. A one-step change to `#727C3E` fails. I should have chosen a colour with real margin. Logged in `defects.md`, entry 3.
- **Shadow colour.** I departed from the brief's "built from the primary colour" and did not test dark mode first. In dark mode the shadows show as lighter glows because `#4C544B` is lighter than the surfaces. Logged in `defects.md`, entries 1 and 2.
- **Fonts fell back to Times New Roman.** The tokens named the families but nothing shipped the font files. I only found it by checking Rendered fonts in DevTools, and the agent could not verify it. Evidence: `evidence/font-fallback-times-new-roman.png`.
- **The `local()` alias failed.** The first fix mapped `Source Sans Pro` to a locally installed font, which I do not have, so every sans element stayed on the fallback until it used a `url()` source. Evidence: `evidence/font-fixed-source-serif-4.png` and `evidence/font-fixed-source-sans-3.png`.

## What I would build differently

1. **Shadows as token references.** The shadow colour is a fixed hex in `asohub-tokens.css` lines 384 to 386, outside the token system. I would bind it to a palette variable, set opacity separately, and add dark mode shadow tokens darker than the surface. Cost: re-export the JSON, regenerate the CSS and rerun the audits.
2. **A safer primary.** I would choose a primary with a contrast margin well above 4.5:1. Cost: a slightly different brand colour.

## Known defects

See `docs/defects.md`: shadow hex outside the token system, shadows in dark mode, thin primary-button contrast, `--color-shadow` pointing at black, a bright dark mode secondary container, and the font name mismatch.

## Evidence

`evidence/01` to `evidence/12` as named in the task, plus the font and colour-vision images. The optional walkthrough (`evidence/13`) was not recorded.

## Models and tools

Figma agent for the palette and contrast audit. Codex (GPT-5.6-Luna medium) in the Antigravity terminal for the converter, contrast audit, type scale and demo screens.