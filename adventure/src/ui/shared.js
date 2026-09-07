export const escapeHTML = (value) =>
  String(value ?? "").replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
export function button(label, action, value = "", extra = "") {
  return (
    '<button type="button" data-action="' +
    action +
    '" data-value="' +
    escapeHTML(value) +
    '" ' +
    extra +
    ">" +
    escapeHTML(label) +
    "</button>"
  );
}
export function portrait(id, concerned = false) {
  return (
    '<div class="portrait ' +
    (concerned ? "concerned" : "") +
    '" role="img" aria-label="' +
    escapeHTML(id.replace("-person", "")) +
    " — " +
    (concerned ? "reflective" : "attentive") +
    '" style="background-image:url(./assets/portraits/' +
    escapeHTML(id) +
    '.webp)"></div>'
  );
}
