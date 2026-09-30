import test from 'node:test';
import assert from 'node:assert/strict';

import { normalizeDecisionRequest } from '../accesscore.js';

test('normalizes a decision request', () => {
  assert.deepEqual(
    normalizeDecisionRequest({
      subject: 'user:123',
      action: 'lmts.report.read',
      resource: 'lmts.report:abc',
    }),
    {
      subject: 'user:123',
      action: 'lmts.report.read',
      resource: 'lmts.report:abc',
      context: {},
    },
  );
});

test('requires subject, action and resource', () => {
  assert.throws(() => normalizeDecisionRequest({}));
  assert.throws(() => normalizeDecisionRequest({
    subject: 'user:123',
    resource: 'lmts.report:abc',
  }));
  assert.throws(() => normalizeDecisionRequest({
    subject: 'user:123',
    action: 'lmts.report.read',
  }));
});
