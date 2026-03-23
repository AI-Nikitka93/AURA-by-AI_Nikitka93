import { heroContent, heroHighlights } from '../../data/landingContent'

export default function HeroSection() {
  return (
    <section id="ritual" className="relative overflow-hidden pt-8 sm:pt-10 lg:pt-12">
      <div className="section-shell grid items-center gap-4 pb-8 sm:gap-6 lg:grid-cols-2 lg:pb-10">
        <div className="relative">
          <div className="pointer-events-none absolute -left-6 top-0 h-28 w-28 rounded-full bg-primary/15 blur-[70px] sm:-left-10 sm:top-2 sm:h-40 sm:w-40 sm:blur-[90px] animate-float" />
          <div className="pointer-events-none absolute left-10 top-28 h-16 w-16 rounded-full bg-secondary/10 blur-[56px] sm:left-20 sm:top-40 sm:h-24 sm:w-24 sm:blur-[72px] animate-float" style={{ animationDelay: '1s' }} />
          <div className="mb-3 inline-flex animate-fade-in items-center rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-[9px] font-semibold uppercase tracking-[0.14em] text-text-soft shadow-insetglass backdrop-blur-glass sm:mb-4 sm:px-4 sm:text-[10px] sm:tracking-[0.18em]">
            {heroContent.portfolioBadge}
          </div>
          <p className="mb-2 animate-fade-in text-[9px] font-semibold uppercase tracking-[0.16em] text-primary/80 sm:mb-3 sm:text-[10px] sm:tracking-[0.18em]" style={{ animationDelay: '150ms' }}>{heroContent.eyebrow}</p>
          <h1 className="max-w-4xl animate-fade-in-up font-display text-[clamp(2rem,10vw,4rem)] leading-[0.95] tracking-[-0.04em] text-transparent heading-gradient">
            {heroContent.title}
          </h1>
          <p className="mt-3 max-w-2xl animate-fade-in-up text-xs leading-5 text-text-soft sm:mt-4 sm:text-sm sm:leading-6" style={{ animationDelay: '200ms' }}>{heroContent.subtitle}</p>

          <div className="mt-5 flex animate-fade-in-up flex-col gap-2 sm:mt-6 sm:flex-row sm:items-center sm:gap-3" style={{ animationDelay: '300ms' }}>
            <a href={heroContent.primaryCta.href} className="primary-button w-full px-5 py-3 text-[10px] uppercase tracking-[0.16em] sm:w-auto sm:px-6 sm:py-3.5 sm:text-xs sm:tracking-[0.18em]">
              {heroContent.primaryCta.label}
            </a>
            <a href={heroContent.secondaryCta.href} target="_blank" rel="noreferrer" className="ghost-button w-full px-5 py-3 text-[10px] uppercase tracking-[0.16em] sm:w-auto sm:px-6 sm:py-3.5 sm:text-xs sm:tracking-[0.18em]">
              {heroContent.secondaryCta.label}
            </a>
          </div>

          <p className="mt-3 max-w-2xl animate-fade-in-up text-[10px] leading-5 text-text-soft/75 sm:mt-4 sm:text-xs" style={{ animationDelay: '400ms' }}>
            {heroContent.disclaimer}
          </p>

          <div className="mt-5 grid gap-2 sm:mt-6 sm:grid-cols-3 sm:gap-3">
            {heroHighlights.map((item, index) => (
              <div key={item.label} className="liquid-glass animate-scale-in rounded-xl p-3" style={{ animationDelay: `${500 + index * 100}ms` }}>
                <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-text-soft/70 sm:text-[10px] sm:tracking-[0.18em]">{item.label}</p>
                <p className="mt-1 text-xs font-semibold text-text sm:text-sm">{item.value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative reveal-scale">
          <div className="pointer-events-none absolute inset-x-6 top-6 h-16 rounded-full bg-primary/15 blur-[70px] sm:inset-x-10 sm:top-10 sm:h-20 sm:blur-[80px]" />
          <div className="liquid-panel overflow-hidden p-2 sm:p-3">
            <div className="relative overflow-hidden rounded-xl border border-white/10 sm:rounded-[20px]">
              <img src={heroContent.image} alt={heroContent.imageAlt} className="aspect-[4/3] h-full w-full object-cover transition-transform duration-700 ease-premium hover:scale-105" />
              <div className="absolute inset-0 bg-hero-fade" />
              <div className="absolute bottom-2 left-2 right-2 flex flex-wrap items-center gap-2 rounded-xl border border-secondary/20 bg-black/30 px-2 py-1.5 backdrop-blur-xl sm:bottom-3 sm:left-3 sm:right-auto sm:gap-2 sm:rounded-full sm:px-3 sm:py-2">
                <span className="h-2 w-2 animate-glow-pulse rounded-full bg-secondary sm:h-2.5 sm:w-2.5" />
                <span className="text-[8px] font-semibold uppercase tracking-[0.14em] text-secondary sm:text-[9px] sm:tracking-[0.18em]">{heroContent.signalLabel}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
