import { ctaContent } from '../../data/landingContent'

export default function CtaSection() {
  return (
    <section id="cta" className="relative py-20 sm:py-24 lg:py-32">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(111,124,255,0.14),transparent_34%)]" />
      <div className="section-shell relative">
        <div className="liquid-panel overflow-hidden px-5 py-12 text-center sm:px-8 sm:py-14 lg:px-16 lg:py-20">
          <div className="pointer-events-none absolute inset-x-8 top-8 h-20 rounded-full bg-primary/10 blur-[80px] sm:inset-x-24 sm:top-10 sm:h-24 sm:blur-[100px]" />
          <div className="relative mx-auto max-w-3xl">
            <h2 className="font-display text-[clamp(2.4rem,12vw,4.5rem)] leading-[0.98] tracking-[-0.06em] text-transparent heading-gradient lg:text-7xl">
              {ctaContent.title}
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-sm leading-6 text-text-soft sm:mt-6 sm:text-base sm:leading-7 lg:text-lg">{ctaContent.subtitle}</p>
            <div className="mt-8 flex flex-col items-center gap-3 sm:mt-10 sm:flex-row sm:justify-center">
              <a href="#ritual" className="primary-button w-full px-6 py-3.5 text-[11px] uppercase tracking-[0.2em] sm:w-auto sm:px-8 sm:py-4 sm:text-sm sm:tracking-[0.24em]">
                {ctaContent.button}
              </a>
              <a href={ctaContent.secondaryHref} target="_blank" rel="noreferrer" className="ghost-button w-full px-6 py-3.5 text-[11px] uppercase tracking-[0.2em] sm:w-auto sm:px-8 sm:py-4 sm:text-sm sm:tracking-[0.24em]">
                {ctaContent.secondaryButton}
              </a>
            </div>
            <p className="mt-8 text-xs uppercase tracking-[0.26em] text-text-soft/60">{ctaContent.meta}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
