import {
  initialState,
  transition,
  validateState,
  visibleState,
  packetPreview,
} from "./domain/state.js";
import {
  openStore,
  readRecord,
  commitAction,
  replaceRun,
  parseSave,
  restoreBackup,
} from "./storage/saves.js";
import { escapeHTML as e, button } from "./ui/shared.js";
import { sceneHTML } from "./ui/scene.js";
import { dialogueHTML } from "./ui/dialogue.js";
import { evidenceHTML, connectHTML } from "./ui/evidence.js";
import { notebookHTML } from "./ui/notebook.js";
import { abilitiesHTML } from "./ui/abilities.js";
import { packetForm, previewHTML, aftermathHTML } from "./ui/packet.js";
import { stopMedia, bindMedia, playMedia } from "./ui/media.js";
import { registerTools } from "./agent/webmcp.js";
const app = document.querySelector("#app");
let c,
  s,
  db,
  raw,
  sessionOnly = false,
  busy = false,
  locked = false,
  pending = null,
  preview = null,
  imported = null,
  hintLevel = 0,
  returnFocus = null;
let saveLabel = "Opening save…";
let preferences = { size: 100, reduced: false };
try {
  preferences = {
    ...preferences,
    ...JSON.parse(
      localStorage.getItem("network.illustrated.preferences") || "{}",
    ),
  };
} catch {}
function applyPreferences() {
  document.documentElement.style.setProperty(
    "--reading-scale",
    String(
      [100, 125, 150, 200].includes(preferences.size)
        ? preferences.size / 100
        : 1,
    ),
  );
  document.body.classList.toggle(
    "reduced-motion",
    preferences.reduced === true,
  );
}
applyPreferences();
function notify(message, error = false) {
  const out = document.querySelector("#notice");
  if (out) {
    out.textContent = message;
    out.classList.toggle("error", error);
  }
  const inside = document.querySelector("#dialog-notice");
  if (inside) {
    inside.textContent = message;
    inside.classList.toggle("error", error);
  }
}
function render() {
  stopMedia();
  app.innerHTML =
    '<header><a class="brand" href="./"><span class="brand-symbol">◈</span><span>THE NETWORK<br><small>MYTHOS / ARCHIVE</small></span></a><nav aria-label="Investigation tools">' +
    button("Map", "map") +
    button("Notebook", "notebook") +
    button("Your approach" + (s.points ? " · +1" : ""), "abilities") +
    button("Settings & save", "settings") +
    '</nav></header><div class="case-strip"><span>CASE 001 <b>THE DOOR IS REAL</b></span><span id="save-status">' +
    e(saveLabel) +
    '</span></div><div id="notice" role="status" aria-live="polite"></div>' +
    sceneHTML(s, c) +
    "<footer><span>15 NOVEMBER 2030 · ILLUSTRATED INTERNAL PREVIEW</span><span>" +
    s.findings.length +
    ' / 3 connections established</span></footer><dialog id="sheet" aria-labelledby="sheet-title"><div class="sheet-top"><span id="sheet-title">INVESTIGATION</span>' +
    button("Return to scene", "close") +
    '</div><div id="dialog-notice" role="status" aria-live="polite"></div><div id="sheet-content"></div></dialog>';
  const dialog = document.querySelector("#sheet");
  dialog.addEventListener("cancel", (event) => {
    event.preventDefault();
    closeSheet();
  });
}
function show(html) {
  stopMedia();
  const d = document.querySelector("#sheet");
  if (!d.open) returnFocus = document.activeElement?.dataset?.action;
  document.querySelector("#sheet-content").innerHTML = html;
  document.querySelector("#dialog-notice").textContent = "";
  if (!d.open) d.showModal();
  bindMedia();
  const heading = d.querySelector("#sheet-content h2");
  if (heading) {
    heading.tabIndex = -1;
    heading.focus();
  }
}
async function closeSheet() {
  stopMedia();
  preview = null;
  if (s?.dialogue && !s.ending) {
    try {
      await run({ type: "closeDialogue" });
    } catch {
      return;
    }
  }
  document.querySelector("#sheet")?.close();
  const target = [...document.querySelectorAll("[data-action]")].find(
    (b) => b.dataset.action === returnFocus,
  );
  target?.focus();
}
async function run(command) {
  if (locked)
    throw Error("Another tab has newer progress. Reload this tab to continue.");
  if (busy) throw Error("Please wait for the current action to finish saving.");
  transition(s, command, c);
  busy = true;
  pending = command;
  const status = document.querySelector("#save-status");
  if (status)
    status.textContent = sessionOnly
      ? "Recording for this session…"
      : "Saving…";
  document.querySelectorAll("button").forEach((b) => (b.disabled = true));
  try {
    const next = sessionOnly
      ? transition(s, command, c)
      : await commitAction(db, s, command, c);
    s = next;
    raw = s;
    pending = null;
    saveLabel = sessionOnly
      ? "Session only · export before closing"
      : "Saved on this browser";
    render();
    return {
      state: visibleState(s, c),
      storage: sessionOnly ? "session-only" : "saved",
      revision: s.revision,
    };
  } catch (error) {
    if (String(error.message).startsWith("STALE:")) {
      locked = true;
      notify(error.message, true);
      show(
        "<h2>Newer progress in another tab</h2><p>This tab is read-only to protect that progress.</p>" +
          button("Reload latest progress", "reload"),
      );
    } else if (
      error.name === "QuotaExceededError" ||
      error.name === "InvalidStateError" ||
      error.name === "AbortError" ||
      /saved|transaction|storage|closed/i.test(error.message)
    ) {
      saveLabel = "Not saved";
      const status = document.querySelector("#save-status");
      if (status) status.textContent = saveLabel;
      show(
        "<h2>Progress could not be saved</h2><p>The previous saved action is intact. Retry or explicitly continue without durable saving.</p>" +
          button("Retry saving", "retry-save") +
          button("Continue session only", "session") +
          button("Export current progress", "export"),
      );
    } else {
      pending = null;
      notify(error.message, true);
    }
    throw error;
  } finally {
    busy = false;
    document.querySelectorAll("button").forEach((b) => (b.disabled = false));
  }
}
function settings() {
  show(
    '<p class="eyebrow">READ AT YOUR PACE</p><h2>Settings & save</h2><label>Reading size<select id="reading-size">' +
      [100, 125, 150, 200]
        .map(
          (v) =>
            "<option " +
            (preferences.size === v ? "selected" : "") +
            ' value="' +
            v +
            '">' +
            v +
            "%</option>",
        )
        .join("") +
      '</select></label><label class="radio"><input id="reduced" type="checkbox" ' +
      (preferences.reduced ? "checked" : "") +
      ">Reduce motion</label><p>Sound is optional. Media starts only when you press play.</p><p>" +
      e(saveLabel) +
      ". Saves stay on this browser; export a copy before switching devices.</p>" +
      button("Export current progress", "export") +
      '<label class="file-input">Import save file<input type="file" id="import-file" accept=".json,application/json"></label>' +
      button("Start a new investigation", "reset-preview") +
      button("Reload latest progress", "reload"),
  );
}
function resetPreview() {
  preview = {
    kind: "reset",
    runId: s?.runId ?? raw?.runId,
    revision: s?.revision ?? raw?.revision,
  };
  show(
    "<h2>Start a new investigation?</h2><p>This replaces this illustrated investigation on this browser. Export it first if you want to keep your choices. Earlier game versions use separate saves.</p>" +
      button("Export current progress", "export") +
      button("Confirm new investigation", "reset-confirm") +
      button("Cancel and return", "close"),
  );
  return preview;
}
function exportSave() {
  const content = JSON.stringify(raw ?? s, null, 2),
    url = URL.createObjectURL(
      new Blob([content], { type: "application/json" }),
    );
  const a = document.createElement("a");
  a.href = url;
  a.download = "network-mara-save.json";
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  return content;
}
async function resetRun(token) {
  if (
    !token ||
    token.kind !== "reset" ||
    token.runId !== (s?.runId ?? raw?.runId) ||
    token.revision !== (s?.revision ?? raw?.revision)
  )
    throw Error("Reset preview is stale. Review it again.");
  const next = initialState();
  s = sessionOnly ? next : await replaceRun(db, raw, next, c);
  raw = s;
  locked = false;
  preview = null;
  saveLabel = sessionOnly
    ? "Session only · export before closing"
    : "Saved on this browser";
  render();
  return {
    revision: s.revision,
    storage: sessionOnly ? "session-only" : "saved",
  };
}
async function action(name, value) {
  switch (name) {
    case "play-media":
      return playMedia();
    case "close":
      return closeSheet();
    case "map":
      show(
        '<p class="eyebrow">FOLLOW THE RECORD</p><h2>The Network</h2><p>Revisit any location. Access inside a location depends on the evidence and authority you hold.</p><div class="map">' +
          c.scenes
            .map(
              (x) =>
                '<button data-action="travel" data-value="' +
                x.id +
                '" class="map-place"><img src="./assets/scenes/' +
                x.id +
                '.webp" alt=""><span>' +
                e(x.name) +
                (s.scene === x.id ? " · you are here" : "") +
                "</span></button>",
            )
            .join("") +
          "</div>",
      );
      break;
    case "travel":
      await run({ type: "travel", scene: value });
      hintLevel = 0;
      document.querySelector("h1").focus?.();
      break;
    case "talk":
      await run({ type: "talk", id: value });
      show(dialogueHTML(s, c));
      break;
    case "reply":
      await run({ type: "reply", choice: value });
      if (s.dialogue) show(dialogueHTML(s, c));
      break;
    case "closeDialogue":
      await run({ type: "closeDialogue" });
      break;
    case "inspect":
      await run({ type: "inspect", id: value });
      show(
        evidenceHTML(
          c.sources.find((x) => x.id === value),
          s,
        ),
      );
      break;
    case "pin":
      await run({ type: "pin", id: value });
      show(
        evidenceHTML(
          c.sources.find((x) => x.id === value),
          s,
        ),
      );
      notify("Comparison pins: " + s.pins.length + " of 2.");
      break;
    case "notebook":
      show(notebookHTML(s, c));
      break;
    case "abilities":
      show(abilitiesHTML(s, c));
      break;
    case "emphasis":
    case "spend":
      await run({ type: name, ability: value });
      show(abilitiesHTML(s, c));
      notify(
        name === "spend"
          ? "Improvement recorded."
          : "Starting emphasis recorded.",
      );
      break;
    case "insignia":
      await run({ type: "insignia", value });
      show(abilitiesHTML(s, c));
      break;
    case "credential":
      await run({ type: "credential", credential: value });
      notify(
        "The Arbiter authorises service review. The Warden opens the route.",
      );
      break;
    case "connect":
      show(connectHTML(s, c));
      s.pins.forEach((id, i) => {
        const select = document.querySelector(
          '[name="' + (i ? "second" : "first") + '"]',
        );
        if (select) select.value = id;
      });
      break;
    case "hint":
      show(
        "<h2>A nudge</h2><p>" +
          e(c.chapter.hints[Math.min(s.findings.length, 3)][hintLevel]) +
          "</p>" +
          (hintLevel < 2
            ? button("More specific help", "hint-more")
            : "<p>You still choose the explanation the sources support.</p>"),
      );
      break;
    case "hint-more":
      hintLevel = Math.min(2, hintLevel + 1);
      return action("hint");
    case "packet":
      show(packetForm());
      break;
    case "correction":
      preview = packetPreview(s, { kind: "correction" }, c);
      show(previewHTML(preview, c));
      break;
    case "posted":
      show(
        "<h2>Your public correction</h2><p>Account verification does not establish who operates the account.</p><p>Sources: summary captured 6 November; public scope notice 10 November. No family material is included. Rafi: “That is a question we can ask without inventing an answer.”</p>",
      );
      break;
    case "confirm": {
      const p = preview;
      await run({ type: "commit", preview: p });
      preview = null;
      if (s.ending) show(aftermathHTML(s));
      else notify("Your correction is on the fictional Porchlight feed.");
      break;
    }
    case "aftermath":
      show(aftermathHTML(s));
      break;
    case "settings":
      settings();
      break;
    case "export":
      exportSave();
      break;
    case "reset-preview":
      resetPreview();
      break;
    case "reset-confirm":
      await resetRun(preview);
      break;
    case "import-confirm": {
      if (
        !imported ||
        !preview ||
        preview.runId !== s.runId ||
        preview.revision !== s.revision
      )
        throw Error("Import preview is stale.");
      const next = { ...imported, runId: crypto.randomUUID(), revision: 0 };
      s = sessionOnly ? next : await replaceRun(db, s, next, c);
      raw = s;
      imported = null;
      preview = null;
      render();
      notify("Imported investigation restored.");
      break;
    }
    case "reload":
      location.reload();
      break;
    case "retry-load":
      await boot();
      break;
    case "retry-save": {
      const command = pending;
      if (command) await run(command);
      break;
    }
    case "session":
      sessionOnly = true;
      locked = false;
      s = s || initialState();
      raw = s;
      saveLabel = "Session only · export before closing";
      render();
      notify("Progress will be lost on close unless you export it.");
      break;
    case "backup":
      s = await restoreBackup(db, raw, c);
      raw = s;
      saveLabel = "Saved on this browser";
      render();
      break;
    default:
      throw Error("Unknown action.");
  }
}
document.addEventListener("click", (event) => {
  const target = event.target.closest("[data-action]");
  if (target)
    action(target.dataset.action, target.dataset.value).catch((error) =>
      notify(error.message, true),
    );
});
document.addEventListener("submit", async (event) => {
  if (!["connect-form", "packet-form"].includes(event.target.id)) return;
  event.preventDefault();
  const f = new FormData(event.target);
  try {
    if (event.target.id === "connect-form") {
      await run({
        type: "connect",
        sources: [f.get("first"), f.get("second")],
        claim: f.get("claim"),
      });
      show(
        "<h2>Connection established</h2><p>" +
          e(c.chapter.hints[Math.min(s.findings.length, 3)][0]) +
          "</p>" +
          (s.findings.length === 1
            ? "<p>The Oracle leaves a space unfilled. A scoped review request and one ability improvement are ready.</p>"
            : "") +
          button("Continue investigation", "close"),
      );
    } else {
      preview = packetPreview(
        s,
        {
          kind: "ending",
          disposition: f.get("disposition"),
          includePrivate: f.get("private") === "included",
        },
        c,
      );
      show(previewHTML(preview, c));
    }
  } catch (error) {
    notify(error.message, true);
  }
});
document.addEventListener("change", async (event) => {
  const target = event.target;
  if (target.id === "reading-size" || target.id === "reduced") {
    preferences.size = Number(document.querySelector("#reading-size").value);
    preferences.reduced = document.querySelector("#reduced").checked;
    applyPreferences();
    try {
      localStorage.setItem(
        "network.illustrated.preferences",
        JSON.stringify(preferences),
      );
    } catch {
      notify("Reading preferences apply for this visit only.");
    }
  }
  if (target.id === "import-file" && target.files[0]) {
    try {
      if (target.files[0].size > 100000) throw Error("Save file is too large.");
      imported = parseSave(await target.files[0].text(), c);
      preview = { runId: s.runId, revision: s.revision };
      show(
        "<h2>Replace with this saved investigation?</h2><p>Location: " +
          e(imported.scene) +
          ". Findings: " +
          imported.findings.length +
          ". Current progress will be backed up.</p>" +
          button("Confirm import", "import-confirm") +
          button("Cancel and return", "close"),
      );
    } catch (error) {
      notify(error.message, true);
    }
  }
});
async function boot() {
  try {
    c = Object.fromEntries(
      await Promise.all(
        ["scenes", "sources", "dialogue", "claims", "endings", "chapter"].map(
          async (key) => {
            const response = await fetch("./content/mara/" + key + ".json", {
              signal: AbortSignal.timeout(12000),
            });
            if (!response.ok) throw Error("Chapter data could not load.");
            return [key, await response.json()];
          },
        ),
      ),
    );
  } catch {
    app.innerHTML =
      "<main><h1>The Archive could not open</h1><p>Chapter data could not load. Your saved progress has not been changed.</p>" +
      button("Retry loading", "retry-load") +
      "</main>";
    return;
  }
  try {
    db = await openStore();
    raw = await readRecord(db);
    if (raw) {
      validateState(raw, c);
      s = raw;
    } else {
      s = await replaceRun(db, null, initialState(), c);
      raw = s;
    }
    saveLabel = "Saved on this browser";
    render();
    if (s.dialogue) show(dialogueHTML(s, c));
  } catch (error) {
    s = null;
    app.innerHTML =
      '<header><span class="brand">THE NETWORK MYTHOS</span></header><main><h1>Your progress needs attention</h1><p>' +
      e(error.message) +
      "</p>" +
      button("Export retained save", "export") +
      button("Retry loading", "retry-load") +
      button("Restore last good backup", "backup") +
      button("Continue session only", "session") +
      (db ? button("Start a new investigation", "reset-preview") : "") +
      '</main><dialog id="sheet"><div class="sheet-top">' +
      button("Cancel and return", "close") +
      '</div><div id="dialog-notice"></div><div id="sheet-content"></div></dialog>';
  }
  registerTools({
    read: () =>
      s
        ? {
            state: visibleState(s, c),
            storage: sessionOnly ? "session-only" : saveLabel,
            locked,
          }
        : { storage: "recovery" },
    command: async (command) => {
      const result = await run(command);
      if (s.dialogue) show(dialogueHTML(s, c));
      return result;
    },
    preview: (selection) => {
      preview = packetPreview(s, selection, c);
      show(previewHTML(preview, c));
      return preview;
    },
    resetPreview,
    reset: resetRun,
    export: () => JSON.stringify(raw ?? s),
  });
}
boot();
