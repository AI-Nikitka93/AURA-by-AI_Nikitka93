import { useEffect } from 'react'
import { X } from 'lucide-react'
import { useExperience } from '../../context/ExperienceContext'
import useSiteCopy from '../../hooks/useSiteCopy'

function RelayBadge({ waitlistStatus, labels }) {
  const isLive = waitlistStatus.acceptingSubmissions
  const tone = isLive
    ? 'border-secondary/25 bg-secondary/10 text-secondary'
    : 'border-primary/20 bg-primary/10 text-primary'

  return (
    <span className={`inline-flex min-h-[36px] items-center rounded-full border px-3 py-2 text-xs font-semibold uppercase tracking-[0.16em] ${tone}`}>
      {isLive ? labels.live : labels.queue}
    </span>
  )
}

export default function PrivacyControlCenter({ isOpen, onClose }) {
  const { copy } = useSiteCopy()
  const { privacyCenter, advisor, ritualConfigurator } = copy
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
  const wearLabel = advisor.wearMomentOptions.find((option) => option.id === experience.wearMoment)?.label || experience.wearMoment
  const ecosystemLabel = advisor.ecosystemOptions.find((option) => option.id === experience.ecosystem)?.label || experience.ecosystem
  const fitLabel = advisor.fitPreferenceOptions.find((option) => option.id === experience.fitPreference)?.label || experience.fitPreference
  const ritualLabel = ritualConfigurator.rituals.find((ritual) => ritual.id === experience.ritual)?.name || experience.ritual

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
          aria-label={privacyCenter.closeLabel}
        >
          <X className="h-4 w-4" />
        </button>

        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-secondary">{privacyCenter.eyebrow}</p>
          <h2 className="mt-2 font-display text-[clamp(2rem,7vw,3.4rem)] leading-[0.96] tracking-[-0.05em] text-transparent heading-gradient">
            {privacyCenter.title}
          </h2>
          <p className="mt-3 max-w-2xl text-base leading-8 text-text-soft">
            {privacyCenter.description}
          </p>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <RelayBadge waitlistStatus={waitlistStatus} labels={privacyCenter.relay} />
          <span className="inline-flex min-h-[36px] items-center rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-text-soft">
            {privacyCenter.pendingRequests}: {waitlistState.pending.length}
          </span>
          {gpcEnabled && (
            <span className="inline-flex min-h-[36px] items-center rounded-full border border-secondary/25 bg-secondary/10 px-3 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-secondary">
              {privacyCenter.gpcEnabled}
            </span>
          )}
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-4">
            <div className="liquid-glass rounded-[24px] p-5">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-text">{privacyCenter.consentSwitches}</p>
              <div className="mt-4 grid gap-3 md:grid-cols-2">
                <label className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <span className="text-sm font-semibold uppercase tracking-[0.16em] text-text">{privacyCenter.functionalTitle}</span>
                  <span className="mt-2 block text-sm leading-6 text-text-soft">
                    {privacyCenter.functionalDescription}
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
                  <span className="text-sm font-semibold uppercase tracking-[0.16em] text-text">{privacyCenter.analyticsTitle}</span>
                  <span className="mt-2 block text-sm leading-6 text-text-soft">
                    {privacyCenter.analyticsDescription}
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
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-text">{privacyCenter.snapshotTitle}</p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-secondary">{privacyCenter.currentRitual}</p>
                  <p className="mt-2 text-lg font-semibold text-text">{ritualLabel || privacyCenter.notSelected}</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-secondary">{privacyCenter.intensity}</p>
                  <p className="mt-2 text-lg font-semibold text-text">{experience.intensity}%</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-secondary">{privacyCenter.wearMoment}</p>
                  <p className="mt-2 text-lg font-semibold text-text">{wearLabel}</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-secondary">{privacyCenter.companionProfile}</p>
                  <p className="mt-2 text-lg font-semibold text-text">{ecosystemLabel} / {fitLabel}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="liquid-glass rounded-[24px] p-5">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-text">{privacyCenter.exportTitle}</p>
              <div className="mt-4 flex flex-col gap-3">
                <button type="button" onClick={exportLocalData} className="primary-button px-5 py-3">
                  {privacyCenter.exportButton}
                </button>
                <button type="button" onClick={clearPersonalization} className="ghost-button px-5 py-3">
                  {privacyCenter.clearPersonalization}
                </button>
                <button type="button" onClick={clearPendingWaitlist} className="ghost-button px-5 py-3 text-error hover:text-error">
                  {privacyCenter.clearQueue}
                </button>
              </div>
            </div>

            <div className="liquid-glass rounded-[24px] p-5">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-text">{privacyCenter.notesTitle}</p>
              <div className="mt-4 space-y-3 text-sm leading-6 text-text-soft">
                {privacyCenter.notes.map((note) => (
                  <p key={note}>{note}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
