import test from 'node:test';
import assert from 'node:assert/strict';
import { evaluateDiscovery, previewOutcome } from '../src/investigation.js';

test('a summary alone cannot establish a discovery', () => {
  assert.equal(evaluateDiscovery(['summary-identity'], 'operator-uncertain').valid, false);
});
test('the summary and verification boundary support limited certainty in either order', () => {
  for (const pair of [['summary-identity', 'verification-boundary'], ['verification-boundary', 'summary-identity']]) {
    assert.equal(evaluateDiscovery(pair, 'operator-uncertain').valid, true);
    assert.equal(evaluateDiscovery(pair, 'mara-replaced').valid, false);
  }
});
test('two passages from one source and emotional testimony do not substitute for the report', () => {
  assert.equal(evaluateDiscovery(['summary-identity', 'summary-no-evidence'], 'operator-uncertain').valid, false);
  assert.equal(evaluateDiscovery(['voice-doubt', 'summary-identity'], 'operator-uncertain').valid, false);
});
test('a consequence preview requires the discovery and a supported choice', () => {
  assert.equal(previewOutcome(false, 'Publish'), null);
  assert.equal(previewOutcome(true, 'unknown'), null);
  assert.match(previewOutcome(true, 'Publish').title, /circulation/i);
  assert.notEqual(previewOutcome(true, 'Bury').body, previewOutcome(true, 'Preserve').body);
});
