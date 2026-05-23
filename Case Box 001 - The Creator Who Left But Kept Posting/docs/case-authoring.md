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
- `reconstructionBoard`: final case-sentence slots, claim options, canonical selection, and myth translations.
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

## Reconstruction Board

Phase 1 uses a three-slot board instead of lore-answer radio buttons:

- `person`: what happened to the person at the center.
- `account`: what happened to the account, record, or object that kept acting.
- `pressure`: what made the confusion useful.

Each option should include a plain-English `label`, a one-line `explanation`, a `sentencePart`, and optional `evidenceIds` for reviewed support cues. The board also needs `canonicalSelection`, `canonicalSentence`, `canonicalPlainAnswer`, `canonicalClassification`, and `mythTranslations`.

Keep old `readings` data only as a compatibility fallback when needed. New playable cases should author the board first.

## Authoring Rule

Every puzzle should answer this question:

What mythos concept does this teach through action?

Every reconstruction should answer this question:

What can a beginner say in plain English before the Archive gives it a myth name?
