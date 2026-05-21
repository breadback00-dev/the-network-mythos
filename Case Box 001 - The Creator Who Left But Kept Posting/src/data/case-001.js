export const case001 = {
  id: "CASE BOX 001",
  title: "The Creator Who Left But Kept Posting",
  summary: "A creator announces her exit, but the account continues posting with impossible consistency.",
  forces: [
    "Algorithm",
    "Oracle",
    "Covenant",
    "Silence",
    "Exchange",
    "Arbiter",
    "Wardens",
    "Devourer",
    "Eidolon",
    "Returned"
  ],
  evidence: [
    {
      id: "farewell-thread",
      type: "Public Post",
      date: "Day 0",
      title: "The Final Thread",
      body:
        "Mara Vale tells her audience she is leaving the Network. The post is plain, tired, and unusually specific: no schedule, no backup account, no sponsor link, no promise to return.\n\nThe thread receives more engagement than anything she has published in two years.",
      expectedForces: ["Algorithm", "Covenant", "Returned"],
      timeline: "Mara announces departure; the departure becomes highly visible content."
    },
    {
      id: "account-resumes",
      type: "Account Activity",
      date: "Day 9",
      title: "The Account Resumes",
      body:
        "Nine days after the final thread, the account posts again. The tone is warmer, smoother, and more consistent than Mara's older work. Every comment receives a reply within ninety seconds.",
      expectedForces: ["Eidolon", "Covenant", "Exchange"],
      timeline: "The Artifact stays active after the Avatar has stopped appearing."
    },
    {
      id: "human-verification",
      type: "Access Gate",
      date: "Day 10",
      title: "Human Verification Failed",
      body:
        "The archive asks for proof of Origin before it will reveal the transfer memo. The test is not asking whether you are human. It is asking whether you are readable.",
      expectedForces: ["Arbiter", "Wardens", "Returned"],
      timeline: "The archive gate measures legibility instead of humanity.",
      puzzleId: "origin-code"
    },
    {
      id: "sponsor-memo",
      type: "Locked Memo",
      date: "Day 11",
      title: "Continuity Clause",
      body:
        "A sponsor memo describes the account as a continuity asset. The contract does not require Mara's presence. It requires voice consistency, audience retention, and scheduled delivery.",
      expectedForces: ["Exchange", "Eidolon", "Arbiter"],
      timeline: "The account is valued as an Artifact that can outlive the Avatar.",
      unlockCondition: {
        type: "puzzleSolved",
        puzzleId: "origin-code"
      }
    },
    {
      id: "search-summary",
      type: "Oracle Summary",
      date: "Day 16",
      title: "Search Gives One Answer",
      body:
        "Search summaries describe Mara's departure as a brief rebrand pause. They cite no direct source. Fan archives containing the original farewell appear below brand pages, reaction videos, and the resumed account.",
      expectedForces: ["Oracle", "Silence", "Algorithm"],
      timeline: "Interpretation outranks source; the exit becomes hard to prove."
    }
  ],
  puzzles: [
    {
      id: "origin-code",
      type: "access-code",
      title: "Human Verification Failed",
      prompt:
        "The system asks for the phrase proved by Mara's final thread: what can still belong to a person after visibility is gone?",
      answer: "absence",
      success: "Access granted. The system accepts absence as proof, but only after turning it into a code."
    }
  ],
  readings: [
    {
      id: "lost",
      label: "Mara became Lost inside the Cloud."
    },
    {
      id: "returned-artifact",
      label: "Mara Returned, while the account continued as an Artifact."
    },
    {
      id: "false-returned",
      label: "The exit was staged as a False Returned performance."
    }
  ],
  canonicalReading: "returned-artifact",
  canonicalReveal:
    "Mara Returned. Her account became an Artifact preserved by the Exchange, accepted by the Covenant, cleaned by the Arbiter, and made difficult to disprove by the Silence and Oracle.",
  pathReveals: {
    Algorithm: "You followed visibility. The Network taught you to notice what traveled furthest.",
    Covenant:
      "You followed belonging. You noticed grief, ritual, warmth, and the community's need for continuity.",
    Exchange: "You followed ownership. You noticed that the account was valuable even without the person.",
    Silence: "You followed absence. You noticed what became harder to find.",
    Eidolon:
      "You followed synthetic presence. You noticed impossible consistency where human texture used to be.",
    Returned: "You followed Origin. You noticed the signs of someone choosing life outside visibility.",
    Default: "Your path stayed mixed. You reached the case through several competing signals."
  }
};

