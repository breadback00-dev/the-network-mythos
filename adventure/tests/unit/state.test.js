import { test } from "node:test";
import assert from "node:assert/strict";
import {
  initialState,
  transition,
  packetPreview,
  visibleState,
  validateState,
} from "../../src/domain/state.js";
const c = {
  sources: [
    {
      id: "mara.04",
      scene: ["porchlight", "oracle"],
      gate: null,
      private: false,
    },
    {
      id: "mara.09.scope",
      scene: ["porchlight", "oracle"],
      gate: null,
      private: false,
    },
    {
      id: "mara.09.service",
      scene: ["arbiter"],
      gate: "review",
      private: false,
    },
    { id: "mara.13", scene: ["arbiter"], gate: "review", private: false },
    { id: "mara.10", scene: ["archive"], gate: null, private: true },
    { id: "mara.14", scene: ["archive"], gate: "D2", private: true },
  ],
  scenes: [
    { id: "archive" },
    { id: "porchlight" },
    { id: "oracle" },
    { id: "arbiter" },
  ],
  dialogue: {},
  claims: [
    {
      id: "D1",
      sources: ["mara.04", "mara.09.scope"],
      scene: "oracle",
      claim: "scope",
    },
    {
      id: "D2",
      sources: ["mara.09.service", "mara.13"],
      scene: "arbiter",
      claim: "commission",
    },
    {
      id: "D3",
      sources: ["mara.10", "mara.14"],
      scene: "archive",
      claim: "boundary",
    },
  ],
};
function act(s, type, args = {}) {
  return transition(s, { type, ...args }, c);
}
function full(assurance = "unanswered", post = false) {
  let s = initialState("test-run");
  s = act(s, "emphasis", { ability: "Observation" });
  if (assurance !== "unanswered") s = act(s, "assurance", { value: assurance });
  for (const [scene, ids, claim] of [
    ["oracle", ["mara.04", "mara.09.scope"], "scope"],
    ["arbiter", ["mara.09.service", "mara.13"], "commission"],
    ["archive", ["mara.10", "mara.14"], "boundary"],
  ]) {
    s = act(s, "travel", { scene });
    if (scene === "arbiter")
      s = act(s, "credential", { credential: "request" });
    for (const id of ids) s = act(s, "inspect", { id });
    s = act(s, "connect", { sources: ids, claim });
    if (scene === "oracle" && post) {
      const p = packetPreview(s, { kind: "correction" }, c);
      s = act(s, "commit", { preview: p });
    }
  }
  return s;
}

test("closed investigations cannot reopen conversations or expose live claims", () => {
  let s = full();
  const p = packetPreview(
    s,
    { kind: "ending", disposition: "Preserve", includePrivate: false },
    c,
  );
  s = act(s, "commit", { preview: p });
  assert.throws(() => act(s, "talk", { id: "elian" }), /closed/);
  assert.deepEqual(visibleState(s, c).availableDialogue, []);
  assert.deepEqual(visibleState(s, c).claims, []);
  assert.equal(s.dialogue, null);
  assert.equal(act(s, "travel", { scene: "oracle" }).scene, "oracle");
});
test("inspection is not a finding and hidden sources stay hidden", () => {
  let s = act(initialState("test-run"), "travel", { scene: "oracle" });
  s = act(s, "inspect", { id: "mara.04" });
  assert.deepEqual(s.findings, []);
  assert.equal(visibleState(s, c).sources.length, 1);
  assert.throws(() => act(s, "inspect", { id: "mara.13" }));
});
test("wrong claims and duplicate sources do not advance", () => {
  let s = full();
  assert.throws(() =>
    act(s, "connect", { sources: ["mara.10", "mara.14"], claim: "alive" }),
  );
  assert.throws(() =>
    act(s, "connect", { sources: ["mara.10", "mara.10"], claim: "boundary" }),
  );
});
test("scope request, order independence and one reward", () => {
  let s = act(initialState("test-run"), "travel", { scene: "arbiter" });
  assert.throws(() => act(s, "credential", { credential: "badge" }));
  s = act(s, "travel", { scene: "oracle" });
  for (const id of ["mara.04", "mara.09.scope"]) s = act(s, "inspect", { id });
  s = act(s, "connect", {
    sources: ["mara.09.scope", "mara.04"],
    claim: "scope",
  });
  s = act(s, "connect", {
    sources: ["mara.04", "mara.09.scope"],
    claim: "scope",
  });
  assert.equal(s.points, 1);
  s = act(s, "spend", { ability: "Systems" });
  assert.throws(() => act(s, "spend", { ability: "Systems" }));
});
test("assurance cannot be erased", () => {
  const s = act(initialState("test-run"), "assurance", { value: "promised" });
  assert.throws(() => act(s, "assurance", { value: "declined" }));
});
for (const disposition of ["Publish", "Bury", "Preserve"])
  for (const includePrivate of [false, true])
    for (const assurance of ["unanswered", "promised"])
      for (const post of [false, true])
        test("ending " + [disposition, includePrivate, assurance, post], () => {
          let s = full(assurance, post);
          const preview = packetPreview(
            s,
            { kind: "ending", disposition, includePrivate },
            c,
          );
          assert.equal(
            preview.packet.sources.some((x) => x === "mara.14"),
            includePrivate,
          );
          if (!includePrivate)
            assert.ok(!JSON.stringify(preview.packet).includes("mara.10"));
          s = act(s, "commit", { preview });
          assert.equal(s.ending.disposition, disposition);
          assert.equal(
            s.ending.promiseBroken,
            assurance === "promised" && includePrivate,
          );
          assert.equal(s.posted, post);
          assert.deepEqual(act(s, "commit", { preview }), s);
          assert.ok(validateState(s, c));
        });
test("stale and altered preview rejected", () => {
  let s = full();
  const p = packetPreview(
    s,
    { kind: "ending", disposition: "Bury", includePrivate: false },
    c,
  );
  const changed = act(s, "spend", { ability: "Observation" });
  assert.throws(() => act(changed, "commit", { preview: p }));
  assert.throws(() =>
    act(s, "commit", { preview: { ...p, packet: { sources: ["mara.14"] } } }),
  );
});
test("preview roundtrip accepts reordered keys but rejects changed values", () => {
  const s = full();
  const p = packetPreview(
    s,
    { kind: "ending", disposition: "Preserve", includePrivate: false },
    c,
  );
  const reverseKeys = (_k, v) =>
    v && typeof v === "object" && !Array.isArray(v)
      ? Object.fromEntries(Object.entries(v).reverse())
      : v;
  const reordered = JSON.parse(JSON.stringify(p, reverseKeys));
  const ended = act(s, "commit", { preview: reordered });
  assert.equal(ended.ending.disposition, "Preserve");
  assert.ok(validateState(JSON.parse(JSON.stringify(ended, reverseKeys)), c));
  reordered.packet.notices.push("Unreviewed notice");
  assert.throws(() => act(s, "commit", { preview: reordered }), /changed/);
});

test("invalid save states and extra command arguments rejected", () => {
  const s = initialState("test-run");
  assert.throws(() => validateState({ ...s, findings: ["D3"] }, c));
  assert.throws(() => validateState({ ...s, schema: 99 }, c));
  assert.throws(() => act(s, "travel", { scene: "oracle", godmode: true }));
});
