# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

**Johnny Silverhand: The Engram** — an immersive single-page tribute to Cyberpunk 2077's Johnny Silverhand, built for a hackathon. The stack is React 19 + Vite + TypeScript. The primary package manager is **Bun**.

## Commands

```bash
bun dev          # Start dev server
bun run build    # Production build → dist/
bun run preview  # Preview production build locally
```

There is no test runner or linter configured in this project.

## Architecture

### Tailwind CSS
Tailwind is loaded **via CDN** in `index.html` — it is not a package dependency. The theme extension (custom colors, fonts) is configured inline in `index.html` inside a `tailwind.config = {...}` script block. Global CSS (scanlines, noise-bg, clip-paths, font-cyber utility, CSS variables) lives in the `<style>` block in `index.html`.

### Key CSS variables / design tokens
| Variable | Value | Usage |
|---|---|---|
| `--cp-yellow` | `#fcee0a` | Accent yellow |
| `--cp-blue` | `#00f0ff` | Accent cyan |
| `--cp-red` | `#ff003c` | Primary red |
| `--cp-bg` | `#0b0b0b` | Background |

Custom Tailwind classes: `cp-yellow`, `cp-blue`, `cp-red`, `cp-bg`. Font `font-cyber` maps to Orbitron; default sans is Rajdhani.

### Application flow (`App.tsx`)
All heavy sections are **lazy-loaded** with React Suspense. `App.tsx` is the single root orchestrator:
- Shows `Terminal` (boot sequence + auth) on first visit
- Manages the `Samurai` music page as a full-screen overlay
- Renders `ClassifiedSection` only when `isClassified === true` (set after terminal auth)
- Toggles `scanlines`/`noise-bg` overlay divs based on `SettingsContext`

### `context/SettingsContext.tsx`
Central settings store persisted to `localStorage` under key `cyber_settings`. Settings: `bootSequence`, `enableNoise`, `enableScanlines`, `enableCustomCursor`, `enableAnimations`. Syncs the legacy `has_visited` key for boot sequence compatibility.

### `assets.ts` — media registry
All images and audio are referenced through the `ASSETS` object. Local files use `import.meta.glob` via `getAsset()` / `getMusic()` so Vite hashes them at build time. Remote images/audio are plain URLs. **To add or change any visual asset, edit only this file.**

### `components/Terminal.tsx` — auth system
Interactive terminal that runs a boot sequence on first visit. Authentication flow:
- `login <username>` — recognized names: `silverhand`, `johnny silverhand`, `robert john linder`
- Password: `8492-AFX` → sets `localStorage.classified = "true"` and unlocks `ClassifiedSection`
- Any other username grants public access only

### localStorage keys
| Key | Purpose |
|---|---|
| `cyber_settings` | JSON blob of all settings |
| `has_visited` | Legacy: whether to skip boot sequence |
| `classified` | `"true"` when authenticated as Silverhand |
| `username` | Current user display name |
| `authenticated` | `"true"` when any login completed |
