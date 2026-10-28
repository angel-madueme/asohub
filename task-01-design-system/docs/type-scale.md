# AsoHub typography scale

Sources: [asohub-tokens.css](../src/styles/asohub-tokens.css) and [06-tokens-complete.json](../evidence/06-tokens-complete.json).

## Scope and findings

- Styles parsed: 15 AsoHub styles: display, headline, title, body and label, each at large, medium and small.
- Ratio formula: `line height / font size`; values are shown to 3 decimals. The source values were not rounded to conceal mismatches.
- Ratios outside 1.4, 1.5 or 1.6: none.
- CSS/JSON mismatches: none for font family, weight, size, letter spacing or line height.
- CSS family strings are printed exactly, including quotes: `'Source Serif 4'` and `'Source Sans Pro'`. The JSON stores the same family names without CSS quote marks; they match semantically for all 15 styles.
- Letter spacing tighter than -0.25px: `display-large` (-0.6px) and `display-medium` (-0.4px), both in the Display role. `headline-large` is exactly -0.25px and is therefore not tighter than -0.25px.

## AsoHub styles

| Role | Style | CSS variables | CSS lines | Font family (exact CSS string) | JSON family | Weight | Size (px) | Letter spacing (px) | Line height (px) | Ratio | Multiplier used | Ratio status | CSS/JSON match |
|---|---|---|---|---|---|---:|---:|---:|---:|---:|---:|---|---|
| Display | Large | `--type-display-large-fontsize`; `--type-display-large-fontfamily`; `--type-display-large-fontweight`; `--type-display-large-letterspacing`; `--type-display-large-lineheight` | 305-309 | `'Source Serif 4'` | Source Serif 4 | 600 | 48 | -0.6 | 67.2 | 1.400 | 1.4 | In allowed set | Match |
| Display | Medium | `--type-display-medium-fontsize`; `--type-display-medium-fontfamily`; `--type-display-medium-fontweight`; `--type-display-medium-letterspacing`; `--type-display-medium-lineheight` | 310-314 | `'Source Serif 4'` | Source Serif 4 | 600 | 40 | -0.4 | 56 | 1.400 | 1.4 | In allowed set | Match |
| Display | Small | `--type-display-small-fontsize`; `--type-display-small-fontfamily`; `--type-display-small-fontweight`; `--type-display-small-letterspacing`; `--type-display-small-lineheight` | 315-319 | `'Source Serif 4'` | Source Serif 4 | 600 | 32 | -0.2 | 44.8 | 1.400 | 1.4 | In allowed set | Match |
| Headline | Large | `--type-headline-large-fontsize`; `--type-headline-large-fontfamily`; `--type-headline-large-fontweight`; `--type-headline-large-letterspacing`; `--type-headline-large-lineheight` | 320-324 | `'Source Serif 4'` | Source Serif 4 | 600 | 32 | -0.25 | 44.8 | 1.400 | 1.4 | In allowed set | Match |
| Headline | Medium | `--type-headline-medium-fontsize`; `--type-headline-medium-fontfamily`; `--type-headline-medium-fontweight`; `--type-headline-medium-letterspacing`; `--type-headline-medium-lineheight` | 325-329 | `'Source Serif 4'` | Source Serif 4 | 600 | 28 | -0.15 | 39.2 | 1.400 | 1.4 | In allowed set | Match |
| Headline | Small | `--type-headline-small-fontsize`; `--type-headline-small-fontfamily`; `--type-headline-small-fontweight`; `--type-headline-small-letterspacing`; `--type-headline-small-lineheight` | 330-334 | `'Source Serif 4'` | Source Serif 4 | 600 | 24 | 0 | 33.6 | 1.400 | 1.4 | In allowed set | Match |
| Title | Large | `--type-title-large-fontsize`; `--type-title-large-fontfamily`; `--type-title-large-fontweight`; `--type-title-large-letterspacing`; `--type-title-large-lineheight` | 335-339 | `'Source Sans Pro'` | Source Sans Pro | 600 | 24 | -0.1 | 36 | 1.500 | 1.5 | In allowed set | Match |
| Title | Medium | `--type-title-medium-fontsize`; `--type-title-medium-fontfamily`; `--type-title-medium-fontweight`; `--type-title-medium-letterspacing`; `--type-title-medium-lineheight` | 340-344 | `'Source Sans Pro'` | Source Sans Pro | 600 | 20 | 0 | 30 | 1.500 | 1.5 | In allowed set | Match |
| Title | Small | `--type-title-small-fontsize`; `--type-title-small-fontfamily`; `--type-title-small-fontweight`; `--type-title-small-letterspacing`; `--type-title-small-lineheight` | 345-349 | `'Source Sans Pro'` | Source Sans Pro | 600 | 18 | 0.05 | 27 | 1.500 | 1.5 | In allowed set | Match |
| Body | Large | `--type-body-large-fontsize`; `--type-body-large-fontfamily`; `--type-body-large-fontweight`; `--type-body-large-letterspacing`; `--type-body-large-lineheight` | 350-354 | `'Source Sans Pro'` | Source Sans Pro | 400 | 18 | 0 | 28.8 | 1.600 | 1.6 | In allowed set | Match |
| Body | Medium | `--type-body-medium-fontsize`; `--type-body-medium-fontfamily`; `--type-body-medium-fontweight`; `--type-body-medium-letterspacing`; `--type-body-medium-lineheight` | 355-359 | `'Source Sans Pro'` | Source Sans Pro | 400 | 16 | 0 | 25.6 | 1.600 | 1.6 | In allowed set | Match |
| Body | Small | `--type-body-small-fontsize`; `--type-body-small-fontfamily`; `--type-body-small-fontweight`; `--type-body-small-letterspacing`; `--type-body-small-lineheight` | 360-364 | `'Source Sans Pro'` | Source Sans Pro | 400 | 14 | 0.05 | 22.4 | 1.600 | 1.6 | In allowed set | Match |
| Label | Large | `--type-label-large-fontsize`; `--type-label-large-fontfamily`; `--type-label-large-fontweight`; `--type-label-large-letterspacing`; `--type-label-large-lineheight` | 365-369 | `'Source Sans Pro'` | Source Sans Pro | 600 | 16 | 0.1 | 22.4 | 1.400 | 1.4 | In allowed set | Match |
| Label | Medium | `--type-label-medium-fontsize`; `--type-label-medium-fontfamily`; `--type-label-medium-fontweight`; `--type-label-medium-letterspacing`; `--type-label-medium-lineheight` | 370-374 | `'Source Sans Pro'` | Source Sans Pro | 600 | 14 | 0.15 | 19.6 | 1.400 | 1.4 | In allowed set | Match |
| Label | Small | `--type-label-small-fontsize`; `--type-label-small-fontfamily`; `--type-label-small-fontweight`; `--type-label-small-letterspacing`; `--type-label-small-lineheight` | 375-379 | `'Source Sans Pro'` | Source Sans Pro | 600 | 12 | 0.2 | 16.8 | 1.400 | 1.4 | In allowed set | Match |

## Multiplier by role

| Role | Multiplier across large, medium and small | Different multipliers within role? |
|---|---:|---|
| Display | 1.4 | No |
| Headline | 1.4 | No |
| Title | 1.5 | No |
| Body | 1.6 | No |
| Label | 1.4 | No |

No role uses different multipliers across its three sizes.

## Material 3 comparison rows

These are reference-only comparisons and are not values from the AsoHub CSS or JSON. They are excluded from the 15-style findings above.

| Reference row | Source | Size (px) | Letter spacing (px) | Line height (px) | Ratio | Multiplier status |
|---|---|---:|---:|---:|---:|---|
| Display Large | Material baseline from reference | 57 | -0.25 | 64 | 1.123 | Outside AsoHub multiplier set; reference only |
| Body Medium | Material baseline from reference | 14 | Not specified in request | 20 | 1.429 | Outside AsoHub multiplier set; reference only |

## Reproducibility

No script was written or modified. The following one-line Node command was used to parse the JSON typography objects, locate the corresponding CSS lines, calculate ratios, and compare source sizes. The ratio check uses a `1e-9` tolerance only to avoid binary floating-point representation errors; reported ratios remain calculated from the source values and are displayed to three decimals.

Exact command:

```powershell
node -e "const fs=require('fs');const j=JSON.parse(fs.readFileSync('task-01-design-system/evidence/06-tokens-complete.json'));const c=fs.readFileSync('task-01-design-system/src/styles/asohub-tokens.css','utf8');const lines=c.split(/\r?\n/);const styles=Object.entries(j.typography.typography).flatMap(([role,levels])=>Object.entries(levels).map(([size,v])=>({role,size,fontSize:v.fontSize.value,lineHeight:v.lineHeight.value,ratio:v.lineHeight.value/v.fontSize.value,cssLine:lines.findIndex(x=>x.includes('--type-'+role+'-'+size+'-fontsize'))+1})));const allowed=[1.4,1.5,1.6];console.log('Styles parsed:',styles.length);console.log('Ratios outside 1.4/1.5/1.6:',styles.filter(x=>!allowed.some(m=>Math.abs(x.ratio-m)<1e-9)).length);console.log('CSS/JSON typography mismatches:',styles.filter(x=>!c.includes('--type-'+x.role+'-'+x.size+'-fontsize: '+x.fontSize+'px')).length);console.log('CSS line range:',Math.min(...styles.map(x=>x.cssLine))+'-'+Math.max(...styles.map(x=>x.cssLine)));"
```

Output:

```text
Styles parsed: 15
Ratios outside 1.4/1.5/1.6: 0
CSS/JSON typography mismatches: 0
CSS line range: 305-375
```

Assumption: the JSON typography is read from its `typography.typography` object, where the five roles each contain `large`, `medium` and `small`; no missing values were found.
