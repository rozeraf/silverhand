# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

**Johnny Silverhand: The Engram** — a non-commercial fan tribute single-page site (Cyberpunk 2077). React 19 + Vite 7 + TypeScript, package manager **Bun**. UI copy is mixed Russian/English; README and `todo.md` are in Russian.

## Commands

```bash
bun install --frozen-lockfile   # install exactly what bun.lock pins (same as CI)
bun dev                         # dev server
bunx tsc --noEmit               # typecheck (no script for it yet)
bun run build                   # production build → dist/
bun run preview                 # serve dist/ locally
```

There are no tests and no linter. "Verified" means `bunx tsc --noEmit` and `bun run build` both pass; for UI/terminal behavior, also check it in `bun dev`.

## Git workflow (follow strictly)

- **`dev`** is the working branch. Do work on `dev` or on short-lived `fix/*` / `feat/*` branches cut from `dev`.
- **`main`** only receives changes through a pull request `dev → main`. Never commit or push to `main` directly.
- **Releases** are tags `vX.Y.Z` on `main` (or a published GitHub Release). Only that triggers `.github/workflows/pages-deployment.yaml`, which builds with Bun and deploys `dist/` to Cloudflare Pages. A plain push to `dev`/`main` deploys nothing.
- Keep `dev` a fast-forward ancestor of `main` after each release (`git merge --ff-only main` on `dev`).
- When resolving a merge conflict, never take one side wholesale. Merge `680da22` did that and silently reverted all of `dev`; `2d97f73` had to restore it.
- `bun.lock` is committed and must be updated together with `package.json`, because CI installs with `--frozen-lockfile`.
- Commit style: Conventional Commits with scopes, e.g. `fix(terminal): …`, `feat(player): …`, `docs: …`.
- `todo.md` is the live backlog. Tick items there when a change completes them.

## Architecture notes (non-obvious parts)

- **No CSS build.** Tailwind comes from the CDN script in `index.html`. Its theme (`cp-yellow`, `cp-blue`, `cp-red`, `cp-bg`, fonts Orbitron/`font-cyber` and Rajdhani) and all global CSS (noise, scanlines, clip-paths, keyframes, CRT classes) live inline in `index.html`. There are no `.css` files. Dynamically built class names work only because of the CDN JIT.
- **`App.tsx` orchestrates the page.** Overlays are `Terminal`, `SettingsModal` and the full-screen `Samurai` player. Content sections and `Footer` are `lazy()`-loaded. `ClassifiedSection` renders only when `localStorage.classified === "true"`.
- **`context/SettingsContext.tsx`** keeps the settings in `localStorage.cyber_settings`. When `bootSequence` is on (the default), the terminal with its boot animation opens on every page load. Legacy key `has_visited` is read once for migration and then removed. `enableAnimations` controls only the `RevealOnScroll` fade-ins.
- **CRT mode** (`enableScanlines`, under "Experimental"): `CrtShader.tsx` is a full-screen WebGL pass, and the `.crt-barrel-surface` class adds an SVG displacement filter. It is very GPU-heavy. `CustomCursor` warps its position to match the barrel geometry, so change those together.
- **Media goes through `assets.ts`.** Files in `assets/` and `music/` are pulled in with eager `import.meta.glob(..., { query: "?url" })`, so Vite hashes them and **every MP3 ships in `dist/`** (~27 MB of the ~33 MB build). Always reference media via `ASSETS`, never via hard-coded paths. Moving music out to Cloudflare R2 is planned in `todo.md`.
- **Terminal** (`components/Terminal.tsx` + `terminal/`):
  - Client-side virtual filesystem, built by `terminal/filesystem.ts` from `import.meta.glob` over `terminal/files/**/*.txt`, `assets/` and `music/` (media appears under `/srv/silverhand`).
  - To add a document, drop a `.txt` into `terminal/files/`. Special owner/group/mode/size goes in `terminal/metadata.ts`. Users live in `terminal/users.ts`.
  - `.txt` is hidden in virtual paths, except for the puzzle files `target.txt` / `incident.txt`.
  - POSIX-style `rwx` checks really apply to commands. VFS changes last only for the session. Auth state lives in `localStorage` (`username`, `authenticated`, `classified`).
  - Boot/close timers go through the `schedule()` helper, which clears them on close/unmount. Use it instead of a raw `setTimeout`.
  - `index.tsx` runs in `React.StrictMode`, so effects must clean up after themselves.
- **The login puzzle is part of the experience.** Do not reveal the passphrase (`SECRET_PASS`) or the solution in docs, README, commit messages or UI copy.

## Content / legal

All game, music and artwork rights belong to CD PROJEKT S.A., Refused and other holders. Notices are in the site footer and README. Keep them intact when touching those areas.
