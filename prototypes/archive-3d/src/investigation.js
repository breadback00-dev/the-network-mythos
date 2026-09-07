export function evaluateDiscovery(passages, claim) {
  const ids = new Set(passages);
  if (ids.size !== 2) return { valid: false, message: 'Choose two passages from different sources. One account cannot corroborate itself.' };
  if (!ids.has('summary-identity') || !ids.has('verification-boundary')) {
    return { valid: false, message: 'These sources raise a question, but do not establish the limits of verification. Compare the public summary with the report’s reviewer note.' };
  }
  if (claim !== 'operator-uncertain') {
    return { valid: false, message: claim === 'mara-replaced' ? 'That goes further than the evidence. A limitation in verification does not prove replacement.' : 'The report authenticates the account. Read carefully what it does not establish about the person.' };
  }
  return { valid: true, message: 'The account is verified. Who operates it remains unproven. You have found a gap between the source and the story built from it.' };
}

const outcomes = {
  Publish: {
    title: 'The record enters circulation.',
    body: 'Copies of the verification report spread beyond the Archive. The vendor must answer a public question. Elian’s first reply is shorter: “Please keep her location out of this.” The source terminal now reports a missing file.',
    status: 'PUBLIC COPIES DETECTED', consequence: 'A public challenge. A source withdrawn.', color: 0xbd744b,
  },
  Bury: {
    title: 'The room keeps its secret.',
    body: 'The packet is sealed. Elian has a little more time. Outside, “Mara returned” continues to become the accepted account. A request from someone who also has doubts remains unanswered.',
    status: 'RECORD SEALED', consequence: 'A witness sheltered. The public account unchanged.', color: 0x718ba5,
  },
  Preserve: {
    title: 'Someone must decide who gets in.',
    body: 'The record remains available behind a consent boundary. An access request arrives from the Porchlight. While you decide who should encounter it first, the vendor publishes its own explanation.',
    status: 'ACCESS REQUEST WAITING', consequence: 'Context protected. Accountability delayed.', color: 0xb6aa76,
  },
};
export function previewOutcome(discovered, choice) {
  return discovered && Object.hasOwn(outcomes, choice) ? outcomes[choice] : null;
}
