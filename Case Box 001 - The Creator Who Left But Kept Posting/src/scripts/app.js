import {
  createInitialState,
  getActiveEvidence,
  getCaseProgress,
  getVisibleEvidence,
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
  puzzleTitle: document.querySelector("#puzzle-title"),
  puzzlePrompt: document.querySelector("#puzzle-prompt"),
  puzzleAnswer: document.querySelector("#puzzle-answer"),
  submitPuzzle: document.querySelector("#submit-puzzle"),
  puzzleResult: document.querySelector("#puzzle-result"),
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

function loadCase() {
  caseData = case001;
  state = createInitialState(caseData);
  render();
}

function renderEvidenceList() {
  const visibleEvidence = getVisibleEvidence(caseData, state);
  dom.evidenceList.innerHTML = "";
  dom.evidenceCount.textContent = `${visibleEvidence.length} items`;

  visibleEvidence.forEach((item, index) => {
    const button = document.createElement("button");
    button.className = "evidence-card";
    button.type = "button";
    button.classList.toggle("is-active", item.id === state.activeEvidenceId);
    button.classList.toggle("is-reviewed", state.reviewedEvidence.has(item.id));
    button.innerHTML = `
      <span>${String(index + 1).padStart(2, "0")} / ${item.type}</span>
      <strong>${item.title}</strong>
      <small>${state.reviewedEvidence.has(item.id) ? "Reviewed" : item.date}</small>
    `;
    button.addEventListener("click", () => {
      state.activeEvidenceId = item.id;
      state.reviewedEvidence.add(item.id);
      render();
    });
    dom.evidenceList.append(button);
  });
}

function renderActiveEvidence() {
  const active = getActiveEvidence(caseData, state);
  if (!active) return;

  dom.evidenceType.textContent = active.type;
  dom.evidenceDate.textContent = active.date;
  dom.evidenceTitle.textContent = active.title;
  dom.evidenceBody.textContent = active.body;
}

function renderPuzzle() {
  const active = getActiveEvidence(caseData, state);
  const puzzle = active?.puzzleId ? findPuzzle(caseData, active.puzzleId) : null;
  const isSolved = puzzle ? state.solvedPuzzles.has(puzzle.id) : false;

  dom.puzzleTitle.textContent = puzzle ? puzzle.title : "No Puzzle Active";
  dom.puzzlePrompt.textContent = puzzle
    ? puzzle.prompt
    : "Some evidence contains locked pieces, codes, or verification gates.";
  dom.puzzleAnswer.disabled = !puzzle || isSolved;
  dom.submitPuzzle.disabled = !puzzle || isSolved;
  dom.puzzleAnswer.placeholder = puzzle ? "Enter access code" : "No code needed";

  if (!puzzle) {
    dom.puzzleResult.textContent = "";
  } else if (isSolved) {
    dom.puzzleResult.textContent = puzzle.success;
  }
}

function renderForceTags() {
  const active = getActiveEvidence(caseData, state);
  const selected = state.tagsByEvidence[active.id] || [];
  dom.forceTags.innerHTML = "";

  caseData.forces.forEach((force) => {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = force;
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
  const { profile, dominantSignal } = getCaseProgress(caseData, state);
  dom.dominantSignal.textContent = dominantSignal;
  dom.signalProfile.innerHTML = "";

  Object.entries(profile).forEach(([force, score]) => {
    const row = document.createElement("div");
    row.className = "signal-row";
    row.innerHTML = `<span>${force}</span><meter min="0" max="5" value="${score}">${score}</meter><strong>${score}</strong>`;
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
    state.solvedPuzzles.add(puzzle.id);
    dom.puzzleAnswer.value = "";
    dom.puzzleResult.textContent = puzzle.success;
    render();
    return;
  }

  dom.puzzleResult.textContent = "Access denied. The system rejects this proof of Origin.";
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
