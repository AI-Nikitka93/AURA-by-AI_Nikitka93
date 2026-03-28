const options = [
  { id: 'ru', label: 'RU' },
  { id: 'en', label: 'EN' },
]

export default function LanguageSwitcher({ language, onChange, ariaLabel, compact = false }) {
  return (
    <div
      className={`inline-flex items-center rounded-full border border-white/10 bg-white/[0.04] p-1 ${
        compact ? 'gap-1' : 'gap-1.5'
      }`}
      role="group"
      aria-label={ariaLabel}
    >
      {options.map((option) => {
        const isActive = language === option.id

        return (
          <button
            key={option.id}
            type="button"
            onClick={() => onChange(option.id)}
            aria-pressed={isActive}
            className={`min-h-[36px] rounded-full px-3 text-xs font-semibold uppercase tracking-[0.18em] transition-colors ${
              isActive
                ? 'bg-primary text-[#0d1020]'
                : 'text-text-soft hover:text-text'
            } ${compact ? 'min-w-[48px]' : 'min-w-[56px]'}`}
          >
            {option.label}
          </button>
        )
      })}
    </div>
  )
}
