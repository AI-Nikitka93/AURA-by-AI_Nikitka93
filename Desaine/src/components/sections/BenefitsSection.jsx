import GlassCard from '../ui/GlassCard'
import SectionHeading from '../ui/SectionHeading'
import { benefitCards } from '../../data/landingContent'

export default function BenefitsSection() {
  return (
    <section id="benefits" className="py-16 sm:py-20 lg:py-24">
      <div className="section-shell">
        <SectionHeading
          eyebrow="Benefits"
          title="Технология, которая выглядит как редкость"
          description="Stitch-макет был очищен от неподтвержденных claims и приведен к brand/copy-системе AURA: статус, ритуал, discreet intelligence."
        />

        <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-12 sm:gap-5 md:grid-cols-12">
          {benefitCards.map((card) => {
            const Icon = card.icon

            return (
              <GlassCard key={card.title} className={`group relative overflow-hidden ${card.className}`}>
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
                    <h3 className="max-w-xl font-display text-xl tracking-[-0.04em] text-text sm:text-2xl lg:text-3xl">{card.title}</h3>
                    <p className="mt-4 max-w-2xl text-sm leading-7 text-text-soft sm:text-base">{card.body}</p>
                  </div>
                </div>
              </GlassCard>
            )
          })}
        </div>
      </div>
    </section>
  )
}
