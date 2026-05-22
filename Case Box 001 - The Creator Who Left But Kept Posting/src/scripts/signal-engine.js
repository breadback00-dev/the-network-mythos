export function createSignalProfile(forces) {
  return Object.fromEntries(forces.map((force) => [force, 0]));
}

export function calculateSignalProfile(caseData, tagsByEvidence) {
  const profile = createSignalProfile(caseData.forces);

  Object.values(tagsByEvidence).forEach((tags) => {
    tags.forEach((tag) => {
      if (profile[tag] !== undefined) {
        profile[tag] += 1;
      }
    });
  });

  return profile;
}

export function getDominantSignal(profile) {
  const entries = getRankedSignals(profile);
  const [force, score] = entries[0] || ["Default", 0];

  if (score <= 0) return "Unformed";

  const tiedSignals = entries.filter(([, value]) => value === score);
  return tiedSignals.length > 1 ? "Mixed" : force;
}

export function getRankedSignals(profile) {
  return Object.entries(profile).sort((a, b) => {
    if (b[1] !== a[1]) return b[1] - a[1];
    return a[0].localeCompare(b[0]);
  });
}

export function getReadingPath(caseData, dominantSignal) {
  return caseData.pathReveals[dominantSignal] || caseData.pathReveals.Default;
}
