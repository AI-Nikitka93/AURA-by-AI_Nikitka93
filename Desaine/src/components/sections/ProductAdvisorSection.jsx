import { useEffect, useState } from 'react'
import {
  ArrowRight,
  Check,
  CircleGauge,
  Copy,
  Fingerprint,
  LoaderCircle,
  Smartphone,
  Sparkles,
} from 'lucide-react'
import { useExperience } from '../../context/ExperienceContext'
import useSiteCopy from '../../hooks/useSiteCopy'
import {
  fetchAiSignalCapabilities,
  generateAiSignalBrief,
} from '../../lib/aiSignal'
import { buildAuraInsight } from '../../lib/auraInsight'
import { buildLocalGeneratedBrief, getAuraSignalUi } from '../../lib/auraSignalI18n'
import { formatPercent } from '../../lib/i18n'
import GlassCard from '../ui/GlassCard'
import SectionHeading from '../ui/SectionHeading'

function getAdvisorRecommendation(experience, advisorCopy) {
  const wearMomentRecommendation = advisorCopy.wearMomentRecommendationMap[experience.wearMoment]
  const fitBias = advisorCopy.fitBiasMap[experience.fitPreference]
  const ritual = fitBias.ritual || wearMomentRecommendation.ritual
  const intensity = Math.max(20, Math.min(90, wearMomentRecommendation.intensity + fitBias.intensityDelta))

  return {
    ritual,
    intensity,
    fitNote: wearMomentRecommendation.fitNote,
    ecosystemNote: advisorCopy.ecosystemMap[experience.ecosystem],
    profileLabel: fitBias.profileLabel,
  }
}

function sanitizeAiBrief(text) {
  return String(text || '')
    .replace(/\*\*/g, '')
    .replace(/^#{1,6}\s*/gm, '')
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
}

function OptionCard({ icon: Icon, title, description, isActive, onClick, selectedLabel }) {
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
          {selectedLabel}
        </span>
      )}
    </button>
  )
}

export default function ProductAdvisorSection() {
  const { copy, language } = useSiteCopy()
  const { advisor, ritualConfigurator } = copy
  const {
    experience,
    setRitual,
    setIntensity,
    setWearMoment,
    setEcosystem,
    setFitPreference,
  } = useExperience()
  const [applyState, setApplyState] = useState('idle')
  const [insightCopyState, setInsightCopyState] = useState('idle')
  const [isAiLoading, setIsAiLoading] = useState(false)
  const [aiState, setAiState] = useState({
    checked: false,
    available: false,
    mode: 'local',
    label: '',
    message: '',
    model: null,
    brief: '',
    error: '',
  })

  const recommendation = getAdvisorRecommendation(experience, advisor)
  const formattedIntensity = formatPercent(recommendation.intensity, language)
  const recommendedRitualLabel =
    ritualConfigurator.rituals.find((ritual) => ritual.id === recommendation.ritual)?.name ||
    recommendation.ritual
  const insight = buildAuraInsight({
    advisorCopy: advisor,
    experience,
    language,
    recommendation,
    ritualCopy: ritualConfigurator,
  })
  const insightUi = getAuraSignalUi(language)

  useEffect(() => {
    let isMounted = true

    fetchAiSignalCapabilities().then((nextState) => {
      if (!isMounted) {
        return
      }

      setAiState((currentState) => ({
        ...currentState,
        checked: true,
        available: nextState.available,
        mode: nextState.mode || 'local',
        label: nextState.label,
        message: nextState.message,
        model: nextState.model,
      }))
    })

    return () => {
      isMounted = false
    }
  }, [])

  useEffect(() => {
    setAiState((currentState) => ({
      ...currentState,
      brief: '',
      error: '',
    }))
  }, [
    experience.wearMoment,
    experience.ecosystem,
    experience.fitPreference,
    recommendation.ritual,
    recommendation.intensity,
    language,
  ])

  const applyRecommendation = () => {
    setRitual(recommendation.ritual)
    setIntensity(recommendation.intensity)
    setApplyState('applied')
    window.setTimeout(() => setApplyState('idle'), 2200)
  }

  const copyInsight = async () => {
    const fullBrief = aiState.brief
      ? `${insight.plainText}\n\n${insightUi.cloudflareResult}\n${aiState.brief}`
      : insight.plainText

    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(fullBrief)
      } else {
        window.prompt(insightUi.prompt, fullBrief)
      }

      setInsightCopyState('copied')
      window.setTimeout(() => setInsightCopyState('idle'), 2200)
    } catch {
      window.prompt(insightUi.prompt, fullBrief)
      setInsightCopyState('copied')
      window.setTimeout(() => setInsightCopyState('idle'), 2200)
    }
  }

  const handleGenerateAi = async () => {
    setIsAiLoading(true)
    setAiState((currentState) => ({
      ...currentState,
      error: '',
    }))
    const localBrief = buildLocalGeneratedBrief({
      language,
      insight,
      recommendation,
      ritualLabel: recommendedRitualLabel,
    })

    if (aiState.mode !== 'workers-ai') {
      setAiState((currentState) => ({
        ...currentState,
        available: true,
        mode: 'local',
        brief: localBrief,
        error: '',
      }))
      setIsAiLoading(false)
      return
    }

    try {
      const response = await generateAiSignalBrief({
        language,
        profileLabel: recommendation.profileLabel,
        ritual: recommendation.ritual,
        intensity: recommendation.intensity,
        wearMoment: experience.wearMoment,
        wearLabel: advisor.wearMomentOptions.find((option) => option.id === experience.wearMoment)?.label || experience.wearMoment,
        ecosystem: experience.ecosystem,
        ecosystemLabel: advisor.ecosystemOptions.find((option) => option.id === experience.ecosystem)?.label || experience.ecosystem,
        fitPreference: experience.fitPreference,
        fitLabel: advisor.fitPreferenceOptions.find((option) => option.id === experience.fitPreference)?.label || experience.fitPreference,
        fitNote: recommendation.fitNote,
        ecosystemNote: recommendation.ecosystemNote,
        localSummary: insight.summary,
        localDirection: insight.direction,
      })

      setAiState((currentState) => ({
        ...currentState,
        available: true,
        mode: 'workers-ai',
        label: response.label || currentState.label,
        message: response.message || currentState.message,
        model: response.model || currentState.model,
        brief: sanitizeAiBrief(response.brief),
        error: '',
      }))
    } catch {
      setAiState((currentState) => ({
        ...currentState,
        available: true,
        mode: 'local',
        brief: localBrief,
        error: insightUi.cloudflareError,
      }))
    } finally {
      setIsAiLoading(false)
    }
  }

  useEffect(() => {
    const handleExternalGenerate = () => {
      const advisorSection = document.getElementById('advisor')

      if (advisorSection) {
        advisorSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }

      window.setTimeout(() => {
        handleGenerateAi()
      }, 260)
    }

    window.addEventListener('aura:generate-signal', handleExternalGenerate)

    return () => {
      window.removeEventListener('aura:generate-signal', handleExternalGenerate)
    }
  })

  return (
    <section id="advisor" className="py-8 sm:py-10 lg:py-12">
      <div className="section-shell">
        <SectionHeading
          eyebrow={advisor.eyebrow}
          title={advisor.title}
          description={advisor.description}
        />

        <div className="mt-5 grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-4">
            <GlassCard className="space-y-4">
              <div className="flex items-center gap-3">
                <Fingerprint className="h-5 w-5 text-secondary" />
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-text">{advisor.steps.wearMoment}</p>
              </div>
              <div className="grid gap-3 md:grid-cols-3">
                {advisor.wearMomentOptions.map((option) => (
                  <OptionCard
                    key={option.id}
                    icon={Fingerprint}
                    title={option.label}
                    description={option.description}
                    isActive={experience.wearMoment === option.id}
                    onClick={() => setWearMoment(option.id)}
                    selectedLabel={advisor.selected}
                  />
                ))}
              </div>
            </GlassCard>

            <GlassCard className="space-y-4">
              <div className="flex items-center gap-3">
                <Smartphone className="h-5 w-5 text-secondary" />
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-text">{advisor.steps.ecosystem}</p>
              </div>
              <div className="grid gap-3 md:grid-cols-3">
                {advisor.ecosystemOptions.map((option) => (
                  <OptionCard
                    key={option.id}
                    icon={Smartphone}
                    title={option.label}
                    description={option.description}
                    isActive={experience.ecosystem === option.id}
                    onClick={() => setEcosystem(option.id)}
                    selectedLabel={advisor.selected}
                  />
                ))}
              </div>
            </GlassCard>

            <GlassCard className="space-y-4">
              <div className="flex items-center gap-3">
                <CircleGauge className="h-5 w-5 text-secondary" />
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-text">{advisor.steps.fitPreference}</p>
              </div>
              <div className="grid gap-3 md:grid-cols-3">
                {advisor.fitPreferenceOptions.map((option) => (
                  <OptionCard
                    key={option.id}
                    icon={CircleGauge}
                    title={option.label}
                    description={option.description}
                    isActive={experience.fitPreference === option.id}
                    onClick={() => setFitPreference(option.id)}
                    selectedLabel={advisor.selected}
                  />
                ))}
              </div>
            </GlassCard>

            {aiState.brief && (
              <GlassCard className="border border-primary/15 bg-primary/[0.04]">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                      {insightUi.cloudflareResult}
                    </p>
                    <h4 className="mt-2 font-display text-2xl tracking-[-0.03em] text-text">
                      {insight.title}
                    </h4>
                  </div>
                  <button type="button" onClick={copyInsight} className="ghost-button px-4 py-2.5 text-xs uppercase tracking-[0.16em]">
                    <Copy className="mr-2 h-4 w-4" />
                    {insightUi.copyButton}
                  </button>
                </div>

                <p className="mt-4 max-w-3xl text-sm leading-7 text-text-soft">
                  {insightUi.description}
                </p>
                <p className="mt-5 whitespace-pre-line text-base leading-8 text-text-soft">
                  {aiState.brief}
                </p>
              </GlassCard>
            )}
          </div>

          <GlassCard className="h-fit space-y-5 xl:sticky xl:top-24">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-secondary">{advisor.output.eyebrow}</p>
              <h3 className="mt-3 font-display text-2xl tracking-[-0.04em] text-text">
                {recommendation.profileLabel}
              </h3>
              <p className="mt-3 text-sm leading-7 text-text-soft">
                {advisor.output.description}
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
              <div className="rounded-[24px] border border-white/10 bg-white/[0.03] p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-secondary">{advisor.output.ritualLabel}</p>
                <p className="mt-2 font-display text-2xl capitalize text-text">{recommendedRitualLabel}</p>
                <p className="mt-2 text-sm leading-6 text-text-soft">{advisor.output.intensityLabel}: {formattedIntensity}</p>
              </div>
              <div className="rounded-[24px] border border-white/10 bg-white/[0.03] p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-secondary">{advisor.output.fitGuidance}</p>
                <p className="mt-2 text-sm leading-6 text-text-soft">{recommendation.fitNote}</p>
              </div>
              <div className="rounded-[24px] border border-white/10 bg-white/[0.03] p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-secondary">{advisor.output.companionLogic}</p>
                <p className="mt-2 text-sm leading-6 text-text-soft">{recommendation.ecosystemNote}</p>
              </div>
            </div>

            <div className="rounded-[24px] border border-white/10 bg-white/[0.03] p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-secondary">{insightUi.eyebrow}</p>
              <h4 className="mt-2 font-display text-xl tracking-[-0.03em] text-text">
                {insight.title}
              </h4>
              <p className="mt-3 text-sm leading-6 text-text-soft">
                {insightUi.description}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {insight.highlights.map((highlight) => (
                  <span
                    key={highlight}
                    className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-primary"
                  >
                    {highlight}
                  </span>
                ))}
              </div>
              <div className="mt-4 rounded-[20px] border border-white/10 bg-black/20 p-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-secondary">
                      {insightUi.generatorLabel}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-text-soft">
                      {aiState.available ? insightUi.generatorReady : insightUi.generatorFallback}
                    </p>
                  </div>
                  <button
                    type="button"
                    data-aura-generate-button="true"
                    onClick={handleGenerateAi}
                    disabled={isAiLoading}
                    className={`ghost-button px-4 py-2.5 text-xs uppercase tracking-[0.16em] ${
                      isAiLoading ? 'cursor-wait opacity-80' : ''
                    }`}
                  >
                    {isAiLoading ? (
                      <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <Sparkles className="mr-2 h-4 w-4" />
                    )}
                    {isAiLoading ? insightUi.cloudflareLoading : insightUi.generatorAction}
                  </button>
                </div>
                {aiState.error && (
                  <p className="mt-3 text-sm leading-6 text-error">
                    {aiState.error}
                  </p>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <button type="button" onClick={applyRecommendation} className="primary-button px-6 py-3.5">
                <Sparkles className="mr-2 h-4 w-4" />
                {advisor.output.applyButton}
              </button>
              <a href="#cta" className="ghost-button px-6 py-3.5">
                {advisor.output.ctaButton}
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
              <p className="text-sm leading-6 text-text-soft">
                {applyState === 'applied'
                  ? advisor.output.applied
                  : advisor.output.idle}
              </p>
            </div>
          </GlassCard>
        </div>
      </div>
    </section>
  )
}
