import GlassCard from '../ui/GlassCard'
import SectionHeading from '../ui/SectionHeading'
import useSiteCopy from '../../hooks/useSiteCopy'

export default function CaseStudySection() {
  const { copy } = useSiteCopy()
  const { caseStudyContent } = copy

  return (
    <section id="case-study" className="py-8 sm:py-10 lg:py-12">
      <div className="section-shell">
        <SectionHeading
          eyebrow={caseStudyContent.eyebrow}
          title={caseStudyContent.title}
          description={caseStudyContent.description}
        />

        <div className="mt-4 grid gap-4 sm:mt-5 sm:gap-5 md:grid-cols-2">
          {caseStudyContent.cards.map((card, index) => (
            <div key={card.title} className="reveal" style={{ transitionDelay: `${index * 100}ms` }}>
              <GlassCard className="min-h-[220px]">
                <h3 className="font-display text-2xl tracking-[-0.04em] text-text">{card.title}</h3>
                <p className="mt-4 text-base leading-8 text-text-soft">{card.body}</p>
              </GlassCard>
            </div>
          ))}
        </div>

        <div className="mt-4 overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.03] reveal-scale sm:mt-5">
          <img
            src={caseStudyContent.featuredImage}
            alt={caseStudyContent.featuredImageAlt}
            loading="lazy"
            decoding="async"
            className="h-[260px] w-full object-cover sm:h-[320px]"
          />
          <div className="border-t border-white/10 px-5 py-4 sm:px-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-secondary sm:text-sm">
              {caseStudyContent.featuredImageCaption}
            </p>
          </div>
        </div>

        <div className="mt-4 flex flex-col gap-3 sm:mt-5 sm:flex-row sm:flex-wrap reveal">
          {caseStudyContent.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className="ghost-button w-full px-6 py-3.5 text-center text-sm uppercase tracking-[0.16em] sm:w-auto sm:tracking-[0.18em]"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
