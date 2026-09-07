# Demonstration verification — 7 September 2026

Scope: unit U9's first playable room from the [earlier next-version plan](../../docs/plans/2026-09-07-0010-network-mythos-next-version-plan.md), isolated under `prototypes/archive-3d/`. Unit identifiers do not refer to the newer Enter the Network plan. This is technical demonstration evidence, not completion of the full plan or human usability validation.

## Automated checks

Five Node test cases passed. They cover rejecting unsupported deductions, accepting the correct two-source connection, gating and distinguishing sample consequences, and serving local media safely with byte-range seeking. The server checks include GET, HEAD, partial responses, missing files, invalid ranges, path traversal, and malformed paths. The browser bundle builds successfully.

## Browser checks performed

- Entered the rendered 3D room and opened its stations in the Codex browser.
- Pinned only the public summary: the correct claim was rejected without its second source.
- Pinned the summary and verification limitation: an assertion of replacement was rejected; uncertainty about the operator was accepted.
- Opened the Publish sample consequence and observed the room's changed text and terminal. The terminal distinguishes the withdrawn source from its retained archive copy.
- Loaded the actual 28.174-second vertical WebM and played it through the native player. Closing evidence paused the video.
- Loaded and played the approximately 37.6-second voice message. Inspected the rendered transcript and native player.
- Inspected the meme and repost context at a 320-pixel viewport.
- Checked desk navigation, evidence reading, mobile media layout, and stacked comparison passages at a 320-pixel viewport.
- Checked keyboard focus after switching documents and Escape returning focus to the originating station.
- Reloaded the page and observed a fresh investigation.

The browser exposed a deprecated shadow setting, corrected to the supported equivalent. Layout fixes address narrow media overflow and overlapping station labels. Temporary caption timing and voice quality still need human review.

## Still to validate

First-time-player observations; whether 3D improves comprehension or engagement over desk view; complete keyboard-only and assistive-technology playthroughs; browser and device compatibility; deliberately interrupted/failed media; WebGL failure and restoration; prolonged sessions; a full 200% zoom audit; final audio mix and caption timing. Bury and Preserve have automated consequence checks but have not had separate complete visual playthroughs.

The two-case release, durable game state, production endings, and final content are outside this demonstration. No completion of those requirements is claimed.

## Repository publication check — 7 September 2026

The five existing Node tests passed again while preparing this source for GitHub. A separate clean copy containing only the 25 files intended for GitHub then passed `npm ci --no-audit --no-fund`, `npm run build`, and `npm test` (five tests). It started without the existing dependencies or generated browser bundle, confirming that the saved source and lockfile can reproduce the demonstration bundle.

The checks ran without changing the existing Archive Hub. The README now distinguishes a source checkout, which needs a bundle build, from an already built demo package. The browser observations above are from the original demonstration session and were not repeated for this documentation-only packaging change.
