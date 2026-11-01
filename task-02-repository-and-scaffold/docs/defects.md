# Defects

## 1. Stray package.json in my home folder confuses npm and Next.js

Severity: Low
Where: `C:\Users\AngelMadueme\package.json` and `C:\Users\AngelMadueme\package-lock.json`. Both are outside the repo, so there is no line number in project code.
Finding: When I ran `npm run dev` from a folder with no `package.json`, npm printed `Missing script: "dev"` and not "file not found". npm does not look inside subfolders. It looks in parent folders, and a `package.json` exists in my home folder (`Test-Path` printed True). I believe npm used that one. I did not prove it at the moment of the error. Next.js also warned that it ignored the `package-lock.json` in my home folder because it is outside the Git repository.
Cost in production: A command can run against the wrong project and fail with a message that does not name the real problem. It wastes debugging time. It could also pick up the wrong dependencies on a build machine with the same layout.
Fix: Find out which project, if any, uses these two files. Move them into that project, or delete them. Keep running commands from the repo root and check `npm prefix` when an error looks strange.
Status: Not fixed. I have not checked what else on my machine depends on them.