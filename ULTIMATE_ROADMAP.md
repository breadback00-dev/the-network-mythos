# The Network Mythos: Ultimate Roadmap

This document outlines the strategic plan to evolve the Network Mythos Interactive Archive from a functional narrative prototype into a memorable, tactile, "Systems Horror" experience. 

It combines necessary technical scaling with deep psychological and experiential design upgrades.

---

## Phase 1: Architecture & "Finding" (The Foundation)
*Goal: Ensure the game can scale to 10+ cases without breaking, and ensure the player feels like an investigator, not just a reader.*

*   [ ] **Decouple Case Data:** Extract all case data (Witness Profiles, Vault Descriptions, Consequences) out of the monolithic `Archive Hub/script.js` and into individual `case-data.json` files within each case folder. Update the Hub to fetch this data dynamically.
*   [ ] **Investigator Notes as Rewards:** Modify the artifact UI so "Investigator Notes" are hidden by default. The player must "flag" or "decrypt" the artifact to reveal the explanation, reinforcing the "Evidence first, explanation second" pillar.
*   [ ] **Visual Distinction:** Apply CSS changes to make the Archive Hub feel distinctly like a "Sanctuary" (clean, organized) compared to the "Raw Data" feel of the Case Dossiers (messy, fragmented).

## Phase 2: Tactility & The "Sync" Moment (Making it Physical)
*Goal: Make the interface feel like a heavy, imperfect, diegetic tool rather than a standard webpage.*

*   [ ] **The "Sync" Animation:** When returning to the Hub after a case, implement a "Commit to Archive" animation. Meters should physically tick up/down on screen, and text should "resolve" from static, giving ceremonial weight to the player's choice.
*   [ ] **Mechanical Friction:** Replace the simple click for "Publish/Bury/Preserve" with a hold-to-confirm interaction (e.g., holding the button for 3 seconds while a "Protocol Initiating" bar fills).
*   [ ] **Audio Pass 1 (Atmosphere):** Implement an ambient, low-frequency server hum in the Hub.
*   [ ] **Audio Pass 2 (Diegetic UI):** Add mechanical sounds for UI interactions—heavy vault tumblers for meter changes, keyboard clacks for text rendering, and distinct sounds for final choices (e.g., a heavy thud for Preserve, a sharp ping for Publish).

## Phase 3: Systemic Consequences (Making Choices Hurt)
*Goal: Translate the narrative consequences into mechanical gameplay consequences.*

*   [ ] **Mechanical Path Locks:** Update case logic so that your "Archive Path" affects gameplay. For example, if your path is "Broadcast Archive" (High Attention), certain sensitive artifacts in future cases may be pre-emptively "Redacted" by the Network before you can read them.
*   [ ] **The Vault's Physical State:** Change the CSS of artifacts in the Evidence Vault based on their state. *Published* artifacts look bleached and heavily tracked. *Buried* artifacts look corrupted or covered in black marker. *Preserved* artifacts look encased in complex cryptographic borders.
*   [ ] **Visualizing "Echoes":** Instead of just reading a consequence summary, implement brief, glitchy pop-ups upon returning to the Hub (e.g., a fleeting angry public comment if you Published, or a silenced connection error if you Buried).

## Phase 4: Epistemological Doubt (Systems Horror)
*Goal: Gaslight the player and make them doubt the permanence and neutrality of the Archive.*

*   [ ] **The Watcher:** Add a subtle UI element (like a blinking terminal cursor or faint "Outbound Sync" text) that becomes more aggressive and noticeable as the *Network Awareness* meter rises.
*   [ ] **Textual Gaslighting:** Implement a script that triggers if *Archive Integrity* drops below 30. When revisiting older, already-completed cases, specific dates, names, or sentences in artifacts will subtly shift or disappear. If the player notices, they realize the Network is altering their history.
*   [ ] **Synthesis Mechanics:** Introduce a new puzzle mechanic where unlocking a Tier 3 artifact requires physically dragging and combining two Tier 2 artifacts together (proving a contradiction) rather than just reading them.

---

## Next Steps
This roadmap is designed to be tackled sequentially. Phase 1 stabilizes the platform, Phase 2 grounds the player in the world, Phase 3 makes their choices matter, and Phase 4 delivers the masterpiece polish.
