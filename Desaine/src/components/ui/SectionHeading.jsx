export default function SectionHeading({ eyebrow, title, description, align = 'left' }) {
  const alignment = align === 'center' ? 'mx-auto text-center' : ''

  return (
    <div className={`max-w-3xl ${alignment}`}>
      {eyebrow ? (
        <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.34em] text-primary/80">{eyebrow}</p>
      ) : null}
      <h2 className="font-display text-4xl tracking-[-0.04em] text-transparent sm:text-5xl lg:text-6xl heading-gradient">
        {title}
      </h2>
      {description ? <p className="mt-6 text-base leading-7 text-text-soft sm:text-lg">{description}</p> : null}
    </div>
  )
}
