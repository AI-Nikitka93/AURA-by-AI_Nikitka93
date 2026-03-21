export default function GlassCard({ children, className = '' }) {
  return <article className={`liquid-panel p-6 sm:p-8 ${className}`}>{children}</article>
}
