# Illustrated chapter verification

Date: 7 September 2026. Status: internal preview, not all product acceptance gates complete.

## Scope

Four illustrated locations, five expressive portraits, twelve source records, three validated deductions, optional dialogue abilities, remembered assurance/correction, six base endings with 24 relationship/history combinations, browser save/export/import/reset, captioned video, two provisional voices, and contextual meme. The earlier prototypes and save keys are separate.

U1-U9 have implementation coverage. U10 has automated and in-app verification; human story/pacing and physical-device checks remain pending. U11 publication evidence is recorded separately in release-record.md. Do not mark the whole plan complete from this checkpoint.

## Checks

- Node 24.14.0; Playwright 1.63.0; Prettier 3.9.6. No production dependencies, no configured linter or type checker. Formatting is not a lint/type-check claim.
- 36 Node tests pass: actual authored references, each emphasis, all 24 ending combinations, constrained claims, once-only progression, stale/altered previews, schema validation, closed-run behavior and reordered JSON member roundtrips.
- Three-browser suite covers all six endings and reload, 390px layout/200% reading size, keyboard map controls, media decode/seek/transcript/captions, actual missing-media paths, failed writes, stale tabs, isolated legacy keys, invalid imports, successful export-reset-import, session-only mode and stalled chapter-data recovery. Final result appended below.
- Actual Codex in-app browser: full Archive -> Oracle -> Arbiter -> Archive route; Elian assurance; D1/D2/D3; ability improvement; Preserve/withheld exact packet; saved ending reloaded at revision 18. All six advertised WebMCP tools exercised, including invalid hidden-source/premature-ending calls and a rejected stale reset. Reset testing used an isolated localhost QA run, not the user's preview run.
- In-app transport revealed object-member reordering. Confirmation now compares canonical JSON while preserving array order, all values and extra-member rejection. The real tool roundtrip subsequently committed and survived reload. Unit coverage reproduces the transport condition.
- Cold-cache desktop measurement: Chromium 153.0.8010.12, Windows, 1440x900; simulated 10 Mbps down/up and 100 ms latency. First heading and scene image decoded in 1,346 ms. Initial transfer 286,937 bytes across 23 resources plus navigation. Local static serving, not an internet/CDN measurement. New chapter is 4,640,018 bytes before manifest overhead; below the 25 MB budget. Preserved Godot build excluded.
- Rendered Archive preview visually inspected. No horizontal overflow at the automated 390px/200% setting. This is not a claim of a complete keyboard-only or physical-phone playthrough.

## Limits and follow-up

Final browser result: 63/63 passed in 3.9 minutes on Chromium 153.0.8010.12 (1243), Firefox 155.0 (1543), and WebKit 26.6 (2359), using the approved external runner. Formatting check passes. All six base endings completed and reloaded in each engine. The final 36-test Node suite also passes.

Human voice intelligibility, caption timing, story emotion, first-player pacing, complete keyboard-only navigation, physical iOS/Android behavior and fresh-player recruitment remain open under playtest-protocol.md. No campaign expansion until those results are reviewed.

Test-environment notes: Firefox could not create pages inside the restricted runner; final browser validation uses the approved external runner. A WebKit media-abort mock did not intercept native media transport; the corrected test points to an actual missing URL. Neither runner failure is presented as a proven product defect.
