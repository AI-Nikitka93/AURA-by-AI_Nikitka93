import { Download, Wifi } from 'lucide-react'
import { ctaContent } from '../../data/landingContent'
import EmailSignupForm from './EmailSignupForm'

export default function CtaSection({ onOpenPrivacyCenter, pwa }) {
  const installLabel = pwa?.isInstalled
    ? 'AURA уже установлено'
    : pwa?.canInstall
      ? 'Установить AURA app'
      : 'Install-ready в поддерживаемых браузерах'

  return (
    <section id="cta" className="relative py-6 sm:py-8 lg:py-10">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(111,124,255,0.14),transparent_34%)]" />
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <img
          src={ctaContent.backgroundImage}
          alt=""
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover opacity-[0.08] mix-blend-screen"
        />
      </div>
      <div className="section-shell relative">
        <div className="liquid-panel overflow-hidden px-5 py-6 text-center sm:px-8 sm:py-8 lg:px-16 lg:py-10 reveal-scale">
          <div className="pointer-events-none absolute inset-x-8 top-8 h-20 rounded-full bg-primary/10 blur-[80px] sm:inset-x-24 sm:top-10 sm:h-24 sm:blur-[100px] animate-glow-pulse" />
          <div className="relative mx-auto max-w-3xl">
            <h2 className="font-display text-[clamp(2.4rem,12vw,4.5rem)] leading-[0.98] tracking-[-0.06em] text-transparent heading-gradient lg:text-7xl">
              {ctaContent.title}
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-base leading-8 text-text-soft sm:mt-4 lg:text-lg">{ctaContent.subtitle}</p>
            <div className="mt-4 flex flex-col items-center gap-3 sm:mt-5 sm:flex-row sm:justify-center">
              <a href="#ritual" className="primary-button w-full px-6 py-3.5 text-sm uppercase tracking-[0.16em] sm:w-auto sm:px-8 sm:py-4 sm:tracking-[0.2em]">
                {ctaContent.button}
              </a>
              <a href={ctaContent.secondaryHref} target="_blank" rel="noreferrer" className="ghost-button w-full px-6 py-3.5 text-sm uppercase tracking-[0.16em] sm:w-auto sm:px-8 sm:py-4 sm:tracking-[0.2em]">
                {ctaContent.secondaryButton}
              </a>
            </div>
            <p className="mt-4 text-sm uppercase tracking-[0.18em] text-text-soft">{ctaContent.meta}</p>

            <div className="mt-5 grid gap-3 text-left md:grid-cols-[1fr_auto]">
              <div className="liquid-glass rounded-[24px] px-5 py-4">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-secondary/20 bg-secondary/10 text-secondary">
                    <Wifi className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.16em] text-text">Companion mode</p>
                    <p className="mt-1 text-sm leading-6 text-text-soft">
                      После первого визита AURA может открываться как installable app и держать ваши ritual choices доступными даже при нестабильном соединении.
                    </p>
                  </div>
                </div>
              </div>

              <button
                type="button"
                disabled={!pwa?.canInstall || pwa?.isInstalled}
                onClick={() => pwa?.promptInstall?.()}
                className={`ghost-button min-w-[220px] px-6 py-4 text-sm uppercase tracking-[0.16em] ${
                  pwa?.canInstall && !pwa?.isInstalled ? 'border-secondary/30 text-text hover:border-secondary/40 hover:text-secondary' : 'cursor-default opacity-80'
                }`}
              >
                <Download className="mr-2 h-4 w-4" />
                {installLabel}
              </button>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-3 max-w-md sm:mt-4 reveal">
          <EmailSignupForm onOpenPrivacyCenter={onOpenPrivacyCenter} />
        </div>
      </div>
    </section>
  )
}
