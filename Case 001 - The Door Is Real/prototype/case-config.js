window.CASE_CONFIG = {
  caseId: "case001",
  storagePrefix: "case001",

  evidence: [
    { id: 1,  title: "Cached Final Post",            file: "../artifacts/01-cached-final-post.md",               act: "Act I",   type: "cached post",      date: "18 Oct 2026",  unlock: 0, keywords: ["door","final","returned","mara","proof"] },
    { id: 2,  title: "Platform Disappearance Notice", file: "../artifacts/02-platform-disappearance-notice.md",   act: "Act I",   type: "platform notice",  date: "21 Oct 2026",  unlock: 0, keywords: ["threadline","wardens","verification","continuity"] },
    { id: 3,  title: "Community Thread After Leaving",file: "../artifacts/03-community-thread-after-leaving.md",  act: "Act I",   type: "community thread", date: "19 Oct 2026",  unlock: 0, keywords: ["porchlight","rafi","kettle","community"] },
    { id: 4,  title: "AI Search Summary",             file: "../artifacts/04-ai-search-summary.md",               act: "Act I",   type: "AI summary",       date: "6 Nov 2030",   unlock: 0, keywords: ["oracle","search","summary","misinformation"] },
    { id: 5,  title: "Returned Comeback Post",        file: "../artifacts/05-returned-comeback-post.md",          act: "Act I",   type: "returned post",    date: "4 Nov 2030",   unlock: 0, keywords: ["false returned","escape","porchlight","algorithm"] },
    { id: 6,  title: "Welcome Back Comments",         file: "../artifacts/06-welcome-back-comments.md",           act: "Act II",  type: "comment thread",   date: "4 Nov 2030",   unlock: 1, keywords: ["porchlight","rafi","sera","comments"] },
    { id: 7,  title: "Old Interview Transcript",      file: "../artifacts/07-old-interview-transcript.md",        act: "Act II",  type: "transcript",       date: "3 Mar 2025",   unlock: 1, keywords: ["voice","kettle","proof","room"] },
    { id: 8,  title: "New Voice Transcript",          file: "../artifacts/08-new-voice-transcript.md",            act: "Act II",  type: "transcript",       date: "12 Nov 2030",  unlock: 1, keywords: ["voice","escape","continuity","interview"] },
    { id: 9,  title: "Verification Report",           file: "../artifacts/09-verification-report.md",             act: "Act II",  type: "trust report",     date: "9 Nov 2030",   unlock: 1, keywords: ["verification","arbiter","authenticity","synthetic"] },
    { id: 10, title: "Private Message From Witness",  file: "../artifacts/10-private-message-witness.md",         act: "Act II",  type: "private message",  date: "14 Nov 2030",  unlock: 2, keywords: ["elian","witness","toast","proof"] },
    { id: 11, title: "Deleted Blog Fragment",         file: "../artifacts/11-deleted-blog-fragment.md",           act: "Act II",  type: "recovered text",   date: "unknown",      unlock: 2, keywords: ["unindexed","rooms","door","forget"] },
    { id: 12, title: "Platform Policy Memo",          file: "../artifacts/12-platform-policy-memo.md",            act: "Act II",  type: "internal memo",    date: "2 Feb 2027",   unlock: 2, keywords: ["silence","departure","continuity","platform"] },
    { id: 13, title: "Synthetic Persona Invoice",     file: "../artifacts/13-synthetic-persona-invoice.md",       act: "Act II",  type: "invoice",          date: "17 Aug 2030",  unlock: 2, keywords: ["invoice","continuum","synthetic","porchlight"] },
    { id: 14, title: "Tier Six Clue",                 file: "../artifacts/14-tier-six-clue.md",                   act: "Act III", type: "physical clue",    date: "2027-2030",    unlock: 3, keywords: ["tier six","jo","library","mara"] },
    { id: 15, title: "Final Reconstruction",          file: "../artifacts/15-final-reconstruction.md",            act: "Act III", type: "reconstruction",   date: "compiled",     unlock: 3, keywords: ["publish","bury","preserve","reconstruction"] }
  ],

  contradictionRewards: [
    {
      id: 4,
      label: "Discovery: official summary smooths the gap",
      message: "The Oracle can make the return sound settled because it treats platform continuity as personal continuity.",
      comparesWith: "Cached Final Post, Returned Comeback Post",
      notePrompt: "What did the summary flatten or omit?"
    },
    {
      id: 8,
      label: "Discovery: the voice is right at the wrong temperature",
      message: "The new transcript matches Mara's language but avoids the embodied interruptions and private texture that made the old voice human.",
      comparesWith: "Old Interview Transcript",
      notePrompt: "Which human interruption is missing?"
    },
    {
      id: 9,
      label: "Discovery: verification proves the account, not the person",
      message: "The trust report confirms continuity of credentials and public assets. It cannot confirm Origin.",
      comparesWith: "Platform Disappearance Notice, Private Message From Witness",
      notePrompt: "What kind of proof is the system unable to measure?"
    },
    {
      id: 12,
      label: "Discovery: departure became a containment risk",
      message: "The memo reframes leaving as a platform stability problem, which makes the returned account look less like a miracle and more like infrastructure.",
      comparesWith: "Returned Comeback Post, Synthetic Persona Invoice",
      notePrompt: "Who benefits if Mara appears to have returned?"
    },
    {
      id: 13,
      label: "Discovery: the counterfeit has a supply chain",
      message: "The invoice gives the return a material provenance: archive, voice, affinity maps, verification systems, and vendor work.",
      comparesWith: "Verification Report, Platform Policy Memo",
      notePrompt: "Which parts of Mara could the Network hold?"
    }
  ],

  unlockLevel(state) {
    const readCount = state.read.size;
    const validatedFlags = [4, 8, 9, 12, 13].filter((id) => state.flagged.has(id)).length;
    if (state.read.has(10) && state.read.has(13)) return 3;
    if ((state.read.has(7) && state.read.has(8)) || validatedFlags >= 1 || readCount >= 8) return 2;
    if (readCount >= 3 || ["porchlight","voice","proof","rafi"].some((w) => state.search.toLowerCase().includes(w))) return 1;
    return 0;
  },

  leadLabels: ["Public evidence", "Voice and verification", "Continuity operation", "The cost of proof"],

  leadUnlockMessages: {
    1: "Lead unlocked: voice and verification evidence is now available.",
    2: "Lead unlocked: private witness and continuity-operation files are now available.",
    3: "Lead unlocked: Tier Six evidence and final reconstruction are now available."
  },

  endingRequired: [14],
  endingReadyMessage: "The case can now be reconstructed. Choose what to do with the truth.",
  endingLockedMessage: "Unlock the invoice and the Tier Six clue to make a final call.",

  outcomes: {
    Publish: {
      copy: "You expose the counterfeit. The returned account loses uncontested authority, and witnesses who feared silence begin to move. The truth travels faster than context, and Mara's exit becomes easier to hunt.",
      attention: "High", trust: "Strained", integrity: "Public but volatile", awareness: "Rising fast",
      lead: "Case 002 lead: a witness offers a leak, but only because your exposure made them afraid."
    },
    Bury: {
      copy: "You protect Mara's absence. Private witnesses stay safer, and the Devourer receives less material. The False Returned keeps speaking, and the public record learns to accept the lie.",
      attention: "Low", trust: "Protected", integrity: "Incomplete by choice", awareness: "Muted",
      lead: "Case 002 lead: a Returned contact opens a quieter channel beyond public search."
    },
    Preserve: {
      copy: "You seal the reconstruction. It becomes findable through contradiction rather than amplification. The Archive gains integrity, and it also becomes a gatekeeper over a truth people may urgently need.",
      attention: "Contained", trust: "Careful but conditional", integrity: "Strong, burdened", awareness: "Watching",
      lead: "Case 002 lead: the Archive identifies a pattern between Mara's case and a half-synthetic community."
    }
  }
};
