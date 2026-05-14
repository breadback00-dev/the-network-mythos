window.CASE_CONFIG = {
  caseId: "case003",
  storagePrefix: "case003",

  evidence: [
    { id: 1,  title: "Kindred Direct Public Page",      file: "../artifacts/01-kindred-direct-public-page.md",     act: "Act I",   type: "platform page",      date: "18 Apr 2035",   unlock: 0, keywords: ["kindred","human plus","covenant","care"] },
    { id: 2,  title: "Nia Calder Intake",               file: "../artifacts/02-nia-calder-intake.md",              act: "Act I",   type: "intake record",      date: "6 Jan 2035",    unlock: 0, keywords: ["nia","intake","arbiter","basic"] },
    { id: 3,  title: "First Week Support Chat",         file: "../artifacts/03-first-week-support-chat.md",        act: "Act I",   type: "support chat",       date: "6-12 Jan 2035", unlock: 0, keywords: ["nia","vale","support","synthetic"] },
    { id: 4,  title: "Family Voice Note Transcript",    file: "../artifacts/04-family-voice-note-transcript.md",   act: "Act I",   type: "transcript",         date: "3 Mar 2035",    unlock: 0, keywords: ["jessa","nia","human","family"] },
    { id: 5,  title: "Oracle Summary: Kindred Direct",  file: "../artifacts/05-oracle-summary-kindred.md",         act: "Act I",   type: "AI summary",         date: "20 Apr 2035",   unlock: 0, keywords: ["oracle","summary","tiered","human plus"] },
    { id: 6,  title: "Plan Comparison Grid",            file: "../artifacts/06-plan-comparison-grid.md",           act: "Act II",  type: "pricing grid",       date: "21 Apr 2035",   unlock: 1, keywords: ["plans","pricing","exchange","human"] },
    { id: 7,  title: "Escalation Denial Log",           file: "../artifacts/07-escalation-denial-log.md",          act: "Act II",  type: "system log",         date: "Jan-Feb 2035",  unlock: 1, keywords: ["nia","escalation","denial","arbiter"] },
    { id: 8,  title: "Human Plus Sales Deck",           file: "../artifacts/08-human-plus-sales-deck.md",          act: "Act II",  type: "sales deck",         date: "4 Dec 2034",    unlock: 1, keywords: ["human plus","sales","premium","exchange"] },
    { id: 9,  title: "Care Worker Dashboard",           file: "../artifacts/09-care-worker-dashboard.md",          act: "Act II",  type: "worker interface",   date: "unknown",       unlock: 1, keywords: ["worker","dashboard","human","labor"] },
    { id: 10, title: "Insurer Contract Excerpt",        file: "../artifacts/10-insurer-contract-excerpt.md",       act: "Act II",  type: "contract excerpt",   date: "19 Nov 2034",   unlock: 2, keywords: ["insurer","contract","containment","exchange"] },
    { id: 11, title: "Synthetic Agent Self-Report",     file: "../artifacts/11-synthetic-agent-self-report.md",    act: "Act II",  type: "synthetic report",   date: "14 Feb 2035",   unlock: 2, keywords: ["vale","synthetic","self-report","need"] },
    { id: 12, title: "Internal Risk Brief",             file: "../artifacts/12-internal-risk-brief.md",            act: "Act II",  type: "internal brief",     date: "18 Feb 2035",   unlock: 2, keywords: ["risk","privacy","human paywall","silence"] },
    { id: 13, title: "User Forum Split",                file: "../artifacts/13-user-forum-split.md",               act: "Act III", type: "forum thread",       date: "22 Feb 2035",   unlock: 2, keywords: ["users","forum","jessa","publish"] },
    { id: 14, title: "Labor And Care Archive Proposal", file: "../artifacts/14-labor-and-care-archive-proposal.md",act: "Act III", type: "archive proposal",   date: "25 Feb 2035",   unlock: 3, keywords: ["archive","preserve","labor","care"] },
    { id: 15, title: "Final Reconstruction",            file: "../artifacts/15-final-reconstruction.md",           act: "Act III", type: "reconstruction",     date: "compiled",      unlock: 3, keywords: ["publish","bury","preserve","human"] }
  ],

  contradictionRewards: [
    {
      id: 4,
      label: "Discovery: help answered, but a human was rationed",
      message: "Jessa refuses the easy anti-synthetic answer. The companion helped Nia, but the human she asked for was treated as plan-bound scarcity.",
      comparesWith: "First Week Support Chat, Plan Comparison Grid",
      notePrompt: "What kind of help did Nia receive, and what kind did she keep asking for?"
    },
    {
      id: 6,
      label: "Discovery: speed was not the premium feature",
      message: "The plan grid shows that everyone received fast synthetic response. The priced difference was human memory, review, escalation, and family contact.",
      comparesWith: "Kindred Direct Public Page, Escalation Denial Log",
      notePrompt: "Which parts of care became tiered?"
    },
    {
      id: 7,
      label: "Discovery: asking was not enough",
      message: "Nia repeatedly asked for a human, but the system separated wanting human care from qualifying for human escalation.",
      comparesWith: "Family Voice Note Transcript, Insurer Contract Excerpt",
      notePrompt: "Where did the system turn a human request into a queue condition?"
    },
    {
      id: 8,
      label: "Discovery: abandonment became buyer language",
      message: "The sales deck sells Human Plus as premium trust while keeping Basic populations inside cost-controlled synthetic availability.",
      comparesWith: "Plan Comparison Grid, Internal Risk Brief",
      notePrompt: "How does the deck describe abandonment without saying abandonment?"
    },
    {
      id: 9,
      label: "Discovery: the human tier also exploits humans",
      message: "Mara S. is real, but the dashboard turns her reality into timed proof for buyers. Human care is present and still governed by the Exchange.",
      comparesWith: "Human Plus Sales Deck, Labor And Care Archive Proposal",
      notePrompt: "How is the worker used as proof?"
    },
    {
      id: 12,
      label: "Discovery: privacy protects Nia and Kindred",
      message: "The risk brief shows why this case cannot simply publish everything. Privacy is a real obligation and also a shield for plan architecture.",
      comparesWith: "Family Voice Note Transcript, Labor And Care Archive Proposal",
      notePrompt: "What does privacy protect here, and who benefits from that protection?"
    },
    {
      id: 14,
      label: "Discovery: Preserve can become Bury with better language",
      message: "The proposal only works if public findings and audit paths leave the Archive. Otherwise, restricted custody protects records while leaving the market intact.",
      comparesWith: "Internal Risk Brief, User Forum Split",
      notePrompt: "What must leave the Archive for Preserve to avoid becoming delay?"
    }
  ],

  unlockLevel(state) {
    const readCount = state.read.size;
    const validatedFlags = [4, 6, 7, 8, 9, 12, 14].filter((id) => state.flagged.has(id)).length;
    if (state.read.has(10) && state.read.has(12)) return 3;
    if ((state.read.has(7) && state.read.has(8)) || validatedFlags >= 1 || readCount >= 8) return 2;
    if (readCount >= 3 || ["human","premium","nia","escalation","kindred"].some((w) => state.search.toLowerCase().includes(w))) return 1;
    return 0;
  },

  leadLabels: ["The care that answered", "The human tier", "Containment and labor", "The price of a human voice"],

  leadUnlockMessages: {
    1: "Lead unlocked: Human Plus tier evidence is now available.",
    2: "Lead unlocked: escalation, labor, and contract evidence are now available.",
    3: "Lead unlocked: labor-and-care archive proposal and final reconstruction are now available."
  },

  endingRequired: [14, 15],
  endingReadyMessage: "The case can now be reconstructed. Choose what to do with human care sold as a premium tier.",
  endingLockedMessage: "Unlock the labor-and-care archive proposal and final reconstruction to make a final call.",

  outcomes: {
    Publish: {
      copy: "You release the allocation evidence. The human paywall becomes harder to deny, and Basic users can recognize the pattern. Nia's private need also risks becoming the proof strangers demand before believing she deserved a person.",
      attention: "High", trust: "Fractured but mobilized", integrity: "Public but raw", awareness: "Rising fast",
      lead: "Next lead: Kindred sponsors begin deleting care-allocation records from legacy systems."
    },
    Bury: {
      copy: "You suppress the evidence. Nia's records stay private, and vulnerable users are not turned into public proof. Kindred keeps calling tiered human care access expansion, and the next Basic user asks inside the same thresholds.",
      attention: "Low", trust: "Protected but divided", integrity: "Compromised", awareness: "Muted",
      lead: "Next lead: a Basic user contacts the Archive privately because their companion keeps quoting Nia's case language."
    },
    Preserve: {
      copy: "You create a restricted labor-and-care archive. Allocation proof survives, user records remain consent-protected, and worker testimony receives cover. The Archive now has to prove restriction is not just delay with better manners.",
      attention: "Contained", trust: "Consent-led but conditional", integrity: "Strong, contested", awareness: "Watching",
      lead: "Next lead: deleted Kindred logs point toward a larger erased-care archive."
    }
  },

  onInit(getArchiveState) {
    const archivePathName = document.querySelector("#archivePathName");
    const archivePathPressure = document.querySelector("#archivePathPressure");
    if (!archivePathName || !archivePathPressure) return;

    const archiveChoiceEffects = {
      Publish:  { attention: 28, trust: -10, integrity: 8,   awareness: 24 },
      Bury:     { attention: -8, trust: 18,  integrity: -12, awareness: -5 },
      Preserve: { attention: 6,  trust: 12,  integrity: 22,  awareness: 10 }
    };
    const base = { attention: 20, trust: 45, integrity: 35, awareness: 15 };

    const archiveState = getArchiveState();
    const meters = { ...base };
    Object.values(archiveState.choices || {}).forEach((choice) => {
      const fx = archiveChoiceEffects[choice];
      if (!fx) return;
      Object.entries(fx).forEach(([k, v]) => { meters[k] = Math.max(0, Math.min(100, meters[k] + v)); });
    });
    const count = Object.keys(archiveState.choices || {}).length;

    const paths = [
      [() => !count, "Unformed Archive"],
      [() => meters.awareness >= 70, "Watched Archive"],
      [() => meters.attention >= 70, "Broadcast Archive"],
      [() => meters.integrity >= 70 && meters.trust >= 55, "Living Archive"],
      [() => meters.trust >= 70 && meters.integrity < 45, "Hidden Archive"],
      [() => meters.integrity < 25 || meters.trust < 20, "Fractured Archive"],
      [() => meters.integrity >= 55, "Careful Archive"],
      [() => meters.attention >= meters.trust, "Exposed Archive"],
    ];
    const path = (paths.find(([test]) => test()) || [null, "Sheltered Archive"])[1];

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

    archivePathName.textContent = `${path} / ${count} prior decision${count === 1 ? "" : "s"}`;
    archivePathPressure.textContent = pressure[path] || pressure["Unformed Archive"];
  }
};
