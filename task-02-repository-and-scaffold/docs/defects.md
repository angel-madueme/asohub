# Defects

## 1. Stray package.json in my home folder confuses npm and Next.js

Severity: Low
Where: `C:\Users\AngelMadueme\package.json` and `C:\Users\AngelMadueme\package-lock.json`. Both are outside the repo, so there is no line number in project code.
Finding: When I ran `npm run dev` from a folder with no `package.json`, npm printed `Missing script: "dev"` and not "file not found". npm does not look inside subfolders. It looks in parent folders, and a `package.json` exists in my home folder (`Test-Path` printed True). I believe npm used that one. I did not prove it at the moment of the error. Next.js also warned that it ignored the `package-lock.json` in my home folder because it is outside the Git repository.
Cost in production: A command can run against the wrong project and fail with a message that does not name the real problem. It wastes debugging time. It could also pick up the wrong dependencies on a build machine with the same layout.
Fix: Find out which project, if any, uses these two files. Move them into that project, or delete them. Keep running commands from the repo root and check `npm prefix` when an error looks strange.
Status: Not fixed. I have not checked what else on my machine depends on them.
## 2. A Windows PostgreSQL service took the port I chose
Severity: Low
Where: `docker-compose.yml`, line 6 (the port mapping), and the port in `DATABASE_URL` in my local `.env`. The cause is outside the repo: the Windows service `postgresql-x64-18`.
Finding: I first chose host port 5433 for the AsoHub database. A PostgreSQL 18 service on my machine (process 7064) was already listening there. `docker compose up -d` failed with "bind: An attempt was made to access a socket in a way forbidden by its access permissions". `npx prisma migrate dev` then failed with P1000 Authentication failed, because Prisma had connected to that other server, where my asohub user does not exist. My first guess, that Windows had reserved the port, was wrong. `netsh excludedportrange` did not list 5433.
Cost in production: The same mistake on a shared server could send writes to the wrong database. Here the login was refused first, so nothing was written to it.
Fix: Check a port with `netstat -ano | findstr :<port>` before choosing it. AsoHub now uses 5434, which had no listener. I left the `postgresql-x64-18` service running because I do not know what depends on it.
Status: Fixed by moving to 5434. Evidence: `evidence/database-port-problem.txt`.
