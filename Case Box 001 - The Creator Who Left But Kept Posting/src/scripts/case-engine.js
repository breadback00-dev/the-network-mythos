import { isEvidenceUnlocked } from "./puzzle-engine.js";
import { calculateSignalProfile, getDominantSignal } from "./signal-engine.js";

export function createInitialState(caseData) {
  return {
    activeEvidenceId: caseData.evidence[0]?.id || null,
    reviewedEvidence: new Set(caseData.evidence[0] ? [caseData.evidence[0].id] : []),
    solvedPuzzles: new Set(),
    tagsByEvidence: {},
    submittedReading: null
  };
}

export function getVisibleEvidence(caseData, state) {
  return caseData.evidence.filter((item) => isEvidenceUnlocked(item, state.solvedPuzzles));
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

export function getCaseProgress(caseData, state) {
  const profile = calculateSignalProfile(caseData, state.tagsByEvidence);
  return {
    profile,
    dominantSignal: getDominantSignal(profile),
    visibleEvidence: getVisibleEvidence(caseData, state)
  };
}

