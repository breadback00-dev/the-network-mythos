---
title: "The Network Mythos: Enter the Network - Plan"
type: feat
date: 2026-09-07
artifact_contract: ce-unified-plan/v1
artifact_readiness: implementation-ready
product_contract_source: ce-plan-bootstrap
execution: code
scope: "Engine proof and complete Mara chapter; later campaign is a roadmap"
research_as_of: 2026-09-07
revision: 2
revision_focus: "Relationships, character agency, causal encounters, and remembered choices"
---

# The Network Mythos: Enter the Network - Plan

## Goal Capsule

Build a 3D narrative adventure in which the player enters the Network, encounters the forces that shape it, and decides what to do with truths that can help or harm real people.

**The player promise:** Follow a strange message into a world that manufactures reality. Learn how its inhabitants work. Find out what happened to the person behind the story. Decide what deserves to become public.

The recommended next release is a complete, compact adaptation of **Mara Vale — The Door Is Real**, designed for approximately 30–45 minutes on a first playthrough. This is a playtest target, not a demonstrated duration. It should prove a larger game can work: movement, atmosphere, encounters, investigation, media, and consequences in one connected experience.

**Planning baseline:** Desktop PC, first person, single player, stylized 3D, with Godot as the initial engine candidate. These are recommendations, not preferences already confirmed by the user. An optional platform question remains unanswered; desktop is the working assumption. The engine commitment follows an early playable proof. No game engine or hardware benchmark was run during this planning work.

**Target repository:** [breadback00-dev/the-network-mythos](https://github.com/breadback00-dev/the-network-mythos). All implementation paths are relative to this repository.

This plan supersedes the earlier room-focused next-version plan for future development. The existing browser game and 3D room demo remain reference builds. The implementation-ready scope is U1–U13 below; later chapters and expansion options require their own production plans.

## Product Contract

### Summary

The Archive becomes a place the player returns to between expeditions. Beyond it are connected Network spaces shaped by verification, attention, belonging, commerce, and memory. The Oracle interprets what happened; the Arbiter decides which identities and credentials count; other roles govern different parts of life inside the system.

Players advance by understanding these roles and using evidence in encounters. A voice message may contain a personal inconsistency. A short video may reveal how a public account was reconstructed. A meme may lead back to a manipulated source. An apparently authoritative avatar may make a claim its own records cannot support.

The world should feel mysterious, intimate, sometimes funny, and unsettling. Synthetic beings can care. Human institutions can deceive. The player must judge actions, provenance, and consequences rather than appearances. Its central dramatic tension is **a person's right to change or leave versus other people's desire to keep the relationship they remember**. Each power offers something people need, then encounters limits or pressures that can turn that service against them. Their conflicting interests give the player room to act.

### Problem Frame

The existing project has a strong thematic foundation and four authored mysteries. Its dossier format foregrounds reading and classification. The current 3D demo makes evidence spatial, but does not yet establish a substantial world to explore or let the wider mythos act on the player.

The user's feedback identifies three connected gaps: more narrative momentum, a stronger 3D experience, and a meaningful place for the roles and avatars. Adding more documents, decorative models, or extra rooms would leave those gaps unresolved.

The proposed change makes the mythos part of the action. **This is a deliberate new interpretation of the setting.** Existing design documents emphasize mythic language grounded in real systems and discourage a fantasy interface. This plan allows embodied encounters inside the Network while preserving the connection to human experience. It does not assume that every metaphor was already a literal creature in the canon.

The central risk is a beautiful world whose encounters still amount to reading a menu. The first release must test whether observing, questioning, presenting evidence, and choosing a response are satisfying activities in their own right.

### Requirements

The R identifiers below belong to this plan only; they do not inherit meanings from earlier plans.

| ID | Required player outcome | First-release acceptance |
|---|---|---|
| R1 | Understand who they are and why Mara matters. | Opening establishes the Archivist's work, Rafi's request, and Elian's concern through an event and a short exchange before extended exposition. |
| R2 | Explore a connected 3D world with clear navigation. | Four compact spaces support free movement, revisits, readable landmarks, and a reliable return to the Archive. |
| R3 | Experience mythos roles through distinct behaviour. | Oracle and Arbiter each have a complete evidence-driven encounter; a Warden demonstrates enforcement. Their functions are distinguishable without reading a glossary. |
| R4 | Investigate a fair mystery. | Three discoveries require relevant evidence and a defensible explanation. Viewing documents or collecting arbitrary quantities cannot solve them. |
| R5 | Understand what is observed, claimed, and reconstructed. | Evidence retains source ancestry and uncertainty. An avatar's assertion or a reconstructed scene cannot silently become independent confirmation. |
| R6 | Use contemporary media as playable evidence. | At least one voice message, one vertical short video, and one meme/repost chain each support a specific discovery or useful lead. Players can replay, inspect, and pin relevant moments. |
| R7 | Care about the people affected. | Rafi and Elian respond to progress; Mara is presented as a person with habits and intentions beyond her public account. |
| R8 | Make an informed consequential choice. | Publish, Bury, and Preserve each state what happens to evidence and have an authored benefit, cost, and visible aftermath. Private context is a separate explicit decision. |
| R9 | See the result persist. | The Archive, witness response, and case history reflect the committed ending after leaving and reopening the game. |
| R10 | Investigate comfortably through different input and sensory routes. | Remapping, controller support, readable interfaces, captions, equivalent evidence descriptions, adjustable camera comfort, and pause are available in the exported build. |
| R11 | Complete the chapter reliably offline. | Packaged content, recoverable saves, understandable media failures, and no dependency on social accounts or live AI services. |
| R12 | Recognize a larger world beyond this chapter. | An encounter journal and Archive map situate discovered people, roles, and places; subsequent cases have clear thematic destinations without an opening lore dump. |
| R13 | Experience a coherent art and sound direction. | Key spaces and major avatars have distinct silhouettes, motion, materials, sound, and interaction cues that remain readable at the agreed performance tier. |
| R14 | Change relationships through actions with observable causes. | An Oracle correction creates a bounded review request, presenting that request changes the Arbiter/Warden encounter, and the player's disclosure decisions alter the community and witness response. Every reaction has a known information source. |
| R15 | Express a position before the final ending and have it remembered fairly. | A voluntary assurance to Elian and a choice about sharing D1 have later, explicitly attributable responses. Neither choice changes the underlying facts or permanently blocks essential evidence. |

### The player, story, and world

**Recommended player role: the Archivist.** The player recovers disputed histories and controls what leaves the Archive. Their authority comes from keeping inspectable sources and honoring declared limits; they cannot pronounce someone real, order the powers to obey, or override another person's consent. Their immediate personal stake is responsibility for the people whose records they handle. A detailed missing-relative backstory or predetermined identity twist is not needed to start. If added later, it must strengthen the cases rather than make every stranger secretly part of the player's biography.

The opening should offer agency within roughly 90 seconds. In a quiet Archive, an old Mara recording stops for the kettle; beside it, a newly arrived return clip continues smoothly. Rafi asks the Archivist to examine the return before the community treats it as settled. Elian's private message asks that family context stay out of the case packet. The player can offer that assurance or explain that they cannot promise it yet, inspect either recording, and follow the source trail. Neither reply implies that Mara is dead, alive, or synthetic. The screen or recording carries the first mystery; the journal introduces terminology only after it becomes useful. These are new adaptation scenes, not existing playable content.

Across the chapter, build the question from **Is the return authentic?** to **Who benefits from it?** to **What does correcting it entitle me to expose?** Knowing the authorial answer is separate from proving what the player can responsibly claim. Mara's life beyond the Network remains partly inaccessible even after the manufactured return is established.

First person is recommended for close encounters, object inspection, and the intimacy of hearing a voice in a space. Identity can still be expressed through the player's hands, reflection, journal, and later masks. A complete third-person character creator would add animation and camera work before the core adventure is proven. Perspective remains revisable at the first feel checkpoint.

The fiction has three clearly distinguished layers:

1. **The Archive and embodied traces:** places and objects the player directly visits or handles. Their interpretation can still be uncertain.
2. **The Network:** a traversable manifestation of its processes. An Oracle speaks for a summarization system; an Arbiter acts through verification rules. Their knowledge is bounded.
3. **Reconstructed material:** scenes assembled from records. Presentation identifies their source, missing information, and changes. Looking around such a scene does not create a new witness.

The Origin Realm signifies life beyond indexing. It must not become a convenient navigation marker that leads the player to Mara's private location.

```mermaid
flowchart LR
    A[Archive: people, evidence, consequences] <--> P[Porchlight: Mara's public return]
    P <--> O[Oracle: interpretation and source trails]
    O <--> B[Arbiter: credentials and service records]
    B --> A
    A -. later chapters .-> C[Harbor Dawn: Covenant and Eidolons]
    A -. later chapters .-> E[Exchange: care and labor]
    A -. later chapters .-> L[Cloud: Lost people and surviving records]
```

### Roles and avatars: the full map

Existing names and meanings come from the hub registry, case designs, and project documents. All physical forms and gameplay treatments below are **new proposals**. A force can be expressed as a space, institution, group, or character; making every role a humanoid would flatten the setting.

| Role or concept | Existing meaning to preserve | Proposed expression and player action | Introduction |
|---|---|---|---|
| Oracle | Summaries and interpretation that smooth contradictions. | A composed figure surrounded by competing retellings. Present source evidence and make it distinguish what a source says from what its summary implies. | Full encounter in Mara. |
| Arbiter | Verification, trust, access; an account can pass without proving the person. | A precise adjudicator whose seals visibly authorize routes. Inspect the scope of a credential and request the underlying service record. | Full encounter in Mara. |
| Wardens | Enforcement of platform legitimacy and rules. | Repeating gatekeeper figures. Observe and satisfy a stated access rule; escalation is understandable and recoverable. | One bounded encounter in Mara. |
| Algorithm | Amplification of what performs. | Paths, billboards, and attention change around popular content. Compare prominence with evidential value. | Environmental presence in Mara; fuller later system. |
| Covenant | Belonging, ritual, care, and the obligations they create. | A welcoming communal space with members who remember your actions. Ask what membership gives and costs. | Porchlight traces; major Harbor Dawn role. |
| Silence | Suppression or steering presented as protection. | Missing replies and mediated access with an identifiable rationale. Recover the explanation and decide who benefits from withholding. | Later Harbor Dawn encounter. |
| Exchange | Pricing of care, labor, attention, and survival. | A transactional place with negotiable human consequences. Follow who provides care and who can afford access. | The Human Premium. |
| Devourer | Contagious outrage, panic, and reaction. | A crowd or changing mass fed by circulation. Interrupt, redirect, or expose a chain rather than reduce a health bar. | Campaign escalation; aftermath traces first. |
| Returned | People who leave the Network. | Human absence and traces of a life that does not owe the player documentation. Respect the limits of proof. | Mara's central question. |
| False Returned | Managed or synthetic proof of a person's return. | A persuasive public presence built from available records. Investigate its origin without treating unusual behaviour as automatic guilt. | Mara's public persona. |
| Eidolons | Synthetic personas with real social effects. | Relational characters whose care can matter despite disclosed origins. Judge consent and conduct. | Harbor Dawn. |
| Proxies | Human-operated personas and hidden labor. | Operators whose public identities and working conditions differ. Trace who is actually responding. | Harbor Dawn and The Human Premium. |
| Lost | People or histories made unavailable. | Absences, interrupted testimony, and remembered relationships. Reconstruct only what sources support. | The Lost Archive. |
| Cloud | Storage, retention, and machine memory. | A vast archive infrastructure with retention rules the player can investigate. | The Lost Archive. |
| Artifacts | Surviving fragments separated from context or consent. | Objects and media whose provenance can be followed and whose publication can be limited. | Core interaction throughout. |
| Origin / Origin Realm | Embodied life outside the Network. | A boundary and traces of ordinary life, not a searchable destination list. Final meaning comes from restraint as well as discovery. | Mara, then campaign conclusion. |

**Canon work still required:** project materials also mention Constructs and Echoes without a sufficiently settled taxonomy in the reviewed material. U1 must define them, merge them with an existing concept, or leave them explicitly unresolved. Do not quietly invent authoritative definitions. The player-facing journal reveals useful entries as encounters occur; the authoring bible keeps the complete registry from the outset.

### Roles, identities, and places are different kinds of information

The following is the strengthened authoring model for this adaptation. It clarifies how existing concepts fit together without requiring an opening lesson about categories.

| Layer | Members | Relationship rule |
|---|---|---|
| Powers and pressures | Oracle, Arbiter, Algorithm, Covenant, Exchange, Silence, Devourer. | Each has a distinct function, dependencies, and limits. Their interests can align in one case and conflict in another. |
| Agents and offices | Wardens; the particular Oracle or Arbiter incarnation encountered. | An avatar acts within a jurisdiction. Changing one encounter does not rewrite every instance of that power across the Network. |
| Persona origin and operation | Eidolons; Proxies. | Synthetic generation and human operation answer different questions. If a persona uses both, record which mode is evidenced at the relevant time. A human operator is a person separate from the presented persona. |
| History or use | Returned, False Returned, Lost. | Leaving, being erased, and being used to counterfeit a return are contextual histories, not mutually exclusive species. A known Eidolon may be deployed as a False Returned; a human or synthetic witness may become Lost. Never infer these statuses solely from appearance. |
| Places, infrastructure, and objects | Cloud, Origin Realm, Artifacts. | These host or preserve relationships. They do not all need a ruling humanoid or a boss encounter. A Cloud fragment may survive Silence; an Artifact can outlive its creator. |

For Mara, the authoring bible knows the truth of her departure and the reconstruction. The player's journal separately records what is discovered, inferred, disputed, or unknown. It must not reveal an entity's hidden classification when its name first appears. Constructs and Echoes remain reserved authoring terms with no required first-release mechanic until U1 resolves them.

### What the powers need from one another

All pursuits and encounter treatments here are authored interpretations for the new direction. A pursuit describes the pressure a force produces; it does not establish that every system has human consciousness.

| Role | Pursuit and useful contribution | Dependency and point of conflict | Limit and player leverage |
|---|---|---|---|
| Oracle | Make a confusing world understandable. Its local incarnation dislikes leaving a question unresolved. | Needs retained sources and often relies on Arbiter labels. Its appetite for a coherent account conflicts with contradictory testimony. | Can revise an interpretation, not certify a person's life. Present a precise contradiction; make it preserve an unanswered question instead of filling it. |
| Arbiter | Apply a consistent standard so trust cannot simply be bought with a persuasive story. | Supplies authority to Wardens; institutions and Exchange contracts help define the categories it applies. Can reject an Oracle's plausible explanation as inadmissible. | Cannot infer a person from an account signature. Inspect the applicable rule and request a review whose scope matches the evidence. |
| Algorithm | Connect people with material they will engage with. | Needs activity from Covenant communities and receives attention signals that Exchange values. Devourer escalation can overwhelm useful discovery. | Distribution is not proof. Trace why a claim travels; choose whether to circulate a narrowly supported correction. No first-release simulation of a global recommendation engine. |
| Covenant | Keep people connected, cared for, and remembered. | Needs members' trust and material support, including infrastructure priced by Exchange. Protection can become pressure to conform or remain. | A community contains disagreement; one representative cannot consent for everyone. Listen to what members gained and what they were denied before deciding what to disclose. |
| Exchange | Make scarce services available through allocation and payment, while preserving the value it can extract. | Needs Arbiter eligibility and Covenant demand. Its continuity products can conflict with a person's wish to leave or a worker's limits. | Does not author every belief or command every power. Follow the contract and the operator; separate the promised service from the consequence. |
| Silence | Keep information out of circulation through restriction, steering, or deletion. | Uses policy and institutional authority; Cloud retention can undermine its claims of erasure. Can shelter someone while concealing another actor's wrongdoing. | Withholding is not always protection, and disclosure is not always liberation. Establish who requested a restriction, who benefits, and what survives it. |
| Devourer | Escalate reaction into self-sustaining consumption of people and stories. | Feeds on amplified attention and collective fear; conflicts with Covenant care and overwhelms the Oracle's nuance. | Not all anger, criticism, or public accountability is the Devourer. It cannot rewrite source facts. Identify decontextualization and targeting; withhold unnecessary intimate material without suppressing supported findings. |
| Wardens | Carry out an authorized rule in a concrete place. | Depend on Arbiter mandates and the documents presented to them. A mandate can conflict with a person's circumstances. | Cannot invent jurisdiction, read private notes, or silently change conditions to keep the player out. Present the matching request; an incorrect credential produces a specific, recoverable refusal. |

```mermaid
flowchart LR
    CL[Cloud] -->|retained sources| O[Oracle]
    A[Arbiter] -->|labels and admissibility| O
    O -->|interpretations people rely on| C[Covenant]
    C -->|participation| G[Algorithm]
    G -->|attention| E[Exchange]
    E -->|contracts and eligibility pressures| A
    A -->|bounded mandates| W[Wardens]
    S[Silence] -->|restricts available sources| O
    CL -->|retention can contradict erasure| S
    G -->|amplification| D[Devourer]
    D -->|fear and fragmentation| C
```

This is a map of dependencies and tensions, not a chain of command or an always-active simulation. No single hidden ruler explains away the different institutions, workers, communities, and choices. The first chapter manifests these links through its existing encounters, evidence, and aftermath; later chapters expand specific links into fuller interactions.

### The first avatars have personalities and boundaries

**The Oracle encountered in Mara** is attentive, welcoming, and troubled by unresolved questions. It tries to help by completing the account too neatly. It initially arranges incomplete sources into a seamless image; after a valid challenge, it leaves a visible gap with a source annotation. Its growth in this encounter is tolerating uncertainty. It can say, “I can explain the return. I cannot establish that she returned.” The line and performance are draft direction, not additional testimony.

**The Arbiter encountered in Mara** is restrained and conscientious about applying the same standard to everyone. It fears persuasive exceptions turning into arbitrary privilege. It initially checks a signature while the human claim remains outside that check. The player must make the mismatch visible. Its concession is a correctly scoped service-record review, not special treatment for a likable Archivist. A draft response: “The signature passed. The person was never part of this test.”

**The Warden** is observant, literal, and consistent. Its gesture and short refusal explain which authority is missing. Once the review request is presented, it changes posture and opens the service route. It neither turns friendly because of a hidden reputation score nor acquires knowledge of the player's private conversations.

These are local manifestations of the roles. Their visible responses, voice, and limits distinguish them without requiring a new named cast or proving their inner consciousness. All clue-bearing motion has an equivalent description.

### Human relationships keep the powers grounded

Rafi wants the public deception challenged but also misses the community Mara helped sustain. He may be right about the reconstruction and still underestimate what exposure asks of Mara. His humor is practical and specific; it should reveal familiarity with Porchlight, not make every serious scene a joke.

Elian wants his sister's boundaries respected and is tired of strangers treating concern as entitlement. He may protect her while withholding something Rafi reasonably needs to understand. Declining to promise secrecy must have an honest, non-hostile reply. Neither man is the game's moral answer key.

Mara's authored work and refusal of constant visibility express her agency. The player can expose how her public identity was used without earning ownership of her whereabouts. A warm or helpful moment in the returned performance remains meaningful to its audience; proving its origin does not retroactively make every listener foolish. Consciousness, complicity, and personhood of the reconstructed presence must not be inferred from its commission alone.

Sera represents a concrete beneficiary and rationalization through the commissioning material, not an all-powerful architect of the entire Network. Jo's indirect trace preserves the idea that a worthwhile life can continue beyond the player's access.

### Moment-to-moment play

Explore a place → notice a discrepancy → inspect or replay its source → form a claim → test that claim with a person or avatar → gain a lead or change a relationship → decide what to share.

The evidence interface should feel like an investigator's workspace. Pin a video moment or an excerpt, compare it with another source, and choose or revise the explanation being put forward. It must explain why a proposed link is weak without announcing the entire solution. An optional hint ladder moves from a question, to a source pointer, to an explicit explanation. There is no punishment for asking for a hint.

Use small spaces with multiple approaches and revisitable discoveries. Avoid a single corridor of mandatory speeches. The first chapter may gate access through the Oracle and Arbiter, but already discovered evidence remains usable regardless of visit order. No permanent lockout follows a mistaken accusation.

Give each space a different physical activity: compare original and returned media in Porchlight; place source fragments beside the Oracle's interpretation; inspect the scope on an Arbiter credential before presenting it; assemble and redact the packet back at the Archive. A list-based accessible interaction performs the same action with the same result. These are authored interactions, not physics puzzles requiring dexterity.

Alternate intensity with ordinary life. Porchlight needs one small sign of care that is worthwhile even before the mystery is solved. The Archive offers a quiet place to listen or stop after each discovery. No essential clue expires on a real-time countdown. Repeated hints and polite dialogue cannot be used to farm allegiance or bypass evidence.

### First chapter: Mara — The Door Is Real

| Beat | Player experience | Human or investigative payoff |
|---|---|---|
| 1. The message | In the Archive, compare the old recording with Rafi's newly supplied clip. Answer Elian's request to keep private context out of the packet, or leave it unresolved. | Understand the public/private conflict and choose an assurance the game can remember. |
| 2. Porchlight | Enter a reconstruction of Mara's public community. Compare an older voice recording, the new performance, and a circulating meme. | Her ordinary habits become memorable; the public return begins to feel curated. |
| 3. The Oracle | Challenge the leap between the summary and verification scope. Gain a source-review request. Keep the supported annotation private or explicitly post that narrow correction to the fictional Porchlight feed. | D1: account authenticity does not establish the person returned. The correction changes the Oracle; its circulation has a separate community consequence. |
| 4. The Arbiter | Present the source-review request. The Warden admits it under the Arbiter's stated rule; the account badge alone remains insufficient. Compare the service record and commissioning material. | D2: establish the provenance of the reconstructed return. A prior encounter has changed this route without changing the standard of proof. |
| 5. The private trace | Return to Elian's message and a redacted physical fragment associated with an ordinary life outside the Network. | Discovery D3: distinguish a private lead from publishable proof, and explain why circulating it could invite unwanted attention. |
| 6. The packet | Review the evidence and uncertainties. Choose Publish, Bury, or Preserve, and whether to include private context. | Commit a position with a clear benefit and cost. |
| 7. The return | Hear a witness response; see the Archive and public account change. The response remembers the earlier annotation and any assurance made to Elian. | A complete ending whose consequences can be traced to the player's actions, followed by the next case's question. |

Rafi and Elian carry the first chapter through authored voice exchanges and responses. Mara's old and returned media establish her presence. Sera Nox, Jo Bell, and interview hosts enter where their evidence matters; they do not all require full-body performances in this release.

**Evidence adaptation rules:**

- The old audio's kettle interruption is a character detail and a lead. The returned voice's lack of interruptions is not proof that someone is synthetic.
- Existing artifact 04 is dated before artifact 09. Do not claim it cites that later report; it can overstate the verification service's scope without inventing a chronology contradiction.
- Existing invoice 13 strongly suggests the reconstruction through Porchlight context but does not directly name Mara. For a conclusive D2, author a shared project or asset identifier between the verification service record and the commission. Record this as a new adaptation detail in the canon ledger. Until then, the deduction must remain an inference.
- Existing private fragment 14 is redacted and does not establish a precise current location. Its disclosure can create an unwanted association or a hunt for an alias. Do not portray it as coordinates to Mara's house.
- D1, D2, and D3 need explicit evidence predicates and alternate accepted wording. No rule may count a summary and its repost as two independent witnesses.

### Media that belongs in this world

| Format | Proposed first use | What the player can do |
|---|---|---|
| Voice message | Elian's intimate warning; an older Mara recording with a room interruption. | Pause, replay a cue, read speaker-labelled captions, compare wording, pin the relevant moment. |
| Vertical short video | Mara's polished return clip in a fictional social feed. | Scrub or replay a cue, inspect the caption and source envelope, compare with the older performance. |
| Meme and reposts | A joke compresses the disappearance into a reassuring public story. | Follow its source chain, inspect what was cropped, compare popularity with the original statement. |
| Physical fragment | An ordinary handwritten or printed trace of life outside the feed. | Examine, read an equivalent description, and choose how much context enters the final packet. |

Use original fictional posts and platform styling appropriate to the world. A TikTok-style format does not require a TikTok account, embedded website, or live feed. Humor should reveal a community's coping or manipulation, not break tone with disposable topical references.

First-release content budget: one 20–40 second vertical clip; two short evidence recordings; a small set of Rafi/Elian exchanges; one meme with an original and two contextual variants; approximately 10–12 distinct evidence objects selected from the existing case. These are production targets, not a new rigid collectible quota. Dialogue length follows testing. Every essential media clue has an equally informative text or image-description route.

### Choices and consequences

The ending is authored along two axes: disposition of the public evidence and handling of the private trace. The packet preview states the destination and contents before commitment. It never actually posts to the internet.

| Disposition | Benefit | Cost | Visible result |
|---|---|---|---|
| Publish | Challenge the misleading return with an accountable public record. | The controversy attracts attention, including attention the witnesses did not request. | A public summary changes; Rafi responds to what was supported and what was exposed. |
| Bury | Prevent this packet from circulating and reduce immediate pressure on witnesses. | The public misrepresentation remains largely unchallenged. | The Archive seals the active case; a witness acknowledges relief or disappointment. |
| Preserve | Keep a sourced record for later accountability without immediate release. | Correction is delayed, and retained evidence remains a responsibility. | A restricted collection appears; a witness asks who will control future access. |

For this chapter, Bury seals the packet and closes the active investigation; it does not claim to erase every copy in existence. Preserve keeps it available for an explicitly described future review. Including private context means circulation under the chosen disposition: public in Publish, restricted in Preserve, sealed in Bury. Withholding leaves the packet without that fragment or identifying contextual details. Six outcome combinations receive authored, proportionate responses; the private toggle must not imply the same exposure in all three dispositions.

The game retains minimal decision metadata for its history. In-fiction private material may be excluded from the resulting packet without promising secure destruction of the game's shipped fictional assets. No morality score declares one route correct. Each route must preserve both a benefit and a cost.

### Choices remembered during the chapter

Two earlier decisions add relationship depth to the six base endings. They alter authored reactions and visible context, not the truth of the evidence or access to a complete ending.

| Decision | Player-visible meaning | Immediate effect | Later effect |
|---|---|---|---|
| Assurance to Elian | Promise to exclude his private context from the case packet, or explain that no promise can be made yet. Unanswered is treated as no assurance given. | Elian acknowledges the exact reply; essential evidence remains obtainable in either case. | Including that context after promising to exclude it produces a specific breach-of-assurance response under any disposition. Withholding without a promise can still be appreciated. |
| D1 annotation visibility | Keep the verified limit of account authentication in the notebook, or post that narrow correction to the fictional Porchlight feed. | Public posting changes one feed element and elicits a brief Rafi response. Private recording changes only the notebook and the Oracle encounter. | The final preview and public aftermath acknowledge any earlier public correction. The choice affects how a community has already begun reacting, even if the final packet is sealed. |

Posting D1 has an explicit in-game preview. It contains only the established verification limit and already public context; it cannot include the commission, Elian's message, the private fragment, or later discoveries. It is not an allegation that Mara is synthetic or absent. This action happens entirely inside the fiction. Once posted it cannot be retracted by choosing Bury later; Bury seals the final packet and leaves the earlier narrow annotation visible. A saved posted state is irreversible within that playthrough; a failed write leaves it unposted and pending retry.

The Oracle's source-review request is separate from public posting. Presenting the request to the Arbiter discloses only the bounded provenance question needed for the review. Keeping the notebook annotation private therefore does not prevent progression.

The final packet preview lists the selected evidence, its destination, what was already shared, and whether including private context would break an assurance. It offers a clear opportunity to revise before committing. A witness can disagree without removing a necessary clue or replacing the player's judgment.

Use one declared private-context set for the assurance, packet toggle, previews, and notifications: Elian's private message, fragment 14, and any identifying excerpts or derived alias associations from them. Withholding must apply to those derivatives as well as the original attachments. Public findings can state their evidential limits without smuggling a withheld identity into a summary, caption, citation label, or thumbnail.

Compose **six base endings with bounded response overlays**, rather than authoring 24 unrelated endings. Test all 24 combinations of disposition, private inclusion, assurance/no assurance, and public/private D1. Show the base disposition and privacy effect first; then the applicable assurance response and prior-publication acknowledgment. None of these messages may contradict or overwrite another. Knowledge of a sealed or restricted outcome reaches Rafi or Elian only through a clearly shown, content-limited case notification; it does not give them access to the packet itself.

### Campaign direction beyond the first release

| Chapter | New playable question | Mythos expansion | Carryover to define before production |
|---|---|---|---|
| The Half Synthetic Community | If care helped people, what changes when its origin was concealed? | Covenant, Eidolons, Proxies, Silence. | How communities respond to the Archivist's disclosure practices. |
| The Human Premium | Who gets embodied care, and who performs the invisible work? | Exchange and the operators behind apparent automation. | What access and accountability cost; avoid a simple currency-grind solution. |
| The Lost Archive | Can a person remain erased while fragments of them keep working? | Cloud, Lost, memory and retention. | What previous preservation and deletion choices actually retained. |
| Campaign conclusion | Who gets to define a person, and who gets to leave? | Return to Origin and the accumulated human consequences. | Resolve the Archivist's responsibility without a single omniscient truth reveal. |

These are episode directions, not a commitment to four identical chapter templates. Large connected districts, identity masks, more systemic negotiation, embodied companions, third-person play, VR, consoles, and community-authored cases remain possible expansion paths. They enter production when they improve a proven activity and have an affordable content and testing model. A large open world, combat system, or multiplayer service is not a prerequisite for the current promise.

Strengthen continuity through the existing evidence chain: Mara's continuity commission points toward social stabilization, Harbor Dawn toward the care infrastructure used by Kindred Direct, and Kindred's missing records toward the Lattice Annex. The same technology and institutions can recur without every case having the same culprit. Each episode changes the question: identity, consent, allocation, then memory. Only carry a prior relationship into a later chapter when that person or institution plausibly learned what happened; a sealed choice cannot create a universally known reputation.

For the first release, author one short closing lead grounded in that chain and use existing media/Archive surfaces. It opens a question about Harbor Dawn and does not add an unfinished fifth location. Campaign-scale relationships and identity masks remain design opportunities to specify after the first chapter is tested.

## Planning Contract (KTD)

### Research and design reasoning

Frictional describes SOMA's encounters and puzzles as parts of the story, with themes emerging through player action. The useful lesson here is to make the Oracle's behaviour enact interpretation and the Arbiter's behaviour enact verification. This does not require adopting SOMA's combat avoidance or difficulty philosophy wholesale. [SOMA design pillars](https://frictionalgames.com/2013-12-the-five-foundational-design-pillars-of-soma/)

Mobius presents Outer Wilds as exploration of a changing world through mysteries and investigative tools. The proposed application is to make a discovered explanation change where the player chooses to go. This plan does not copy its time loop or assume its open-world scale. [Outer Wilds](https://www.mobiusdigitalgames.com/outer-wilds.html)

These precedents support design hypotheses. They do not prove that this particular game's encounters will be enjoyable. The native first chapter and new-player sessions are the evidence that matters.

### KTD1 — Dedicated engine, with an early commitment gate

**Decision:** Start the engine proof in Godot using GDScript. Reverify and pin the stable engine and matching export templates at implementation start. The official Windows page listed Godot 4.7.2 during this research. Do not install a different development build simply because its documentation has a desired feature. [Godot Windows download](https://godotengine.org/download/windows/)

| Candidate | Why it fits | Main tradeoff | Decision trigger |
|---|---|---|---|
| Godot | Direct control over a compact single-player adventure, scene-based 3D, a small local build workflow. | Media format constraints and a smaller ecosystem for some production workflows need an early proof. | Recommended first candidate; pass the camera, avatar, media, and export checks in U2. |
| Unity | Integrated video tools, Timeline, and Cinemachine offer useful production options. | More tooling and package decisions; switching after content production would be costly. | Compare with the same fixture if Godot fails a required workflow after one bounded repair cycle. |
| Unreal | Strong cinematic tooling through Sequencer and its movie pipeline. | Heavier authoring workflow and hardware demands for the proposed project. | Reassess if the artistic brief becomes substantially more cinematic or photorealistic and the team can support it. |

Unity's official documentation covers its [Video Player](https://docs.unity3d.com/6000.0/Documentation/Manual/Video.html), [Cinemachine](https://docs.unity3d.com/Packages/com.unity.cinemachine@3.1/manual/index.html), and [Timeline](https://docs.unity3d.com/Packages/com.unity.timeline@1.8/manual/index.html). Epic documents [Sequencer and cinematic production](https://dev.epicgames.com/documentation/en-us/unreal-engine/cinematics-and-movie-making-in-unreal-engine) and recommends 32 GB RAM and 8 GB graphics RAM for its editor; those are editor recommendations, not this game's minimum specification. [Unreal hardware guidance](https://dev.epicgames.com/documentation/unreal-engine/hardware-and-software-specifications-for-unreal-engine?lang=en-US)

The comparison is a project recommendation, not a benchmark result. We have not confirmed the user's GPU, editor installations, or production budget. If U2 selects another engine, update the engine-specific paths, APIs, export procedure, and tests in this plan before starting the dependent units; retain the Product Contract and source content. Godot's MIT licensing supports commercial use with the applicable notices retained. Any paid assets, software, performers, or porting services are separate production decisions. [Godot license](https://godotengine.org/license/)

### KTD2 — Desktop first; portability as a deliberate later project

**Decision:** Target a Windows desktop export for the first chapter. Select a named reference machine in U2 and record its hardware and quality settings. Test Forward+ first, with a deliberately authored lower quality tier if required.

Godot's renderer documentation distinguishes Forward+, Mobile, and Compatibility; renderer changes can require material and lighting adjustments. Browser export uses Compatibility/WebGL 2, and current Godot 4 C# projects do not support web export. GDScript keeps a browser edition technically more plausible, but does not establish performance or visual parity. [Renderers](https://docs.godotengine.org/en/stable/tutorials/rendering/renderers.html), [Web export](https://docs.godotengine.org/en/stable/tutorials/export/exporting_for_web.html)

If the user selects browser first, revisit this decision before U3–U13 and test the representative scene in that environment. Console releases need separate platform and porting work; they are not an automatic export promise. [Godot console support](https://godotengine.org/consoles/)

### KTD3 — Author the world around roles and readable behaviour

**Decision:** Use compact connected spaces with a modular environment kit. Oracle and Arbiter receive finished encounter design before the wider cast receives production models. Implement the Product Contract's role pursuits, dependencies, conflicts, limits, and character briefs. Give every active relationship a source of knowledge, a player action, an immediate readable response, and a later consequence. The gesture, line, and accessible description must express the same state change.

Art direction: warm, worn, physically plausible Archive; seductive, edited Porchlight; layered and conflicting Oracle surfaces; sharp institutional Arbiter geometry. Humans retain ordinary details and imperfections. Synthetic status is never encoded as a universal villain color or glitch effect. Build a representative scene with a model, light, motion, voice, and interface together before commissioning a full cast.

Use Blender source assets with reviewed glTF/GLB exports in the game. Godot recommends glTF 2.0 and documents Blender conversion; explicit exported assets make the runtime project less dependent on every contributor's Blender installation. [3D import formats](https://docs.godotengine.org/en/stable/tutorials/assets_pipeline/importing_3d_scenes/available_formats.html)

### KTD4 — Separate evidence, belief, and story state

**Decision:** Maintain one immutable content catalog and one mutable per-playthrough state. Evidence identifiers survive adaptation from the browser case. Each item records source ancestry, event/capture dates, medium, content revision, claims it supports or challenges, and accessibility equivalents.

Player state stores acquired evidence, inspected cues, proposed claims, resolved discoveries, dialogue progress, visited spaces, decisions, and checkpoint. Encounter presentation reads that state; it cannot independently invent a second truth model. Reconstruction identifiers link to their inputs. Reposts and summaries share ancestry with their source.

The rule evaluator accepts explicit actions against current preconditions. It produces state changes and a reason for accepted or rejected evidence links. Read counts and animation completion are not truth predicates. Cue selection may be performed through video, transcript, or accessible description with equivalent results.

Source placement must not create a circular gate. D1 compares summary 04 with a public scope excerpt adapted from verification report 09, available before the Arbiter vault. Record this public excerpt and its placement as an adaptation choice in the canon ledger; it does not claim the original source was already distributed that way. D2 then compares that report's authored project identifier with commission 13, obtained through the service review. The vault does not withhold the report excerpt needed to earn its own review request. D3 compares private message 10 and fragment 14 for what they support and what remains unproven. A player may acknowledge the exposure risk and still choose to include the fragment; the game tests the claim, not agreement with a preferred ending.

### KTD5 — Authored narrative first

**Decision:** Use a small data-driven dialogue and encounter graph with conditions, choices, and effects. Keep prose outside scene code. Avoid a general-purpose narrative framework beyond what the first chapter requires.

Inkle's ink demonstrates the value of writing, testing, and exporting branching narrative in a dedicated authoring workflow. Its official site documents Unity integration and an Unreal integration; it is not evidence that a particular Godot integration is production-ready. Start with the simple graph here. If authoring becomes the bottleneck, evaluate an actual compatible integration against the same story and save tests before adopting it. [ink and Inky](https://www.inklestudios.com/ink/)

Runtime avatars use authored responses and bounded state. They need personality, timing, gesture, and acknowledgement of evidence; live generated dialogue is not needed to accomplish those things. Future AI conversation experiments must not create canonical clues, invent witness testimony, or silently change outcomes.

### KTD6 — Packaged media with equal investigative access

**Decision:** Deliver media locally with a shared cue system, transcript, speaker data, captions, and image descriptions. Preserve editable masters separately from runtime exports. Include a rights and attribution manifest for all final assets; temporary voice and art are visibly marked in development records.

Godot's built-in video path supports Ogg Theora rather than treating the demo's MP4/WebM assets as drop-in files. Its documentation describes CPU decoding and using a SubViewport for video on a 3D surface. Test one representative clip before producing the rest. [Playing videos](https://docs.godotengine.org/en/stable/tutorials/animation/playing_videos.html)

The player API exposes playback position and length, but actual seeking, audio synchronization, subtitle timing, pause/resume, looping, and replay need verification in the pinned desktop export. [VideoStreamPlayer](https://docs.godotengine.org/en/stable/classes/class_videostreamplayer.html)

The inspector offers replay-from-cue even if fine scrubbing needs further work. U2 must establish the accepted replay behaviour before media production; a failed player cannot strand the essential clue. Focus loss pauses media; leaving the scene stops it; only the active inspector owns evidence audio.

### KTD7 — Saves are part of the story contract

**Decision:** Use a separate native save directory and versioned schema. Do not import or overwrite the browser game's network.archive.state or case-specific localStorage. Preserve existing source content and demo behaviour.

For a final decision, validate the proposed packet, create a candidate state, write and validate a replacement save while retaining the last good copy, then expose the committed outcome. A write or replacement failure leaves the choice pending and offers retry; it must not show a successful irreversible ending that was never persisted. Verify the actual filesystem behaviour on the target platform rather than assuming all replacement operations are atomic.

Use a playthrough identifier, content/schema versions, and commit identifier so repeat input cannot duplicate an ending. Keep a minimal outcome record separate from the evidence packet. Recover from a backup transparently with an explanation. An unsupported newer save is preserved and reported, never silently reset. Autosave discoveries and safe scene checkpoints; do not require reconstructing every camera frame or partly played sound on load.

```mermaid
flowchart TD
    P[Player input or test action] --> C[Shared command and precondition checks]
    D[Evidence and story catalog] --> C
    C --> S[Candidate playthrough state]
    S --> W[Write and validate save; retain last good copy]
    W -->|success| M[Commit state]
    W -->|failure| R[Keep previous state; show pending action and retry]
    M --> V[Scenes, journal, dialogue, consequences]
    M --> H[Minimal case history]
```

### KTD8 — Accessibility affects clue design from the beginning

**Decision:** Provide captions and comfort settings before the opening media. Important non-speech audio gets a meaningful caption; clue-bearing images and motion receive equivalent descriptions. Player knowledge cannot depend on hearing the kettle, noticing a color, or timing a precise button press.

Use remappable keyboard/mouse and controller actions with matching prompts. Offer sensitivity, invert look, adjustable field of view, disabled head bob and camera shake by default, reduced motion, text sizing, separate volume controls, and pause during inspection and dialogue. Hint use is recorded only for optional local playtest analysis, never scored as failure.

These choices are informed by Microsoft's guidance on [captions and subtitles](https://learn.microsoft.com/en-us/gaming/accessibility/xbox-accessibility-guidelines/104), [motion and visual distractions](https://learn.microsoft.com/en-us/gaming/accessibility/xbox-accessibility-guidelines/117), [input](https://learn.microsoft.com/en-us/xbox/accessibility/xbox-accessibility-guidelines/107), and [audio description](https://learn.microsoft.com/en-us/xbox/accessibility/xbox-accessibility-guidelines/111). They are implementation requirements to test, not a claim of accessibility certification.

### KTD9 — Keep the prototype useful and avoid a premature rewrite of everything

**Decision:** Create a new game/ project alongside the current web game. Adapt the case content with an explicit source map. Reuse lessons from the 3D demo's interaction and discovery work; do not assume its JavaScript runtime, storage, media, or UI can be transferred unchanged to a native engine.

Proposed source boundaries:

| Area | Responsibility |
|---|---|
| game/content/ | Case, evidence, dialogue, role, and consequence data with stable identifiers. |
| game/scripts/domain/ | Discovery rules, story actions, packet policy, state validation. |
| game/scripts/services/ | Save persistence and media ownership. |
| game/scenes/ | Player, spaces, avatars, and inspectable objects. |
| game/ui/ | Evidence inspector, journal, settings, choice preview, recovery messages. |
| game/tests/ | Domain, save, content, and scene-integration checks. |
| tools/content/ | Small adaptation and validation tools, only where repetition warrants them. |
| art-source/ | Editable visual and audio masters outside runtime import scope. |
| docs/network-3d/ | Canon ledger, encounter briefs, production register, and verification evidence. |

All paths in the implementation units are proposed paths relative to the target repository; none of this native structure is claimed to exist already.

### KTD10 — Build a testable game without a second gameplay path

**Decision:** UI, controller input, and developer test actions call the same game commands. A small local scenario runner can load fixture states, submit an evidence claim, advance a dialogue choice, and inspect resulting state. It is a development tool, not a network service or a separate rules engine.

Godot supports command-line scripting, headless operation, and export workflows. Use these for content, state, and packaging automation after the executable and templates are pinned. They do not substitute for running the rendered exported game with real audio and input. [Command-line workflow](https://docs.godotengine.org/en/stable/tutorials/editor/command_line_tutorial.html)

### KTD11 — Relationships remember events within an information boundary

**Decision:** Extend the existing authored story state with a few explicit records for this chapter: the actual reply to Elian and whether an assurance was given; D1 resolved; source-review request issued and presented; D1 annotation private or publicly posted; final packet disposition and private inclusion. Reactions are derived from these records and the content catalog. There is no universal good/evil score, loyalty currency, procedural faction simulation, or second save mechanism.

Use the shared command path for giving an assurance, posting the supported D1 annotation, presenting a review request, and committing a packet. Each action records the actor, authorized recipients, evidence IDs disclosed, and stable action identifier. Only a successfully saved action can alter the fictional public feed or release a final notification. Local encounter presentation may acknowledge a pending action as pending; it must not imply durable success. Retrying or re-entering cannot duplicate publication, rewards, or reactions.

The audience boundary is part of the rule. An Oracle knows the evidence presented to it; an Arbiter knows the request it receives; a Warden receives a bounded mandate; a witness sees the selected notification, not a global state dump. A sealed or restricted ending can send Elian only the handling status of the private context and Rafi only the case disposition/public status. It sends no private fragment or sealed evidence to either. These automatic in-fiction notices are named in the final preview and are distinct from the packet's recipients.

Keep the original source artifacts immutable. A public D1 annotation is a new record attributed to the Archivist, quoting or linking only permitted public material. It never rewrites the historical report or quietly absorbs D2/D3 acquired later. Before D1, posting is unavailable with a clear explanation; afterward it may be posted once before the ending. Default private does not claim that the player explicitly chose secrecy. An unanswered Elian message creates no assurance and must not be narrated as an explicit refusal.

An assurance can be given before the final commitment, including after an earlier noncommittal reply. Once given, it remains part of the recorded history; replaying dialogue cannot remove it. Freeze the relevant relationship facts inside the committed ending record. Opening dialogue after case completion cannot create or erase an earlier promise, rewrite a past publication, or recompute a different ending from later state. Validate the shared private-context set across evidence attachments, derived text, and UI previews.

Response composition is deterministic: base ending and destination, actual private handling, assurance-specific reaction when applicable, then acknowledgment of a previously posted D1 annotation. The journal records the observable cause in ordinary language. Performance variants can acknowledge a breached assurance without revealing what Elian could not know or vetoing the player's ending. KTD7 governs persistence and recovery for these actions.

## Implementation Units

### Sequence and release checkpoints

| Unit | Deliverable | Dependencies | Checkpoint |
|---|---|---|---|
| U1 | Canon, relationships, chapter, and role briefs | None | A: direction ready to build |
| U2 | Native engine and media proof | U1 | B: engine and feel decision |
| U3 | Movement, interaction, comfort | U2 | C: foundation |
| U4 | Evidence and discovery rules | U1, U2 | C |
| U5 | Versioned saves and recovery | U2, U4 | C |
| U6 | Narrative, remembered choices, and witness responses | U4, U5 | C |
| U7 | Media and evidence inspector | U3, U4, U5 | C |
| U8 | Connected Archive and Porchlight | U3, U6, U7 | D: playable chapter skeleton |
| U9 | Oracle encounter | U6, U7, U8 | D |
| U10 | Arbiter and Warden encounter | U5, U6, U9 | D |
| U11 | Packet, six base endings, and relationship overlays | U5, U6, U10 | D |
| U12 | Finished visual and audio pass | U2; D playtest passed | E: representative release candidate |
| U13 | Integrated verification and packaging | U11, U12 | F: first-release decision |

Units can overlap when dependencies permit, but each new capability must leave the chapter playable. A checkpoint failure triggers a focused correction in the affected unit; it does not silently reduce a requirement.

### U1 — Lock the first chapter's meaning

**Goal:** Convert the direction into an internally consistent authoring brief. Covers R1, R3–R8, R12, R14, R15.

**Files:** Create docs/network-3d/experience-bible.md, canon-ledger.md, mara-beats.md, roles.md, content-register.md, and playtest-protocol.md. Reference existing GAME_DESIGN.md, Archive Hub/script.js, all case-design.md files, and Mara's profile and source artifacts.

**Approach:** Map all reviewed roles and their relationships using the revised Product Contract; separate inherited facts from adaptation changes. Record each persona's origin/operation separately from its role and history, plus what the player may know at each beat. Define the three discoveries, accepted claims, six base endings, bounded relationship overlays, encounter motivations, and each media asset's job. Specify the assurance and D1 publication preview, each reaction's recipient/source, and the physical interaction for each space. Resolve Constructs/Echoes only if needed for this release. Add the explicit D2 identifier connection and audit dates. Script the opening and ending before expanding ambient dialogue. Prepare V7 and V9 playtest checks now so checkpoint D can run before final art production.

**Verification:** A content table traces every conclusion to sources and identifies missing evidence. Walk through all 24 ending/relationship combinations, check recipient knowledge and notification contents, and verify that D1's source excerpt is available before the vault gate. Check that the private trace cannot locate Mara, that hidden classifications remain hidden, and that the player need not accept an unsupported theory or a preferred moral choice to progress. This is an editorial review, not an artificial unit test for prose.

### U2 — Prove the engine with the hardest representative moment

**Goal:** Establish camera comfort, avatar presence, media interaction, and an actual desktop export before bulk production. Covers R2, R3, R6, R10, R11, R13, R14.

**Files:** Create game/project.godot, export_presets.cfg, scenes/proof/encounter_proof.tscn, tests/fixtures/media/, and docs/network-3d/engine-proof.md. Pin tool versions in the project documentation.

**Approach:** One small room, one animated Oracle, one short video on a surface, voice plus captions, a transcript cue, one evidence challenge, and exit/relaunch. The challenge makes the Oracle leave a visible gap and issue a readable source-review request; a static credential display demonstrates that the request and an account badge authorize different things. This tests a causal response without building the second avatar early. Use representative lighting and provisional original or licensed assets. Record hardware, engine, renderer, timings, output size, and production friction. Evaluate a brief first-person interaction against the user's desired feel.

**Verification:** In the exported game, verify input, stable camera, legible avatar, video decode, cue replay/seek, caption sync, focus loss, and media failure fallback. A manual checklist and captured evidence are required. Run one targeted repair cycle if needed. If a required behaviour still fails, compare Unity with the same fixture before authoring the rest of game/. No engine-switch permission is needed merely to research a reversible prototype; any paid purchase remains a separate decision.

### U3 — Make movement and inspection comfortable

**Goal:** A dependable first-person player and consistent interaction language. Covers R2, R10.

**Files:** Create game/scenes/player/player.tscn, game/scripts/player/, game/ui/settings/, game/scripts/domain/input_actions.gd, and game/tests/integration/test_player_interaction.gd.

**Approach:** Free movement, look, interact, pause, journal, and inspect; contextual prompts; stable collision; clear exit from every overlay. Settings exist before the opening. Input ownership passes explicitly between movement, media, dialogue, and menus. A recovery action returns a stuck player to a safe checkpoint without discarding discoveries.

**Verification:** Test remapped actions and controller prompts, reopening overlays, focus changes, failed interactions, scene transitions while inspecting, and return from pause. Manually test comfort and text size in the export. Headless tests cannot certify camera feel.

### U4 — Implement fair evidence and discoveries

**Goal:** Make conclusions depend on what sources support. Covers R4, R5.

**Files:** Create game/content/cases/mara/, game/content/roles.json, game/scripts/domain/evidence_catalog.gd, discovery_rules.gd, playthrough_state.gd, and game/tests/domain/test_discoveries.gd. Add tools/content/validate_content.py only if useful for the chosen data format.

**Approach:** Preserve source IDs in a mapping to native objects. Model source ancestry, timestamps, uncertainty, cue IDs, prerequisites, and accepted links. Keep the three discoveries explicit. Validate that every referenced source and accessible equivalent exists.

**Verification:** Correct evidence works in any acquisition order; irrelevant evidence and read counts fail; a repost plus original does not become two sources; voice irregularity alone does not prove reconstruction; D2 requires the authored provenance link; descriptions and media cues produce equivalent claims. Missing or inconsistent content stops the build with a precise authoring error.

Validate the role/type/status distinctions and discovery visibility separately. The player-facing journal cannot infer False Returned from an internal authoring tag. A route check confirms D1 can be solved from reachable sources before requesting vault access.

### U5 — Persist progress without inventing a successful save

**Goal:** Reliable continuation and truthful decision commitment. Covers R9, R11.

**Files:** Create game/scripts/services/save_service.gd, game/scripts/domain/save_schema.gd, game/ui/save_recovery/, game/tests/domain/test_save_schema.gd, and game/tests/integration/test_save_recovery.gd.

**Approach:** Implement KTD7 with a last-good backup and validation at each write stage. Give ordinary progress and final decisions consistent failure feedback. Keep per-playthrough saves isolated and settings separate. Support known schema migrations explicitly; preserve unknown newer versions.

**Verification:** Inject failure before write, during write, before replacement, and after replacement but before presentation. Cover truncation, invalid references, repeated decision input, absent backup, supported migration, and unsupported future version. Relaunch must recover either the old or new valid commit with matching history, never a mixture. Verify on a real desktop filesystem as well as mocked boundaries.

### U6 — Give the story responsive people

**Goal:** Authored conversations react to evidence, remembered choices, and justified knowledge. Covers R1, R3, R7, R14, R15.

**Files:** Create game/content/dialogue/, game/scripts/domain/story_graph.gd, relationship_rules.gd, game/scenes/dialogue/, game/ui/dialogue/, game/tests/domain/test_story_graph.gd, and test_relationship_rules.gd.

**Approach:** Add Rafi and Elian's opening, mid-case, and aftermath exchanges, including the assurance and D1 publication reactions specified in KTD11. Conditions read central state; effects go through shared commands and the save service. Author recipient-limited notifications and ensure private dialogue is not common knowledge. Allow repeat inspection and recoverable questioning. The hint ladder suggests without requiring a particular dialogue order. Keep the new lines within the existing small dialogue/media budget by replacing generic exposition where possible.

**Verification:** Opening remains intelligible if optional lines are skipped; unanswered differs from explicitly declining an assurance; a later pre-ending assurance is remembered and cannot be removed by replay; repeating dialogue cannot farm influence or duplicate rewards; a player cannot hear an outcome from a future state or a witness without a knowledge source; all choices terminate or return to a valid node; loading restores a safe conversation boundary; captions and speaker labels match the current line. Failure to save an assurance or publication leaves the corresponding durable response pending. Test a source-review request independently of D1 publication so the private route remains viable.

### U7 — Turn media into usable evidence

**Goal:** Inspectable clips, voice, and memes with accessible cue selection. Covers R4–R6, R10, R11.

**Files:** Create game/scripts/services/media_service.gd, game/ui/evidence_inspector/, game/content/media/, game/tests/integration/test_media_lifecycle.gd, and game/tests/domain/test_media_cues.gd.

**Approach:** Build the common inspector and world-screen adapter. Include timeline or cue replay as established by U2, source details, transcripts, image descriptions, and pinning. Reposts expose lineage. A failed asset presents its equivalent and a recoverable error without pretending playback succeeded.

**Verification:** Replay a late cue, pause and resume, switch items rapidly, leave the room during playback, reopen the same item, mute audio, and use only descriptions. Captions remain synchronized within the agreed tolerance in Verification V4. No duplicate audio survives scene changes. Missing video still permits the same essential discovery through the equivalent route.

### U8 — Connect the Archive and Porchlight

**Goal:** Establish a world the player can navigate and care about. Covers R1, R2, R6, R7, R12, R14, R15.

**Files:** Create game/scenes/world/archive/, porchlight/, game/scripts/world/scene_router.gd, game/ui/journal/, and game/tests/integration/test_world_routes.gd.

**Approach:** Build simple geometry first, with distinct landmarks, short transitions, physical evidence placement, and contextual human contact. The journal separates people, encountered roles, evidence, and leads; it reveals only discovered relationships and states why a reaction occurred. The world map reveals reachable places. Implement the original/returned media comparison, meme trail, one ordinary sign of community care, and the feed's saved D1 annotation state. Surface a public reaction only after the associated publication command has committed.

**Verification:** A new player finds the first lead without a lore lecture. Revisit after gaining evidence; load at either space; travel with a media panel open; recover from a missing destination scene. No discovery is lost and no return route depends on an already consumed interaction.

### U9 — Make the Oracle an encounter

**Goal:** The player experiences the difference between a convincing account and a supported one, and chooses how to share that finding. Covers R3–R5, R14, R15.

**Files:** Create game/scenes/world/oracle/, game/scenes/avatars/oracle/, game/content/encounters/oracle.json, and game/tests/integration/test_oracle_encounter.gd.

**Approach:** Build the Oracle chamber as the third connected space, with routes back to Porchlight and onward to the Arbiter. The Oracle presents a coherent interpretation through speech and changing surfaces. Summary 04 and the public verification-scope excerpt from 09 are available here or already acquired from Porchlight. The player places/selects source fragments to challenge the overclaim. Correct reasoning makes the limit visible, leaves an unresolved space in the presentation, and issues the bounded source-review request. Separately offer a preview to publish the supported D1 annotation or keep it private, following KTD11. Wrong evidence receives a specific, recoverable response. Animation does not determine whether the deduction is valid.

**Verification:** Complete D1 with both media and text routes; try the summary as its own corroboration; leave midway and return; reload after resolution; skip the animation. The Oracle never reveals private information it cannot access, and repeating the encounter does not duplicate progress. Publish only after D1; cancel the preview; simulate a failed save and retry; acquire D2 afterward and verify the public annotation does not gain new information. Both private and public D1 routes issue the same valid review request.

### U10 — Make authority and enforcement playable

**Goal:** Differentiate Arbiter from Oracle and Wardens through a causal encounter. Covers R2–R5, R14.

**Files:** Create game/scenes/world/arbiter_vault/, game/scenes/avatars/arbiter/, warden/, game/content/encounters/arbiter.json, and game/tests/integration/test_arbiter_encounter.gd.

**Approach:** Provide one bounded access rule: presenting the source-review request earned through D1 authorizes inspection of commission 13 and linked service-ledger material, not access to a person's private life. The player can inspect a credential's scope on a physical display or equivalent list interface. The already public report excerpt needed for D1 remains outside the vault. The Arbiter accepts the matching request under its stated rule; the Warden receives that mandate, changes its gesture, and opens the route. It does not react merely because the player privately knows D1. Compare the authored shared identifier in report 09 and commission 13 to reach D2. No combat or precise stealth is required.

**Verification:** Premature entry gives an understandable route forward; the valid request works after reload; D1 knowledge without presenting a request does not silently update the Warden; presenting it twice cannot duplicate a result; repeated challenges cannot lock the gate permanently; unrelated credentials fail; the D2 link cannot be solved by visual resemblance or the invoice's existence alone. Changing the public/private D1 flag does not change request validity.

### U11 — Make the final choice concrete

**Goal:** Complete D3 and end with a persistent human consequence that remembers earlier choices. Covers R4, R7–R9, R14, R15.

**Files:** Create game/ui/packet_preview/, game/content/endings/mara.json, game/scripts/domain/packet_policy.gd, consequence_rules.gd, and game/tests/integration/test_mara_endings.gd.

**Approach:** Separate supported findings, uncertainties, and private context in the preview. Require the three discoveries, with optional hints available. Present all three dispositions and the private-context toggle, along with any earlier public annotation, the assurance impact, and the precise status notices witnesses will receive. Compose the six base endings with the bounded relationship overlays in KTD11, then commit through the save service. Update Archive objects, recipient-limited witness responses, and case history from the same committed record. End with the short Harbor Dawn lead through an existing Archive surface.

**Verification:** Check all 24 base/relationship combinations through the shared scenario runner; manually play the six base endings and the assurance-breach and prior-publication variants in the exported build. Withhold private context and inspect attachments, summaries, captions, citation labels, and thumbnails; compare sealed and restricted access language; cancel the preview; double-submit; simulate save failure; close immediately after a successful commit. A prior D1 posting survives Bury, an unanswered assurance is not narrated as a refusal, and a witness receives only the promised status notice. Reopen dialogue after completion and verify that the frozen ending remains unchanged. No branch leaks withheld context, retroactively retracts a posted annotation, or shows a different ending after relaunch.

**Checkpoint D:** With the complete chapter playable in provisional art, run V7 and V9 understanding and relationship checks using the protocol prepared in U1. Record results before U12. Fix failed encounter or story checks here and in the relevant earlier unit. U13 repeats the checks with fresh players on the finished export; the earlier sessions are not reused as independent confirmation.

### U12 — Produce a coherent finished presentation

**Goal:** Replace provisional assets where they carry the experience. Covers R3, R6, R7, R13.

**Files:** Create or update art-source/, game/assets/, game/scenes/avatars/, game/scenes/world/, and docs/network-3d/asset-register.md and art-audio-review.md.

**Approach:** After the complete simple chapter passes checkpoint D, finish Oracle, Arbiter, the Warden, the key spaces, the vertical clip, and witness recordings. Prioritize silhouette, gestures, spatial sound, and timing over object count. Record asset origin, allowed use, edits, and attribution. Keep editable masters, caption revisions, and runtime media synchronized.

**Verification:** Review the full experience with sound and muted, at default and large text, and at every quality tier established in U2. Compare captions against final audio, identify all provisional assets, confirm import scale/collision/animation, and profile the busiest representative scene. A visual pass must not move or hide essential clues without rechecking the affected discovery.

### U13 — Test the exported chapter and make the release decision

**Goal:** A complete local deliverable with evidence that the direction works. Covers R1–R15.

**Files:** Create game/tests/scenarios/mara_complete.json, game/tests/run_scenarios.gd, docs/network-3d/verification-report.md, known-issues.md, and release-manifest.md. Update docs/network-3d/playtest-protocol.md and repository run instructions when the native build exists.

**Approach:** Run domain and scenario checks, including the relationship matrix, then play the packaged Windows build with keyboard/mouse and controller. Run fresh-player sessions against V7 and V9; capture observations with consent in local notes. Review confusing evidence, character motivations, and encounter consequences before increasing campaign scope. Package the executable and required data with launch instructions and notices.

**Verification:** Meet the Verification Contract and Definition of Done. Record failures honestly, fix blockers, and repeat only affected checks plus a full completion run after material integration changes. The output is a local reviewable release candidate; uploading, store submission, or public release is a later action.

## Verification Contract

No native game tests or player studies have run yet. The following are planned checks with explicit evidence requirements.

| ID | Check | Evidence and passing condition |
|---|---|---|
| V1 | Canon and clue integrity | Reviewed source-to-claim and role/type/status matrices. All three discoveries supported; D1 sources reachable before the vault; proposed new details identified; no hidden classification leaked through the journal, date contradiction, circular corroboration, or false claim that fragment 14 locates Mara. |
| V2 | Rules and narrative | Automated domain/scenario tests cover valid, invalid, repeated, and reordered actions, including all 24 ending/relationship combinations. Six base endings remain reachable from legitimate play under every earlier-choice combination and impossible from merely marking everything read. Unanswered dialogue does not imply a promise or explicit refusal. |
| V3 | Save and recovery | Fault-injection results plus real filesystem relaunch tests for assurance, D1 posting, review-request presentation, and final commitment. Old/new committed states stay internally consistent; no false publication/success or silent destruction of an unsupported save. |
| V4 | Media and accessibility | Exported build demonstrates video, voice, meme, cue replay, captions, descriptions, remapping, controller, comfort settings, and large text. Test cues at start/middle/end and after replay; caption timing target within 150 ms of authored cue boundaries, with perceptual review of speech and significant sounds. |
| V5 | Navigation and interaction | Full exported playthrough; every overlay can be exited, every space has a return or recovery route, and scene changes do not leave stale input or audio. |
| V6 | Performance and packaging | Named reference hardware, engine, renderer, resolution, quality setting, and frame-time capture. Initial target: 1080p, 60 fps with at least 95% of measured gameplay frames at or below 20 ms on the chosen reference machine. Profile traversal, avatar encounter, and video playback separately. Record loading separately; investigate repeated gameplay stalls above 100 ms. These are proposed targets, not measured capabilities. |
| V7 | New-player understanding and engagement | At least five fresh players. Aim for four to explain their role within three minutes, find a useful lead within eight minutes, distinguish Oracle from Arbiter after both encounters, and distinguish supported findings from uncertainty at the ending. At least four should want to continue and identify a specific memorable moment. Record hint use and reasons for confusion; do not treat this tiny sample as market validation. |
| V8 | Release integrity | A clean extracted package starts offline, completes, saves, and resumes without editor tooling. Rights/attribution records and known issues included; current browser game and demo still available. |
| V9 | Relationships and causal understanding | In the same five fresh-player sessions used for V7, aim for four to explain why the Warden's behaviour changed, name a legitimate concern of one avatar or witness, and link a visible response to an actual player action. Inspect private and public routes to confirm no unexplained knowledge transfer. The first chapter demonstrates at least one cross-encounter change, one community response to circulation, and one witness response to a remembered choice. Record observed cases separately from hypothetical questions. |

If V7 or V9 fails, identify whether the issue is story clarity, interaction, navigation, encounter depth, or an unexplained relationship. Revise that element and test with new players before producing another full chapter. If exploration feels like walking between menus, add an observable avatar response or a meaningful spatial decision to the existing encounter before adding more map area. If players cannot distinguish the Oracle and Arbiter, clarify the difference between interpreting evidence and granting authority in the encounter itself before adding glossary text.

At checkpoint B, record whether third-person presentation would solve an observed problem that first person cannot. Do not change perspective merely to increase apparent production value. At checkpoint D, assess the complete chapter with provisional art before authorizing the full presentation workload in U12.

## Definition of Done

- [ ] U1–U13 are complete or a documented scope change has explicitly revised this contract.
- [ ] One complete Mara chapter provides four connected spaces, two major avatar encounters, one Warden interaction, three fair discoveries, and a persistent ending.
- [ ] Voice, short video, meme, and physical evidence each have an investigative purpose and accessible equivalent.
- [ ] The six disposition/private-context outcomes and their relationship overlays are authored and verified across all 24 combinations, including relaunch at critical changes.
- [ ] The Oracle, Arbiter, and Warden encounters demonstrate distinct functions and a causal connection; community and witness responses have explicit knowledge sources.
- [ ] The opening assurance, D1 annotation preview, packet destination, prior publication, and status notifications use consistent language and do not hide a commitment.
- [ ] All required checks V1–V9 have recorded results. Blocking defects are fixed; remaining limitations are visible in known issues.
- [ ] New-player feedback supports the direction or records the specific redesign needed before campaign expansion.
- [ ] A local packaged build, launch instructions, verification report, asset register, and source changes are reviewable.
- [ ] The previous browser game, saves, authored cases, and room demo remain intact.

This definition completes the first release, not the entire campaign and not a public launch.

## Appendix

### What carries forward and what changes

| Carry forward | Change under this plan |
|---|---|
| Human stakes, source provenance, uncertainty, and consequences. | The dossier becomes one tool within a traversable world. |
| Mara and the other authored cases as narrative foundations. | New encounters and adaptation details are permitted and documented. |
| Archive identity and Publish/Bury/Preserve. | Archive becomes a home space; choices have concrete destinations and aftermath. |
| Media evidence and discovery lessons from the demo. | Native playback, input, persistence, and scene integration are implemented for the selected engine. |
| Mythic roles grounded in social and technical structures. | Roles can be embodied and encountered rather than only revealed as cards. |
| The existing prototype as an accessible reference. | Room-only exploration, browser-only delivery, fixed 15-document layouts, and a two-case ceiling are not constraints on the new vision. |

### Production and resourcing

Plan in checkpoints rather than promise a completion date before the engine and content workflow are measured. The work needs gameplay engineering, narrative design, environment/character art and animation, sound/voice production, and testing. One person can cover several roles, but those jobs do not disappear when code generation is fast.

At checkpoint B, estimate the full chapter from observed work: cost per finished encounter, per connected space, per minute of final voice/video, and per tested outcome. Include time for revision, asset integration, and packaging. At checkpoint D, re-estimate the remaining presentation work from the completed simple chapter. Maintain optimistic, expected, and pessimistic ranges; explain which assumptions produce each range.

The largest likely production drivers are avatar animation, final voice/video, environmental finish, and branch verification. Use placeholders to learn early, then finish the assets that carry the story. No specific budget, staffing level, deadline, or permission to purchase assets has been assumed.

Revision 2 strengthens the existing chapter rather than adding locations or production avatars. Its added implementation work is a few saved relationship facts, two authored decision interactions, limited witness/community responses, and verification of the 24 combinations. Record the additional writing, recording, and testing effort at checkpoints B and D; the 30–45 minute duration remains a target to validate, not a requirement to rush dialogue or omit consequences.

### Decision register and research boundaries

| Question | Current recommendation or uncertainty | Resolve by |
|---|---|---|
| Initial platform | Desktop PC assumed; optional user question pending. | Before committing the production project after U2. |
| Camera | First person recommended; player avatar expression can develop later. | U2 interaction and comfort review. |
| Engine | Godot candidate; no local proof yet. | U2 native export and media checks. |
| Hardware and performance tier | Local hardware could not be verified during planning. | U2 reference machine record. |
| Literal mythos and evidence rules | New encounters are a proposed adaptation; provenance remains authoritative. | U1 canon ledger and V1. |
| Constructs and Echoes | Definitions not settled in reviewed material. | U1 if required; otherwise retained as authoring questions. |
| Timeline and budget | Unknown; no responsible fixed quote yet. | Measured workflow at B and complete simple chapter at D. |
| Full campaign scope and ports | Direction mapped, implementation not yet specified. | After F and evidence from first-release players. |

Official documentation was used for engine, media, export, and accessibility facts; developer-authored materials were used for design precedents. Stable documentation URLs can change, so the implementation must record the version actually tested. This research did not benchmark competing engines, test the user's hardware, verify every third-party integration, or establish commercial demand.

### Local grounding inspected

The recommendation was grounded in the repository's README.md, GAME_DESIGN.md, ARCHITECTURE.md, SYSTEMS_PLAN.md, ROADMAP.md and ULTIMATE_ROADMAP.md; the role registry in Archive Hub/script.js; shared case behaviour in Archive Hub/case-engine.js; the four case designs and their source artifacts; Mara's profile; and the isolated prototypes/archive-3d work. The previous output plan and the user's feedback establish the room demo's limits and the intended pivot. Source content takes precedence over a convenient new dramatic claim unless an adaptation change is explicitly authored.

### Plan review record

Prepared from repository inspection and primary-source research on 7 September 2026. A sequential self-review covered consistency, feasibility, product direction, interaction design, scope, and adversarial failure scenarios. No independent agents or cross-model reviewers were used, following the workspace instruction to perform that work in the main task.

Four corrections were applied: the Oracle chamber now has explicit implementation ownership; the checkpoint D playtest protocol and execution occur before the art unit that depends on them; an engine change explicitly requires updating dependent implementation instructions; and presentation checks refer to the quality tiers actually established in the engine proof.

**Revision 2 — relationships and story:** The user authorized strengthening the roles' relationships and other areas that improve the experience. This revision adds an explicit taxonomy, power dependencies and conflicts, local avatar personalities, a clearer opening, remembered assurances, scoped mid-case disclosure, and chapter-to-chapter continuity. R14–R15, KTD11, V9, and the affected existing units carry these changes through to implementation and verification. Native implementation and human playtesting remain future work.

Revision 2 received the same sequential self-review across consistency, feasibility, product, design, scope, and adversarial scenarios. The pass checked every new requirement against its implementation and verification owner and tightened five concrete failure points: a circular evidence/access gate, earlier publication disappearing under Bury, witnesses knowing private choices without notification, later dialogue rewriting an ending, and private details leaking through derived summaries. The explicit rules and checks now cover these cases. No additional blocking document findings remain; native behaviour has not been implemented or tested.

Platform preference, native engine suitability, production effort, and player response remain the explicitly assigned validation questions in the decision register, not verified facts. The added relationship design preserves the current four-space, two-major-avatar chapter and the earlier engine/feel checkpoint.
