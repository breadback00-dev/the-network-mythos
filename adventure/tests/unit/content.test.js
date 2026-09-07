import { test } from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { validateContent } from "../../src/domain/content.js";
import {
  initialState,
  transition,
  validateState,
  packetPreview,
} from "../../src/domain/state.js";
const c = Object.fromEntries(
  await Promise.all(
    ["scenes", "sources", "claims", "dialogue", "endings", "chapter"].map(
      async (k) => [
        k,
        JSON.parse(
          await readFile(
            new URL("../../content/mara/" + k + ".json", import.meta.url),
          ),
        ),
      ],
    ),
  ),
);
test("authored content and invalid references", () => {
  assert.ok(validateContent(c));
  for (const mutation of [
    (d) => (d.dialogue.rafi.nodes.start.choices[0].next = "missing"),
    (d) => (d.sources[0].gate = "unknown"),
    (d) => (d.claims[0].sources[0] = "missing"),
    (d) => (d.dialogue.elian.nodes.start.choices[0].execute = "eval"),
  ]) {
    const d = structuredClone(c);
    mutation(d);
    assert.throws(() => validateContent(d));
  }
});
for (const emphasis of ["Observation", "Interviewing", "Systems"])
  test(
    "all emphases complete real content and expose optional contributions: " +
      emphasis,
    () => {
      let s = initialState("author-test");
      const act = (cmd) => (s = transition(s, cmd, c));
      act({ type: "emphasis", ability: emphasis });
      for (const q of c.claims) {
        act({ type: "travel", scene: q.scene });
        if (q.id === "D2") act({ type: "credential", credential: "request" });
        for (const id of q.sources) act({ type: "inspect", id });
        act({
          type: "connect",
          sources: [...q.sources].reverse(),
          claim: q.claim,
        });
        if (q.id === "D1") act({ type: "spend", ability: emphasis });
      }
      assert.equal(s.abilities[emphasis], 3);
      const p = packetPreview(
        s,
        { kind: "ending", disposition: "Bury", includePrivate: false },
        c,
      );
      act({ type: "commit", preview: p });
      assert.ok(validateState(s, c));
      const bad = structuredClone(s);
      bad.ending.elian = "Invented sealed source knowledge";
      assert.throws(() => validateState(bad, c));
    },
  );
