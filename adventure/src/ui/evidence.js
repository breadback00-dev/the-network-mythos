import { escapeHTML as e, button } from "./shared.js";
import { mediaHTML } from "./media.js";
export function evidenceHTML(source, s) {
  return (
    '<p class="eyebrow">' +
    e(source.scope) +
    " SOURCE · " +
    e(source.date) +
    "</p><h2>" +
    e(source.title) +
    '</h2><p class="evidence-excerpt">' +
    e(source.excerpt) +
    "</p>" +
    mediaHTML(source) +
    (source.id === "mara.meme"
      ? '<div class="meme-row"><figure><img src="./assets/media/meme.svg" alt="Original joke: Verified door. Occupant not checked."><figcaption>Original · uncertainty remains</figcaption></figure><figure><div class="meme-crop"><img src="./assets/media/meme.svg" alt="Cropped repost says only Verified door, omitting Occupant not checked."></div><figcaption>Repost · uncertainty removed</figcaption></figure></div>' +
        button("Follow the comeback source", "inspect", "mara.05")
      : "") +
    '<details><summary>Read full source text</summary><pre class="source-text">' +
    e(source.full) +
    '</pre></details><p class="caption">' +
    (source.adaptation
      ? "Includes clearly authored adaptation material. "
      : "") +
    "Source family: " +
    e(source.ancestry) +
    ". Copies retain this ancestry.</p>" +
    (!s.ending
      ? button(
          s.pins.includes(source.id) ? "Unpin source" : "Pin for comparison",
          "pin",
          source.id,
        )
      : "")
  );
}
export function connectHTML(s, c) {
  const q = c.claims.find(
    (x) => x.scene === s.scene && (x.id !== "D3" || s.findings.includes("D2")),
  );
  if (!q)
    return "<h2>No connection to present here yet</h2><p>Follow your next step and return with the relevant sources.</p>";
  const opts =
    '<option value="">Choose an inspected source</option>' +
    c.sources
      .filter((x) => s.inspected.includes(x.id))
      .map((x) => '<option value="' + e(x.id) + '">' + e(x.title) + "</option>")
      .join("");
  return (
    '<p class="eyebrow">SOURCE CONNECTION</p><h2>' +
    e(q.title) +
    '</h2><p>Choose two sources, then the explanation they support. Reading or pinning alone does not establish a finding.</p><form id="connect-form"><label>First source<select name="first" required>' +
    opts +
    '</select></label><label>Second source<select name="second" required>' +
    opts +
    "</select></label><fieldset><legend>What can you establish?</legend>" +
    q.options
      .map(
        (x) =>
          '<label class="radio"><input type="radio" name="claim" value="' +
          e(x.id) +
          '" required><span>' +
          e(x.text) +
          "</span></label>",
      )
      .join("") +
    '</fieldset><button class="primary" type="submit">Present connection</button></form>'
  );
}
