# Contributing / Working Notes

This is currently a personal creative prototype, not an open-source collaboration project.

Use this file as a lightweight workflow guide.

## Before Editing

Read:

1. `PROJECT_HANDOFF.md`
2. `AGENTS.md`
3. `GAME_DESIGN.md`
4. `ARCHITECTURE.md`

## Development Rules

- Use the unified Archive Hub server on port `4179`.
- Do not rely on standalone case ports for integrated testing.
- Keep case artifacts as markdown source files.
- Regenerate `prototype/artifacts-data.js` after editing artifacts.
- Keep each case centered on a human emotional anchor.
- Avoid adding lore that does not create playable consequence.

## Content Workflow

For a new case:

1. Define the core question.
2. Define the core lesson.
3. Draft a 15-artifact manifest.
4. Write Act I so the human stakes land first.
5. Write Act II so the system reveal complicates, not replaces, the human stakes.
6. Write Act III around the final Archive decision.
7. Build prototype.
8. Playtest from the Archive Hub.

## Test Checklist

- Hub opens at `http://127.0.0.1:4179/`.
- Case opens under the `4179` route.
- Evidence unlocks correctly.
- Ending choice appears.
- Publish/Bury/Preserve records to Archive.
- Archive meters update.
- Evidence Vault updates.
- Witness Ledger updates.
- Forecast still makes sense.

