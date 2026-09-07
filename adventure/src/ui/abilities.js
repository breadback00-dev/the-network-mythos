import { escapeHTML as e, button } from "./shared.js";
import { ABILITIES } from "../domain/state.js";
export function abilitiesHTML(s, c) {
  return (
    '<p class="eyebrow">THE ARCHIVIST</p><h2>Your approach</h2><p>Choose a starting emphasis. After your first finding, spend one improvement. Abilities add ways to notice and ask; evidence still has to support your claim.</p><div class="ability-list">' +
    ABILITIES.map(
      (a) =>
        "<section><h3>" +
        a +
        " <span>Level " +
        s.abilities[a] +
        "</span></h3><p>" +
        e(c.chapter.abilities[a][2]) +
        "</p>" +
        (s.abilities[a] >= 3
          ? "<p>" + e(c.chapter.abilities[a][3]) + "</p>"
          : "") +
        (!s.ending && !s.emphasis
          ? button("Emphasise " + a, "emphasis", a)
          : "") +
        (!s.ending && s.points && s.abilities[a] < 3
          ? button("Improve " + a, "spend", a)
          : "") +
        "</section>",
    ).join("") +
    "</div><h3>Your insignia</h3><p>Chosen: " +
    e(s.insignia) +
    "</p>" +
    (s.ending
      ? ""
      : ["ring", "key", "eye"].map((x) => button(x, "insignia", x)).join(""))
  );
}
