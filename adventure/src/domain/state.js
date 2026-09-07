import { validateState } from "./validation.js";
import { canonicalJSON } from "./json.js";
import { packetPreview, finishPacket } from "./ending.js";
export { validateState, packetPreview };
export const ABILITIES = ["Observation", "Interviewing", "Systems"];
export function initialState(runId = crypto.randomUUID()) {
  return {
    schema: 1,
    content: 1,
    runId,
    revision: 0,
    scene: "archive",
    inspected: [],
    pins: [],
    findings: [],
    abilities: { Observation: 1, Interviewing: 1, Systems: 1 },
    emphasis: null,
    points: 0,
    spent: null,
    assurance: "unanswered",
    posted: false,
    admitted: false,
    dialogue: null,
    visited: ["archive"],
    insignia: "ring",
    ending: null,
  };
}
export function accessible(source, s) {
  return (
    !source.gate ||
    (source.gate === "review" ? s.admitted : s.findings.includes(source.gate))
  );
}
export function visibleState(s, c) {
  return {
    ...structuredClone(s),
    locations: c.scenes.map(({ id, name }) => ({ id, name })),
    sources: c.sources.filter((x) => s.inspected.includes(x.id)),
    availableSources: c.sources
      .filter((x) => x.scene.includes(s.scene) && accessible(x, s))
      .map((x) => ({ id: x.id, title: x.title })),
    availableDialogue: Object.entries(c.dialogue)
      .filter(([, v]) => !s.ending && v.scenes.includes(s.scene))
      .map(([id, v]) => ({ id, speaker: v.speaker })),
    currentDialogue: s.dialogue
      ? {
          speaker: c.dialogue[s.dialogue.id]?.speaker,
          ...c.dialogue[s.dialogue.id]?.nodes[s.dialogue.node],
          choices: c.dialogue[s.dialogue.id]?.nodes[s.dialogue.node]?.choices
            .filter(
              (x) =>
                (!x.ability || s.abilities[x.ability] >= x.level) &&
                !(s.assurance === "promised" && x.assurance === "declined"),
            )
            .map(({ id, label }) => ({ id, label })),
        }
      : null,
    roles:
      c.chapter?.roles.filter(
        (x) =>
          (x.scene && s.visited.includes(x.scene)) ||
          (x.finding && s.findings.includes(x.finding)) ||
          (x.ending && s.ending),
      ) || [],
    claims: c.claims
      .filter(
        (x) =>
          !s.ending &&
          x.scene === s.scene &&
          (x.id !== "D3" || s.findings.includes("D2")),
      )
      .map((x) => ({ id: x.id, title: x.title, options: x.options })),
  };
}
const fields = {
  travel: ["scene"],
  inspect: ["id"],
  pin: ["id"],
  emphasis: ["ability"],
  spend: ["ability"],
  assurance: ["value"],
  credential: ["credential"],
  connect: ["sources", "claim"],
  talk: ["id"],
  reply: ["choice"],
  closeDialogue: [],
  insignia: ["value"],
  commit: ["preview"],
};
function requireThat(ok, message) {
  if (!ok) throw Error(message);
}
export function transition(current, command, c) {
  requireThat(
    command && typeof command === "object" && !Array.isArray(command),
    "Invalid action.",
  );
  const allowed = fields[command.type];
  requireThat(
    allowed &&
      Object.keys(command).every((k) => k === "type" || allowed.includes(k)) &&
      allowed.every((k) => k in command),
    "Unknown action or arguments.",
  );
  if (
    command.type === "commit" &&
    current.ending?.digest === command.preview?.digest
  )
    return current;
  requireThat(
    !current.ending ||
      ["travel", "inspect", "closeDialogue"].includes(command.type),
    "This investigation is closed. Start a new run to choose again.",
  );
  const s = structuredClone(current);
  switch (command.type) {
    case "travel":
      requireThat(
        c.scenes.some((x) => x.id === command.scene),
        "Unknown location.",
      );
      s.scene = command.scene;
      s.dialogue = null;
      if (!s.visited.includes(s.scene)) s.visited.push(s.scene);
      break;
    case "inspect": {
      const source = c.sources.find((x) => x.id === command.id);
      requireThat(
        source &&
          (s.inspected.includes(source.id) ||
            (source.scene.includes(s.scene) && accessible(source, s))),
        "This source is not available here yet.",
      );
      if (!s.inspected.includes(source.id)) s.inspected.push(source.id);
      break;
    }
    case "pin":
      requireThat(
        s.inspected.includes(command.id),
        "Inspect this source first.",
      );
      if (s.pins.includes(command.id))
        s.pins = s.pins.filter((x) => x !== command.id);
      else {
        requireThat(
          s.pins.length < 2,
          "Unpin one source before selecting another.",
        );
        s.pins.push(command.id);
      }
      break;
    case "emphasis":
      requireThat(
        !s.emphasis && ABILITIES.includes(command.ability),
        "Your starting emphasis has already been chosen, or is unknown.",
      );
      s.emphasis = command.ability;
      s.abilities[command.ability]++;
      break;
    case "spend":
      requireThat(
        s.points === 1 &&
          !s.spent &&
          ABILITIES.includes(command.ability) &&
          s.abilities[command.ability] < 3,
        "No improvement is available for that ability.",
      );
      s.points = 0;
      s.spent = command.ability;
      s.abilities[command.ability]++;
      break;
    case "assurance":
      requireThat(
        s.scene === "archive" &&
          ["promised", "declined"].includes(command.value),
        "Reply to Elian in the Archive with an assurance or an honest non-promise.",
      );
      requireThat(
        s.assurance !== "promised" || command.value === "promised",
        "A given assurance cannot be erased.",
      );
      s.assurance = command.value;
      break;
    case "credential":
      requireThat(
        s.scene === "arbiter",
        "Present the credential at the Arbiter.",
      );
      requireThat(
        command.credential === "request" && s.findings.includes("D1"),
        "That badge validates an account. It does not authorise a service review.",
      );
      s.admitted = true;
      break;
    case "connect": {
      requireThat(
        Array.isArray(command.sources) &&
          command.sources.length === 2 &&
          new Set(command.sources).size === 2,
        "Choose two different sources. Copies are not independent corroboration.",
      );
      requireThat(
        command.sources.every((id) => s.inspected.includes(id)),
        "Inspect both sources before presenting a connection.",
      );
      const finding = c.claims.find(
        (x) =>
          x.scene === s.scene &&
          x.sources.every((id) => command.sources.includes(id)),
      );
      requireThat(
        finding,
        "These sources do not establish this connection here. Compare sources relevant to the question.",
      );
      requireThat(
        finding.claim === command.claim,
        finding.feedback ||
          "The sources support a limited claim, not certainty about identity, death or current whereabouts.",
      );
      requireThat(
        finding.id === "D1" ||
          (finding.id === "D2" ? s.admitted : s.findings.includes("D2")),
        "Complete the scoped review first.",
      );
      if (!s.findings.includes(finding.id)) {
        s.findings.push(finding.id);
        s.pins = [];
        if (finding.id === "D1") s.points = 1;
      }
      break;
    }
    case "talk":
      requireThat(
        c.dialogue[command.id]?.scenes.includes(s.scene),
        "This conversation is not available here.",
      );
      s.dialogue = { id: command.id, node: "start" };
      break;
    case "reply": {
      const dialogue = c.dialogue[s.dialogue?.id],
        node = dialogue?.nodes[s.dialogue?.node];
      const choice = node?.choices.find((x) => x.id === command.choice);
      requireThat(
        choice &&
          (!choice.ability || s.abilities[choice.ability] >= choice.level),
        "That reply is not available.",
      );
      if (choice.assurance) {
        requireThat(
          s.assurance !== "promised" || choice.assurance === "promised",
          "Your assurance is already recorded.",
        );
        s.assurance = choice.assurance;
      }
      requireThat(
        !choice.next || dialogue.nodes[choice.next],
        "This dialogue is unavailable. Return to the scene.",
      );
      s.dialogue = choice.next
        ? { id: s.dialogue.id, node: choice.next }
        : null;
      break;
    }
    case "closeDialogue":
      s.dialogue = null;
      break;
    case "insignia":
      requireThat(
        ["ring", "key", "eye"].includes(command.value),
        "Unknown insignia.",
      );
      s.insignia = command.value;
      break;
    case "commit": {
      const p = command.preview;
      requireThat(
        p?.runId === s.runId && p?.revision === s.revision,
        "This preview is out of date. Review the new preview before confirming.",
      );
      const expected = packetPreview(s, p.selection, c);
      requireThat(
        canonicalJSON(expected) === canonicalJSON(p),
        "The preview changed. Review it again.",
      );
      if (p.selection.kind === "correction") s.posted = true;
      else {
        s.ending = finishPacket(s, p, c);
        s.dialogue = null;
      }
      break;
    }
  }
  if (JSON.stringify(s) === JSON.stringify(current)) return current;
  s.revision++;
  validateState(s, c);
  return s;
}
