import { useState } from 'react'
import {
  ArrowRight,
  Check,
  CircleGauge,
  Fingerprint,
  Smartphone,
  Sparkles,
} from 'lucide-react'
import { useExperience } from '../../context/ExperienceContext'
import GlassCard from '../ui/GlassCard'
import SectionHeading from '../ui/SectionHeading'

const wearMomentOptions = [
  {
    id: 'daily',
    label: 'Daily Focus',
    description: 'Для регулярного ношения, рабочих встреч и спокойного присутствия.',
  },
  {
    id: 'evening',
    label: 'Evening Signal',
    description: 'Для вечерних выходов, событий и более заметного luminous-жеста.',
  },
  {
    id: 'travel',
    label: 'Travel Pulse',
    description: 'Для перелётов, интенсивных дней и ритма, который должен чувствоваться быстрее.',
  },
]

const ecosystemOptions = [
  {
    id: 'ios',
    label: 'iPhone first',
    description: 'Приоритет на аккуратный iOS-компаньон, reminders и privacy-first настройки.',
  },
  {
    id: 'android',
    label: 'Android first',
    description: 'Гибкий Android flow, widgets и больше кастомного surface management.',
  },
  {
    id: 'mixed',
    label: 'Mixed ecosystem',
    description: 'Нужна нейтральная совместимость между устройствами и сменой контекста.',
  },
]

const fitPreferenceOptions = [
  {
    id: 'comfort',
    label: 'Quiet comfort',
    description: 'Минимум вмешательства, мягкая посадка и низкий порог заметности.',
  },
  {
    id: 'balanced',
    label: 'Balanced fit',
    description: 'Равновесие между присутствием, посадкой и everyday-ritual use.',
  },
  {
    id: 'statement',
    label: 'Statement object',
    description: 'Украшение должно быть частью образа и считываться сильнее.',
  },
]

function getAdvisorRecommendation(experience) {
  const wearMomentMap = {
    daily: {
      ritual: 'calm',
      intensity: 42,
      fitNote: 'Лучше держать посадку ближе к комфортной: указательный или средний палец, дневной wear loop.',
    },
    evening: {
      ritual: 'glow',
      intensity: 72,
      fitNote: 'Можно выбирать чуть более выразительную посадку: средний палец или рука, которая чаще попадает в кадр.',
    },
    travel: {
      ritual: 'pulse',
      intensity: 64,
      fitNote: 'Нужен более собранный fit и устойчивость к смене контекста: плотная, но не жёсткая посадка.',
    },
  }

  const ecosystemMap = {
    ios: 'Лучше показывать чистый iOS companion layer: reminders, privacy controls и мягкую нотификацию.',
    android: 'Подходит сценарий с widgets, гибкой кастомизацией свечения и расширенными настройками quick actions.',
    mixed: 'Стоит проектировать нейтральный account layer и device-agnostic sync без ощущения “приложение только под одну систему”.',
  }

  const fitBiasMap = {
    comfort: {
      ritual: 'calm',
      intensityDelta: -8,
      profileLabel: 'Discreet wear',
    },
    balanced: {
      ritual: null,
      intensityDelta: 0,
      profileLabel: 'Balanced signature',
    },
    statement: {
      ritual: 'glow',
      intensityDelta: 10,
      profileLabel: 'Editorial presence',
    },
  }

  const wearMomentRecommendation = wearMomentMap[experience.wearMoment]
  const fitBias = fitBiasMap[experience.fitPreference]
  const ritual = fitBias.ritual || wearMomentRecommendation.ritual
  const intensity = Math.max(20, Math.min(90, wearMomentRecommendation.intensity + fitBias.intensityDelta))

  return {
    ritual,
    intensity,
    fitNote: wearMomentRecommendation.fitNote,
    ecosystemNote: ecosystemMap[experience.ecosystem],
    profileLabel: fitBias.profileLabel,
  }
}

function OptionCard({ icon: Icon, title, description, isActive, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group rounded-[24px] border p-4 text-left transition-all duration-300 ${
        isActive
          ? 'border-primary/40 bg-primary/10 shadow-[0_0_28px_rgba(111,124,255,0.16)]'
          : 'border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.05]'
      }`}
    >
      <span className={`inline-flex h-11 w-11 items-center justify-center rounded-full border ${
        isActive ? 'border-primary/30 bg-primary/10 text-primary' : 'border-white/10 bg-white/[0.04] text-text-soft'
      }`}>
        <Icon className="h-5 w-5" />
      </span>
      <h3 className="mt-4 font-display text-lg tracking-[-0.03em] text-text">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-text-soft">{description}</p>
      {isActive && (
        <span className="mt-4 inline-flex items-center text-sm font-semibold text-primary">
          <Check className="mr-2 h-4 w-4" />
          Выбрано
        </span>
      )}
    </button>
  )
}

export default function ProductAdvisorSection() {
  const {
    experience,
    setRitual,
    setIntensity,
    setWearMoment,
    setEcosystem,
    setFitPreference,
  } = useExperience()
  const [applyState, setApplyState] = useState('idle')

  const recommendation = getAdvisorRecommendation(experience)

  const applyRecommendation = () => {
    setRitual(recommendation.ritual)
    setIntensity(recommendation.intensity)
    setApplyState('applied')
    window.setTimeout(() => setApplyState('idle'), 2200)
  }

  return (
    <section id="advisor" className="py-8 sm:py-10 lg:py-12">
      <div className="section-shell">
        <SectionHeading
          eyebrow="Guided Fit"
          title="Подберите посадку, ритуал и экосистему до заявки"
          description="Этот блок добавляет сайту product-grade сценарий выбора: как AURA будет носиться, с какой системой жить и какой сигнал стоит активировать по умолчанию."
        />

        <div className="mt-5 grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-4">
            <GlassCard className="space-y-4">
              <div className="flex items-center gap-3">
                <Fingerprint className="h-5 w-5 text-secondary" />
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-text">1. Когда AURA будет жить активнее всего</p>
              </div>
              <div className="grid gap-3 md:grid-cols-3">
                {wearMomentOptions.map((option) => (
                  <OptionCard
                    key={option.id}
                    icon={Fingerprint}
                    title={option.label}
                    description={option.description}
                    isActive={experience.wearMoment === option.id}
                    onClick={() => setWearMoment(option.id)}
                  />
                ))}
              </div>
            </GlassCard>

            <GlassCard className="space-y-4">
              <div className="flex items-center gap-3">
                <Smartphone className="h-5 w-5 text-secondary" />
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-text">2. Какая экосистема должна поддерживать опыт</p>
              </div>
              <div className="grid gap-3 md:grid-cols-3">
                {ecosystemOptions.map((option) => (
                  <OptionCard
                    key={option.id}
                    icon={Smartphone}
                    title={option.label}
                    description={option.description}
                    isActive={experience.ecosystem === option.id}
                    onClick={() => setEcosystem(option.id)}
                  />
                ))}
              </div>
            </GlassCard>

            <GlassCard className="space-y-4">
              <div className="flex items-center gap-3">
                <CircleGauge className="h-5 w-5 text-secondary" />
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-text">3. Как украшение должно ощущаться на руке</p>
              </div>
              <div className="grid gap-3 md:grid-cols-3">
                {fitPreferenceOptions.map((option) => (
                  <OptionCard
                    key={option.id}
                    icon={CircleGauge}
                    title={option.label}
                    description={option.description}
                    isActive={experience.fitPreference === option.id}
                    onClick={() => setFitPreference(option.id)}
                  />
                ))}
              </div>
            </GlassCard>
          </div>

          <GlassCard className="h-fit space-y-5 xl:sticky xl:top-24">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-secondary">Advisor Output</p>
              <h3 className="mt-3 font-display text-2xl tracking-[-0.04em] text-text">
                {recommendation.profileLabel}
              </h3>
              <p className="mt-3 text-sm leading-7 text-text-soft">
                Ниже рекомендация, которую можно сразу применить к конфигуратору и передать в early access flow.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
              <div className="rounded-[24px] border border-white/10 bg-white/[0.03] p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-secondary">Recommended ritual</p>
                <p className="mt-2 font-display text-2xl capitalize text-text">{recommendation.ritual}</p>
                <p className="mt-2 text-sm leading-6 text-text-soft">Интенсивность по умолчанию: {recommendation.intensity}%</p>
              </div>
              <div className="rounded-[24px] border border-white/10 bg-white/[0.03] p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-secondary">Fit guidance</p>
                <p className="mt-2 text-sm leading-6 text-text-soft">{recommendation.fitNote}</p>
              </div>
              <div className="rounded-[24px] border border-white/10 bg-white/[0.03] p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-secondary">Companion logic</p>
                <p className="mt-2 text-sm leading-6 text-text-soft">{recommendation.ecosystemNote}</p>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <button type="button" onClick={applyRecommendation} className="primary-button px-6 py-3.5">
                <Sparkles className="mr-2 h-4 w-4" />
                Применить к ритуалу AURA
              </button>
              <a href="#cta" className="ghost-button px-6 py-3.5">
                Перейти в early access
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
              <p className="text-sm leading-6 text-text-soft">
                {applyState === 'applied'
                  ? 'Рекомендация уже перенесена в конфигуратор и форму заявки.'
                  : 'После применения ритуал и интенсивность автоматически попадут в configurator и waitlist form.'}
              </p>
            </div>
          </GlassCard>
        </div>
      </div>
    </section>
  )
}
