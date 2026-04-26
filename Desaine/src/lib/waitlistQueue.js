const MAX_PENDING_WAITLIST_ENTRIES = 10

export function normalizeWaitlistEmail(value) {
  return typeof value === 'string' ? value.trim().toLowerCase() : ''
}

export function createLocalSubmission(payload, queuedAt = new Date().toISOString()) {
  return {
    localId: globalThis.crypto?.randomUUID?.() || `pending-${Date.now()}`,
    payload,
    queuedAt,
  }
}

export function dedupePendingWaitlist(pending) {
  const normalizedPending = Array.isArray(pending) ? pending : []
  const seenEmails = new Set()
  const result = []

  for (const entry of normalizedPending) {
    const normalizedEmail = normalizeWaitlistEmail(entry?.payload?.email)

    if (normalizedEmail && seenEmails.has(normalizedEmail)) {
      continue
    }

    if (normalizedEmail) {
      seenEmails.add(normalizedEmail)
    }

    result.push(entry)

    if (result.length >= MAX_PENDING_WAITLIST_ENTRIES) {
      break
    }
  }

  return result
}

export function sanitizeWaitlistState(state) {
  return {
    pending: dedupePendingWaitlist(state?.pending),
    lastSubmission: state?.lastSubmission ?? null,
  }
}

export function upsertPendingWaitlistEntry(currentState, payload, queuedAt = new Date().toISOString()) {
  const normalizedEmail = normalizeWaitlistEmail(payload?.email)
  const pending = Array.isArray(currentState?.pending) ? currentState.pending : []
  const existingEntry = normalizedEmail
    ? pending.find((entry) => normalizeWaitlistEmail(entry?.payload?.email) === normalizedEmail)
    : null

  const nextEntry = existingEntry
    ? {
        ...existingEntry,
        payload,
        queuedAt,
      }
    : createLocalSubmission(payload, queuedAt)

  const nextPending = [
    nextEntry,
    ...pending.filter((entry) => entry.localId !== existingEntry?.localId),
  ]

  return {
    ...sanitizeWaitlistState(currentState),
    pending: dedupePendingWaitlist(nextPending),
  }
}
