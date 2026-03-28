function getOptionLabel(options, id) {
  return options.find((option) => option.id === id)?.label || id
}

const toneMap = {
  ru: {
    glow: {
      stance: 'редакционный световой жест с мягким премиальным свечением',
      energy: 'визуальный акцент, который считывается как статус, а не как демонстрация технологии',
    },
    calm: {
      stance: 'тихий повседневный ритуал с низким уровнем визуального шума',
      energy: 'собранное присутствие, которое помогает держать фокус и спокойствие',
    },
    pulse: {
      stance: 'живой динамический ритм с более заметной энергетикой',
      energy: 'движение и отклик, которые подходят под быстрый график и яркие события',
    },
  },
  en: {
    glow: {
      stance: 'an editorial light gesture with a soft premium glow',
      energy: 'a visible accent that reads as status rather than exposed tech',
    },
    calm: {
      stance: 'a quiet everyday ritual with minimal visual noise',
      energy: 'a composed presence that supports focus and calm',
    },
    pulse: {
      stance: 'a living dynamic rhythm with stronger energy',
      energy: 'movement and response that fit fast schedules and vivid events',
    },
  },
}

export function buildAuraInsight({
  advisorCopy,
  experience,
  language,
  recommendation,
  ritualCopy,
}) {
  const locale = language === 'en' ? 'en' : 'ru'
  const ritualId = recommendation.ritual
  const ritualLabel =
    ritualCopy.rituals.find((ritual) => ritual.id === ritualId)?.name || ritualId
  const wearLabel = getOptionLabel(advisorCopy.wearMomentOptions, experience.wearMoment)
  const ecosystemLabel = getOptionLabel(advisorCopy.ecosystemOptions, experience.ecosystem)
  const fitLabel = getOptionLabel(advisorCopy.fitPreferenceOptions, experience.fitPreference)
  const tone = toneMap[locale][ritualId]

  if (locale === 'ru') {
    const title = `${recommendation.profileLabel} / ${ritualLabel} ${recommendation.intensity}%`
    const summary =
      `Для профиля "${recommendation.profileLabel}" AURA лучше раскрывать через ${tone.stance}. ` +
      `Сценарий "${wearLabel}" подсказывает, что украшение должно поддерживать ${tone.energy}.`
    const direction =
      `Локальный AI-brief без API: держим ${fitLabel.toLowerCase()} как основную посадку, ` +
      `${ecosystemLabel.toLowerCase()} как базовую экосистему и строим companion-опыт вокруг рекомендации "${recommendation.ecosystemNote}".`

    return {
      title,
      summary,
      direction,
      highlights: [wearLabel, ecosystemLabel, fitLabel],
      plainText: [
        `AURA signal brief`,
        `Профиль: ${recommendation.profileLabel}`,
        `Ритуал: ${ritualLabel} (${recommendation.intensity}%)`,
        `Контекст: ${wearLabel}`,
        `Экосистема: ${ecosystemLabel}`,
        `Посадка: ${fitLabel}`,
        `Резюме: ${summary}`,
        `Направление: ${direction}`,
        `Подсказка по посадке: ${recommendation.fitNote}`,
      ].join('\n'),
    }
  }

  const title = `${recommendation.profileLabel} / ${ritualLabel} ${recommendation.intensity}%`
  const summary =
    `For the "${recommendation.profileLabel}" profile, AURA works best as ${tone.stance}. ` +
    `The "${wearLabel}" scenario suggests the piece should sustain ${tone.energy}.`
  const direction =
    `Zero-cost local AI brief: keep ${fitLabel.toLowerCase()} as the fit anchor, ` +
    `${ecosystemLabel.toLowerCase()} as the companion baseline, and shape the app layer around "${recommendation.ecosystemNote}".`

  return {
    title,
    summary,
    direction,
    highlights: [wearLabel, ecosystemLabel, fitLabel],
    plainText: [
      `AURA signal brief`,
      `Profile: ${recommendation.profileLabel}`,
      `Ritual: ${ritualLabel} (${recommendation.intensity}%)`,
      `Context: ${wearLabel}`,
      `Ecosystem: ${ecosystemLabel}`,
      `Fit: ${fitLabel}`,
      `Summary: ${summary}`,
      `Direction: ${direction}`,
      `Fit guidance: ${recommendation.fitNote}`,
    ].join('\n'),
  }
}
