# Converter audit

## Commands executed

    node task-01-design-system/scripts/tokens-to-css.mjs task-01-design-system/evidence/05-tokens-incomplete.json task-01-design-system/src/styles/incomplete-test.css
    node task-01-design-system/scripts/tokens-to-css.mjs task-01-design-system/evidence/06-tokens-complete.json task-01-design-system/src/styles/asohub-tokens.css
    node task-01-design-system/scripts/check-token-usage.mjs

The original JSON exports were read only and were not modified.

## Export counts

The incomplete export contains 3 elevation styles and 15 typography styles. It contains no primitive colors or semantic color roles.

The complete export contains:

- 157 primitive color variables: 9 key colors, 136 palette colors, and 12 theme colors.
- 66 Light Mode semantic color roles.
- 66 Dark Mode semantic color roles.
- 15 typography styles.
- 3 elevation styles.
- 132 semantic aliases.

All expected counts matched the supplied approximate counts exactly.

## Incomplete-export result

The converter exited with status 1:

    tokens-to-css: Cannot generate color CSS. Missing: primitives, color roles, primitive color variables, semantic color roles. No fallback colors were invented.

No incomplete CSS file was generated. Typography and elevation are present in the incomplete export, but the converter intentionally refuses to emit a partial token file because the required color sections are absent.

## Complete-export result

The converter exited with status 0 and generated src/styles/asohub-tokens.css:

    Converted 157 primitive colors, 66 light roles, 66 dark roles, 15 typography styles, and 3 elevation styles.

Semantic roles are emitted in separate Light and Dark selector blocks using :root, [data-theme="light"] and [data-theme="dark"]. No prefers-color-scheme logic is present.

All 132 aliases were checked against token paths before generation. No unresolved aliases were found. Each semantic alias resolves to a primitive CSS variable using var(--ref-color-...).

## Shadows

All shadows use the source color #4c544b and are not black.

| Style | Source colour | Alpha | Offset X | Offset Y | Radius | Spread | CSS mapping |
|---|---|---:|---:|---:|---:|---:|---|
| Soft | #4c544b1a | 0.10196 | 0px | 2px | 8px | 0px | 0 2px 8px 0 #4c544b1a |
| Medium | #4c544b29 | 0.16078 | 0px | 8px | 20px | -2px | 0 8px 20px -2px #4c544b29 |
| Hard | #4c544b3d | 0.23922 | 0px | 16px | 32px | -4px | 0 16px 32px -4px #4c544b3d |

dropShadow maps to a normal CSS box-shadow. innerShadow would map to the same values prefixed with inset; no inner shadows occur in this export. Radius maps to CSS blur radius in px.

## Typography ratios

| Style | Font size | Line height | Ratio | Flag |
|---|---:|---:|---:|---|
| display.large | 48px | 67.2px | 1.4 | |
| display.medium | 40px | 56px | 1.4 | |
| display.small | 32px | 44.8px | 1.4 | |
| headline.large | 32px | 44.8px | 1.4 | |
| headline.medium | 28px | 39.2px | 1.4 | |
| headline.small | 24px | 33.6px | 1.4 | |
| title.large | 24px | 36px | 1.5 | |
| title.medium | 20px | 30px | 1.5 | |
| title.small | 18px | 27px | 1.5 | |
| body.large | 18px | 28.8px | 1.6 | |
| body.medium | 16px | 25.6px | 1.6 | |
| body.small | 14px | 22.4px | 1.6 | |
| label.large | 16px | 22.4px | 1.4 | |
| label.medium | 14px | 19.6px | 1.4 | |
| label.small | 12px | 16.8px | 1.4 | |

No ratios were flagged.

## Usage-check result

The usage checker printed its exact searches and exited with status 0. It found no primitive color references or raw hex, RGB, or HSL values outside src/styles/asohub-tokens.css.

## Assumptions and limitations

- Source 8-digit hex colors are preserved, including ff alpha values; they are not trimmed to 6 digits.
- Figma dimension values are treated as px because the export provides numeric dimension values without units. This applies to font size, line height, letter spacing, and shadow geometry.
- Font families are quoted CSS strings.
- The converter supports the observed dropShadow and innerShadow shadow types. Unsupported shadow types fail loudly.
- Semantic aliases currently target primitive color paths in this export. Alias validation still checks every target path and fails on unresolved or unsupported targets rather than repairing them.
- The converter emits only :root, [data-theme="light"] and [data-theme="dark"]; it does not infer system preference.
- No application components were created.
