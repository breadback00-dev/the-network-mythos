# Architecture

## Runtime Model

The project is a static browser prototype served by a small Node server.

Primary server:

```text
Archive Hub/server.js
```

Primary URL:

```text
http://127.0.0.1:4179/
```

## Shared-Origin Rule

The Archive Hub and all cases must run under the same origin so they can share `localStorage`.

Use:

```text
http://127.0.0.1:4179/
http://127.0.0.1:4179/case001/prototype/
http://127.0.0.1:4179/case002/prototype/
```

Do not use standalone case ports. They do not share Archive state with the Hub.

## Folder Structure

```text
Archive Hub/
  index.html
  styles.css
  script.js
  case-engine.js       <- shared case prototype engine
  server.js
Case 001 - The Door Is Real/
  artifacts/
  notes/
  playtest/
  prototype/
    case-config.js     <- case-specific data and hooks
    artifacts-data.js  <- pre-embedded artifact content
    index.html
    styles.css
  artifact-manifest.md
  case-data.json
  case-design.md
Case 002 - The Half Synthetic Community/
Case 003 - The Human Premium/
Case 004 - The Lost Archive/
```

## Case Discovery

The server auto-discovers cases by scanning sibling folders matching `Case \d+ - *`.
It exposes `/cases/index.json` listing discovered case IDs and titles.
The Hub fetches this at startup. No code changes are needed when a new case folder is added.

Unlock thresholds for locked cases live in each case's `case-data.json` as `unlockAfter: N`.

## Case Engine

All case prototype logic lives in a single shared engine:

```text
Archive Hub/case-engine.js
```

It is served at `/case-engine.js` and loaded by every case prototype.

Each case's `prototype/case-config.js` sets `window.CASE_CONFIG` with:

- `caseId` — used when recording Archive choices
- `storagePrefix` — unique localStorage key prefix per case
- `evidence` — array of artifact metadata (title, file, act, type, date, unlock, keywords)
- `unlockLevel(state)` — function returning current unlock tier (0-3)
- `leadLabels` — four phase labels shown in the sidebar lead banner
- `leadUnlockMessages` — messages shown when a lead tier unlocks
- `endingRequired` — artifact IDs that must be read to enable the ending
- `endingReadyMessage` / `endingLockedMessage`
- `outcomes` — Publish / Bury / Preserve copy and archive status labels
- `onOpenEvidence(item, archiveState)` — optional hook for cross-case effects
- `onInit(getArchiveState)` — optional hook for case-specific init (e.g. archive context panel)

Each case's `prototype/artifacts-data.js` sets `window.CASE_ARTIFACTS` with pre-embedded markdown content.

Load order in `index.html`:

```html
<script src="case-config.js"></script>
<script src="artifacts-data.js"></script>
<script src="/case-engine.js"></script>
```

## Archive State

Archive state is stored in browser `localStorage` under:

```text
network.archive.state
```

It tracks:

- case choices (Publish / Bury / Preserve per case ID)
- base meter values

The meters are:

- Public Attention
- Witness Trust
- Archive Integrity
- Network Awareness

Per-case read/flagged/notes state is stored under each case's `storagePrefix`:

```text
case001.read
case001.flagged
case001.notes
case001.theory.speaker / .proof / .hidden
```

## Adding A Case

1. Create `Case 00X - Title/` folder.
2. Draft `case-design.md` and `artifact-manifest.md`.
3. Write 15 artifacts in `artifacts/`.
4. Create `case-data.json` (used by the Hub — see existing cases for schema).
5. Create `prototype/case-config.js` setting `window.CASE_CONFIG`.
6. Generate `prototype/artifacts-data.js` setting `window.CASE_ARTIFACTS`.
7. Copy an existing `prototype/index.html` and `prototype/styles.css`.
8. Update the `<title>`, eyebrow, `<h1>`, briefing paragraph, and search placeholder in `index.html`.
9. The server discovers the case automatically. No server or Hub changes required.
10. Test through `http://127.0.0.1:4179/`.
