# Release Readiness Plan

This plan turns the current prototype from a strong narrative archive into a more reward-rich public game prototype.

## Product Bet

The first public version should target interactive fiction readers, ARG/mystery players, internet-culture readers, AI ethics/media people, and slow-burn systems-horror fans.

Do not aim the first release at general game audiences. The core strength is intimate investigative reading with moral consequence.

## First Public Release Shape

Release one polished public episode before presenting the full four-case arc.

Recommended first release:

- Archive Hub
- Case 001: The Door Is Real
- A reactive Case 002 teaser or locked next lead
- One visible Archive consequence from the Case 001 ending

Primary goal: prove that players finish Case 001, understand the dilemma, and want the next case.

## Target Experience

- First-session target: 30-45 minutes.
- First curiosity beat: within 2 minutes.
- First discovery reward: within 5-8 minutes.
- Meaningful game response: every 5-7 minutes.

The player should feel:

- curious about the mystery
- clever for comparing evidence
- unsettled by the system response
- responsible for how truth is handled

## Reward Standards

The game should not reward only with more text.

Use at least one of these reward types every few minutes:

- a validated contradiction
- a decrypted investigator note
- an evidence pair connection
- a visible Archive state change
- a witness trust or pressure change
- a corrupted, redacted, or altered future artifact
- a choice scar in the Hub or next case opening

## Choice Standards

Publish, Bury, and Preserve must all have real strategic value.

Publish should sometimes unlock whistleblowers, public pressure, and accountability evidence.

Bury should sometimes protect witnesses, lower Network Awareness, and open private routes.

Preserve should sometimes build integrity and trust, but must also risk delay, gatekeeping, and institutional self-comfort.

Preserve is the Archive's philosophical center, not the universal correct answer.

## Case 001 Immediate Goals

1. Make the first 10 minutes feel like investigation, not reading homework.
2. Make contradiction flagging reward comparison, not button-clicking.
3. Make the first validated contradiction feel like a discovery.
4. Make the final choice feel risky in all three directions.
5. Make the Archive visibly changed after the ending.

## Playtest Gates

Before a public release, run at least 5 blind playtests. Use `PLAYTEST_RELEASE_CANDIDATE.md` for the current build.

Track:

- time to first engaged comment
- time to first confusion
- time to first discovery reward
- whether players use search, flags, and notes
- whether players can summarize the central dilemma
- whether players want Case 002

Pass criteria:

- at least half finish Case 001
- at least half can explain why system proof is not human proof
- at least half understand their final choice's cost
- at least half ask about the next case or discuss alternate endings

## Current Build Slice

Started:

- Case 001 contradiction rewards are now configured separately from generic flags.
- Validated contradictions can unlock stronger investigator notes.
- Speculative flags remain possible but no longer all count as equal discovery.
- Case 001 validated discoveries now appear in an Evidence Pairs section on the caseboard.
- Case 001 endings now add a choice scar to the Case 002 card in the Archive Hub.
- Case 002's opening briefing now inherits the player's Case 001 choice as a Broadcast, Hidden, or Living scar.
- Case 002 contradiction rewards are now configured separately from generic flags.
- Case 002 validated discoveries now appear in an Evidence Pairs section on the caseboard.
- Case 001 and Case 002 final reconstructions now frame Publish, Bury, and Preserve as competing strategies with explicit gains and risks.
- Case 001 and Case 002 ending result copy now avoids presenting Preserve as the clean default.
- Case 003 and Case 004 final reconstructions and ending result copy now use the same balanced choice framing.
- Evidence Pairs now show a visible count and pulse when a new validated discovery is added.
- Case 003 now has configured validated contradiction rewards and an Evidence Pairs section.
- Case 004 now has configured validated contradiction rewards and an Evidence Pairs section.

Next:

- Run the release-candidate playtest and use failures to decide whether the first public scope should include Cases 001-002 only, Cases 001-003, or the full four-case arc.
