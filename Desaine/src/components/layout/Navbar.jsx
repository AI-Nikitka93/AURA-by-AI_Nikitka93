import { useState } from 'react'
import { Menu, X } from 'lucide-react'

export default function Navbar({ items }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleNavClick = (href) => {
    setIsMobileMenuOpen(false)
    // Плавный скролл к секции
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <header className="sticky top-3 z-50 px-3 sm:top-4 sm:px-6">
      <div className="section-shell max-w-6xl px-0">
        <nav className="liquid-glass flex items-center justify-between rounded-full px-4 py-3 sm:px-6">
          <a href="#ritual" className="max-w-[9.5rem] font-display text-sm leading-tight tracking-[-0.03em] text-text sm:max-w-none sm:text-base">
            AURA by AI_Nikitka93
          </a>
          
          {/* Desktop Navigation */}
          <div className="hidden items-center gap-6 md:flex">
            {items.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault()
                  handleNavClick(item.href)
                }}
                className="text-xs font-semibold uppercase tracking-[0.18em] text-text-soft hover:text-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-text-soft hover:bg-white/[0.08] hover:text-text md:hidden"
            aria-label={isMobileMenuOpen ? 'Закрыть меню' : 'Открыть меню'}
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>

          {/* Desktop CTA */}
          <a
            href="#case-study"
            onClick={(e) => {
              e.preventDefault()
              handleNavClick('#case-study')
            }}
            className="primary-button hidden px-4 py-2 text-xs uppercase tracking-[0.18em] sm:px-5 sm:py-2.5 sm:text-sm md:block"
          >
            Смотреть кейс
          </a>
        </nav>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            
            {/* Mobile Menu Panel */}
            <div className="fixed inset-x-3 top-20 z-50 mx-auto max-w-sm rounded-3xl border border-white/10 bg-surface-elevated/95 p-6 shadow-2xl backdrop-blur-xl md:hidden">
              <div className="mb-6 flex items-center justify-between">
                <span className="font-display text-sm tracking-[-0.02em] text-text">
                  Навигация
                </span>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-text-soft hover:bg-white/[0.08] hover:text-text"
                  aria-label="Закрыть меню"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              
              <nav className="space-y-2">
                {items.map((item, index) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault()
                      handleNavClick(item.href)
                    }}
                    className="flex min-h-[52px] items-center justify-between rounded-xl border border-white/5 px-4 py-4 text-sm font-semibold uppercase tracking-[0.16em] text-text-soft transition-all duration-300 hover:border-primary/30 hover:bg-primary/5 hover:text-text"
                    style={{
                      animationDelay: `${index * 50}ms`
                    }}
                  >
                    {item.label}
                  </a>
                ))}
              </nav>

              <div className="mt-6 border-t border-white/10 pt-6">
                <a
                  href="#case-study"
                  onClick={(e) => {
                    e.preventDefault()
                    handleNavClick('#case-study')
                  }}
                  className="primary-button flex w-full items-center justify-center py-4 text-sm uppercase tracking-[0.16em]"
                >
                  Смотреть кейс
                </a>
                <a
                  href="https://github.com/AI-Nikitka93/AURA-by-AI_Nikitka93"
                  target="_blank"
                  rel="noreferrer"
                  className="ghost-button mt-3 flex w-full items-center justify-center px-6 py-3.5 text-sm uppercase tracking-[0.16em] text-text-soft hover:text-text"
                >
                  GitHub
                </a>
              </div>
            </div>
          </>
        )}

        {/* Mobile horizontal scroll (fallback) */}
        <div className="mt-3 flex gap-2 overflow-x-auto pb-1 md:hidden">
          {items.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => {
                e.preventDefault()
                handleNavClick(item.href)
              }}
              className="ghost-button shrink-0 px-4 py-2 text-xs uppercase tracking-[0.16em]"
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </header>
  )
}
