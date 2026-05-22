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
  toggleIntake: document.querySelector("#toggle-intake"),
  intakeContent: document.querySelector("#intake-content"),
  evidenceCount: document.querySelector("#evidence-count"),
  evidenceList: document.querySelector("#evidence-list"),
  evidenceType: document.querySelector("#evidence-type"),
  evidenceDate: document.querySelector("#evidence-date"),
  evidenceTitle: document.querySelector("#evidence-title"),
  evidenceBody: document.querySelector("#evidence-body"),
  activeTagSummary: document.querySelector("#active-tag-summary"),
  relatedEvidence: document.querySelector("#related-evidence"),
  puzzleTitle: document.querySelector("#puzzle-title"),
  puzzlePrompt: document.querySelector("#puzzle-prompt"),
  puzzleAnswer: document.querySelector("#puzzle-answer"),
  submitPuzzle: document.querySelector("#submit-puzzle"),
  puzzleResult: document.querySelector("#puzzle-result"),
  selectedTagsStatus: document.querySelector("#selected-tags-status"),
  forceTags: document.querySelector("#force-tags"),
  signalProfile: document.querySelector("#signal-profile"),
  castProgress: document.querySelector("#cast-progress"),
  castBoard: document.querySelector("#cast-board"),
  timeline: document.querySelector("#timeline"),
  caseRecap: document.querySelector("#case-recap"),
  readingOptions: document.querySelector("#reading-options"),
  submitReading: document.querySelector("#submit-reading"),
  readingResult: document.querySelector("#reading-result"),
  readingPath: document.querySelector("#reading-path"),
  revealCard: document.querySelector("#reveal-card"),
  revealContent: document.querySelector("#reveal-content")
};

let caseData;
let state;
let intakeOpen = true;

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

function getEvidenceById(evidenceId) {
  return getVisibleEvidence(caseData, state).find((item) => item.id === evidenceId);
}

function getReviewedContradictions(active) {
  return (active.contradictionWith || [])
    .map((evidenceId) => getEvidenceById(evidenceId))
    .filter((item) => item && state.reviewedEvidence.has(item.id));
}

function setActiveEvidence(evidenceId) {
  state.activeEvidenceId = evidenceId;
  state.reviewedEvidence.add(evidenceId);
  render();
}

function ensureActiveEvidence() {
  if (getActiveEvidence(caseData, state)) return;

  const firstVisible = getRoutedEvidence(caseData, state)[0];
  if (!firstVisible) return;

  state.activeEvidenceId = firstVisible.id;
  state.reviewedEvidence.add(firstVisible.id);
}

function getReadingLabel(readingId) {
  return caseData.readings.find((reading) => reading.id === readingId)?.label || "No reading";
}

function getPathEvidencePattern(dominantSignal) {
  if (dominantSignal === "Unformed") {
    return "No stable path formed before submission.";
  }

  if (dominantSignal === "Mixed") {
    const taggedCount = Object.values(state.tagsByEvidence).filter((tags) => tags.length).length;
    return `${taggedCount} artifacts carried competing signals, so the case kept multiple routes in tension.`;
  }

  const matchingEvidence = getVisibleEvidence(caseData, state).filter((item) => {
    return state.reviewedEvidence.has(item.id) && item.expectedForces?.includes(dominantSignal);
  });

  if (!matchingEvidence.length) {
    return `The ${dominantSignal} route formed through tags before matching evidence was fully reviewed.`;
  }

  return matchingEvidence.map((item) => item.title).join(" / ");
}

function renderReveal(selectedReadingId) {
  const { dominantSignal, visibleBonusEvidence } = getCaseProgress(caseData, state);
  const selectedLabel = getReadingLabel(selectedReadingId);
  const canonicalLabel = getReadingLabel(caseData.canonicalReading);
  const routeCopy = getReadingPath(caseData, dominantSignal);
  const evidencePattern = getPathEvidencePattern(dominantSignal);
  const bonusCopy = visibleBonusEvidence.length
    ? `Route-surfaced evidence: ${visibleBonusEvidence[0].title}.`
    : "No bonus evidence surfaced for this route.";

  state.submittedReading = selectedReadingId;
  dom.revealCard.hidden = false;
  dom.readingResult.textContent =
    selectedReadingId === caseData.canonicalReading
      ? "Your reading aligns with the canonical reconstruction."
      : "Your reading diverges from the canonical reconstruction.";
  dom.readingPath.textContent = routeCopy;
  dom.revealContent.innerHTML = `
    <dl>
      <div>
        <dt>Your submitted reading</dt>
        <dd>${selectedLabel}</dd>
      </div>
      <div>
        <dt>Canonical reconstruction</dt>
        <dd>${canonicalLabel}</dd>
      </div>
      <div>
        <dt>What happened</dt>
        <dd>${caseData.canonicalReveal}</dd>
      </div>
      <div>
        <dt>Your route</dt>
        <dd>${dominantSignal}: ${routeCopy}</dd>
      </div>
      <div>
        <dt>Evidence pattern</dt>
        <dd>${evidencePattern}</dd>
      </div>
      <div>
        <dt>Route effect</dt>
        <dd>${bonusCopy} Interpretation changed the route, not the truth.</dd>
      </div>
    </dl>
  `;
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
  renderRelatedEvidence(active);
}

function renderRelatedEvidence(active) {
  const relatedItems = (active.relatedEvidence || [])
    .map((evidenceId) => getEvidenceById(evidenceId))
    .filter(Boolean);
  const contradictions = getReviewedContradictions(active);

  dom.relatedEvidence.innerHTML = "";

  if (active.recoveryCue) {
    const cue = document.createElement("p");
    cue.className = "recovery-cue";
    cue.textContent = active.recoveryCue;
    dom.relatedEvidence.append(cue);
  }

  if (contradictions.length > 0) {
    const marker = document.createElement("p");
    marker.className = "contradiction-marker";
    marker.textContent = `Contradiction marked: compare with ${contradictions
      .map((item) => item.title)
      .join(" / ")}.`;
    dom.relatedEvidence.append(marker);
  }

  if (!relatedItems.length) return;

  const group = document.createElement("div");
  group.className = "related-links";
  const label = document.createElement("span");
  label.textContent = "Related evidence";
  group.append(label);

  relatedItems.forEach((item) => {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = item.title;
    button.addEventListener("click", () => setActiveEvidence(item.id));
    group.append(button);
  });

  dom.relatedEvidence.append(group);
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
  getVisibleEvidence(caseData, state)
    .filter((item) => state.reviewedEvidence.has(item.id))
    .forEach((item) => {
      const line = document.createElement("li");
      line.textContent = item.timeline;
      dom.timeline.append(line);
    });
}

function renderCaseRecap() {
  const visibleEvidence = getVisibleEvidence(caseData, state);
  const reviewedEvidence = visibleEvidence.filter((item) => state.reviewedEvidence.has(item.id));
  const { dominantSignal, visibleBonusEvidence } = getCaseProgress(caseData, state);
  const gateSolved = state.solvedPuzzles.has("origin-code");
  const contradictionCount = reviewedEvidence.filter((item) => {
    return getReviewedContradictions(item).length > 0;
  }).length;

  dom.caseRecap.innerHTML = `
    <p>${reviewedEvidence.length}/${visibleEvidence.length} evidence items reviewed. Gate ${gateSolved ? "opened" : "still locked"}. Path ${dominantSignal}.</p>
    <p>${contradictionCount ? `${contradictionCount} contradiction marker${contradictionCount === 1 ? "" : "s"} active.` : "No reviewed contradictions marked yet."}</p>
    <p>${visibleBonusEvidence.length ? `Bonus evidence surfaced: ${visibleBonusEvidence[0].title}.` : "No bonus evidence surfaced yet."}</p>
  `;
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

function renderIntakeBrief() {
  const intake = caseData.intake;
  dom.toggleIntake.setAttribute("aria-expanded", String(intakeOpen));
  dom.toggleIntake.querySelector("strong").textContent = intakeOpen ? "Hide" : "Show";
  dom.intakeContent.hidden = !intakeOpen;

  if (!intakeOpen) return;

  dom.intakeContent.innerHTML = `
    <div>
      <h2>${intake.heading}</h2>
      <p>${intake.summary}</p>
    </div>
    <ol>
      ${intake.steps
        .map(
          (step) => `
            <li>
              <strong>${step.label}</strong>
              <span>${step.text}</span>
            </li>
          `
        )
        .join("")}
    </ol>
    <p class="intake-reminder">${intake.reminder}</p>
  `;
}

function renderCastBoard() {
  const cast = caseData.cast || [];
  let updatedCount = 0;
  dom.castBoard.innerHTML = "";

  cast.forEach((person) => {
    const revealed = person.reveals.filter((reveal) => state.reviewedEvidence.has(reveal.evidenceId));
    if (revealed.length) updatedCount += 1;

    const article = document.createElement("article");
    article.className = "cast-card";
    article.classList.toggle("is-updated", revealed.length > 0);
    article.innerHTML = `
      <div class="cast-card-topline">
        <strong>${person.name}</strong>
        <span>${revealed.length ? "Updated" : "Intake"}</span>
      </div>
      <p class="cast-role">${person.role}</p>
      <p>${person.known}</p>
      <p class="cast-question">${person.question}</p>
      <div class="cast-reveals">
        ${
          revealed.length
            ? revealed
                .map(
                  (reveal) => `
                    <p>
                      <strong>${reveal.label}</strong>
                      <span>${reveal.detail}</span>
                    </p>
                  `
                )
                .join("")
            : "<p><strong>Unread</strong><span>More context will appear as related evidence is reviewed.</span></p>"
        }
      </div>
    `;
    dom.castBoard.append(article);
  });

  dom.castProgress.textContent = `${updatedCount}/${cast.length} updated`;
}

function render() {
  ensureActiveEvidence();
  renderHeader();
  renderIntakeBrief();
  renderEvidenceList();
  renderActiveEvidence();
  renderPuzzle();
  renderForceTags();
  renderSignalProfile();
  renderCastBoard();
  renderTimeline();
  renderCaseRecap();
  renderReadingOptions();
  if (state.submittedReading) {
    renderReveal(state.submittedReading);
  }
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

  renderReveal(selected.value);
});

dom.toggleIntake.addEventListener("click", () => {
  intakeOpen = !intakeOpen;
  renderIntakeBrief();
});

loadCase();
