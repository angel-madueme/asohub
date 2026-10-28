# Stage B screen style map

Screen: `src/demo/index.html` — Order detail.

The table maps every visible text element to its typography token set and semantic colour roles. The linked stylesheet supplies the token values; no token values are copied into the screen.

| Text element | Content | `--type-*` style used | `--color-*` roles used |
|---|---|---|---|
| Brand | AsoHub | `--type-title-large-fontfamily`, `--type-title-large-fontsize`, `--type-title-large-fontweight`, `--type-title-large-letterspacing`, `--type-title-large-lineheight` | `--color-primary` |
| Theme toggle symbol | ☼ | `--type-label-small-*` | `--color-on-surface` |
| Theme toggle label | Dark mode / Light mode | `--type-label-small-*` | `--color-on-surface` |
| Eyebrow | Order detail · #ASO-1048 | `--type-label-small-*` | `--color-primary` |
| Order title | Agbada, two piece | `--type-display-small-*` | `--color-on-surface` |
| Order status symbol | ● | `--type-label-medium-*` | `--color-success` |
| Order status label | In progress | `--type-label-medium-*` | `--color-success-container`, `--color-on-success-container` |
| Promised date | Ready by 14 November | `--type-body-small-*` | `--color-secondary-text` |
| Balance label | Your balance | `--type-label-small-*` | `--color-on-primary` |
| Balance amount | ₦85,000 | `--type-title-large-*` | `--color-on-primary` |
| Balance mark | ✦ | `--type-title-large-*` | `--color-on-primary` |
| Balance metric labels | Total; Paid; Still owed | `--type-label-small-*` | `--color-on-primary` |
| Balance metric values | ₦250,000; ₦165,000; ₦85,000 | `--type-title-small-*` | `--color-on-primary` |
| Section heading | Payment history | `--type-headline-small-*` | `--color-on-surface` |
| Payment count | 3 payments | `--type-label-small-*` | `--color-secondary-text` |
| Payment amounts | ₦100,000; ₦65,000; ₦85,000 | `--type-title-small-*` | `--color-on-surface` |
| Payment dates | 12 September 2024; 26 September 2024; 04 October 2024 | `--type-body-small-*` | `--color-secondary-text` |
| Paid status symbols | ✓; ✓ | `--type-label-medium-*` | `--color-success` |
| Paid status labels | Paid; Paid | `--type-label-medium-*` | `--color-success-container`, `--color-on-success-container` |
| Failed status symbol | ! | `--type-label-medium-*` | `--color-error` |
| Failed status label | Failed | `--type-label-medium-*` | `--color-error-container`, `--color-on-error-container` |
| Primary action | Pay balance | `--type-label-large-*` | `--color-action-primary`, `--color-action-on-primary` |

## Non-text styling roles

| UI surface | Semantic roles / token |
|---|---|
| Page background | `--color-background` |
| Balance card | `--color-primary`, `--color-on-primary`, `--elevation-medium` |
| Balance separators | `--color-on-primary` |
| Theme toggle surface and border | `--color-surface`, `--color-on-surface`, `--color-outline-variant` |
| Payment history surface and border | `--color-surface`, `--color-outline-variant`, `--elevation-soft` |
| Payment row separators | `--color-divider` |
| Button focus outlines | `--color-outline` |
