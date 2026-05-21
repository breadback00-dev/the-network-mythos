export function normalizeAnswer(value) {
  return value.trim().toLowerCase();
}

export function findPuzzle(caseData, puzzleId) {
  return caseData.puzzles.find((puzzle) => puzzle.id === puzzleId);
}

export function checkPuzzleAnswer(puzzle, answer) {
  if (!puzzle) return false;
  return normalizeAnswer(answer) === normalizeAnswer(puzzle.answer);
}

export function isEvidenceUnlocked(evidence, solvedPuzzles) {
  if (!evidence.unlockCondition) return true;

  if (evidence.unlockCondition.type === "puzzleSolved") {
    return solvedPuzzles.has(evidence.unlockCondition.puzzleId);
  }

  return true;
}

