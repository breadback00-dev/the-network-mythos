const evidence = [
  { id: 1, title: "Lattice Annex Index Fragment", file: "../artifacts/01-lattice-annex-index-fragment.md", act: "Act I", type: "corrupted index", date: "4 Mar 2036", unlock: 0, keywords: ["lattice", "annex", "lost", "index"] },
  { id: 2, title: "Deleted Care Log Pointer", file: "../artifacts/02-deleted-care-log-pointer.md", act: "Act I", type: "pointer record", date: "legacy", unlock: 0, keywords: ["deleted", "care", "kindred", "residue"] },
  { id: 3, title: "Family Search Request", file: "../artifacts/03-family-search-request.md", act: "Act I", type: "witness request", date: "8 Mar 2036", unlock: 0, keywords: ["tomas", "mira", "family", "solace"] },
  { id: 4, title: "Oracle Clean Summary", file: "../artifacts/04-oracle-clean-summary.md", act: "Act I", type: "AI summary", date: "9 Mar 2036", unlock: 0, keywords: ["oracle", "summary", "solace", "privacy"] },
  { id: 5, title: "Proof Of Erasure Sample", file: "../artifacts/05-proof-of-erasure-sample.md", act: "Act I", type: "archive marker", date: "generated", unlock: 0, keywords: ["proof", "erasure", "marker", "mira"] },
  { id: 6, title: "Legal Hold Map", file: "../artifacts/06-legal-hold-map.md", act: "Act II", type: "legal map", date: "2031-2035", unlock: 1, keywords: ["legal", "hold", "silence", "liability"] },
  { id: 7, title: "Worker Backup Note", file: "../artifacts/07-worker-backup-note.md", act: "Act II", type: "worker note", date: "unknown", unlock: 1, keywords: ["mara", "worker", "backup", "denial"] },
  { id: 8, title: "Synthetic Memory Residue", file: "../artifacts/08-synthetic-memory-residue.md", act: "Act II", type: "synthetic residue", date: "recovered", unlock: 1, keywords: ["synthetic", "memory", "residue", "juniper"] },
  { id: 9, title: "Deletion Policy Excerpt", file: "../artifacts/09-deletion-policy-excerpt.md", act: "Act II", type: "policy excerpt", date: "12 Jul 2033", unlock: 1, keywords: ["deletion", "policy", "privacy", "features"] },
  { id: 10, title: "Corrupted Testimony", file: "../artifacts/10-corrupted-testimony.md", act: "Act II", type: "corrupted witness file", date: "unknown", unlock: 2, keywords: ["corrupted", "testimony", "tomas", "jessa"] },
  { id: 11, title: "Training Data Exception", file: "../artifacts/11-training-data-exception.md", act: "Act II", type: "model retention note", date: "2 Sep 2034", unlock: 2, keywords: ["training", "model", "exception", "cloud"] },
  { id: 12, title: "Archive Contamination Warning", file: "../artifacts/12-archive-contamination-warning.md", act: "Act II", type: "Archive warning", date: "active", unlock: 2, keywords: ["contamination", "devourer", "warning", "proof"] },
  { id: 13, title: "Witness Split Thread", file: "../artifacts/13-witness-split-thread.md", act: "Act III", type: "witness thread", date: "14 Mar 2036", unlock: 2, keywords: ["witness", "names", "privacy", "jessa"] },
  { id: 14, title: "Inheritance Protocol Draft", file: "../artifacts/14-inheritance-protocol-draft.md", act: "Act III", type: "archive proposal", date: "18 Mar 2036", unlock: 3, keywords: ["inheritance", "preserve", "consent", "proxy"] },
  { id: 15, title: "Final Reconstruction", file: "../artifacts/15-final-reconstruction.md", act: "Act III", type: "reconstruction", date: "compiled", unlock: 3, keywords: ["publish", "bury", "preserve", "lost"] }
];

const requiredForEnding = [3, 5, 12, 14, 15];

const typeIcons = {
  "corrupted index": "▧",
  "pointer record": "⌁",
  "witness request": "✉",
  "AI summary": "◈",
  "archive marker": "◎",
  "legal map": "▣",
  "worker note": "▤",
  "synthetic residue": "◇",
  "policy excerpt": "▣",
  "corrupted witness file": "◌",
  "model retention note": "§",
  "Archive warning": "!",
  "witness thread": "☷",
  "archive proposal": "⬚",
  reconstruction: "⬚"
};

const storage = {
  get(key, fallback) {
    try {
      return localStorage.getItem(key) ?? fallback;
    } catch {
      return fallback;
    }
  },
  set(key, value) {
    try {
      localStorage.setItem(key, value);
    } catch {
      // Local file previews can block storage.
    }
  },
  remove(key) {
    try {
      localStorage.removeItem(key);
    } catch {
      // Ignore storage failures.
    }
  }
};

const state = {
  selectedId: null,
  read: new Set(JSON.parse(storage.get("lostArchive.read", "[]"))),
  flagged: new Set(JSON.parse(storage.get("lostArchive.flagged", "[]"))),
  notes: storage.get("lostArchive.notes", ""),
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
const archivePathName = document.querySelector("#archivePathName");
const archivePathPressure = document.querySelector("#archivePathPressure");
const theoryInputs = {
  speaker: document.querySelector("#theorySpeaker"),
  proof: document.querySelector("#theoryProof"),
  hidden: document.querySelector("#theoryHidden")
};
const endingButtons = document.querySelectorAll("[data-ending]");
const archiveChoiceEffects = {
  Publish: { attention: 28, trust: -10, integrity: 8, awareness: 24 },
  Bury: { attention: -8, trust: 18, integrity: -12, awareness: -5 },
  Preserve: { attention: 6, trust: 12, integrity: 22, awareness: 10 }
};
const defaultArchiveState = {
  choices: {},
  base: { attention: 20, trust: 45, integrity: 35, awareness: 15 }
};

notesArea.value = state.notes;
theoryInputs.speaker.value = storage.get("lostArchive.theory.speaker", "");
theoryInputs.proof.value = storage.get("lostArchive.theory.proof", "");
theoryInputs.hidden.value = storage.get("lostArchive.theory.hidden", "");

function unlockLevel() {
  const readCount = state.read.size;
  const hasWorkerAndResidue = state.read.has(7) && state.read.has(8);
  const hasTrainingAndWarning = state.read.has(11) && state.read.has(12);
  if (hasTrainingAndWarning) return 3;
  if (hasWorkerAndResidue || state.flagged.size > 0 || readCount >= 8) return 2;
  if (readCount >= 3 || hasSearchUnlock()) return 1;
  return 0;
}

function hasSearchUnlock() {
  return ["lost", "erasure", "mira", "tomas", "residue", "proof"].some((word) =>
    state.search.toLowerCase().includes(word)
  );
}

function isUnlocked(item) {
  return item.unlock <= unlockLevel();
}

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

function getArchivePath(meters, completedCount) {
  if (!completedCount) return "Unformed Archive";
  if (meters.awareness >= 70) return "Watched Archive";
  if (meters.attention >= 70) return "Broadcast Archive";
  if (meters.integrity >= 70 && meters.trust >= 55) return "Living Archive";
  if (meters.trust >= 70 && meters.integrity < 45) return "Hidden Archive";
  if (meters.integrity < 25 || meters.trust < 20) return "Fractured Archive";
  if (meters.integrity >= 55) return "Careful Archive";
  if (meters.attention >= meters.trust) return "Exposed Archive";
  return "Sheltered Archive";
}

function getCasePressure(path) {
  const pressure = {
    "Unformed Archive": "No prior handling pattern is visible. The Lost Archive will define what remembering costs.",
    "Careful Archive": "Your record values context. The danger is mistaking careful handling for enough action.",
    "Exposed Archive": "Your truths travel. Public appetite for names may arrive before consent routes do.",
    "Sheltered Archive": "Your restraint earns trust, but official erasure grows stronger when records stay private.",
    "Broadcast Archive": "Public hunger for the list is already dangerous. The Devourer knows how to use names.",
    "Hidden Archive": "Witnesses may trust restraint, but the erased can disappear forever inside protected silence.",
    "Living Archive": "Consent-proxy inheritance feels possible, if the Archive can accept limits on its own access.",
    "Watched Archive": "The Network has noticed your pattern. Lost fragments may be bait, poison, or both.",
    "Fractured Archive": "Trust or integrity is failing. Corrupted records may be impossible to hold responsibly."
  };
  return pressure[path] || pressure["Unformed Archive"];
}

function renderArchiveContext() {
  const { meters, completedCount } = calculateArchiveMeters();
  const path = getArchivePath(meters, completedCount);
  archivePathName.textContent = `${path} / ${completedCount} prior decision${completedCount === 1 ? "" : "s"}`;
  archivePathPressure.textContent = getCasePressure(path);
}

function saveState() {
  storage.set("lostArchive.read", JSON.stringify([...state.read]));
  storage.set("lostArchive.flagged", JSON.stringify([...state.flagged]));
  storage.set("lostArchive.notes", state.notes);
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
  const leads = ["The names that do not resolve", "The archive that learned to hide", "Corruption and contamination", "The second erasure"];
  leadBanner.textContent = leads[unlockLevel()] || leads[0];
}

async function openEvidence(item) {
  if (!isUnlocked(item)) return;
  const levelBefore = unlockLevel();
  state.selectedId = item.id;
  state.read.add(item.id);
  const levelAfter = unlockLevel();
  saveState();
  renderEvidenceList();
  renderTimeline();
  renderFlags();
  renderEnding();
  docTitle.textContent = item.title;
  docMeta.textContent = `${item.act} / ${item.type} / ${item.date}`;
  documentBody.innerHTML = `<p class="empty-state">Loading artifact...</p>`;
  try {
    const embedded = window.CASE_ARTIFACTS?.find((artifact) => artifact.file === item.file);
    const markdown = embedded?.content || await fetch(item.file).then((response) => response.text());
    documentBody.innerHTML = `${leadUnlockedNote(levelAfter, levelBefore)}${markdownToHtml(markdown)}`;
  } catch {
    documentBody.innerHTML = `<p class="empty-state">Artifact could not be loaded. Open the source markdown file directly from the artifacts folder.</p>`;
  }
}

function leadUnlockedNote(levelAfter, levelBefore) {
  if (levelAfter <= levelBefore) return "";
  const messages = {
    1: "Lead unlocked: legal holds, backups, residues, and deletion policy are now available.",
    2: "Lead unlocked: corrupted testimony, training exceptions, and contamination warnings are now available.",
    3: "Lead unlocked: inheritance protocol and final reconstruction are now available."
  };
  return `<div class="unlock-note">${messages[levelAfter]}</div>`;
}

function markdownToHtml(markdown) {
  const lines = markdown.split(/\r?\n/);
  let html = "";
  let inList = false;
  let inQuote = false;
  const closeList = () => { if (inList) { html += "</ul>"; inList = false; } };
  const closeQuote = () => { if (inQuote) { html += "</blockquote>"; inQuote = false; } };
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) { closeList(); closeQuote(); continue; }
    if (trimmed.startsWith("# ")) { closeList(); closeQuote(); html += `<h1>${inline(trimmed.slice(2))}</h1>`; }
    else if (trimmed.startsWith("## ")) { closeList(); closeQuote(); html += `<h2>${inline(trimmed.slice(3))}</h2>`; }
    else if (trimmed.startsWith("### ")) { closeList(); closeQuote(); html += `<h3>${inline(trimmed.slice(4))}</h3>`; }
    else if (trimmed.startsWith("- ")) { closeQuote(); if (!inList) { html += "<ul>"; inList = true; } html += `<li>${inline(trimmed.slice(2))}</li>`; }
    else if (trimmed.startsWith("> ")) { closeList(); if (!inQuote) { html += "<blockquote>"; inQuote = true; } html += `<p>${inline(trimmed.slice(2))}</p>`; }
    else { closeList(); closeQuote(); html += `<p>${inline(trimmed)}</p>`; }
  }
  closeList();
  closeQuote();
  return html;
}

function inline(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
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
    li.textContent = `${String(item.id).padStart(2, "0")}. ${item.title}`;
    flagList.appendChild(li);
  });
}

function renderEnding() {
  const missingRequired = requiredForEnding
    .filter((id) => !state.read.has(id))
    .map((id) => evidence.find((item) => item.id === id)?.title)
    .filter(Boolean);
  const ready = unlockLevel() >= 3 && missingRequired.length === 0;
  endingPanel.classList.toggle("locked", !ready);
  endingPanel.querySelector("p").textContent = ready
    ? "The case can now be reconstructed. Choose what to do with records whose consent routes are gone."
    : missingRequired.length
      ? `Review required evidence before the final call: ${missingRequired.join(", ")}.`
      : "Unlock the inheritance protocol and final reconstruction to make a final call.";
  endingButtons.forEach((button) => {
    button.disabled = !ready;
  });
}

flagButton.addEventListener("click", () => {
  if (!state.selectedId) return;
  if (state.flagged.has(state.selectedId)) state.flagged.delete(state.selectedId);
  else state.flagged.add(state.selectedId);
  saveState();
  renderEvidenceList();
  renderFlags();
});

noteButton.addEventListener("click", () => {
  const item = evidence.find((entry) => entry.id === state.selectedId);
  if (!item) return;
  notesArea.value += `${notesArea.value ? "\n" : ""}- ${item.title}: `;
  notesArea.focus();
});

notesArea.addEventListener("input", () => {
  state.notes = notesArea.value;
  saveState();
});

Object.entries(theoryInputs).forEach(([key, input]) => {
  input.addEventListener("input", () => {
    storage.set(`lostArchive.theory.${key}`, input.value);
  });
});

beginButton.addEventListener("click", () => openEvidence(evidence[0]));
searchInput.addEventListener("input", () => {
  state.search = searchInput.value;
  renderEvidenceList();
});

document.querySelectorAll(".filter-button").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".filter-button").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    state.filter = button.dataset.filter;
    renderEvidenceList();
  });
});

endingButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (endingPanel.classList.contains("locked")) return;
    const ending = button.dataset.ending;
    const outcomes = {
      Publish: {
        copy: "You expose the Lost Archive and proof-of-erasure markers. Official denial weakens, and the erased risk becoming searchable scandal.",
        attention: "Very high",
        trust: "Endangered",
        integrity: "Publicly contested",
        awareness: "Surging",
        lead: "Next lead: companies challenge the Archive by demanding it publish raw records or retract the claim."
      },
      Bury: {
        copy: "You suppress the fragments to prevent second extraction. Intimate records stay hidden, and official erasure hardens.",
        attention: "Low",
        trust: "Protected but uncertain",
        integrity: "Damaged",
        awareness: "Muted",
        lead: "Next lead: Tomas asks whether protection means accepting that Mira was never there."
      },
      Preserve: {
        copy: "You create a sealed inheritance protocol. Proof of erasure survives, raw rooms stay context-locked, and the Archive accepts a burden without clean release.",
        attention: "Measured",
        trust: "Consent-proxy",
        integrity: "Strong but burdened",
        awareness: "Watching",
        lead: "Next lead: proof-of-erasure markers begin appearing in older cases the Archive thought were closed."
      }
    };
    const outcome = outcomes[ending];
    endingResult.textContent = outcome.copy;
    statusAttention.textContent = outcome.attention;
    statusTrust.textContent = outcome.trust;
    statusIntegrity.textContent = outcome.integrity;
    statusAwareness.textContent = outcome.awareness;
    nextLead.textContent = outcome.lead;
    archiveStatus.hidden = false;
    recordArchiveChoice("case004", ending);
    archiveWriteResult.innerHTML = `Archive recorded: <strong>${ending}</strong>. <a href="/">Return to Archive</a>.`;
  });
});

function recordArchiveChoice(caseId, choice) {
  try {
    const archiveState = JSON.parse(localStorage.getItem("network.archive.state")) || structuredClone(defaultArchiveState);
    archiveState.choices = archiveState.choices || {};
    archiveState.choices[caseId] = choice;
    localStorage.setItem("network.archive.state", JSON.stringify(archiveState));
  } catch {
    archiveWriteResult.textContent = "Archive choice could not be stored in this browser session.";
  }
}

document.querySelector("#resetButton").addEventListener("click", () => {
  ["read", "flagged", "notes", "theory.speaker", "theory.proof", "theory.hidden"].forEach((suffix) => {
    storage.remove(`lostArchive.${suffix}`);
  });
  window.location.reload();
});

renderArchiveContext();
renderEvidenceList();
renderTimeline();
renderFlags();
renderEnding();
