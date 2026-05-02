import { formatPercent } from './i18n'

const briefUi = {
  ru: {
    eyebrow: 'AI Signal Brief',
    description:
      'Локально сгенерированное направление без платного API: помогает превратить выбор в ясный creative/product brief.',
    copyButton: 'Скопировать brief',
    copied:
      'Бриф уже готов для вставки в заметки, ТЗ или письмо клиенту.',
    idle:
      'Можно использовать этот brief как zero-cost AI слой внутри кейса и будущего продукта.',
    prompt: 'Скопируйте brief AURA',
    generatorLabel: 'Персональный генератор',
    generatorReady:
      'Сгенерируйте готовое текстовое направление для этого профиля.',
    generatorFallback:
      'Если удалённый AI не отвечает, сайт всё равно соберёт локальный персональный результат.',
    generatorAction: 'Сгенерировать',
    cloudflareLoading: 'Генерация...',
    cloudflareResult: 'Персональный результат',
    cloudflareError:
      'Удалённый AI не ответил, поэтому сайт собрал локальный персональный результат.',
  },
  en: {
    eyebrow: 'AI Signal Brief',
    description:
      'A locally generated direction with no paid API: it turns the selection into a compact creative and product brief.',
    copyButton: 'Copy brief',
    copied:
      'The brief is ready to paste into notes, a spec, or a client email.',
    idle:
      'You can use this brief as a zero-cost AI layer inside the case and future product work.',
    prompt: 'Copy the AURA brief',
    generatorLabel: 'Personal Generator',
    generatorReady: 'Generate a finished text direction for this profile.',
    generatorFallback:
      'If remote AI is unavailable, the site will still assemble a local personal result.',
    generatorAction: 'Generate',
    cloudflareLoading: 'Generating...',
    cloudflareResult: 'Generated Result',
    cloudflareError:
      'Remote AI did not answer, so the site assembled a local personal result instead.',
  },
}

export function getAuraSignalUi(language) {
  return briefUi[language === 'en' ? 'en' : 'ru']
}

export function buildLocalGeneratedBrief({
  language,
  insight,
  recommendation,
  ritualLabel,
}) {
  const localizedRitual = ritualLabel || recommendation.ritual
  const intensityLabel = formatPercent(recommendation.intensity, language)

  if (language === 'ru') {
    return [
      `Для профиля "${recommendation.profileLabel}" AURA лучше раскрывать как собранный luxury-tech ритуал с ясным характером. ${insight.summary}`,
      `Продуктовое направление: украшение должно ощущаться как личный объект, где ритуал ${localizedRitual} с интенсивностью ${intensityLabel} поддерживает выбранную посадку и не перегружает визуальный образ. ${insight.direction}`,
      `Companion-слой стоит строить вокруг сценария "${recommendation.ecosystemNote}", сохраняя быстрый и понятный путь от выбора профиля к готовому персональному результату.`,
    ].join('\n\n')
  }

  return [
    `For the "${recommendation.profileLabel}" profile, AURA should feel like a composed luxury-tech ritual with a clear character. ${insight.summary}`,
    `Product direction: the piece should read as a personal object, where the ${localizedRitual} ritual at ${intensityLabel} supports the chosen fit without overloading the visual identity. ${insight.direction}`,
    `The companion layer should stay built around "${recommendation.ecosystemNote}", keeping the path from profile choice to a finished personal result quick and obvious.`,
  ].join('\n\n')
}
