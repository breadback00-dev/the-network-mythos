import {
  createInitialState,
  getActiveEvidence,
  getCaseProgress,
  getRoutedEvidence,
  getVisibleEvidence,
  recordPuzzleAttempt,
  toggleForceTag
} from "./case-engine.js";
import { case001 } from "../data/case-001.js?v=puzzle-tags-20260522";
import { checkPuzzleAnswer, findPuzzle } from "./puzzle-engine.js";
import { getReadingPath } from "./signal-engine.js";

const dom = {
  caseId: document.querySelector("#case-id"),
  caseTitle: document.querySelector("#case-title"),
  dominantSignal: document.querySelector("#dominant-signal"),
  resetCase: document.querySelector("#reset-case"),
  openMapButtons: document.querySelectorAll("[data-open-map]"),
  openIntakeButtons: document.querySelectorAll("[data-open-intake]"),
  systemMapModal: document.querySelector("#system-map-modal"),
  closeSystemMap: document.querySelector("#close-system-map"),
  intakeModal: document.querySelector("#intake-modal"),
  closeIntake: document.querySelector("#close-intake"),
  openingBrief: document.querySelector("#opening-brief"),
  openingTitle: document.querySelector("#opening-title"),
  openingSummary: document.querySelector("#opening-summary"),
  openingRole: document.querySelector("#opening-role"),
  openingDoctrine: document.querySelector("#opening-doctrine"),
  openingGoals: document.querySelector("#opening-goals"),
  startCase: document.querySelector("#start-case"),
  workspace: document.querySelector("#workspace"),
  intakeContent: document.querySelector("#intake-content"),
  evidenceCount: document.querySelector("#evidence-count"),
  evidenceList: document.querySelector("#evidence-list"),
  evidenceType: document.querySelector("#evidence-type"),
  evidenceDate: document.querySelector("#evidence-date"),
  evidenceTitle: document.querySelector("#evidence-title"),
  evidenceBody: document.querySelector("#evidence-body"),
  activeTagSummary: document.querySelector("#active-tag-summary"),
  relatedEvidence: document.querySelector("#related-evidence"),
  puzzleCard: document.querySelector(".puzzle-card"),
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
  revealContent: document.querySelector("#reveal-content"),
  custodyCard: document.querySelector("#custody-card"),
  custodyPrompt: document.querySelector("#custody-prompt"),
  custodyOptions: document.querySelector("#custody-options"),
  custodyResult: document.querySelector("#custody-result")
};

let caseData;
let state;
let openingOpen = true;
let lastReferenceTrigger = null;

function formatTags(tags) {
  return tags.length ? tags.join(" / ") : "No signals tagged";
}

function highlightDoctrineForces(text) {
  const forcePattern = new RegExp(`\\b(${caseData.forces.join("|")})\\b`, "g");
  return text.replace(forcePattern, '<strong class="doctrine-force">$1</strong>');
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

function getRouteAssessment(dominantSignal) {
  if (dominantSignal === "Unformed") {
    return "The Archive cannot assess a path because no force pattern formed before reconstruction.";
  }

  if (dominantSignal === "Mixed") {
    return "The Archive reads your path as contested: you held several pressures in view instead of letting one explanation dominate.";
  }

  return `The Archive reads your path through ${dominantSignal}. That does not change the truth; it shows which pressure you made legible first.`;
}

function renderReveal(selectedReadingId) {
  const { dominantSignal, visibleBonusEvidence } = getCaseProgress(caseData, state);
  const selectedLabel = getReadingLabel(selectedReadingId);
  const canonicalLabel = getReadingLabel(caseData.canonicalReading);
  const routeCopy = getReadingPath(caseData, dominantSignal);
  const evidencePattern = getPathEvidencePattern(dominantSignal);
  const routeAssessment = getRouteAssessment(dominantSignal);
  const bonusCopy = visibleBonusEvidence.length
    ? `Route-surfaced evidence: ${visibleBonusEvidence[0].title}.`
    : "No bonus evidence surfaced for this route.";

  state.submittedReading = selectedReadingId;
  dom.revealCard.hidden = false;
  dom.readingResult.textContent =
    selectedReadingId === caseData.canonicalReading
      ? "Your reconstruction aligns with the canonical answer. Custody is now unlocked."
      : "Your reconstruction diverges from the canonical answer. Review the confirmed truth before choosing custody.";
  dom.readingPath.textContent = routeAssessment;
  dom.revealContent.innerHTML = `
    <dl>
      <div>
        <dt>Your submitted reconstruction</dt>
        <dd>${selectedLabel}</dd>
      </div>
      <div>
        <dt>Canonical answer</dt>
        <dd>${canonicalLabel}</dd>
      </div>
      <div>
        <dt>Confirmed truth</dt>
        <dd>${caseData.canonicalReveal}</dd>
      </div>
      <div>
        <dt>Archive assessment</dt>
        <dd>${routeAssessment}</dd>
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
  renderCustody();
}

function loadCase() {
  caseData = case001;
  state = createInitialState(caseData);
  render();
}

function restartCase({ showOpening = true } = {}) {
  state = createInitialState(caseData);
  openingOpen = showOpening;
  render();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function renderOpeningBrief() {
  const opening = caseData.opening;
  dom.openingBrief.hidden = !openingOpen;
  dom.workspace.hidden = openingOpen;

  if (!opening) {
    dom.openingBrief.hidden = true;
    dom.workspace.hidden = false;
    return;
  }

  dom.openingTitle.textContent = opening.headline;
  dom.openingSummary.textContent = opening.summary;
  dom.openingRole.textContent = opening.role;
  dom.openingDoctrine.innerHTML = highlightDoctrineForces(caseData.doctrine);
  dom.openingGoals.innerHTML = opening.goals
    .map((goal) => `<li>${goal}</li>`)
    .join("");
}

function openReferenceModal(modal, closeButton) {
  lastReferenceTrigger = document.activeElement;
  modal.hidden = false;
  document.body.classList.add("is-reference-open");
  closeButton.focus();
}

function closeReferenceModal(modal) {
  modal.hidden = true;
  document.body.classList.remove("is-reference-open");

  if (lastReferenceTrigger) {
    lastReferenceTrigger.focus();
  }
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

  dom.puzzleCard.classList.toggle("is-dormant", !puzzle);
  dom.puzzleCard.classList.toggle("is-needed", Boolean(puzzle && !isSolved));
  dom.puzzleCard.classList.toggle("is-solved", Boolean(puzzle && isSolved));
  dom.puzzleCard.setAttribute("aria-disabled", String(!puzzle));
  dom.puzzleTitle.textContent = puzzle ? puzzle.title : "No Puzzle Active";
  dom.puzzlePrompt.textContent = puzzle
    ? puzzle.prompt
    : "No gate is attached to this artifact. Keep reading and tagging evidence.";
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
    ? `Current read: ${formatTags(selected)}. You can revise it when later evidence changes what this artifact seems to show.`
    : "How to decide: ask what the artifact makes visible, hides, copies, protects, prices, or proves. Pick every force you can defend.";

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
    <p>Reconstruction names what happened. Custody unlocks after the truth is shown.</p>
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

function renderCustody() {
  const choices = caseData.custodyChoices || [];
  dom.custodyCard.hidden = !state.submittedReading;

  if (!state.submittedReading) return;

  dom.custodyPrompt.textContent = caseData.custodyPrompt;
  dom.custodyOptions.innerHTML = "";

  choices.forEach((choice) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "custody-option";
    button.classList.toggle("is-selected", state.selectedCustody === choice.id);
    button.innerHTML = `
      <strong>${choice.label}</strong>
      <span>${choice.summary}</span>
    `;
    button.addEventListener("click", () => {
      state.selectedCustody = choice.id;
      render();
    });
    dom.custodyOptions.append(button);
  });

  const selectedChoice = choices.find((choice) => choice.id === state.selectedCustody);
  dom.custodyResult.textContent = selectedChoice
    ? selectedChoice.consequence
    : "Choose custody after reconstruction: expose the truth, protect the person, or preserve the record.";
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
  renderOpeningBrief();
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
  } else {
    dom.revealCard.hidden = true;
    dom.custodyCard.hidden = true;
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

dom.startCase.addEventListener("click", () => {
  openingOpen = false;
  render();
});

dom.resetCase.addEventListener("click", () => {
  restartCase();
});

dom.openMapButtons.forEach((button) => {
  button.addEventListener("click", () => openReferenceModal(dom.systemMapModal, dom.closeSystemMap));
});

dom.openIntakeButtons.forEach((button) => {
  button.addEventListener("click", () => openReferenceModal(dom.intakeModal, dom.closeIntake));
});

dom.closeSystemMap.addEventListener("click", () => closeReferenceModal(dom.systemMapModal));
dom.closeIntake.addEventListener("click", () => closeReferenceModal(dom.intakeModal));

function closeOnBackdrop(event) {
  if (event.target === event.currentTarget) {
    closeReferenceModal(event.currentTarget);
  }
}

dom.systemMapModal.addEventListener("click", closeOnBackdrop);
dom.intakeModal.addEventListener("click", closeOnBackdrop);

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !dom.systemMapModal.hidden) {
    closeReferenceModal(dom.systemMapModal);
  }

  if (event.key === "Escape" && !dom.intakeModal.hidden) {
    closeReferenceModal(dom.intakeModal);
  }
});

loadCase();
