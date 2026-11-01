# AsoHub

One repository, five task folders. Each `task-0X` folder holds the README, `docs/` and `evidence/` for that task. The app lives at the repo root.

## 1. What this is

AsoHub is a web app for a made-to-measure tailoring studio, so customers can see the true status of their outfit and exactly what they still owe, and the studio never loses a measurement or a payment record.

## 2. Status

| Part | State |
|---|---|
| Task 1, design system | Finished. Tokens, type scale, shadows, contrast audit, regression test. See `task-01-design-system/` |
| Task 2, scaffold and repository | Half done. See below |
| Task 3, client-side validation | Not started |
| Task 4, server security | Not started |
| Task 5, sessions, deletion, defence | Not started |

**What works today**

- A home page with the tagline, built only from design tokens, with a light and dark toggle.
- A "request a fitting" form at `/request-fitting`. It saves a row in PostgreSQL and shows success only after the server returns 201.
- A token check, `npm run check:tokens`, that fails if code uses a raw colour or a primitive variable.
- A tested failure case: with the database setting removed, the form shows an error, the server returns 500, and nothing is written.

**Task 2 still to do:** a hand-drawn working tree, a pull request, page titles and Open Graph tags, the favicon, and this README tested by someone else.

**Not built at all:** login, orders, payments, measurements, order status. The order screen in `task-01-design-system/src/demo/` is a static demo with made-up data.

**Getting started is written but not yet tested by another person.**

## 3. The stack, with reasons

- **Next.js (App Router) and TypeScript.** One app holds the pages and the server routes, which Task 4 needs. TypeScript catches mistakes before they run.
- **Plain CSS with design tokens.** The colours, type and shadows come from Figma through a script, so the design system stays the single source of truth. A CSS framework would add a second source.
- **PostgreSQL 16 in Docker.** Records, money and sessions need a real relational database. Docker keeps it off the main system and easy to reset.
- **Prisma 7.10.1.** The schema is one readable file, and every change is a migration run by hand.
- **Google Fonts, Source Serif 4 and Source Sans 3.** Serif for headings, sans for forms and amounts. The tokens say "Source Sans Pro", so the app maps that name to Source Sans 3 in `src/app/globals.css`.

## 4. Getting started

You need Node.js and npm, Docker Desktop, and Git. Built and tested on Node.js 24.16.0. Other versions are untested. The commands are for Windows PowerShell.

```powershell
git clone https://github.com/angel-madueme/asohub.git
cd asohub
git checkout task-2-database-form
npm install
Copy-Item .env.example .env
```

Open `.env` and fill in the four database values. Choose your own password, with letters and numbers only, and use the same one in both places.

```
POSTGRES_USER=asohub
POSTGRES_PASSWORD=<your own password>
POSTGRES_DB=asohub
DATABASE_URL=postgresql://asohub:<your own password>@localhost:5434/asohub
```

Then start the database, create the table, and run the app:

```powershell
docker compose up -d
npx prisma migrate dev --name create_fitting_requests
npx prisma generate
npm run dev
```

Open `http://localhost:3000`. The form is at `http://localhost:3000/request-fitting`.

To check the design rules: `npm run check:tokens`.

The database uses port 5434 on your machine. Port 5433 was taken by a PostgreSQL service on the author's computer, so check yours with `netstat -ano | findstr :5434` if Docker fails to start.

## 5. Environment variables

Names only. Copy `.env.example` to `.env` and fill the values in. Never commit `.env`.

| Name | What it is for |
|---|---|
| `POSTGRES_USER`, `POSTGRES_PASSWORD`, `POSTGRES_DB` | Create the local PostgreSQL container. Read by `docker-compose.yml` |
| `DATABASE_URL` | The connection string. Read in `src/lib/db.ts` for the app and in `prisma.config.ts` for Prisma commands |
| `APP_URL`, `PORT` | App address and port. Not read by code yet |
| `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASSWORD`, `EMAIL_FROM` | Email delivery. Reserved for Task 4 |
| `SESSION_SECRET` | Protects sessions. Reserved for Task 5 |
| `EMBEDDING_API_KEY`, `EMBEDDING_MODEL` | Retrieval. Reserved |

## 6. What this deliberately does not do

- **No login, sessions or accounts.** Tasks 4 and 5.
- **No checks on what is typed.** The form accepts any text, including one letter or an empty string. Task 3 attacks this and Task 4 closes it.
- **No orders, payments or measurements.** The database has one table so far.
- **No email, retrieval or admin area.** Later tasks.
- **No installable app (PWA).** It is not required, so it waits until after Task 5.
- **No deployment.** The app runs on the author's own machine only.
- **No agent runs git or migrations.** Commits and migrations are done by hand, so the history shows my decisions. The rules are in `AGENTS.md`.

## 7. Known defects

Full list with evidence in each task's `docs/defects.md`.

- **Shadow colour is a fixed hex.** `src/styles/asohub-tokens.css` lines 384 to 386. A palette change will not update shadows.
- **Shadows look like lighter glows in dark mode.** Same lines. The shadow colour is lighter than the dark surfaces.
- **Primary button contrast has almost no margin.** White on `#727C3D` is 4.500714:1 against the 4.5:1 limit. Tokens lines 19, 167 to 168 and 206 to 207.
- **`--color-shadow` points at black.** Tokens lines 224 and 292, and it disagrees with the elevation tokens.
- **Dark mode secondary container is a bright gold.** Tokens line 242.
-