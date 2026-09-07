export function validateContent(c) {
  const ensure = (ok, message) => {
    if (!ok) throw Error("Content: " + message);
  };
  for (const name of ["scenes", "sources", "claims"])
    ensure(
      Array.isArray(c[name]) &&
        new Set(c[name].map((x) => x.id)).size === c[name].length,
      "duplicate or missing " + name,
    );
  ensure(
    c.sources.length === 12 && c.scenes.length === 4 && c.claims.length === 3,
    "chapter allocation changed",
  );
  const ids = c.sources.map((x) => x.id),
    scenes = c.scenes.map((x) => x.id);
  for (const src of c.sources) {
    ensure(
      src.scene.every((x) => scenes.includes(x)),
      "invalid source location",
    );
    ensure(
      [null, "review", "D2"].includes(src.gate),
      "unregistered source gate",
    );
    ensure(
      typeof src.full === "string" && src.full.length > 0,
      "missing source text",
    );
    ensure(ids.includes(src.ancestry), "unknown ancestry");
    if (src.media)
      ensure(
        src.media.transcript && src.media.description && src.media.path,
        "missing media equivalent",
      );
  }
  for (const q of c.claims) {
    ensure(
      q.sources.length === 2 &&
        new Set(q.sources).size === 2 &&
        q.sources.every((id) => ids.includes(id)),
      "invalid required source",
    );
    ensure(
      q.options.some((o) => o.id === q.claim),
      "no accepted explanation",
    );
    ensure(scenes.includes(q.scene), "unknown claim scene");
  }
  for (const [id, d] of Object.entries(c.dialogue)) {
    ensure(
      d.nodes.start && d.scenes.every((x) => scenes.includes(x)),
      "invalid dialogue " + id,
    );
    const reached = new Set();
    function walk(key) {
      if (reached.has(key)) return;
      reached.add(key);
      const node = d.nodes[key];
      ensure(
        typeof node.text === "string" && Array.isArray(node.choices),
        "invalid node",
      );
      ensure(
        new Set(node.choices.map((x) => x.id)).size === node.choices.length,
        "duplicate reply",
      );
      for (const choice of node.choices) {
        ensure(
          Object.keys(choice).every((x) =>
            ["id", "label", "next", "ability", "level", "assurance"].includes(
              x,
            ),
          ),
          "unregistered dialogue effect",
        );
        if (choice.next) {
          ensure(d.nodes[choice.next], "missing next node");
          walk(choice.next);
        }
        if (choice.ability)
          ensure(
            ["Observation", "Interviewing", "Systems"].includes(
              choice.ability,
            ) && [2, 3].includes(choice.level),
            "unknown ability",
          );
        if (choice.assurance)
          ensure(
            ["promised", "declined"].includes(choice.assurance),
            "unknown assurance",
          );
      }
    }
    walk("start");
    ensure(
      reached.size === Object.keys(d.nodes).length,
      "unreachable dialogue",
    );
  }
  for (const disposition of ["Publish", "Bury", "Preserve"])
    ensure(
      c.endings[disposition]?.included && c.endings[disposition]?.withheld,
      "missing ending",
    );
  return true;
}
