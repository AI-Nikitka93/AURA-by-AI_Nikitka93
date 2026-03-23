import GlassCard from '../ui/GlassCard'
import SectionHeading from '../ui/SectionHeading'
import { disclaimerContent, validationCards } from '../../data/landingContent'

export default function SocialProofSection() {
  return (
    <section id="validation" className="py-12 sm:py-16 lg:py-20">
      <div className="section-shell">
        <SectionHeading
          eyebrow="Validation-ready"
          title="Доверие строится на подтвержденных сигналах"
          description="Неподтвержденные Stitch-цифры и вымышленные отзывы удалены. Секция готова к подстановке реального proof после launch data."
        />

        <div className="reveal mt-6 liquid-glass rounded-2xl px-5 py-4 sm:px-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-primary/80">{disclaimerContent.validationTitle}</p>
          <p className="mt-3 text-sm leading-7 text-text-soft">{disclaimerContent.validationText}</p>
        </div>

        <div className="mt-6 grid gap-4 sm:mt-8 sm:gap-5 md:grid-cols-3">
          {validationCards.map((card, index) => {
            const Icon = card.icon

            return (
              <div key={card.title} className="reveal" style={{ transitionDelay: `${index * 100}ms` }}>
                <GlassCard className="min-h-[200px] sm:min-h-[220px]">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] shadow-insetglass">
                    <Icon className="h-5 w-5 text-secondary" />
                  </span>
                  <h3 className="mt-6 font-display text-xl tracking-[-0.04em] text-text sm:mt-8 sm:text-2xl">{card.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-text-soft">{card.body}</p>
                </GlassCard>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
