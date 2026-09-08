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

There are no tests or linters configured in this project.

## Architecture

### Package Metadata
* **Version**: 0.0.0
* **Dependencies**: React 19.2.4, Vite 7.3.1, Lucide React 0.344.0, use-scramble 2.2.15, react-powerglitch 1.0.0, react-dom 19.2.4
* **DevDependencies**: TypeScript 5.8.2, Vite 6.2.0, @types/node 22.14.0, @types/react 19.2.14, @types/react-dom 19.2.3
* **Imports**: From esm.sh CDN (React 18.2.0 URLs, Vite 7.3.1) — backend changes to React version not critical for development

### Tailwind CSS
Tailwind is loaded **via CDN** in `index.html` — it is not a package dependency. The theme extension (custom colors, fonts) is configured inline in `index.html` inside a `tailwind.config = {...}` script block. Global CSS (scanlines, noise-bg, clip-paths, font-cyber utility, CSS variables) lives in the `<style>` block in `index.html`.

**Custom Tailwind classes**: `cp-yellow`, `cp-blue`, `cp-red`, `cp-bg`. Font `font-cyber` maps to Orbitron; default sans is Rajdhani.

### Key CSS variables / design tokens

| Variable | Value | Usage |
|----------|-------|-------|
| `--cp-yellow` | `#fcee0a` | Accent yellow |
| `--cp-blue` | `#00f0ff` | Accent cyan |
| `--cp-red` | `#ff003c` | Primary red |
| `--cp-bg` | `#0b0b0b` | Background |

**Custom components**:
- `.cp-yellow-button` — Cyberpunk-style button with yellow outline effect
- `.cp-yellow-label` — Yellow Futurama-style label
- `.text-stroke-cyan` / `.text-stroke-red` / `.text-stroke-thick` — Cyberpunk text outline effects
- `.cyber-card-hover` — Hover effect for accent highlights

### Application flow (`App.tsx`)
All heavy sections are **lazy-loaded** with React Suspense. `App.tsx` is the single root orchestrator:
- Shows `Terminal` (boot sequence + auth) on first visit, then skips boot on future visits
- Manages the `Samurai` music page as a full-screen overlay
- Renders `ClassifiedSection` only when `isClassified === true` (set after terminal auth)
- Toggles CRT effects and scanlines based on `SettingsContext`
- Applies CRT barrel distortion geometry when scanlines are enabled AND terminal/settings/Samurai view is not active

### `context/SettingsContext.tsx`
Central settings store persisted to `localStorage` under key `cyber_settings`. Settings:
- `bootSequence` (default: true) — whether to show boot sequence
- `enableNoise` (default: true) — visual film noise effect
- `enableScanlines` (default: false) — CRT scanlines effect
- `enableCustomCursor` (default: true) — custom user cursor
- `enableAnimations` (default: true) — general animation states

**Legacy cache keys managed**:
- `has_visited` — legacy switch for boot sequence (synced with bootSequence)
- `cyber_settings` — local storage for all UI settings

## `assets.ts` — media registry
All images and audio are referenced through the `ASSETS` object. Local files use `import.meta.glob` via `getAsset()` / `getMusic()` so Vite hashes them at build time. Remote images/audio are plain URLs. The object also includes CDN imports from esm.sh.

**Available media** (source folder structure):
```
assets/
  ├── *.webp, *.png, *.jpg, *.jpeg, *.svg, *.ico
music/
  └── *.mp3
```

**`ASSETS` exports**:
- **favicon**, **navLogo**, **samuraiLogo** — 48px PNG logo
- **heroBackground** — `johnny_silverhand_hero.jpg` (hero section)
- **engramCard** — `relic.jpg` (enigma card visual)
- **noiseTexture** — `stardust_noise.png` (pattern for .noise-bg overlay)
- **silverArm** — `arm.png`, **vest** — `vest.png`, **malorianGun** — `malorian_arms_3516.png` (inventory visuals)
- **biographyPortrait** — `johnny_silverhand_portrait.webp` (portrait image)
- **samuraiAlbum** — `chippin_in.jpg` (album artwork)
- **music** object — MP3 URLs for: `chippinIn`, `neverFadeAway`, `aLikeSupreme`, `archangel`, `blackDog`
- **albumCovers** object — WebP/PNG imaging for each album

## `components/Terminal.tsx` — auth system
Interactive terminal emulating a cyberpunk command-line. Features:

### Authentication flow
- Command: `login <username>` — recognized names:
  - `silverhand`, `johnny silverhand`, `robert john linder`
- Password: **`never_fade_away`** → sets `localStorage.classified = "true"` and unlocks `ClassifiedSection`
- Any other username grants public access only
- Success prompts user identity: `uid=1000(silverhand) gid=1000(samurai) groups=samurai,relic,wheel`

### Commands
Supported via `COMMANDS` array + switch statement:
- `boot`, `cat`, `cd`, `chmod`, `clear`, `exit`, `file`, `groups`, `help`, `id`, `login`, `logout`, `ls`, `mkdir`, `pwd`, `rm`, `stat`, `touch`, `tree`, `whoami`, `write`
- Tab key for command/quantity completion
- Up/Down arrows for history
- Password input masked as `*****`

### Virtual filesystem (`terminal/filesystem.ts`)
- Flat object map keyed by full paths (e.g., `/home/silverhand/profile`)
- Mock Unix permissions via `mode` octal, `owner`, `group`, `hasPermission()`
-.getcwd() returns current working directory
- Supports `touch`, `mkdir`, `write`, `chmod`, `rm` for writable directories

### Filesystem metadata (`terminal/metadata.ts`)
Overrides for key paths with custom ownership, groups, and modes (e.g., `/home/silverhand` owned by `silverhand` group `samurai`, mode `0o750`).

## localStorage keys
| Key | Purpose |
|-----|---------|
| `cyber_settings` | JSON blob of all UI settings |
| `has_visited` | Legacy: whether to skip boot sequence |
| `classified` | `"true"` when authenticated as Silverhand |
| `username` | Current user display name (public users only) |
| `authenticated` | `"true"` when any login completed |

## Component lazy-loading strategy
In `App.tsx`, only `Hero`, `Navbar`, `Footer`, and terminal-related views are eagerly loaded. All content-heavy sections (`Biography`, `ClassifiedSection`, `Arsenal`, `Engram`, `Samurai`, `DeveloperNote`) are loaded via `lazy()` with React Suspense fallback overlays.