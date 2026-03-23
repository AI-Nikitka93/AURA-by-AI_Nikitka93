import { useState } from 'react'
import { Check, Sparkles, Waves, Zap } from 'lucide-react'

const rituals = [
  {
    id: 'glow',
    name: 'Glow',
    subtitle: 'Внутреннее свечение',
    description: 'Мягкое люминесцентное свечение, которое реагирует на ваши биоритмы. Идеально для вечерних выходов и особых случаев.',
    icon: Sparkles,
    gradient: 'from-indigo-500/20 via-purple-500/10 to-transparent',
    glowColor: 'rgba(111, 124, 255, 0.6)',
    features: ['Адаптивная яркость', 'Тёплый спектр', 'Плавные переходы'],
  },
  {
    id: 'calm',
    name: 'Calm',
    subtitle: 'Энергия покоя',
    description: 'Изумрудное свечение с минимальной активностью. Для медитации, фокуса и баланса в течение дня.',
    icon: Waves,
    gradient: 'from-emerald-500/20 via-teal-500/10 to-transparent',
    glowColor: 'rgba(55, 214, 181, 0.6)',
    features: ['Стабильный свет', 'Холодный спектр', 'Низкая пульсация'],
  },
  {
    id: 'pulse',
    name: 'Pulse',
    subtitle: 'Живой ритм',
    description: 'Динамическая пульсация в ритме вашего сердца. Для активных дней и ярких событий.',
    icon: Zap,
    gradient: 'from-rose-500/20 via-pink-500/10 to-transparent',
    glowColor: 'rgba(255, 107, 143, 0.6)',
    features: ['Сердечный ритм', 'Энергичный паттерн', 'Высокая активность'],
  },
]

export default function RitualConfigurator() {
  const [selectedRitual, setSelectedRitual] = useState(null)
  const [intensity, setIntensity] = useState(50)
  const [showPreview, setShowPreview] = useState(false)

  const handleSelect = (ritualId) => {
    setSelectedRitual(ritualId)
    setShowPreview(true)
  }

  const selectedRitualData = rituals.find((r) => r.id === selectedRitual)

  return (
    <div className="relative">
      <div className="mb-8 text-center">
        <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.28em] text-primary/80">
          Конфигуратор
        </p>
        <h3 className="font-display text-2xl tracking-[-0.03em] text-text sm:text-3xl">
          Выберите свой ритуал
        </h3>
        <p className="mt-3 text-sm text-text-soft">
          Каждый ритуал создаёт уникальную сигнатуру свечения под ваш стиль жизни
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {rituals.map((ritual, index) => {
          const Icon = ritual.icon
          const isSelected = selectedRitual === ritual.id

          return (
            <button
              key={ritual.id}
              onClick={() => handleSelect(ritual.id)}
              className={`group relative flex flex-col items-center rounded-2xl border p-6 text-left transition-all duration-500 ${
                isSelected
                  ? 'border-primary/50 bg-primary/10 shadow-[0_0_40px_rgba(111,124,255,0.2)]'
                  : 'border-white/10 bg-surface/30 hover:border-white/20 hover:bg-surface/50'
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Glow Effect */}
              {isSelected && (
                <div
                  className="absolute inset-0 rounded-2xl opacity-50 blur-2xl"
                  style={{
                    background: `radial-gradient(circle at center, ${ritual.glowColor} 0%, transparent 70%)`,
                  }}
                />
              )}

              {/* Icon */}
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

              {/* Content */}
              <span
                className={`relative text-sm font-semibold uppercase tracking-[0.18em] transition-colors duration-300 ${
                  isSelected ? 'text-primary' : 'text-text'
                }`}
              >
                {ritual.name}
              </span>
              <span className="relative mt-1 text-xs text-text-soft/60">
                {ritual.subtitle}
              </span>

              {/* Checkmark */}
              {isSelected && (
                <div className="absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full bg-primary">
                  <Check className="h-3.5 w-3.5 text-[#0d1020]" />
                </div>
              )}
            </button>
          )
        })}
      </div>

      {/* Preview Panel */}
      {showPreview && selectedRitualData && (
        <div className="reveal mt-8 liquid-panel overflow-hidden p-6 sm:p-8">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Visual Preview */}
            <div className="relative flex aspect-square items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-black/40">
              {/* Background Gradient */}
              <div
                className={`absolute inset-0 bg-gradient-to-br opacity-30 ${selectedRitualData.gradient}`}
              />

              {/* Jewelry Mockup */}
              <div className="relative z-10 text-center">
                <div
                  className="mx-auto mb-4 h-24 w-24 rounded-full blur-3xl transition-all duration-700"
                  style={{
                    backgroundColor: selectedRitualData.glowColor,
                    boxShadow: `0 0 60px ${selectedRitualData.glowColor}`,
                  }}
                />
                <p className="text-xs uppercase tracking-[0.2em] text-text-soft/60">
                  Предпросмотр свечения
                </p>
              </div>

              {/* Animated Rings */}
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

            {/* Details */}
            <div className="flex flex-col justify-center">
              <h4 className="font-display text-xl tracking-[-0.03em] text-text">
                {selectedRitualData.name}
              </h4>
              <p className="mt-3 text-sm leading-7 text-text-soft">
                {selectedRitualData.description}
              </p>

              <div className="mt-6 space-y-3">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-text-soft/70">
                  Характеристики
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
                    <span className="text-sm text-text-soft">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Intensity Slider */}
              <div className="mt-6">
                <div className="mb-3 flex items-center justify-between">
                  <label className="text-xs font-semibold uppercase tracking-[0.18em] text-text-soft/70">
                    Интенсивность
                  </label>
                  <span className="text-sm font-semibold text-primary">
                    {intensity}%
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={intensity}
                  onChange={(e) => setIntensity(Number(e.target.value))}
                  className="h-2 w-full appearance-none rounded-full bg-white/10 outline-none"
                  style={{
                    background: `linear-gradient(to right, ${selectedRitualData.glowColor} 0%, ${selectedRitualData.glowColor} ${intensity}%, rgba(255,255,255,0.1) ${intensity}%, rgba(255,255,255,0.1) 100%)`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
