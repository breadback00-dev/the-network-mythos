# Case Authoring

## Case Schema

Each case lives in `src/data/`.

Core fields:

- `id`: stable case id.
- `title`: display title.
- `summary`: short premise.
- `forces`: force vocabulary for this case.
- `evidence`: evidence items.
- `puzzles`: nested puzzle definitions.
- `readings`: final answer options.
- `canonicalReading`: correct answer id.
- `pathReveals`: end-of-case route summaries.

## Evidence Item

Evidence items should include:

- `id`
- `type`
- `date`
- `title`
- `body`
- `expectedForces`
- `timeline`
- `unlockCondition`
- `puzzleId`

`unlockCondition` can be omitted for always-visible evidence.

## Puzzle Types

Phase 1 supports simple puzzle gates:

- `access-code`: player enters a phrase or code.
- `research-prompt`: player reads a prompt and answers a concept question.
- `verification`: fake human-verification puzzle.

Later puzzle types can include crosswords, image inspection, archive diffs, and timeline ordering.

## Authoring Rule

Every puzzle should answer this question:

What mythos concept does this teach through action?

