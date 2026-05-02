import { useState } from 'react'
import { Activity, Check } from 'lucide-react'
import { useExperience } from '../../context/ExperienceContext'
import useSiteCopy from '../../hooks/useSiteCopy'
import { submitWaitlist, WaitlistApiError } from '../../lib/waitlist'
import { formatPendingRequestCount, formatPercent } from '../../lib/i18n'

function RelayStatusBadge({ waitlistStatus, labels }) {
  const isLive = waitlistStatus.acceptingSubmissions
  const classes = isLive
    ? 'border-secondary/25 bg-secondary/10 text-secondary'
    : 'border-primary/20 bg-primary/10 text-primary'

  return (
    <div className={`inline-flex min-h-[38px] items-center rounded-full border px-3 py-2 text-xs font-semibold uppercase tracking-[0.16em] ${classes}`}>
      <Activity className="mr-2 h-3.5 w-3.5" />
      {isLive ? labels.live : labels.queue}
    </div>
  )
}

export default function EmailSignupForm({ onOpenPrivacyCenter }) {
  const { copy, language } = useSiteCopy()
  const { emailSignup, advisor, privacyCenter } = copy
  const {
    experience,
    setRitual,
    waitlistState,
    waitlistStatus,
    queueWaitlistSubmission,
    markWaitlistSubmitted,
    refreshWaitlistStatus,
    exportLocalData,
  } = useExperience()
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [contactConsent, setContactConsent] = useState(true)
  const [privacyAccepted, setPrivacyAccepted] = useState(false)
  const [status, setStatus] = useState('idle')
  const [feedback, setFeedback] = useState('')
  const ritualOptions = emailSignup.ritualOptions
  const statusDescription = waitlistStatus.acceptingSubmissions
    ? emailSignup.relay.liveDescription
    : emailSignup.relay.queueDescription
  const queueMessage = waitlistStatus.acceptingSubmissions
    ? waitlistStatus.message || statusDescription
    : statusDescription
  const wearLabel = advisor.wearMomentOptions.find((option) => option.id === experience.wearMoment)?.label || experience.wearMoment
  const ecosystemLabel = advisor.ecosystemOptions.find((option) => option.id === experience.ecosystem)?.label || experience.ecosystem
  const fitLabel = advisor.fitPreferenceOptions.find((option) => option.id === experience.fitPreference)?.label || experience.fitPreference
  const pendingRequestCount = formatPendingRequestCount(waitlistState.pending.length, language)
  const intensityLabel = formatPercent(experience.intensity, language)

  const validateEmail = (value) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(value)
  }

  const resetForm = () => {
    setEmail('')
    setName('')
    setContactConsent(true)
    setPrivacyAccepted(false)
  }

  const buildPayload = () => ({
    submissionId: globalThis.crypto?.randomUUID?.() || `submission-${Date.now()}`,
    email: email.trim(),
    name: name.trim(),
    ritual: experience.ritual,
    intensity: experience.intensity,
    wearMoment: experience.wearMoment,
    ecosystem: experience.ecosystem,
    fitPreference: experience.fitPreference,
    consentToContact: contactConsent,
    privacyAccepted,
    sourceUrl: window.location.href,
    submittedAt: new Date().toISOString(),
  })

  const handleSubmit = async (event) => {
    event.preventDefault()
    setFeedback('')

    if (!validateEmail(email)) {
      setStatus('error')
      setFeedback(emailSignup.errors.invalidEmail)
      return
    }

    if (!experience.ritual) {
      setStatus('error')
      setFeedback(emailSignup.errors.missingRitual)
      return
    }

    if (name && name.trim().length < 2) {
      setStatus('error')
      setFeedback(emailSignup.errors.shortName)
      return
    }

    if (!privacyAccepted) {
      setStatus('error')
      setFeedback(emailSignup.errors.missingPrivacy)
      return
    }

    const payload = buildPayload()

    setStatus('loading')

    try {
      const response = await submitWaitlist(payload)

      markWaitlistSubmitted(payload, response)
      setStatus('success')
      setFeedback(emailSignup.feedback.liveSuccess)
      resetForm()
      await refreshWaitlistStatus()
      return
    } catch (error) {
      const isRecoverableRelayError = error instanceof WaitlistApiError && (
        error.code === 'waitlist_unreachable' ||
        error.code === 'waitlist_timeout' ||
        error.code === 'waitlist_not_configured'
      )

      if (isRecoverableRelayError || !waitlistStatus.acceptingSubmissions) {
        queueWaitlistSubmission(payload)
        setStatus('success')
        setFeedback(emailSignup.feedback.queuedSuccess)
        resetForm()
        return
      }

      setStatus('error')
      setFeedback(emailSignup.errors.generic)
    }
  }

  if (status === 'success') {
    return (
      <div className="liquid-panel flex flex-col items-center justify-center p-8 text-center" role="status" aria-live="polite">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-secondary/20">
          <Check className="h-8 w-8 text-secondary" />
        </div>
        <RelayStatusBadge waitlistStatus={waitlistStatus} labels={emailSignup.relay} />
        <h3 className="mt-4 font-display text-2xl text-text">{emailSignup.successTitle}</h3>
        <p className="mt-3 text-base leading-7 text-text-soft">
          {feedback}
        </p>
        {!waitlistStatus.acceptingSubmissions && (
          <div className="mt-5 w-full rounded-[24px] border border-white/10 bg-white/[0.03] p-4 text-left">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-secondary">
              {pendingRequestCount}
            </p>
            <p className="mt-2 text-sm leading-6 text-text-soft">
              {queueMessage}
            </p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <button type="button" onClick={onOpenPrivacyCenter} className="ghost-button px-4 py-3 text-xs uppercase tracking-[0.16em]">
                {emailSignup.openPrivacyControls}
              </button>
              <button type="button" onClick={exportLocalData} className="ghost-button px-4 py-3 text-xs uppercase tracking-[0.16em]">
                {privacyCenter.exportButton}
              </button>
            </div>
          </div>
        )}
        <button
          type="button"
          onClick={() => {
            setStatus('idle')
            setFeedback('')
          }}
          className="mt-6 rounded-full px-4 py-2 text-sm font-semibold uppercase tracking-[0.16em] text-primary hover:text-text"
        >
          {emailSignup.successButton}
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="liquid-panel p-6 sm:p-8">
      <div className="mb-6 text-center">
        <RelayStatusBadge waitlistStatus={waitlistStatus} labels={emailSignup.relay} />
        <h3 className="mt-4 font-display text-xl tracking-[-0.03em] text-text sm:text-2xl">
          {emailSignup.title}
        </h3>
        <p className="mt-2 text-base text-text-soft">
          {emailSignup.description}
        </p>
        <p className="mt-3 text-sm leading-6 text-text-soft">
          {statusDescription}
        </p>
        {!waitlistStatus.acceptingSubmissions && (
          <div className="mt-3 rounded-[24px] border border-white/10 bg-white/[0.03] px-4 py-4 text-left">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-secondary">
              {pendingRequestCount}
            </p>
            <p className="mt-2 text-sm leading-6 text-text-soft">
              {queueMessage}
            </p>
          </div>
        )}
      </div>

      <div className="space-y-4">
        <div>
          <label htmlFor="name" className="sr-only">
            {emailSignup.nameLabel}
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder={emailSignup.namePlaceholder}
            className="w-full rounded-xl border border-white/10 bg-surface/50 px-4 py-3 text-base text-text placeholder:text-text-soft outline-none transition-all duration-300 focus:border-primary/50 focus:bg-surface-elevated focus:shadow-[0_0_0_3px_rgba(111,124,255,0.15)]"
          />
        </div>

        <div>
          <label htmlFor="email" className="sr-only">
            {emailSignup.emailLabel}
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder={emailSignup.emailPlaceholder}
            className="w-full rounded-xl border border-white/10 bg-surface/50 px-4 py-3 text-base text-text placeholder:text-text-soft outline-none transition-all duration-300 focus:border-primary/50 focus:bg-surface-elevated focus:shadow-[0_0_0_3px_rgba(111,124,255,0.15)]"
          />
        </div>

        <fieldset>
          <legend className="mb-2 block text-sm font-semibold uppercase tracking-[0.16em] text-secondary">
            {emailSignup.ritualLegend}
          </legend>
          <div className="grid grid-cols-3 gap-2">
            {ritualOptions.map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => setRitual(option.id)}
                aria-pressed={experience.ritual === option.id}
                className={`relative flex flex-col items-center justify-center rounded-xl border px-3 py-3 text-center transition-all duration-300 ${
                  experience.ritual === option.id
                    ? 'border-primary bg-primary/10 shadow-[0_0_24px_rgba(111,124,255,0.2)]'
                    : 'border-white/10 bg-surface/30 hover:border-white/20 hover:bg-surface/50'
                }`}
              >
                <span className="text-sm font-semibold text-text">{option.label}</span>
                <span className="mt-0.5 text-xs text-text-soft">{option.desc}</span>
                {experience.ritual === option.id && (
                  <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary">
                    <Check className="h-2.5 w-2.5 text-[#0d1020]" />
                  </span>
                )}
              </button>
            ))}
          </div>
          <p className="mt-2 text-sm leading-6 text-text-soft">
            {emailSignup.intensitySummary}: {intensityLabel}.
          </p>
          <p className="mt-1 text-sm leading-6 text-text-soft">
            {emailSignup.advisorSummaryPrefix}: {wearLabel} / {ecosystemLabel} / {fitLabel}.
          </p>
        </fieldset>

        <label className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-4 text-sm leading-6 text-text-soft">
          <input
            type="checkbox"
            checked={contactConsent}
            onChange={(event) => setContactConsent(event.target.checked)}
            className="mt-1 h-5 w-5 rounded border-white/20 bg-white/5 text-primary"
          />
          <span>{emailSignup.contactConsent}</span>
        </label>

        <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-4 text-sm leading-6 text-text-soft">
          <label className="flex items-start gap-3">
            <input
              type="checkbox"
              checked={privacyAccepted}
              onChange={(event) => setPrivacyAccepted(event.target.checked)}
            className="mt-1 h-5 w-5 rounded border-white/20 bg-white/5 text-primary"
          />
          <span>
              {emailSignup.privacyConsent}
          </span>
          </label>
          <button type="button" onClick={onOpenPrivacyCenter} className="mt-3 text-primary hover:text-text">
            {emailSignup.openPrivacyControls}
          </button>
        </div>

        {status === 'error' && feedback && (
          <div className="rounded-lg border border-error/30 bg-error/10 px-3 py-3 text-sm text-error" role="alert" aria-live="assertive">
            {feedback}
          </div>
        )}

        <button
          type="submit"
          disabled={status === 'loading'}
          className="primary-button w-full py-4 text-sm uppercase tracking-[0.2em]"
        >
          {status === 'loading' ? emailSignup.submitLoading : emailSignup.submitIdle}
        </button>
      </div>
    </form>
  )
}
