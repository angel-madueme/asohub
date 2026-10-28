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