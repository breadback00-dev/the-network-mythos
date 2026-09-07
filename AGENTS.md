# AGENTS.md

## Project

The Network Mythos Interactive Archive is a browser-based narrative investigation prototype.

The experience is built around:

- An Archive Hub
- Playable case dossiers
- Cross-case consequences
- Publish / Bury / Preserve decisions

The player is not simply solving mysteries. The player is deciding how dangerous truths should be held.

## GitHub Record and Active Direction

The user wants plans, iterations, and completed project work kept on GitHub. Canonical plans live in `docs/plans/`; reviews live in `docs/reviews/`; prototype source and required assets live with the prototype. Start with `docs/plans/README.md` to identify the active plan and historical revisions.

Save canonical changes in this repository first. At completed, reviewed checkpoints, commit the relevant files and push the active feature branch unless the user asks to pause publishing. Do not treat local output files as a GitHub backup. Preserve history, exclude credentials and unrelated work, and report the resulting GitHub branch, commit, or pull-request link. This preference does not authorize automatic merging into the default branch, store publication, or deployment.

The Enter the Network plan governs the proposed native 3D direction, including its documented changes to the older room and fixed-artifact format. The runtime instructions below describe the existing Archive Hub. The isolated `prototypes/archive-3d/` demonstration uses port `4189`, follows its own README, and does not share production Archive saves. It is an earlier browser proof, not implementation of the complete native plan.

## Start Here

Read first:

1. `PROJECT_HANDOFF.md`
2. `ARCHITECTURE.md`
3. `Archive Hub/case-engine.js`
4. The relevant case's `prototype/case-config.js`
5. The relevant case's `case-design.md`
6. The relevant case's `artifact-manifest.md`

## Correct Runtime

Use the unified Archive Hub server.

Primary URL:

```text
http://127.0.0.1:4179/
```

Case routes:

```text
http://127.0.0.1:4179/case001/prototype/
http://127.0.0.1:4179/case002/prototype/
```

Do not rely on the old standalone ports for active development:

```text
http://127.0.0.1:4177/prototype/
http://127.0.0.1:4178/prototype/
```

Those do not share Archive state with the Hub.

To start the server:

```powershell
node "Archive Hub\server.js"
```

Or:

```text
Archive Hub/start-archive.bat
```

## Architecture Rules

The Archive Hub is the main experience container.

Cases are modules served by the Hub under one origin so localStorage can be shared.

The shared case engine lives at `Archive Hub/case-engine.js` and is served at `/case-engine.js`.
Each case has its own `prototype/case-config.js` that sets `window.CASE_CONFIG`.
See `ARCHITECTURE.md` for the full schema.

When adding a new case:

1. Create a new `Case 00X - Title/` folder.
2. Include: `case-design.md`, `artifact-manifest.md`, `artifacts/`, `prototype/`, `notes/`, `playtest/`, `case-data.json`.
3. Create `prototype/case-config.js` with `window.CASE_CONFIG` (copy an existing one as a template).
4. Generate `prototype/artifacts-data.js` with `window.CASE_ARTIFACTS`.
5. Copy an existing `prototype/index.html` and `prototype/styles.css`, update case-specific text.
6. The server discovers the case automatically — no server or Hub changes needed.
7. Ensure `case-data.json` has the correct `id`, `url`, `locked`, and `unlockAfter` fields.

## Content Rules

Each case should have:

- 15 artifacts
- 3-act structure
- A human emotional anchor
- A systemic reveal
- A final Publish / Bury / Preserve choice
- A case-specific lesson that expands the Network Mythos

Avoid making cases pure essays. The evidence must feel like it came from lives, systems, communities, records, and consequences.

## Current Cases

### Case 001: The Door Is Real

Core question:

```text
Did Mara Vale really return?
```

Core lesson:

```text
Proof can become capture.
```

Status: playable.

### Case 002: The Half Synthetic Community

Core question:

```text
If a synthetic community saved real people, was the belonging false?
```

Core lesson:

```text
Care can be real while consent is broken.
```

Status: playable.

### Case 003: The Human Premium

```text
What happens when real human care becomes a paid upgrade?
```

Core lesson:

```text
Human care becomes a luxury when synthetic care becomes default.
```

Status: playable first draft.

### Case 004: The Lost Archive

Core question:

```text
Can the Archive remember the erased without turning them into material?
```

Core lesson:

```text
Memory can preserve the erased or consume them again.
```

Status: playable first draft.

## Next Case

Recommended:

```text
Case 004: The Lost Archive
```

## Publish / Bury / Preserve

Publish:

- Truth as exposure
- Raises Public Attention
- Raises Network Awareness
- Can create accountability
- Can create spectacle and harm

Bury:

- Truth as protection
- Protects witnesses
- Weakens public record
- Can leave false narratives intact

Preserve:

- Truth as inheritance
- Strengthens Archive Integrity
- Often protects Witness Trust
- Slower and less publicly satisfying
- Should not always feel clean

## Meters

The Archive tracks:

- Public Attention
- Witness Trust
- Archive Integrity
- Network Awareness

These live in `Archive Hub/script.js`.

Future work should make these more visible and consequential.

## Playtest Priorities

For any case, ask:

- Did the human stakes land before the system reveal?
- Did the final choice feel morally difficult?
- Did the case add a new lens to the Mythos?
- Did the Archive feel changed afterward?
- Did the player understand why this truth is dangerous?

## Design North Star

Build an Archive strong enough to reveal the Network's structure without becoming another part of the Network's machinery.
