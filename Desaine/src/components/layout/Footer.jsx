import { disclaimerContent, footerLinks, footerMeta } from '../../data/landingContent'

export default function Footer() {
  const Icon = footerMeta.actionIcon
  const base = import.meta.env.BASE_URL

  return (
    <footer className="relative z-10 border-t border-white/5 bg-black/20 py-12">
      <div className="section-shell flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <div className="space-y-3">
          <p className="font-display text-lg tracking-[-0.04em] text-text">{footerMeta.brand}</p>
          <p className="text-sm text-text-soft">{footerMeta.copy}</p>
          <p className="max-w-md text-sm text-text-soft/80">{footerMeta.note}</p>
          <p className="max-w-xl text-xs leading-6 text-text-soft/65">{disclaimerContent.footer}</p>
        </div>

        <div className="flex flex-wrap gap-4 sm:flex-row sm:items-center sm:gap-6">
          {footerLinks.map((link) => (
            <a key={link.href} href={link.href} className="text-sm text-text-soft hover:text-secondary">
              {link.label}
            </a>
          ))}
          <a href={`${base}privacy.html`} className="text-sm text-text-soft hover:text-secondary">
            Privacy Policy
          </a>
          <a href="#ritual" className="inline-flex items-center gap-2 text-sm text-text hover:text-primary">
            Вернуться к началу
            <Icon className="h-4 w-4" />
          </a>
        </div>
      </div>
    </footer>
  )
}
