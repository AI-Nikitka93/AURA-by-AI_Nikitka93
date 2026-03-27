const ritualOptions = new Set(['glow', 'calm', 'pulse'])
const wearMomentOptions = new Set(['daily', 'evening', 'travel'])
const ecosystemOptions = new Set(['ios', 'android', 'mixed'])
const fitPreferenceOptions = new Set(['comfort', 'balanced', 'statement'])

function json(data, init = {}) {
  const headers = new Headers(init.headers)

  headers.set('Content-Type', 'application/json; charset=utf-8')
  headers.set('Access-Control-Allow-Origin', '*')
  headers.set('Access-Control-Allow-Methods', 'GET,POST,OPTIONS')
  headers.set('Access-Control-Allow-Headers', 'Content-Type')

  return new Response(JSON.stringify(data), {
    ...init,
    headers,
  })
}

function getRelayMode(env) {
  if (env.RESEND_API_KEY && env.WAITLIST_NOTIFY_EMAIL && env.WAITLIST_FROM_EMAIL) {
    return 'resend'
  }

  if (env.WAITLIST_WEBHOOK_URL) {
    return 'webhook'
  }

  return 'device'
}

function validatePayload(payload) {
  const email = typeof payload.email === 'string' ? payload.email.trim() : ''
  const name = typeof payload.name === 'string' ? payload.name.trim() : ''
  const ritual = typeof payload.ritual === 'string' ? payload.ritual : ''
  const intensity = Number(payload.intensity)

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return 'Email is invalid.'
  }

  if (name && name.length < 2) {
    return 'Name is too short.'
  }

  if (!ritualOptions.has(ritual)) {
    return 'Ritual must be one of glow, calm or pulse.'
  }

  if (!Number.isFinite(intensity) || intensity < 0 || intensity > 100) {
    return 'Intensity must stay between 0 and 100.'
  }

  if (payload.privacyAccepted !== true) {
    return 'Privacy acceptance is required.'
  }

  if (payload.wearMoment && !wearMomentOptions.has(payload.wearMoment)) {
    return 'Wear moment is invalid.'
  }

  if (payload.ecosystem && !ecosystemOptions.has(payload.ecosystem)) {
    return 'Ecosystem is invalid.'
  }

  if (payload.fitPreference && !fitPreferenceOptions.has(payload.fitPreference)) {
    return 'Fit preference is invalid.'
  }

  return null
}

function createMessageText(payload, request) {
  return [
    'AURA waitlist submission',
    `Email: ${payload.email}`,
    `Name: ${payload.name || 'Not provided'}`,
    `Ritual: ${payload.ritual}`,
    `Intensity: ${payload.intensity}%`,
    `Wear moment: ${payload.wearMoment || 'Not provided'}`,
    `Ecosystem: ${payload.ecosystem || 'Not provided'}`,
    `Fit preference: ${payload.fitPreference || 'Not provided'}`,
    `Consent to contact: ${payload.consentToContact ? 'Yes' : 'No'}`,
    `Source URL: ${payload.sourceUrl || request.url}`,
    `Submitted at: ${payload.submittedAt || new Date().toISOString()}`,
    `IP country: ${request.cf?.country || 'Unknown'}`,
    `User agent: ${request.headers.get('user-agent') || 'Unknown'}`,
  ].join('\n')
}

async function sendWithResend(env, payload, request) {
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: env.WAITLIST_FROM_EMAIL,
      to: [env.WAITLIST_NOTIFY_EMAIL],
      reply_to: payload.email,
      subject: `AURA waitlist: ${payload.ritual} (${payload.intensity}%)`,
      text: createMessageText(payload, request),
    }),
  })

  if (!response.ok) {
    const details = await response.text()
    throw new Error(`Resend relay failed: ${details}`)
  }

  const result = await response.json()

  return {
    relayId: result.id,
    mode: 'resend',
  }
}

async function sendWithWebhook(env, payload, request) {
  const response = await fetch(env.WAITLIST_WEBHOOK_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(env.WAITLIST_WEBHOOK_SECRET
        ? { Authorization: `Bearer ${env.WAITLIST_WEBHOOK_SECRET}` }
        : {}),
    },
    body: JSON.stringify({
      ...payload,
      userAgent: request.headers.get('user-agent'),
      cf: request.cf,
      receivedAt: new Date().toISOString(),
    }),
  })

  if (!response.ok) {
    const details = await response.text()
    throw new Error(`Webhook relay failed: ${details}`)
  }

  return {
    relayId: request.headers.get('cf-ray') || `webhook-${Date.now()}`,
    mode: 'webhook',
  }
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url)

    if (request.method === 'OPTIONS' && url.pathname.startsWith('/api/')) {
      return json({ ok: true })
    }

    if (url.pathname === '/api/waitlist' && request.method === 'GET') {
      const mode = getRelayMode(env)

      return json({
        acceptingSubmissions: mode !== 'device',
        mode,
        label: mode === 'device' ? 'Device queue' : 'Live relay',
        message: mode === 'device'
          ? 'Worker API is live, but no upstream relay is configured yet.'
          : 'Worker API is connected to an upstream waitlist relay.',
      })
    }

    if (url.pathname === '/api/waitlist' && request.method === 'POST') {
      let payload

      try {
        payload = await request.json()
      } catch {
        return json({
          code: 'invalid_json',
          message: 'Request body must be valid JSON.',
        }, { status: 400 })
      }

      const validationError = validatePayload(payload)

      if (validationError) {
        return json({
          code: 'invalid_payload',
          message: validationError,
        }, { status: 400 })
      }

      const mode = getRelayMode(env)

      if (mode === 'device') {
        return json({
          code: 'waitlist_not_configured',
          message: 'Waitlist relay is not configured yet.',
        }, { status: 503 })
      }

      try {
        const relayResult = mode === 'resend'
          ? await sendWithResend(env, payload, request)
          : await sendWithWebhook(env, payload, request)

        return json({
          ok: true,
          mode: relayResult.mode,
          relayId: relayResult.relayId,
          message: 'Waitlist submission accepted.',
        }, { status: 201 })
      } catch (error) {
        return json({
          code: 'relay_failed',
          message: 'Upstream waitlist relay failed.',
          details: error.message,
        }, { status: 502 })
      }
    }

    return env.ASSETS.fetch(request)
  },
}
