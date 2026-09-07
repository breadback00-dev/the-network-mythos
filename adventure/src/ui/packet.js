import { escapeHTML as e, button } from "./shared.js";
export function packetForm() {
  return (
    '<p class="eyebrow">CUSTODY IS A CHOICE</p><h2>Decide the packet</h2><p>All actions remain within this fictional investigation.</p><form id="packet-form"><fieldset><legend>Where will the record go?</legend>' +
    [
      [
        "Publish",
        "Make an accountable public record. Attention may become spectacle.",
      ],
      [
        "Bury",
        "Seal and close this active case. The public misrepresentation may remain.",
      ],
      [
        "Preserve",
        "Retain a restricted record for later review. Accountability is delayed.",
      ],
    ]
      .map(
        ([v, t]) =>
          '<label class="radio"><input type="radio" name="disposition" value="' +
          v +
          '" required><span><strong>' +
          v +
          "</strong> — " +
          t +
          "</span></label>",
      )
      .join("") +
    '</fieldset><fieldset><legend>Private message and identifying trace</legend><label class="radio"><input type="radio" name="private" value="withheld" checked><span>Withhold private context, including identifying derivatives.</span></label><label class="radio"><input type="radio" name="private" value="included"><span>Include private context in the selected destination.</span></label></fieldset><button class="primary" type="submit">Preview exact packet</button></form>'
  );
}
export function previewHTML(p, c) {
  return (
    '<p class="eyebrow">REVIEW BEFORE CONFIRMING · FICTIONAL ACTION</p><h2>' +
    (p.selection.kind === "correction"
      ? "Public correction preview"
      : "Packet preview") +
    "</h2><p><strong>Destination:</strong> " +
    e(p.packet.destination) +
    "</p><p><strong>Private context:</strong> " +
    e(p.packet.privateHandling) +
    "</p><h3>Contents</h3><ul>" +
    p.packet.findings.map((x) => "<li>" + e(x) + "</li>").join("") +
    "</ul><ul>" +
    p.packet.sources
      .map(
        (id) => "<li>" + e(c.sources.find((x) => x.id === id).title) + "</li>",
      )
      .join("") +
    "</ul><h3>Separate status notices</h3>" +
    p.packet.notices.map((x) => "<p>" + e(x) + "</p>").join("") +
    (p.packet.earlierCorrection
      ? "<p>Your earlier public correction remains.</p>"
      : "") +
    button("Confirm this decision", "confirm", "", 'class="primary"') +
    button("Cancel and return", "close")
  );
}
export function aftermathHTML(s) {
  const x = s.ending;
  return (
    '<p class="eyebrow">CASE RECORD · ' +
    e(x.disposition.toUpperCase()) +
    '</p><h2>What the Archive keeps</h2><p class="spoken">' +
    e(x.base) +
    "</p><p>" +
    e(x.handling) +
    "</p><h3>Elian · handling notice received</h3><blockquote>" +
    e(x.elian) +
    "</blockquote><h3>Rafi · case status received</h3><blockquote>" +
    e(x.rafi) +
    "</blockquote>" +
    (x.priorPost ? "<p>" + e(x.priorPost) + "</p>" : "") +
    '<hr><p class="eyebrow">A FOLDER FOR ANOTHER DAY</p><h3>Harbor Dawn</h3><p>If care kept a community alive, what changes when its origin was concealed?</p><p class="caption">A future case. This preview ends here.</p>' +
    button("Review your notebook", "notebook") +
    button("Save a copy of this investigation", "export")
  );
}
