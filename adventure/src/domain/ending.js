import { canonicalJSON } from "./json.js";
const destinations = {
  Publish: "public Porchlight feed",
  Bury: "sealed active-case custody",
  Preserve: "restricted Archive reviewers",
};
export function packetPreview(s, selection, c) {
  if (!selection || typeof selection !== "object")
    throw Error("Choose what to preview.");
  const correction = selection.kind === "correction";
  const keys = correction
    ? ["kind"]
    : ["kind", "disposition", "includePrivate"];
  if (
    Object.keys(selection).length !== keys.length ||
    !keys.every((k) => k in selection)
  )
    throw Error("Invalid preview options.");
  if (correction) {
    if (!s.findings.includes("D1") || s.posted)
      throw Error(
        "Establish the badge limit first, or inspect your existing correction.",
      );
  } else if (
    selection.kind !== "ending" ||
    !destinations[selection.disposition] ||
    typeof selection.includePrivate !== "boolean" ||
    s.findings.length !== 3 ||
    s.ending
  )
    throw Error("Establish all three findings before deciding the packet.");
  const include = !correction && selection.includePrivate;
  const destination = correction
    ? "public Porchlight feed"
    : destinations[selection.disposition];
  const packet = {
    destination,
    sources: correction
      ? ["mara.04", "mara.09.scope"]
      : [
          "mara.04",
          "mara.09.scope",
          "mara.09.service",
          "mara.13",
          ...(include ? ["mara.10", "mara.14"] : []),
        ],
    findings: correction
      ? ["Account verification does not establish who operates the account."]
      : [
          "The account is authentic; that does not establish its operator.",
          "Matching service and commission records tie the returned presence to a commissioned creator reconstruction.",
          "No conclusion about current whereabouts, consciousness or culpability is established.",
          ...(include
            ? [
                "Private testimony and a redacted association support a limited lead. Circulation may invite unwanted searching.",
              ]
            : []),
        ],
    privateHandling: include ? "Included" : "Withheld",
    notices: correction
      ? ["Rafi sees this public correction."]
      : [
          "Elian receives only handling status: private context " +
            (include
              ? "included in " + destination
              : "withheld from " + destination) +
            ".",
          "Rafi receives only disposition " +
            selection.disposition +
            " and public status.",
        ],
    earlierCorrection: s.posted,
  };
  const raw = { runId: s.runId, revision: s.revision, selection, packet };
  // This digest binds a local confirmation; it is not an authentication mechanism.
  let hash = 2166136261;
  for (const ch of canonicalJSON(raw)) {
    hash ^= ch.charCodeAt(0);
    hash = Math.imul(hash, 16777619);
  }
  return { ...raw, digest: (hash >>> 0).toString(16) };
}
export function finishPacket(s, p, c) {
  const { disposition, includePrivate } = p.selection;
  const destination = destinations[disposition];
  const base =
    c.endings?.[disposition]?.[includePrivate ? "included" : "withheld"] ||
    disposition +
      " packet: " +
      (includePrivate
        ? "private context included"
        : "private context withheld") +
      ".";
  const promiseBroken = s.assurance === "promised" && includePrivate;
  const elian = promiseBroken
    ? "You promised to leave that context out of the packet. You included it."
    : s.assurance === "promised"
      ? "You kept the boundary you gave me."
      : includePrivate
        ? "You included it. I need you to understand what that handling means."
        : "You left it out. I appreciate that.";
  const rafi =
    disposition === "Publish"
      ? "People can challenge the public return now. I hope they read past the headline."
      : disposition === "Bury"
        ? "The active case is closed. The public still has the returned account."
        : "A record remains for another review. Porchlight is still waiting for an answer.";
  return {
    digest: p.digest,
    disposition,
    includePrivate,
    promiseBroken,
    packet: p.packet,
    base,
    elian,
    handling: includePrivate
      ? "Private context is held in " + destination + "."
      : "Private context is excluded from this packet.",
    rafi,
    priorPost: s.posted
      ? "Your earlier public correction remains on Porchlight. This decision does not retract it."
      : null,
  };
}
