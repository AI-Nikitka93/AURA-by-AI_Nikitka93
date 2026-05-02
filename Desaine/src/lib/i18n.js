const supportedLanguages = ['ru', 'en']
const defaultLanguage = 'ru'

function getLocalizedHref(path, language) {
  const separator = path.includes('?') ? '&' : '?'
  return `${path}${separator}lang=${language}`
}

const localeMeta = {
  ru: {
    tag: 'ru-RU',
    openGraphLocale: 'ru_RU',
    shareTitle: 'AURA - текущая конфигурация',
    shareText: 'Откройте мой персональный ритуал AURA.',
    sharePrompt: 'Скопируйте ссылку на текущую конфигурацию',
  },
  en: {
    tag: 'en-US',
    openGraphLocale: 'en_US',
    shareTitle: 'AURA current configuration',
    shareText: 'Open my personalized AURA ritual.',
    sharePrompt: 'Copy the current configuration link',
  },
}

const pendingRequestLabels = {
  ru: ['ожидающая заявка', 'ожидающие заявки', 'ожидающих заявок'],
  en: ['pending request', 'pending requests'],
}

function getSupportedLanguage(language) {
  return supportedLanguages.includes(language) ? language : defaultLanguage
}

function getAbsoluteDate(dateValue) {
  if (dateValue instanceof Date) {
    return dateValue
  }

  if (typeof dateValue === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(dateValue)) {
    return new Date(`${dateValue}T00:00:00Z`)
  }

  return new Date(dateValue)
}

function getRussianPluralIndex(count) {
  const absoluteCount = Math.abs(count) % 100
  const lastDigit = absoluteCount % 10

  if (absoluteCount >= 11 && absoluteCount <= 14) {
    return 2
  }

  if (lastDigit === 1) {
    return 0
  }

  if (lastDigit >= 2 && lastDigit <= 4) {
    return 1
  }

  return 2
}

function upsertMetaAttribute(selector, attributeName, value) {
  const element = document.querySelector(selector)

  if (element) {
    element.setAttribute(attributeName, value)
  }
}

export function normalizeLanguage(language) {
  return getSupportedLanguage(language)
}

export function getLocaleMeta(language) {
  return localeMeta[getSupportedLanguage(language)]
}

export function getLocaleTag(language) {
  return getLocaleMeta(language).tag
}

export function formatPercent(value, language) {
  const normalized = Number(value)
  const safeValue = Number.isFinite(normalized) ? normalized : 0

  return new Intl.NumberFormat(getLocaleTag(language), {
    style: 'percent',
    maximumFractionDigits: 0,
  }).format(safeValue / 100)
}

export function formatLongDate(dateValue, language) {
  return new Intl.DateTimeFormat(getLocaleTag(language), {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(getAbsoluteDate(dateValue))
}

export function formatPendingRequestCount(count, language) {
  const locale = getSupportedLanguage(language)
  const normalized = Number.isFinite(Number(count)) ? Math.max(0, Math.trunc(Number(count))) : 0

  if (locale === 'ru') {
    const label = pendingRequestLabels.ru[getRussianPluralIndex(normalized)]
    return `${normalized} ${label}`
  }

  const label = normalized === 1 ? pendingRequestLabels.en[0] : pendingRequestLabels.en[1]

  return `${normalized} ${label}`
}

export function buildCanonicalHref(path, language) {
  return getLocalizedHref(path, getSupportedLanguage(language))
}

export function buildAlternateLinks(path) {
  return [
    { language: 'ru', href: buildCanonicalHref(path, 'ru') },
    { language: 'en', href: buildCanonicalHref(path, 'en') },
    { language: 'x-default', href: buildCanonicalHref(path, defaultLanguage) },
  ]
}

export function applySeoMetadata({
  language,
  pagePath,
  title,
  description,
  imageUrl,
}) {
  if (typeof document === 'undefined' || typeof window === 'undefined') {
    return
  }

  const normalizedLanguage = getSupportedLanguage(language)
  const locale = getLocaleMeta(normalizedLanguage)
  const canonicalUrl = new URL(buildCanonicalHref(pagePath, normalizedLanguage), window.location.origin).toString()
  const absoluteImageUrl = imageUrl
    ? new URL(imageUrl, window.location.origin).toString()
    : null

  document.documentElement.lang = normalizedLanguage
  document.title = title

  upsertMetaAttribute('meta[name="description"]', 'content', description)
  upsertMetaAttribute('meta[property="og:title"]', 'content', title)
  upsertMetaAttribute('meta[property="og:description"]', 'content', description)
  upsertMetaAttribute('meta[property="og:url"]', 'content', canonicalUrl)
  upsertMetaAttribute('meta[property="og:locale"]', 'content', locale.openGraphLocale)
  upsertMetaAttribute('meta[name="twitter:title"]', 'content', title)
  upsertMetaAttribute('meta[name="twitter:description"]', 'content', description)

  if (absoluteImageUrl) {
    upsertMetaAttribute('meta[property="og:image"]', 'content', absoluteImageUrl)
    upsertMetaAttribute('meta[name="twitter:image"]', 'content', absoluteImageUrl)
  }

  const canonicalLink = document.querySelector('link[rel="canonical"]')

  if (canonicalLink) {
    canonicalLink.setAttribute('href', canonicalUrl)
  }

  for (const entry of buildAlternateLinks(pagePath)) {
    const selector = `link[rel="alternate"][hreflang="${entry.language}"]`
    const alternateLink = document.querySelector(selector)

    if (alternateLink) {
      alternateLink.setAttribute(
        'href',
        new URL(entry.href, window.location.origin).toString()
      )
    }
  }
}
