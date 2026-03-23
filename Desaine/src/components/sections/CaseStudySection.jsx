import GlassCard from '../ui/GlassCard'
import SectionHeading from '../ui/SectionHeading'
import { caseStudyContent } from '../../data/landingContent'

export default function CaseStudySection() {
  return (
    <section id="case-study" className="py-16 sm:py-20 lg:py-24">
      <div className="section-shell">
        <SectionHeading
          eyebrow={caseStudyContent.eyebrow}
          title={caseStudyContent.title}
          description={caseStudyContent.description}
        />

        <div className="mt-10 grid gap-4 sm:mt-12 sm:gap-5 md:grid-cols-2">
          {caseStudyContent.cards.map((card, index) => (
            <div key={card.title} className="reveal" style={{ transitionDelay: `${index * 100}ms` }}>
              <GlassCard className="min-h-[220px]">
                <h3 className="font-display text-2xl tracking-[-0.04em] text-text">{card.title}</h3>
                <p className="mt-4 text-sm leading-7 text-text-soft">{card.body}</p>
              </GlassCard>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:flex-wrap reveal">
          {caseStudyContent.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className="ghost-button w-full px-6 py-3.5 text-center text-[11px] uppercase tracking-[0.18em] sm:w-auto sm:text-sm sm:tracking-[0.2em]"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
