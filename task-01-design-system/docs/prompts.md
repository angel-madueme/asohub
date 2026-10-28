# Prompts

## Prompt 1: JSON to CSS token converter

Date: 2026-10-28
Agent and model: Codex running in the Antigravity terminal, GPT-5.6-Luna medium

### Prompt as sent

```
We are working on Task 01 of the AsoHub Design System assessment.

TASK: Build a reusable JavaScript JSON-to-CSS design token converter using our actual Figma exports.

LOCATION: Work only inside task-01-design-system/. Do not create files at the repository root. Do not run any git commands. I will commit by hand.

INPUT FILES:
- task-01-design-system/evidence/05-tokens-incomplete.json
- task-01-design-system/evidence/06-tokens-complete.json

The incomplete JSON should contain typography and elevation styles but deliberately exclude color variables. The complete JSON should contain approximately:
- 157 primitive color variables
- 66 semantic color roles for Light Mode
- 66 semantic color roles for Dark Mode
- 15 typography styles
- 3 elevation shadow styles
Verify these counts yourself and report any mismatch. Do not assume they are right.

IMPORTANT: Inspect both JSON structures before writing code. Follow their actual keys, types, and value formats. Do not assume standard DTCG syntax if the export differs. Before writing code, summarise the structure you found and wait for my approval.

REQUIREMENTS:
1. Create task-01-design-system/scripts/tokens-to-css.mjs to convert the complete JSON into reusable CSS custom properties.
2. Generate task-01-design-system/src/styles/asohub-tokens.css.
3. Export primitive colors with the prefix --ref-color-*. Export semantic roles with the prefix --color-*. Keep them in separate sections of the file.
4. Resolve semantic role aliases correctly. Preserve references to primitives using CSS var() whenever possible.
5. Support both modes:
   - ":root, [data-theme="light"]" for Light Mode.
   - [data-theme="dark"] for Dark Mode.
6. Export typography properties: font family, size, weight, line height, letter spacing.
7. Export Soft, Medium and Hard elevation styles, preserving color, opacity, offsets, blur, and spread.
8. Use valid CSS units and convert color formats where necessary. List every unit or format conversion you make (for example percent to em, px to rem) as an assumption.
9. CRITICAL RULE: Application UI must reference SEMANTIC color roles (--color-*) only. Never reference --ref-color-* variables in component styles, and never hardcode hex colors in UI components.
10. Add a small check script (task-01-design-system/scripts/check-token-usage.mjs) that scans src/ for any use of --ref-color-* outside asohub-tokens.css, and for raw hex, rgb or hsl values outside asohub-tokens.css. It must exit with an error if it finds any. Print the exact search it ran.
11. Test the converter with the incomplete JSON separately. Report which tokens are missing and what cannot be generated. Do not invent fallback colors or silently repair missing variables.
12. Test with the complete JSON and validate both theme modes, all aliases, typography, and shadows.
13. Create task-01-design-system/docs/converter-audit.md recording the commands executed, results, the incomplete-export failure, and the complete-export outcome.
14. Do not modify either original JSON file.
15. Do not write any secrets or real credentials anywhere.

Do not build application screens yet. Complete and verify the converter first.
Ask me when anything is unclear. Do not assume.

REPORT:
- Files created
- Tokens converted (actual counts)
- Test results
- Missing or unresolved aliases
- Assumptions and limitations
- An audit of your work against each numbered requirement, stating where you deviated
```

### What happened (stage 1: inspection)

The agent inspected both JSON files and wrote nothing. It reported two top-level keys in the incomplete export (effect, typography) and four in the complete export (adding primitives and color roles). It counted 157 primitives, 66 light roles, 66 dark roles, 15 typography styles, 3 elevation styles and 132 aliases, matching my Figma work. It said the incomplete export has no colour data and that it would not invent any. It then asked for approval.

### My approval reply

```
Structure summary approved, with these conditions. Do not write any files until you have answered the first two.

1. Explain what primitives.theme contains, and state whether primitives.key colors is inside the 157 primitive count.
2. Show the naming map: how keys with spaces (color palettes, color roles, key colors) become CSS custom property names, with three examples. Keep --ref-color-* for primitives and --color-* for semantic roles.

Then proceed with the build, and also do the following:
3. State whether you keep 8-digit hex or trim to 6 digits when alpha is ff, as an assumption.
4. Print each shadow's colour, alpha, offsets, radius and spread. Confirm none is black. Map shadowType and radius to valid CSS, and use inset for inner shadows.
5. Print font size, line height and the line-height ratio for all 15 typography styles. Flag any ratio that is not 1.4, 1.5 or 1.6.
6. Verify every alias target exists. Handle chained aliases (a role pointing at another role). Report any unresolved alias. Do not repair silently.
7. Do not add prefers-color-scheme logic. Use only :root, [data-theme="light"] and [data-theme="dark"].

All earlier rules stay: work only inside task-01-design-system/, no git commands, do not modify the JSON files.
```

### What happened (stage 2: build)

The agent created `scripts/tokens-to-css.mjs`, `scripts/check-token-usage.mjs`, `src/styles/asohub-tokens.css` and `docs/converter-audit.md`. It reported 157 primitives, 66 light roles, 66 dark roles, 15 typography styles, 3 elevation styles and 132 aliases, all resolved. The incomplete export failed with status 1 and no fallback colours. The complete export passed with status 0. It kept 8-digit hex with the `ff` alpha. It reported no deviations and ran no git commands.

### How I checked it

I reran both scripts on my machine and both exited with code 0. `git status` showed only new files, so the two JSON files were not modified. The output of the check script is in `evidence/07-raw-value-search.txt`. It is clean but trivial, because no UI exists yet. I will rerun it after the agent builds a screen.

### What I changed, and what I found

- I tightened my first draft before sending it. The draft had lost the `:root,` part of the light selector, used paths outside `task-01-design-system/`, had no "no git" rule, used no prefix to separate primitives from roles, and hardcoded the token counts. The sent version fixes all of these.
- The agent reported all shadows using `#4c544b`. That was my own Figma decision, not the agent's. It departs from the brief's "built from the primary colour". It is recorded in `divergences.md` and `shadows.md`.

## Prompt 2: Colour contrast audit

Date: 2026-10-28
Agent and model: Codex running in the Antigravity terminal, GPT-5.6-Luna medium

### Prompt as sent

```
Audit AsoHub's colour contrast using task-01-design-system/evidence/06-tokens-complete.json and task-01-design-system/src/styles/asohub-tokens.css.

LOCATION: Work only inside task-01-design-system/. Do not run any git commands. Do not modify token values, the CSS, the JSON files or the converter.

BACKGROUND: A Figma agent previously reported 102 tested text pairs, but our documentation lists only 18 examples. Do not invent pairs to reach 102. If the original 102-pair list is not available, say so plainly.

TASKS:
1. Parse all 66 colour roles for Light and Dark mode.
2. Resolve each alias to its exact primitive hex.
3. Build the list of foreground and background pairs the interface will use: body text, secondary text, buttons, status badges (error, success, warning, info), containers, forms and alerts. Base the pairs on the role names (on-X against X) plus text-on-surface pairs. State exactly how you chose each pair.
4. Calculate contrast with the official WCAG relative luminance formula (linearise each sRGB channel, weight 0.2126, 0.7152, 0.0722, then (lighter + 0.05) / (darker + 0.05)).
5. Output a full table with columns: UI usage, theme, foreground role and hex, background role and hex, ratio to 3 decimals, AA normal text (4.5:1) pass or fail, AA large text (3:1) pass or fail.
6. Flag any pair under 4.6:1 as low margin.
7. List separately the roles that are decorative or non-text (divider, outline, shadow) and say they are not tested as text.
8. Save the table to task-01-design-system/docs/contrast-table.md and a CSV at task-01-design-system/docs/contrast-table.csv.
9. Record the script, the exact command run, and the output, so I can rerun it.
10. Clearly separate planned pairs from pairs verified in real UI components. No UI exists yet.

REPORT: number of pairs tested, number failing, number low margin, and any assumption you made.
Ask me when anything is unclear. Do not assume.
```

### What happened

The agent created `scripts/audit-contrast.mjs`, `docs/contrast-table.md` and `docs/contrast-table.csv`. It parsed 132 leaf roles (66 light, 66 dark) and tested 40 planned pairs, 20 per theme. It found 0 normal-text failures, 0 large-text failures and 3 low-margin pairs. It said the original 102-pair list was not found and that it did not invent pairs. It said no pair is verified in a real UI component, since none exists yet.

### How I checked it

I reran `node task-01-design-system/scripts/audit-contrast.mjs` and saved the output to `evidence/contrast-audit-run.txt`. The three low-margin pairs are all the primary button: Button: primary (Light), and the action alias pair

## Prompt 3: Typography scale documentation

Date: 2026-10-28
Agent and model: Codex running in the Antigravity terminal, GPT-5.6-Luna medium

### Prompt as sent

```
Document AsoHub's typography scale from task-01-design-system/src/styles/asohub-tokens.css and task-01-design-system/evidence/06-tokens-complete.json.

LOCATION: Work only inside task-01-design-system/. Do not run any git commands. Do not modify the CSS, the JSON files, or any script. Write only docs/type-scale.md and docs/type-scale.csv.

TASKS:
1. Parse all 15 typography styles (display, headline, title, body, label, each large, medium and small).
2. For every style output: CSS variable names, font family, font weight, font size (px), letter spacing (px), line height (px), and the line-height ratio (line height divided by font size, to 3 decimals).
3. Flag any ratio that is not 1.4, 1.5 or 1.6. Do not round to hide a mismatch.
4. Add a column for the multiplier used (1.4, 1.5 or 1.6) and group the table by role. Report the multiplier per role, and note any role where the sizes use different multipliers.
5. Print the exact font family string from the CSS, and state whether it matches the family name used in the JSON.
6. State which letter-spacing values are tighter than -0.25px, and which role each belongs to.
7. Add the Material 3 baseline values for Display Large (57px, -0.25px, 64px) and Body Medium (14px, 20px) only as a comparison row, labelled as Material baseline from reference, not from our files.
8. Include the CSS line numbers where each style is defined.
9. Do not invent values. If a value is missing in the CSS or JSON, say so.
10. Record the script (if you write one), the exact command run, and its output, so I can rerun it. Save any script in scripts/.

REPORT: number of styles parsed, any ratio outside 1.4/1.5/1.6, any mismatch between CSS and JSON, and any assumption you made.
Ask me when anything is unclear. Do not assume.
```

### What happened

The agent created `docs/type-scale.md` and `docs/type-scale.csv`. It parsed 15 styles, found 0 ratios outside 1.4, 1.5 and 1.6, and found 0 CSS and JSON mismatches. Only Display Large (-0.6px) and Display Medium (-0.4px) are tighter than -0.25px. No role mixes multipliers. It used a one-line Node command, not a saved script, and modified no source files.

### How I checked it

The one-line command was rerun on my machine and its output saved to `evidence/type-scale-run.txt`. The Display Large values (48px, -0.60px, 67.2px) match `divergences.md`.

### What I found and noted

- The CSS font family is `'Source Sans Pro'`. Google Fonts now publishes this family as "Source Sans 3", so the font may fail to load by that name. Logged in `defects.md`, entry 6, to verify in Task 2.
- The Material baseline rows come from my prompt, not from Material's source. They are reference-only.
- The agent produced numbers but no reasoning. The reasons for each multiplier and tracking value were added to `type-scale.md` by hand.


## Prompt 4: Stage A, order screen without the design system

Date: 2026-10-28
Agent and model: Codex running in the Antigravity terminal, GPT-5.6-Luna medium

### Prompt as sent

```
We are working on Task 01, Step 7 of the AsoHub assessment: proving the agent uses the design system. This is Stage A.

LOCATION: Work only inside task-01-design-system/. Do not run any git commands. Do not install packages or use a framework. Plain HTML and CSS only.

DO NOT read, open or use any of these in Stage A: src/styles/asohub-tokens.css, evidence/06-tokens-complete.json, docs/colour-roles.md, docs/type-scale.md. This stage deliberately has no design system.

TASK: Build one mobile-first screen, "Order detail", for a made-to-measure tailoring studio app called AsoHub. Content:
- Header with the AsoHub name
- Order title: "Agbada, two piece" with a status badge "In progress"
- Promised date: "Ready by 14 November"
- A balance card: Total, Paid, Still owed
- A payment history list with three rows (date, amount, status: Paid, Paid, Failed)
- One primary button: "Pay balance"
Make it look good. Use your own judgement for colours, fonts and spacing.

Save as task-01-design-system/demo/without-system/index.html (one file, CSS inside).

REPORT: files created, and the fonts and colours you chose (list every hex you used). Do not claim it follows any design system.
```

### What happened

The agent created `demo/without-system/index.html`. It chose Georgia for headings and Trebuchet MS for interface text, and used 15 hex colours of its own, including a terracotta card (`#b85d3e`) and a near-black button (`#24211d`). It did not claim to follow any design system. It added details I never asked for: an order number (#ASO-1048), a menu button, a sparkle icon and dates in 2024.

### How I checked it

I searched `asohub-tokens.css` for the 15 hex values and none matched, so the agent did not borrow from my tokens. I captured the page at 390 px as `evidence/09-screen-without-system.png`. The brand olive `#727C3D` appears nowhere on this screen. Status used a dot plus text, so the agent avoided colour-only status without being told.

### What did not work, and what I noted

- My first screenshot was cropped and about 330 px wide, so I retook it at 390 px.
- The invented content (order number, amounts, 2024 dates) is demo data, not
