import test from 'node:test'
import assert from 'node:assert/strict'

import worker from '../worker/index.js'

const createEnv = () => ({
  ASSETS: {
    fetch: async () => new Response('asset', { status: 200 }),
  },
})

test('POST /api/aura-signal rejects requests without Origin', async () => {
  const request = new Request('https://example.com/api/aura-signal', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      language: 'ru',
      ritual: 'glow',
      intensity: 42,
      wearMoment: 'daily',
      ecosystem: 'ios',
      fitPreference: 'balanced',
      profileLabel: 'Тест',
      wearLabel: 'Ежедневный фокус',
      ecosystemLabel: 'Сначала iPhone',
      fitLabel: 'Сбалансированная посадка',
      fitNote: 'Тест',
      ecosystemNote: 'Тест',
      localSummary: 'Тест',
      localDirection: 'Тест',
    }),
  })

  const response = await worker.fetch(request, createEnv())
  const payload = await response.json()

  assert.equal(response.status, 403)
  assert.equal(payload.code, 'forbidden_origin')
})

test('GET /api/aura-signal still returns availability without Origin', async () => {
  const request = new Request('https://example.com/api/aura-signal', {
    method: 'GET',
  })

  const response = await worker.fetch(request, createEnv())

  assert.equal(response.status, 200)
})

test('POST /api/aura-signal rejects oversized prompt inputs', async () => {
  const oversizedText = 'x'.repeat(700)
  const request = new Request('https://example.com/api/aura-signal', {
    method: 'POST',
    headers: {
      Origin: 'https://ai-nikitka93.github.io',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      language: 'ru',
      ritual: 'glow',
      intensity: 42,
      wearMoment: 'daily',
      ecosystem: 'ios',
      fitPreference: 'balanced',
      profileLabel: oversizedText,
      wearLabel: 'Ежедневный фокус',
      ecosystemLabel: 'Сначала iPhone',
      fitLabel: 'Сбалансированная посадка',
      fitNote: 'Тест',
      ecosystemNote: 'Тест',
      localSummary: 'Тест',
      localDirection: 'Тест',
    }),
  })

  const response = await worker.fetch(request, createEnv())
  const payload = await response.json()

  assert.equal(response.status, 400)
  assert.equal(payload.code, 'invalid_payload')
})
