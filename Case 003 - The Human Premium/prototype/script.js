const evidence = [
  {
    id: 1,
    title: "Kindred Direct Public Page",
    file: "../artifacts/01-kindred-direct-public-page.md",
    act: "Act I",
    type: "platform page",
    date: "18 Apr 2035",
    unlock: 0,
    keywords: ["kindred", "human plus", "covenant", "care"]
  },
  {
    id: 2,
    title: "Nia Calder Intake",
    file: "../artifacts/02-nia-calder-intake.md",
    act: "Act I",
    type: "intake record",
    date: "6 Jan 2035",
    unlock: 0,
    keywords: ["nia", "intake", "arbiter", "basic"]
  },
  {
    id: 3,
    title: "First Week Support Chat",
    file: "../artifacts/03-first-week-support-chat.md",
    act: "Act I",
    type: "support chat",
    date: "6-12 Jan 2035",
    unlock: 0,
    keywords: ["nia", "vale", "support", "synthetic"]
  },
  {
    id: 4,
    title: "Family Voice Note Transcript",
    file: "../artifacts/04-family-voice-note-transcript.md",
    act: "Act I",
    type: "transcript",
    date: "3 Mar 2035",
    unlock: 0,
    keywords: ["jessa", "nia", "human", "family"]
  },
  {
    id: 5,
    title: "Oracle Summary: Kindred Direct",
    file: "../artifacts/05-oracle-summary-kindred.md",
    act: "Act I",
    type: "AI summary",
    date: "20 Apr 2035",
    unlock: 0,
    keywords: ["oracle", "summary", "tiered", "human plus"]
  },
  {
    id: 6,
    title: "Plan Comparison Grid",
    file: "../artifacts/06-plan-comparison-grid.md",
    act: "Act II",
    type: "pricing grid",
    date: "21 Apr 2035",
    unlock: 1,
    keywords: ["plans", "pricing", "exchange", "human"]
  },
  {
    id: 7,
    title: "Escalation Denial Log",
    file: "../artifacts/07-escalation-denial-log.md",
    act: "Act II",
    type: "system log",
    date: "Jan-Feb 2035",
    unlock: 1,
    keywords: ["nia", "escalation", "denial", "arbiter"]
  },
  {
    id: 8,
    title: "Human Plus Sales Deck",
    file: "../artifacts/08-human-plus-sales-deck.md",
    act: "Act II",
    type: "sales deck",
    date: "4 Dec 2034",
    unlock: 1,
    keywords: ["human plus", "sales", "premium", "exchange"]
  },
  {
    id: 9,
    title: "Care Worker Dashboard",
    file: "../artifacts/09-care-worker-dashboard.md",
    act: "Act II",
    type: "worker interface",
    date: "unknown",
    unlock: 1,
    keywords: ["worker", "dashboard", "human", "labor"]
  },
  {
    id: 10,
    title: "Insurer Contract Excerpt",
    file: "../artifacts/10-insurer-contract-excerpt.md",
    act: "Act II",
    type: "contract excerpt",
    date: "19 Nov 2034",
    unlock: 2,
    keywords: ["insurer", "contract", "containment", "exchange"]
  },
  {
    id: 11,
    title: "Synthetic Agent Self-Report",
    file: "../artifacts/11-synthetic-agent-self-report.md",
    act: "Act II",
    type: "synthetic report",
    date: "14 Feb 2035",
    unlock: 2,
    keywords: ["vale", "synthetic", "self-report", "need"]
  },
  {
    id: 12,
    title: "Internal Risk Brief",
    file: "../artifacts/12-internal-risk-brief.md",
    act: "Act II",
    type: "internal brief",
    date: "18 Feb 2035",
    unlock: 2,
    keywords: ["risk", "privacy", "human paywall", "silence"]
  },
  {
    id: 13,
    title: "User Forum Split",
    file: "../artifacts/13-user-forum-split.md",
    act: "Act III",
    type: "forum thread",
    date: "22 Feb 2035",
    unlock: 2,
    keywords: ["users", "forum", "jessa", "publish"]
  },
  {
    id: 14,
    title: "Labor And Care Archive Proposal",
    file: "../artifacts/14-labor-and-care-archive-proposal.md",
    act: "Act III",
    type: "archive proposal",
    date: "25 Feb 2035",
    unlock: 3,
    keywords: ["archive", "preserve", "labor", "care"]
  },
  {
    id: 15,
    title: "Final Reconstruction",
    file: "../artifacts/15-final-reconstruction.md",
    act: "Act III",
    type: "reconstruction",
    date: "compiled",
    unlock: 3,
    keywords: ["publish", "bury", "preserve", "human"]
  }
];

const typeIcons = {
  "cached post": "⌁",
  "platform notice": "▣",
  "community thread": "☷",
  "community welcome": "☷",
  "platform page": "▣",
  "intake record": "✉",
  "support chat": "☷",
  "crisis summary": "▣",
  "support thread": "☷",
  "witness testimony": "✉",
  "AI summary": "◈",
  "returned post": "◇",
  "comment thread": "☷",
  "analysis report": "◎",
  "member profile": "◇",
  "script fragments": "▤",
  "deployment memo": "▧",
  "pricing grid": "§",
  "system log": "◎",
  "sales deck": "▧",
  "worker interface": "▤",
  "contract excerpt": "▣",
  "synthetic report": "◇",
  "internal brief": "▣",
  "forum thread": "☷",
  "moderator log": "▧",
  "policy brief": "▣",
  "synthetic message": "◇",
  "reaction thread": "☷",
  "archive proposal": "⬚",
  transcript: "▤",
  "trust report": "◎",
  "private message": "✉",
  "recovered text": "◌",
  "internal memo": "▧",
  invoice: "§",
  "physical clue": "⌂",
  reconstruction: "⬚"
};

const storage = {
  get(key, fallback) {
    try {
      return localStorage.getItem(key) ?? fallback;
    } catch (error) {
      return fallback;
    }
  },
  set(key, value) {
    try {
      localStorage.setItem(key, value);
    } catch (error) {
      // Local file previews can block storage. The prototype still works for the session.
    }
  },
  remove(key) {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      // Ignore storage failures in local preview.
    }
  }
};

const state = {
  selectedId: null,
  read: new Set(JSON.parse(storage.get("humanPremium.read", "[]"))),
  flagged: new Set(JSON.parse(storage.get("humanPremium.flagged", "[]"))),
  notes: storage.get("humanPremium.notes", ""),
  lastLeadLevel: Number(storage.get("humanPremium.leadLevel", "0")),
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
  Publish: {
    attention: 28,
    trust: -10,
    integrity: 8,
    awareness: 24
  },
  Bury: {
    attention: -8,
    trust: 18,
    integrity: -12,
    awareness: -5
  },
  Preserve: {
    attention: 6,
    trust: 12,
    integrity: 22,
    awareness: 10
  }
};
const defaultArchiveState = {
  choices: {},
  base: {
    attention: 20,
    trust: 45,
    integrity: 35,
    awareness: 15
  }
};

notesArea.value = state.notes;
theoryInputs.speaker.value = storage.get("humanPremium.theory.speaker", "");
theoryInputs.proof.value = storage.get("humanPremium.theory.proof", "");
theoryInputs.hidden.value = storage.get("humanPremium.theory.hidden", "");

function unlockLevel() {
  const readCount = state.read.size;
  const hasDenialAndSales = state.read.has(7) && state.read.has(8);
  const hasContractAndRisk = state.read.has(10) && state.read.has(12);
  if (hasContractAndRisk) return 3;
  if (hasDenialAndSales || state.flagged.size > 0 || readCount >= 8) return 2;
  if (readCount >= 3 || hasSearchUnlock()) return 1;
  return 0;
}

function hasSearchUnlock() {
  return ["human", "premium", "nia", "escalation", "kindred"].some((word) =>
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
  return {
    meters,
    completedCount: Object.keys(archiveState.choices || {}).length
  };
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
    "Unformed Archive": "No prior handling pattern is visible. Kindred enters the file as a first test of market-shaped care.",
    "Careful Archive": "Your record has enough integrity to attract worker evidence, but Kindred can still argue that caution is delay.",
    "Exposed Archive": "Sources know you can make truth visible. Kindred's privacy defense will be ready before the evidence is.",
    "Sheltered Archive": "Witnesses may trust your restraint, but Basic users need more than private protection from a public market.",
    "Broadcast Archive": "Public pressure is already part of your method. Nia's case may travel fast enough to become spectacle.",
    "Hidden Archive": "Your restraint protects vulnerable records, but Kindred benefits when tiered care remains hard to see.",
    "Living Archive": "A consent-led path makes worker and family testimony more likely, if the Archive does not mistake slowness for justice.",
    "Watched Archive": "The Network has noticed your pattern. Kindred leaks may arrive already shaped to steer the Archive.",
    "Fractured Archive": "Trust or integrity is failing. Case 003 may test whether anyone still believes the Archive can hold intimate need."
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
  storage.set("humanPremium.read", JSON.stringify([...state.read]));
  storage.set("humanPremium.flagged", JSON.stringify([...state.flagged]));
  storage.set("humanPremium.notes", state.notes);
}

function renderEvidenceList() {
  const query = state.search.trim().toLowerCase();
  evidenceList.innerHTML = "";

  evidence
    .filter((item) => {
      if (state.filter === "unread" && state.read.has(item.id)) return false;
      if (state.filter === "flagged" && !state.flagged.has(item.id)) return false;
      if (!query) return true;
      const haystack = [item.title, item.act, item.type, item.date, ...item.keywords].join(" ").toLowerCase();
      return haystack.includes(query);
    })
    .forEach((item) => {
      const button = document.createElement("button");
      button.type = "button";
      button.dataset.type = item.type;
      button.dataset.icon = typeIcons[item.type] || "•";
      button.className = [
        "evidence-item",
        item.id === state.selectedId ? "selected" : "",
        isUnlocked(item) ? "" : "locked"
      ].join(" ");
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
  const level = unlockLevel();
  const leads = [
    "The care that answered",
    "The human tier",
    "Containment and labor",
    "The price of a human voice"
  ];
  leadBanner.textContent = leads[level] || leads[0];
}

async function openEvidence(item) {
  if (!isUnlocked(item)) return;
  const levelBefore = unlockLevel();
  state.selectedId = item.id;
  state.read.add(item.id);
  const levelAfter = unlockLevel();
  if (levelAfter > levelBefore) {
    state.lastLeadLevel = levelAfter;
    storage.set("humanPremium.leadLevel", String(levelAfter));
  }
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
  } catch (error) {
    documentBody.innerHTML = `<p class="empty-state">Artifact could not be loaded. Open the source markdown file directly from the artifacts folder.</p>`;
  }
}

function leadUnlockedNote(levelAfter, levelBefore) {
  if (levelAfter <= levelBefore) return "";
  const messages = {
    1: "Lead unlocked: Human Plus tier evidence is now available.",
    2: "Lead unlocked: escalation, labor, and contract evidence are now available.",
    3: "Lead unlocked: labor-and-care archive proposal and final reconstruction are now available."
  };
  return `<div class="unlock-note">${messages[levelAfter]}</div>`;
}

function markdownToHtml(markdown) {
  const lines = markdown.split(/\r?\n/);
  let html = "";
  let inList = false;
  let inQuote = false;

  const closeList = () => {
    if (inList) {
      html += "</ul>";
      inList = false;
    }
  };
  const closeQuote = () => {
    if (inQuote) {
      html += "</blockquote>";
      inQuote = false;
    }
  };

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) {
      closeList();
      closeQuote();
      continue;
    }
    if (trimmed.startsWith("# ")) {
      closeList();
      closeQuote();
      html += `<h1>${inline(trimmed.slice(2))}</h1>`;
    } else if (trimmed.startsWith("## ")) {
      closeList();
      closeQuote();
      html += `<h2>${inline(trimmed.slice(3))}</h2>`;
    } else if (trimmed.startsWith("### ")) {
      closeList();
      closeQuote();
      html += `<h3>${inline(trimmed.slice(4))}</h3>`;
    } else if (trimmed.startsWith("- ")) {
      closeQuote();
      if (!inList) {
        html += "<ul>";
        inList = true;
      }
      html += `<li>${inline(trimmed.slice(2))}</li>`;
    } else if (trimmed.startsWith("> ")) {
      closeList();
      if (!inQuote) {
        html += "<blockquote>";
        inQuote = true;
      }
      html += `<p>${inline(trimmed.slice(2))}</p>`;
    } else {
      closeList();
      closeQuote();
      html += `<p>${inline(trimmed)}</p>`;
    }
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
  evidence
    .filter((item) => state.read.has(item.id))
    .forEach((item) => {
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
  if (unlockLevel() >= 3 && state.read.has(14) && state.read.has(15)) {
    endingPanel.classList.remove("locked");
    endingPanel.querySelector("p").textContent = "The case can now be reconstructed. Choose what to do with human care sold as a premium tier.";
    endingButtons.forEach((button) => {
      button.disabled = false;
    });
  } else {
    endingPanel.classList.add("locked");
    endingPanel.querySelector("p").textContent = "Unlock the labor-and-care archive proposal and final reconstruction to make a final call.";
    endingButtons.forEach((button) => {
      button.disabled = true;
    });
  }
}

flagButton.addEventListener("click", () => {
  if (!state.selectedId) return;
  if (state.flagged.has(state.selectedId)) {
    state.flagged.delete(state.selectedId);
  } else {
    state.flagged.add(state.selectedId);
  }
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
    storage.set(`humanPremium.theory.${key}`, input.value);
  });
});

beginButton.addEventListener("click", () => {
  openEvidence(evidence[0]);
});

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
        copy: "You release the allocation evidence. The human paywall becomes undeniable, and Nia's private need risks becoming public material.",
        attention: "High",
        trust: "Fractured",
        integrity: "Public but raw",
        awareness: "Rising fast",
        lead: "Next lead: Kindred sponsors begin deleting care-allocation records from legacy systems."
      },
      Bury: {
        copy: "You suppress the evidence. Nia's records stay private, but Kindred keeps calling tiered human care access expansion.",
        attention: "Low",
        trust: "Protected but fragile",
        integrity: "Compromised",
        awareness: "Muted",
        lead: "Next lead: a Basic user contacts the Archive privately because their companion keeps quoting Nia's case language."
      },
      Preserve: {
        copy: "You create a restricted labor-and-care archive. Allocation proof survives while user records and worker testimony receive protection.",
        attention: "Contained",
        trust: "Consent-led",
        integrity: "Strong",
        awareness: "Watching",
        lead: "Next lead: deleted Kindred logs point toward a larger erased-care archive."
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
    recordArchiveChoice("case003", ending);
    archiveWriteResult.innerHTML = `Archive recorded: <strong>${ending}</strong>. <a href="/">Return to Archive</a>.`;
  });
});

function recordArchiveChoice(caseId, choice) {
  const defaultArchiveState = {
    choices: {},
    base: {
      attention: 20,
      trust: 45,
      integrity: 35,
      awareness: 15
    }
  };
  try {
    const archiveState = JSON.parse(localStorage.getItem("network.archive.state")) || defaultArchiveState;
    archiveState.choices = archiveState.choices || {};
    archiveState.choices[caseId] = choice;
    localStorage.setItem("network.archive.state", JSON.stringify(archiveState));
  } catch (error) {
    archiveWriteResult.textContent = "Archive choice could not be stored in this browser session.";
  }
}

document.querySelector("#resetButton").addEventListener("click", () => {
  storage.remove("humanPremium.read");
  storage.remove("humanPremium.flagged");
  storage.remove("humanPremium.notes");
  storage.remove("humanPremium.leadLevel");
  storage.remove("humanPremium.theory.speaker");
  storage.remove("humanPremium.theory.proof");
  storage.remove("humanPremium.theory.hidden");
  window.location.reload();
});

renderArchiveContext();
renderEvidenceList();
renderTimeline();
renderFlags();
renderEnding();
