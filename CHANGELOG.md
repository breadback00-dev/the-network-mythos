# Changelog

## 2026-05-14

### Docs

- Reworked `README.md` for public GitHub presentation.
- Added a screenshot of the Archive Hub.
- Replaced the placeholder `ROADMAP.md` with a concise public roadmap.
- Added `docs/INDEX.md` as a navigation entry point for project documentation.
- Ignored `.claude/` local worktree state so it remains local-only.

## 2026-05-03

### Refactored

- Extracted shared case prototype engine to `Archive Hub/case-engine.js`.
- Replaced four diverged per-case `script.js` files (~2,650 lines) with one engine (443 lines) and four `prototype/case-config.js` files (~354 lines total).
- Each case config declares its own `storagePrefix`, fixing a bug where Cases 001 and 002 shared the same localStorage keys.
- Hold-to-confirm on ending buttons standardised across all cases (Cases 002 and 003 were missing it).
- Investigator Notes gating (flag to unlock) now active in all cases, not just Case 001.

### Improved

- Server auto-discovers case folders — adding a new case requires no server or Hub code changes.
- Exposes `/cases/index.json` for Hub consumption; fallback to hardcoded IDs if unavailable.
- Unlock thresholds moved to `case-data.json` (`unlockAfter` field) — no more hardcoded per-ID conditions in Hub script.

### Removed

- Per-case `server.js`, `start-prototype.bat`, `start-prototype.ps1` files (obsolete since shared-origin Hub).
- `server.err.log`, `server.out.log`, `open-prototype.url` from Case 001 prototype.

### Docs

- Updated `ARCHITECTURE.md` to reflect new engine/config structure and case discovery.
- Updated `AGENTS.md` with correct "Start Here" reading list and case-addition instructions.
- Added `.gitignore` for log files.

## 2026-05-02

### Added

- Created Case 001: The Door Is Real.
- Drafted 15 Case 001 artifacts.
- Built Case 001 playable prototype.
- Revised Case 001 content and experience.
- Created Case 002: The Half Synthetic Community.
- Drafted 15 Case 002 artifacts.
- Built Case 002 playable prototype.
- Built Archive Hub.
- Connected Case 001 and Case 002 through shared Archive state.
- Added future nodes for Case 003 and Case 004.
- Added `PROJECT_HANDOFF.md`.
- Added `AGENTS.md`.
- Added root project documentation:
  - `README.md`
  - `GAME_DESIGN.md`
  - `ARCHITECTURE.md`
  - `ROADMAP.md`
  - `CHANGELOG.md`
  - `CONTRIBUTING.md`

### Fixed

- Replaced unreliable `file://` usage with local server workflow.
- Moved cases under the Archive Hub origin to allow shared `localStorage`.
- Removed visible manual Archive recording controls from main case cards.
