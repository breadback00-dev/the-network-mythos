import { isEvidenceUnlocked } from "./puzzle-engine.js";
import { calculateSignalProfile, getDominantSignal, getRankedSignals } from "./signal-engine.js";

export function createInitialState(caseData) {
  return {
    activeEvidenceId: caseData.evidence[0]?.id || null,
    reviewedEvidence: new Set(caseData.evidence[0] ? [caseData.evidence[0].id] : []),
    solvedPuzzles: new Set(),
    puzzleAttempts: {},
    lastUnlockMessage: "",
    tagsByEvidence: {},
    submittedReading: null
  };
}

export function getVisibleEvidence(caseData, state) {
  return caseData.evidence.filter((item) => isEvidenceUnlocked(item, state.solvedPuzzles));
}

export function getRoutedEvidence(caseData, state) {
  const visibleEvidence = getVisibleEvidence(caseData, state);
  const profile = calculateSignalProfile(caseData, state.tagsByEvidence);
  const dominantSignal = getDominantSignal(profile);

  if (dominantSignal === "Unformed" || dominantSignal === "Mixed") {
    return visibleEvidence;
  }

  return visibleEvidence
    .map((item, index) => ({ item, index }))
    .sort((left, right) => {
      const leftMatch = left.item.expectedForces?.includes(dominantSignal) ? 1 : 0;
      const rightMatch = right.item.expectedForces?.includes(dominantSignal) ? 1 : 0;
      return rightMatch - leftMatch || left.index - right.index;
    })
    .map(({ item }) => item);
}

export function getActiveEvidence(caseData, state) {
  return caseData.evidence.find((item) => item.id === state.activeEvidenceId);
}

export function toggleForceTag(state, evidenceId, force) {
  const current = state.tagsByEvidence[evidenceId] || [];
  state.tagsByEvidence[evidenceId] = current.includes(force)
    ? current.filter((item) => item !== force)
    : [...current, force];
}

export function recordPuzzleAttempt(state, puzzleId) {
  state.puzzleAttempts[puzzleId] = (state.puzzleAttempts[puzzleId] || 0) + 1;
  return state.puzzleAttempts[puzzleId];
}

export function getCaseProgress(caseData, state) {
  const profile = calculateSignalProfile(caseData, state.tagsByEvidence);
  return {
    profile,
    dominantSignal: getDominantSignal(profile),
    rankedSignals: getRankedSignals(profile),
    visibleEvidence: getVisibleEvidence(caseData, state),
    routedEvidence: getRoutedEvidence(caseData, state)
  };
}
