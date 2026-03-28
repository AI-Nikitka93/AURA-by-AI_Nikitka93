import { useState } from 'react'
import { Check, Copy, Sparkles, Waves, Zap } from 'lucide-react'
import { useExperience } from '../../context/ExperienceContext'
import useSiteCopy from '../../hooks/useSiteCopy'

export default function RitualConfigurator() {
  const { copy } = useSiteCopy()
  const { ritualConfigurator } = copy
  const {
    experience,
    setRitual,
    setIntensity,
    shareCurrentSelection,
  } = useExperience()
  const [shareStatus, setShareStatus] = useState('idle')
  const rituals = ritualConfigurator.rituals.map((ritual) => ({
    ...ritual,
    icon:
      ritual.id === 'glow'
        ? Sparkles
        : ritual.id === 'pulse'
          ? Zap
          : Waves,
  }))

  const handleSelect = (ritualId) => {
    setRitual(ritualId)
  }

  const selectedRitualData = rituals.find((r) => r.id === experience.ritual)

  const handleShare = async () => {
    try {
      const result = await shareCurrentSelection()

      if (result.method === 'cancelled') {
        setShareStatus('idle')
        return
      }

      setShareStatus('copied')
      window.setTimeout(() => setShareStatus('idle'), 2200)
    } catch {
      setShareStatus('error')
      window.setTimeout(() => setShareStatus('idle'), 2200)
    }
  }

  const handleOpenAdvisor = () => {
    const advisorSection = document.getElementById('advisor')

    if (advisorSection) {
      advisorSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <div className="relative">
      <div className="mb-8 text-center">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-secondary sm:text-sm">
          {ritualConfigurator.eyebrow}
        </p>
        <h3 className="font-display text-2xl tracking-[-0.03em] text-text sm:text-3xl">
          {ritualConfigurator.title}
        </h3>
        <p className="mt-3 text-base text-text-soft">
          {ritualConfigurator.description}
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {rituals.map((ritual, index) => {
          const Icon = ritual.icon
          const isSelected = experience.ritual === ritual.id

          return (
            <button
              key={ritual.id}
              type="button"
              onClick={() => handleSelect(ritual.id)}
              aria-pressed={isSelected}
              className={`group relative flex flex-col items-center rounded-2xl border p-6 text-left transition-all duration-500 ${
                isSelected
                  ? 'border-primary/50 bg-primary/10 shadow-[0_0_40px_rgba(111,124,255,0.2)]'
                  : 'border-white/10 bg-surface/30 hover:border-white/20 hover:bg-surface/50'
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {isSelected && (
                <div
                  className="absolute inset-0 rounded-2xl opacity-50 blur-2xl"
                  style={{
                    background: `radial-gradient(circle at center, ${ritual.glowColor} 0%, transparent 70%)`,
                  }}
                />
              )}

              <div
                className={`relative mb-4 flex h-14 w-14 items-center justify-center rounded-full transition-all duration-300 ${
                  isSelected
                    ? 'bg-primary/20 shadow-[0_0_24px_rgba(111,124,255,0.3)]'
                    : 'border border-white/10 bg-white/[0.04]'
                }`}
              >
                <Icon
                  className={`h-6 w-6 transition-colors duration-300 ${
                    isSelected ? 'text-primary' : 'text-text-soft'
                  }`}
                />
              </div>

              <span
                className={`relative text-base font-semibold uppercase tracking-[0.16em] transition-colors duration-300 ${
                  isSelected ? 'text-primary' : 'text-text'
                }`}
              >
                {ritual.name}
              </span>
              <span className="relative mt-1 text-sm text-text-soft">
                {ritual.subtitle}
              </span>

              {isSelected && (
                <div className="absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full bg-primary">
                  <Check className="h-3.5 w-3.5 text-[#0d1020]" />
                </div>
              )}
            </button>
          )
        })}
      </div>

      {selectedRitualData && (
        <div className="reveal mt-8 liquid-panel overflow-hidden p-6 sm:p-8">
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="relative flex aspect-square items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-black/40">
              <div
                className={`absolute inset-0 bg-gradient-to-br opacity-30 ${selectedRitualData.gradient}`}
              />

              <div className="relative z-10 text-center">
                <div
                  className="mx-auto mb-4 h-24 w-24 rounded-full blur-3xl transition-all duration-700"
                  style={{
                    backgroundColor: selectedRitualData.glowColor,
                    boxShadow: `0 0 60px ${selectedRitualData.glowColor}`,
                  }}
                />
                <p className="text-sm uppercase tracking-[0.16em] text-text-soft">
                  {ritualConfigurator.previewLabel}
                </p>
              </div>

              <div className="absolute inset-0 flex items-center justify-center">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="absolute rounded-full border border-white/5"
                    style={{
                      width: `${i * 30}%`,
                      height: `${i * 30}%`,
                      animation: `ping ${2 + i * 0.5}s cubic-bezier(0, 0, 0.2, 1) infinite`,
                      animationDelay: `${i * 0.3}s`,
                    }}
                  />
                ))}
              </div>
            </div>

            <div className="flex flex-col justify-center">
              <h4 className="font-display text-xl tracking-[-0.03em] text-text">
                {selectedRitualData.name}
              </h4>
              <p className="mt-3 text-sm leading-7 text-text-soft">
                {selectedRitualData.description}
              </p>

              <div className="mt-6 space-y-3">
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-secondary">
                  {ritualConfigurator.featuresLabel}
                </p>
                {selectedRitualData.features.map((feature) => (
                <div
                  key={feature}
                  className="flex items-center gap-3 rounded-lg border border-white/5 bg-white/[0.02] px-3 py-2"
                >
                    <div
                      className="h-2 w-2 rounded-full"
                      style={{
                        backgroundColor: selectedRitualData.glowColor,
                        boxShadow: `0 0 8px ${selectedRitualData.glowColor}`,
                      }}
                    />
                    <span className="text-base text-text-soft">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6">
                <div className="mb-3 flex items-center justify-between gap-4">
                  <label htmlFor="ritual-intensity" className="text-sm font-semibold uppercase tracking-[0.16em] text-secondary">
                    {ritualConfigurator.intensityLabel}
                  </label>
                  <span className="text-sm font-semibold text-primary">
                    {experience.intensity}%
                  </span>
                </div>
                <input
                  id="ritual-intensity"
                  type="range"
                  min="0"
                  max="100"
                  value={experience.intensity}
                  onChange={(e) => setIntensity(Number(e.target.value))}
                  className="h-2 w-full appearance-none rounded-full bg-white/10 outline-none"
                  style={{
                    background: `linear-gradient(to right, ${selectedRitualData.glowColor} 0%, ${selectedRitualData.glowColor} ${experience.intensity}%, rgba(255,255,255,0.1) ${experience.intensity}%, rgba(255,255,255,0.1) 100%)`,
                  }}
                />
                <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <button type="button" onClick={handleShare} className="ghost-button px-5 py-3">
                    <Copy className="mr-2 h-4 w-4" />
                    {ritualConfigurator.shareButton}
                  </button>
                  <button type="button" onClick={handleOpenAdvisor} className="ghost-button px-5 py-3">
                    <Sparkles className="mr-2 h-4 w-4" />
                    {ritualConfigurator.advisorButton}
                  </button>
                </div>
                <div className="mt-3 space-y-2">
                  <p className="text-sm leading-6 text-text-soft">
                    {ritualConfigurator.advisorHint}
                  </p>
                  <p className="text-sm leading-6 text-text-soft">
                    {shareStatus === 'copied' && ritualConfigurator.shareStatus.copied}
                    {shareStatus === 'error' && ritualConfigurator.shareStatus.error}
                    {shareStatus === 'idle' && ritualConfigurator.shareStatus.idle}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
