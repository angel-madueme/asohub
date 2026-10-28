# Divergences
# Divergences from the Material 3 Baseline

Material 3 uses a five-role, three-size typography structure. AsoHub retains that structure while making deliberate changes to support its fashion-inspired identity, mobile usability and content requirements.

Decisions 1, 2, 3 and 5 modify Material 3 typography defaults. Decision 4 is a separate departure from the assessment brief's shadow-colour requirement.

## 1. Font Family

**Default.** Material 3 uses Roboto across its baseline typography roles, with different weights depending on the style.

**Chosen.** Source Serif 4 (600) for Display and Headline. Source Sans Pro for Title (600), Body (400) and Label (600).

**Why.** Serif headlines provide the refined, editorial quality wanted for a tailoring platform. The sans-serif supports measurement forms, payment details, order statuses and buttons, where clarity and readability matter more than decorative expression.

**Where this is wrong.** In dense dashboards or narrow layouts, the semibold serif may feel visually heavy or take more space. A staff interface dominated by long tables could benefit from a single sans-serif family. Two font families also increase font loading and network requests, which matters for customers on intermittent mobile connections.

## 2. Display Large Size and Letter Spacing

**Default.** Material 3 Display Large uses 57px with -0.25px letter spacing.

**Chosen.** AsoHub uses 48px with -0.60px letter spacing.

**Why.** Display Large was reduced from 57px to 48px to keep headlines expressive without being excessively prominent on narrow mobile screens. Tighter tracking creates a more compact, visually connected serif headline.

The comparison is in `evidence/03-spacing-default.png` and `evidence/04-spacing-chosen.png`.

**What the comparison showed.** Both versions keep the headline "Thoughtfully tailored. Beautifully made." on a single line. The chosen -0.60px tracking brings the characters closer together, making the headline slightly more compact than the -0.25px version without changing its wording or overall layout. At 100% zoom, the letters did not touch at -0.60px, so the spacing remained readable in the tested sample.

**Where this is wrong.** Tighter tracking can reduce readability on smaller text or on typefaces that already have narrow character spacing. For this reason, -0.60px is specific to Display Large, and the smaller typography styles use their own, generally gentler tracking values. It should also be reconsidered for unusually long headings or text with letter combinations that become crowded.

## 3. Body Medium Size and Line Height

**Default.** Material 3 Body Medium uses 14px with a 20px line height.

**Chosen.** AsoHub uses 16px with a 25.6px line height (1.6x).

**Why.** Customers read instructions, measurement notes and payment explanations on mobile devices, sometimes in bright daylight. The larger size and more generous line height are intended to improve legibility and make longer instructions easier to follow.

**Where this is wrong.** This treatment uses more vertical space. In dense staff dashboards, tables or long lists, it may reduce the number of visible rows and require more scrolling. Body Small or a more compact treatment may suit those contexts better.

## 4. Shadow Colour

**What the brief required.** Three elevation shadows built from AsoHub's primary brand colour, Primary Olive (`#727C3D`).

**What was chosen.** Neutral/30 (`#4C544B`) for Soft (10%), Medium (16%) and Hard (24%).

**Why.** The elevation system should create subtle depth without adding too much green to the interface. Olive shadows would introduce a stronger brand-coloured tint that could compete visually with olive primary actions.

Conventional black shadows were also considered, and the softer, more balanced appearance of Neutral/30 against AsoHub's warm surfaces was preferred. Neutral/30 was selected to complement the approved palette. It is not mathematically derived from Primary Olive.

This decision was based on visual judgement, not a documented side-by-side comparison of olive, black and Neutral/30 shadows.

**Where this is wrong.**

- **When elevation should reinforce brand identity.** A primary-coloured shadow connects elevated elements more directly to the brand, while Neutral/30 is less distinctive.
- **In dark mode.** Neutral/30 is lighter than the dark background (`#181C16`) and card surface (`#252B22`). In the 100% Figma inspection, Soft was barely visible, Medium produced a faint light halo, and Hard created a broader, more noticeable glow. The levels were only weakly distinguishable, particularly Soft and Medium. Much of the card separation came from the lighter surface, not the shadows. See `shadows.md`.
- **When strict compliance with the brief is required.** The chosen colour does not meet the explicit instruction to build shadows from the primary colour. Documenting the divergence does not remove that compliance risk.

**Trade-off.** Subtle, neutral-looking elevation was prioritised over stronger brand expression, accepting both the departure from the brief and the limitations seen in dark mode.

**Future improvement.** Explore theme-specific elevation, using tonal surface differences as the main depth indicator in dark mode instead of reusing the same shadow styles in both themes.

## 5. Display Line Height

**Default.** Material 3 Display Large uses a 64px line height at a 57px font size.

**Chosen.** AsoHub uses a 1.4x multiplier, giving a 67.2px line height at 48px.

**Why.** 1.4x gives Source Serif 4 enough vertical space for its letterforms while keeping the editorial headline cohesive.

The next permitted multiplier, 1.5x, gives 72px. That adds 4.8px between line baselines compared with 1.4x, making multiline headings taller and pushing later content further down on small screens.

AsoHub's Display Large font size is smaller than Material's, yet its 67.2px line height is slightly greater than Material's 64px. This reflects the more generous proportional spacing chosen for the serif typeface.

The assessment sets 1.4x as the lowest multiplier, so no tighter option was used.

**Where this is wrong.** 1.4x can still leave excessive vertical space for headings with several lines in narrow layouts. For single-line headings, the setting affects the line box and surrounding layout, but there is no interline gap to judge. In a denser interface a tighter line height might be preferable, but that falls outside the assessment's permitted range.

Line height controls vertical spacing. Whether a heading wraps depends mainly on available width, font metrics, font size and letter spacing.