import {
  createInitialState,
  getActiveEvidence,
  getCaseProgress,
  getRoutedEvidence,
  getVisibleEvidence,
  toggleForceTag
} from "./case-engine.js";
import { case001 } from "../data/case-001.js?v=intake-series-20260522";
import { findPuzzle } from "./puzzle-engine.js";
import { getReadingPath } from "./signal-engine.js";

const dom = {
  caseId: document.querySelector("#case-id"),
  caseTitle: document.querySelector("#case-title"),
  dominantSignal: document.querySelector("#dominant-signal"),
  resetCase: document.querySelector("#reset-case"),
  openMapButtons: document.querySelectorAll("[data-open-map]"),
  openIntakeButtons: document.querySelectorAll("[data-open-intake]"),
  openDoctrineButtons: document.querySelectorAll("[data-open-doctrine]"),
  systemMapModal: document.querySelector("#system-map-modal"),
  closeSystemMap: document.querySelector("#close-system-map"),
  intakeModal: document.querySelector("#intake-modal"),
  closeIntake: document.querySelector("#close-intake"),
  doctrineModal: document.querySelector("#doctrine-modal"),
  closeDoctrine: document.querySelector("#close-doctrine"),
  doctrineContent: document.querySelector("#doctrine-content"),
  openingBrief: document.querySelector("#opening-brief"),
  openingTitle: document.querySelector("#opening-title"),
  openingSummary: document.querySelector("#opening-summary"),
  openingRole: document.querySelector("#opening-role"),
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
  puzzleTrace: document.querySelector("#puzzle-trace"),
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
  custodyResult: document.querySelector("#custody-result"),
  custodyStream: document.querySelector("#custody-stream")
};

let caseData;
let state;
let openingOpen = true;
let lastReferenceTrigger = null;
let verificationRunning = false;

function formatTags(tags) {
  return tags.length ? tags.join(" / ") : "No signals tagged";
}

function highlightDoctrineForces(text) {
  const escapedForces = caseData.forces.map((force) => force.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  const forcePattern = new RegExp(`\\b(?:The\\s+)?(?:${escapedForces.join("|")})\\b`, "g");
  return text.replace(forcePattern, '<strong class="doctrine-force">$&</strong>');
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

function getReconstructionBoard() {
  return caseData.reconstructionBoard;
}

function getReconstructionSlot(slotId) {
  return getReconstructionBoard()?.slots.find((slot) => slot.id === slotId);
}

function getReconstructionOption(slotId, optionId) {
  return getReconstructionSlot(slotId)?.options.find((option) => option.id === optionId);
}

function getSelectedReconstructionOptions(selections = state.reconstructionSelections) {
  return (getReconstructionBoard()?.slots || []).map((slot) => ({
    slot,
    option: getReconstructionOption(slot.id, selections[slot.id])
  }));
}

function isCompleteReconstruction(selections = state.reconstructionSelections) {
  return (getReconstructionBoard()?.slots || []).every((slot) => Boolean(selections[slot.id]));
}

function buildCaseSentence(selections = state.reconstructionSelections) {
  const board = getReconstructionBoard();
  const selectedOptions = getSelectedReconstructionOptions(selections).map(({ option }) => option);

  if (!board || selectedOptions.some((option) => !option)) {
    return board?.previewEmpty || "Choose claims to build a case sentence.";
  }

  const [person, account, pressure] = selectedOptions;
  return `${person.sentencePart}, while ${account.sentencePart}, because ${pressure.sentencePart}.`;
}

function isCanonicalReconstruction(selections = state.reconstructionSelections) {
  const canonical = getReconstructionBoard()?.canonicalSelection || {};
  return Object.entries(canonical).every(([slotId, optionId]) => selections[slotId] === optionId);
}

function matchesTranslation(translation, selections) {
  return Object.entries(translation.match || {}).every(([slotId, optionId]) => {
    return selections[slotId] === optionId;
  });
}

function getMythTranslation(selections = state.reconstructionSelections) {
  const translations = getReconstructionBoard()?.mythTranslations || [];
  return (
    translations.find((translation) => translation.id !== "default" && matchesTranslation(translation, selections)) ||
    translations.find((translation) => translation.id === "default") || {
      classification: getReconstructionBoard()?.canonicalClassification || "Unclassified",
      alignment: "divergent",
      summary: "The Archive can translate this as a contested reconstruction."
    }
  );
}

function getReviewedSupportText(option) {
  const reviewedSupport = (option.evidenceIds || [])
    .map((evidenceId) => getEvidenceById(evidenceId))
    .filter((item) => item && state.reviewedEvidence.has(item.id));

  if (!reviewedSupport.length) {
    return "Reviewed support: none yet.";
  }

  return `Reviewed support: ${reviewedSupport.map((item) => item.title).join(" / ")}.`;
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

function getBoardRouteContext() {
  const { dominantSignal, visibleBonusEvidence } = getCaseProgress(caseData, state);
  const board = getReconstructionBoard();

  if (dominantSignal === "Unformed") {
    return "No route has formed yet. You can still reconstruct the case; tags will add pressure context as you review evidence.";
  }

  if (dominantSignal === "Mixed") {
    return "Your tags are contested, so the board is holding multiple pressures in view instead of steering toward one route.";
  }

  const routeEvidence = visibleBonusEvidence.length
    ? ` Route-surfaced evidence: ${visibleBonusEvidence[0].title}.`
    : "";

  return `Dominant pressure: ${dominantSignal}. ${board?.routeNote || ""}${routeEvidence}`;
}

function renderReveal() {
  const { dominantSignal, visibleBonusEvidence } = getCaseProgress(caseData, state);
  const submitted = state.submittedReconstruction;
  const board = getReconstructionBoard();
  const translation = submitted?.translation || getMythTranslation(submitted?.selections);
  const aligned = translation.alignment === "aligned";
  const evidencePattern = getPathEvidencePattern(dominantSignal);
  const routeAssessment = getRouteAssessment(dominantSignal);
  const routeCopy = getReadingPath(caseData, dominantSignal);
  const routeIntro = dominantSignal === "Unformed" ? "" : `${routeCopy} `;
  const bonusCopy = visibleBonusEvidence.length
    ? `Route-surfaced evidence: ${visibleBonusEvidence[0].title}.`
    : "No bonus evidence surfaced for this route.";

  dom.revealCard.hidden = false;
  dom.readingResult.textContent =
    aligned || isCanonicalReconstruction(submitted?.selections)
      ? "Your case sentence aligns with the canonical reconstruction. Custody is now unlocked."
      : "Your case sentence diverges from the canonical reconstruction. The Archive corrects the truth before custody.";
  dom.readingPath.textContent = routeAssessment;
  dom.revealContent.innerHTML = `
    <dl>
      <div>
        <dt>Your case sentence</dt>
        <dd>${submitted?.sentence || board.previewEmpty}</dd>
      </div>
      <div>
        <dt>Archive classification</dt>
        <dd>${translation.classification}</dd>
      </div>
      <div>
        <dt>Archive translation</dt>
        <dd>${translation.summary}</dd>
      </div>
      <div>
        <dt>Canonical plain-English answer</dt>
        <dd>${board.canonicalPlainAnswer}</dd>
      </div>
      <div>
        <dt>Canonical myth language</dt>
        <dd>${board.canonicalClassification}: ${caseData.canonicalReveal}</dd>
      </div>
      <div>
        <dt>Archive assessment</dt>
        <dd>${routeIntro}${routeAssessment}</dd>
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
}

function renderArchiveDoctrine() {
  dom.doctrineContent.innerHTML = highlightDoctrineForces(caseData.doctrine)
    .split("\n\n")
    .map((paragraph) => `<p>${paragraph.replace(/\n/g, "<br />")}</p>`)
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

  dom.puzzleCard.classList.toggle("is-dormant", !puzzle);
  dom.puzzleCard.classList.toggle("is-needed", Boolean(puzzle && !isSolved));
  dom.puzzleCard.classList.toggle("is-solved", Boolean(puzzle && isSolved));
  dom.puzzleCard.classList.toggle("is-running", verificationRunning);
  dom.puzzleCard.setAttribute("aria-disabled", String(!puzzle));
  dom.puzzleTitle.textContent = puzzle ? puzzle.title : "No Gate Active";
  dom.puzzlePrompt.textContent = puzzle
    ? puzzle.prompt
    : "No gate is attached to this artifact. Keep reading and tagging evidence.";
  dom.submitPuzzle.disabled = !puzzle || isSolved || verificationRunning;
  dom.submitPuzzle.textContent = !puzzle
    ? "No Gate"
    : verificationRunning
      ? "Verifying..."
      : isSolved
        ? "Verified"
        : "Run Verification";
  if (!puzzle) {
    dom.puzzleTrace.innerHTML = state.lastUnlockTrace?.length
      ? state.lastUnlockTrace.map((line) => `<span>${line}</span>`).join("")
      : "<span>NO_GATE</span><span>IDLE</span>";
  } else if (isSolved) {
    const solvedTrace = [...(puzzle.trace || []), "ORIGIN_CONFIRMED / UNSEALED"];
    dom.puzzleTrace.innerHTML = solvedTrace.map((line) => `<span>${line}</span>`).join("");
  } else {
    dom.puzzleTrace.innerHTML = "<span>VERIFY_ORIGIN</span><span>LOCKED</span>";
  }

  if (!puzzle) {
    dom.puzzleResult.textContent = state.lastUnlockMessage;
  } else if (isSolved) {
    dom.puzzleResult.textContent = puzzle.unlockMessage
      ? `${puzzle.success} ${puzzle.unlockMessage}`
      : puzzle.success;
  } else if (!verificationRunning) {
    dom.puzzleResult.textContent = puzzle.readyMessage || "";
  }
}

function renderForceTags() {
  const active = getActiveEvidence(caseData, state);
  const selected = state.tagsByEvidence[active.id] || [];
  dom.forceTags.innerHTML = "";
  dom.selectedTagsStatus.textContent = selected.length
    ? `Current read: ${formatTags(selected)}. You can revise it when later evidence changes what this artifact seems to show.`
    : "Choose the forces you think shaped this artifact. Your choices build the Signal Profile and may surface different evidence.";

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
    <p>Truth stays stable. Your route shows which pressure became easiest to see.</p>
  `;
}

function renderReconstructionBoard() {
  const board = getReconstructionBoard();

  if (!board) {
    dom.readingOptions.innerHTML = "<legend>What happened?</legend>";
    return;
  }

  const sentence = buildCaseSentence();
  dom.readingOptions.innerHTML = `
    <legend>${board.title}</legend>
    <p class="reconstruction-intro">${board.intro}</p>
    <p class="reconstruction-route">${getBoardRouteContext()}</p>
    <div class="case-sentence-preview" aria-live="polite">
      <span>Case sentence</span>
      <strong>${sentence}</strong>
    </div>
    <div class="reconstruction-slots"></div>
  `;

  const slotsContainer = dom.readingOptions.querySelector(".reconstruction-slots");

  board.slots.forEach((slot) => {
    const selectedOptionId = state.reconstructionSelections[slot.id];
    const slotElement = document.createElement("section");
    slotElement.className = "reconstruction-slot";
    slotElement.setAttribute("aria-labelledby", `slot-${slot.id}`);
    slotElement.innerHTML = `
      <h3 id="slot-${slot.id}">${slot.question}</h3>
      <div class="claim-options"></div>
    `;

    const optionsContainer = slotElement.querySelector(".claim-options");

    slot.options.forEach((option) => {
      const selected = selectedOptionId === option.id;
      const label = document.createElement("label");
      label.className = "claim-option";
      label.classList.toggle("is-selected", selected);
      label.innerHTML = `
        <input
          type="radio"
          name="reconstruction-${slot.id}"
          value="${option.id}"
          ${selected ? "checked" : ""}
        />
        <span>
          <strong>${option.label}</strong>
          <small>${option.explanation}</small>
          <em>${getReviewedSupportText(option)}</em>
        </span>
      `;
      optionsContainer.append(label);
    });

    slotsContainer.append(slotElement);
  });

  dom.readingOptions.querySelectorAll("input[type='radio']").forEach((input) => {
    input.addEventListener("change", (event) => {
      const slotId = event.target.name.replace("reconstruction-", "");
      state.reconstructionSelections[slotId] = event.target.value;
      state.submittedReconstruction = null;
      state.submittedReading = null;
      state.selectedCustody = null;
      render();
    });
  });

  if (!state.submittedReconstruction) {
    dom.readingResult.textContent = isCompleteReconstruction()
      ? "Case sentence ready. Submit to let the Archive translate it."
      : "Choose one claim in each slot to complete the case sentence.";
  }
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
  const custodyUnlocked = Boolean(state.submittedReconstruction || state.submittedReading);
  dom.custodyCard.hidden = !custodyUnlocked;

  if (!custodyUnlocked) return;

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

  dom.custodyStream.innerHTML = "";

  if (!selectedChoice) return;

  const heading = document.createElement("p");
  heading.className = "custody-stream-heading";
  heading.textContent = "Archive consequence stream";
  dom.custodyStream.append(heading);

  selectedChoice.stream.forEach((entry, index) => {
    const item = document.createElement("article");
    item.className = "custody-stream-item";
    item.style.setProperty("--stream-index", index);
    item.innerHTML = `
      <strong>${entry.source}</strong>
      <span>${entry.text}</span>
    `;
    dom.custodyStream.append(item);
  });
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
  renderArchiveDoctrine();
  renderIntakeBrief();
  renderEvidenceList();
  renderActiveEvidence();
  renderPuzzle();
  renderForceTags();
  renderSignalProfile();
  renderCastBoard();
  renderTimeline();
  renderCaseRecap();
  renderReconstructionBoard();
  if (state.submittedReconstruction) {
    renderReveal();
  } else {
    dom.revealCard.hidden = true;
    dom.custodyCard.hidden = true;
  }
}

function wait(ms) {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms);
  });
}

async function runVerificationTrace(puzzle) {
  verificationRunning = true;
  dom.puzzleCard.classList.add("is-running");
  dom.submitPuzzle.disabled = true;
  dom.submitPuzzle.textContent = "Verifying...";

  const trace = puzzle.trace || [
    "Opening origin gate...",
    "Comparing witness detail...",
    "Bypassing continuity lock...",
    "Transfer cache exposed."
  ];

  dom.puzzleTrace.innerHTML = "";
  dom.puzzleResult.textContent = "";

  for (const line of trace) {
    const item = document.createElement("span");
    item.textContent = line;
    dom.puzzleTrace.append(item);
    dom.puzzleResult.textContent = line;
    await wait(520);
  }

  verificationRunning = false;
  return trace;
}

dom.submitPuzzle.addEventListener("click", async () => {
  const active = getActiveEvidence(caseData, state);
  const puzzle = active?.puzzleId ? findPuzzle(caseData, active.puzzleId) : null;

  if (!puzzle || state.solvedPuzzles.has(puzzle.id) || verificationRunning) return;

  const beforeVisible = getVisibleEvidence(caseData, state);
  const completedTrace = await runVerificationTrace(puzzle);
  state.solvedPuzzles.add(puzzle.id);
  const newlyUnlocked = getNewlyUnlockedEvidence(beforeVisible, getVisibleEvidence(caseData, state));
  if (newlyUnlocked) {
    state.activeEvidenceId = newlyUnlocked.id;
    state.reviewedEvidence.add(newlyUnlocked.id);
  }
  state.lastUnlockMessage = puzzle.unlockMessage
    ? `${puzzle.success} ${puzzle.unlockMessage}`
    : puzzle.success;
  state.lastUnlockTrace = [...completedTrace, "ORIGIN_CONFIRMED / UNSEALED"];
  render();
});

dom.submitReading.addEventListener("click", () => {
  if (!isCompleteReconstruction()) {
    const missingSlots = (getReconstructionBoard()?.slots || [])
      .filter((slot) => !state.reconstructionSelections[slot.id])
      .map((slot) => slot.shortLabel || slot.question);
    dom.readingResult.textContent = `Choose a claim for ${missingSlots.join(", ")} before submitting.`;
    return;
  }

  const selections = { ...state.reconstructionSelections };
  state.submittedReconstruction = {
    selections,
    sentence: buildCaseSentence(selections),
    translation: getMythTranslation(selections),
    aligned: isCanonicalReconstruction(selections)
  };
  state.submittedReading = "case-sentence";
  state.selectedCustody = null;
  render();
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

dom.openDoctrineButtons.forEach((button) => {
  button.addEventListener("click", () => openReferenceModal(dom.doctrineModal, dom.closeDoctrine));
});

dom.closeSystemMap.addEventListener("click", () => closeReferenceModal(dom.systemMapModal));
dom.closeIntake.addEventListener("click", () => closeReferenceModal(dom.intakeModal));
dom.closeDoctrine.addEventListener("click", () => closeReferenceModal(dom.doctrineModal));

function closeOnBackdrop(event) {
  if (event.target === event.currentTarget) {
    closeReferenceModal(event.currentTarget);
  }
}

dom.systemMapModal.addEventListener("click", closeOnBackdrop);
dom.intakeModal.addEventListener("click", closeOnBackdrop);
dom.doctrineModal.addEventListener("click", closeOnBackdrop);

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !dom.systemMapModal.hidden) {
    closeReferenceModal(dom.systemMapModal);
  }

  if (event.key === "Escape" && !dom.intakeModal.hidden) {
    closeReferenceModal(dom.intakeModal);
  }

  if (event.key === "Escape" && !dom.doctrineModal.hidden) {
    closeReferenceModal(dom.doctrineModal);
  }
});

loadCase();
