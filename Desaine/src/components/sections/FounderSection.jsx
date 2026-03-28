import { ArrowRight } from 'lucide-react'
import useSiteCopy from '../../hooks/useSiteCopy'

export default function FounderSection() {
  const { copy } = useSiteCopy()
  const { founderContent } = copy

  return (
    <section id="founder" className="py-8 sm:py-10 lg:py-12">
      <div className="section-shell grid items-center gap-6 lg:grid-cols-2 lg:gap-10">
        <div className="reveal-left relative order-2 lg:order-1">
          <div className="pointer-events-none absolute -inset-2 rounded-[36px] bg-primary/10 blur-3xl animate-glow-pulse" />
          <div className="liquid-panel relative overflow-hidden p-3 sm:p-4">
            <div className="overflow-hidden rounded-[26px] border border-white/10">
              <img
                src={founderContent.image}
                alt={founderContent.imageAlt}
                loading="lazy"
                decoding="async"
                className="aspect-[4/5] h-full w-full object-cover object-top grayscale transition duration-700 ease-premium hover:grayscale-0"
              />
            </div>
            <div className="mt-4 max-w-full overflow-hidden rounded-2xl border border-white/10 bg-black/35 px-4 py-3 backdrop-blur-glass lg:absolute lg:bottom-6 lg:left-6 lg:mt-0 lg:max-w-[18rem]">
              <div className="pointer-events-none absolute inset-0">
                <img
                  src={founderContent.quoteBackground}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover opacity-15"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(9,11,16,0.20)_0%,rgba(9,11,16,0.75)_100%)]" />
              </div>
              <p className="relative text-sm italic leading-6 text-text">"{founderContent.quote}"</p>
            </div>
          </div>
        </div>

        <div className="reveal-right order-1 space-y-5 lg:order-2">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-secondary sm:text-sm">{founderContent.label}</p>
          <h2 className="font-display text-[clamp(2rem,8vw,3.5rem)] tracking-[-0.03em] text-transparent heading-gradient">
            {founderContent.name}
          </h2>
          <h3 className="font-display text-xl tracking-[-0.03em] text-text sm:text-2xl">{founderContent.title}</h3>
          <div className="space-y-4 text-base leading-8 text-text-soft">
            {founderContent.description.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <a href="#case-study" className="group inline-flex items-center gap-2 pt-2 text-sm font-semibold uppercase tracking-[0.16em] text-text hover:text-primary">
            {founderContent.action}
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  )
}
