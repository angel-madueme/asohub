# Interview answers

## 1. How would you structure design tokens?

In three layers, each with one job.

Primitives hold raw values and nothing else. In AsoHub these are the 157 `--ref-color-*` variables: nine key colours, the tonal palettes and the theme foundation colours.

Semantic roles describe a job, such as `--color-primary` or `--color-on-surface`. Each role is an alias pointing at a primitive. There are 66 per theme, 132 aliases in total, all resolved.

Component styles use only roles for colour and `--type-*` variables for text. They never touch primitives or hardcode a hex.

Typography and elevation follow the same rule. The type scale is 15 styles, each with family, weight, size, tracking and line height.

The layering is enforced, not just agreed. `check-token-usage.mjs` fails if UI code uses a `--ref-color-*` variable or a raw hex, rgb or hsl value. Figma stays the source, and the CSS is generated from the JSON export.

## 2. When is a token change breaking?

A change is breaking when something that worked stops working or changes meaning without the consumer opting in.

The clear cases are renaming or deleting a token, because every reference breaks. Re-pointing a role is next, for example moving `--color-primary` to a different tone, because every screen using it changes.

Value changes can break too. White on `#727C3D` is 4.500714:1 against the 4.5:1 AA limit. Changing the blue channel one step to `#727C3E` gives about 4.4986:1 and fails. The token still exists, but accessibility breaks.

Type changes break layouts. A larger size or tighter line height can change wrapping.

The safe test is to regenerate the CSS, rerun the contrast audit and the usage check, and look at a real screen. In my regression test, one hardcoded role stayed olive while the rest followed the palette change. That is a silent breaking change.

## 3. How would you support multiple brands and themes?

Themes and brands use different layers.

Themes change the mapping from roles to primitives. AsoHub already does this with two modes. `:root, [data-theme="light"]` and `[data-theme="dark"]` define the same role names with different targets. Light Primary points at primary-40, dark Primary at primary-80. Components do not change.

Brands change the primitives. A second brand would supply its own key colours and palettes while keeping the same role names. Components stay untouched because they only use roles.

This works only if the semantic layer is complete and nothing bypasses it. AsoHub has two leaks. The shadow colour is a fixed hex in `asohub-tokens.css` lines 384 to 386, and the `--color-shadow` role points at black. A second brand would inherit the wrong shadow.

Only one brand has been built here. The multi-brand approach is a design, not something tested.

## 4. Can tokens guarantee accessible contrast?

No. Tokens make contrast checkable and repeatable, but they do not guarantee it.

A token pair can pass while the interface fails. The audit covers 40 planned pairs (20 per theme) with 0 failures. It does not cover every combination that real screens produce, such as text over images, opacity, hover states or a role used on an unplanned background. No pair is verified in a real component beyond the demo screen.

Margins matter. The primary button passes at 4.500714:1, a margin of 0.0007. Any palette edit can break it silently.

Contrast also covers only one need. Success and primary are both green, and the Figma simulation showed them close under red-green and total colour blindness. So status always carries text or a symbol, never colour alone.

The practical answer is to calculate contrast with the WCAG formula in a script, run it after every token change, and test real screens.

## 5. How do you ensure that colour contrast guidelines are met within a website or application's design?

I check contrast with numbers, in a script, at the token level, and then on real screens.

Contrast is calculated with the WCAG formula: linearise each sRGB channel, weight them 0.2126, 0.7152 and 0.0722 to get relative luminance, then divide (lighter + 0.05) by (darker + 0.05). Targets are 4.5:1 for normal text and 3:1 for large text.

In AsoHub, `scripts/audit-contrast.mjs` reads the exported JSON, resolves every role alias to its hex, and tests 40 planned pairs across both themes. The result was 0 failures and 3 low-margin pairs, all the primary button at 4.501:1. I also recomputed white on `#727C3D` by hand and got 4.500714:1.

The script must rerun after every token change. Token pairs do not prove real screens are accessible, so I also inspect actual components. Chrome's inspector showed 13.8:1 for the order title.

Colour must never be the only signal. Status uses text plus a symbol.

## 6. Can you discuss the differences between WCAG levels A, AA and AAA?

The levels are conformance tiers. Each one builds on the one below.

Level A is the minimum. Without it, some people cannot use the content at all. Examples are text alternatives for images and not relying on colour alone to convey meaning.

Level AA is the usual target and what most laws and procurement rules require. For contrast, it asks for 4.5:1 on normal text and 3:1 on large text and essential non-text indicators. It also covers things like visible focus and resizable text.

Level AAA is the strictest. Contrast rises to 7:1 for normal text and 4.5:1 for large text. Not every AAA criterion can be met for all content, so it is normally applied selectively.

I designed AsoHub to AA. The primary button passes at 4.500714:1, which is AA only, not AAA, and with very little margin.

## 7. Discuss the importance of semantic HTML in the context of accessibility.

Semantic HTML tells browsers and assistive technology what each element is, so users get structure and behaviour without extra work.

A heading is announced as a heading and can be jumped to. A real button is focusable, reachable by keyboard and activated with Enter or Space. A label tied to an input is read out with the field. Landmarks like `main` let screen reader users skip to content. A `div` with a click handler gives none of this unless ARIA and keyboard code are added by hand, which is easy to get wrong.

In the AsoHub order screen, Chrome's inspector reported the title as role heading, named "Agbada, two piece". The page uses `main`, `header`, `section` with `aria-labelledby` and an `h1`.

I have not yet tested the screen with a real screen reader. Task 3 requires that for the forms, so this claim is limited to what the inspector showed.

## 8. How do you handle design handoff to developers using Figma?

I hand off values, not screenshots, and keep one source of truth.

In AsoHub, colours are Figma variables, with primitives and light and dark roles. Typography and elevation are styles. The JSON export carries all of it. A script converts that export to CSS custom properties, so developers receive the same names designers use.

One export mistake mattered. Exporting without Figma variables omitted the whole colour system. I kept that incomplete file as `evidence/05-tokens-incomplete.json` next to the correct one.

Handoff also needs proof that the code consumed the design. I searched the code for raw colours, checked computed values in the browser, and asked the agent which styles it used. That found fonts falling back to Times New Roman, which the tokens alone would never have shown.

Gaps remain. Shadow colour is a fixed hex outside the token system, and the font name needs an alias.