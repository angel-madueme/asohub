# Scaffold prompt

Date: 2026-10-29
Agent and model: Gemini 3.8 Flash High, in the Antigravity chat panel
Branch: task-2-scaffold

## First draft (written by me)

```
This is AsoHub, a web app for a tailoring studio. I want us to scaffold it. We will build only the foundation and a simple landing page first. Do not build the product yet.

I already have the branch task-2-scaffold and the task 2 folder. I will commit by hand, so do not run any git commands.

First, read all the files before you write any code. Then explain what you understood.

After that, we will build.

Rules:
- Use only our design tokens.
- Do not build any page except the home page.
- Check everything before you claim anything.

Always write the plan first and wait for my approval.
```

[Paste your own rough draft here, exactly as you wrote it before you saw the final version.]

## Final version (as sent)

```
I am building AsoHub, a web app for a made-to-measure tailoring studio. This is the scaffold step. We build only the foundation and one simple home page. We do not build the product.

Work on the branch task-2-scaffold. I have already made it. Do not run any git commands. I will commit by hand.

STEP 1: READ FIRST
Read these files before you write any code:
- AGENTS.md
- task-01-design-system/docs/business-brief.md
- task-01-design-system/docs/colour-roles.md
- task-01-design-system/docs/type-scale.md
- task-01-design-system/docs/shadows.md
- task-01-design-system/docs/defects.md
- task-01-design-system/src/styles/asohub-tokens.css

These files are the only source of truth. Do not use your own style ideas. If two files disagree, stop and ask me. Do not choose for me.

STEP 2: SUMMARISE AND WAIT
Tell me in plain words what you understood. List the plan, the files you will create, and every assumption you are making. Then stop. Wait for me to say "approved". Do not write code before that.

STEP 3: BUILD (only after I approve)
1. Set up Next.js with TypeScript and the App Router. Put the app code in src/. Set it up in the current folder. Do not create a new project folder inside it. Do not overwrite README.md or AGENTS.md.
2. Copy task-01-design-system/src/styles/asohub-tokens.css into src/styles/asohub-tokens.css. Do not edit it. Import it once, in the root layout.
3. Load the fonts for real. Use Source Serif 4 and Source Sans 3 from Google Fonts. The tokens use the name Source Sans Pro, so map that name to the Source Sans 3 files with @font-face and a url() source. A local() source alone does not work. I learned this in Task 1.
4. Build one home page with:
   - The name AsoHub
   - The tagline: Made to measure. Tracked to the last stitch.
   - One line under it: See your outfit's progress, what you've paid and what you still owe, all in one place.
   - One button: Get started. It does not go anywhere yet.
   Use the Display style for the tagline, the Body style for the line, and the Label style for the button. The button uses --color-action-primary and --color-action-on-primary.
5. Make the page mobile-first. It must also look fine on a desktop width.
6. Support dark mode with data-theme="dark" on the html element. Add a small toggle so I can test it.
7. Create .env.example. Names only, no values. Group it by purpose. Each group has a short title, one plain line about it, and a blank line before the next group. Add only the groups the app needs right now.
8. Add a script at scripts/check-token-usage.mjs in the repo root. It must scan the root src/ folder and fail if it finds a --ref-color-* variable or a raw hex, rgb or hsl value outside src/styles/asohub-tokens.css. Print the exact search it runs. Do not change the Task 1 script.
9. Add a command to package.json to run the check.

RULES
- Use design tokens only. No hardcoded colours, font sizes, font weights or font families.
- Do not install Prisma, a database, login, forms, payments or any other library. Those come in later steps.
- Do not build any page except the home page.
- Do not leave unused files or duplicate code.
- Do not claim you checked something you did not check. If you cannot see the fonts in a browser, say so.

WHEN YOU ARE DONE, REPORT:
1. Every file you created or changed.
2. Every assumption you made.
3. The command to start the dev server, and the port.
4. Which fonts you loaded, and whether you could verify them in a browser.
5. An audit of your work against each point above. Say where you did not follow the instructions.
```

## My approval reply (as sent)

The agent read the files, wrote a plan with assumptions and stopped. I approved it with three changes.

```
Approved, with three changes.

1. Do not shorten .env.example. Keep every group already in it. Only check that the App group has APP_URL and PORT.
2. Fonts: load Source Serif 4 at weight 600, and Source Sans 3 at weights 400 and 600. Take the real woff2 url() addresses from the Google Fonts response. Do not guess them. Map "Source Sans Pro" to those files with @font-face.
3. Before you use any token, confirm it exists in src/styles/asohub-tokens.css: --color-action-primary, --color-action-on-primary, and the --type-display, --type-body-large and --type-label-large variables. Read the full file, not only part of it.

All other rules stay. Do not run git commands. After the build, list every file created, every assumption, the dev server command and port, and which fonts you could and could not verify.
```

## What changed between my first draft and the final version

[Write one paragraph in your own words: what the final version added or fixed compared with your first draft, and why.]

## What changed after the agent's plan

The plan planned to cut `.env.example` down to the App group only. That would have deleted groups I had already committed, so the approval reply tells it to keep the file. The plan also did not name font weights or say where the font file addresses would come from. Task 1 showed that missing font files make the browser fall back to Times New Roman. The approval reply fixes both. The plan had read only part of the tokens file, so the reply also tells it to read the whole file before using any token.