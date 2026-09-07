import { packetPreview, finishPacket } from "./ending.js";
import { canonicalJSON } from "./json.js";
const unique = (a, allowed) =>
  Array.isArray(a) &&
  a.length <= allowed.length &&
  new Set(a).size === a.length &&
  a.every((x) => allowed.includes(x));
export function validateState(s, c) {
  const fail = () => {
    throw Error(
      "Save is incompatible or contains an invalid investigation. It has been retained for export.",
    );
  };
  if (!s || typeof s !== "object" || Array.isArray(s)) fail();
  const keys = [
    "schema",
    "content",
    "runId",
    "revision",
    "scene",
    "inspected",
    "pins",
    "findings",
    "abilities",
    "emphasis",
    "points",
    "spent",
    "assurance",
    "posted",
    "admitted",
    "dialogue",
    "visited",
    "insignia",
    "ending",
  ];
  if (Object.keys(s).length !== keys.length || !keys.every((k) => k in s))
    fail();
  const ids = c.sources.map((x) => x.id),
    scenes = c.scenes.map((x) => x.id),
    abilities = ["Observation", "Interviewing", "Systems"];
  if (
    s.schema !== 1 ||
    s.content !== 1 ||
    typeof s.runId !== "string" ||
    !/^[a-zA-Z0-9-]{1,80}$/.test(s.runId) ||
    !Number.isSafeInteger(s.revision) ||
    s.revision < 0 ||
    s.revision > 1e7
  )
    fail();
  if (
    !scenes.includes(s.scene) ||
    !unique(s.inspected, ids) ||
    !unique(s.pins, s.inspected) ||
    s.pins.length > 2 ||
    !unique(s.findings, ["D1", "D2", "D3"]) ||
    !unique(s.visited, scenes) ||
    !s.visited.includes(s.scene)
  )
    fail();
  if (
    !["unanswered", "declined", "promised"].includes(s.assurance) ||
    typeof s.posted !== "boolean" ||
    typeof s.admitted !== "boolean" ||
    !["ring", "eye", "key"].includes(s.insignia)
  )
    fail();
  if (
    (s.emphasis !== null && !abilities.includes(s.emphasis)) ||
    (s.spent !== null && !abilities.includes(s.spent)) ||
    !s.abilities ||
    Object.keys(s.abilities).length !== 3
  )
    fail();
  for (const a of abilities)
    if (s.abilities[a] !== 1 + Number(s.emphasis === a) + Number(s.spent === a))
      fail();
  if (
    s.points !== (s.findings.includes("D1") && !s.spent ? 1 : 0) ||
    ((s.spent || s.admitted || s.posted) && !s.findings.includes("D1"))
  )
    fail();
  for (const id of s.findings) {
    const f = c.claims.find((x) => x.id === id);
    if (!f || !f.sources.every((x) => s.inspected.includes(x))) fail();
  }
  if (s.findings.includes("D2") && (!s.admitted || !s.findings.includes("D1")))
    fail();
  if (s.findings.includes("D3") && !s.findings.includes("D2")) fail();
  for (const id of s.inspected) {
    const src = c.sources.find((x) => x.id === id);
    if (src.gate === "review" && !s.admitted) fail();
    if (src.gate === "D2" && !s.findings.includes("D2")) fail();
  }
  if (s.dialogue !== null) {
    if (
      Object.keys(s.dialogue).length !== 2 ||
      !c.dialogue[s.dialogue.id]?.scenes.includes(s.scene) ||
      !c.dialogue[s.dialogue.id]?.nodes[s.dialogue.node]
    )
      fail();
  }
  if (s.ending !== null) {
    const e = s.ending;
    if (
      s.findings.length !== 3 ||
      !["Publish", "Bury", "Preserve"].includes(e.disposition) ||
      typeof e.includePrivate !== "boolean" ||
      e.promiseBroken !== (s.assurance === "promised" && e.includePrivate)
    )
      fail();
    if (
      !e.packet ||
      !unique(e.packet.sources, ids) ||
      e.packet.sources.includes("mara.10") !== e.includePrivate ||
      e.packet.sources.includes("mara.14") !== e.includePrivate
    )
      fail();
    if (
      JSON.stringify(e).length > 18000 ||
      typeof e.digest !== "string" ||
      !/^[0-9a-f]{1,8}$/.test(e.digest)
    )
      fail();
    const preview = packetPreview(
      { ...s, ending: null },
      {
        kind: "ending",
        disposition: e.disposition,
        includePrivate: e.includePrivate,
      },
      c,
    );
    preview.digest = e.digest;
    if (canonicalJSON(e) !== canonicalJSON(finishPacket(s, preview, c))) fail();
  }
  return true;
}
