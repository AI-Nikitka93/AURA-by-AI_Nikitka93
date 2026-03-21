import { heroContent, heroHighlights } from '../../data/landingContent'

export default function HeroSection() {
  return (
    <section id="ritual" className="relative overflow-hidden pt-10 sm:pt-14 lg:pt-20">
      <div className="section-shell grid items-end gap-10 pb-14 pt-8 sm:gap-12 sm:pb-16 sm:pt-10 lg:grid-cols-[1.05fr_0.95fr] lg:pb-24">
        <div className="relative">
          <div className="pointer-events-none absolute -left-6 top-0 h-28 w-28 rounded-full bg-primary/15 blur-[70px] sm:-left-10 sm:top-2 sm:h-40 sm:w-40 sm:blur-[90px]" />
          <div className="pointer-events-none absolute left-10 top-28 h-16 w-16 rounded-full bg-secondary/10 blur-[56px] sm:left-20 sm:top-40 sm:h-24 sm:w-24 sm:blur-[72px]" />
          <div className="mb-4 inline-flex max-w-full items-center rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-text-soft shadow-insetglass backdrop-blur-glass sm:mb-5 sm:px-4 sm:text-[11px] sm:tracking-[0.24em]">
            {heroContent.portfolioBadge}
          </div>
          <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.28em] text-primary/80 sm:mb-5 sm:text-[11px] sm:tracking-[0.34em]">{heroContent.eyebrow}</p>
          <h1 className="max-w-4xl font-display text-[clamp(2.9rem,13vw,5.75rem)] leading-[0.94] tracking-[-0.07em] text-transparent heading-gradient">
            {heroContent.title}
          </h1>
          <p className="mt-5 max-w-2xl text-sm leading-6 text-text-soft sm:mt-6 sm:text-base sm:leading-7 lg:text-lg">{heroContent.subtitle}</p>

          <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:items-center sm:gap-4">
            <a href={heroContent.primaryCta.href} className="primary-button w-full px-6 py-3.5 text-[11px] uppercase tracking-[0.18em] sm:w-auto sm:px-7 sm:py-4 sm:text-sm sm:tracking-[0.2em]">
              {heroContent.primaryCta.label}
            </a>
            <a href={heroContent.secondaryCta.href} className="ghost-button w-full px-6 py-3.5 text-[11px] uppercase tracking-[0.18em] sm:w-auto sm:px-7 sm:py-4 sm:text-sm sm:tracking-[0.2em]">
              {heroContent.secondaryCta.label}
            </a>
          </div>

          <p className="mt-5 max-w-2xl text-xs leading-6 text-text-soft/75 sm:mt-6 sm:text-sm">
            {heroContent.disclaimer}
          </p>

          <div className="mt-8 grid gap-3 sm:mt-10 sm:grid-cols-3">
            {heroHighlights.map((item) => (
              <div key={item.label} className="liquid-glass rounded-2xl p-4">
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-text-soft/70 sm:text-[11px] sm:tracking-[0.24em]">{item.label}</p>
                <p className="mt-2 text-sm font-semibold text-text">{item.value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="pointer-events-none absolute inset-x-6 top-6 h-16 rounded-full bg-primary/15 blur-[70px] sm:inset-x-10 sm:top-10 sm:h-20 sm:blur-[80px]" />
          <div className="liquid-panel overflow-hidden p-3 sm:p-4">
            <div className="relative overflow-hidden rounded-[20px] border border-white/10 sm:rounded-[24px]">
              <img src={heroContent.image} alt={heroContent.imageAlt} className="aspect-[4/3] w-full object-cover" />
              <div className="absolute inset-0 bg-hero-fade" />
              <div className="absolute bottom-3 left-3 right-3 flex flex-wrap items-center gap-2 rounded-2xl border border-secondary/20 bg-black/30 px-3 py-2 backdrop-blur-xl sm:bottom-5 sm:left-5 sm:right-auto sm:gap-3 sm:rounded-full">
                <span className="h-2.5 w-2.5 rounded-full bg-secondary shadow-[0_0_16px_rgba(55,214,181,0.9)]" />
                <span className="text-[9px] font-semibold uppercase tracking-[0.18em] text-secondary sm:text-[10px] sm:tracking-[0.24em]">{heroContent.signalLabel}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
