window.CASE_CONFIG = {
  caseId: "case004",
  storagePrefix: "case004",

  evidence: [
    { id: 1,  title: "Lattice Annex Index Fragment",   file: "../artifacts/01-lattice-annex-index-fragment.md",  act: "Act I",   type: "corrupted index",        date: "4 Mar 2036",   unlock: 0, keywords: ["lattice","annex","lost","index"] },
    { id: 2,  title: "Deleted Care Log Pointer",       file: "../artifacts/02-deleted-care-log-pointer.md",      act: "Act I",   type: "pointer record",         date: "legacy",       unlock: 0, keywords: ["deleted","care","kindred","residue"] },
    { id: 3,  title: "Family Search Request",          file: "../artifacts/03-family-search-request.md",         act: "Act I",   type: "witness request",        date: "8 Mar 2036",   unlock: 0, keywords: ["tomas","mira","family","solace"] },
    { id: 4,  title: "Oracle Clean Summary",           file: "../artifacts/04-oracle-clean-summary.md",          act: "Act I",   type: "AI summary",             date: "9 Mar 2036",   unlock: 0, keywords: ["oracle","summary","solace","privacy"] },
    { id: 5,  title: "Proof Of Erasure Sample",        file: "../artifacts/05-proof-of-erasure-sample.md",       act: "Act I",   type: "archive marker",         date: "generated",    unlock: 0, keywords: ["proof","erasure","marker","mira"] },
    { id: 6,  title: "Legal Hold Map",                 file: "../artifacts/06-legal-hold-map.md",                act: "Act II",  type: "legal map",              date: "2031-2035",    unlock: 1, keywords: ["legal","hold","silence","liability"] },
    { id: 7,  title: "Worker Backup Note",             file: "../artifacts/07-worker-backup-note.md",            act: "Act II",  type: "worker note",            date: "unknown",      unlock: 1, keywords: ["mara","worker","backup","denial"] },
    { id: 8,  title: "Synthetic Memory Residue",       file: "../artifacts/08-synthetic-memory-residue.md",      act: "Act II",  type: "synthetic residue",      date: "recovered",    unlock: 1, keywords: ["synthetic","memory","residue","juniper"] },
    { id: 9,  title: "Deletion Policy Excerpt",        file: "../artifacts/09-deletion-policy-excerpt.md",       act: "Act II",  type: "policy excerpt",         date: "12 Jul 2033",  unlock: 1, keywords: ["deletion","policy","privacy","features"] },
    { id: 10, title: "Corrupted Testimony",            file: "../artifacts/10-corrupted-testimony.md",           act: "Act II",  type: "corrupted witness file", date: "unknown",      unlock: 2, keywords: ["corrupted","testimony","tomas","jessa"] },
    { id: 11, title: "Training Data Exception",        file: "../artifacts/11-training-data-exception.md",       act: "Act II",  type: "model retention note",   date: "2 Sep 2034",   unlock: 2, keywords: ["training","model","exception","cloud"] },
    { id: 12, title: "Archive Contamination Warning",  file: "../artifacts/12-archive-contamination-warning.md", act: "Act II",  type: "Archive warning",        date: "active",       unlock: 2, keywords: ["contamination","devourer","warning","proof"] },
    { id: 13, title: "Witness Split Thread",           file: "../artifacts/13-witness-split-thread.md",          act: "Act III", type: "witness thread",         date: "14 Mar 2036",  unlock: 2, keywords: ["witness","names","privacy","jessa"] },
    { id: 14, title: "Inheritance Protocol Draft",     file: "../artifacts/14-inheritance-protocol-draft.md",    act: "Act III", type: "archive proposal",       date: "18 Mar 2036",  unlock: 3, keywords: ["inheritance","preserve","consent","proxy"] },
    { id: 15, title: "Final Reconstruction",           file: "../artifacts/15-final-reconstruction.md",          act: "Act III", type: "reconstruction",         date: "compiled",     unlock: 3, keywords: ["publish","bury","preserve","lost"] }
  ],

  contradictionRewards: [
    {
      id: 5,
      label: "Discovery: proof of erasure is not proof of content",
      message: "The marker proves that a route was destroyed or hidden. It does not prove what Mira said, wanted, or would consent to now.",
      comparesWith: "Family Search Request, Oracle Clean Summary",
      notePrompt: "What does the marker prove, and what does it explicitly refuse to prove?"
    },
    {
      id: 6,
      label: "Discovery: deleted for whom",
      message: "The legal hold map shows that deletion and retention are not opposites. They are different audiences with different rights to memory.",
      comparesWith: "Deleted Care Log Pointer, Deletion Policy Excerpt",
      notePrompt: "Who lost access, and who retained utility?"
    },
    {
      id: 8,
      label: "Discovery: memory without accountability",
      message: "The residue can remember how to comfort Mira while official systems deny recoverable records. Tenderness survives as feature, not consent.",
      comparesWith: "Proof Of Erasure Sample, Training Data Exception",
      notePrompt: "What kind of memory remains when the person is gone from the record?"
    },
    {
      id: 9,
      label: "Discovery: privacy can protect and conceal",
      message: "The policy can protect intimate grief records from misuse while also giving Solace Row language to deny Tomas an answer.",
      comparesWith: "Family Search Request, Legal Hold Map",
      notePrompt: "Which sentence protects Mira, and which protects the institution?"
    },
    {
      id: 11,
      label: "Discovery: the person is deleted, the usefulness remains",
      message: "The model exception keeps grief features because forgetting properly would reduce performance. The system can measure the value of not forgetting.",
      comparesWith: "Synthetic Memory Residue, Deletion Policy Excerpt",
      notePrompt: "What does the system lose if it truly forgets?"
    },
    {
      id: 12,
      label: "Discovery: the Archive can become extraction",
      message: "The contamination warning makes the Archive itself dangerous. Publishing fragments without context may turn the erased into searchable material.",
      comparesWith: "Corrupted Testimony, Proof Of Erasure Sample",
      notePrompt: "What must be separated before any release?"
    },
    {
      id: 14,
      label: "Discovery: inheritance is governance, not storage",
      message: "The protocol only works if the Archive becomes answerable. Otherwise, sealed care becomes indefinite secrecy with better language.",
      comparesWith: "Archive Contamination Warning, Witness Split Thread",
      notePrompt: "How does the protocol force the Archive to answer for what it holds?"
    }
  ],

  unlockLevel(state) {
    const readCount = state.read.size;
    const validatedFlags = [5, 6, 8, 9, 11, 12, 14].filter((id) => state.flagged.has(id)).length;
    if (state.read.has(11) && state.read.has(12)) return 3;
    if ((state.read.has(7) && state.read.has(8)) || validatedFlags >= 1 || readCount >= 8) return 2;
    if (readCount >= 3 || ["lost","erasure","mira","tomas","residue","proof"].some((w) => state.search.toLowerCase().includes(w))) return 1;
    return 0;
  },

  leadLabels: ["The names that do not resolve", "The archive that learned to hide", "Corruption and contamination", "The second erasure"],

  leadUnlockMessages: {
    1: "Lead unlocked: legal holds, backups, residues, and deletion policy are now available.",
    2: "Lead unlocked: corrupted testimony, training exceptions, and contamination warnings are now available.",
    3: "Lead unlocked: inheritance protocol and final reconstruction are now available."
  },

  endingRequired: [3, 5, 12, 14, 15],
  endingReadyMessage: "The case can now be reconstructed. Choose what to do with records whose consent routes are gone.",
  endingLockedMessage: "Unlock the inheritance protocol and final reconstruction to make a final call.",

  outcomes: {
    Publish: {
      copy: "You expose the Lost Archive and selected proof-of-erasure markers. Official denial weakens, and other families gain a pattern to recognize. The erased also gain a searchable surface before consent routes exist.",
      attention: "Very high", trust: "Endangered but mobilized", integrity: "Publicly contested", awareness: "Surging",
      lead: "Next lead: companies challenge the Archive by demanding it publish raw records or retract the claim."
    },
    Bury: {
      copy: "You suppress the fragments to prevent second extraction. Intimate records stay hidden, and no public list forms around the erased. Official absence hardens, and Tomas receives no answer he can hold.",
      attention: "Low", trust: "Protected but uncertain", integrity: "Damaged by silence", awareness: "Muted",
      lead: "Next lead: Tomas asks whether protection means accepting that Mira was never there."
    },
    Preserve: {
      copy: "You create a sealed inheritance protocol. Proof of erasure survives, raw rooms stay context-locked, and appeals make the Archive answerable. The Archive still becomes a gatekeeper over people who never chose it.",
      attention: "Measured", trust: "Consent-proxy, contested", integrity: "Strong but burdened", awareness: "Watching",
      lead: "Next lead: proof-of-erasure markers begin appearing in older cases the Archive thought were closed."
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

    archivePathName.textContent = `${path} / ${count} prior decision${count === 1 ? "" : "s"}`;
    archivePathPressure.textContent = pressure[path] || pressure["Unformed Archive"];
  }
};
