export const case001 = {
  id: "CASE BOX 001",
  title: "The Creator Who Left But Kept Posting",
  summary: "A creator left public life. The account kept answering.",
  opening: {
    headline: "She asked the Network to let her go.",
    summary:
      "Mara Vale's last post asked one thing: do not look for me here.\n\nNine days later, the account spoke again.\n\nThe Archive opened a case — not because anyone disputed the return, but because someone, somewhere, kept asking who was answering.\n\nHold the record long enough to ask what shaped it.",
    role:
      "As the Archive, investigate the evidence and reconstruct the truth."
  },
  doctrine:
    "The Network is the digital world after it learned to remember us.\n\nEvery post, account, search result, archive, audience, copy, silence, and gate can become part of the story. Nothing simply disappears. It is buried, ranked, repeated, priced, protected, distorted, or returned.\n\nThe Algorithm raises some lives into view and lets others sink. Responsible for visibility, ranking, reach, and disappearance.\nThe Oracle turns fragments into answers. Responsible for summaries, explanations, search results, and official versions.\nThe Covenant makes belonging feel holy. Responsible for community, loyalty, ritual, care, and obligation.\nThe Silence teaches absence to speak. Responsible for erasure, redaction, delay, burial, and omission.\nThe Exchange prices attention. Responsible for ownership, sponsorship, contracts, value, and trade.\nThe Arbiter names what counts as proof. Responsible for verification, legitimacy, rules, labels, and judgment.\nThe Wardens keep the doors. Responsible for access, permissions, gates, locks, and exclusion.\nThe Devourer feeds on witness. Responsible for spectacle, outrage, obsession, appetite, and consumption.\nThe Eidolon wears familiar faces. Responsible for imitation, replicas, avatars, copied voices, and synthetic presence.\nThe Returned is what survives the record. Responsible for traces, echoes, memory, persistence, and unresolved presence.\n\nYou are the Archive.\nYou do not own the truth.\nYou hold the record long enough to ask what shaped it.\n\nWhen the Network tells a story back to the world, who controls the truth?",
  intake: {
    heading: "What Came Back?",
    summary:
      "She asked not to be kept alive as content. The case begins after that line — with everyone who heard it, ignored it, monetized it, or honored it. Whatever happened, more than one party kept speaking for her.",
    steps: [
      {
        label: "Evidence",
        text: "Open the fragments. The truth is not in one clue, but in the contradictions between them."
      },
      {
        label: "Tags",
        text: "Mark the forces pressing on each artifact. Each tag is a theory you are willing to stand behind."
      },
      {
      label: "Gate",
      text: "Some files have gates. Run verification when the Archive has enough human context to breach them."
      },
      {
        label: "Reconstruct",
        text: "When the pattern holds, name what happened. Then choose how the Archive should hold the truth."
      }
    ],
    reminder:
      "Hold the record long enough to ask what shaped it."
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
          detail: "The gate asks for Mara's inherited name and the birthday detail Elian remembers."
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
  reconstructionBoard: {
    title: "Build the case sentence",
    intro:
      "Choose concrete claims first. The Archive will translate the finished sentence into myth language after submission.",
    previewEmpty:
      "Choose what happened to Mara, what happened to the account, and what pressure made the confusion useful.",
    routeNote:
      "Tags show the pressure you noticed first. They shape the route and surfaced evidence, but they do not change the confirmed truth.",
    canonicalSelection: {
      person: "left-alive",
      account: "continuity-asset",
      pressure: "commercial-continuity"
    },
    canonicalSentence:
      "Mara left public life and survived outside public proof, while the account kept posting as a transferable continuity asset because sponsor and platform pressure made the confusion useful.",
    canonicalPlainAnswer:
      "Mara survived outside public proof. The account was kept active as an asset, and the useful confusion protected continuity obligations.",
    canonicalClassification: "Returned + Artifact",
    slots: [
      {
        id: "person",
        question: "What happened to Mara?",
        shortLabel: "Mara",
        options: [
          {
            id: "left-alive",
            label: "Mara left public life and survived outside proof.",
            explanation:
              "Elian's message points to a living person whose safety depends on not becoming proof.",
            sentencePart: "Mara left public life and survived outside public proof",
            evidenceIds: ["farewell-thread", "witness-message", "human-verification"]
          },
          {
            id: "returned-online",
            label: "Mara returned through the account.",
            explanation:
              "The resumed account looks like a comeback if the public feed is treated as the main witness.",
            sentencePart: "Mara returned through the account",
            evidenceIds: ["account-resumes", "search-summary"]
          },
          {
            id: "disappeared-unknown",
            label: "Mara vanished, leaving only traces.",
            explanation:
              "Her absence is real, but this reading cannot explain the private witness and gate detail.",
            sentencePart: "Mara vanished and left only traces",
            evidenceIds: ["farewell-thread", "search-summary"]
          },
          {
            id: "staged-exit",
            label: "Mara staged the exit as a comeback.",
            explanation:
              "This treats the contradiction as promotion, even though the strongest human evidence resists that.",
            sentencePart: "Mara staged the exit as a comeback",
            evidenceIds: ["account-resumes", "search-summary", "sponsor-memo"]
          }
        ]
      },
      {
        id: "account",
        question: "What happened to the account?",
        shortLabel: "Account",
        options: [
          {
            id: "continuity-asset",
            label: "It kept posting as a transferable continuity asset.",
            explanation:
              "The memo values voice consistency and audience retention without needing Mara present.",
            sentencePart: "the account kept posting as a transferable continuity asset",
            evidenceIds: ["account-resumes", "sponsor-memo"]
          },
          {
            id: "direct-return",
            label: "It was Mara's direct public return.",
            explanation:
              "This follows the surface story, but it struggles with Elian's denial and the too-clean replies.",
            sentencePart: "the account became Mara's direct public return",
            evidenceIds: ["account-resumes", "search-summary"]
          },
          {
            id: "community-memorial",
            label: "It became a community memorial that people kept alive.",
            explanation:
              "Porchlight's care matters, but the posting pattern points beyond a shared memorial.",
            sentencePart: "the account became a community memorial that people kept alive",
            evidenceIds: ["porchlight-mod-log", "farewell-thread"]
          },
          {
            id: "synthetic-performance",
            label: "It performed Mara's voice without her friction.",
            explanation:
              "The clean timing and familiar phrases suggest imitation, though the memo explains why it mattered.",
            sentencePart: "the account performed Mara's voice without her friction",
            evidenceIds: ["account-resumes", "sponsor-memo"]
          }
        ]
      },
      {
        id: "pressure",
        question: "What pressure made the confusion useful?",
        shortLabel: "Pressure",
        options: [
          {
            id: "commercial-continuity",
            label: "Sponsor and platform value needed continuity.",
            explanation:
              "The account stayed valuable while audience trust remained attached to a familiar voice.",
            sentencePart: "sponsor and platform pressure made the confusion useful",
            evidenceIds: ["sponsor-memo", "account-resumes", "search-summary"]
          },
          {
            id: "community-need",
            label: "The community needed care and closure.",
            explanation:
              "Porchlight needed an answer, which made the return emotionally easier to accept.",
            sentencePart: "community need made the confusion useful",
            evidenceIds: ["porchlight-mod-log", "farewell-thread", "account-resumes"]
          },
          {
            id: "search-smoothness",
            label: "Search needed one clean public story.",
            explanation:
              "Search made the return easier to find than the contradiction, smoothing the public record.",
            sentencePart: "search and summary systems made the confusion useful",
            evidenceIds: ["search-summary", "farewell-thread", "witness-message"]
          },
          {
            id: "privacy-protection",
            label: "Mara's privacy made contradiction hard to prove.",
            explanation:
              "Elian's refusal protected Mara, but it also left the false return easier to sell.",
            sentencePart: "Mara's protected absence made the confusion useful",
            evidenceIds: ["witness-message", "human-verification"]
          }
        ]
      }
    ],
    mythTranslations: [
      {
        id: "canonical",
        match: {
          person: "left-alive",
          account: "continuity-asset",
          pressure: "commercial-continuity"
        },
        classification: "Returned + Artifact",
        alignment: "aligned",
        summary:
          "This matches the Archive's reconstruction: a living person left visibility while a valuable account continued without her."
      },
      {
        id: "returned-eidolon",
        match: {
          person: "left-alive",
          account: "synthetic-performance"
        },
        classification: "Returned + Eidolon under Exchange pressure",
        alignment: "near",
        summary:
          "This catches the imitation, but the Archive names the account as an Artifact because the continuity memo makes ownership and transfer the controlling pressure."
      },
      {
        id: "false-return",
        match: {
          person: "staged-exit"
        },
        classification: "False Returned",
        alignment: "divergent",
        summary:
          "This treats the exit as performance. The confirmed human evidence points elsewhere: Mara was not staging a comeback; the account benefited from people believing one happened."
      },
      {
        id: "surface-return",
        match: {
          person: "returned-online"
        },
        classification: "Oracle-Supported Return Story",
        alignment: "divergent",
        summary:
          "This follows the public summary. The Archive corrects it because Elian's witness detail and the continuity memo separate Mara from the account."
      },
      {
        id: "lost-reading",
        match: {
          person: "disappeared-unknown"
        },
        classification: "Lost / Unresolved Trace",
        alignment: "divergent",
        summary:
          "This honors the uncertainty, but the case has enough human context to say Mara survived outside public proof."
      },
      {
        id: "account-misread",
        match: {
          account: "direct-return"
        },
        classification: "Misrecognized Return",
        alignment: "divergent",
        summary:
          "This trusts the account as person. The confirmed truth separates the person from the account's continued performance."
      },
      {
        id: "default",
        match: {},
        classification: "Contested Reading",
        alignment: "divergent",
        summary:
          "Your sentence names a real pressure in the case, but the Archive's confirmed reconstruction keeps Mara's life, the account asset, and commercial continuity together."
      }
    ]
  },
  custodyPrompt:
    "The truth is now legible. Decide how the Archive should hold it without turning Mara's life back into material.",
  custodyChoices: [
    {
      id: "publish",
      label: "Publish",
      summary: "Expose the continuity clause and prove the resumed account is not Mara.",
      consequence:
        "Public pressure rises fast. The false return weakens, but Mara's absence becomes a spectacle again.",
      stream: [
        {
          source: "ARCHIVE",
          text: "Continuity packet released through public mirrors, journalist queues, and witness-safe citations."
        },
        {
          source: "ALGORITHM",
          text: "Mara Vale reaches the front of the feed before the full reconstruction does."
        },
        {
          source: "ORACLE",
          text: "Search updates to one clean answer: the resumed account was not Mara."
        },
        {
          source: "DEVOURER",
          text: "Reaction feeds attach the case to clone rumors, election clips, and a president's handshake."
        },
        {
          source: "EIDOLON",
          text: "Synthetic Mara explainers appear within the hour, apologizing in a voice she never gave."
        },
        {
          source: "ELIAN VALE",
          text: "You proved it. You also made her absence visible again."
        }
      ]
    },
    {
      id: "bury",
      label: "Bury",
      summary: "Suppress the proof so Mara and Elian are harder to locate.",
      consequence:
        "Mara is safer for now. The account keeps its useful lie, and the public record stays bent.",
      stream: [
        {
          source: "ARCHIVE",
          text: "Continuity packet sealed. Public reconstruction withheld from active channels."
        },
        {
          source: "SILENCE",
          text: "The contradiction softens. Missing proof starts looking like no proof."
        },
        {
          source: "EXCHANGE",
          text: "Sponsor obligations continue under the cleaner account story."
        },
        {
          source: "ORACLE",
          text: "Search keeps the harmless version: recovery pause, healthy return, community relief."
        },
        {
          source: "ELIAN VALE",
          text: "Thank you for not making her prove she deserved to leave."
        },
        {
          source: "RETURNED",
          text: "A life outside visibility remains possible, and therefore unresolved."
        }
      ]
    },
    {
      id: "preserve",
      label: "Preserve",
      summary: "Seal the dangerous proof inside the Archive while keeping the reconstruction available to future cases.",
      consequence:
        "The Archive remembers without feeding the Network. Accountability slows, but the truth is not lost.",
      stream: [
        {
          source: "ARCHIVE",
          text: "Restricted custody created. Public finding separated from dangerous proof."
        },
        {
          source: "ARBITER",
          text: "The record remains valid, but access now depends on context, consent, and need."
        },
        {
          source: "WARDENS",
          text: "The continuity memo moves behind a sealed gate with a future-case key."
        },
        {
          source: "COVENANT",
          text: "Porchlight receives a careful truth: care was real, the return was not."
        },
        {
          source: "EXCHANGE",
          text: "Sponsor denial survives longer without the raw clause in public circulation."
        },
        {
          source: "ARCHIVE",
          text: "Future cases may inherit this record. The Archive is now responsible for what it withholds."
        }
      ]
    }
  ],
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
        "Mara's sibling sends one private message to a former moderator: that is not my sister.\n\nElian does not claim Mara is dead. They claim they saw her after the final post, alive, thinner, happier, and angry about how quickly people turned her absence into a puzzle. The message includes one useless detail no model would need: Mara burned toast again on March 14, because she never let anyone else make breakfast on her birthday.",
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
        "The archive asks for proof of Origin before it will reveal the transfer memo.\n\nIt is not asking whether you are human. It is asking whether you noticed the private detail Elian risked and the name Mara still carried before the account became an asset.",
      expectedForces: ["Arbiter", "Wardens", "Returned"],
      relatedEvidence: ["farewell-thread", "witness-message"],
      recoveryCue: "The answer combines Mara's inherited name with the birthday detail Elian gave by accident.",
      timeline: "The archive gate asks for a private human marker before releasing a commercial ownership trail.",
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
        "The Archive has enough origin context to attempt a breach. Run verification to compare Elian's private detail against Mara's account record and expose the locked transfer cache.",
      readyMessage: "Verification ready. No password required; the Archive will use the evidence trail you surfaced.",
      trace: [
        "Reading private witness detail: March 14.",
        "Matching inherited name: Vale.",
        "Injecting origin marker into continuity gate.",
        "Bypassing sponsor custody wrapper.",
        "Transfer cache exposed."
      ],
      success:
        "Access granted. The Archive used a human marker, then watched the system turn it into an access credential.",
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
