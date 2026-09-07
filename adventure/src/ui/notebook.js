import { escapeHTML as e, button } from "./shared.js";
export function notebookHTML(s, c) {
  return (
    '<p class="eyebrow">YOUR RECORD</p><h2>The notebook</h2><h3>Established findings</h3>' +
    (s.findings.length
      ? s.findings
          .map((id) => {
            const f = c.claims.find((x) => x.id === id);
            return (
              "<p><strong>" +
              e(f.title) +
              "</strong><br>" +
              e(f.options.find((x) => x.id === f.claim).text) +
              "</p>"
            );
          })
          .join("")
      : "<p>No findings yet. Inspected sources are not conclusions.</p>") +
    "<h3>Sources you have inspected</h3>" +
    c.sources
      .filter((x) => s.inspected.includes(x.id))
      .map((x) => button(x.title, "inspect", x.id))
      .join("") +
    "<h3>People and roles encountered</h3>" +
    c.chapter.roles
      .filter(
        (x) =>
          (x.scene && s.visited.includes(x.scene)) ||
          (x.finding && s.findings.includes(x.finding)) ||
          (x.ending && s.ending),
      )
      .map(
        (x) =>
          "<details><summary>" +
          e(x.name) +
          "</summary><p>" +
          e(x.text) +
          "</p></details>",
      )
      .join("") +
    "<h3>Boundaries remembered</h3><p>Elian: " +
    e(
      s.assurance === "promised"
        ? "private context will be excluded"
        : s.assurance === "declined"
          ? "no promise made"
          : "request unanswered",
    ) +
    ".</p><p>Public correction: " +
    (s.posted ? "posted to fictional Porchlight" : "not posted") +
    ".</p>"
  );
}
