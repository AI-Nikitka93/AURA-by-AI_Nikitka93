import { ChevronDown } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading'
import useSiteCopy from '../../hooks/useSiteCopy'

export default function FaqSection() {
  const { copy } = useSiteCopy()
  const { faqBackground, faqItems, faqSection } = copy

  return (
    <section id="faq" className="relative overflow-hidden py-8 sm:py-10 lg:py-12">
      <div className="pointer-events-none absolute inset-0">
        <img
          src={faqBackground}
          alt=""
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover opacity-10 mix-blend-screen"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(9,11,16,0.25)_0%,rgba(9,11,16,0.88)_100%)]" />
      </div>

      <div className="section-shell relative z-10 max-w-4xl">
        <SectionHeading
          eyebrow={faqSection.eyebrow}
          title={faqSection.title}
          description={faqSection.description}
          align="center"
        />

        <div className="mt-4 space-y-3">
          {faqItems.map((item, index) => (
            <details
              key={item.question}
              className="group liquid-panel overflow-hidden reveal"
              open={index === 0}
              style={{ transitionDelay: `${index * 80}ms` }}
            >
              <summary className="flex min-h-[56px] cursor-pointer list-none items-center justify-between gap-6 px-5 py-5 text-left sm:px-6">
                <span className="font-display text-lg tracking-[-0.03em] text-text sm:text-xl">{item.question}</span>
                <ChevronDown className="h-5 w-5 shrink-0 text-primary transition-transform duration-200 ease-premium group-open:rotate-180" />
              </summary>
              <div className="px-5 pb-5 text-base leading-8 text-text-soft sm:px-6 sm:pb-6">{item.answer}</div>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
