# AGENTS.md

Rules for any coding agent working in this repository. Read this file first, every session.

## Project

AsoHub is a made-to-measure tailoring studio app. A customer sees the true status of their outfit and exactly what they still owe. The studio never loses a measurement or a payment record.

Users are men and women aged 25 to 45 on Android phones with patchy mobile data. The app is a mobile-first web app. It must also work on desktop.

## Stack

- Next.js (App Router) with TypeScript
- App code lives in `src/`
- Plain CSS using the design tokens (no CSS framework unless the user asks)
- Planned, not installed yet: Prisma and PostgreSQL

Do not add libraries, a database, authentication or any other tool unless the prompt asks for it. Prisma and PostgreSQL are installed only when a prompt says so.

## Source of truth

Read these before writing code. If two files disagree, stop and ask. Do not choose.

1. `task-01-design-system/docs/business-brief.md`
2. `task-01-design-system/docs/colour-roles.md`
3. `task-01-design-system/docs/type-scale.md`
4. `task-01-design-system/docs/shadows.md`
5. `task-01-design-system/docs/defects.md`
6. `src/styles/asohub-tokens.css`

## Design system rules

- Colours: use semantic roles only (`--color-*`). Never use `--ref-color-*` in components.
- Never write a hex, rgb or hsl value outside `src/styles/asohub-tokens.css`.
- Text: use the `--type-*` variables for family, size, weight, letter spacing and line height. No hardcoded font values.
- Shadows: use `--elevation-soft`, `--elevation-medium` or `--elevation-hard`.
- Primary buttons use `--color-action-primary` with `--color-action-on-primary`.
- Status never relies on colour alone. Add text and an icon or symbol.
- `src/styles/asohub-tokens.css` is generated. Do not edit it by hand. Regenerate it with the converter in `task-01-design-system/scripts/`.
- Dark mode uses the `data-theme="dark"` attribute on the html element.

## Fonts

The tokens name `Source Serif 4` and `Source Sans Pro`. Google Fonts publishes the sans as `Source Sans 3`. Load both fonts for real, and map the name `Source Sans Pro` to the Source Sans 3 files with `@font-face` and a `url()` source. A `local()` source alone does not work.

Never claim a font loaded. State whether you could verify it.

## Copy

- Short sentences in active voice. No filler.
- No sentence opens with "I".
- Lead with the benefit to the customer.
- No em dashes.
- Use a hyphen only where it is standard, such as a compound modifier ("6-digit code").
- Tagline: "Made to measure. Tracked to the last stitch."

## Scope

- Build only what the current prompt asks for.
- Do not build features ahead of the prompt.
- Do not leave unused or duplicate files and functions behind.

## Git

- Never run git commands. The user commits by hand.
- Work only on the branch the user names.

## Database and migrations

- Never run a migration. This includes `prisma migrate` and `prisma db push`. Propose the change and stop.
- Never edit a migration that has already run.
- Schema changes are written to the schema file only. The user runs them by hand.

## Secrets and environment

- Never write a real secret, key, password or token anywhere in the repo.
- `.env` is never committed. `.env.example` holds names only, with empty values.
- Group `.env.example` by purpose. Each group gets a short title, a one-line plain description, and a blank line before the next group.

## Working method

1. Read the source files and summarise your understanding.
2. Wait for the user to approve before you write code.
3. When done, list every file you created or changed and every assumption you made.
4. Audit your own work against the prompt and say where you deviated.
5. If you could not verify something (for example rendered fonts), say so plainly. Do not claim it.

## Environment

- The user works on Windows with PowerShell.
- If a confusing error appears after a structural change, clear the `.next` folder and restart the dev server first.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
