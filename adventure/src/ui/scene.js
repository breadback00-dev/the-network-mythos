import { escapeHTML as e, button, portrait } from "./shared.js";
import { accessible } from "../domain/state.js";
export function sceneHTML(s, c) {
  const scene = c.scenes.find((x) => x.id === s.scene),
    d1 = s.findings.includes("D1");
  let quote = scene.quote;
  if (s.scene === "oracle" && d1)
    quote =
      "The account passed. Who is speaking remains unanswered. I will leave that space unfilled. Your source-review request is ready.";
  if (s.scene === "arbiter" && s.admitted)
    quote =
      "The mandate permits this service review. The Warden opens the route; the rest of the archive remains closed.";
  if (s.scene === "archive" && s.findings.includes("D2"))
    quote =
      "An association can become a search. That is what I’m asking you to consider.";
  const person =
    s.scene === "archive" && s.findings.includes("D2") ? "elian" : scene.person;
  const speaker = person === "elian" ? "Elian Vale" : scene.speaker;
  const sources = c.sources.filter(
    (x) => x.scene.includes(s.scene) && accessible(x, s),
  );
  const question = c.claims.find(
    (x) => x.scene === s.scene && (x.id !== "D3" || s.findings.includes("D2")),
  );
  return (
    '<main id="main" tabindex="-1"><section class="scene" aria-label="' +
    e(scene.name) +
    '"><img class="scene-art" src="./assets/scenes/' +
    scene.id +
    '.webp" alt="' +
    e(scene.alt) +
    '"><div class="scene-shade"></div><div class="scene-title"><p class="eyebrow">' +
    e(scene.eyebrow) +
    "</p><h1>" +
    e(scene.name) +
    "</h1><p>" +
    e(scene.description) +
    '</p></div><div class="encounter">' +
    portrait(person, d1) +
    '<div><p class="speaker">' +
    e(speaker) +
    '</p><p class="spoken">“' +
    e(quote) +
    "”</p>" +
    (s.ending
      ? "<p>This investigation is closed. You can review your sources and the aftermath.</p>"
      : button(
          s.scene === "archive" && person === "elian"
            ? "Speak with Elian"
            : "Continue conversation",
          "talk",
          person === "elian" ? "elian" : scene.talk,
        )) +
    "</div></div></section>" +
    '<section class="workspace"><div><div class="section-heading"><h2>Available here</h2><span>' +
    sources.length +
    ' sources</span></div><div class="source-list">' +
    sources
      .map(
        (x) =>
          button(
            (s.inspected.includes(x.id) ? "✓ " : "") + x.title,
            "inspect",
            x.id,
            'class="source-button"',
          ) +
          "<small>" +
          e(x.scope) +
          " · " +
          e(x.date) +
          "</small>",
      )
      .join("") +
    "</div></div>" +
    '<aside class="case-actions"><p class="eyebrow">YOUR NEXT STEP</p><h2>' +
    e(c.chapter.hints[Math.min(s.findings.length, 3)][0]) +
    "</h2>" +
    button("A nudge, please", "hint") +
    (!s.ending && scene.actions.includes("elian")
      ? button("Message from Elian", "talk", "elian")
      : "") +
    (!s.ending && s.scene === "archive" && !s.emphasis
      ? button("Choose your investigative approach", "abilities")
      : "") +
    (!s.ending && question
      ? button(
          s.findings.includes(question.id)
            ? "Revisit connection"
            : "Connect two sources",
          "connect",
        )
      : "") +
    (!s.ending && s.scene === "arbiter"
      ? '<p class="scope-note">' +
        (s.admitted
          ? "Warden: scoped service review admitted."
          : "Warden: service route closed.") +
        "</p>" +
        button("Present account badge", "credential", "badge") +
        button("Present Oracle request", "credential", "request")
      : "") +
    (s.scene === "porchlight" && d1 && (!s.ending || s.posted)
      ? button(
          s.posted
            ? "Read your public correction"
            : "Preview a public correction",
          s.posted ? "posted" : "correction",
        )
      : "") +
    (s.scene === "archive" && s.findings.length === 3
      ? button(
          s.ending ? "Read the aftermath" : "Decide the packet",
          s.ending ? "aftermath" : "packet",
          "",
          'class="primary"',
        )
      : "") +
    "</aside></section></main>"
  );
}
