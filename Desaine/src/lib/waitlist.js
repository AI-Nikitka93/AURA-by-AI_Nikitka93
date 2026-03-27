const DEFAULT_WAITLIST_WORKER = 'https://aura-portfolio-worker.aiomdurman.workers.dev'
const WAITLIST_API_BASE = (import.meta.env.VITE_WAITLIST_API_BASE || '').trim()

export const RITUAL_OPTIONS = ['glow', 'calm', 'pulse']

export class WaitlistApiError extends Error {
  constructor(message, options = {}) {
    super(message)
    this.name = 'WaitlistApiError'
    this.status = options.status ?? 0
    this.code = options.code ?? 'waitlist_error'
    this.details = options.details ?? null
  }
}

export function sanitizeRitual(value) {
  return RITUAL_OPTIONS.includes(value) ? value : null
}

export function sanitizeIntensity(value) {
  const normalized = Number(value)

  if (!Number.isFinite(normalized)) {
    return 50
  }

  return Math.max(0, Math.min(100, Math.round(normalized)))
}

function buildUrl(pathname) {
  let base = WAITLIST_API_BASE || window.location.origin

  if (!WAITLIST_API_BASE && window.location.hostname.includes('github.io')) {
    base = DEFAULT_WAITLIST_WORKER
  }

  return new URL(pathname, base).toString()
}

async function fetchJson(url, options = {}, timeoutMs = 5000) {
  const controller = new AbortController()
  const timerId = window.setTimeout(() => controller.abort(), timeoutMs)

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    })

    const text = await response.text()
    const payload = text ? JSON.parse(text) : {}

    if (!response.ok) {
      throw new WaitlistApiError(payload.message || 'Waitlist request failed.', {
        status: response.status,
        code: payload.code,
        details: payload,
      })
    }

    return payload
  } catch (error) {
    if (error.name === 'AbortError') {
      throw new WaitlistApiError('Waitlist relay timed out.', {
        code: 'waitlist_timeout',
      })
    }

    if (error instanceof WaitlistApiError) {
      throw error
    }

    throw new WaitlistApiError('Waitlist relay is unavailable.', {
      code: 'waitlist_unreachable',
      details: error,
    })
  } finally {
    window.clearTimeout(timerId)
  }
}

export async function fetchWaitlistCapabilities() {
  try {
    const payload = await fetchJson(buildUrl('/api/waitlist'), {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    }, 3500)

    return {
      checked: true,
      acceptingSubmissions: Boolean(payload.acceptingSubmissions),
      mode: payload.mode || 'device',
      label: payload.label || 'Device queue',
      message: payload.message || '',
    }
  } catch {
    return {
      checked: true,
      acceptingSubmissions: false,
      mode: 'device',
      label: 'Device queue',
      message: 'Live relay is not available yet. Requests stay on this device until sync is enabled.',
    }
  }
}

export async function submitWaitlist(payload) {
  return fetchJson(buildUrl('/api/waitlist'), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(payload),
  }, 8000)
}
