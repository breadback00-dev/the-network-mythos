# AGENTS.md

## Project

The Network Mythos Interactive Archive is a browser-based narrative investigation prototype.

The experience is built around:

- An Archive Hub
- Playable case dossiers
- Cross-case consequences
- Publish / Bury / Preserve decisions

The player is not simply solving mysteries. The player is deciding how dangerous truths should be held.

## Start Here

Read first:

1. `PROJECT_HANDOFF.md`
2. `Archive Hub/script.js`
3. The relevant case's `case-design.md`
4. The relevant case's `artifact-manifest.md`

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

When adding a new case:

1. Create a new `Case 00X - Title/` folder.
2. Include:
   - `case-design.md`
   - `artifact-manifest.md`
   - `artifacts/`
   - `prototype/`
   - `notes/`
   - `playtest/`
3. Add the case to `Archive Hub/script.js`.
4. Update `Archive Hub/server.js` with a route for the case.
5. Make the case ending call `recordArchiveChoice("case00X", ending)`.
6. Ensure all case URLs use the `4179` shared-origin route.

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
