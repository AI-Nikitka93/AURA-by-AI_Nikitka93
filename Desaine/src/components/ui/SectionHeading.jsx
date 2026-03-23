export default function SectionHeading({ eyebrow, title, description, align = 'left' }) {
  const alignment = align === 'center' ? 'mx-auto text-center' : ''

  return (
    <div className={`${alignment}`}>
      {eyebrow ? (
        <p className="mb-2 text-[9px] font-semibold uppercase tracking-[0.18em] text-primary/80 sm:mb-3 sm:text-[10px]">{eyebrow}</p>
      ) : null}
      <h2 className="font-display text-2xl tracking-[-0.02em] text-transparent sm:text-3xl lg:text-4xl heading-gradient">
        {title}
      </h2>
      {description ? <p className="mt-3 text-xs leading-6 text-text-soft sm:mt-4 sm:text-sm">{description}</p> : null}
    </div>
  )
}
