# Colour roles

## Brand colour: where it came from

Indigo was the first option. It communicates trust, professionalism and reliability. As AsoHub's identity developed, indigo gave the product a more corporate and technology-focused look than intended.

AsoHub serves the tailoring and fashion industry, so the brand needed to feel warm, elegant, approachable and trustworthy. Olive green fit that direction. It has an understated, earthy quality that suits craftsmanship and the personal experience of tailoring.

The primary colour is Primary Olive (`#727C3D`). It gives AsoHub a distinctive identity while staying professional. The shade was refined so white text on primary buttons meets the WCAG AA requirement of 4.5:1. It measures **4.500714:1**, which passes with almost no margin (see "Low-margin pairs").

Other key colours:

| Key colour | Hex | Why |
| --- | --- | --- |
| Secondary: Warm Coffee | `#D4B483` | A warm, soft accent that complements olive and gives the interface a fabric-inspired quality without competing with primary actions. |
| Tertiary: Muted Teal | `#527D78` | A cooler counterbalance to olive and coffee that keeps the palette understated and cohesive. |
| Success | `#159B5B` | Communicates successful payments and completed orders. It is a more saturated emerald green than brand olive. |
| Error | `#E5484D` | Signals validation errors, failed actions and issues needing correction. |
| Warning | `#EA741D` | Signals caution and attention needed, such as approaching deadlines. It is distinct from errors. |
| Info | `#2F80ED` | Marks informational notices and guidance without suggesting success or failure. |

The two accent explanations are design rationale, not findings from user testing. The hex values are verified against the exported primitives in `06-tokens-complete.json`.

## Palette method

The palettes use a custom **HSL interpolation**, not Material's HCT algorithm. For each palette, the approved key colour's hue and saturation are retained. Lightness is interpolated from black at tone 0 to the key colour's lightness at tone 40, and from tone 40 to white at tone 100. Values are converted to RGB, rounded to whole-number channels and written as hex.

Tone 40 is anchored to the key colour so palette regeneration preserves the approved brand and functional colours. Primary/40 is `#727C3D`, identical to the Primary Key Color in the export.

This adopts Material's tonal naming conventions but **does not reproduce Material's HCT algorithm**. The difference should be reported honestly if the assessment specifically expects Material Theme Builder or HCT.

## Before and after pinning

- **Before pinning:** Primary/40 in `evidence/01-palette-before-pin.png` was `#7E8943`, not the approved `#727C3D`. The first generated palette had a tone-40 mismatch, as identified during the Figma Agent workflow.
- **After pinning:** Every palette's tone 40 was regenerated to equal its approved key colour. Primary/40 is exactly `#727C3D`, and the other tones were rebuilt around it (`evidence/02-palette-after-pin.png`).

The practical difference is that the before-pin reference did not reliably preserve the approved colour at tone 40. The after-pin system makes the selected colour the explicit anchor. This account reflects the Figma workflow, not a claim that Material's HCT pinning tool was used.

## Tones

Eight palettes (Primary, Secondary, Tertiary, Neutral Variant, Error, Success, Warning and Info) have **14 tones** each:

`0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 95, 98, 99, 100`.

Neutral has **24 tones**, because ten additional tones (`4, 6, 12, 17, 22, 24, 87, 92, 94, 96`) were added for Material-style surface roles.

The complete export therefore has **157 primitives**: 136 palette tones (8 × 14 + 24), 9 key colours and 12 exact light and dark theme-foundation colours. These counts were verified directly from `06-tokens-complete.json`, not inferred from screenshots or CSS.

One set of tone palettes supports both theme modes through different semantic aliases. For example, Light Mode Primary points to Primary/40, while Dark Mode Primary points to Primary/80. The action button intentionally keeps Primary/40 with white text in both modes.

## Roles

A role names a UI function rather than a particular hex colour. Application components should reference **semantic roles** such as `--color-primary` and `--color-on-surface` instead of directly using primitive palette values. Primitive tokens remain the source of the role values. The export has **66 semantic roles in each of two modes**, and all 132 mode-specific aliases resolve to existing primitives.

The table below is generated directly from the actual Light and Dark mappings in `06-tokens-complete.json`. The paths are relative to the JSON's `primitives` object. For example, `color palettes/primary/40` represents the primitive Primary tone 40. `action/primary` is a grouped role in the JSON.

| Role | Light Mode primitive alias | Dark Mode primitive alias |
| --- | --- | --- |
| `primary` | `color palettes/primary/40` | `color palettes/primary/80` |
| `on primary` | `color palettes/primary/100` | `color palettes/primary/20` |
| `primary container` | `color palettes/primary/90` | `color palettes/primary/30` |
| `on primary container` | `color palettes/primary/10` | `color palettes/primary/90` |
| `secondary` | `color palettes/secondary/40` | `color palettes/secondary/80` |
| `on secondary` | `color palettes/secondary/10` | `color palettes/secondary/20` |
| `secondary container` | `color palettes/secondary/90` | `color palettes/secondary/30` |
| `on secondary container` | `color palettes/secondary/10` | `color palettes/secondary/0` |
| `tertiary` | `color palettes/tertiary/40` | `color palettes/tertiary/80` |
| `on tertiary` | `color palettes/tertiary/100` | `color palettes/tertiary/20` |
| `tertiary container` | `color palettes/tertiary/90` | `color palettes/tertiary/30` |
| `on tertiary container` | `color palettes/tertiary/10` | `color palettes/tertiary/90` |
| `error` | `color palettes/error/40` | `color palettes/error/80` |
| `on error` | `color palettes/error/0` | `color palettes/error/20` |
| `error container` | `color palettes/error/90` | `color palettes/error/30` |
| `on error container` | `color palettes/error/10` | `color palettes/error/90` |
| `success` | `color palettes/success/40` | `color palettes/success/80` |
| `on success` | `color palettes/success/0` | `color palettes/success/20` |
| `success container` | `color palettes/success/90` | `color palettes/success/30` |
| `on success container` | `color palettes/success/10` | `color palettes/success/90` |
| `warning` | `color palettes/warning/40` | `color palettes/warning/80` |
| `on warning` | `color palettes/warning/10` | `color palettes/warning/20` |
| `warning container` | `color palettes/warning/90` | `color palettes/warning/30` |
| `on warning container` | `color palettes/warning/10` | `color palettes/warning/98` |
| `info` | `color palettes/info/40` | `color palettes/info/80` |
| `on info` | `color palettes/info/0` | `color palettes/info/20` |
| `info container` | `color palettes/info/90` | `color palettes/info/30` |
| `on info container` | `color palettes/info/10` | `color palettes/info/90` |
| `background` | `theme/light/background` | `theme/dark/background` |
| `surface` | `theme/light/surface` | `theme/dark/surface` |
| `subtle surface` | `theme/light/subtle surface` | `theme/dark/subtle surface` |
| `on surface` | `theme/light/on surface` | `theme/dark/on surface` |
| `secondary text` | `theme/light/secondary text` | `theme/dark/secondary text` |
| `divider` | `theme/light/divider` | `theme/dark/divider` |
| `on background` | `theme/light/on surface` | `theme/dark/on surface` |
| `surface variant` | `color palettes/neutral variant/90` | `color palettes/neutral variant/30` |
| `on surface variant` | `color palettes/neutral variant/30` | `color palettes/neutral variant/80` |
| `outline` | `color palettes/neutral variant/50` | `color palettes/neutral variant/60` |
| `outline variant` | `color palettes/neutral variant/80` | `color palettes/neutral variant/30` |
| `action/primary` | `color palettes/primary/40` | `color palettes/primary/40` |
| `action/on primary` | `color palettes/primary/100` | `color palettes/primary/100` |
| `primary fixed` | `color palettes/primary/90` | `color palettes/primary/90` |
| `primary fixed dim` | `color palettes/primary/80` | `color palettes/primary/80` |
| `on primary fixed` | `color palettes/primary/10` | `color palettes/primary/10` |
| `on primary fixed variant` | `color palettes/primary/30` | `color palettes/primary/30` |
| `secondary fixed` | `color palettes/secondary/90` | `color palettes/secondary/90` |
| `secondary fixed dim` | `color palettes/secondary/80` | `color palettes/secondary/80` |
| `on secondary fixed` | `color palettes/secondary/10` | `color palettes/secondary/10` |
| `on secondary fixed variant` | `color palettes/secondary/20` | `color palettes/secondary/20` |
| `tertiary fixed` | `color palettes/tertiary/90` | `color palettes/tertiary/90` |
| `tertiary fixed dim` | `color palettes/tertiary/80` | `color palettes/tertiary/80` |
| `on tertiary fixed` | `color palettes/tertiary/10` | `color palettes/tertiary/10` |
| `on tertiary fixed variant` | `color palettes/tertiary/30` | `color palettes/tertiary/30` |
| `inverse surface` | `color palettes/neutral/20` | `color palettes/neutral/90` |
| `inverse on surface` | `color palettes/neutral/95` | `color palettes/neutral/20` |
| `inverse primary` | `color palettes/primary/80` | `color palettes/primary/30` |
| `scrim` | `color palettes/neutral/0` | `color palettes/neutral/0` |
| `shadow` | `color palettes/neutral/0` | `color palettes/neutral/0` |
| `surface tint` | `color palettes/primary/40` | `color palettes/primary/80` |
| `surface dim` | `color palettes/neutral/87` | `color palettes/neutral/6` |
| `surface bright` | `color palettes/neutral/98` | `color palettes/neutral/24` |
| `surface container lowest` | `color palettes/neutral/100` | `color palettes/neutral/4` |
| `surface container low` | `color palettes/neutral/96` | `color palettes/neutral/10` |
| `surface container` | `color palettes/neutral/94` | `color palettes/neutral/12` |
| `surface container high` | `color palettes/neutral/92` | `color palettes/neutral/17` |
| `surface container highest` | `color palettes/neutral/90` | `color palettes/neutral/22` |

**Role versus effect-style shadow.** The `shadow` colour role maps to Neutral/0 in both modes. This is different from the three reusable elevation Effect Styles, which use a fixed `#4C544B` (Neutral/30) with their own transparency. The two are not linked. See `shadows.md` and `defects.md`.

Roles not intended as ordinary text colours include `divider`, `outline`, `outline variant`, `scrim`, `shadow` and `surface tint`. Their contrast requirements depend on actual UI use.

## Contrast

Method: WCAG sRGB relative luminance. Normalise each 8-bit RGB channel by dividing by 255. Linearise each channel (`c/12.92` when `c ≤ 0.04045`, otherwise `((c + 0.055)/1.055)^2.4`). Weight linear R, G and B by 0.2126, 0.7152 and 0.0722 to calculate relative luminance. The contrast ratio is `(lighter + 0.05) / (darker + 0.05)`.

The relevant WCAG AA thresholds are **4.5:1 for normal text** and **3:1 for large text**. Certain essential non-text indicators also require 3:1 against adjacent colours.

Worked example, white on `#727C3D`:

| Channel | 0 to 255 | Normalised | Linear |
| --- | ---: | ---: | ---: |
| Red | 114 | 0.447059 | 0.168269 |
| Green | 124 | 0.486275 | 0.201556 |
| Blue | 61 | 0.239216 | 0.046665 |

Olive luminance = `0.2126 × 0.168269 + 0.7152 × 0.201556 + 0.0722 × 0.046665 ≈ 0.183296`.
Contrast = `(1.0 + 0.05) / (0.183296 + 0.05) = 4.500714:1`.

The audit script is `scripts/audit-contrast.mjs`, run with `node
