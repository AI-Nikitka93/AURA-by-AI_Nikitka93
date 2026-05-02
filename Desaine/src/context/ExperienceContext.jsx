import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import {
  fetchWaitlistCapabilities,
  sanitizeIntensity,
  sanitizeRitual,
  submitWaitlist,
} from '../lib/waitlist'
import {
  sanitizeWaitlistState,
  upsertPendingWaitlistEntry,
} from '../lib/waitlistQueue'
import { defaultLanguage, supportedLanguages } from '../data/landingContent'
import { getLocaleMeta } from '../lib/i18n'

const CONSENT_STORAGE_KEY = 'aura:consent:v1'
const LANGUAGE_STORAGE_KEY = 'aura:language:v1'
const EXPERIENCE_STORAGE_KEY = 'aura:experience:v1'
const WAITLIST_STORAGE_KEY = 'aura:waitlist:v1'

const defaultConsent = {
  resolved: false,
  necessary: true,
  functional: true,
  analytics: false,
  lastUpdatedAt: null,
}

const defaultExperience = {
  ritual: null,
  intensity: 50,
  wearMoment: 'daily',
  ecosystem: 'ios',
  fitPreference: 'balanced',
}

const defaultWaitlistState = {
  pending: [],
  lastSubmission: null,
}

const defaultWaitlistStatus = {
  checked: false,
  acceptingSubmissions: false,
  mode: 'device',
  label: 'Checking relay',
  message: '',
}

const ExperienceContext = createContext(null)

const wearMomentOptions = new Set(['daily', 'evening', 'travel'])
const ecosystemOptions = new Set(['ios', 'android', 'mixed'])
const fitPreferenceOptions = new Set(['comfort', 'balanced', 'statement'])
const supportedLanguageOptions = new Set(supportedLanguages)

function readJsonStorage(key, fallbackValue) {
  if (typeof window === 'undefined') {
    return fallbackValue
  }

  try {
    const rawValue = window.localStorage.getItem(key)
    return rawValue ? JSON.parse(rawValue) : fallbackValue
  } catch {
    return fallbackValue
  }
}

function removeStorage(key) {
  if (typeof window === 'undefined') {
    return
  }

  try {
    window.localStorage.removeItem(key)
  } catch {
    // Ignore storage failures to keep the experience resilient.
  }
}

function writeJsonStorage(key, value) {
  if (typeof window === 'undefined') {
    return
  }

  try {
    window.localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // Ignore storage failures to keep the experience resilient.
  }
}

function resolveInitialExperience(consent) {
  const query = new URLSearchParams(window.location.search)
  const ritualFromUrl = sanitizeRitual(query.get('ritual'))
  const intensityFromUrl = query.has('intensity')
    ? sanitizeIntensity(query.get('intensity'))
    : null
  const wearMomentFromUrl = wearMomentOptions.has(query.get('wear'))
    ? query.get('wear')
    : null
  const ecosystemFromUrl = ecosystemOptions.has(query.get('ecosystem'))
    ? query.get('ecosystem')
    : null
  const fitPreferenceFromUrl = fitPreferenceOptions.has(query.get('fit'))
    ? query.get('fit')
    : null

  if (ritualFromUrl) {
    return {
      ritual: ritualFromUrl,
      intensity: intensityFromUrl ?? 50,
      wearMoment: wearMomentFromUrl || defaultExperience.wearMoment,
      ecosystem: ecosystemFromUrl || defaultExperience.ecosystem,
      fitPreference: fitPreferenceFromUrl || defaultExperience.fitPreference,
    }
  }

  if (!consent.functional) {
    return defaultExperience
  }

  const savedExperience = readJsonStorage(EXPERIENCE_STORAGE_KEY, defaultExperience)

  return {
    ritual: sanitizeRitual(savedExperience.ritual),
    intensity: sanitizeIntensity(savedExperience.intensity),
    wearMoment: wearMomentOptions.has(savedExperience.wearMoment) ? savedExperience.wearMoment : defaultExperience.wearMoment,
    ecosystem: ecosystemOptions.has(savedExperience.ecosystem) ? savedExperience.ecosystem : defaultExperience.ecosystem,
    fitPreference: fitPreferenceOptions.has(savedExperience.fitPreference) ? savedExperience.fitPreference : defaultExperience.fitPreference,
  }
}

function resolveInitialLanguage() {
  if (typeof window === 'undefined') {
    return defaultLanguage
  }

  const query = new URLSearchParams(window.location.search)
  const languageFromUrl = query.get('lang')

  if (supportedLanguageOptions.has(languageFromUrl)) {
    return languageFromUrl
  }

  const savedLanguage = readJsonStorage(LANGUAGE_STORAGE_KEY, null)

  if (supportedLanguageOptions.has(savedLanguage)) {
    return savedLanguage
  }

  const browserLanguage = window.navigator?.language?.toLowerCase?.() || ''

  if (browserLanguage.startsWith('ru')) {
    return 'ru'
  }

  return 'en'
}

function loadAnalyticsScript() {
  if (typeof document === 'undefined') {
    return
  }

  if (document.querySelector('[data-aura-analytics="plausible"]')) {
    return
  }

  const host = window.location.hostname

  if (!host || host === 'localhost' || host === '127.0.0.1') {
    return
  }

  const domain = import.meta.env.VITE_PLAUSIBLE_DOMAIN || host
  const script = document.createElement('script')

  script.defer = true
  script.src = 'https://plausible.io/js/script.js'
  script.dataset.domain = domain
  script.dataset.auraAnalytics = 'plausible'

  document.head.appendChild(script)
}

function unloadAnalyticsScript() {
  if (typeof document === 'undefined') {
    return
  }

  const script = document.querySelector('[data-aura-analytics="plausible"]')

  if (script) {
    script.remove()
  }
}

export function ExperienceProvider({ children }) {
  const gpcEnabled = typeof navigator !== 'undefined' && navigator.globalPrivacyControl === true
  const [language, setLanguageState] = useState(resolveInitialLanguage)
  const [consent, setConsent] = useState(() => {
    const savedConsent = readJsonStorage(CONSENT_STORAGE_KEY, defaultConsent)

    return {
      ...defaultConsent,
      ...savedConsent,
      analytics: gpcEnabled ? false : Boolean(savedConsent.analytics),
    }
  })
  const [experience, setExperience] = useState(() => resolveInitialExperience(consent))
  const [waitlistState, setWaitlistState] = useState(() =>
    sanitizeWaitlistState(readJsonStorage(WAITLIST_STORAGE_KEY, defaultWaitlistState))
  )
  const [waitlistStatus, setWaitlistStatus] = useState(defaultWaitlistStatus)
  const flushInFlightRef = useRef(false)

  useEffect(() => {
    writeJsonStorage(CONSENT_STORAGE_KEY, consent)
  }, [consent])

  useEffect(() => {
    if (consent.functional) {
      writeJsonStorage(LANGUAGE_STORAGE_KEY, language)
      return
    }

    removeStorage(LANGUAGE_STORAGE_KEY)
  }, [consent.functional, language])

  useEffect(() => {
    if (consent.functional) {
      writeJsonStorage(EXPERIENCE_STORAGE_KEY, experience)
      return
    }

    removeStorage(EXPERIENCE_STORAGE_KEY)
  }, [consent.functional, experience])

  useEffect(() => {
    writeJsonStorage(WAITLIST_STORAGE_KEY, waitlistState)
  }, [waitlistState])

  useEffect(() => {
    if (consent.analytics && !gpcEnabled) {
      loadAnalyticsScript()
      return
    }

    unloadAnalyticsScript()
  }, [consent.analytics, gpcEnabled])

  useEffect(() => {
    if (typeof document === 'undefined') {
      return
    }

    document.documentElement.lang = language

    const params = new URLSearchParams(window.location.search)

    if (params.get('lang') !== language) {
      params.set('lang', language)
      const nextUrl = `${window.location.pathname}?${params.toString()}${window.location.hash}`
      window.history.replaceState({}, '', nextUrl)
    }
  }, [language])

  const refreshWaitlistStatus = async () => {
    const nextStatus = await fetchWaitlistCapabilities()

    setWaitlistStatus(nextStatus)
    return nextStatus
  }

  useEffect(() => {
    refreshWaitlistStatus()
  }, [])

  useEffect(() => {
    if (!waitlistStatus.acceptingSubmissions || waitlistState.pending.length === 0 || flushInFlightRef.current) {
      return
    }

    let cancelled = false

    const flushPendingQueue = async () => {
      flushInFlightRef.current = true

      try {
        for (const entry of waitlistState.pending) {
          if (cancelled) {
            return
          }

          const response = await submitWaitlist(entry.payload)

          setWaitlistState((currentState) => ({
            pending: currentState.pending.filter((pendingEntry) => pendingEntry.localId !== entry.localId),
            lastSubmission: {
              localId: entry.localId,
              submittedAt: new Date().toISOString(),
              mode: response.mode || 'relay',
              ritual: entry.payload.ritual,
              intensity: entry.payload.intensity,
              email: entry.payload.email,
            },
          }))
        }
      } catch {
        // Keep pending entries intact and wait for the next relay refresh.
      } finally {
        flushInFlightRef.current = false
      }
    }

    flushPendingQueue()

    return () => {
      cancelled = true
    }
  }, [waitlistState.pending, waitlistStatus.acceptingSubmissions])

  const updateConsent = (nextConsent) => {
    setConsent((currentConsent) => ({
      ...currentConsent,
      ...nextConsent,
      analytics: gpcEnabled ? false : Boolean(nextConsent.analytics),
      resolved: true,
      lastUpdatedAt: new Date().toISOString(),
    }))
  }

  const setRitual = (ritual) => {
    setExperience((currentExperience) => ({
      ...currentExperience,
      ritual: sanitizeRitual(ritual),
    }))
  }

  const setIntensity = (intensity) => {
    setExperience((currentExperience) => ({
      ...currentExperience,
      intensity: sanitizeIntensity(intensity),
    }))
  }

  const setWearMoment = (wearMoment) => {
    if (!wearMomentOptions.has(wearMoment)) {
      return
    }

    setExperience((currentExperience) => ({
      ...currentExperience,
      wearMoment,
    }))
  }

  const setEcosystem = (ecosystem) => {
    if (!ecosystemOptions.has(ecosystem)) {
      return
    }

    setExperience((currentExperience) => ({
      ...currentExperience,
      ecosystem,
    }))
  }

  const setFitPreference = (fitPreference) => {
    if (!fitPreferenceOptions.has(fitPreference)) {
      return
    }

    setExperience((currentExperience) => ({
      ...currentExperience,
      fitPreference,
    }))
  }

  const setLanguage = (nextLanguage) => {
    if (!supportedLanguageOptions.has(nextLanguage)) {
      return
    }

    setLanguageState(nextLanguage)
  }

  const queueWaitlistSubmission = (payload) => {
    setWaitlistState((currentState) => ({
      ...upsertPendingWaitlistEntry(currentState, payload),
    }))
  }

  const markWaitlistSubmitted = (payload, response) => {
    setWaitlistState((currentState) => ({
      pending: currentState.pending.filter((entry) => entry.payload.submissionId !== payload.submissionId),
      lastSubmission: {
        localId: payload.submissionId,
        submittedAt: new Date().toISOString(),
        mode: response.mode || 'relay',
        ritual: payload.ritual,
        intensity: payload.intensity,
        email: payload.email,
      },
    }))
  }

  const exportLocalData = () => {
    const exportPayload = {
      exportedAt: new Date().toISOString(),
      gpcEnabled,
      consent,
      personalization: experience,
      waitlistState,
      waitlistStatus,
    }

    const file = new Blob([JSON.stringify(exportPayload, null, 2)], {
      type: 'application/json',
    })
    const url = URL.createObjectURL(file)
    const link = document.createElement('a')

    link.href = url
    link.download = `aura-local-data-${new Date().toISOString().slice(0, 10)}.json`
    link.click()
    URL.revokeObjectURL(url)
  }

  const clearPersonalization = () => {
    setExperience(defaultExperience)
    removeStorage(EXPERIENCE_STORAGE_KEY)
  }

  const clearPendingWaitlist = () => {
    setWaitlistState({
      pending: [],
      lastSubmission: null,
    })
    removeStorage(WAITLIST_STORAGE_KEY)
  }

  const shareCurrentSelection = async () => {
    const params = new URLSearchParams(window.location.search)

    if (experience.ritual) {
      params.set('ritual', experience.ritual)
      params.set('intensity', String(experience.intensity))
    } else {
      params.delete('ritual')
      params.delete('intensity')
    }

    params.set('wear', experience.wearMoment)
    params.set('ecosystem', experience.ecosystem)
    params.set('fit', experience.fitPreference)
    params.set('lang', language)

    const shareUrl = `${window.location.origin}${window.location.pathname}${params.toString() ? `?${params.toString()}` : ''}`
    const localeMeta = getLocaleMeta(language)
    const sharePayload = {
      title: localeMeta.shareTitle,
      text: localeMeta.shareText,
      url: shareUrl,
    }

    if (navigator.share) {
      try {
        await navigator.share(sharePayload)
        return {
          url: shareUrl,
          method: 'share',
        }
      } catch (error) {
        if (error?.name === 'AbortError') {
          return {
            url: shareUrl,
            method: 'cancelled',
          }
        }
      }
    }

    if (navigator.clipboard?.writeText) {
      try {
        await navigator.clipboard.writeText(shareUrl)
        return {
          url: shareUrl,
          method: 'clipboard',
        }
      } catch {
        // Fall through to a manual fallback below.
      }
    }

    window.prompt(
      localeMeta.sharePrompt,
      shareUrl
    )
    return {
      url: shareUrl,
      method: 'prompt',
    }
  }

  const value = {
    consent,
    updateConsent,
    gpcEnabled,
    language,
    setLanguage,
    experience,
    setRitual,
    setIntensity,
    setWearMoment,
    setEcosystem,
    setFitPreference,
    shareCurrentSelection,
    waitlistState,
    waitlistStatus,
    refreshWaitlistStatus,
    queueWaitlistSubmission,
    markWaitlistSubmitted,
    exportLocalData,
    clearPersonalization,
    clearPendingWaitlist,
  }

  return (
    <ExperienceContext.Provider value={value}>
      {children}
    </ExperienceContext.Provider>
  )
}

export function useExperience() {
  const context = useContext(ExperienceContext)

  if (!context) {
    throw new Error('useExperience must be used within an ExperienceProvider.')
  }

  return context
}
