import test from 'node:test'
import assert from 'node:assert/strict'

import { upsertPendingWaitlistEntry } from '../src/lib/waitlistQueue.js'

test('upsertPendingWaitlistEntry keeps a single pending entry per email', () => {
  const firstPayload = {
    submissionId: 'submission-1',
    email: 'demo@example.com',
    ritual: 'glow',
    intensity: 40,
  }
  const secondPayload = {
    submissionId: 'submission-2',
    email: ' Demo@example.com ',
    ritual: 'pulse',
    intensity: 65,
  }

  const stateAfterFirstInsert = upsertPendingWaitlistEntry(
    { pending: [], lastSubmission: null },
    firstPayload,
    '2026-04-26T20:00:00.000Z',
  )
  const stateAfterSecondInsert = upsertPendingWaitlistEntry(
    stateAfterFirstInsert,
    secondPayload,
    '2026-04-26T20:01:00.000Z',
  )

  assert.equal(stateAfterSecondInsert.pending.length, 1)
  assert.equal(stateAfterSecondInsert.pending[0].payload.email, ' Demo@example.com ')
  assert.equal(stateAfterSecondInsert.pending[0].payload.ritual, 'pulse')
  assert.equal(stateAfterSecondInsert.pending[0].queuedAt, '2026-04-26T20:01:00.000Z')
})
