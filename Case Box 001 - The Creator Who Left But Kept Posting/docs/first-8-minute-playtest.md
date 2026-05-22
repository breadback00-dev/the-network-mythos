# First 8-Minute Playtest Pass

Date: 2026-05-22

## Purpose

Verify that the opening minutes of Case Box 001 feel like investigation rather than passive reading.

This is a self-run implementation pass, not a blind human playtest. It checks whether the current build supports the intended first-session beats and records what still needs a real tester.

## Test Path

Target path for a first-time player:

1. Open the Case Box.
2. Inspect "The Final Thread."
3. Notice the human stakes: Mara is leaving public life and asks not to be found through the Network.
4. Inspect "Elian Refuses Proof."
5. Tag both artifacts with `Returned`.
6. Notice that the signal profile forms a `Returned` route.
7. See route-surfaced bonus evidence appear.
8. Open "Human Verification Failed."
9. Try an incorrect proof-style answer and receive a hint.
10. Enter `absence`.
11. Unlock "Continuity Clause."
12. See the recap update before final submission.

## Results

- Opening state: 6 visible evidence items; active item is "The Final Thread."
- After tagging "The Final Thread" and "Elian Refuses Proof" with `Returned`, the dominant path becomes `Returned`.
- Route-surfaced bonus evidence appears: "Offline Errand Receipt."
- Routed evidence order moves `Returned`-relevant evidence forward.
- Wrong gate answer is rejected.
- First failed attempt increments the hint state.
- Correct gate answer `absence` is accepted.
- Gate unlocks "Continuity Clause."
- After unlock, 8 evidence items are visible: 6 initial, 1 route bonus, 1 gate-unlocked memo.
- Recap inputs show reviewed evidence count, gate status, path, and bonus evidence.

## Acceptance Check

- The player can understand the investigation target in the first minute: pass in content structure; needs blind tester confirmation.
- The first 5-8 minutes contain active investigation: pass. Inspecting, tagging, route surfacing, failed gate feedback, and unlock are all reachable.
- The player can notice interpretation tracking: pass in UI support; needs blind tester confirmation.
- The player can distinguish route from truth: pass in route note and final reveal; needs blind tester confirmation.
- The player wants to continue after the reveal: not tested; requires blind playtest.

## Observed Risks

- A player may still read several artifacts before touching tags if they do not notice the tag panel.
- The `Returned` path currently provides the cleanest first-8-minute route because the gate and witness evidence both support it.
- Bonus evidence can appear before the gate unlock, which is good for route responsiveness but may compete with the gate as the first discovery beat.
- The current environment could not capture a browser screenshot or run full browser automation; visual validation still needs a human/browser pass.

## Blind Playtest Script

Give the tester only this prompt:

```text
Open the Case Box and think aloud for eight minutes. Say what you believe happened, what you think the interface is asking you to do, and what changed because of your choices.
```

Watch for:

- Do they identify Mara as a person before describing the system?
- Do they inspect at least two artifacts?
- Do they tag evidence without being told?
- Do they notice the dominant signal change?
- Do they find the gate?
- Do they understand the hint after a wrong answer?
- Do they describe `absence` as a clue rather than a random password?
- Do they notice bonus evidence or route ordering?
- Do they say what they would do next?

## Next Fixes If Testers Stall

- If testers do not tag evidence, make the tag panel more visually connected to the active artifact.
- If testers miss the gate, make "Human Verification Failed" look more clearly interactive in the evidence inbox.
- If testers solve the gate but miss the unlocked memo, add a stronger inbox pulse or temporary "new" state.
- If testers think tags change the truth, strengthen route/truth language in the recap and reveal.
