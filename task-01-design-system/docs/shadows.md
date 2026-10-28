# Shadows

## Specification

| Style  | Colour    | X | Y  | Blur | Spread | Opacity |
| ------ | --------- | - | -- | ---- | ------ | ------- |
| Soft   | `#4C544B` | 0 | 2  | 8    | 0      | 10%     |
| Medium | `#4C544B` | 0 | 8  | 20   | -2     | 16%     |
| Hard   | `#4C544B` | 0 | 16 | 32   | -4     | 24%     |

All dimensions are in pixels.

## Use

- Soft: raised cards.
- Medium: floating menus and popovers.
- Hard: dialogs and prominent overlays.

## Colour decision

The brief asks for shadows built from the primary colour (olive `#727C3D`). AsoHub uses Neutral/30 (`#4C544B`) instead. The neutral colour was selected to complement the brand palette, allowing the shadows to remain visually consistent with AsoHub without using the primary tone. This departs from the brief and is recorded in `divergences.md`.

Neutral/30 avoids introducing an overly green tint into elevated elements, which could compete with olive primary actions. Black shadows were also considered, and the softer appearance of Neutral/30 against AsoHub's warm surfaces was preferred. This was a visual design judgement, not a documented side-by-side test of all three colours.

## Brand colour against black

A shadow built from a brand colour tints the shaded area toward the palette, so depth feels more integrated with the design's visual identity. A black shadow creates a more conventional neutral-looking depth effect, but at similar opacity it can appear heavier and harsher against warm surfaces.

## Elevation hierarchy

Opacity rises from 10% to 16% to 24%, while vertical offset and blur increase at each level, creating a progressive elevation hierarchy. Negative spread on Medium (-2px) and Hard (-4px) keeps the larger, blurrier shadows from extending too widely around components.

## Dark mode

All three shadow styles were tested in Figma at 100% zoom on a dark background (`#181C16`) with identical cards using a surface colour of `#252B22`.

The Soft shadow was barely visible, appearing as a faint, narrow lighter edge beneath the card. Medium produced a subtle, wider light halo around the lower edges. Hard created a broader, more noticeable diffuse glow below and beside the card.

The three levels were distinguishable side by side, but only weakly, particularly between Soft and Medium. Most of the card separation came from the surface being lighter than the background, not from the shadows.

None of the shadows produced a conventional darkening effect. They appeared as lighter halos, which is unsuitable for natural-looking dark mode elevation.

The cause is the shadow colour. `#4C544B` is lighter than both the dark background and the card, so the shadow lightens the surface instead of darkening it. A dark mode shadow needs a colour darker than the surface it falls on.

Future improvement: rely more on tonal surface differences, and add separate dark mode shadow treatments.

**Evidence:** `evidence/shadow-dark-mode-test.png` (export of the Figma frame `10 — Dark Mode Shadow Test`, inspected at 100% zoom).

## Limitation

The three shadows are reusable Figma Effect Styles with a fixed hex value. Binding the Neutral/30 variable directly overrode the intended opacity settings, so the exact hex was used instead.

A change to Neutral/30 will not update the shadows automatically. The Effect Styles must be edited by hand. The exported shadow tokens and the generated CSS also hold the fixed hex, so the CSS must be regenerated when the shadow colour changes.

The dark mode test also showed that the current shadows give limited elevation differentiation and appear as lighter glows. Both issues are recorded in `defects.md`.

The opacity, blur and spread values are visual judgements. They were not derived from user testing.