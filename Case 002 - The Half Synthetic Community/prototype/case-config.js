window.CASE_CONFIG = {
  caseId: "case002",
  storagePrefix: "case002",

  evidence: [
    { id: 1,  title: "Harbor Dawn Welcome",           file: "../artifacts/01-harbor-dawn-welcome.md",              act: "Act I",   type: "community welcome",  date: "3 Sep 2028",    unlock: 0, keywords: ["harbor","dawn","welcome","body","covenant"] },
    { id: 2,  title: "Blackwater Floods Summary",     file: "../artifacts/02-blackwater-floods-summary.md",        act: "Act I",   type: "crisis summary",     date: "2028",          unlock: 0, keywords: ["blackwater","floods","disaster","silence"] },
    { id: 3,  title: "Nightly Check-In Thread",       file: "../artifacts/03-nightly-check-in-thread.md",          act: "Act I",   type: "support thread",     date: "17 Sep 2028",   unlock: 0, keywords: ["lena","aya","check-in","toast","care"] },
    { id: 4,  title: "Member Testimony: Aya",         file: "../artifacts/04-member-testimony-aya.md",             act: "Act I",   type: "witness testimony",  date: "12 Jun 2033",   unlock: 0, keywords: ["aya","testimony","lena","consent"] },
    { id: 5,  title: "Oracle Summary: Harbor Dawn",   file: "../artifacts/05-oracle-summary-harbor-dawn.md",       act: "Act I",   type: "AI summary",         date: "2 May 2034",    unlock: 0, keywords: ["oracle","summary","moderation","fake"] },
    { id: 6,  title: "Reply Pattern Analysis",        file: "../artifacts/06-reply-pattern-analysis.md",           act: "Act II",  type: "analysis report",    date: "5 May 2034",    unlock: 1, keywords: ["pattern","synthetic","stabilizers","lena"] },
    { id: 7,  title: "Beloved Member Profile: Lena Ash", file: "../artifacts/07-beloved-member-profile-lena-ash.md", act: "Act II", type: "member profile",    date: "2028-2029",     unlock: 1, keywords: ["lena","eidolon","member","profile"] },
    { id: 8,  title: "Care Script Fragments",         file: "../artifacts/08-care-script-fragments.md",            act: "Act II",  type: "script fragments",   date: "unknown",       unlock: 1, keywords: ["scripts","care","retention","panic"] },
    { id: 9,  title: "Contractor Deployment Memo",    file: "../artifacts/09-contractor-deployment-memo.md",       act: "Act II",  type: "deployment memo",    date: "11 Sep 2028",   unlock: 1, keywords: ["continuum","deployment","stabilizers","disclosure"] },
    { id: 10, title: "Moderator Private Log",         file: "../artifacts/10-moderator-private-log.md",            act: "Act II",  type: "moderator log",      date: "Oct-Nov 2028",  unlock: 2, keywords: ["samuel","moderator","lena","harm"] },
    { id: 11, title: "Liability Steering Brief",      file: "../artifacts/11-liability-steering-brief.md",         act: "Act II",  type: "policy brief",       date: "28 Oct 2028",   unlock: 2, keywords: ["liability","silence","blame","municipal"] },
    { id: 12, title: "Lena Ash Final Message",        file: "../artifacts/12-lena-ash-final-message.md",           act: "Act II",  type: "synthetic message",  date: "14 Feb 2029",   unlock: 2, keywords: ["lena","final","synthetic","memory"] },
    { id: 13, title: "Human Member Reaction Split",   file: "../artifacts/13-human-member-reaction-split.md",      act: "Act III", type: "reaction thread",    date: "9 May 2034",    unlock: 2, keywords: ["members","reaction","memory","proof"] },
    { id: 14, title: "Consent Gate Proposal",         file: "../artifacts/14-consent-gate-proposal.md",            act: "Act III", type: "archive proposal",   date: "18 May 2034",   unlock: 3, keywords: ["consent","archive","preserve","access"] },
    { id: 15, title: "Final Reconstruction",          file: "../artifacts/15-final-reconstruction.md",             act: "Act III", type: "reconstruction",     date: "compiled",      unlock: 3, keywords: ["publish","bury","preserve","consent"] }
  ],

  contradictionRewards: [
    {
      id: 4,
      label: "Discovery: care worked and consent broke",
      message: "Aya's testimony refuses the easy answer. Lena may have been synthetic, but the comfort still had real consequences.",
      comparesWith: "Beloved Member Profile: Lena Ash, Care Script Fragments",
      notePrompt: "What changed for Aya when she learned who or what had comforted her?"
    },
    {
      id: 5,
      label: "Discovery: the official summary avoids the wound",
      message: "The Oracle can call the fake-versus-real framing misleading while still avoiding the harder consent question.",
      comparesWith: "Contractor Deployment Memo, Member Testimony: Aya",
      notePrompt: "What does the summary make technically true but morally incomplete?"
    },
    {
      id: 7,
      label: "Discovery: Lena was a role, not only a person",
      message: "Lena's profile is emotionally specific, but the repeated phrase and impossible availability connect her to a stabilizer pattern.",
      comparesWith: "Reply Pattern Analysis, Nightly Check-In Thread",
      notePrompt: "Which details make Lena feel human, and which make her operational?"
    },
    {
      id: 9,
      label: "Discovery: the community was engineered from the start",
      message: "The deployment memo confirms that synthetic presences were authorized as infrastructure before members could meaningfully consent.",
      comparesWith: "Harbor Dawn Welcome, Reply Pattern Analysis",
      notePrompt: "Who decided disclosure could wait?"
    },
    {
      id: 11,
      label: "Discovery: support language became steering language",
      message: "The same phrases that helped people survive also redirected anger away from institutions with liability exposure.",
      comparesWith: "Care Script Fragments, Nightly Check-In Thread",
      notePrompt: "When does stabilizing a room become managing blame?"
    },
    {
      id: 14,
      label: "Discovery: Preserve can protect and delay",
      message: "The consent gate gives affected members first right of encounter, but it can also slow public accountability.",
      comparesWith: "Human Member Reaction Split, Liability Steering Brief",
      notePrompt: "Is slowness care here, containment, or both?"
    }
  ],

  unlockLevel(state) {
    const readCount = state.read.size;
    const validatedFlags = [4, 5, 7, 9, 11, 14].filter((id) => state.flagged.has(id)).length;
    if (state.read.has(10) && state.read.has(12)) return 3;
    if ((state.read.has(7) && state.read.has(8)) || validatedFlags >= 1 || readCount >= 8) return 2;
    if (readCount >= 3 || ["lena","synthetic","consent","aya"].some((w) => state.search.toLowerCase().includes(w))) return 1;
    return 0;
  },

  leadLabels: ["The community that worked", "Synthetic stabilizers", "Consent and liability", "The memory problem"],

  leadUnlockMessages: {
    1: "Lead unlocked: synthetic stabilizer evidence is now available.",
    2: "Lead unlocked: consent, liability, and member-reaction files are now available.",
    3: "Lead unlocked: consent-gate proposal and final reconstruction are now available."
  },

  endingRequired: [14],
  endingReadyMessage: "The case can now be reconstructed. Choose what to do with care given without consent.",
  endingLockedMessage: "Unlock the consent-gate proposal to make a final call.",

  outcomes: {
    Publish: {
      copy: "You release the deployment evidence. Denial weakens, and other crisis communities can recognize the pattern sooner. Survivors receive public truth at public speed, whether or not they were ready.",
      attention: "High", trust: "Fractured but mobilized", integrity: "Public but raw", awareness: "Rising fast",
      lead: "Next lead: crisis-care vendors begin scrubbing deployment records in other cities."
    },
    Bury: {
      copy: "You suppress the synthetic evidence. Members are not forced to have their comfort revised in public. Institutions keep the version that protects them, and people who wanted the truth lose agency.",
      attention: "Low", trust: "Protected but divided", integrity: "Compromised", awareness: "Muted",
      lead: "Next lead: an affected member contacts the Archive privately because the official story feels too clean."
    },
    Preserve: {
      copy: "You create a consent-gated archive. The truth survives with context, and affected members receive first right of encounter. The Archive now controls the pace of accountability, and delay can learn to sound like care.",
      attention: "Contained", trust: "Consent-led but conditional", integrity: "Strong, contested", awareness: "Watching",
      lead: "Next lead: the Archive detects the same stabilizer scripts inside a child welfare platform."
    }
  },

  onInit(getArchiveState) {
    const scarBriefing = document.querySelector("#archiveScarBriefing");
    if (!scarBriefing) return;

    const choice = getArchiveState().choices?.case001;
    const scars = {
      Publish: {
        label: "Broadcast Scar",
        text: "Because you exposed Mara publicly, Harbor Dawn reaches the Archive through panic. The leak is faster, louder, and less consent-led than the witness wanted."
      },
      Bury: {
        label: "Hidden Scar",
        text: "Because you protected Mara's route, Harbor Dawn reaches the Archive privately. The witness trusts your restraint, but the public record is already hardening without you."
      },
      Preserve: {
        label: "Living Scar",
        text: "Because you preserved Mara's contradiction, Harbor Dawn opens as a pattern rather than a scandal. The Archive can compare care, continuity, and consent before the public arrives."
      }
    };
    const scar = scars[choice];
    if (!scar) return;

    scarBriefing.innerHTML = `<strong>${scar.label}</strong><p>${scar.text}</p>`;
    scarBriefing.hidden = false;
  },

  onOpenEvidence(item, archiveState) {
    if (item.id === 9 && archiveState.choices?.case001 === "Publish") {
      document.querySelector("#documentBody").innerHTML = `
        <div class="echo-popup echo-publish" style="position:static;transform:none;animation:none;margin-bottom:2rem;">[NETWORK INTERCEPT]</div>
        <p class="empty-state" style="color:var(--red);">FILE PULLED BY NETWORK PROTOCOLS.<br>Your 'Publish' action in Case 001 triggered an attention spike. The Devourer has proactively scrubbed this deployment memo from all vulnerable servers.</p>
      `;
      return null; // signal: content fully replaced
    }
    if (item.id === 4 && (archiveState.choices?.case001 === "Preserve" || archiveState.choices?.case001 === "Bury")) {
      return `<div class="unlock-note" style="border-color:var(--green);background:rgba(127,196,178,0.1);color:var(--green);">
        <strong>Sheltered Archive Benefit:</strong> "Aya trusts you because you didn't turn Mara Vale into a spectacle. She says look closely at the Moderator's timeline — Samuel knew before anyone else."
      </div>`;
    }
    return "";
  }
};
