export default function SectionHeading({ eyebrow, title, description, align = 'left' }) {
  const alignment = align === 'center' ? 'mx-auto text-center' : ''

  return (
    <div className={`max-w-3xl ${alignment}`}>
      {eyebrow ? (
        <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.24em] text-primary/80 sm:mb-4 sm:text-[11px]">{eyebrow}</p>
      ) : null}
      <h2 className="font-display text-3xl tracking-[-0.03em] text-transparent sm:text-4xl lg:text-5xl heading-gradient">
        {title}
      </h2>
      {description ? <p className="mt-4 text-sm leading-7 text-text-soft sm:mt-5 sm:text-base">{description}</p> : null}
    </div>
  )
}
