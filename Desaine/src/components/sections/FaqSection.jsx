import { ChevronDown } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading'
import { faqItems } from '../../data/landingContent'

export default function FaqSection() {
  return (
    <section id="faq" className="py-16 sm:py-20 lg:py-24">
      <div className="section-shell max-w-4xl">
        <SectionHeading
          eyebrow="FAQ"
          title="Вопросы, которые снимают шум"
          description="Тексты приведены к premium tone of voice и не обещают того, что еще не подтверждено реальными данными или юридическими документами."
          align="center"
        />

        <div className="mt-12 space-y-4">
          {faqItems.map((item, index) => (
            <details
              key={item.question}
              className="group liquid-panel overflow-hidden reveal"
              open={index === 0}
              style={{ transitionDelay: `${index * 80}ms` }}
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 px-5 py-5 text-left sm:px-6">
                <span className="font-display text-lg tracking-[-0.03em] text-text sm:text-xl">{item.question}</span>
                <ChevronDown className="h-5 w-5 shrink-0 text-primary transition-transform duration-200 ease-premium group-open:rotate-180" />
              </summary>
              <div className="px-5 pb-5 text-sm leading-7 text-text-soft sm:px-6 sm:pb-6">{item.answer}</div>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
