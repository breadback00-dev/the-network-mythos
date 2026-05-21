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
  const entries = Object.entries(profile).sort((a, b) => b[1] - a[1]);
  const [force, score] = entries[0] || ["Default", 0];
  return score > 0 ? force : "Unformed";
}

export function getReadingPath(caseData, dominantSignal) {
  return caseData.pathReveals[dominantSignal] || caseData.pathReveals.Default;
}

