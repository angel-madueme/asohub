# Defects

## 1. Shadow colour is a hardcoded hex, not a token reference
Severity: Medium
Where: `task-01-design-system/src/styles/asohub-tokens.css`, lines 384 to 386, and the Soft, Medium and Hard Effect Styles in Figma.
Finding: `--elevation-soft`, `--elevation-medium` and `--elevation-hard` hold `#4c544b` plus an alpha value directly (`1a`, `29` and `3d`, which are 10%, 16% and 24%). Every semantic colour role uses `var(--ref-color-...)`. The shadows do not. Binding the Neutral/30 variable in Figma overrode the opacity, so the hex was used.
Cost in production: A palette change leaves shadows on the old colour while everything else follows. This is the failure the Step 8 regression demonstrates.
Fix: Bind the colour variable in Figma and set opacity separately, or have the converter write shadow colours as `color-mix()` or `rgb(from var(...) r g b / alpha)`.
Status: Not fixed.

## 2. Shadows read as lighter glows in dark mode
Severity: Medium
Where: `task-01-design-system/src/styles/asohub-tokens.css`, lines 384 to 386 (the same three tokens apply in both themes), and `docs/shadows.md`.
Finding: `#4C544B` is lighter than the dark background `#181C16` and the card `#252B22`, so the shadows lighten the surface. Soft, Medium and Hard are weakly distinguishable.
Cost in production: Dark mode menus, popovers and dialogs look flat or glowing, and elevation is unclear.
Fix: Add dark mode elevation tokens with a colour darker than the surface, or use lighter surface tones for elevation.
Status: Not fixed. Evidence: `evidence/shadow-dark-mode-test.png`.

## 3. Primary button contrast has almost no safety margin
Severity: Medium
Where: `task-01-design-system/src/styles/asohub-tokens.css`. Primary/40 is line 19. `--color-primary` and `--color-on-primary` are lines 167 and 168 (light). `--color-action-primary` and `--color-action-on-primary` are lines 206 and 207 (light) and 274 and 275 (dark).
Finding: White (`primary-100`) on `#727C3D` (`primary-40`) measures 4.500714:1 against the AA minimum of 4.5:1. Changing the blue channel by one step, to `#727C3E`, drops it to about 4.4986:1 and fails. The action button pair does not change in dark mode, so the thin margin applies in both themes.
Cost in production: A small palette edit can fail AA on every primary button, in both themes, without anyone noticing.
Fix: Preserve the exact hex, add an automated contrast check to the converter, and re-run it after every palette change.
Status: Passes today. Regression risk remains.

## 4. `--color-shadow` points at pure black
Severity: Low
Where: `task-01-design-system/src/styles/asohub-tokens.css`, lines 224 (light) and 292 (dark). The target, `neutral-0`, is `#000000ff` at line 113.
Finding: The role `--color-shadow` resolves to black. The elevation tokens (lines 384 to 386) ignore it and use `#4c544b` with alpha. The system holds two shadow colours that disagree.
Cost in production: A developer who reads the role name will use black shadows, which contradicts the approved shadow colour.
Fix: Point the role at the approved shadow colour, or remove it if the elevation tokens are the only shadow source.
Status: Not fixed.

## 5. Dark mode secondary container is bright, and its text role breaks the pattern
Severity: Low
Where: `task-01-design-system/src/styles/asohub-tokens.css`, line 242 (`--color-on-secondary-container` points at `secondary-0` in dark mode), line 32 (`secondary-30` is `#be8d43ff`). Light mode is line 174.
Finding: In dark mode, `on-secondary-container` is black (`#000000`) on `#BE8D43`, a ratio of 7.080:1. It passes AA. The other dark containers use tone 90 text on tone 30. Secondary breaks that pattern because the secondary key colour (`#D4B483`) is light, so `secondary-30` is a light gold, not a dark surface.
Cost in production: Dark mode secondary containers look bright against a dark interface and may feel inconsistent with the primary and tertiary containers.
Fix: Rebuild the secondary palette so tones 0 to 30 are darker, or point the dark container at a darker tone such as `secondary-20`, then retest contrast.
Status: Not fixed. Passes AA today.
