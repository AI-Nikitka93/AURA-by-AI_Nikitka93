import { useState } from 'react'
import { useExperience } from '../../context/ExperienceContext'

export default function ConsentBanner() {
  const { consent, updateConsent, gpcEnabled } = useExperience()
  const [isCustomizing, setIsCustomizing] = useState(false)
  const [draftConsent, setDraftConsent] = useState({
    functional: consent.functional,
    analytics: consent.analytics,
  })

  if (consent.resolved) {
    return null
  }

  return (
    <div className="fixed inset-x-3 bottom-3 z-[70] sm:inset-x-6 sm:bottom-6">
      <div className="liquid-panel mx-auto max-w-3xl border border-white/15 p-5 shadow-[0_24px_80px_rgba(0,0,0,0.48)]">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-secondary">
              Privacy Controls
            </p>
            <h2 className="mt-2 font-display text-2xl tracking-[-0.04em] text-text">
              Выберите, какую память AURA может использовать
            </h2>
            <p className="mt-3 text-sm leading-7 text-text-soft sm:text-base">
              Необходимое хранение всегда включено. Функциональная память сохраняет ваш ритуал и очередь заявок на этом устройстве.
              Аналитика включается только после согласия.
            </p>
            {gpcEnabled && (
              <p className="mt-3 rounded-2xl border border-secondary/20 bg-secondary/10 px-4 py-3 text-sm leading-6 text-text-soft">
                В браузере включён Global Privacy Control, поэтому аналитика останется отключённой.
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2 sm:flex-row">
            <button
              type="button"
              onClick={() => updateConsent({ functional: false, analytics: false })}
              className="ghost-button px-5 py-3"
            >
              Только необходимое
            </button>
            <button
              type="button"
              onClick={() => updateConsent({ functional: true, analytics: !gpcEnabled })}
              className="primary-button px-5 py-3"
            >
              Принять всё
            </button>
          </div>
        </div>

        <div className="mt-4 border-t border-white/10 pt-4">
          <button
            type="button"
            onClick={() => setIsCustomizing((currentValue) => !currentValue)}
            className="text-sm font-semibold uppercase tracking-[0.16em] text-text-soft hover:text-text"
          >
            {isCustomizing ? 'Скрыть детальные настройки' : 'Настроить вручную'}
          </button>

          {isCustomizing && (
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              <label className="liquid-glass flex items-start justify-between gap-4 rounded-2xl p-4">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.16em] text-text">Функциональная память</p>
                  <p className="mt-2 text-sm leading-6 text-text-soft">
                    Сохраняет выбранный ритуал, интенсивность и локальную очередь заявок.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={draftConsent.functional}
                  onChange={(event) => setDraftConsent((currentValue) => ({
                    ...currentValue,
                    functional: event.target.checked,
                  }))}
                  className="mt-1 h-5 w-5 rounded border-white/20 bg-white/5 text-primary"
                />
              </label>

              <label className="liquid-glass flex items-start justify-between gap-4 rounded-2xl p-4">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.16em] text-text">Аналитика</p>
                  <p className="mt-2 text-sm leading-6 text-text-soft">
                    Подключает privacy-friendly аналитический скрипт только после согласия.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={!gpcEnabled && draftConsent.analytics}
                  disabled={gpcEnabled}
                  onChange={(event) => setDraftConsent((currentValue) => ({
                    ...currentValue,
                    analytics: event.target.checked,
                  }))}
                  className="mt-1 h-5 w-5 rounded border-white/20 bg-white/5 text-primary disabled:opacity-50"
                />
              </label>

              <div className="md:col-span-2">
                <button
                  type="button"
                  onClick={() => updateConsent(draftConsent)}
                  className="primary-button px-5 py-3"
                >
                  Сохранить настройки
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
