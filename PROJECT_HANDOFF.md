# Network Mythos Interactive Archive - Project Handoff

## Current State

This workspace now contains a playable prototype for a multi-case interactive Archive experience.

The intended loop is:

1. Start at the Archive Hub.
2. Open a case.
3. Read evidence and unlock deeper artifacts.
4. Choose Publish, Bury, or Preserve.
5. The choice records back to the Archive.
6. The Archive updates meters, vault entries, mythic forces, witness consequences, and future case availability.

## Primary URL

Use the unified Archive Hub URL:

```text
http://127.0.0.1:4179/
```

Important: use the `4179` routes for cases too, because this keeps everything under one browser origin and allows shared localStorage.

Use:

```text
http://127.0.0.1:4179/case001/prototype/
http://127.0.0.1:4179/case002/prototype/
```

Avoid using the older standalone URLs:

```text
http://127.0.0.1:4177/prototype/
http://127.0.0.1:4178/prototype/
```

Those work as standalone case previews, but they do not share Archive state with the hub.

## Running The Prototype

The Archive Hub server is:

```text
Archive Hub/server.js
```

Start with:

```powershell
node "Archive Hub\server.js"
```

Or double-click:

```text
Archive Hub/start-archive.bat
```

The server serves:

- Archive Hub from `Archive Hub`
- Case 001 from `Case 001 - The Door Is Real`
- Case 002 from `Case 002 - The Half Synthetic Community`
- Case 003 from `Case 003 - The Human Premium`

## Archive Hub

Folder:

```text
Archive Hub/
```

Main files:

- `index.html`
- `styles.css`
- `script.js`
- `server.js`
- `start-archive.bat`

Current features:

- Case Map
- Case return summary moment when a newly recorded decision is detected
- Hub status strip for Decisions, Vault Entries, Mapped Forces, and Available Cases
- Archive Pressure meters:
  - Public Attention
  - Witness Trust
  - Archive Integrity
  - Network Awareness
- Evidence Vault
- Mythos Layer
- Witness Ledger
- End-State Forecast
- Locked future case nodes
- Collapsed Archive Override drawer for testing

Future case nodes currently shown:

- Case 004: The Lost Archive

Case 003 unlocks after two Archive decisions are recorded.
Case 004 becomes "Ready To Build" after three Archive decisions are recorded.

## Case 001

Folder:

```text
Case 001 - The Door Is Real/
```

Prototype URL:

```text
http://127.0.0.1:4179/case001/prototype/
```

Core question:

```text
Did Mara Vale really return?
```

Core lesson:

```text
Proof can become capture.
```

Status:

- Complete first playable case.
- 15 artifacts drafted.
- Prototype built.
- Content revision pass completed.
- Experience upgrade completed.
- Ending auto-records to Archive.

Important docs:

- `case-design.md`
- `artifact-manifest.md`
- `notes/mara-vale-profile.md`
- `notes/read-order-and-unlocks.md`
- `notes/case-001-completion-notes.md`
- `playtest/playtest-checklist.md`

## Case 002

Folder:

```text
Case 002 - The Half Synthetic Community/
```

Prototype URL:

```text
http://127.0.0.1:4179/case002/prototype/
```

Core question:

```text
If a synthetic community saved real people, was the belonging false?
```

Core lesson:

```text
Care can be real while consent is broken.
```

Status:

- Complete first playable case.
- 15 artifacts drafted.
- Prototype built by adapting Case 001 shell.
- Ending auto-records to Archive.
- Playtest checklist and read-order notes created.

Important docs:

- `case-design.md`
- `artifact-manifest.md`
- `notes/archive-bridge.md`
- `notes/read-order-and-unlocks.md`
- `playtest/playtest-checklist.md`

## Case 003

Folder:

```text
Case 003 - The Human Premium/
```

Prototype URL:

```text
http://127.0.0.1:4179/case003/prototype/
```

Core question:

```text
What happens when real human care becomes a paid upgrade?
```

Core lesson:

```text
Human care becomes a luxury when synthetic care becomes default.
```

Status:

- Complete first playable draft.
- 15 artifacts drafted.
- Prototype built by adapting Case 002 shell.
- Ending auto-records to Archive as `case003`.
- Playtest checklist and read-order notes created.
- Opening briefing now reads shared Archive state and shows a Case 003-specific Archive Pressure note.
- Content revision pass completed across Case 003's core and support artifacts, sharpening Nia's human stakes, Human Plus buyer language, worker pressure, contract logic, user privacy tension, Preserve's failure mode, and the final reconstruction.

Important docs:

- `case-design.md`
- `artifact-manifest.md`
- `notes/archive-bridge.md`
- `notes/read-order-and-unlocks.md`
- `playtest/playtest-checklist.md`

## Case 004

Folder:

```text
Case 004 - The Lost Archive/
```

Core question:

```text
Can the Archive remember the erased without turning them into material?
```

Core lesson:

```text
Memory can preserve the erased or consume them again.
```

Status:

- Design scaffold created.
- Artifact manifest planned and 15 artifacts drafted.
- Archive bridge, read-order notes, and playtest checklist created.
- Hub unlock rule set: becomes "Ready To Build" after three Archive decisions are recorded.
- Playable first draft prototype built by adapting Case 003 shell.
- Ending auto-records to Archive as `case004`.
- Return-to-Hub summary verified for Case 004 Preserve path.
- Act I content revision completed across artifacts 01-05, strengthening Tomas and Mira's human anchor, the clean public explanation, and proof-of-erasure inference rules.
- Revised Act I artifact text verified in the browser preview.
- Act II content revision completed across artifacts 06-12, sharpening deletion/retention audience asymmetry, worker self-implication, synthetic residue ambiguity, feature-retention utility, and Archive contamination risks.
- Revised Act II artifact text verified in the browser preview.
- Act III content revision completed across artifacts 13-15, making the witness split less clean, the inheritance protocol more operational and failure-prone, and the final choice costs clearer.
- Revised Act III artifact text verified in the browser preview.
- Full Case 004 end-to-end playtest completed on a fresh temporary origin.
- Playtest found and fixed a final-gate issue: final choices now require the family anchor, proof-of-erasure sample, Archive contamination warning, inheritance protocol, and final reconstruction.
- Preserve path records back to the Hub and shows Case 004 in the Archive Received moment, Evidence Vault, witness ledger, and consequence lead.
- Case 004 Publish, Bury, and Preserve return states compared.
- Archive Hub now includes a Latest Pressure panel that reacts to the most recent decision, with Case 004-specific copy for proof-of-erasure exposure, protected suppression, and consent-proxy custody.

Important docs:

- `case-design.md`
- `artifact-manifest.md`
- `notes/archive-bridge.md`
- `notes/read-order-and-unlocks.md`
- `playtest/playtest-checklist.md`

## Archive Choices

Every case ends with:

- Publish
- Bury
- Preserve

Across cases, these choices shape the Archive.

Publish:

- Increases Public Attention.
- Increases Network Awareness.
- Can increase accountability.
- Can turn truth into spectacle.

Bury:

- Protects witnesses and private memory.
- Can weaken Archive Integrity.
- Can allow false public narratives to dominate.

Preserve:

- Strengthens Archive Integrity.
- Usually protects Witness Trust.
- Slows public impact.
- Best represents the Archive's intended philosophy, but should not always feel clean.

## Current Tested Loop

The following was tested successfully:

1. Reset Archive.
2. Open Case 001 from Hub.
3. Unlock ending.
4. Choose Preserve.
5. Return to Archive.
6. Hub records Case 001 and updates meters/vault/ledger.
7. Open Case 002 from Hub.
8. Unlock ending.
9. Choose Publish.
10. Return to Archive.
11. Hub records Case 002 and updates meters/vault/ledger.

## Next Recommended Step

Decide how Case 004 should affect future case availability.

Primary questions:

```text
Should Publish, Bury, and Preserve alter future case availability differently?
Should the Hub path identity name or forecast respond more specifically to proof-of-erasure choices?
Does the player understand why the Archive itself is changed by holding the Lost?
What future case should follow a public proof-of-erasure conflict, a buried Lost Archive, or a consent-proxy inheritance protocol?
```

## High-Priority Improvements Before Scaling

1. Make the Archive Hub visually more distinctive from the case prototype shells.
2. Add a real "case completed" animation or summary moment on return to Archive.
3. Add a persistent Archive path identity, e.g. Broadcast / Hidden / Living / Captured risk.
4. Make Case 003 inherit the player's current Archive state more visibly.
5. Add a top-level design doc for the full series structure.

## Design North Star

The player is not just solving mysteries.

The player is deciding how truth should be held.

Ultimate objective:

```text
Build an Archive strong enough to reveal the Network's structure without becoming another part of the Network's machinery.
```
