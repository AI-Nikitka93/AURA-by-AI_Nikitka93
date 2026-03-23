import GlassCard from '../ui/GlassCard'
import SectionHeading from '../ui/SectionHeading'
import RitualConfigurator from './RitualConfigurator'
import { benefitCards } from '../../data/landingContent'

export default function BenefitsSection() {
  return (
    <section id="benefits" className="py-8 sm:py-10 lg:py-12">
      <div className="section-shell">
        <SectionHeading
          eyebrow="Benefits"
          title="Технология, которая выглядит как редкость"
          description="Stitch-макет был очищен от неподтвержденных claims и приведен к brand/copy-системе AURA: статус, ритуал, discreet intelligence."
          align="left"
        />

        <div className="mt-4 grid grid-cols-1 gap-4 sm:mt-5 sm:grid-cols-2 sm:gap-5">
          {benefitCards.map((card, index) => {
            const Icon = card.icon

            return (
              <div key={card.title} className={`reveal ${index % 2 === 0 ? 'reveal-left' : 'reveal-right'}`} style={{ transitionDelay: `${index * 100}ms` }}>
                <GlassCard className="group relative overflow-hidden min-h-[340px]">
                  {card.image ? (
                    <>
                      <img
                        src={card.image}
                        alt={card.tag}
                        className="absolute inset-0 h-full w-full object-cover opacity-20 transition-transform duration-700 ease-premium group-hover:scale-[1.03]"
                      />
                      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(9,11,16,0.18)_0%,rgba(9,11,16,0.72)_58%,rgba(9,11,16,0.92)_100%)]" />
                    </>
                  ) : null}

                  <div className="relative flex h-full flex-col justify-between gap-6 sm:gap-8">
                    <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-start">
                      <span className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] shadow-insetglass">
                        <Icon className="h-5 w-5 text-primary" />
                      </span>
                      <span className="max-w-full text-[10px] font-semibold uppercase tracking-[0.18em] text-text-soft/50 sm:text-right sm:tracking-[0.24em]">
                        {card.tag}
                      </span>
                    </div>

                    <div>
                      <h3 className="font-display text-xl tracking-[-0.04em] text-text sm:text-2xl lg:text-3xl">{card.title}</h3>
                      <p className="mt-4 text-sm leading-7 text-text-soft">{card.body}</p>
                    </div>
                  </div>
                </GlassCard>
              </div>
            )
          })}
        </div>

        {/* Ritual Configurator */}
        <div className="reveal mt-6 sm:mt-8">
          <RitualConfigurator />
        </div>
      </div>
    </section>
  )
}
