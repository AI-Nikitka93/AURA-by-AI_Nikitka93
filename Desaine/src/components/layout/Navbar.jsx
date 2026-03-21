export default function Navbar({ items }) {
  return (
    <header className="sticky top-3 z-50 px-3 sm:top-4 sm:px-6">
      <div className="section-shell max-w-6xl px-0">
        <nav className="liquid-glass flex items-center justify-between rounded-full px-4 py-3 sm:px-6">
          <a href="#ritual" className="max-w-[9.5rem] font-display text-xs leading-tight tracking-[-0.03em] text-text sm:max-w-none sm:text-base">
            AURA by AI_Nikitka93
          </a>
          <div className="hidden items-center gap-6 md:flex">
            {items.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-[11px] font-semibold uppercase tracking-[0.28em] text-text-soft hover:text-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                {item.label}
              </a>
            ))}
          </div>
          <a href="#cta" className="primary-button px-4 py-2 text-[10px] uppercase tracking-[0.22em] sm:px-5 sm:py-2.5 sm:text-xs">
            Выбрать
          </a>
        </nav>

        <div className="mt-3 flex gap-2 overflow-x-auto pb-1 md:hidden">
          {items.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="ghost-button shrink-0 px-4 py-2 text-[10px] uppercase tracking-[0.2em]"
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </header>
  )
}
