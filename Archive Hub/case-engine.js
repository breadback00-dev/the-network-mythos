/**
 * Shared case prototype engine.
 * Requires window.CASE_CONFIG (from case-config.js) and window.CASE_ARTIFACTS (from artifacts-data.js).
 */

const config = window.CASE_CONFIG;
const evidence = config.evidence;
const prefix = config.storagePrefix;

const archiveChoiceEffects = {
  Publish:  { attention: 28, trust: -10, integrity: 8,   awareness: 24 },
  Bury:     { attention: -8, trust: 18,  integrity: -12, awareness: -5 },
  Preserve: { attention: 6,  trust: 12,  integrity: 22,  awareness: 10 }
};

const defaultArchiveState = {
  choices: {},
  base: { attention: 20, trust: 45, integrity: 35, awareness: 15 }
};

const typeIcons = {
  "cached post": "⌁", "platform notice": "▣", "community thread": "☷",
  "community welcome": "☷", "crisis summary": "▣", "support thread": "☷",
  "platform page": "▣", "intake record": "✉", "support chat": "☷",
  "witness testimony": "✉", "AI summary": "◈", "returned post": "◇",
  "comment thread": "☷", "analysis report": "◎", "member profile": "◇",
  "script fragments": "▤", "deployment memo": "▧", "pricing grid": "§",
  "system log": "◎", "sales deck": "▧", "worker interface": "▤",
  "contract excerpt": "▣", "synthetic report": "◇", "internal brief": "▣",
  "forum thread": "☷", "moderator log": "▧", "policy brief": "▣",
  "synthetic message": "◇", "reaction thread": "☷", "archive proposal": "⬚",
  transcript: "▤", "trust report": "◎", "private message": "✉",
  "recovered text": "◌", "internal memo": "▧", invoice: "§",
  "physical clue": "⌂", reconstruction: "⬚", "corrupted index": "▧",
  "pointer record": "⌁", "witness request": "✉", "archive marker": "◎",
  "legal map": "▣", "worker note": "▤", "synthetic residue": "◇",
  "policy excerpt": "▣", "corrupted witness file": "◌", "model retention note": "§",
  "Archive warning": "!", "witness thread": "☷"
};

const storage = {
  get(key, fallback) {
    try { return localStorage.getItem(key) ?? fallback; } catch { return fallback; }
  },
  set(key, value) {
    try { localStorage.setItem(key, value); } catch { /* preview mode */ }
  },
  remove(key) {
    try { localStorage.removeItem(key); } catch { /* ignore */ }
  }
};

const state = {
  selectedId: null,
  read: new Set(JSON.parse(storage.get(`${prefix}.read`, "[]"))),
  flagged: new Set(JSON.parse(storage.get(`${prefix}.flagged`, "[]"))),
  notes: storage.get(`${prefix}.notes`, ""),
  lastLeadLevel: Number(storage.get(`${prefix}.leadLevel`, "0")),
  lastDiscoveryCount: 0,
  filter: "all",
  search: ""
};

const evidenceList = document.querySelector("#evidenceList");
const searchInput = document.querySelector("#searchInput");
const docTitle = document.querySelector("#docTitle");
const docMeta = document.querySelector("#docMeta");
const documentBody = document.querySelector("#documentBody");
const progressLabel = document.querySelector("#progressLabel");
const leadBanner = document.querySelector("#leadBanner strong");
const flagButton = document.querySelector("#flagButton");
const noteButton = document.querySelector("#noteButton");
const notesArea = document.querySelector("#notesArea");
const beginButton = document.querySelector("#beginButton");
const flagList = document.querySelector("#flagList");
const discoveryList = document.querySelector("#discoveryList");
const timelineList = document.querySelector("#timelineList");
const endingPanel = document.querySelector("#endingPanel");
const endingResult = document.querySelector("#endingResult");
const archiveWriteResult = document.querySelector("#archiveWriteResult");
const archiveStatus = document.querySelector("#archiveStatus");
const statusAttention = document.querySelector("#statusAttention");
const statusTrust = document.querySelector("#statusTrust");
const statusIntegrity = document.querySelector("#statusIntegrity");
const statusAwareness = document.querySelector("#statusAwareness");
const nextLead = document.querySelector("#nextLead");
const theoryInputs = {
  speaker: document.querySelector("#theorySpeaker"),
  proof: document.querySelector("#theoryProof"),
  hidden: document.querySelector("#theoryHidden")
};
const endingButtons = document.querySelectorAll("[data-ending]");

function getContradictionReward(itemId) {
  const rewards = config.contradictionRewards || [];
  return rewards.find((reward) => reward.id === itemId) || null;
}

function isValidatedContradiction(itemId) {
  if (!config.contradictionRewards) return state.flagged.has(itemId);
  return Boolean(getContradictionReward(itemId));
}

function validatedContradictionCount() {
  if (!config.contradictionRewards) return state.flagged.size;
  return [...state.flagged].filter((id) => isValidatedContradiction(id)).length;
}

notesArea.value = state.notes;
if (theoryInputs.speaker) theoryInputs.speaker.value = storage.get(`${prefix}.theory.speaker`, "");
if (theoryInputs.proof)   theoryInputs.proof.value   = storage.get(`${prefix}.theory.proof`, "");
if (theoryInputs.hidden)  theoryInputs.hidden.value  = storage.get(`${prefix}.theory.hidden`, "");

function getArchiveState() {
  try {
    return JSON.parse(localStorage.getItem("network.archive.state")) || structuredClone(defaultArchiveState);
  } catch {
    return structuredClone(defaultArchiveState);
  }
}

function calculateArchiveMeters() {
  const archiveState = getArchiveState();
  const meters = { ...defaultArchiveState.base, ...(archiveState.base || {}) };
  Object.values(archiveState.choices || {}).forEach((choice) => {
    const effect = archiveChoiceEffects[choice];
    if (!effect) return;
    Object.entries(effect).forEach(([key, value]) => {
      meters[key] = Math.max(0, Math.min(100, meters[key] + value));
    });
  });
  return { meters, completedCount: Object.keys(archiveState.choices || {}).length };
}

function unlockLevel() {
  return config.unlockLevel(state);
}

function isUnlocked(item) {
  return item.unlock <= unlockLevel();
}

function saveState() {
  storage.set(`${prefix}.read`, JSON.stringify([...state.read]));
  storage.set(`${prefix}.flagged`, JSON.stringify([...state.flagged]));
  storage.set(`${prefix}.notes`, state.notes);
}

function renderEvidenceList() {
  const query = state.search.trim().toLowerCase();
  evidenceList.innerHTML = "";
  evidence
    .filter((item) => {
      if (state.filter === "unread" && state.read.has(item.id)) return false;
      if (state.filter === "flagged" && !state.flagged.has(item.id)) return false;
      if (!query) return true;
      return [item.title, item.act, item.type, item.date, ...item.keywords].join(" ").toLowerCase().includes(query);
    })
    .forEach((item) => {
      const button = document.createElement("button");
      button.type = "button";
      button.dataset.type = item.type;
      button.dataset.icon = typeIcons[item.type] || "•";
      button.className = ["evidence-item", item.id === state.selectedId ? "selected" : "", isUnlocked(item) ? "" : "locked"].join(" ");
      button.innerHTML = `
        <span class="evidence-title">${String(item.id).padStart(2, "0")}. ${item.title}</span>
        <span class="evidence-meta">
          <span>${item.act} / ${item.type}</span>
          <span>${state.flagged.has(item.id) ? "flagged" : state.read.has(item.id) ? "reviewed" : isUnlocked(item) ? "open" : "locked"}</span>
        </span>
      `;
      button.addEventListener("click", () => openEvidence(item));
      evidenceList.appendChild(button);
    });
  progressLabel.textContent = `${state.read.size} / ${evidence.length} reviewed`;
  renderLead();
}

function renderLead() {
  leadBanner.textContent = config.leadLabels[unlockLevel()] || config.leadLabels[0];
}

async function openEvidence(item) {
  if (!isUnlocked(item)) return;
  const levelBefore = unlockLevel();
  state.selectedId = item.id;
  state.read.add(item.id);
  const levelAfter = unlockLevel();
  if (levelAfter > levelBefore) {
    state.lastLeadLevel = levelAfter;
    storage.set(`${prefix}.leadLevel`, String(levelAfter));
  }
  saveState();
  renderEvidenceList();
  renderTimeline();
  renderFlags();
  renderDiscoveries();
  renderEnding();

  docTitle.textContent = item.title;
  docMeta.textContent = `${item.act} / ${item.type} / ${item.date}`;
  documentBody.innerHTML = `<p class="empty-state">Loading artifact...</p>`;

  try {
    const archiveState = getArchiveState();
    const extraHtml = config.onOpenEvidence ? (config.onOpenEvidence(item, archiveState) || "") : "";

    if (extraHtml === null) {
      // onOpenEvidence returned null means it fully replaced the content
      return;
    }

    const embedded = window.CASE_ARTIFACTS?.find((a) => a.file === item.file);
    const markdown = embedded?.content || await fetch(item.file).then((r) => r.text());
    documentBody.innerHTML = `${extraHtml}${leadUnlockedNote(levelAfter, levelBefore)}${contradictionRewardHtml(item)}${markdownToHtml(markdown)}`;
  } catch {
    documentBody.innerHTML = `<p class="empty-state">Artifact could not be loaded. Open the source markdown file directly from the artifacts folder.</p>`;
  }
}

function leadUnlockedNote(levelAfter, levelBefore) {
  if (levelAfter <= levelBefore) return "";
  const msg = config.leadUnlockMessages[levelAfter];
  return msg ? `<div class="unlock-note">${msg}</div>` : "";
}

function contradictionRewardHtml(item) {
  if (!state.flagged.has(item.id)) return "";
  const reward = getContradictionReward(item.id);
  if (!reward) return "";
  return `
    <div class="discovery-reward">
      <strong>${reward.label}</strong>
      <p>${reward.message}</p>
      ${reward.comparesWith ? `<p class="discovery-pair">Compare with: ${reward.comparesWith}</p>` : ""}
    </div>
  `;
}

function markdownToHtml(markdown) {
  const lines = markdown.split(/\r?\n/);
  let html = "";
  let inList = false;
  let inQuote = false;
  let inNotes = false;
  const isFlagged = state.flagged.has(state.selectedId);
  const isValidated = isValidatedContradiction(state.selectedId);

  const closeList = () => { if (inList)  { html += "</ul>";        inList = false; } };
  const closeQuote = () => { if (inQuote) { html += "</blockquote>"; inQuote = false; } };

  for (const line of lines) {
    const trimmed = line.trim();

    if (trimmed === "## Investigator Notes") {
      closeList(); closeQuote();
      inNotes = true;
      if (isFlagged && isValidated) {
        html += `<div class="investigator-notes unlocked"><h2>Investigator Notes</h2>`;
      } else if (isFlagged && !isValidated) {
        html += `<div class="investigator-notes locked"><p class="locked-msg">Flag recorded, but this artifact is not a strong contradiction yet. Compare it against voice, verification, or provenance evidence.</p><div style="display:none;">`;
      } else {
        html += `<div class="investigator-notes locked"><p class="locked-msg">&#x1F512; Investigator Notes locked. Flag this artifact as containing a contradiction to decrypt analysis.</p><div style="display:none;">`;
      }
      continue;
    }

    if (!trimmed) { closeList(); closeQuote(); continue; }

    if (trimmed.startsWith("# "))   { closeList(); closeQuote(); html += `<h1>${inline(trimmed.slice(2))}</h1>`; }
    else if (trimmed.startsWith("## "))  { closeList(); closeQuote(); html += `<h2>${inline(trimmed.slice(3))}</h2>`; }
    else if (trimmed.startsWith("### ")) { closeList(); closeQuote(); html += `<h3>${inline(trimmed.slice(4))}</h3>`; }
    else if (trimmed.startsWith("- "))  {
      closeQuote();
      if (!inList) { html += "<ul>"; inList = true; }
      html += `<li>${inline(trimmed.slice(2))}</li>`;
    } else if (trimmed.startsWith("> ")) {
      closeList();
      if (!inQuote) { html += "<blockquote>"; inQuote = true; }
      html += `<p>${inline(trimmed.slice(2))}</p>`;
    } else {
      closeList(); closeQuote();
      html += `<p>${inline(trimmed)}</p>`;
    }
  }
  closeList(); closeQuote();
  if (inNotes) {
    html += isFlagged ? `</div>` : `</div></div>`;
  }
  return html;
}

function inline(text) {
  return text
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/\*([^*]+)\*/g, "<em>$1</em>");
}

function renderTimeline() {
  timelineList.innerHTML = "";
  evidence.filter((item) => state.read.has(item.id)).forEach((item) => {
    const li = document.createElement("li");
    li.textContent = `${item.date}: ${item.title}`;
    timelineList.appendChild(li);
  });
}

function renderFlags() {
  flagList.innerHTML = "";
  const flagged = evidence.filter((item) => state.flagged.has(item.id));
  if (!flagged.length) {
    const li = document.createElement("li");
    li.textContent = "No contradictions flagged yet.";
    flagList.appendChild(li);
    return;
  }
  flagged.forEach((item) => {
    const li = document.createElement("li");
    const reward = getContradictionReward(item.id);
    li.className = reward ? "verified-contradiction" : "speculative-contradiction";
    li.textContent = reward
      ? `${String(item.id).padStart(2, "0")}. ${item.title} / ${reward.label}`
      : `${String(item.id).padStart(2, "0")}. ${item.title} / speculative`;
    flagList.appendChild(li);
  });
}

function renderDiscoveries() {
  if (!discoveryList) return;
  const previousCount = state.lastDiscoveryCount;
  discoveryList.innerHTML = "";
  const rewards = config.contradictionRewards || [];
  const discovered = rewards.filter((reward) => state.flagged.has(reward.id));
  state.lastDiscoveryCount = discovered.length;
  discoveryList.closest("section")?.style.setProperty("--discovery-count", `"${discovered.length}"`);

  if (!discovered.length) {
    const li = document.createElement("li");
    li.textContent = "No evidence pairs resolved yet.";
    discoveryList.appendChild(li);
    return;
  }

  discovered.forEach((reward) => {
    const item = evidence.find((entry) => entry.id === reward.id);
    const li = document.createElement("li");
    li.className = "discovery-pair-card";
    li.innerHTML = `
      <strong>${reward.label}</strong>
      <span>${item ? item.title : `Artifact ${reward.id}`}</span>
      ${reward.comparesWith ? `<small>${reward.comparesWith}</small>` : ""}
    `;
    discoveryList.appendChild(li);
  });

  if (discovered.length > previousCount) {
    discoveryList.classList.remove("discovery-pulse");
    void discoveryList.offsetWidth;
    discoveryList.classList.add("discovery-pulse");
  }
}

function renderEnding() {
  const required = config.endingRequired || [];
  const missingIds = required.filter((id) => !state.read.has(id));
  const missingNames = missingIds.map((id) => evidence.find((item) => item.id === id)?.title).filter(Boolean);
  const ready = unlockLevel() >= 3 && missingIds.length === 0;
  endingPanel.classList.toggle("locked", !ready);
  endingPanel.querySelector("p").textContent = ready
    ? config.endingReadyMessage
    : missingNames.length
      ? `Review required evidence before the final call: ${missingNames.join(", ")}.`
      : config.endingLockedMessage;
  endingButtons.forEach((b) => { b.disabled = !ready; });
}

function recordArchiveChoice(caseId, choice) {
  try {
    const archiveState = getArchiveState();
    archiveState.choices[caseId] = choice;
    localStorage.setItem("network.archive.state", JSON.stringify(archiveState));
  } catch {
    archiveWriteResult.textContent = "Archive choice could not be stored in this browser session.";
  }
}

// Hold-to-confirm on ending buttons
endingButtons.forEach((button) => {
  button.innerHTML = `<span>${button.textContent}</span>`;
  let holdTimer;
  let progressInterval;
  let isCommitted = false;

  const commitEnding = () => {
    if (isCommitted) return;
    clearInterval(progressInterval);
    isCommitted = true;
    button.style.setProperty("--progress", "100%");
    endingButtons.forEach((b) => {
      if (b !== button) b.style.opacity = "0.3";
      b.style.pointerEvents = "none";
    });
    executeEnding(button.dataset.ending);
  };

  const clearHold = () => {
    if (isCommitted) return;
    clearTimeout(holdTimer);
    clearInterval(progressInterval);
    button.style.setProperty("--progress", "0%");
  };

  const startHold = () => {
    if (isCommitted || endingPanel.classList.contains("locked")) return;
    let progress = 0;
    progressInterval = setInterval(() => {
      progress += 100 / 40;
      button.style.setProperty("--progress", `${Math.min(progress, 100)}%`);
    }, 50);
    holdTimer = setTimeout(commitEnding, 2000);
  };

  button.addEventListener("mousedown", startHold);
  button.addEventListener("touchstart", (e) => { e.preventDefault(); startHold(); });
  button.addEventListener("click", () => {
    if (endingPanel.classList.contains("locked")) return;
    button.style.setProperty("--progress", "100%");
    clearTimeout(holdTimer);
    commitEnding();
  });
  button.addEventListener("mouseup", clearHold);
  button.addEventListener("mouseleave", clearHold);
  button.addEventListener("touchend", clearHold);
});

function executeEnding(ending) {
  const outcome = config.outcomes[ending];
  if (!outcome) return;
  endingResult.textContent = outcome.copy;
  statusAttention.textContent = outcome.attention;
  statusTrust.textContent = outcome.trust;
  statusIntegrity.textContent = outcome.integrity;
  statusAwareness.textContent = outcome.awareness;
  nextLead.textContent = outcome.lead;
  archiveStatus.hidden = false;
  caseAudio.thud.currentTime = 0;
  caseAudio.thud.play().catch(() => {});
  recordArchiveChoice(config.caseId, ending);
  archiveWriteResult.innerHTML = `Archive recorded: <strong>${ending}</strong>. <a href="/">Return to Archive</a>.`;
}

flagButton.addEventListener("click", () => {
  if (!state.selectedId) return;
  const wasFlagged = state.flagged.has(state.selectedId);
  if (wasFlagged) {
    state.flagged.delete(state.selectedId);
  } else {
    state.flagged.add(state.selectedId);
    const reward = getContradictionReward(state.selectedId);
    if (reward) {
      const currentItem = evidence.find((e) => e.id === state.selectedId);
      if (currentItem) {
        notesArea.value += `${notesArea.value ? "\n" : ""}- ${currentItem.title}: ${reward.notePrompt || ""}`;
        state.notes = notesArea.value;
      }
    }
  }
  saveState();
  renderEvidenceList();
  renderFlags();
  renderDiscoveries();
  const currentItem = evidence.find((e) => e.id === state.selectedId);
  if (currentItem) openEvidence(currentItem);
});

noteButton.addEventListener("click", () => {
  const item = evidence.find((e) => e.id === state.selectedId);
  if (!item) return;
  notesArea.value += `${notesArea.value ? "\n" : ""}- ${item.title}: `;
  notesArea.focus();
});

notesArea.addEventListener("input", () => {
  state.notes = notesArea.value;
  saveState();
});

if (theoryInputs.speaker) {
  Object.entries(theoryInputs).forEach(([key, input]) => {
    if (input) input.addEventListener("input", () => storage.set(`${prefix}.theory.${key}`, input.value));
  });
}

beginButton.addEventListener("click", () => openEvidence(evidence[0]));

searchInput.addEventListener("input", () => {
  state.search = searchInput.value;
  renderEvidenceList();
});

document.querySelectorAll(".filter-button").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".filter-button").forEach((b) => b.classList.remove("active"));
    button.classList.add("active");
    state.filter = button.dataset.filter;
    renderEvidenceList();
  });
});

document.querySelector("#resetButton").addEventListener("click", () => {
  ["read", "flagged", "notes", "leadLevel", "theory.speaker", "theory.proof", "theory.hidden"].forEach((suffix) => {
    storage.remove(`${prefix}.${suffix}`);
  });
  window.location.reload();
});

const caseAudio = {
  click: new Audio("/assets/audio/ui-click.mp3"),
  thud: new Audio("/assets/audio/ui-thud.mp3"),
  init() {
    document.addEventListener("mousedown", (e) => {
      if (e.target.tagName === "BUTTON" || e.target.closest("button")) {
        this.click.currentTime = 0;
        this.click.play().catch(() => {});
      }
    });
  }
};
caseAudio.init();

if (config.onInit) config.onInit(getArchiveState);

renderEvidenceList();
renderTimeline();
renderFlags();
renderDiscoveries();
renderEnding();
