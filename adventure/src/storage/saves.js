import { initialState, transition, validateState } from "../domain/state.js";
export const DB_NAME = "network.illustrated.mara";
export const MAX_SAVE_BYTES = 100000;
export function parseSave(text, c) {
  if (
    typeof text !== "string" ||
    new TextEncoder().encode(text).length > MAX_SAVE_BYTES
  )
    throw Error("Save file is too large.");
  const s = JSON.parse(text);
  validateState(s, c);
  return s;
}
export function openStore() {
  return new Promise((resolve, reject) => {
    const r = indexedDB.open(DB_NAME, 1);
    let settled = false;
    const timer = setTimeout(() => {
      settled = true;
      reject(Error("Storage did not open. Retry or choose session-only play."));
    }, 5000);
    r.onupgradeneeded = () => r.result.createObjectStore("saves");
    r.onerror = () => {
      clearTimeout(timer);
      reject(r.error);
    };
    r.onblocked = () => {
      clearTimeout(timer);
      settled = true;
      reject(Error("Another tab is blocking storage. Close it and retry."));
    };
    r.onsuccess = () => {
      clearTimeout(timer);
      if (settled) {
        r.result.close();
        return;
      }
      r.result.onversionchange = () => r.result.close();
      resolve(r.result);
    };
  });
}
export function readRecord(db, key = "active") {
  return new Promise((resolve, reject) => {
    const tx = db.transaction("saves", "readonly"),
      r = tx.objectStore("saves").get(key);
    tx.oncomplete = () => resolve(r.result ?? null);
    tx.onabort = () => reject(tx.error || Error("Read failed."));
  });
}
export function commitAction(db, expected, command, c) {
  return mutate(db, expected, (current) => transition(current, command, c), c);
}
export function replaceRun(db, expected, next, c) {
  validateState(next, c);
  return mutate(db, expected, () => next, c);
}
function mutate(db, expected, derive, c) {
  return new Promise((resolve, reject) => {
    let result, error;
    const tx = db.transaction("saves", "readwrite"),
      store = tx.objectStore("saves"),
      get = store.get("active");
    get.onsuccess = () => {
      try {
        const current = get.result;
        if (
          current &&
          (current.runId !== expected?.runId ||
            current.revision !== expected?.revision)
        )
          throw Error(
            "STALE: Another tab has newer progress. Reload this tab before continuing.",
          );
        if (!current && expected?.revision > 0)
          throw Error(
            "STALE: Saved progress changed. Reload before continuing.",
          );
        const before = current || expected || initialState();
        result = derive(before);
        if (current) {
          let valid = false;
          try {
            valid = validateState(current, c);
          } catch {}
          if (valid) store.put(current, "backup");
        }
        store.put(result, "active");
      } catch (e) {
        error = e;
        tx.abort();
      }
    };
    tx.oncomplete = () => resolve(result);
    tx.onabort = () =>
      reject(error || tx.error || Error("Progress could not be saved."));
    tx.onerror = () => {};
  });
}
export function restoreBackup(db, raw, c) {
  return readRecord(db, "backup").then((backup) => {
    if (!backup) throw Error("No backup is available.");
    validateState(backup, c);
    return replaceRun(
      db,
      raw,
      { ...backup, runId: crypto.randomUUID(), revision: 0 },
      c,
    );
  });
}
