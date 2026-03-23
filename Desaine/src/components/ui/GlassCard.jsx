export default function GlassCard({ children, className = '' }) {
  return <article className={`liquid-panel p-4 sm:p-5 ${className}`}>{children}</article>
}
