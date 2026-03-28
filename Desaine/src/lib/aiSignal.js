const DEFAULT_WORKER_BASE = 'https://aura-portfolio-worker.aiartbora.workers.dev'
const AI_API_BASE = (import.meta.env.VITE_AI_API_BASE || '').trim()

export class AiSignalError extends Error {
  constructor(message, options = {}) {
    super(message)
    this.name = 'AiSignalError'
    this.status = options.status ?? 0
    this.code = options.code ?? 'ai_signal_error'
    this.details = options.details ?? null
  }
}

function buildUrl(pathname) {
  let base = AI_API_BASE || window.location.origin

  if (!AI_API_BASE && window.location.hostname.includes('github.io')) {
    base = DEFAULT_WORKER_BASE
  }

  return new URL(pathname, base).toString()
}

async function fetchJson(url, options = {}, timeoutMs = 12000) {
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
      throw new AiSignalError(payload.message || 'AI signal request failed.', {
        status: response.status,
        code: payload.code,
        details: payload,
      })
    }

    return payload
  } catch (error) {
    if (error.name === 'AbortError') {
      throw new AiSignalError('AI signal request timed out.', {
        code: 'ai_signal_timeout',
      })
    }

    if (error instanceof AiSignalError) {
      throw error
    }

    throw new AiSignalError('AI signal service is unavailable.', {
      code: 'ai_signal_unreachable',
      details: error,
    })
  } finally {
    window.clearTimeout(timerId)
  }
}

export async function fetchAiSignalCapabilities() {
  try {
    const payload = await fetchJson(buildUrl('/api/aura-signal'), {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    }, 5000)

    return {
      available: Boolean(payload.available),
      mode: payload.mode || 'fallback',
      label: payload.label || 'AI fallback',
      message: payload.message || '',
      model: payload.model || null,
    }
  } catch {
    return {
      available: true,
      mode: 'local',
      label: 'Local AI fallback',
      message: 'Remote AI is not reachable right now. The site will generate a local result instead.',
      model: null,
    }
  }
}

export async function generateAiSignalBrief(payload) {
  return fetchJson(buildUrl('/api/aura-signal'), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(payload),
  })
}
