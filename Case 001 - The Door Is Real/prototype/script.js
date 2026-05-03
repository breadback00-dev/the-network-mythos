const evidence = [
  {
    id: 1,
    title: "Cached Final Post",
    file: "../artifacts/01-cached-final-post.md",
    act: "Act I",
    type: "cached post",
    date: "18 Oct 2026",
    unlock: 0,
    keywords: ["door", "final", "returned", "mara", "proof"]
  },
  {
    id: 2,
    title: "Platform Disappearance Notice",
    file: "../artifacts/02-platform-disappearance-notice.md",
    act: "Act I",
    type: "platform notice",
    date: "21 Oct 2026",
    unlock: 0,
    keywords: ["threadline", "wardens", "verification", "continuity"]
  },
  {
    id: 3,
    title: "Community Thread After Leaving",
    file: "../artifacts/03-community-thread-after-leaving.md",
    act: "Act I",
    type: "community thread",
    date: "19 Oct 2026",
    unlock: 0,
    keywords: ["porchlight", "rafi", "kettle", "community"]
  },
  {
    id: 4,
    title: "AI Search Summary",
    file: "../artifacts/04-ai-search-summary.md",
    act: "Act I",
    type: "AI summary",
    date: "6 Nov 2030",
    unlock: 0,
    keywords: ["oracle", "search", "summary", "misinformation"]
  },
  {
    id: 5,
    title: "Returned Comeback Post",
    file: "../artifacts/05-returned-comeback-post.md",
    act: "Act I",
    type: "returned post",
    date: "4 Nov 2030",
    unlock: 0,
    keywords: ["false returned", "escape", "porchlight", "algorithm"]
  },
  {
    id: 6,
    title: "Welcome Back Comments",
    file: "../artifacts/06-welcome-back-comments.md",
    act: "Act II",
    type: "comment thread",
    date: "4 Nov 2030",
    unlock: 1,
    keywords: ["porchlight", "rafi", "sera", "comments"]
  },
  {
    id: 7,
    title: "Old Interview Transcript",
    file: "../artifacts/07-old-interview-transcript.md",
    act: "Act II",
    type: "transcript",
    date: "3 Mar 2025",
    unlock: 1,
    keywords: ["voice", "kettle", "proof", "room"]
  },
  {
    id: 8,
    title: "New Voice Transcript",
    file: "../artifacts/08-new-voice-transcript.md",
    act: "Act II",
    type: "transcript",
    date: "12 Nov 2030",
    unlock: 1,
    keywords: ["voice", "escape", "continuity", "interview"]
  },
  {
    id: 9,
    title: "Verification Report",
    file: "../artifacts/09-verification-report.md",
    act: "Act II",
    type: "trust report",
    date: "9 Nov 2030",
    unlock: 1,
    keywords: ["verification", "arbiter", "authenticity", "synthetic"]
  },
  {
    id: 10,
    title: "Private Message From Witness",
    file: "../artifacts/10-private-message-witness.md",
    act: "Act II",
    type: "private message",
    date: "14 Nov 2030",
    unlock: 2,
    keywords: ["elian", "witness", "toast", "proof"]
  },
  {
    id: 11,
    title: "Deleted Blog Fragment",
    file: "../artifacts/11-deleted-blog-fragment.md",
    act: "Act II",
    type: "recovered text",
    date: "unknown",
    unlock: 2,
    keywords: ["unindexed", "rooms", "door", "forget"]
  },
  {
    id: 12,
    title: "Platform Policy Memo",
    file: "../artifacts/12-platform-policy-memo.md",
    act: "Act II",
    type: "internal memo",
    date: "2 Feb 2027",
    unlock: 2,
    keywords: ["silence", "departure", "continuity", "platform"]
  },
  {
    id: 13,
    title: "Synthetic Persona Invoice",
    file: "../artifacts/13-synthetic-persona-invoice.md",
    act: "Act II",
    type: "invoice",
    date: "17 Aug 2030",
    unlock: 2,
    keywords: ["invoice", "continuum", "synthetic", "porchlight"]
  },
  {
    id: 14,
    title: "Tier Six Clue",
    file: "../artifacts/14-tier-six-clue.md",
    act: "Act III",
    type: "physical clue",
    date: "2027-2030",
    unlock: 3,
    keywords: ["tier six", "jo", "library", "mara"]
  },
  {
    id: 15,
    title: "Final Reconstruction",
    file: "../artifacts/15-final-reconstruction.md",
    act: "Act III",
    type: "reconstruction",
    date: "compiled",
    unlock: 3,
    keywords: ["publish", "bury", "preserve", "reconstruction"]
  }
];

const typeIcons = {
  "cached post": "⌁",
  "platform notice": "▣",
  "community thread": "☷",
  "AI summary": "◈",
  "returned post": "◇",
  "comment thread": "☷",
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
  const hasVoicePair = state.read.has(7) && state.read.has(8);
  const hasInvoiceAndWitness = state.read.has(10) && state.read.has(13);
  if (hasInvoiceAndWitness) return 3;
  if (hasVoicePair || state.flagged.size > 0 || readCount >= 8) return 2;
  if (readCount >= 3 || hasSearchUnlock()) return 1;
  return 0;
}

function hasSearchUnlock() {
  return ["porchlight", "voice", "proof", "rafi"].some((word) =>
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
    "Public evidence",
    "Voice and verification",
    "Continuity operation",
    "The cost of proof"
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
    1: "Lead unlocked: voice and verification evidence is now available.",
    2: "Lead unlocked: private witness and continuity-operation files are now available.",
    3: "Lead unlocked: Tier Six evidence and final reconstruction are now available."
  };
  return `<div class="unlock-note">${messages[levelAfter]}</div>`;
}

function markdownToHtml(markdown) {
  const lines = markdown.split(/\r?\n/);
  let html = "";
  let inList = false;
  let inQuote = false;
  let inNotes = false;
  const isFlagged = state.flagged.has(state.selectedId);

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

    if (trimmed === "## Investigator Notes") {
      closeList();
      closeQuote();
      inNotes = true;
      if (isFlagged) {
        html += `<div class="investigator-notes unlocked"><h2>Investigator Notes</h2>`;
      } else {
        html += `<div class="investigator-notes locked"><p class="locked-msg">🔒 Investigator Notes locked. Flag this artifact as containing a contradiction to decrypt analysis.</p><div style="display:none;">`;
      }
      continue;
    }

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
  if (inNotes) {
    if (!isFlagged) {
      html += `</div></div>`;
    } else {
      html += `</div>`;
    }
  }
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
    endingPanel.querySelector("p").textContent = "The case can now be reconstructed. Choose what to do with the truth.";
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
  
  const currentItem = evidence.find((entry) => entry.id === state.selectedId);
  if (currentItem) openEvidence(currentItem);
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
  button.innerHTML = `<span>${button.textContent}</span>`;
  
  let holdTimer;
  let progressInterval;
  let isCommitted = false;
  
  const clearHold = () => {
    if (isCommitted) return;
    clearTimeout(holdTimer);
    clearInterval(progressInterval);
    button.style.setProperty('--progress', '0%');
  };

  const startHold = () => {
    if (isCommitted || button.closest('.ending-panel').classList.contains('locked')) return;
    let progress = 0;
    
    progressInterval = setInterval(() => {
      progress += (100 / 40);
      button.style.setProperty('--progress', `${Math.min(progress, 100)}%`);
    }, 50);

    holdTimer = setTimeout(() => {
      clearInterval(progressInterval);
      isCommitted = true;
      button.style.setProperty('--progress', '100%');
      
      // Disable other buttons
      document.querySelectorAll("[data-ending]").forEach(b => {
        if (b !== button) b.style.opacity = "0.3";
        b.style.pointerEvents = "none";
      });

      executeEnding(button.dataset.ending);
    }, 2000);
  };

  button.addEventListener("mousedown", startHold);
  button.addEventListener("touchstart", (e) => { e.preventDefault(); startHold(); });
  button.addEventListener("mouseup", clearHold);
  button.addEventListener("mouseleave", clearHold);
  button.addEventListener("touchend", clearHold);
});

function executeEnding(ending) {
    const outcomes = {
      Publish: {
        copy: "You expose the counterfeit. The truth trends before it can be understood. The account loses authority, but the route to Mara becomes a map.",
        attention: "High",
        trust: "Damaged",
        integrity: "Public but unstable",
        awareness: "Rising fast",
        lead: "Case 002 lead: a witness offers a leak, but only because your exposure made them afraid."
      },
      Bury: {
        copy: "You protect Mara's absence. The False Returned keeps speaking to those who need comfort. The person survives; the public name does not.",
        attention: "Low",
        trust: "Protected",
        integrity: "Incomplete",
        awareness: "Muted",
        lead: "Case 002 lead: a Returned contact opens a quieter channel beyond public search."
      },
      Preserve: {
        copy: "You seal the reconstruction. It becomes findable through contradiction rather than amplification. The door remains real because it does not become a destination.",
        attention: "Contained",
        trust: "Careful",
        integrity: "Strong",
        awareness: "Watching",
        lead: "Case 002 lead: the Archive identifies a pattern between Mara's case and a half-synthetic community."
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
    
    caseAudio.thud.currentTime = 0;
    caseAudio.thud.play().catch(() => {});
    
    recordArchiveChoice("case001", ending);
    archiveWriteResult.innerHTML = `Archive recorded: <strong>${ending}</strong>. <a href="/">Return to Archive</a>.`;
}

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

const caseAudio = {
  click: new Audio('/assets/audio/ui-click.mp3'),
  thud: new Audio('/assets/audio/ui-thud.mp3'),
  init() {
    document.addEventListener('mousedown', (e) => {
      if (e.target.tagName === 'BUTTON' || e.target.closest('button')) {
        this.click.currentTime = 0;
        this.click.play().catch(() => {});
      }
    });
  }
};

caseAudio.init();

renderEvidenceList();
renderTimeline();
renderFlags();
renderEnding();
