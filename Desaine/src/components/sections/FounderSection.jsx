import { ArrowRight } from 'lucide-react'
import { founderContent } from '../../data/landingContent'

export default function FounderSection() {
  return (
    <section id="founder" className="py-16 sm:py-20 lg:py-28">
      <div className="section-shell grid items-center gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
        <div className="reveal-left relative order-2 lg:order-1">
          <div className="pointer-events-none absolute -inset-2 rounded-[36px] bg-primary/10 blur-3xl animate-glow-pulse" />
          <div className="liquid-panel relative overflow-hidden p-3 sm:p-4">
            <div className="overflow-hidden rounded-[26px] border border-white/10">
              <img
                src={founderContent.image}
                alt={founderContent.imageAlt}
                className="aspect-[4/5] h-full w-full object-cover object-top grayscale transition duration-700 ease-premium hover:grayscale-0"
              />
            </div>
            <div className="mt-4 max-w-full rounded-2xl border border-white/10 bg-black/35 px-4 py-3 backdrop-blur-glass lg:absolute lg:bottom-6 lg:left-6 lg:mt-0 lg:max-w-[18rem]">
              <p className="text-sm italic leading-6 text-text">"{founderContent.quote}"</p>
            </div>
          </div>
        </div>

        <div className="reveal-right order-1 space-y-6 lg:order-2">
          <p className="text-[11px] font-semibold uppercase tracking-[0.34em] text-primary/80">{founderContent.label}</p>
          <h2 className="font-display text-[clamp(2.25rem,10vw,4.5rem)] tracking-[-0.05em] text-transparent heading-gradient">
            {founderContent.name}
          </h2>
          <h3 className="font-display text-2xl tracking-[-0.04em] text-text sm:text-3xl">{founderContent.title}</h3>
          <div className="space-y-5 text-base leading-7 text-text-soft">
            {founderContent.description.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <a href="#case-study" className="inline-flex items-center gap-3 pt-3 text-sm font-semibold uppercase tracking-[0.24em] text-text hover:text-primary group">
            {founderContent.action}
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  )
}
