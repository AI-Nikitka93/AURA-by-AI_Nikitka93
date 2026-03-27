import { ctaContent } from '../../data/landingContent'
import EmailSignupForm from './EmailSignupForm'

export default function CtaSection() {
  return (
    <section id="cta" className="relative py-6 sm:py-8 lg:py-10">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(111,124,255,0.14),transparent_34%)]" />
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <img
          src={ctaContent.backgroundImage}
          alt=""
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover opacity-[0.08] mix-blend-screen"
        />
      </div>
      <div className="section-shell relative">
        <div className="liquid-panel overflow-hidden px-5 py-6 text-center sm:px-8 sm:py-8 lg:px-16 lg:py-10 reveal-scale">
          <div className="pointer-events-none absolute inset-x-8 top-8 h-20 rounded-full bg-primary/10 blur-[80px] sm:inset-x-24 sm:top-10 sm:h-24 sm:blur-[100px] animate-glow-pulse" />
          <div className="relative mx-auto max-w-3xl">
            <h2 className="font-display text-[clamp(2.4rem,12vw,4.5rem)] leading-[0.98] tracking-[-0.06em] text-transparent heading-gradient lg:text-7xl">
              {ctaContent.title}
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-base leading-8 text-text-soft sm:mt-4 lg:text-lg">{ctaContent.subtitle}</p>
            <div className="mt-4 flex flex-col items-center gap-3 sm:mt-5 sm:flex-row sm:justify-center">
              <a href="#ritual" className="primary-button w-full px-6 py-3.5 text-sm uppercase tracking-[0.16em] sm:w-auto sm:px-8 sm:py-4 sm:tracking-[0.2em]">
                {ctaContent.button}
              </a>
              <a href={ctaContent.secondaryHref} target="_blank" rel="noreferrer" className="ghost-button w-full px-6 py-3.5 text-sm uppercase tracking-[0.16em] sm:w-auto sm:px-8 sm:py-4 sm:tracking-[0.2em]">
                {ctaContent.secondaryButton}
              </a>
            </div>
            <p className="mt-4 text-sm uppercase tracking-[0.18em] text-text-soft">{ctaContent.meta}</p>
          </div>
        </div>

        <div className="mx-auto mt-3 max-w-md sm:mt-4 reveal">
          <EmailSignupForm />
        </div>
      </div>
    </section>
  )
}
