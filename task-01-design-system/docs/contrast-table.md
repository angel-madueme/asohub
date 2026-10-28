# AsoHub colour contrast audit

Generated from [06-tokens-complete.json](../evidence/06-tokens-complete.json) and [asohub-tokens.css](../src/styles/asohub-tokens.css).

## Scope and method

- Parsed 132 leaf colour roles: 66 Light and 66 Dark. The JSON has 65 top-level entries per theme because `action` contains two nested roles.
- Every alias was resolved through the JSON primitive path and cross-checked against the generated CSS primitive value.
- Planned pairs only: no UI components exist yet, so none of these pairs are verified in real components.
- Pair selection: body and secondary text are tested on surface and background; buttons use each `on-X`/`X` role pair plus the explicit action-primary alias; status badges use error/success/warning/info; containers use primary/secondary/tertiary container roles; alerts use error/success/warning/info container roles; forms use on-surface-variant/surface-variant.
- Contrast uses WCAG relative luminance: sRGB linearisation, weights 0.2126/0.7152/0.0722, then `(lighter + 0.05) / (darker + 0.05)`.
- “Low margin” means ratio under 4.6:1, as requested. AA thresholds are 4.5:1 normal text and 3:1 large text.
- The original 102-pair list was not found in this task folder; this audit does not invent pairs to reach 102.

## Planned pairs (not verified in UI components)

| UI usage | Theme | Foreground role and hex | Background role and hex | Ratio | AA normal text (4.5:1) | AA large text (3:1) |
|---|---|---|---|---:|---|---|
| Body text on surface | Light | `on surface` #25291EFF | `surface` #FFFFFFFF | 14.845 | Pass | Pass |
| Body text on background | Light | `on background` #25291EFF | `background` #F7F7F1FF | 13.806 | Pass | Pass |
| Secondary text on surface | Light | `secondary text` #5C6454FF | `surface` #FFFFFFFF | 6.166 | Pass | Pass |
| Secondary text on background | Light | `secondary text` #5C6454FF | `background` #F7F7F1FF | 5.734 | Pass | Pass |
| Button: primary | Light | `on primary` #FFFFFFFF | `primary` #727C3DFF | 4.501 | Pass | Pass |
| Button: primary action alias | Light | `action on primary` #FFFFFFFF | `action primary` #727C3DFF | 4.501 | Pass | Pass |
| Button: secondary | Light | `on secondary` #402F16FF | `secondary` #D4B483FF | 6.512 | Pass | Pass |
| Button: tertiary | Light | `on tertiary` #FFFFFFFF | `tertiary` #527D78FF | 4.602 | Pass | Pass |
| Status badge: error | Light | `on error` #000000FF | `error` #E5484DFF | 5.366 | Pass | Pass |
| Status badge: success | Light | `on success` #000000FF | `success` #159B5BFF | 5.871 | Pass | Pass |
| Status badge: warning | Light | `on warning` #3C1D06FF | `warning` #EA741DFF | 5.118 | Pass | Pass |
| Status badge: info | Light | `on info` #000000FF | `info` #2F80EDFF | 5.431 | Pass | Pass |
| Container: primary | Light | `on primary container` #1D1F0FFF | `primary container` #EAEDDBFF | 14.050 | Pass | Pass |
| Container: secondary | Light | `on secondary container` #402F16FF | `secondary container` #F8F3EAFF | 11.612 | Pass | Pass |
| Container: tertiary | Light | `on tertiary container` #151F1EFF | `tertiary container` #E1EBEAFF | 13.856 | Pass | Pass |
| Alert: error | Light | `on error container` #42090BFF | `error container` #FBE1E1FF | 13.296 | Pass | Pass |
| Alert: success | Light | `on success container` #052717FF | `success container` #CEF8E4FF | 13.882 | Pass | Pass |
| Alert: warning | Light | `on warning container` #3C1D06FF | `warning container` #FBE8D9FF | 12.876 | Pass | Pass |
| Alert: info | Light | `on info container` #061F41FF | `info container` #DCEAFCFF | 13.451 | Pass | Pass |
| Form text: surface variant | Light | `on surface variant` #54564CFF | `surface variant` #E7E8E5FF | 6.070 | Pass | Pass |
| Body text on surface | Dark | `on surface` #F5F5F0FF | `surface` #252B22FF | 13.267 | Pass | Pass |
| Body text on background | Dark | `on background` #F5F5F0FF | `background` #181C16FF | 15.784 | Pass | Pass |
| Secondary text on surface | Dark | `secondary text` #BEC5B6FF | `surface` #252B22FF | 8.189 | Pass | Pass |
| Secondary text on background | Dark | `secondary text` #BEC5B6FF | `background` #181C16FF | 9.742 | Pass | Pass |
| Button: primary | Dark | `on primary` #393E1EFF | `primary` #D5DBB6FF | 7.778 | Pass | Pass |
| Button: primary action alias | Dark | `action on primary` #FFFFFFFF | `action primary` #727C3DFF | 4.501 | Pass | Pass |
| Button: secondary | Dark | `on secondary` #7F5E2CFF | `secondary` #F1E6D6FF | 4.811 | Pass | Pass |
| Button: tertiary | Dark | `on tertiary` #293F3CFF | `tertiary` #C2D7D5FF | 7.471 | Pass | Pass |
| Status badge: error | Dark | `on error` #841316FF | `error` #F6C2C4FF | 6.440 | Pass | Pass |
| Status badge: success | Dark | `on success` #0B4E2EFF | `success` #9DF2C9FF | 7.454 | Pass | Pass |
| Status badge: warning | Dark | `on warning` #78390BFF | `warning` #F8D1B4FF | 6.184 | Pass | Pass |
| Status badge: info | Dark | `on info` #0B3E83FF | `info` #BAD5F9FF | 6.880 | Pass | Pass |
| Container: primary | Dark | `on primary container` #EAEDDBFF | `primary container` #565D2EFF | 5.877 | Pass | Pass |
| Container: secondary | Dark | `on secondary container` #000000FF | `secondary container` #BE8D43FF | 7.080 | Pass | Pass |
| Container: tertiary | Dark | `on tertiary container` #E1EBEAFF | `tertiary container` #3D5E5AFF | 5.861 | Pass | Pass |
| Alert: error | Dark | `on error container` #FBE1E1FF | `error container` #C61C21FF | 4.725 | Pass | Pass |
| Alert: success | Dark | `on success container` #CEF8E4FF | `success container` #107444FF | 5.043 | Pass | Pass |
| Alert: warning | Dark | `on warning container` #FEFAF7FF | `warning container` #B45611FF | 4.727 | Pass | Pass |
| Alert: info | Dark | `on info container` #DCEAFCFF | `info container` #115DC4FF | 5.084 | Pass | Pass |
| Form text: surface variant | Dark | `on surface variant` #D0D1CBFF | `surface variant` #54564CFF | 4.859 | Pass | Pass |

## Decorative/non-text roles

These roles are not tested as text:

| Role | Reason |
|---|---|
| `divider` | Decorative separator; not tested as text. |
| `outline` | Decorative/form boundary; not tested as text. |
| `outline variant` | Decorative/form boundary; not tested as text. |
| `shadow` | Elevation effect; not tested as text. |
| `scrim` | Overlay effect; not tested as text. |
| `surface tint` | Surface treatment; not tested as text. |

## Results

- Pairs tested: 40 planned pairs (20 per theme).
- Failing normal-text pairs: 0.
- Failing large-text pairs: 0.
- Low-margin pairs (<4.6:1): 3.
- Assumptions: “body text” is represented by on-surface/on-background; “secondary text” by secondary-text on surface/background; the explicit action-primary alias is included because it is a distinct button role; planned role pairings are not evidence of component usage.

## Reproducibility

Script: [scripts/audit-contrast.mjs](../scripts/audit-contrast.mjs)

Exact command:

```powershell
node task-01-design-system/scripts/audit-contrast.mjs
```

The script writes this Markdown table and `docs/contrast-table.csv`; its stdout is recorded below.

```text
Roles parsed: Light 66, Dark 66 (total 132 leaf colour roles)
Pairs tested: 40
Failing normal-text pairs: 0
Failing large-text pairs: 0
Low-margin pairs (<4.6:1): 3
Original 102-pair list: not found
UI component verification: none; no UI exists yet
```
