# The working tree

## About the drawing

The task asks for a hand drawing on paper, photographed with the date in my handwriting. I did not do that. I drew the working tree in Figma instead, so the date is typed, not handwritten. I know this does not meet the instruction. The file is `evidence/14-working-tree-drawing-digital.png`.

## What my drawing shows

The drawing shows my computer, the Git store, GitHub and production, with the main branch and my two feature branches, `task-2-scaffold` and `task-2-database-form`.

The two branches are stacked. `task-2-scaffold` branched from `main`, and `task-2-database-form` branched from `task-2-scaffold`, because the form needed the scaffold underneath it.

Production is drawn as "not built yet", because I have not deployed AsoHub anywhere. So the point where code becomes visible to users is not reached yet. It will be when `main` is deployed.

The merge into `main` and the deploy are drawn as dashed arrows. I have not opened a pull request yet, so neither has happened.

The point past which a mistake cannot be undone quietly is the merge into `main`. Before that, I can fix things on my own computer, or on a feature branch only I use, and no one notices. After the merge, `main` is what gets deployed and what other people copy. Fixing it then means a new commit that everyone can see, or rewriting shared history, which is risky.

## What breaks when a tree has one branch

- Half-finished work and working work sit on the same line. There is no place to keep the form while I am still testing it.
- I cannot try something and throw it away without touching the line everyone uses.
- Two jobs at once get mixed. If I am halfway through the design work and the form is ready, I cannot ship the form alone.
- There is no moment to review. A pull request is that moment, and with one branch there is no pull request.
- To undo a bad change I have to undo commits in the middle of the real history.

## Why this matters more after the first deployment

Before I deploy, a broken `main` only bothers me. After I deploy, `main` is what customers run. A bad commit reaches them. I would have to fix it in public, with a new deploy, while people are using the app.

AsoHub shows people what they owe and keeps their measurements. A broken line there could show a wrong balance. Branches let me test away from the live app and merge only what works.

## What I did in this repo

I did not work on `main` for Task 2. I used `task-2-scaffold` for the scaffold and the three breakages, and `task-2-database-form` for the form and the database. `main` still holds the finished Task 1 work.

In Task 1, I made a branch to break the token referencing on purpose, then deleted it without merging. `main` never received the bad change. The log in `task-01-design-system/evidence/12-git-log-branch-unmerged.txt` shows it.
