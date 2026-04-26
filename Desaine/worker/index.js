const ritualOptions = new Set(['glow', 'calm', 'pulse'])
const wearMomentOptions = new Set(['daily', 'evening', 'travel'])
const ecosystemOptions = new Set(['ios', 'android', 'mixed'])
const fitPreferenceOptions = new Set(['comfort', 'balanced', 'statement'])
const languageOptions = new Set(['ru', 'en'])
const DEFAULT_AI_MODEL = '@cf/meta/llama-3.1-8b-instruct'
const ALLOWED_AI_ORIGINS = new Set([
  'https://ai-nikitka93.github.io',
  'http://localhost:5173',
])
const AI_PROMPT_TEXT_FIELDS = [
  'profileLabel',
  'wearLabel',
  'ecosystemLabel',
  'fitLabel',
  'fitNote',
  'ecosystemNote',
  'localSummary',
  'localDirection',
]
const MAX_AI_PROMPT_FIELD_LENGTH = 320
const MAX_AI_PROMPT_TOTAL_LENGTH = 1400

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

function getAiMode(env) {
  return env.AI ? 'workers-ai' : 'fallback'
}

function readAiPromptTextField(payload, fieldName) {
  return typeof payload[fieldName] === 'string' ? payload[fieldName].trim() : ''
}

function isAllowedAiOrigin(request) {
  const origin = request.headers.get('origin')

  if (!origin) {
    return false
  }

  return ALLOWED_AI_ORIGINS.has(origin)
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

function validateAiPayload(payload) {
  const language = typeof payload.language === 'string' ? payload.language : ''
  const ritual = typeof payload.ritual === 'string' ? payload.ritual : ''
  const intensity = Number(payload.intensity)
  const wearMoment = typeof payload.wearMoment === 'string' ? payload.wearMoment : ''
  const ecosystem = typeof payload.ecosystem === 'string' ? payload.ecosystem : ''
  const fitPreference = typeof payload.fitPreference === 'string' ? payload.fitPreference : ''
  const promptFieldLengths = AI_PROMPT_TEXT_FIELDS.map((fieldName) => readAiPromptTextField(payload, fieldName).length)
  const totalPromptLength = promptFieldLengths.reduce((sum, fieldLength) => sum + fieldLength, 0)

  if (!languageOptions.has(language)) {
    return 'Language is invalid.'
  }

  if (!ritualOptions.has(ritual)) {
    return 'Ritual is invalid.'
  }

  if (!Number.isFinite(intensity) || intensity < 0 || intensity > 100) {
    return 'Intensity must stay between 0 and 100.'
  }

  if (!wearMomentOptions.has(wearMoment)) {
    return 'Wear moment is invalid.'
  }

  if (!ecosystemOptions.has(ecosystem)) {
    return 'Ecosystem is invalid.'
  }

  if (!fitPreferenceOptions.has(fitPreference)) {
    return 'Fit preference is invalid.'
  }

  if (promptFieldLengths.some((fieldLength) => fieldLength > MAX_AI_PROMPT_FIELD_LENGTH)) {
    return 'AI prompt input is too long.'
  }

  if (totalPromptLength > MAX_AI_PROMPT_TOTAL_LENGTH) {
    return 'AI prompt input is too long.'
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

function createAiMessages(payload) {
  const language = payload.language === 'ru' ? 'ru' : 'en'

  if (language === 'ru') {
    return [
      {
        role: 'system',
        content:
          'Ты premium product storyteller для бренда умных украшений. Пиши только на чистом русском языке. ' +
          'Допустимы только названия бренда AURA и платформ iPhone, iOS, Android. ' +
          'Нужен короткий, дорогой по тону, но конкретный AI brief без фейковых обещаний. ' +
          'Не используй медицинские claims, не обещай продажи и не называй проект реальным магазином. ' +
          'Не используй markdown, звёздочки, решётки, списки или служебные заголовки. ' +
          'Верни ровно 3 коротких абзаца без списков: narrative, product direction, companion/app direction. ' +
          'Держи общий объём около 90-130 слов.',
      },
      {
        role: 'user',
        content:
          `Собери AI brief для AURA.\n` +
          `Профиль: ${readAiPromptTextField(payload, 'profileLabel')}\n` +
          `Ритуал: ${payload.ritual} (${payload.intensity}%)\n` +
          `Сценарий ношения: ${readAiPromptTextField(payload, 'wearLabel')}\n` +
          `Экосистема: ${readAiPromptTextField(payload, 'ecosystemLabel')}\n` +
          `Посадка: ${readAiPromptTextField(payload, 'fitLabel')}\n` +
          `Подсказка по посадке: ${readAiPromptTextField(payload, 'fitNote')}\n` +
          `Логика companion-опыта: ${readAiPromptTextField(payload, 'ecosystemNote')}\n` +
          `Локальное резюме: ${readAiPromptTextField(payload, 'localSummary')}\n` +
          `Локальное направление: ${readAiPromptTextField(payload, 'localDirection')}\n` +
          `Сделай текст полезным для портфолио-кейса и будущего luxury-tech продукта.`,
      },
    ]
  }

  return [
    {
      role: 'system',
      content:
        'You are a premium product storyteller for a smart jewelry concept brand. Write in English. ' +
        'Create a short high-end AI brief with concrete direction and no fake claims. ' +
        'Do not make medical claims, revenue claims, or present the concept as a live store. ' +
        'Do not use markdown, asterisks, headings, or bullet points. ' +
        'Return exactly 3 short paragraphs with no bullet points: 1) narrative, 2) product direction, 3) companion/app direction. ' +
        'Keep the total length around 90-130 words.',
    },
    {
      role: 'user',
      content:
        `Build an AI brief for AURA.\n` +
        `Profile: ${readAiPromptTextField(payload, 'profileLabel')}\n` +
        `Ritual: ${payload.ritual} (${payload.intensity}%)\n` +
        `Wear context: ${readAiPromptTextField(payload, 'wearLabel')}\n` +
        `Ecosystem: ${readAiPromptTextField(payload, 'ecosystemLabel')}\n` +
        `Fit: ${readAiPromptTextField(payload, 'fitLabel')}\n` +
        `Fit guidance: ${readAiPromptTextField(payload, 'fitNote')}\n` +
        `Companion logic: ${readAiPromptTextField(payload, 'ecosystemNote')}\n` +
        `Local summary: ${readAiPromptTextField(payload, 'localSummary')}\n` +
        `Local direction: ${readAiPromptTextField(payload, 'localDirection')}\n` +
        `Make it useful both for a portfolio case and a future luxury-tech product direction.`,
    },
  ]
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

    if (url.pathname === '/api/aura-signal' && request.method === 'GET') {
      const mode = getAiMode(env)
      const model = env.AURA_AI_MODEL || DEFAULT_AI_MODEL

      return json({
        available: mode === 'workers-ai',
        mode,
        label: mode === 'workers-ai' ? 'Cloudflare AI active' : 'AI fallback',
        message: mode === 'workers-ai'
          ? 'Workers AI binding is active and ready to generate signal briefs.'
          : 'Workers AI binding is not configured. The site can still use a local fallback brief.',
        model,
      })
    }

    if (url.pathname === '/api/aura-signal' && request.method === 'POST') {
      if (!isAllowedAiOrigin(request)) {
        return json({
          code: 'forbidden_origin',
          message: 'Origin is not allowed for AI signal generation.',
        }, { status: 403 })
      }

      let payload

      try {
        payload = await request.json()
      } catch {
        return json({
          code: 'invalid_json',
          message: 'Request body must be valid JSON.',
        }, { status: 400 })
      }

      const validationError = validateAiPayload(payload)

      if (validationError) {
        return json({
          code: 'invalid_payload',
          message: validationError,
        }, { status: 400 })
      }

      if (!env.AI) {
        return json({
          code: 'ai_not_configured',
          message: 'Workers AI binding is not configured yet.',
        }, { status: 503 })
      }

      const model = env.AURA_AI_MODEL || DEFAULT_AI_MODEL

      try {
        const response = await env.AI.run(model, {
          messages: createAiMessages(payload),
          max_tokens: 220,
          temperature: 0.35,
        })

        return json({
          ok: true,
          mode: 'workers-ai',
          label: 'Cloudflare AI active',
          model,
          brief: response.response || '',
          usage: response.usage || null,
          message: 'Signal brief generated successfully.',
        })
      } catch (error) {
        return json({
          code: 'ai_generation_failed',
          message: 'Workers AI could not generate the signal brief.',
          details: error.message,
        }, { status: 502 })
      }
    }

    return env.ASSETS.fetch(request)
  },
}
