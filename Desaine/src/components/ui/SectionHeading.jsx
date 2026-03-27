export default function SectionHeading({ eyebrow, title, description, align = 'left' }) {
  const alignment = align === 'center' ? 'mx-auto text-center' : ''

  return (
    <div className={`${alignment}`}>
      {eyebrow ? (
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-secondary sm:mb-3 sm:text-sm">{eyebrow}</p>
      ) : null}
      <h2 className="font-display text-2xl tracking-[-0.02em] text-transparent sm:text-3xl lg:text-4xl heading-gradient">
        {title}
      </h2>
      {description ? <p className="mt-3 text-sm leading-7 text-text-soft sm:mt-4 sm:text-base">{description}</p> : null}
    </div>
  )
}
