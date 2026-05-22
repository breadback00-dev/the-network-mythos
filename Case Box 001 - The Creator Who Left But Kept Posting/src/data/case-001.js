export const case001 = {
  id: "CASE BOX 001",
  title: "The Creator Who Left But Kept Posting",
  summary: "A creator leaves public life, but her account keeps answering like a cleaner version of her.",
  opening: {
    headline: "A creator left. Her account kept answering.",
    summary:
      "Mara Vale asked her audience not to look for her here. Nine days later, her account returned with cleaner replies, faster warmth, and no human hesitation.",
    role:
      "You are the Archive investigator. Reconstruct what happened without turning Mara's absence into another performance.",
    goals: [
      "Read the evidence like fragments from a public disappearance.",
      "Tag the forces you think are acting on each artifact.",
      "Use the gate to surface the locked memo.",
      "Submit a final reading and compare it with the route you created."
    ]
  },
  intake: {
    heading: "Intake Brief",
    summary:
      "Use the board to test three possibilities: Mara returned, Mara vanished, or the account became a useful imitation. Evidence is what you inspect; tags are your notes about the forces involved; the gate hides one key memo; the final reading is your reconstruction.",
    steps: [
      {
        label: "Evidence",
        text: "Open each item from the inbox. Contradictions matter more than any single clue."
      },
      {
        label: "Tags",
        text: "Mark the forces you see in the artifact. More than one tag can be true."
      },
      {
        label: "Gate",
        text: "One item asks for a phrase. The answer is inside the evidence, not outside lore."
      },
      {
        label: "Final Reading",
        text: "Choose what happened, then compare the canonical answer with your route."
      }
    ],
    reminder:
      "You are not trying to expose Mara. You are deciding what can be known without turning her absence into another performance."
  },
  cast: [
    {
      id: "mara-vale",
      name: "Mara Vale",
      role: "Creator / Origin",
      known: "Left public life and asked people not to look for her here.",
      question: "Did Mara return, vanish, or separate from the account?",
      reveals: [
        {
          evidenceId: "witness-message",
          label: "Witness claim",
          detail: "Elian says Mara was seen alive after the farewell."
        },
        {
          evidenceId: "search-summary",
          label: "Public record",
          detail: "Search converts her exit into a simple return story."
        }
      ]
    },
    {
      id: "elian-vale",
      name: "Elian Vale",
      role: "Sibling / Witness",
      known: "A private witness whose refusal matters as much as their claim.",
      question: "What proof can Elian give without endangering Mara?",
      reveals: [
        {
          evidenceId: "witness-message",
          label: "Boundary",
          detail: "Elian refuses proof that would reveal where Mara went."
        },
        {
          evidenceId: "human-verification",
          label: "Gate clue",
          detail: "The gate asks what remains when visibility is gone."
        }
      ]
    },
    {
      id: "porchlight",
      name: "Porchlight",
      role: "Community / Moderators",
      known: "The audience space that turns Mara's exit into care, ritual, and pressure.",
      question: "When does care become a demand for continuity?",
      reveals: [
        {
          evidenceId: "porchlight-mod-log",
          label: "Aftercare queue",
          detail: "Real needs gather around Mara's absence before anyone knows the truth."
        },
        {
          evidenceId: "farewell-thread",
          label: "Ritual object",
          detail: "Her final line becomes the thing people keep repeating."
        }
      ]
    },
    {
      id: "resumed-account",
      name: "The Resumed Account",
      role: "Artifact / Performance",
      known: "The account begins posting again with Mara's warmth but less human friction.",
      question: "Is this Mara, a staged return, or an asset wearing her voice?",
      reveals: [
        {
          evidenceId: "account-resumes",
          label: "Wrong texture",
          detail: "Replies arrive too quickly and too cleanly."
        },
        {
          evidenceId: "sponsor-memo",
          label: "Asset trail",
          detail: "A continuity clause treats the account as transferable value."
        }
      ]
    },
    {
      id: "sponsor",
      name: "Sponsor / Contract Layer",
      role: "Exchange",
      known: "The money pressure is present before the document proving it is visible.",
      question: "Who benefits if person and account stay legally blurred?",
      reveals: [
        {
          evidenceId: "sponsor-memo",
          label: "Continuity clause",
          detail: "The memo does not require Mara's presence, only audience retention."
        },
        {
          evidenceId: "account-resumes",
          label: "Clean return",
          detail: "The resumed voice protects continuity better than a human exit would."
        }
      ]
    },
    {
      id: "search-oracle",
      name: "Search / Oracle",
      role: "Public Answer Machine",
      known: "The layer that decides which version becomes easiest to believe.",
      question: "What disappears when the summary gets too smooth?",
      reveals: [
        {
          evidenceId: "search-summary",
          label: "One answer",
          detail: "Search buries contradiction below the resumed account."
        },
        {
          evidenceId: "farewell-thread",
          label: "Original instruction",
          detail: "The goodbye becomes harder to hold beside the comeback."
        }
      ]
    },
    {
      id: "archive",
      name: "The Archive / You",
      role: "Investigator",
      known: "You decide what can be reconstructed without consuming the person at the center.",
      question: "Can the Archive preserve truth without becoming another capture system?",
      reveals: [
        {
          evidenceId: "human-verification",
          label: "Access test",
          detail: "The gate measures whether absence can count as evidence."
        },
        {
          evidenceId: "sponsor-memo",
          label: "Responsibility",
          detail: "Unlocking proof also means deciding how proof should be used."
        }
      ]
    }
  ],
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
  forceDescriptions: {
    Algorithm: "Visibility systems boost, bury, and repeat the version that travels best.",
    Oracle: "Search, summaries, and answer machines make one version feel settled.",
    Covenant: "Community bonds turn care, ritual, and belonging into pressure.",
    Silence: "Missing, hidden, refused, or removed evidence starts shaping the truth.",
    Exchange: "Money, contracts, ownership, and attention turn people into value.",
    Arbiter: "Rules and verification systems decide what counts as proof.",
    Wardens: "Moderators, locks, safety layers, and guards control access.",
    Devourer: "Attention consumes a person, grief, or truth as material.",
    Eidolon: "A copy or synthetic presence wears someone's familiar shape.",
    Returned: "A person or origin survives outside the record built around them."
  },
  evidence: [
    {
      id: "farewell-thread",
      type: "Public Post",
      date: "Day 0",
      title: "The Final Thread",
      body:
        "Mara Vale tells her audience she is leaving the Network. She says she is grateful, tired, and done turning her private life into useful material.\n\nThe post gives no backup account, no schedule, no sponsor link, and no promise to return. It ends with one plain instruction: do not look for me here.",
      expectedForces: ["Algorithm", "Covenant", "Returned"],
      relatedEvidence: ["witness-message", "search-summary"],
      contradictionWith: ["account-resumes", "search-summary"],
      recoveryCue: "If you are stuck, hold this beside the resumed account and search summary: what did Mara ask people not to do?",
      timeline: "Mara announces departure and asks not to be kept alive as content."
    },
    {
      id: "porchlight-mod-log",
      type: "Moderator Log",
      date: "Day 1",
      title: "Porchlight Aftercare Queue",
      body:
        "The Porchlight moderators pin a support thread within thirty minutes. People post goodbye notes, reading lists, and screenshots of the final line.\n\nBuried in the queue are ordinary requests Mara used to answer herself: a rent-assistance referral, a school form template, and one message asking whether anyone knows if she is safe. The ritual grows faster than the care.",
      expectedForces: ["Covenant", "Algorithm", "Silence"],
      relatedEvidence: ["farewell-thread", "witness-message"],
      recoveryCue: "This artifact is not proof of impersonation. It shows why the community needed an answer.",
      timeline: "The community turns Mara's exit into ritual before anyone knows where she is."
    },
    {
      id: "account-resumes",
      type: "Account Activity",
      date: "Day 9",
      title: "The Account Resumes",
      body:
        "Nine days after the final thread, the account posts again: a warm note about sustainable presence and community continuity.\n\nEvery comment receives a reply within ninety seconds. The replies use Mara's old phrases, but none of her old hesitations. No typos. No anger. No late-night edits.",
      expectedForces: ["Eidolon", "Covenant", "Exchange"],
      relatedEvidence: ["farewell-thread", "witness-message", "sponsor-memo"],
      contradictionWith: ["farewell-thread", "witness-message"],
      recoveryCue: "The wrongness is not just that the account returns. It is how cleanly it returns.",
      timeline: "The account resumes with a smoother voice than Mara's older public self."
    },
    {
      id: "witness-message",
      type: "Private Message",
      date: "Day 10",
      title: "Elian Refuses Proof",
      body:
        "Mara's sibling sends one private message to a former moderator: that is not my sister.\n\nElian does not claim Mara is dead. They claim they saw her after the final post, alive, thinner, happier, and angry about how quickly people turned her absence into a puzzle. The message includes one useless detail no model would need: Mara burned toast while explaining why proof would endanger her.",
      expectedForces: ["Returned", "Silence", "Covenant"],
      relatedEvidence: ["farewell-thread", "human-verification", "search-summary"],
      contradictionWith: ["account-resumes", "search-summary"],
      recoveryCue: "Elian refuses the kind of proof the Network can easily consume.",
      timeline: "A witness says Mara survived the exit and refuses to expose where she went."
    },
    {
      id: "human-verification",
      type: "Access Gate",
      date: "Day 10",
      title: "Human Verification Failed",
      body:
        "The archive asks for proof of Origin before it will reveal the transfer memo.\n\nIt is not asking whether you are human. It is asking whether you can identify the thing Mara still owns after the account, audience, and search results stop pointing cleanly at her.",
      expectedForces: ["Arbiter", "Wardens", "Returned"],
      relatedEvidence: ["farewell-thread", "witness-message"],
      recoveryCue: "The answer is not a place or identity record. It is what remains when visibility is gone.",
      timeline: "The archive gate measures whether absence can count as evidence.",
      puzzleId: "origin-code"
    },
    {
      id: "sponsor-memo",
      type: "Locked Memo",
      date: "Day 12",
      title: "Continuity Clause",
      body:
        "A sponsor memo describes the account as a continuity asset. The clause does not require Mara's presence. It requires voice consistency, audience retention, and scheduled delivery.\n\nOne line is highlighted by the archive: creator absence does not void continuity obligations where audience trust has transferable value.",
      expectedForces: ["Exchange", "Eidolon", "Arbiter"],
      relatedEvidence: ["account-resumes", "search-summary"],
      contradictionWith: ["witness-message"],
      recoveryCue: "This memo explains who benefits if the account and person stay legally blurred.",
      timeline: "The account is valued as an asset that can outlive the person attached to it.",
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
        "Search summaries describe Mara's departure as a brief recovery pause followed by a healthy return. They cite the resumed account, two brand interviews, and a community wiki updated after the comeback.\n\nThe original farewell post appears below reaction videos. Elian's message does not appear at all.",
      expectedForces: ["Oracle", "Silence", "Algorithm"],
      relatedEvidence: ["farewell-thread", "witness-message", "sponsor-memo"],
      contradictionWith: ["farewell-thread", "witness-message"],
      recoveryCue: "Search is not lying exactly. It is choosing which records become easy to believe.",
      timeline: "Search converts Mara's exit into a return story and buries the contradiction."
    }
  ],
  bonusEvidence: {
    Algorithm: {
      id: "bonus-algorithm-heat",
      type: "Route Surfaced",
      date: "Day 17",
      title: "Heat Map Of A Departure",
      body:
        "The Network kept boosting posts that quoted Mara's final line without the sentence before it. The full goodbye lost reach each time someone clipped it into a slogan.\n\nThe route did not change the truth. It changed which distortion became easiest to see.",
      expectedForces: ["Algorithm", "Silence"],
      timeline: "Visibility preserves the most portable fragment and weakens the rest."
    },
    Covenant: {
      id: "bonus-covenant-vigil",
      type: "Route Surfaced",
      date: "Day 17",
      title: "Vigil Thread Export",
      body:
        "A private Porchlight export shows members organizing check-ins, rent help, and grief rituals in the same thread. Care and capture sit inches apart.\n\nThe route did not change the truth. It changed which need became loudest.",
      expectedForces: ["Covenant", "Returned"],
      timeline: "Community care keeps people alive, but can also keep asking for a person who left."
    },
    Exchange: {
      id: "bonus-exchange-valuation",
      type: "Route Surfaced",
      date: "Day 17",
      title: "Audience Retention Valuation",
      body:
        "A valuation sheet prices Mara's absence as a temporary volatility event. The highest-risk scenario is not impersonation. It is audience recognition that the account and the person have separated.\n\nThe route did not change the truth. It changed which ownership trail surfaced first.",
      expectedForces: ["Exchange", "Arbiter"],
      timeline: "The account's value depends on keeping continuity legible."
    },
    Silence: {
      id: "bonus-silence-cache",
      type: "Route Surfaced",
      date: "Day 17",
      title: "Removed Cache Notice",
      body:
        "A removal notice lists three unavailable captures: the uncut farewell, Elian's first denial, and a moderation thread titled stop making her prove it.\n\nThe route did not change the truth. It changed which absence started speaking.",
      expectedForces: ["Silence", "Returned"],
      timeline: "Missing records form their own pattern when the same question keeps disappearing."
    },
    Eidolon: {
      id: "bonus-eidolon-latency",
      type: "Route Surfaced",
      date: "Day 17",
      title: "Reply Latency Trace",
      body:
        "A timing trace shows the resumed account answering grief, anger, and sponsorship questions at the same speed. No reply waits for discomfort. No answer arrives late.\n\nThe route did not change the truth. It changed which imitation flaw became visible.",
      expectedForces: ["Eidolon", "Exchange"],
      timeline: "The voice performs Mara's warmth without inheriting her friction."
    },
    Returned: {
      id: "bonus-returned-offline",
      type: "Route Surfaced",
      date: "Day 17",
      title: "Offline Errand Receipt",
      body:
        "A redacted receipt places an unnamed woman near Elian's town months after the final post. It proves almost nothing by itself, except that a life can leave weaker traces than an account.\n\nThe route did not change the truth. It changed which fragile proof you noticed.",
      expectedForces: ["Returned", "Silence"],
      timeline: "Mara's life outside visibility leaves small traces that cannot safely become spectacle."
    }
  },
  puzzles: [
    {
      id: "origin-code",
      type: "access-code",
      title: "Human Verification Failed",
      prompt:
        "The system asks for the phrase proved by Mara's final thread and Elian's refusal: what can still belong to a person after visibility is gone?",
      answer: "absence",
      acceptedAnswers: ["her absence", "mara's absence", "not being seen"],
      failure:
        "Access denied. The system rejects proof that depends on locating, verifying, or displaying Mara.",
      hints: [
        "The answer is not a location, account name, or identity document.",
        "Look at Mara's last instruction and Elian's refusal: what are they both protecting?"
      ],
      success:
        "Access granted. The system accepts absence as proof, but only after turning it into a code.",
      unlockMessage: "Continuity Clause surfaced from the locked transfer cache."
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
    "Mara Returned: she left the Network and survived outside public proof. Her account continued as an Artifact preserved by the Exchange, accepted by the Covenant, cleaned by the Arbiter, and made difficult to disprove by the Silence and Oracle.",
  pathReveals: {
    Algorithm: "You followed visibility. The Network taught you to notice what traveled furthest.",
    Covenant:
      "You followed belonging. You noticed grief, ritual, warmth, and the community's need for continuity.",
    Exchange: "You followed ownership. You noticed that the account was valuable even without the person.",
    Silence: "You followed absence. You noticed what became harder to find.",
    Eidolon:
      "You followed synthetic presence. You noticed impossible consistency where human texture used to be.",
    Returned: "You followed Origin. You noticed the signs of someone choosing life outside visibility.",
    Mixed:
      "Your path stayed contested. The case surfaced several explanations at once instead of collapsing cleanly into one signal.",
    Default: "Your path stayed mixed. You reached the case through several competing signals."
  }
};
