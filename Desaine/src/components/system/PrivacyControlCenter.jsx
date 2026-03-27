import { useEffect } from 'react'
import { X } from 'lucide-react'
import { useExperience } from '../../context/ExperienceContext'

function RelayBadge({ waitlistStatus }) {
  const isLive = waitlistStatus.acceptingSubmissions
  const tone = isLive
    ? 'border-secondary/25 bg-secondary/10 text-secondary'
    : 'border-primary/20 bg-primary/10 text-primary'

  return (
    <span className={`inline-flex min-h-[36px] items-center rounded-full border px-3 py-2 text-xs font-semibold uppercase tracking-[0.16em] ${tone}`}>
      {isLive ? 'Live relay active' : 'Device queue active'}
    </span>
  )
}

export default function PrivacyControlCenter({ isOpen, onClose }) {
  const {
    consent,
    updateConsent,
    gpcEnabled,
    experience,
    waitlistState,
    waitlistStatus,
    exportLocalData,
    clearPersonalization,
    clearPendingWaitlist,
  } = useExperience()

  useEffect(() => {
    if (!isOpen) {
      return undefined
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  if (!isOpen) {
    return null
  }

  return (
    <div
      className="fixed inset-0 z-[80] flex items-end justify-center bg-black/70 px-3 py-3 backdrop-blur-md sm:px-6 sm:py-6 lg:items-center"
      onClick={onClose}
    >
      <div
        className="liquid-panel relative w-full max-w-4xl overflow-hidden border border-white/15 p-6 sm:p-8"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-text-soft hover:text-text"
          aria-label="Закрыть privacy center"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-secondary">Privacy Center</p>
          <h2 className="mt-2 font-display text-[clamp(2rem,7vw,3.4rem)] leading-[0.96] tracking-[-0.05em] text-transparent heading-gradient">
            Управляйте памятью, согласием и локальными данными
          </h2>
          <p className="mt-3 max-w-2xl text-base leading-8 text-text-soft">
            Здесь собраны все пользовательские сигналы AURA: what we remember, what we track and what we can export or clear.
          </p>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <RelayBadge waitlistStatus={waitlistStatus} />
          <span className="inline-flex min-h-[36px] items-center rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-text-soft">
            Pending requests: {waitlistState.pending.length}
          </span>
          {gpcEnabled && (
            <span className="inline-flex min-h-[36px] items-center rounded-full border border-secondary/25 bg-secondary/10 px-3 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-secondary">
              GPC enabled
            </span>
          )}
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-4">
            <div className="liquid-glass rounded-[24px] p-5">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-text">Consent switches</p>
              <div className="mt-4 grid gap-3 md:grid-cols-2">
                <label className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <span className="text-sm font-semibold uppercase tracking-[0.16em] text-text">Функциональная память</span>
                  <span className="mt-2 block text-sm leading-6 text-text-soft">
                    Сохраняет ритуал и персональный state между визитами.
                  </span>
                  <input
                    type="checkbox"
                    checked={consent.functional}
                    onChange={(event) => updateConsent({
                      functional: event.target.checked,
                      analytics: consent.analytics,
                    })}
                    className="mt-4 h-5 w-5 rounded border-white/20 bg-white/5 text-primary"
                  />
                </label>

                <label className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <span className="text-sm font-semibold uppercase tracking-[0.16em] text-text">Аналитика</span>
                  <span className="mt-2 block text-sm leading-6 text-text-soft">
                    Подключает privacy-friendly analytics только после явного согласия.
                  </span>
                  <input
                    type="checkbox"
                    checked={!gpcEnabled && consent.analytics}
                    disabled={gpcEnabled}
                    onChange={(event) => updateConsent({
                      functional: consent.functional,
                      analytics: event.target.checked,
                    })}
                    className="mt-4 h-5 w-5 rounded border-white/20 bg-white/5 text-primary disabled:opacity-50"
                  />
                </label>
              </div>
            </div>

            <div className="liquid-glass rounded-[24px] p-5">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-text">Local state snapshot</p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-secondary">Current ritual</p>
                  <p className="mt-2 text-lg font-semibold text-text">{experience.ritual || 'Not selected yet'}</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-secondary">Intensity</p>
                  <p className="mt-2 text-lg font-semibold text-text">{experience.intensity}%</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-secondary">Wear moment</p>
                  <p className="mt-2 text-lg font-semibold text-text">{experience.wearMoment}</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-secondary">Companion profile</p>
                  <p className="mt-2 text-lg font-semibold text-text">{experience.ecosystem} / {experience.fitPreference}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="liquid-glass rounded-[24px] p-5">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-text">Export and cleanup</p>
              <div className="mt-4 flex flex-col gap-3">
                <button type="button" onClick={exportLocalData} className="primary-button px-5 py-3">
                  Export local JSON
                </button>
                <button type="button" onClick={clearPersonalization} className="ghost-button px-5 py-3">
                  Clear personalization memory
                </button>
                <button type="button" onClick={clearPendingWaitlist} className="ghost-button px-5 py-3 text-error hover:text-error">
                  Delete local waitlist queue
                </button>
              </div>
            </div>

            <div className="liquid-glass rounded-[24px] p-5">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-text">Transparency notes</p>
              <div className="mt-4 space-y-3 text-sm leading-6 text-text-soft">
                <p>Необходимое хранение используется для сохранения consent state и локальной очереди заявок, если live relay недоступен.</p>
                <p>Если relay включён, pending queue синхронизируется автоматически при следующем успешном соединении.</p>
                <p>Analytics остаётся выключенной, если браузер отправляет Global Privacy Control signal.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
