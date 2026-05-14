let cases = [];

async function loadCases() {
  let caseIds;
  try {
    const indexRes = await fetch("/cases/index.json");
    if (!indexRes.ok) throw new Error("cases/index.json not found");
    const index = await indexRes.json();
    caseIds = index.map(entry => entry.id);
  } catch (e) {
    console.error("Case discovery failed, falling back to known IDs:", e);
    caseIds = ['case001', 'case002', 'case003', 'case004'];
  }

  const fetchPromises = caseIds.map(id =>
    fetch(`/${id}/case-data.json`).then(r => {
      if (!r.ok) throw new Error(`Failed to load ${id}`);
      return r.json();
    }).catch(e => {
      console.error(e);
      return null;
    })
  );

  const results = await Promise.all(fetchPromises);
  cases = results.filter(Boolean);

  render();
}

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
  const titleEl = document.querySelector("#returnTitle");
  const summaryEl = document.querySelector("#returnSummary");
  
  titleEl.textContent = `${latest.title} / ${choice}`;
  summaryEl.textContent = `${latest.vault[choice]} entered the Evidence Vault. ${latest.witnesses[choice]}`;
  
  document.querySelector("#returnTags").innerHTML = consequence
    ? consequence.tags.map((tag) => `<span class="tag">${tag}</span>`).join("")
    : "";
  document.querySelector("#returnLead").textContent = consequence ? consequence.lead : "The Archive has changed.";
  
  el.classList.remove("choice-publish", "choice-bury", "choice-preserve");
  el.classList.add(`choice-${choice.toLowerCase()}`);
  el.hidden = false;
  el.classList.add("syncing");
  setTimeout(() => el.classList.remove("syncing"), 2800);

  scrambleText(titleEl, titleEl.textContent, 1500);
  scrambleText(summaryEl, summaryEl.textContent, 2000);
  
  triggerEcho(choice);
}

function triggerEcho(choice) {
  const echoMessages = {
    Publish: ["SIGNAL TRACED", "ATTENTION SPIKE DETECTED", "PUBLIC RECKONING"],
    Bury: ["CONNECTION TIMED OUT", "PATH CONCEALED", "[REDACTED]"],
    Preserve: ["HASH VERIFIED", "INHERITANCE LOCKED", "CRYPT-KEY SEALED"]
  };
  
  const msgs = echoMessages[choice] || ["ARCHIVE SYNC"];
  const msg = msgs[Math.floor(Math.random() * msgs.length)];
  
  const echo = document.createElement("div");
  echo.className = `echo-popup echo-${choice.toLowerCase()}`;
  echo.textContent = msg;
  
  document.body.appendChild(echo);
  
  setTimeout(() => {
    echo.remove();
  }, 3000);
}

function scrambleText(el, finalString, duration = 1500) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*";
  let startTime = Date.now();
  const interval = setInterval(() => {
    let now = Date.now();
    let elapsed = now - startTime;
    if (elapsed > duration) {
      clearInterval(interval);
      el.textContent = finalString;
      return;
    }
    
    let scrambled = "";
    for (let i = 0; i < finalString.length; i++) {
      if (finalString[i] === " " || finalString[i] === "\n") {
        scrambled += finalString[i];
      } else if (Math.random() < Math.pow(elapsed / duration, 2)) {
        scrambled += finalString[i];
      } else {
        scrambled += chars[Math.floor(Math.random() * chars.length)];
      }
    }
    el.textContent = scrambled;
  }, 40);
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
      <div class="meter-track"><div class="meter-fill" style="width:0%; transition: width 1.5s cubic-bezier(0.2, 0.8, 0.2, 1);"></div></div>
    `;
    el.appendChild(wrap);
    
    // Animate the fill after appending to DOM
    requestAnimationFrame(() => {
      setTimeout(() => {
        wrap.querySelector('.meter-fill').style.width = `${value}%`;
      }, 100);
    });
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
    let cardClass = "case-card";
    if (isLocked || !isBuilt) cardClass += " locked";
    if (choice) cardClass += ` case-complete case-choice-${choice.toLowerCase()}`;
    const scar = getCaseScar(caseFile.id);
    card.className = cardClass;
    card.innerHTML = `
      <h3>${caseFile.title}</h3>
      <span class="case-type">${caseFile.caseType}</span>
      <p>${caseFile.summary}</p>
      <p><strong>Tests:</strong> ${caseFile.tests}</p>
      <p><strong>${caseFile.lesson}</strong></p>
      ${scar ? `<div class="case-scar"><strong>${scar.label}</strong><p>${scar.text}</p></div>` : ""}
      <footer>
        <a class="case-link" href="${isLocked || !isBuilt ? "#" : caseFile.url}">${isReady ? "Ready To Build" : isLocked || !isBuilt ? "Locked" : "Open Case"}</a>
        <span class="case-state ${choice ? "complete" : ""}">${choice ? `Archive decision: ${choice}` : isReady ? "Unlocked by Archive path. Prototype not built yet." : isLocked ? caseFile.requirement : "Awaiting case decision"}</span>
      </footer>
    `;
    el.appendChild(card);
  });
}

function getCaseScar(targetCaseId) {
  for (const sourceCase of cases) {
    const choice = state.choices[sourceCase.id];
    if (!choice) continue;
    const scar = sourceCase.nextCaseScars?.[targetCaseId]?.[choice];
    if (scar) return scar;
  }
  return null;
}

function renderPathIdentity() {
  const meters = calculateMeters();
  const path = getPathIdentity(meters);
  document.querySelector("#pathIdentity").textContent = path;
  document.body.dataset.path = path.toLowerCase().replace(/\s+/g, "-");
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
  if (typeof caseFile.unlockAfter === "number") return completedCount < caseFile.unlockAfter;
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
        <li class="vault-card vault-${choice.toLowerCase()}">
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
  const el = document.querySelector("#returnMoment");
  el.hidden = true;
  el.classList.remove("syncing", "choice-publish", "choice-bury", "choice-preserve");
});

const archiveAudio = {
  ambient: new Audio('/assets/audio/server-hum.mp3'),
  click: new Audio('/assets/audio/ui-click.mp3'),
  init() {
    this.ambient.loop = true;
    this.ambient.volume = 0.15;
    
    // Browsers block autoplay until user interacts
    document.body.addEventListener('click', () => {
      if (this.ambient.paused) this.ambient.play().catch(() => {});
    }, { once: true });

    // Attach click sounds to all buttons
    document.addEventListener('mousedown', (e) => {
      if (e.target.tagName === 'BUTTON' || e.target.closest('button')) {
        this.click.currentTime = 0;
        this.click.play().catch(() => {});
      }
    });
  }
};

archiveAudio.init();
loadCases();
