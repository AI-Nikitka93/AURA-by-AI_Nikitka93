import { useState } from 'react'
import { Activity, Check } from 'lucide-react'
import { useExperience } from '../../context/ExperienceContext'
import { submitWaitlist, WaitlistApiError } from '../../lib/waitlist'

const ritualOptions = [
  { id: 'glow', label: 'Glow', desc: 'Свечение' },
  { id: 'calm', label: 'Calm', desc: 'Покой' },
  { id: 'pulse', label: 'Pulse', desc: 'Ритм' },
]

function RelayStatusBadge({ waitlistStatus }) {
  const isLive = waitlistStatus.acceptingSubmissions
  const classes = isLive
    ? 'border-secondary/25 bg-secondary/10 text-secondary'
    : 'border-primary/20 bg-primary/10 text-primary'

  return (
    <div className={`inline-flex min-h-[38px] items-center rounded-full border px-3 py-2 text-xs font-semibold uppercase tracking-[0.16em] ${classes}`}>
      <Activity className="mr-2 h-3.5 w-3.5" />
      {isLive ? 'Live relay active' : 'Device queue active'}
    </div>
  )
}

export default function EmailSignupForm({ onOpenPrivacyCenter }) {
  const {
    experience,
    setRitual,
    waitlistStatus,
    queueWaitlistSubmission,
    markWaitlistSubmitted,
    refreshWaitlistStatus,
  } = useExperience()
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [contactConsent, setContactConsent] = useState(true)
  const [privacyAccepted, setPrivacyAccepted] = useState(false)
  const [status, setStatus] = useState('idle')
  const [feedback, setFeedback] = useState('')

  let statusDescription = waitlistStatus.message

  if (!statusDescription) {
    statusDescription = waitlistStatus.acceptingSubmissions
      ? 'Заявки уходят в live relay и могут быть синхронизированы без ручного экспорта.'
      : 'Пока live relay не подключён, запрос сохраняется на этом устройстве и будет готов к повторной отправке.'
  }

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
      setFeedback('Email выглядит неточно — проверьте, не пропущен ли символ.')
      return
    }

    if (!experience.ritual) {
      setStatus('error')
      setFeedback('Сначала выберите ритуал, чтобы мы сохранили ваш персональный сигнал.')
      return
    }

    if (name && name.trim().length < 2) {
      setStatus('error')
      setFeedback('Имя слишком короткое — добавьте хотя бы 2 символа.')
      return
    }

    if (!privacyAccepted) {
      setStatus('error')
      setFeedback('Подтвердите privacy notice перед отправкой заявки.')
      return
    }

    const payload = buildPayload()

    setStatus('loading')

    try {
      const response = await submitWaitlist(payload)

      markWaitlistSubmitted(payload, response)
      setStatus('success')
      setFeedback('Заявка отправлена в live relay. Следующий шаг придёт на указанный email.')
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
        setFeedback('Live relay пока недоступен, поэтому заявка безопасно сохранена на этом устройстве. Когда relay появится, очередь сможет синхронизироваться автоматически.')
        resetForm()
        return
      }

      setStatus('error')
      setFeedback('Отправка не завершилась. Проверьте соединение и попробуйте снова.')
    }
  }

  if (status === 'success') {
    return (
      <div className="liquid-panel flex flex-col items-center justify-center p-8 text-center" role="status" aria-live="polite">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-secondary/20">
          <Check className="h-8 w-8 text-secondary" />
        </div>
        <RelayStatusBadge waitlistStatus={waitlistStatus} />
        <h3 className="mt-4 font-display text-2xl text-text">Сигнал сохранён</h3>
        <p className="mt-3 text-base leading-7 text-text-soft">
          {feedback}
        </p>
        <button
          type="button"
          onClick={() => {
            setStatus('idle')
            setFeedback('')
          }}
          className="mt-6 rounded-full px-4 py-2 text-sm font-semibold uppercase tracking-[0.16em] text-primary hover:text-text"
        >
          Отправить ещё
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="liquid-panel p-6 sm:p-8">
      <div className="mb-6 text-center">
        <RelayStatusBadge waitlistStatus={waitlistStatus} />
        <h3 className="mt-4 font-display text-xl tracking-[-0.03em] text-text sm:text-2xl">
          Откройте свою AURA
        </h3>
        <p className="mt-2 text-base text-text-soft">
          Выберите ритуал, оставьте контакт и зафиксируйте персональный сигнал.
        </p>
        <p className="mt-3 text-sm leading-6 text-text-soft">
          {statusDescription}
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label htmlFor="name" className="sr-only">
            Как вас представить в AURA
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Как вас представить в AURA"
            className="w-full rounded-xl border border-white/10 bg-surface/50 px-4 py-3 text-base text-text placeholder:text-text-soft outline-none transition-all duration-300 focus:border-primary/50 focus:bg-surface-elevated focus:shadow-[0_0_0_3px_rgba(111,124,255,0.15)]"
          />
        </div>

        <div>
          <label htmlFor="email" className="sr-only">
            Email для раннего доступа
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Ваш email — пришлём следующий шаг"
            className="w-full rounded-xl border border-white/10 bg-surface/50 px-4 py-3 text-base text-text placeholder:text-text-soft outline-none transition-all duration-300 focus:border-primary/50 focus:bg-surface-elevated focus:shadow-[0_0_0_3px_rgba(111,124,255,0.15)]"
          />
        </div>

        <fieldset>
          <legend className="mb-2 block text-sm font-semibold uppercase tracking-[0.16em] text-secondary">
            Выберите ритуал
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
            Интенсивность из конфигуратора будет отправлена вместе с заявкой: {experience.intensity}%.
          </p>
          <p className="mt-1 text-sm leading-6 text-text-soft">
            Advisor profile: {experience.wearMoment} / {experience.ecosystem} / {experience.fitPreference}.
          </p>
        </fieldset>

        <label className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-4 text-sm leading-6 text-text-soft">
          <input
            type="checkbox"
            checked={contactConsent}
            onChange={(event) => setContactConsent(event.target.checked)}
            className="mt-1 h-5 w-5 rounded border-white/20 bg-white/5 text-primary"
          />
          <span>Можно связаться со мной по email, когда AURA перейдёт к следующему этапу запуска.</span>
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
              Я прочитал privacy notice и понимаю, как AURA хранит consent, персонализацию и очередь заявок.
            </span>
          </label>
          <button type="button" onClick={onOpenPrivacyCenter} className="mt-3 text-primary hover:text-text">
            Открыть privacy controls
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
          {status === 'loading' ? 'Отправка...' : 'Сохранить ранний доступ'}
        </button>
      </div>
    </form>
  )
}
