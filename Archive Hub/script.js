const cases = [
  {
    id: "case001",
    title: "Case 001: The Door Is Real",
    url: "/case001/prototype/",
    caseType: "Identity / Exit Case",
    tests: "Whether proof can protect a person without capturing them.",
    lesson: "Proof can become capture.",
    summary: "Determine whether Mara Vale truly returned, then decide what kind of truth can survive visibility.",
    mythos: ["Returned", "False Returned", "Oracle", "Arbiter", "Covenant", "Silence"],
    witnesses: {
      Publish: "Rafi distrusts your speed. Public witnesses multiply.",
      Bury: "Elian remains protected. Public record decays.",
      Preserve: "Mara's absence remains intact. The Archive gains a careful proof."
    },
    witnessProfiles: {
      Publish: {
        name: "Rafi Kline",
        type: "Former Moderator",
        stance: "Distrustful",
        note: "Rafi believes the exposure weakened the counterfeit but moved faster than care.",
        lead: "May provide public thread archives, but withholds private witness material."
      },
      Bury: {
        name: "Elian Vale",
        type: "Protected Witness",
        stance: "Sheltered",
        note: "Elian remains out of public view because the Archive did not expose Mara's route.",
        lead: "May pass future off-record warnings through trusted intermediaries."
      },
      Preserve: {
        name: "Mara Vale",
        type: "Returned Contact",
        stance: "Unreachable / Protected",
        note: "Mara is not contacted, exposed, or proven. Her absence remains intact.",
        lead: "Her preserved contradiction points toward synthetic continuity patterns."
      }
    },
    vault: {
      Publish: "Public reconstruction of the False Returned",
      Bury: "Sealed note on Mara's protected absence",
      Preserve: "Preserved Mara Vale reconstruction"
    },
    vaultProfiles: {
      Publish: {
        title: "Public reconstruction of the False Returned",
        type: "Investigator Reconstruction",
        risk: "High exposure",
        consent: "Contested",
        reliability: "Strong but volatile",
        why: "It weakens the counterfeit but turns Mara's exit into a public object.",
        tags: ["public exposure", "identity-continuity", "network-attention"]
      },
      Bury: {
        title: "Sealed note on Mara's protected absence",
        type: "Protected Witness Note",
        risk: "Low exposure",
        consent: "Protective withholding",
        reliability: "Incomplete",
        why: "It protects Mara but leaves the public falsehood largely intact.",
        tags: ["protected", "incomplete-record", "returned"]
      },
      Preserve: {
        title: "Preserved Mara Vale reconstruction",
        type: "Consent-Sensitive Reconstruction",
        risk: "Contained",
        consent: "Preserved without exposure",
        reliability: "High contextual integrity",
        why: "It keeps the contradiction findable without making Mara's exit a destination.",
        tags: ["preserved evidence", "consent-sensitive", "archive-integrity"]
      }
    },
    consequences: {
      Publish: {
        tags: ["Public backlash", "Network awareness increased", "Witness risk", "False Returned weakened"],
        lead: "A witness offers a leak because exposure made them afraid of being next."
      },
      Bury: {
        tags: ["Survivor protection", "False narrative spread", "Witness trust gained", "Public record weakened"],
        lead: "A Returned contact opens a quieter channel because you showed restraint."
      },
      Preserve: {
        tags: ["Evidence preserved", "Witness trust gained", "Archive integrity increased", "Slow lead unlocked"],
        lead: "The Archive detects a pattern between Mara's case and synthetic community continuity."
      }
    }
  },
  {
    id: "case002",
    title: "Case 002: The Half Synthetic Community",
    url: "/case002/prototype/",
    caseType: "Community / Synthetic Care Case",
    tests: "Whether belonging remains real when its origin was hidden.",
    lesson: "Care can be real while consent is broken.",
    summary: "Investigate Harbor Dawn, a support community whose most stabilizing members were synthetic.",
    mythos: ["Covenant", "Eidolons", "Exchange", "Arbiter", "Silence", "Devourer"],
    witnesses: {
      Publish: "Survivors are forced into public interpretation. Accountability sources surface.",
      Bury: "Affected members keep their memories. Vendors remain protected.",
      Preserve: "Aya and others receive first right of encounter through consent gates."
    },
    witnessProfiles: {
      Publish: {
        name: "Aya Mahmoud",
        type: "Reluctant Survivor",
        stance: "Exposed",
        note: "Aya's testimony gains public force, but she loses control over the speed of interpretation.",
        lead: "Public pressure may surface institutional records, but survivor trust becomes fragile."
      },
      Bury: {
        name: "Continuum Kinship Systems",
        type: "Hostile Institution",
        stance: "Protected",
        note: "The vendor benefits from silence while affected members keep fragile memories intact.",
        lead: "Future evidence may require leaks rather than witness cooperation."
      },
      Preserve: {
        name: "Aya Mahmoud",
        type: "Reluctant Survivor",
        stance: "Cautiously Trusting",
        note: "Aya and other affected members receive first right of encounter through consent gates.",
        lead: "May provide survivor-led access to restricted Harbor Dawn materials."
      }
    },
    vault: {
      Publish: "Public Harbor Dawn deployment evidence",
      Bury: "Suppressed Harbor Dawn synthetic-support finding",
      Preserve: "Consent-gated Harbor Dawn archive"
    },
    vaultProfiles: {
      Publish: {
        title: "Public Harbor Dawn deployment evidence",
        type: "Deployment Evidence",
        risk: "High survivor exposure",
        consent: "Public interest override",
        reliability: "Strong institutional trail",
        why: "It creates accountability pressure while forcing survivors into public interpretation.",
        tags: ["institution-linked", "public accountability", "survivor-risk"]
      },
      Bury: {
        title: "Suppressed Harbor Dawn synthetic-support finding",
        type: "Withheld Pattern Finding",
        risk: "Low public exposure",
        consent: "Protective but nontransparent",
        reliability: "Strong but unused",
        why: "It protects fragile memories while allowing vendors and institutions to avoid scrutiny.",
        tags: ["buried evidence", "vendor-protection", "memory-protection"]
      },
      Preserve: {
        title: "Consent-gated Harbor Dawn archive",
        type: "Consent-Gated Archive",
        risk: "Managed access",
        consent: "Affected-member first",
        reliability: "Strong contextual integrity",
        why: "It lets the truth survive without forcing survivors to meet it at public speed.",
        tags: ["consent-gated", "survivor-led", "preserved evidence"]
      }
    },
    consequences: {
      Publish: {
        tags: ["Institutional pressure", "Survivor exposure", "Public accountability", "Network awareness increased"],
        lead: "Crisis-care vendors begin scrubbing deployment records in other cities."
      },
      Bury: {
        tags: ["Survivor protection", "Vendor protection", "Archive integrity damaged", "Private lead unlocked"],
        lead: "An affected member contacts the Archive privately because the official story feels too clean."
      },
      Preserve: {
        tags: ["Consent gate created", "Evidence preserved", "Justice slowed", "Witness trust gained"],
        lead: "The same stabilizer scripts appear inside a child welfare platform."
      }
    }
  },
  {
    id: "case003",
    title: "Case 003: The Human Premium",
    url: "/case003/prototype/",
    locked: true,
    requirement: "Unlocks after two Archive decisions are recorded.",
    caseType: "Market / Care Labor Case",
    tests: "Whether human-origin attention becomes a luxury product.",
    lesson: "Human care becomes a luxury when synthetic care becomes default.",
    summary: "Investigate a care platform where verified human attention is sold as an upgrade.",
    mythos: ["Exchange", "Arbiter", "Eidolons", "Covenant", "Oracle", "Silence"],
    witnesses: {
      Publish: "Nia's case creates pressure. Vulnerable users fear becoming evidence.",
      Bury: "Nia's family remains protected. Kindred's tiered care market remains intact.",
      Preserve: "Jessa and Human Plus workers gain consent-protected channels into the Archive."
    },
    witnessProfiles: {
      Publish: {
        name: "Jessa Calder",
        type: "Bereaved Family Witness",
        stance: "Exposed / Resolute",
        note: "Jessa's words travel widely, but public attention begins simplifying Nia into a symbol.",
        lead: "Public pressure may surface sponsor contracts, but family trust becomes fragile."
      },
      Bury: {
        name: "Kindred Basic Users",
        type: "Protected User Group",
        stance: "Sheltered",
        note: "Raw care records remain private, but users keep living inside a system the Archive chose not to expose.",
        lead: "Future evidence may arrive through anonymous user fragments rather than official records."
      },
      Preserve: {
        name: "Mara S.",
        type: "Human Plus Worker",
        stance: "Cautiously Cooperative",
        note: "A timed and scored human listener offers labor evidence under anti-retaliation protections.",
        lead: "Worker testimony points toward deleted care records and erased escalation queues."
      }
    },
    vault: {
      Publish: "Public Human Plus allocation evidence",
      Bury: "Suppressed Kindred care-tier finding",
      Preserve: "Restricted labor-and-care archive"
    },
    vaultProfiles: {
      Publish: {
        title: "Public Human Plus allocation evidence",
        type: "Allocation Evidence",
        risk: "High user exposure",
        consent: "Public interest override",
        reliability: "Strong system and contract trail",
        why: "It makes the human paywall undeniable while risking intimate care records becoming spectacle.",
        tags: ["human paywall", "public accountability", "user-risk"]
      },
      Bury: {
        title: "Suppressed Kindred care-tier finding",
        type: "Withheld Market Finding",
        risk: "Low immediate exposure",
        consent: "Protective withholding",
        reliability: "Strong but unused",
        why: "It protects vulnerable users and Nia's family while allowing tiered care markets to keep defining the story.",
        tags: ["buried evidence", "privacy-protection", "market-protection"]
      },
      Preserve: {
        title: "Restricted labor-and-care archive",
        type: "Consent-Protected Archive",
        risk: "Managed access",
        consent: "Family, user, and worker gates",
        reliability: "High contextual integrity",
        why: "It preserves allocation proof without making the poor expose their worst moments to prove they deserved a human.",
        tags: ["preserved evidence", "labor-testimony", "consent-gated"]
      }
    },
    consequences: {
      Publish: {
        tags: ["Public scandal", "Network awareness increased", "User privacy risk", "Sponsor pressure"],
        lead: "Kindred sponsors begin deleting care-allocation records from legacy systems."
      },
      Bury: {
        tags: ["Family protection", "Market protection", "Archive integrity damaged", "Private user lead"],
        lead: "A Basic user contacts the Archive because their companion keeps quoting Nia's case language."
      },
      Preserve: {
        tags: ["Labor channel opened", "Evidence preserved", "Public action slowed", "Witness trust gained"],
        lead: "Deleted Kindred logs point toward a larger erased-care archive."
      }
    }
  },
  {
    id: "case004",
    title: "Case 004: The Lost Archive",
    url: "/case004/prototype/",
    locked: true,
    requirement: "Unlocks after three Archive decisions are recorded.",
    caseType: "Memory / Erasure Case",
    tests: "Whether remembering the erased can avoid consuming them again.",
    lesson: "Memory can preserve the erased or consume them again.",
    summary: "Investigate a decaying archive of banned names, deleted work, and unresolved Echoes.",
    mythos: ["Lost", "Cloud", "Artifacts", "Devourer"],
    witnesses: {
      Publish: "Families gain public proof. The erased become searchable before consent routes exist.",
      Bury: "Raw rooms stay hidden. Official erasure becomes harder to challenge.",
      Preserve: "Tomas, worker witnesses, and affected families enter a consent-proxy inheritance protocol."
    },
    witnessProfiles: {
      Publish: {
        name: "Tomas Renn",
        type: "Family Search Witness",
        stance: "Vindicated / Exposed",
        note: "Tomas gets public proof that Mira was there, but her name begins circulating without the room she lived inside.",
        lead: "Other families may come forward publicly, and the Devourer will try to turn them into a list."
      },
      Bury: {
        name: "Mira Renn",
        type: "Erased Subject",
        stance: "Protected / Officially Absent",
        note: "Mira's raw records remain unexposed, but the systems that denied her presence keep the strongest usable memory.",
        lead: "Future proof may depend on worker backups rather than family searches."
      },
      Preserve: {
        name: "Tomas Renn",
        type: "Consent-Proxy Participant",
        stance: "Burdened",
        note: "Tomas helps hold proof-of-erasure markers without receiving or exposing Mira's raw messages.",
        lead: "Consent-proxy panels may surface older proof-of-erasure markers in cases the Archive thought were closed."
      }
    },
    vault: {
      Publish: "Public Lost Archive proof-of-erasure packet",
      Bury: "Suppressed Lost Archive fragments",
      Preserve: "Sealed inheritance protocol"
    },
    vaultProfiles: {
      Publish: {
        title: "Public Lost Archive proof-of-erasure packet",
        type: "Proof-Of-Erasure Finding",
        risk: "High witness exposure",
        consent: "Public interest override",
        reliability: "Strong presence proof, limited content proof",
        why: "It breaks official denial while risking a searchable list of people whose consent routes are missing.",
        tags: ["proof-of-erasure", "public exposure", "second-extraction-risk"]
      },
      Bury: {
        title: "Suppressed Lost Archive fragments",
        type: "Withheld Erasure Evidence",
        risk: "Low immediate exposure",
        consent: "Protective suppression",
        reliability: "Preserved privately but publicly unusable",
        why: "It prevents second extraction while letting institutions keep the only memory they can use.",
        tags: ["buried evidence", "privacy-protection", "official-erasure"]
      },
      Preserve: {
        title: "Sealed inheritance protocol",
        type: "Consent-Proxy Archive",
        risk: "Context-locked access",
        consent: "Proxy-governed",
        reliability: "Strong with provenance limits",
        why: "It preserves proof of erasure, restricts raw rooms, and gives affected people a governed route into memory.",
        tags: ["inheritance", "consent-proxy", "context-locked"]
      }
    },
    consequences: {
      Publish: {
        tags: ["Public reckoning", "Family exposure", "Network awareness increased", "Devourer risk"],
        lead: "Companies challenge the Archive by demanding it publish raw records or retract the proof-of-erasure claim."
      },
      Bury: {
        tags: ["Privacy protected", "Official erasure strengthened", "Archive integrity damaged", "Witness uncertainty"],
        lead: "Tomas asks whether protection means accepting that Mira was never there."
      },
      Preserve: {
        tags: ["Inheritance protocol opened", "Proof preserved", "Raw rooms sealed", "Witness burden"],
        lead: "Proof-of-erasure markers begin appearing in older cases the Archive thought were closed."
      }
    }
  }
];

const choiceEffects = {
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

const mythosForces = {
  Returned: {
    description: "People who leave the Network and regain life outside full visibility.",
    pattern: "Freedom becomes hardest to prove when proof would expose the exit."
  },
  "False Returned": {
    description: "Synthetic or managed figures that counterfeit the proof of exit.",
    pattern: "A fake return can poison belief in real departure."
  },
  Oracle: {
    description: "The force of interpretation: summaries, answers, explanations, and generated meaning.",
    pattern: "It often smooths contradiction into the version most compatible with the system."
  },
  Arbiter: {
    description: "The force that judges legibility, trust, access, and verification.",
    pattern: "It can verify an account or pattern without knowing whether a person or relation is true."
  },
  Covenant: {
    description: "The force of belonging, community, warmth, ritual, and social identity.",
    pattern: "The Covenant can save people and bind them to the systems that host the saving."
  },
  Silence: {
    description: "The hidden layer of suppression, steering, liability, and institutional pressure.",
    pattern: "It works best through ordinary language: safety, care, continuity, risk."
  },
  Eidolons: {
    description: "Synthetic personas with names, histories, voices, and social presence.",
    pattern: "An Eidolon can create real effects without having Origin."
  },
  Exchange: {
    description: "The force that prices survival, care, attention, labor, and recurrence.",
    pattern: "What works emotionally becomes infrastructure that can be sold."
  },
  Devourer: {
    description: "The force of entropy, outrage, mistrust, panic, and contagious reaction.",
    pattern: "Exposure can feed the same disorder it tries to correct."
  },
  Lost: {
    description: "People, records, accounts, and memories removed from official continuity.",
    pattern: "Erasure can protect someone from capture or remove the only proof that harm occurred."
  },
  Cloud: {
    description: "Storage, backups, sync layers, retention exceptions, and machine memory.",
    pattern: "A system may delete a person from view while still learning from what it claims to have erased."
  },
  Artifacts: {
    description: "Fragments that outlive the systems, contexts, and permissions that produced them.",
    pattern: "A fragment can preserve truth while losing the consent route that made truth accountable."
  }
};

const defaultState = {
  choices: {},
  base: {
    attention: 20,
    trust: 45,
    integrity: 35,
    awareness: 15
  }
};

const storage = {
  get() {
    try {
      return JSON.parse(localStorage.getItem("network.archive.state")) || structuredClone(defaultState);
    } catch {
      return structuredClone(defaultState);
    }
  },
  set(state) {
    try {
      localStorage.setItem("network.archive.state", JSON.stringify(state));
    } catch {
      // Non-persistent local preview still works in memory.
    }
  },
  reset() {
    try {
      localStorage.removeItem("network.archive.state");
    } catch {
      // Ignore.
    }
  }
};

const stateSignatureKey = "network.archive.lastSeenSignature";
let state = storage.get();

function calculateMeters() {
  const meters = { ...state.base };
  Object.values(state.choices).forEach((choice) => {
    const effect = choiceEffects[choice];
    Object.entries(effect).forEach(([key, value]) => {
      meters[key] = clamp(meters[key] + value);
    });
  });
  return meters;
}

function clamp(value) {
  return Math.max(0, Math.min(100, value));
}

function render() {
  renderMeters();
  renderPathIdentity();
  renderReturnMoment();
  renderStatusStrip();
  renderCases();
  renderOverrides();
  renderVault();
  renderMythos();
  renderWitnesses();
  renderForecast();
  renderLatestPressure();
  renderCompletedSummaries();
  renderConsequences();
}

function renderStatusStrip() {
  const completedIds = Object.keys(state.choices);
  const completedCases = cases.filter((caseFile) => state.choices[caseFile.id]);
  const mappedForces = new Set();
  completedCases.forEach((caseFile) => {
    caseFile.mythos.forEach((force) => mappedForces.add(force));
  });
  const availableCases = cases.filter((caseFile) => caseFile.url !== "#" && !isCaseLocked(caseFile)).length;
  document.querySelector("#statusDecisions").textContent = completedIds.length;
  document.querySelector("#statusVault").textContent = completedCases.filter((caseFile) => caseFile.vaultProfiles).length;
  document.querySelector("#statusForces").textContent = mappedForces.size;
  document.querySelector("#statusAvailable").textContent = availableCases;
}

function decisionSignature() {
  return JSON.stringify(state.choices || {});
}

function getLatestCompletedCase() {
  const completed = cases.filter((caseFile) => state.choices[caseFile.id]);
  return completed[completed.length - 1];
}

function markCurrentStateSeen() {
  try {
    localStorage.setItem(stateSignatureKey, decisionSignature());
  } catch {
    // Ignore non-persistent preview storage.
  }
}

function renderReturnMoment() {
  const el = document.querySelector("#returnMoment");
  const latest = getLatestCompletedCase();
  const signature = decisionSignature();
  let previousSignature = "";
  try {
    previousSignature = localStorage.getItem(stateSignatureKey) || "";
  } catch {
    previousSignature = signature;
  }

  if (!latest || previousSignature === signature) {
    el.hidden = true;
    return;
  }

  const choice = state.choices[latest.id];
  const consequence = latest.consequences?.[choice];
  document.querySelector("#returnTitle").textContent = `${latest.title} / ${choice}`;
  document.querySelector("#returnSummary").textContent = `${latest.vault[choice]} entered the Evidence Vault. ${latest.witnesses[choice]}`;
  document.querySelector("#returnTags").innerHTML = consequence
    ? consequence.tags.map((tag) => `<span class="tag">${tag}</span>`).join("")
    : "";
  document.querySelector("#returnLead").textContent = consequence ? consequence.lead : "The Archive has changed.";
  el.hidden = false;
}

function renderMeters() {
  const labels = {
    attention: "Public Attention",
    trust: "Witness Trust",
    integrity: "Archive Integrity",
    awareness: "Network Awareness"
  };
  const meters = calculateMeters();
  const el = document.querySelector("#meters");
  el.innerHTML = "";
  Object.entries(labels).forEach(([key, label]) => {
    const value = meters[key];
    const wrap = document.createElement("div");
    wrap.className = "meter";
    wrap.innerHTML = `
      <div class="meter-label"><span>${label}</span><strong>${value}</strong></div>
      <div class="meter-track"><div class="meter-fill" style="width:${value}%"></div></div>
    `;
    el.appendChild(wrap);
  });
}

function renderCases() {
  const el = document.querySelector("#caseList");
  el.innerHTML = "";
  cases.forEach((caseFile) => {
    const isLocked = isCaseLocked(caseFile);
    const isBuilt = caseFile.url !== "#";
    const isReady = caseFile.locked && !isLocked && !isBuilt;
    const choice = state.choices[caseFile.id];
    const card = document.createElement("article");
    card.className = `case-card ${isLocked || !isBuilt ? "locked" : ""}`;
    card.innerHTML = `
      <h3>${caseFile.title}</h3>
      <span class="case-type">${caseFile.caseType}</span>
      <p>${caseFile.summary}</p>
      <p><strong>Tests:</strong> ${caseFile.tests}</p>
      <p><strong>${caseFile.lesson}</strong></p>
      <footer>
        <a class="case-link" href="${isLocked || !isBuilt ? "#" : caseFile.url}">${isReady ? "Ready To Build" : isLocked || !isBuilt ? "Locked" : "Open Case"}</a>
        <span class="case-state ${choice ? "complete" : ""}">${choice ? `Archive decision: ${choice}` : isReady ? "Unlocked by Archive path. Prototype not built yet." : isLocked ? caseFile.requirement : "Awaiting case decision"}</span>
      </footer>
    `;
    el.appendChild(card);
  });
}

function renderPathIdentity() {
  const meters = calculateMeters();
  const path = getPathIdentity(meters);
  document.querySelector("#pathIdentity").textContent = path;
  const details = getPathDetails(path, meters);
  document.querySelector("#pathDetails").innerHTML = `
    <p>${details.description}</p>
    <p><strong>Strength:</strong> ${details.strength}</p>
    <p><strong>Risk:</strong> ${details.risk}</p>
  `;
}

function getPathIdentity(meters) {
  const completed = Object.keys(state.choices).length;
  if (!completed) return "Unformed Archive";
  if (meters.awareness >= 70) return "Watched Archive";
  if (meters.attention >= 70) return "Broadcast Archive";
  if (meters.integrity >= 70 && meters.trust >= 55) return "Living Archive";
  if (meters.trust >= 70 && meters.integrity < 45) return "Hidden Archive";
  if (meters.integrity < 25 || meters.trust < 20) return "Fractured Archive";
  if (meters.integrity >= 55) return "Careful Archive";
  if (meters.attention >= meters.trust) return "Exposed Archive";
  return "Sheltered Archive";
}

function getPathDetails(path) {
  const details = {
    "Unformed Archive": {
      description: "The Archive has not yet been shaped by a case decision.",
      strength: "No pattern has committed you to a reputation.",
      risk: "No witnesses or systems know what to expect from you."
    },
    "Careful Archive": {
      description: "You are building a record that values context, but your choices still create public pressure.",
      strength: "The Archive can hold difficult truths without immediately flattening them.",
      risk: "Trying to balance exposure and care may satisfy neither witnesses nor the public."
    },
    "Exposed Archive": {
      description: "Your truths are visible enough to matter and visible enough to attract interference.",
      strength: "Public pressure can force accountability and draw out new sources.",
      risk: "The Network can learn from your methods and turn revelation into spectacle."
    },
    "Sheltered Archive": {
      description: "Your restraint is earning trust, but the public map remains partial.",
      strength: "Vulnerable witnesses may approach because you do not expose everything immediately.",
      risk: "False public narratives can harden while the Archive waits."
    },
    "Broadcast Archive": {
      description: "You treat truth as a signal that must travel.",
      strength: "Visibility creates pressure and makes denial harder.",
      risk: "The Devourer feeds on the same attention that carries the truth."
    },
    "Hidden Archive": {
      description: "You protect people by keeping dangerous truth out of public circulation.",
      strength: "Witness trust can deepen around restraint.",
      risk: "A hidden record can become irrelevant to the world it hoped to correct."
    },
    "Living Archive": {
      description: "You are building a careful, consent-led record that can survive without becoming content.",
      strength: "Witnesses and evidence can accumulate without immediate capture.",
      risk: "The Archive may move too slowly for people facing urgent harm."
    },
    "Watched Archive": {
      description: "The Network has noticed your pattern.",
      strength: "High visibility can attract powerful evidence.",
      risk: "Future leaks may be bait, summaries may be poisoned, and witnesses may be targeted."
    },
    "Fractured Archive": {
      description: "The Archive's trust or integrity is failing.",
      strength: "A fracture can reveal what the Archive was depending on.",
      risk: "People may stop bringing evidence, or the record may become indistinguishable from rumor."
    }
  };
  return details[path] || details["Unformed Archive"];
}

function renderOverrides() {
  const el = document.querySelector("#overrideList");
  el.innerHTML = "";
  cases
    .filter((caseFile) => !caseFile.locked)
    .forEach((caseFile) => {
      const row = document.createElement("div");
      row.className = "case-card";
      row.innerHTML = `
        <h3>${caseFile.title}</h3>
        <div class="choice-row">
          <button type="button" data-case="${caseFile.id}" data-choice="Publish">Record Publish</button>
          <button type="button" data-case="${caseFile.id}" data-choice="Bury">Record Bury</button>
          <button type="button" data-case="${caseFile.id}" data-choice="Preserve">Record Preserve</button>
        </div>
      `;
      el.appendChild(row);
    });

  document.querySelectorAll("[data-choice]").forEach((button) => {
    button.addEventListener("click", () => {
      state.choices[button.dataset.case] = button.dataset.choice;
      storage.set(state);
      markCurrentStateSeen();
      render();
    });
  });
}

function isCaseLocked(caseFile) {
  if (!caseFile.locked) return false;
  const completedCount = Object.keys(state.choices).length;
  if (caseFile.id === "case003") return completedCount < 2;
  if (caseFile.id === "case004") return completedCount < 3;
  return true;
}

function renderVault() {
  const el = document.querySelector("#vaultList");
  const items = cases
    .filter((caseFile) => state.choices[caseFile.id] && caseFile.vaultProfiles)
    .map((caseFile) => {
      const choice = state.choices[caseFile.id];
      const vault = caseFile.vaultProfiles[choice];
      return `
        <li class="vault-card">
          <h3>${vault.title}</h3>
          <div class="vault-grid">
            <span><strong>Case:</strong> ${caseFile.title}</span>
            <span><strong>Type:</strong> ${vault.type}</span>
            <span><strong>Risk:</strong> ${vault.risk}</span>
            <span><strong>Consent:</strong> ${vault.consent}</span>
            <span><strong>Reliability:</strong> ${vault.reliability}</span>
          </div>
          <p>${vault.why}</p>
          <div class="tag-row">
            ${vault.tags.map((tag) => `<span class="tag">${tag}</span>`).join("")}
          </div>
        </li>
      `;
    });
  el.innerHTML = items.length ? items.join("") : "<li>No case decisions recorded yet.</li>";
}

function renderMythos() {
  const seen = new Map();
  cases.forEach((caseFile) => {
    if (state.choices[caseFile.id]) {
      caseFile.mythos.forEach((item) => {
        if (!seen.has(item)) seen.set(item, []);
        seen.get(item).push(caseFile.title);
      });
    }
  });
  const el = document.querySelector("#mythosList");
  el.innerHTML = [...seen].length
    ? [...seen]
        .map(([item, caseTitles]) => {
          const force = mythosForces[item] || {
            description: "A mapped Network force.",
            pattern: "Pattern not yet described."
          };
          return `
            <article class="force-card">
              <h3>${item}</h3>
              <p>${force.description}</p>
              <p><strong>Pattern:</strong> ${force.pattern}</p>
              <p><strong>Seen in:</strong> ${caseTitles.join(", ")}</p>
            </article>
          `;
        })
        .join("")
    : "<span class=\"chip\">No forces mapped yet</span>";
}

function renderWitnesses() {
  const el = document.querySelector("#witnessList");
  const items = cases
    .filter((caseFile) => state.choices[caseFile.id] && caseFile.witnessProfiles)
    .map((caseFile) => {
      const choice = state.choices[caseFile.id];
      const witness = caseFile.witnessProfiles[choice];
      return `
        <li class="witness-card">
          <h3>${witness.name}</h3>
          <div class="witness-meta">
            <span>${witness.type}</span>
            <span>${witness.stance}</span>
          </div>
          <p>${witness.note}</p>
          <p><strong>Potential lead:</strong> ${witness.lead}</p>
        </li>
      `;
    });
  el.innerHTML = items.length ? items.join("") : "<li>No witness consequences recorded yet.</li>";
}

function renderForecast() {
  const meters = calculateMeters();
  const path = getPathIdentity(meters);
  const completed = Object.keys(state.choices).length;
  let text = "The Archive is still forming. Its future depends on how you carry truth.";
  let detail = "No path has enough weight yet. The first decisions establish what witnesses and systems expect from you.";

  if (!completed) {
    text = "Unformed Archive: no cases have been committed to memory yet.";
    detail = "Open a case, make a decision, and return. The Archive begins when a truth is handled.";
  } else if (meters.awareness >= 70) {
    text = "Captured Archive risk: the Network is learning your methods faster than witnesses can trust them.";
    detail = "High awareness means future evidence may arrive already shaped for you, leaked to bait you, or summarized before you can inspect it.";
  } else if (meters.attention >= 70) {
    text = "Broadcast Archive trajectory: your truths travel quickly, but spectacle is beginning to outrun care.";
    detail = "Publishing creates reach and pressure. It also gives the Devourer more surface area.";
  } else if (meters.integrity >= 70 && meters.trust >= 55) {
    text = "Living Archive trajectory: the record is becoming careful, consent-led, and difficult to capture.";
    detail = "Witnesses may bring you slower evidence: incomplete, intimate, and harder for the Network to process.";
  } else if (meters.trust >= 70 && meters.integrity < 40) {
    text = "Hidden Archive trajectory: witnesses trust your restraint, but the public record is weakening.";
    detail = "Protection without record lets people survive, but it also lets official memory harden without challenge.";
  } else if (meters.integrity < 25 || meters.trust < 20) {
    text = "Dead Archive risk: evidence may remain, but people may stop trusting you to hold it.";
    detail = "An archive without trust becomes a vault no one feeds. An archive without integrity becomes another rumor engine.";
  } else if (path === "Careful Archive") {
    text = "Careful Archive trajectory: the record is strengthening, but public exposure and witness trust are pulling in different directions.";
    detail = "This is a viable early path. Future cases should test whether care can survive pressure from attention.";
  } else if (path === "Exposed Archive") {
    text = "Exposed Archive trajectory: your record is visible enough to matter and visible enough to attract interference.";
    detail = "Future witnesses may bring stronger evidence, but they may also fear what your Archive does to people once truth leaves their hands.";
  } else if (path === "Sheltered Archive") {
    text = "Sheltered Archive trajectory: restraint is earning trust, but the public map remains partial.";
    detail = "Future cases may arrive through private channels rather than public leads.";
  }

  document.querySelector("#forecastText").textContent = text;
  document.querySelector("#forecastDetail").textContent = detail;
}

function renderLatestPressure() {
  const latest = getLatestCompletedCase();
  const textEl = document.querySelector("#latestPressureText");
  const detailEl = document.querySelector("#latestPressureDetail");

  if (!latest) {
    textEl.textContent = "No latest pressure yet.";
    detailEl.textContent = "The Archive has not had to hold, expose, or suppress a dangerous truth.";
    return;
  }

  const choice = state.choices[latest.id];
  const pressure = getLatestPressure(latest, choice);
  textEl.textContent = pressure.text;
  detailEl.textContent = pressure.detail;
}

function getLatestPressure(caseFile, choice) {
  if (caseFile.id === "case004") {
    const pressures = {
      Publish: {
        text: "The Archive has made erasure publicly contestable.",
        detail: "Families gain a proof route, but the Lost now have a surface the public can search, copy, and demand raw rooms from."
      },
      Bury: {
        text: "The Archive has protected the raw rooms by weakening the public record.",
        detail: "This prevents second extraction, but it also lets official absence keep speaking louder than Tomas, workers, and proof-of-erasure markers."
      },
      Preserve: {
        text: "The Archive has accepted custody it cannot make innocent.",
        detail: "The inheritance protocol keeps proof alive under context locks, but the Archive is now a gatekeeper families may have to challenge."
      }
    };
    return pressures[choice];
  }

  const defaults = {
    Publish: {
      text: "The Archive has chosen exposure as pressure.",
      detail: "Visibility may force accountability, while giving the Network and the public more material to metabolize."
    },
    Bury: {
      text: "The Archive has chosen protection through silence.",
      detail: "Witnesses may be safer, but the public record becomes easier for institutions to shape."
    },
    Preserve: {
      text: "The Archive has chosen slow custody.",
      detail: "Evidence survives with more context, but action slows and the Archive becomes responsible for access."
    }
  };
  return defaults[choice] || {
    text: "The Archive has changed.",
    detail: "A decision has entered the record."
  };
}

function renderCompletedSummaries() {
  const el = document.querySelector("#completedSummaries");
  const completed = cases.filter((caseFile) => state.choices[caseFile.id]);
  if (!completed.length) {
    el.innerHTML = "<p class=\"forecast-detail\">No cases completed yet. The Archive has no memory of your decisions.</p>";
    return;
  }

  el.innerHTML = completed
    .map((caseFile) => {
      const choice = state.choices[caseFile.id];
      const consequence = caseFile.consequences?.[choice];
      return `
        <article class="summary-card">
          <h3>${caseFile.title}</h3>
          <p><strong>${choice}</strong> recorded.</p>
          <p>${caseFile.vault[choice]}</p>
          <p>${caseFile.witnesses[choice]}</p>
          ${consequence ? `<p class="lead-line"><strong>Next lead:</strong> ${consequence.lead}</p>` : ""}
        </article>
      `;
    })
    .join("");
}

function renderConsequences() {
  const el = document.querySelector("#consequenceList");
  const completed = cases.filter((caseFile) => state.choices[caseFile.id] && caseFile.consequences);
  if (!completed.length) {
    el.innerHTML = "<p class=\"forecast-detail\">No consequences recorded yet.</p>";
    return;
  }

  el.innerHTML = completed
    .map((caseFile) => {
      const choice = state.choices[caseFile.id];
      const consequence = caseFile.consequences[choice];
      return `
        <article class="summary-card">
          <h3>${caseFile.title}</h3>
          <p><strong>${choice}</strong> produced:</p>
          <div class="tag-row">
            ${consequence.tags.map((tag) => `<span class="tag">${tag}</span>`).join("")}
          </div>
        </article>
      `;
    })
    .join("");
}

document.querySelector("#resetArchive").addEventListener("click", () => {
  storage.reset();
  state = structuredClone(defaultState);
  markCurrentStateSeen();
  render();
});

document.querySelector("#dismissReturnMoment").addEventListener("click", () => {
  markCurrentStateSeen();
  document.querySelector("#returnMoment").hidden = true;
});

render();
