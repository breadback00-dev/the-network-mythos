# Release Candidate Playtest

Use this for the next public-prototype readiness pass. It tests whether the current build feels like an investigative game, not only a strong narrative archive.

## Test Scope

Run the test through the unified Hub:

```text
http://127.0.0.1:4179/
```

Minimum test path:

1. Start at the Archive Hub.
2. Play Case 001 until a final choice is recorded.
3. Return to the Hub.
4. Open Case 002 and read the opening briefing.
5. Continue Case 002 until at least one validated Evidence Pair is discovered.

Optional extended path:

Continue Case 002 through its final choice.

## Tester Profile

Use 5-8 testers before public release.

Prioritize:

- interactive fiction readers
- ARG or mystery fans
- people interested in AI/platform culture
- people who enjoy slow-burn horror, archives, or document games

Include 1-2 adjacent testers who are curious but not already ideal audience. Do not use them as the main design compass, but watch where they drop off.

## Before Starting

Do not explain the lore.

Say only:

```text
This is a browser-based investigation game. Please think out loud when something interests, confuses, rewards, or bores you.
```

Do not explain Publish, Bury, or Preserve before the game does.

## Observer Timing

Record timestamps for:

- first clear curiosity moment
- first confusion or hesitation
- first use of search
- first contradiction flag
- first validated Evidence Pair
- first use of player notes or theory fields
- final Case 001 choice
- return to Hub
- recognition of Case 002 scar
- first Case 002 Evidence Pair

## First 10 Minutes

Pass if:

- the player understands the core Case 001 question
- the player opens multiple artifacts voluntarily
- the player notices at least one tension between public proof and human proof
- the player receives or is close to receiving a discovery reward

Watch for:

- reading without investigating
- clicking everything mechanically
- ignoring search/flags because they seem optional
- asking what the goal is after 10 minutes
- treating the interface as a static document viewer

## Discovery Reward Test

Ask after the first validated Evidence Pair:

- What did the game just reward you for?
- Did the Evidence Pair make you feel like you discovered something?
- Did it make you want to compare more documents?
- Did the locked/unlocked notes feel fair?

Pass if the player understands that the reward came from comparison, not from random clicking.

## Case 001 Choice Test

Before the player chooses, ask:

- What would Publish accomplish?
- What would Bury protect?
- What would Preserve risk?
- Which option feels most tempting?
- Which option feels most dangerous?

Pass if at least two options feel genuinely viable.

Fail if Preserve feels like the obvious correct answer because the game appears to endorse it.

## Hub Scar Test

After returning to the Hub, watch whether the player notices:

- the Archive Received moment
- the changed meters
- the Case 002 card scar
- the Latest Pressure panel

Ask:

- What changed because of your decision?
- Do you believe Case 002 will begin differently because of what you did?

Pass if the player can name at least one visible consequence without prompting.

## Case 002 Opening Test

When Case 002 opens, ask:

- Did this briefing feel connected to your Case 001 decision?
- Did the scar make you feel watched, trusted, exposed, or responsible?
- Did it change how you expect to handle this case?

Pass if the player recognizes the Archive as carrying history forward.

## Case 002 Discovery Test

After the first Case 002 Evidence Pair, ask:

- What is the central contradiction in this case?
- Did the care feel fake, real, compromised, or something else?
- Who do you currently feel protective of?

Pass if the player says some version of:

```text
The care worked, and consent was broken.
```

## Post-Test Questions

Ask these after the session:

- Where did this first feel like a game?
- Where did it feel most like homework?
- Which artifact felt most alive?
- Which reward felt most satisfying?
- Which system felt unnecessary or invisible?
- Did your final choice feel authored by you?
- Would you send this to someone else?
- What would you tell them it is?

## Release Gates

Ready for a small public prototype if:

- at least half of testers finish Case 001
- at least half discover one validated Evidence Pair without coaching
- at least half understand the Case 001 choice tradeoffs
- at least half notice a Hub or Case 002 consequence
- at least half want to continue or ask what the next case is

Not ready if:

- players mostly read passively
- players do not understand what flags are for
- Preserve feels like the only correct ending
- the Hub return feels like a summary screen rather than consequence
- Case 002 feels disconnected from Case 001

## Priority Fixes From Test Results

If players miss the first discovery:

- make the first validated contradiction more obvious
- add a subtle prompt after three artifacts
- strengthen the lead banner copy

If players ignore Evidence Pairs:

- move the Evidence Pairs section higher
- add a small pulse or count when a pair is discovered
- mention pair discovery in the briefing

If choices feel flat:

- make each option unlock a distinct future lead
- make the ending status labels more concrete
- add one visible downside immediately after each choice

If the Hub scar is missed:

- place the scar nearer the Case 002 button
- animate the scar on first return
- repeat the scar in the Case 002 opening, as currently implemented
