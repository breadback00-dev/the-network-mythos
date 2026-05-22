import {
  createInitialState,
  getActiveEvidence,
  getCaseProgress,
  getRoutedEvidence,
  getVisibleEvidence,
  recordPuzzleAttempt,
  toggleForceTag
} from "./case-engine.js";
import { case001 } from "../data/case-001.js";
import { checkPuzzleAnswer, findPuzzle } from "./puzzle-engine.js";
import { getReadingPath } from "./signal-engine.js";

const dom = {
  caseId: document.querySelector("#case-id"),
  caseTitle: document.querySelector("#case-title"),
  dominantSignal: document.querySelector("#dominant-signal"),
  evidenceCount: document.querySelector("#evidence-count"),
  evidenceList: document.querySelector("#evidence-list"),
  evidenceType: document.querySelector("#evidence-type"),
  evidenceDate: document.querySelector("#evidence-date"),
  evidenceTitle: document.querySelector("#evidence-title"),
  evidenceBody: document.querySelector("#evidence-body"),
  activeTagSummary: document.querySelector("#active-tag-summary"),
  puzzleTitle: document.querySelector("#puzzle-title"),
  puzzlePrompt: document.querySelector("#puzzle-prompt"),
  puzzleAnswer: document.querySelector("#puzzle-answer"),
  submitPuzzle: document.querySelector("#submit-puzzle"),
  puzzleResult: document.querySelector("#puzzle-result"),
  selectedTagsStatus: document.querySelector("#selected-tags-status"),
  forceTags: document.querySelector("#force-tags"),
  signalProfile: document.querySelector("#signal-profile"),
  timeline: document.querySelector("#timeline"),
  readingOptions: document.querySelector("#reading-options"),
  submitReading: document.querySelector("#submit-reading"),
  readingResult: document.querySelector("#reading-result"),
  readingPath: document.querySelector("#reading-path")
};

let caseData;
let state;

function formatTags(tags) {
  return tags.length ? tags.join(" / ") : "No signals tagged";
}

function getSignalLabel(score, maxScore, dominantSignal) {
  if (score <= 0) return "dormant";
  if (dominantSignal === "Mixed" && score === maxScore) return "contested";
  if (score === maxScore && maxScore > 1) return "dominant";
  if (score > 1) return "strong";
  return "trace";
}

function getNewlyUnlockedEvidence(beforeVisible, afterVisible) {
  const beforeIds = new Set(beforeVisible.map((item) => item.id));
  return afterVisible.find((item) => !beforeIds.has(item.id));
}

function getPuzzleFeedback(puzzle, attemptCount) {
  const hint = puzzle.hints?.[Math.min(attemptCount - 1, puzzle.hints.length - 1)];
  return hint ? `${puzzle.failure} Hint: ${hint}` : puzzle.failure;
}

function loadCase() {
  caseData = case001;
  state = createInitialState(caseData);
  render();
}

function renderEvidenceList() {
  const { dominantSignal, visibleBonusEvidence } = getCaseProgress(caseData, state);
  const visibleEvidence = getRoutedEvidence(caseData, state);
  dom.evidenceList.innerHTML = "";
  const routeLabel =
    dominantSignal === "Unformed" || dominantSignal === "Mixed"
      ? `${visibleEvidence.length} items`
      : `${visibleEvidence.length} items / routed by ${dominantSignal}`;
  dom.evidenceCount.textContent = routeLabel;

  visibleEvidence.forEach((item, index) => {
    const selectedTags = state.tagsByEvidence[item.id] || [];
    const button = document.createElement("button");
    button.className = "evidence-card";
    button.type = "button";
    button.classList.toggle("is-active", item.id === state.activeEvidenceId);
    button.classList.toggle("is-reviewed", state.reviewedEvidence.has(item.id));
    button.classList.toggle("has-tags", selectedTags.length > 0);
    button.classList.toggle("is-bonus", item.isBonus);
    button.innerHTML = `
      <span>${String(index + 1).padStart(2, "0")} / ${item.type}</span>
      <strong>${item.title}</strong>
      <small>${item.isBonus ? `Surfaced by ${item.surfacedBy}` : state.reviewedEvidence.has(item.id) ? "Reviewed" : item.date}</small>
      <em>${formatTags(selectedTags)}</em>
    `;
    button.addEventListener("click", () => {
      state.activeEvidenceId = item.id;
      state.reviewedEvidence.add(item.id);
      render();
    });
    dom.evidenceList.append(button);
  });

  if (visibleBonusEvidence.length > 0) {
    const routeNote = document.createElement("p");
    routeNote.className = "route-note";
    routeNote.textContent = `Route surfaced: ${visibleBonusEvidence[0].title}. Truth remains stable; the path changed what appeared.`;
    dom.evidenceList.append(routeNote);
  }
}

function renderActiveEvidence() {
  const active = getActiveEvidence(caseData, state);
  if (!active) return;

  dom.evidenceType.textContent = active.type;
  dom.evidenceDate.textContent = active.date;
  dom.evidenceTitle.textContent = active.title;
  dom.evidenceBody.textContent = active.body;
  dom.activeTagSummary.textContent = `Tagged signals: ${formatTags(
    state.tagsByEvidence[active.id] || []
  )}`;
}

function renderPuzzle() {
  const active = getActiveEvidence(caseData, state);
  const puzzle = active?.puzzleId ? findPuzzle(caseData, active.puzzleId) : null;
  const isSolved = puzzle ? state.solvedPuzzles.has(puzzle.id) : false;
  const attemptCount = puzzle ? state.puzzleAttempts[puzzle.id] || 0 : 0;

  dom.puzzleTitle.textContent = puzzle ? puzzle.title : "No Puzzle Active";
  dom.puzzlePrompt.textContent = puzzle
    ? puzzle.prompt
    : "Some evidence contains locked pieces, codes, or verification gates.";
  dom.puzzleAnswer.disabled = !puzzle || isSolved;
  dom.submitPuzzle.disabled = !puzzle || isSolved;
  dom.puzzleAnswer.placeholder = puzzle ? "Enter access code" : "No code needed";

  if (!puzzle) {
    dom.puzzleResult.textContent = state.lastUnlockMessage;
  } else if (isSolved) {
    dom.puzzleResult.textContent = puzzle.unlockMessage
      ? `${puzzle.success} ${puzzle.unlockMessage}`
      : puzzle.success;
  } else if (attemptCount > 0) {
    dom.puzzleResult.textContent = getPuzzleFeedback(puzzle, attemptCount);
  }
}

function renderForceTags() {
  const active = getActiveEvidence(caseData, state);
  const selected = state.tagsByEvidence[active.id] || [];
  dom.forceTags.innerHTML = "";
  dom.selectedTagsStatus.textContent = selected.length
    ? `This artifact currently points toward: ${formatTags(selected)}.`
    : "No signals tagged on this artifact.";

  caseData.forces.forEach((force) => {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = force;
    button.setAttribute("aria-pressed", String(selected.includes(force)));
    button.classList.toggle("is-selected", selected.includes(force));
    button.addEventListener("click", () => {
      toggleForceTag(state, active.id, force);
      state.reviewedEvidence.add(active.id);
      render();
    });
    dom.forceTags.append(button);
  });
}

function renderSignalProfile() {
  const { profile, dominantSignal, rankedSignals } = getCaseProgress(caseData, state);
  dom.dominantSignal.textContent = dominantSignal;
  dom.signalProfile.innerHTML = "";
  const maxScore = Math.max(...Object.values(profile));

  if (maxScore === 0) {
    const empty = document.createElement("p");
    empty.className = "signal-empty";
    empty.textContent = "The case has not formed a reading path yet.";
    dom.signalProfile.append(empty);
    return;
  }

  rankedSignals
    .filter(([, score]) => score > 0)
    .forEach(([force, score]) => {
      const row = document.createElement("div");
      row.className = "signal-row";
      row.classList.toggle("is-dominant", force === dominantSignal);
      const strength = Math.max(15, Math.round((score / maxScore) * 100));
      const signalLabel = getSignalLabel(score, maxScore, dominantSignal);
      row.innerHTML = `
        <span>${force}</span>
        <i aria-label="${force} signal ${signalLabel}">
          <b style="width: ${strength}%"></b>
        </i>
        <strong>${signalLabel}</strong>
      `;
      dom.signalProfile.append(row);
    });
}

function renderTimeline() {
  dom.timeline.innerHTML = "";
  caseData.evidence
    .filter((item) => state.reviewedEvidence.has(item.id))
    .forEach((item) => {
      const line = document.createElement("li");
      line.textContent = item.timeline;
      dom.timeline.append(line);
    });
}

function renderReadingOptions() {
  const existingSelection = document.querySelector("input[name='final-reading']:checked")?.value;
  dom.readingOptions.innerHTML = "<legend>What happened?</legend>";

  caseData.readings.forEach((reading) => {
    const label = document.createElement("label");
    label.innerHTML = `
      <input type="radio" name="final-reading" value="${reading.id}" ${existingSelection === reading.id ? "checked" : ""} />
      ${reading.label}
    `;
    dom.readingOptions.append(label);
  });
}

function renderHeader() {
  dom.caseId.textContent = caseData.id;
  dom.caseTitle.textContent = caseData.title;
}

function render() {
  renderHeader();
  renderEvidenceList();
  renderActiveEvidence();
  renderPuzzle();
  renderForceTags();
  renderSignalProfile();
  renderTimeline();
  renderReadingOptions();
}

dom.submitPuzzle.addEventListener("click", () => {
  const active = getActiveEvidence(caseData, state);
  const puzzle = active?.puzzleId ? findPuzzle(caseData, active.puzzleId) : null;

  if (!puzzle) return;

  if (checkPuzzleAnswer(puzzle, dom.puzzleAnswer.value)) {
    const beforeVisible = getVisibleEvidence(caseData, state);
    state.solvedPuzzles.add(puzzle.id);
    dom.puzzleAnswer.value = "";
    const newlyUnlocked = getNewlyUnlockedEvidence(beforeVisible, getVisibleEvidence(caseData, state));
    if (newlyUnlocked) {
      state.activeEvidenceId = newlyUnlocked.id;
      state.reviewedEvidence.add(newlyUnlocked.id);
    }
    state.lastUnlockMessage = puzzle.unlockMessage
      ? `${puzzle.success} ${puzzle.unlockMessage}`
      : puzzle.success;
    render();
    return;
  }

  const attemptCount = recordPuzzleAttempt(state, puzzle.id);
  dom.puzzleResult.textContent = getPuzzleFeedback(puzzle, attemptCount);
  render();
});

dom.submitReading.addEventListener("click", () => {
  const selected = document.querySelector("input[name='final-reading']:checked");
  if (!selected) {
    dom.readingResult.textContent = "Choose a final reading before submitting.";
    return;
  }

  const { dominantSignal } = getCaseProgress(caseData, state);
  const correct = selected.value === caseData.canonicalReading;
  dom.readingResult.textContent = correct
    ? `Canonical reading: ${caseData.canonicalReveal}`
    : `Incomplete reading. ${caseData.canonicalReveal}`;
  dom.readingPath.textContent = getReadingPath(caseData, dominantSignal);
});

loadCase();
