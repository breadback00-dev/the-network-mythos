# Roadmap

This roadmap summarizes the public-facing next steps. `ULTIMATE_ROADMAP.md` contains the longer internal design plan.

## Current Build

- Four case folders are present.
- Case 001 and Case 002 are immediately playable from the Archive Hub.
- Case 003 unlocks after two Archive decisions.
- Case 004 unlocks after three Archive decisions.
- Archive state persists in browser `localStorage`.
- The shared case engine powers all case prototypes.

## Near-Term

- Playtest the four-case path from a clean browser profile.
- Tighten unlock pacing so each case produces a visible discovery within the first 5-8 minutes.
- Add a small "how to play" affordance inside the Hub without turning the interface into a tutorial page.
- Improve mobile layout for long artifact reading sessions.

## Next Content Pass

- Add more cross-case callbacks after Publish/Bury/Preserve choices.
- Expand witness ledger entries and vault consequences.
- Make late-case locks feel diegetic rather than purely numeric.
- Identify the strongest ending-state forecast for a first public demo.

## Technical Polish

- Add lightweight smoke tests for server routes and case discovery.
- Consider a single npm script for launching the Hub.
- Review accessibility states for locked evidence, active filters, and decision buttons.
- Add an optional hosted build path if the project is adapted for static deployment.
