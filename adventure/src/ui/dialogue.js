import { escapeHTML as e, button, portrait } from "./shared.js";
export function dialogueHTML(s, c) {
  const d = c.dialogue[s.dialogue?.id],
    node = d?.nodes[s.dialogue?.node];
  if (!node)
    return (
      "<h2>Conversation unavailable</h2>" +
      button("Return to scene", "closeDialogue")
    );
  const choices = node.choices.filter(
    (x) =>
      (!x.ability || s.abilities[x.ability] >= x.level) &&
      !(s.assurance === "promised" && x.assurance === "declined"),
  );
  return (
    '<div class="dialogue">' +
    portrait(d.portrait, s.assurance === "promised" || s.findings.length > 0) +
    '<div><p class="eyebrow">CONVERSATION</p><h2>' +
    e(d.speaker) +
    '</h2><p class="spoken">' +
    e(node.text) +
    "</p>" +
    (s.dialogue.id === "elian"
      ? '<p class="caption">Your reply: ' +
        e(
          s.assurance === "promised"
            ? "assurance recorded"
            : s.assurance === "declined"
              ? "no promise made"
              : "unanswered",
        ) +
        "</p>"
      : "") +
    '<div class="choices">' +
    choices.map((x) => button(x.label, "reply", x.id)).join("") +
    "</div></div></div>"
  );
}
