# False success

## The question

Can an app tell the user "saved" when nothing was saved? I tested my own fitting request form to find out.

## What I built

The form at `/request-fitting` sends a request to `POST /api/fitting-requests`. The route saves one row in the `fitting_requests` table, then returns status 201. The page only shows "saved" when it gets a 201.

The key lines are in `src/app/api/fitting-requests/route.ts`:

- Line 39 waits for the database save (`await getDb().fittingRequest.create(...)`).
- Line 44 returns 201.
- Line 49 returns 500 if anything fails.

The page checks the status at `src/app/request-fitting/page.tsx` line 34 (`response.status !== 201`) and only shows success at line 51.

## When it worked

I submitted the form with made-up names and phone numbers. Window 1 logged `POST /api/fitting-requests 201`. The screen said "Your fitting request was saved. Your request ID is 4." The table had a real row for it, with an id and a time. I did this twice, minutes apart (rows 3 and 4). Evidence: `evidence/11-write-succeeded-logs.txt`, `evidence/11-write-succeeded-screen.png`, `evidence/12-database-rows.txt` and `evidence/12-database-rows.png`.

## When I broke the database connection

I renamed `DATABASE_URL` in my `.env`, restarted the server, and submitted the form once.

**What the user saw:** a pink box with an "!" icon and the words "Your fitting request could not be saved. Please try again." It did not say saved. Evidence: `evidence/13-write-failed-screen.png`.

**What actually happened:** `getDb()` threw `DATABASE_URL is not set` at `src/lib/db.ts` line 13. It was called from `route.ts` line 39, which is the save. The `catch` returned status 500. The log showed `POST /api/fitting-requests 500 in 1904ms`. There was no 201 anywhere. Evidence: `evidence/13-write-failed-logs.txt`.

**Was anything written?** No. The table had 2 rows before the failed submit and 2 rows after.

## My honest result

This app did not fake a success. The screen and the server agreed: both said it failed. I want to be clear about that, because the task asks how a person could be fooled, and in this build they could not be.

My prediction was right about the screen and the log, but wrong about the time. I guessed under a second or two, and it took 1904ms. I think the first request after a restart is slow because Next.js compiles the route, but I did not prove it. Evidence: `evidence/13-prediction-before-break.txt`.

## How a demo reviewer could have been fooled by a careless build

A rendered screen is not proof. These mistakes look the same as a working app until you check the server:

1. **Showing "saved" when the button is clicked.** The form would say success before the server answers. A demo looks perfect, and nothing is stored.
2. **Returning success before the save finishes.** If the route does not wait (`await`) for the database, it can return 201 while the save fails later. The screen says saved and the table is empty.
3. **Ignoring the status code.** If the page shows success for any answer, even a 500, the screen lies.
4. **Hiding the error.** If the route catches the failure and returns 200 anyway, the log looks normal.

My build avoids all four. Line 39 waits for the save, line 44 returns 201 only after it, and the page shows success only for a 201.

## The check that catches it in thirty seconds

Open the server log and look for a 201 on the form submit. Then open the database table and look for the row. If either is missing, the screen is lying. This is what I did in evidence 11, 12 and 13.

A related lesson: after I changed `.env`, I had to restart the server. The app keeps one database client alive while it runs (`globalThis.asohubDb` in `src/lib/db.ts`), so a changed setting did nothing until the restart. A change can look like it had no effect when the running process never reread it.

## What I did not test

- A database that is running but unreachable. In `db.ts` there is a 5 second timeout for that, but I did not test it.
- A bad request. The route returns 400 for invalid JSON or a missing field, but I did not capture that here.
- The browser losing its connection halfway through a submit.

## Limits of this build

The route only checks that the three fields are text. A one-letter name or an empty string is accepted and saved. Task 3 tests that, and Task 4 closes it.