# The Network Mythos: Ultimate Roadmap

The strategic plan to evolve the Archive from a functional narrative prototype into a memorable, tactile, "Systems Horror" experience.

---

## Phase 1: Architecture & "Finding" — COMPLETE

*Goal: Ensure the game can scale to 10+ cases without breaking, and ensure the player feels like an investigator, not just a reader.*

- [x] **Decouple Case Data:** All Hub data (witnesses, vault, consequences, mythos) lives in per-case `case-data.json` files. The Hub fetches them dynamically.
- [x] **Shared Case Engine:** All case prototype logic extracted to `Archive Hub/case-engine.js`. Per-case `prototype/case-config.js` holds only case-specific data and hooks. Adding a new case requires no engine changes.
- [x] **Auto-Discovery:** Server discovers case folders automatically via filesystem scan. No hardcoded case lists anywhere.
- [x] **Investigator Notes as Rewards:** Notes section in each artifact is hidden by default. Player must flag the artifact as containing a contradiction to reveal the analysis.
- [x] **Hold-to-Confirm Endings:** Publish / Bury / Preserve requires a 2-second hold. Standardised across all cases.

## Phase 2: Tactility & The "Sync" Moment — NEXT

*Goal: Make the interface feel like a heavy, imperfect, diegetic tool rather than a standard webpage.*

- [x] **Case 001 Validated Contradictions:** Generic flags are now separated from configured discovery rewards, so Case 001 can teach comparison rather than rewarding every flag equally.
- [ ] **Visual Distinction:** Apply CSS to make the Archive Hub feel like a "Sanctuary" (clean, organised, archival) compared to the "Raw Data" feel of case dossiers (messy, fragmented, under surveillance).
- [ ] **The "Sync" Animation:** On return to Hub after a case, meters should physically tick up/down on screen. Text should "resolve" from static noise, giving ceremonial weight to the choice.
- [x] **Evidence-Pair Reward Board:** Validated contradictions show which artifacts have been meaningfully compared in Case 001, creating a clear "I solved that" payoff.
- [x] **Case 001 Hub Scar:** Publish, Bury, and Preserve each add a distinct Case 002 pressure note on the Archive Hub case card.
- [x] **Case 002 Opening Scar:** Case 002's opening briefing inherits the Case 001 choice scar directly from Archive state.
- [x] **Case 002 Validated Contradictions:** Configured discovery rewards now teach consent/memory contradictions with the same clarity as Case 001.
- [x] **Choice Balance Pass 1:** Case 001 and Case 002 final choices now present Publish, Bury, and Preserve as competing strategies with explicit benefits and harms.
- [x] **Choice Balance Pass 2:** Case 003 and Case 004 final choices now use the same balanced benefits/harms framing and remove Canonical Reading nudges.
- [x] **Release-Candidate Playtest Script:** Added a focused playtest plan for first 10 minutes, discovery rewards, choice balance, Hub scars, and Case 002 continuity.
- [x] **Evidence Pair Visibility:** Evidence Pairs now show a visible count and pulse when a new validated discovery is added.
- [x] **Case 003 Validated Contradictions:** Configured discovery rewards now teach class/rationing contradictions.
- [x] **Case 004 Validated Contradictions:** Configured discovery rewards now teach erasure/memory/consent-route contradictions.
- [ ] **Public Scope Decision:** Use playtest results to decide whether the first public prototype should include Cases 001-002 only, Cases 001-003, or the full four-case arc.
- [ ] **Audio Pass 1 (Atmosphere):** Ambient low-frequency server hum in the Hub. *Note: audio files must be added to `Archive Hub/assets/audio/` — engine wiring already exists.*
- [ ] **Audio Pass 2 (Diegetic UI):** Distinct sounds for meter changes, text rendering, and the three final choices.

## Phase 3: Systemic Consequences — Making Choices Hurt

*Goal: Translate narrative consequences into mechanical gameplay consequences.*

- [ ] **Mechanical Path Locks:** "Archive Path" affects gameplay. High `attention` (Broadcast Archive) pre-redacts sensitive artifacts in future cases. High `awareness` (Watched Archive) poisons search summaries with Network-shaped versions.
- [ ] **Vault Visual State:** CSS on Evidence Vault cards changes based on the choice made. Published artifacts look bleached and overexposed. Buried artifacts look corrupted or marked out. Preserved artifacts look sealed in cryptographic borders. *(vault card classes already exist — CSS not yet written)*
- [ ] **Echo Visualisation:** Brief glitchy pop-ups on return to Hub already exist in basic form. Expand per-case and per-path — specific messages, not generic noise.

## Phase 4: Epistemological Doubt — Systems Horror

*Goal: Make the player doubt the permanence and neutrality of the Archive itself.*

- [ ] **The Watcher:** A subtle UI element (blinking cursor, faint "Outbound Sync" text) that grows more aggressive as `Network Awareness` rises. At 70+ it becomes visible and unignorable.
- [ ] **Textual Gaslighting:** When `Archive Integrity` drops below 30, specific dates, names, or sentences in already-completed case artifacts subtly shift on revisit. The Network is altering the record.
- [ ] **Synthesis Mechanics:** Unlocking a Tier 3 artifact requires dragging and combining two specific Tier 2 artifacts (proving a contradiction) rather than passively reading them.

---

## Content Pipeline

Cases 001–004 are playable. Each future case should:

- Define one new structural lesson about the Network.
- Introduce at least one new Mythos force or extend an existing one.
- React to the player's current Archive path in its opening briefing.
- Test a different case type (identity, community, market, memory, ...).

---

## Sequencing

Phase 1 is complete. Phase 2 → Phase 3 → Phase 4 is the right order: feel before consequence, consequence before horror.
