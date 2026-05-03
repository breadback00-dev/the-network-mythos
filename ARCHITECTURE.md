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

Avoid old standalone case ports for active play:

```text
http://127.0.0.1:4177/prototype/
http://127.0.0.1:4178/prototype/
```

## Folder Structure

```text
Archive Hub/
Case 001 - The Door Is Real/
Case 002 - The Half Synthetic Community/
The Network Mythos - A Myth Bible.md
The Network Mythos - Canon Bible.md
PROJECT_HANDOFF.md
AGENTS.md
README.md
GAME_DESIGN.md
ARCHITECTURE.md
ROADMAP.md
CHANGELOG.md
CONTRIBUTING.md
```

## Case Structure

Each case should use:

```text
Case 00X - Title/
  artifacts/
  notes/
  playtest/
  prototype/
  artifact-manifest.md
  case-design.md
```

## Archive State

Archive state is stored in browser `localStorage` under:

```text
network.archive.state
```

It currently tracks:

- case choices
- base meter values

The meters are:

- Public Attention
- Witness Trust
- Archive Integrity
- Network Awareness

## Adding A Case

1. Create a new case folder.
2. Draft `case-design.md`.
3. Draft `artifact-manifest.md`.
4. Write 15 artifacts.
5. Copy/adapt a prototype shell.
6. Generate `prototype/artifacts-data.js`.
7. Add a route in `Archive Hub/server.js`.
8. Add a case node in `Archive Hub/script.js`.
9. Ensure ending choices call `recordArchiveChoice("case00X", ending)`.
10. Test through `http://127.0.0.1:4179/`.

