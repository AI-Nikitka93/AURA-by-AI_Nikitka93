import test from 'node:test'
import assert from 'node:assert/strict'

import {
  buildAlternateLinks,
  formatLongDate,
  formatPendingRequestCount,
  formatPercent,
  getLocaleMeta,
  getLocaleTag,
} from '../src/lib/i18n.js'

test('getLocaleTag resolves supported app languages to full locale tags', () => {
  assert.equal(getLocaleTag('ru'), 'ru-RU')
  assert.equal(getLocaleTag('en'), 'en-US')
  assert.equal(getLocaleTag('de'), 'ru-RU')
})

test('formatPendingRequestCount uses locale-aware plural forms', () => {
  assert.equal(formatPendingRequestCount(1, 'ru'), '1 ожидающая заявка')
  assert.equal(formatPendingRequestCount(2, 'ru'), '2 ожидающие заявки')
  assert.equal(formatPendingRequestCount(5, 'ru'), '5 ожидающих заявок')
  assert.equal(formatPendingRequestCount(1, 'en'), '1 pending request')
  assert.equal(formatPendingRequestCount(3, 'en'), '3 pending requests')
})

test('formatPercent uses locale-aware percent formatting', () => {
  assert.match(formatPercent(42, 'ru'), /^42(?:\s|\u00A0)%$/)
  assert.equal(formatPercent(42, 'en'), '42%')
})

test('formatLongDate uses locale-aware month names', () => {
  assert.match(formatLongDate('2026-03-28', 'ru'), /28 .* 2026/)
  assert.equal(formatLongDate('2026-03-28', 'en'), 'March 28, 2026')
})

test('getLocaleMeta returns locale-specific share and open graph data', () => {
  const ruMeta = getLocaleMeta('ru')
  const enMeta = getLocaleMeta('en')

  assert.equal(ruMeta.openGraphLocale, 'ru_RU')
  assert.equal(enMeta.openGraphLocale, 'en_US')
  assert.equal(ruMeta.shareTitle, 'AURA - текущая конфигурация')
  assert.equal(enMeta.sharePrompt, 'Copy the current configuration link')
})

test('buildAlternateLinks creates locale routes for canonical surfaces', () => {
  assert.deepEqual(buildAlternateLinks('privacy.html'), [
    { language: 'ru', href: 'privacy.html?lang=ru' },
    { language: 'en', href: 'privacy.html?lang=en' },
    { language: 'x-default', href: 'privacy.html?lang=ru' },
  ])
})
