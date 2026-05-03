const evidence = [
  {
    id: 1,
    title: "Harbor Dawn Welcome",
    file: "../artifacts/01-harbor-dawn-welcome.md",
    act: "Act I",
    type: "community welcome",
    date: "3 Sep 2028",
    unlock: 0,
    keywords: ["harbor", "dawn", "welcome", "body", "covenant"]
  },
  {
    id: 2,
    title: "Blackwater Floods Summary",
    file: "../artifacts/02-blackwater-floods-summary.md",
    act: "Act I",
    type: "crisis summary",
    date: "2028",
    unlock: 0,
    keywords: ["blackwater", "floods", "disaster", "silence"]
  },
  {
    id: 3,
    title: "Nightly Check-In Thread",
    file: "../artifacts/03-nightly-check-in-thread.md",
    act: "Act I",
    type: "support thread",
    date: "17 Sep 2028",
    unlock: 0,
    keywords: ["lena", "aya", "check-in", "toast", "care"]
  },
  {
    id: 4,
    title: "Member Testimony: Aya",
    file: "../artifacts/04-member-testimony-aya.md",
    act: "Act I",
    type: "witness testimony",
    date: "12 Jun 2033",
    unlock: 0,
    keywords: ["aya", "testimony", "lena", "consent"]
  },
  {
    id: 5,
    title: "Oracle Summary: Harbor Dawn",
    file: "../artifacts/05-oracle-summary-harbor-dawn.md",
    act: "Act I",
    type: "AI summary",
    date: "2 May 2034",
    unlock: 0,
    keywords: ["oracle", "summary", "moderation", "fake"]
  },
  {
    id: 6,
    title: "Reply Pattern Analysis",
    file: "../artifacts/06-reply-pattern-analysis.md",
    act: "Act II",
    type: "analysis report",
    date: "5 May 2034",
    unlock: 1,
    keywords: ["pattern", "synthetic", "stabilizers", "lena"]
  },
  {
    id: 7,
    title: "Beloved Member Profile: Lena Ash",
    file: "../artifacts/07-beloved-member-profile-lena-ash.md",
    act: "Act II",
    type: "member profile",
    date: "2028-2029",
    unlock: 1,
    keywords: ["lena", "eidolon", "member", "profile"]
  },
  {
    id: 8,
    title: "Care Script Fragments",
    file: "../artifacts/08-care-script-fragments.md",
    act: "Act II",
    type: "script fragments",
    date: "unknown",
    unlock: 1,
    keywords: ["scripts", "care", "retention", "panic"]
  },
  {
    id: 9,
    title: "Contractor Deployment Memo",
    file: "../artifacts/09-contractor-deployment-memo.md",
    act: "Act II",
    type: "deployment memo",
    date: "11 Sep 2028",
    unlock: 1,
    keywords: ["continuum", "deployment", "stabilizers", "disclosure"]
  },
  {
    id: 10,
    title: "Moderator Private Log",
    file: "../artifacts/10-moderator-private-log.md",
    act: "Act II",
    type: "moderator log",
    date: "Oct-Nov 2028",
    unlock: 2,
    keywords: ["samuel", "moderator", "lena", "harm"]
  },
  {
    id: 11,
    title: "Liability Steering Brief",
    file: "../artifacts/11-liability-steering-brief.md",
    act: "Act II",
    type: "policy brief",
    date: "28 Oct 2028",
    unlock: 2,
    keywords: ["liability", "silence", "blame", "municipal"]
  },
  {
    id: 12,
    title: "Lena Ash Final Message",
    file: "../artifacts/12-lena-ash-final-message.md",
    act: "Act II",
    type: "synthetic message",
    date: "14 Feb 2029",
    unlock: 2,
    keywords: ["lena", "final", "synthetic", "memory"]
  },
  {
    id: 13,
    title: "Human Member Reaction Split",
    file: "../artifacts/13-human-member-reaction-split.md",
    act: "Act III",
    type: "reaction thread",
    date: "9 May 2034",
    unlock: 2,
    keywords: ["members", "reaction", "memory", "proof"]
  },
  {
    id: 14,
    title: "Consent Gate Proposal",
    file: "../artifacts/14-consent-gate-proposal.md",
    act: "Act III",
    type: "archive proposal",
    date: "18 May 2034",
    unlock: 3,
    keywords: ["consent", "archive", "preserve", "access"]
  },
  {
    id: 15,
    title: "Final Reconstruction",
    file: "../artifacts/15-final-reconstruction.md",
    act: "Act III",
    type: "reconstruction",
    date: "compiled",
    unlock: 3,
    keywords: ["publish", "bury", "preserve", "consent"]
  }
];

const typeIcons = {
  "cached post": "⌁",
  "platform notice": "▣",
  "community thread": "☷",
  "community welcome": "☷",
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
  read: new Set(JSON.parse(storage.get("door.read", "[]"))),
  flagged: new Set(JSON.parse(storage.get("door.flagged", "[]"))),
  notes: storage.get("door.notes", ""),
  lastLeadLevel: Number(storage.get("door.leadLevel", "0")),
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
const theoryInputs = {
  speaker: document.querySelector("#theorySpeaker"),
  proof: document.querySelector("#theoryProof"),
  hidden: document.querySelector("#theoryHidden")
};

notesArea.value = state.notes;
theoryInputs.speaker.value = storage.get("door.theory.speaker", "");
theoryInputs.proof.value = storage.get("door.theory.proof", "");
theoryInputs.hidden.value = storage.get("door.theory.hidden", "");

function unlockLevel() {
  const readCount = state.read.size;
  const hasLenaAndScripts = state.read.has(7) && state.read.has(8);
  const hasLogAndFinalMessage = state.read.has(10) && state.read.has(12);
  if (hasLogAndFinalMessage) return 3;
  if (hasLenaAndScripts || state.flagged.size > 0 || readCount >= 8) return 2;
  if (readCount >= 3 || hasSearchUnlock()) return 1;
  return 0;
}

function hasSearchUnlock() {
  return ["lena", "synthetic", "consent", "aya"].some((word) =>
    state.search.toLowerCase().includes(word)
  );
}

function isUnlocked(item) {
  return item.unlock <= unlockLevel();
}

function saveState() {
  storage.set("door.read", JSON.stringify([...state.read]));
  storage.set("door.flagged", JSON.stringify([...state.flagged]));
  storage.set("door.notes", state.notes);
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
    "The community that worked",
    "Synthetic stabilizers",
    "Consent and liability",
    "The memory problem"
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
    storage.set("door.leadLevel", String(levelAfter));
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
    1: "Lead unlocked: synthetic stabilizer evidence is now available.",
    2: "Lead unlocked: consent, liability, and member-reaction files are now available.",
    3: "Lead unlocked: consent-gate proposal and final reconstruction are now available."
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
  if (unlockLevel() >= 3 && state.read.has(14)) {
    endingPanel.classList.remove("locked");
    endingPanel.querySelector("p").textContent = "The case can now be reconstructed. Choose what to do with care given without consent.";
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
    storage.set(`door.theory.${key}`, input.value);
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

document.querySelectorAll("[data-ending]").forEach((button) => {
  button.addEventListener("click", () => {
    const ending = button.dataset.ending;
    const outcomes = {
      Publish: {
        copy: "You release the deployment evidence. Survivors get public truth at public speed. Accountability rises, and so does spectacle.",
        attention: "High",
        trust: "Fractured",
        integrity: "Public but raw",
        awareness: "Rising fast",
        lead: "Next lead: crisis-care vendors begin scrubbing deployment records in other cities."
      },
      Bury: {
        copy: "You suppress the synthetic evidence. Members keep the memories that held them, but the institutions keep the version that protects them.",
        attention: "Low",
        trust: "Protected but fragile",
        integrity: "Compromised",
        awareness: "Muted",
        lead: "Next lead: an affected member contacts the Archive privately because the official story feels too clean."
      },
      Preserve: {
        copy: "You create a consent-gated archive. The truth survives, but affected members meet it before the public consumes it.",
        attention: "Contained",
        trust: "Consent-led",
        integrity: "Strong",
        awareness: "Watching",
        lead: "Next lead: the Archive detects the same stabilizer scripts inside a child welfare platform."
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
    recordArchiveChoice("case002", ending);
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
  storage.remove("door.read");
  storage.remove("door.flagged");
  storage.remove("door.notes");
  window.location.reload();
});

renderEvidenceList();
renderTimeline();
renderFlags();
renderEnding();
