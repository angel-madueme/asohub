# Performance note

## My numbers

I started the app with `npm run dev` and opened `http://localhost:3000`.

| Load | Time | Where the time went |
|---|---|---|
| First load | 2.8 seconds | 2.2s was Next.js. 687ms was my own code. |
| Reload | 113 milliseconds | 8ms was Next.js. 105ms was my own code. |

The server also took 13.9 seconds to start. That is a separate number. It is the time before the app is ready at all.

Evidence: `evidence/03-server-start.txt` and `evidence/04-first-load.txt`.

## How far is this from a good target?

The first load is slow. The reload is fast.

I set my own target. A page like this should answer in under 1 second. The first load was almost three times that. The reload was far below it.

The class example had a first load of 10,220 milliseconds and a reload of 790. Mine is much quicker. The pattern is the same: slow first, fast after.

I chose the 1 second target myself. It is a judgement, not a rule from the task.

## What I measured

- The first load time, from the terminal.
- The split between Next.js time and my own code time, from the terminal.
- The reload time, from the terminal.
- The server start time, from the terminal.

## What I am guessing

- **Why the first load is slow.** My guess is that the dev server builds the page the first time someone asks for it. That would explain the 2.2 seconds of Next.js time. On reload the page is already built, so Next.js only needed 8ms. I did not prove this. It fits the numbers.
- **Why my own code took 687ms the first time.** The page also loads the design tokens, two fonts and the theme toggle. I did not measure each part, so I cannot say which one cost the most.
- **Whether my computer matters.** My laptop may be slower or faster than another one. I did not test on any other machine.

## What I did not measure

- How long the browser took to show the page. The terminal only shows the server side.
- How long the fonts took to download from Google.
- How the page behaves on a slow phone connection. My users are on phones with patchy mobile data, so this matters most for them.

## Why this is a dev server number

This was the dev server. It is built for fast edits, not for speed. A real deployment uses a production build, which is prepared before anyone visits. I expect a production first load to be much faster. I have not tested that, so it is a guess.

## One warning from the same run

Next.js printed a warning. It found a `package-lock.json` in my home folder, outside the project, and ignored it. It did not slow the app as far as I can tell, but it is clutter I should clean up later.

## What I would do next

1. Open the Network tab in Chrome and read the real load time in the browser.
2. Run `npm run build` and `npm start`, then compare the first load with the dev server.
3. Check the font download time on a throttled connection.