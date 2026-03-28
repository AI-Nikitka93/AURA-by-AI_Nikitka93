import {
  ArrowRight,
  BrainCircuit,
  Gem,
  Orbit,
  ShieldCheck,
  Sparkles,
  Waves,
} from 'lucide-react'

const asset = (filename) => `${import.meta.env.BASE_URL}assets/${filename}`

const sharedAssets = {
  heroImage: asset('hero-jewelry.jpg'),
  founderQuoteBackground: asset('founder-quote-bg.jpg'),
  founderImage: asset('founder-portrait.jpg'),
  featuredImage: asset('hero-shot.jpg'),
  faqBackground: asset('faq-bg.jpg'),
  ctaBackgroundImage: asset('bg-texture.png'),
  benefitImages: {
    auraPattern: asset('aura-pattern.jpg'),
    metalDetail: asset('metal-detail.jpg'),
    glowSequence: asset('glow-sequence.jpg'),
    limitedPiece: asset('limited-piece.jpg'),
  },
}

const copy = {
  ru: {},
  en: {},
}

Object.assign(copy.ru, {
  document: {
    lang: 'ru',
    title: 'AURA by AI_Nikitka93 - Портфолио-кейс',
    description:
      'AURA by AI_Nikitka93 - концептуальный портфолио-проект: бренд премиальных умных украшений, editorial UX-copy, liquid glass интерфейс и frontend implementation.',
  },
  navbar: {
    openMenu: 'Открыть меню',
    closeMenu: 'Закрыть меню',
    navigationLabel: 'Навигация',
    caseCta: 'Смотреть кейс',
    githubLabel: 'GitHub',
    languageLabel: 'Язык интерфейса',
  },
  navigationItems: [
    { label: 'Ритуал', href: '#ritual' },
    { label: 'Преимущества', href: '#benefits' },
    { label: 'Подбор', href: '#advisor' },
    { label: 'Кейс', href: '#case-study' },
    { label: 'Создатель', href: '#founder' },
    { label: 'FAQ', href: '#faq' },
  ],
  heroContent: {
    eyebrow: 'Премиальные умные украшения',
    portfolioBadge: 'Концептуальный портфолио-проект',
    title: 'Украшение, которое чувствует ваш ритм',
    subtitle:
      'AURA превращает биоритмы и ауру владельца в свет, паттерн и форму, чтобы вы носили не аксессуар, а личный цифровой ритуал.',
    disclaimer:
      'AURA - это портфолио-концепт от AI_Nikitka93: brand direction, UX-copy, visual system и frontend implementation. Продуктовые сценарии и офферы на странице демонстрационные и не являются реальной витриной магазина.',
    primaryCta: { label: 'Смотреть кейс', href: '#case-study' },
    secondaryCta: { label: 'Открыть GitHub', href: 'https://github.com/AI-Nikitka93/AURA-by-AI_Nikitka93' },
    image: sharedAssets.heroImage,
    imageAlt: 'Главное изображение украшения AURA',
    signalLabel: 'Сигнал AURA активен',
  },
  heroHighlights: [
    { label: 'AI-паттерн', value: 'Под ваш ритм' },
    { label: 'Внутреннее свечение', value: 'Тихий свет' },
    { label: 'Уникальный объект', value: 'Не массовый выпуск' },
  ],
  benefitsSection: {
    eyebrow: 'Преимущества',
    title: 'Технология, которая выглядит как редкость',
    description:
      'Исходный Stitch-макет был очищен от неподтверждённых обещаний и приведён к системе AURA: статус, ритуал и тихий интеллект.',
  },
  benefitCards: [
    {
      title: 'Носите дизайн, созданный под вас',
      body: 'Нейросеть собирает визуальный язык украшения из ваших биоритмов, настроения и характера движения. Вы получаете объект, который не повторяет витрину и не копирует чужой стиль.',
      icon: Sparkles,
      tag: 'AI-паттерн ауры',
      image: sharedAssets.benefitImages.auraPattern,
    },
    {
      title: 'Считывайтесь как статус, а не как гаджет',
      body: 'Кольца и браслеты AURA выглядят как ювелирные объекты editorial-уровня. Технология остаётся внутри, а снаружи вы видите чистую форму, внутреннее свечение и точную материальность.',
      icon: Gem,
      tag: 'Исследование материала',
      image: sharedAssets.benefitImages.metalDetail,
    },
    {
      title: 'Превратите биоритмы в ежедневный ритуал',
      body: 'Украшение меняет характер свечения и графики под ваши персональные сигналы. Технология работает тихо, а вы чувствуете связь с предметом каждый день, не открывая лишние экраны.',
      icon: Waves,
      tag: 'Сценарий света',
      image: sharedAssets.benefitImages.glowSequence,
    },
    {
      title: 'Выбирайте редкость вместо массовости',
      body: 'Каждое изделие создаётся как signature object, а не как серийный аксессуар. Это усиливает чувство обладания и делает AURA частью вашего публичного образа.',
      icon: Orbit,
      tag: 'Лимитированная серия',
      image: sharedAssets.benefitImages.limitedPiece,
    },
  ],
  founderContent: {
    label: 'Визионер',
    name: 'AI_Nikitka93',
    title: 'Подпись Nikitka, точность ИИ',
    description: [
      'AURA by AI_Nikitka93 звучит как имя мастера новой эпохи. Nikitka соединяет ювелирную дисциплину, генеративный дизайн и чувствительность к ритуалам, чтобы технология не спорила с красотой, а подчёркивала её.',
      'Каждое изделие начинается не с шаблона, а с авторского отбора формы, света и настроения. Поэтому AURA ощущается не как массовый tech-продукт, а как подпись визионера, который работает материалом, кодом и интуицией сразу.',
    ],
    quote: 'Мы не создаём аксессуары. Мы материализуем сознание в объектах высокой эстетики.',
    quoteBackground: sharedAssets.founderQuoteBackground,
    action: 'Перейти к кейсу проекта',
    image: sharedAssets.founderImage,
    imageAlt: 'Портрет AI_Nikitka93',
  },
})

Object.assign(copy.ru, {
  validationSection: {
    eyebrow: 'Готово к валидации',
    title: 'Доверие строится на подтверждённых сигналах',
    description:
      'Неподтверждённые цифры и вымышленные отзывы удалены. Секция готова к подстановке реального proof после появления launch data.',
  },
  validationCards: [
    {
        title: 'Подтверждение после валидации',
        body: 'Публикуем реальные цифры, отзывы и упоминания в прессе только после подтверждённых продаж, публикаций и партнёрств.',
      icon: ShieldCheck,
    },
    {
      title: 'Гипотеза A/B A',
      body: 'Проверить hero и social-модуль с акцентом на редкость, статус и editorial-эстетику.',
      icon: Gem,
    },
    {
      title: 'Гипотеза A/B B',
      body: 'Проверить hero и social-модуль с акцентом на AI-персонализацию, биоритмы и signature pattern.',
      icon: BrainCircuit,
    },
  ],
  faqSection: {
    eyebrow: 'FAQ',
    title: 'Вопросы, которые снимают шум',
    description:
      'Тексты приведены к premium tone of voice и не обещают того, что ещё не подтверждено реальными данными или юридическими документами.',
  },
  faqItems: [
    {
      question: 'Это украшение или устройство?',
      answer:
        'Это ювелирный объект с технологией внутри. AURA в первую очередь выглядит как премиальное кольцо или браслет, а уже потом раскрывает интеллектуальный слой.',
    },
    {
      question: 'Что именно персонализирует нейросеть?',
      answer:
        'Нейросеть формирует характер свечения, паттерн и визуальный ритм изделия. Персонализация опирается на ваши биоритмы, настроение и выбранный эстетический вектор.',
    },
    {
      question: 'Два одинаковых дизайна возможны?',
      answer:
        'Система стремится к уникальности каждого изделия. Повторы базовой формы возможны, но финальный паттерн, свет и визуальный характер подстраиваются под владельца.',
    },
    {
      question: 'Украшение не будет выглядеть слишком технично?',
      answer:
        'Нет. Технология спрятана в конструкции, а визуальный язык остаётся чистым, премиальным и ювелирным.',
    },
    {
      question: 'Что с приватностью моих данных?',
      answer:
        'На лендинге заявлены только безопасные формулировки. Конкретные обещания о хранении и передаче данных стоит публиковать только после юридически утверждённой privacy policy.',
    },
  ],
  ctaContent: {
    title: 'Смотрите проект, а не только концепт',
    subtitle:
      'AURA показывает, как можно упаковать brand direction, editorial UX-copy, liquid-glass UI и frontend implementation в единый portfolio case.',
    button: 'Вернуться к началу кейса',
    secondaryButton: 'Открыть GitHub репозиторий',
    secondaryHref: 'https://github.com/AI-Nikitka93/AURA-by-AI_Nikitka93',
    meta: 'Портфолио-кейс от Nikitka93',
    backgroundImage: sharedAssets.ctaBackgroundImage,
    companionTitle: 'Режим приложения',
    companionText:
      'После первого визита AURA может открываться как installable app и держать ваши ritual choices доступными даже при нестабильном соединении.',
    installed: 'AURA уже установлено',
    installAction: 'Установить приложение AURA',
    installFallback: 'Установка доступна в поддерживаемых браузерах',
  },
  disclaimerContent: {
    validationTitle: 'Блок только для концепта',
    validationText:
      'Эта секция показывает, как мог бы выглядеть validation/social proof модуль. Метрики, отзывы и коммерческие сигналы не относятся к реальному запуску и используются только как часть portfolio concept.',
    footer:
      'Это conceptual portfolio page. Проект демонстрирует brand thinking, product storytelling и frontend craft. Продукт, офферы, отзывы и сценарии на странице не являются реальным storefront.',
  },
  caseStudyContent: {
    eyebrow: 'Кейс',
    title: 'Что именно показывает этот проект',
    description:
      'AURA - не просто визуальный концепт, а собранный portfolio case, где бренд-стратегия, UX-тексты, интерфейсная система и frontend deployment сведены в один демонстрационный продукт.',
    cards: [
      {
        title: 'Бренд-направление',
        body: 'Позиционирование, tone of voice, тёмная палитра и токены Liquid Glass собраны в цельную систему, чтобы концепт выглядел как премиальный fashion-tech бренд.',
      },
      {
        title: 'Система UX-текстов',
        body: 'Hero, benefits, founder narrative, CTA и FAQ написаны как editorial-конверсионный слой без фейковых коммерческих обещаний и неподтверждённых claims.',
      },
      {
        title: 'Фронтенд-сборка',
        body: 'Лендинг разложен на React-компоненты, собран на Vite + Tailwind и опубликован как рабочий сайт через GitHub Pages и Cloudflare fallback.',
      },
      {
        title: 'Подача как кейса',
        body: 'Проект честно подан как concept case: он демонстрирует процесс, вкус, упаковку и инженерную реализацию, а не притворяется реальным live-commerce бизнесом.',
      },
    ],
    links: [
      { label: 'Открыть сайт', href: 'https://ai-nikitka93.github.io/AURA-by-AI_Nikitka93/' },
      { label: 'Открыть GitHub', href: 'https://github.com/AI-Nikitka93/AURA-by-AI_Nikitka93' },
    ],
    featuredImage: sharedAssets.featuredImage,
    featuredImageAlt: 'Кольцо AURA на руке',
    featuredImageCaption: 'Украшение в реальном использовании',
  },
  footerLinks: [
    { label: 'Манифест', href: '#ritual' },
    { label: 'Преимущества', href: '#benefits' },
    { label: 'Подбор', href: '#advisor' },
    { label: 'FAQ', href: '#faq' },
  ],
  footerMeta: {
    brand: 'AURA by AI_Nikitka93',
    copy: 'Создано Nikita (AI_Nikitka93)',
      note: 'Премиальный концепт умных украшений с приватным и бережным опытом.',
    backToTop: 'Вернуться к началу',
    privacyPolicy: 'Политика приватности',
      privacyControls: 'Настройки приватности',
    actionIcon: ArrowRight,
  },
  faqBackground: sharedAssets.faqBackground,
})

Object.assign(copy.ru, {
  advisor: {
    eyebrow: 'Подбор',
    title: 'Подберите посадку, ритуал и экосистему до заявки',
    description:
      'Этот блок добавляет сайту product-grade сценарий выбора: как AURA будет носиться, с какой системой жить и какой сигнал стоит активировать по умолчанию.',
    selected: 'Выбрано',
    steps: {
      wearMoment: '1. Когда AURA будет жить активнее всего',
      ecosystem: '2. Какая экосистема должна поддерживать опыт',
      fitPreference: '3. Как украшение должно ощущаться на руке',
    },
    wearMomentOptions: [
      { id: 'daily', label: 'Daily Focus', description: 'Для регулярного ношения, рабочих встреч и спокойного присутствия.' },
      { id: 'evening', label: 'Evening Signal', description: 'Для вечерних выходов, событий и более заметного светового жеста.' },
      { id: 'travel', label: 'Travel Pulse', description: 'Для перелётов, интенсивных дней и ритма, который должен ощущаться быстрее.' },
    ],
    ecosystemOptions: [
      { id: 'ios', label: 'Сначала iPhone', description: 'Приоритет на аккуратный iOS-компаньон, напоминания и privacy-first настройки.' },
      { id: 'android', label: 'Сначала Android', description: 'Гибкий Android-сценарий, виджеты и больше кастомного управления поверхностью.' },
      { id: 'mixed', label: 'Смешанная экосистема', description: 'Нужна нейтральная совместимость между устройствами и сменой контекста.' },
    ],
    fitPreferenceOptions: [
      { id: 'comfort', label: 'Тихий комфорт', description: 'Минимум вмешательства, мягкая посадка и низкий порог заметности.' },
      { id: 'balanced', label: 'Сбалансированная посадка', description: 'Равновесие между присутствием, посадкой и ежедневным ритуалом.' },
      { id: 'statement', label: 'Акцентный объект', description: 'Украшение должно быть частью образа и считываться сильнее.' },
    ],
    wearMomentRecommendationMap: {
      daily: { ritual: 'calm', intensity: 42, fitNote: 'Лучше держать посадку ближе к комфортной: указательный или средний палец, дневной wear-loop.' },
      evening: { ritual: 'glow', intensity: 72, fitNote: 'Можно выбирать чуть более выразительную посадку: средний палец или рука, которая чаще попадает в кадр.' },
      travel: { ritual: 'pulse', intensity: 64, fitNote: 'Нужен более собранный fit и устойчивость к смене контекста: плотная, но не жёсткая посадка.' },
    },
    ecosystemMap: {
      ios: 'Лучше показывать чистый iOS-слой: напоминания, настройки приватности и мягкую нотификацию.',
      android: 'Подходит сценарий с виджетами, гибкой настройкой свечения и расширенными быстрыми действиями.',
      mixed: 'Стоит проектировать нейтральный аккаунт-слой и синхронизацию без ощущения, что приложение рассчитано только на одну систему.',
    },
    fitBiasMap: {
      comfort: { ritual: 'calm', intensityDelta: -8, profileLabel: 'Незаметное ношение' },
      balanced: { ritual: null, intensityDelta: 0, profileLabel: 'Сбалансированная подпись' },
      statement: { ritual: 'glow', intensityDelta: 10, profileLabel: 'Редакционная выразительность' },
    },
    output: {
      eyebrow: 'Результат подбора',
      description: 'Ниже рекомендация, которую можно сразу применить к конфигуратору и передать в сценарий раннего доступа.',
      ritualLabel: 'Рекомендованный ритуал',
      intensityLabel: 'Интенсивность по умолчанию',
      fitGuidance: 'Подсказка по посадке',
      companionLogic: 'Логика приложения',
      applyButton: 'Применить к ритуалу AURA',
      ctaButton: 'Перейти в ранний доступ',
      applied: 'Рекомендация уже перенесена в конфигуратор и форму заявки.',
      idle: 'После применения ритуал и интенсивность автоматически попадут в конфигуратор и форму waitlist.',
    },
  },
  ritualConfigurator: {
    eyebrow: 'Конфигуратор',
    title: 'Выберите свой ритуал',
    description: 'Каждый ритуал создаёт уникальную сигнатуру свечения под ваш стиль жизни.',
    previewLabel: 'Предпросмотр свечения',
    featuresLabel: 'Характеристики',
    intensityLabel: 'Интенсивность',
    shareButton: 'Поделиться конфигурацией',
    shareStatus: {
      copied: 'Ссылка на текущую конфигурацию готова к отправке.',
      error: 'Не получилось автоматически открыть или скопировать ссылку, но ручной fallback всё ещё доступен.',
      idle: 'Выбранный ритуал и интенсивность сохраняются и могут быть отправлены вместе с заявкой.',
    },
    rituals: [
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
        icon: Waves,
        gradient: 'from-rose-500/20 via-pink-500/10 to-transparent',
        glowColor: 'rgba(255, 107, 143, 0.6)',
        features: ['Сердечный ритм', 'Энергичный паттерн', 'Высокая активность'],
      },
    ],
  },
  emailSignup: {
    relay: {
      live: 'Онлайн-отправка активна',
      queue: 'Локальная очередь активна',
      liveDescription: 'Заявки уходят в онлайн-отправку и могут синхронизироваться без ручного экспорта.',
      queueDescription: 'Пока онлайн-отправка не подключена, запрос сохраняется на этом устройстве и будет готов к повторной отправке.',
    },
    successTitle: 'Сигнал сохранён',
    successButton: 'Отправить ещё',
    title: 'Откройте свою AURA',
    description: 'Выберите ритуал, оставьте контакт и зафиксируйте персональный сигнал.',
    nameLabel: 'Как вас представить в AURA',
    namePlaceholder: 'Как вас представить в AURA',
    emailLabel: 'Email для раннего доступа',
    emailPlaceholder: 'Ваш email - пришлём следующий шаг',
    ritualLegend: 'Выберите ритуал',
    intensitySummary: 'Интенсивность из конфигуратора будет отправлена вместе с заявкой',
    advisorSummaryPrefix: 'Профиль подбора',
    contactConsent: 'Можно связаться со мной по email, когда AURA перейдёт к следующему этапу запуска.',
    privacyConsent: 'Я прочитал privacy notice и понимаю, как AURA хранит consent, персонализацию и очередь заявок.',
    openPrivacyControls: 'Открыть настройки приватности',
    submitIdle: 'Сохранить ранний доступ',
    submitLoading: 'Отправка...',
    errors: {
      invalidEmail: 'Email выглядит неточно - проверьте, не пропущен ли символ.',
      missingRitual: 'Сначала выберите ритуал, чтобы мы сохранили ваш персональный сигнал.',
      shortName: 'Имя слишком короткое - добавьте хотя бы 2 символа.',
      missingPrivacy: 'Подтвердите privacy notice перед отправкой заявки.',
      generic: 'Отправка не завершилась. Проверьте соединение и попробуйте снова.',
    },
    feedback: {
      liveSuccess: 'Заявка отправлена онлайн. Следующий шаг придёт на указанный email.',
      queuedSuccess: 'Онлайн-отправка пока недоступна, поэтому заявка безопасно сохранена на этом устройстве. Когда relay появится, очередь сможет синхронизироваться автоматически.',
    },
    ritualOptions: [
      { id: 'glow', label: 'Glow', desc: 'Свечение' },
      { id: 'calm', label: 'Calm', desc: 'Покой' },
      { id: 'pulse', label: 'Pulse', desc: 'Ритм' },
    ],
  },
})

Object.assign(copy.ru, {
  consentBanner: {
    eyebrow: 'Настройки приватности',
    title: 'Выберите, какую память AURA может использовать',
    description: 'Необходимое хранение всегда включено. Функциональная память сохраняет ваш ритуал и очередь заявок на этом устройстве. Аналитика включается только после согласия.',
    gpcNotice: 'В браузере включён Global Privacy Control, поэтому аналитика останется отключённой.',
    necessaryOnly: 'Только необходимое',
    acceptAll: 'Принять всё',
    showCustom: 'Настроить вручную',
    hideCustom: 'Скрыть детальные настройки',
    functionalTitle: 'Функциональная память',
    functionalDescription: 'Сохраняет выбранный ритуал, интенсивность и локальную очередь заявок.',
    analyticsTitle: 'Аналитика',
    analyticsDescription: 'Подключает бережный аналитический скрипт только после согласия.',
    save: 'Сохранить настройки',
  },
  privacyCenter: {
    relay: { live: 'Онлайн-отправка активна', queue: 'Локальная очередь активна' },
    closeLabel: 'Закрыть privacy center',
    eyebrow: 'Центр приватности',
    title: 'Управляйте памятью, согласием и локальными данными',
    description: 'Здесь собраны все пользовательские сигналы AURA: что мы помним, что отслеживаем и что можно экспортировать или удалить.',
    pendingRequests: 'Ожидающих заявок',
    gpcEnabled: 'GPC включён',
    consentSwitches: 'Переключатели consent',
    functionalTitle: 'Функциональная память',
    functionalDescription: 'Сохраняет ритуал и персональный state между визитами.',
    analyticsTitle: 'Аналитика',
    analyticsDescription: 'Подключает privacy-friendly analytics только после явного согласия.',
    snapshotTitle: 'Снимок локального состояния',
    currentRitual: 'Текущий ритуал',
    notSelected: 'Пока не выбран',
    intensity: 'Интенсивность',
    wearMoment: 'Сценарий ношения',
    companionProfile: 'Профиль приложения',
    exportTitle: 'Экспорт и очистка',
    exportButton: 'Экспортировать JSON',
    clearPersonalization: 'Очистить память персонализации',
    clearQueue: 'Удалить локальную очередь',
    notesTitle: 'Прозрачность',
    notes: [
      'Необходимое хранение используется для сохранения consent state и локальной очереди заявок, если live relay недоступен.',
      'Если relay включён, pending queue синхронизируется автоматически при следующем успешном соединении.',
      'Аналитика остаётся выключенной, если браузер отправляет Global Privacy Control signal.',
    ],
  },
})

Object.assign(copy.en, {
  document: {
    lang: 'en',
    title: 'AURA by AI_Nikitka93 - Portfolio Concept Case',
    description:
      'AURA by AI_Nikitka93 is a conceptual portfolio project with premium smart jewelry brand direction, editorial UX copy, a liquid glass interface, and frontend implementation.',
  },
  navbar: {
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    navigationLabel: 'Navigation',
    caseCta: 'View case study',
    githubLabel: 'GitHub',
    languageLabel: 'Interface language',
  },
  navigationItems: [
    { label: 'Ritual', href: '#ritual' },
    { label: 'Benefits', href: '#benefits' },
    { label: 'Advisor', href: '#advisor' },
    { label: 'Case Study', href: '#case-study' },
    { label: 'Creator', href: '#founder' },
    { label: 'FAQ', href: '#faq' },
  ],
  heroContent: {
    eyebrow: 'Premium smart jewelry',
    portfolioBadge: 'Conceptual portfolio project',
    title: 'Jewelry that feels your rhythm',
    subtitle:
      'AURA turns biometrics and personal aura into light, pattern, and form, so you wear a personal digital ritual instead of a generic accessory.',
    disclaimer:
      'AURA is a portfolio concept by AI_Nikitka93: brand direction, UX copy, visual system, and frontend implementation. The product flows and offers on this page are demonstrational and are not a live storefront.',
    primaryCta: { label: 'View case study', href: '#case-study' },
    secondaryCta: { label: 'Open GitHub', href: 'https://github.com/AI-Nikitka93/AURA-by-AI_Nikitka93' },
    image: sharedAssets.heroImage,
    imageAlt: 'AURA premium smart jewelry hero shot',
    signalLabel: 'AURA signal active',
  },
  heroHighlights: [
    { label: 'AI-generated pattern', value: 'Tuned to your rhythm' },
    { label: 'Inner glow', value: 'Quiet light' },
    { label: 'Signature object', value: 'Not a mass drop' },
  ],
  benefitsSection: {
    eyebrow: 'Benefits',
    title: 'Technology that looks rare',
    description:
      'The original Stitch layout was cleaned of unsupported claims and rebuilt into the AURA system: status, ritual, and discreet intelligence.',
  },
  benefitCards: [
    {
      title: 'Wear a design built around you',
      body: 'A neural design layer assembles the visual language of the piece from your biometrics, mood, and movement style. You get an object that does not copy the shelf or someone else’s look.',
      icon: Sparkles,
      tag: 'AI aura pattern',
      image: sharedAssets.benefitImages.auraPattern,
    },
    {
      title: 'Read as status, not as a gadget',
      body: 'AURA rings and bracelets feel like editorial-level jewelry objects. The technology stays inside, while the outside remains pure form, inner glow, and precise materiality.',
      icon: Gem,
      tag: 'Material surface study',
      image: sharedAssets.benefitImages.metalDetail,
    },
    {
      title: 'Turn biometrics into a daily ritual',
      body: 'The piece changes its glow and graphic rhythm around your personal signals. The technology works quietly, so the object feels present every day without demanding more screens.',
      icon: Waves,
      tag: 'Ambient glow sequence',
      image: sharedAssets.benefitImages.glowSequence,
    },
    {
      title: 'Choose rarity over mass production',
      body: 'Each piece is framed as a signature object rather than a serial accessory. That strengthens the sense of ownership and makes AURA part of your public image.',
      icon: Orbit,
      tag: 'Limited piece card',
      image: sharedAssets.benefitImages.limitedPiece,
    },
  ],
  founderContent: {
    label: 'The Visionary',
    name: 'AI_Nikitka93',
    title: 'Nikitka signature, AI precision',
    description: [
      'AURA by AI_Nikitka93 sounds like the name of a maker from a new era. Nikitka blends jewelry discipline, generative design, and ritual sensitivity so technology supports beauty instead of competing with it.',
      'Each piece begins not with a template, but with an authored selection of form, light, and mood. That is why AURA feels less like a mass tech product and more like the signature of a visionary working with material, code, and intuition at once.',
    ],
    quote: 'We do not make accessories. We materialize consciousness into objects of high aesthetics.',
    quoteBackground: sharedAssets.founderQuoteBackground,
    action: 'Jump to the project case study',
    image: sharedAssets.founderImage,
    imageAlt: 'Portrait of AI_Nikitka93',
  },
  validationSection: {
    eyebrow: 'Validation-ready',
    title: 'Trust should be built on verified signals',
    description:
      'Unverified numbers and invented testimonials were removed. The section is ready for real proof once launch data appears.',
  },
  validationCards: [
    { title: 'Proof after validation', body: 'We publish real metrics, reviews, and press mentions only after confirmed sales, publications, and partnerships.', icon: ShieldCheck },
    { title: 'A/B hypothesis A', body: 'Test the hero and social module with an emphasis on rarity, status, and editorial aesthetics.', icon: Gem },
    { title: 'A/B hypothesis B', body: 'Test the hero and social module with an emphasis on AI personalization, biometrics, and signature pattern.', icon: BrainCircuit },
  ],
  faqSection: {
    eyebrow: 'FAQ',
    title: 'Questions that remove the noise',
    description:
      'The copy is aligned with a premium tone of voice and avoids promising anything that is not yet supported by real data or legal documentation.',
  },
  faqItems: [
    { question: 'Is this jewelry or a device?', answer: 'It is a jewelry object with technology inside. AURA is designed to read first as a premium ring or bracelet, and only then reveal its intelligent layer.' },
    { question: 'What exactly does the AI personalize?', answer: 'The AI shapes the glow behavior, pattern, and visual rhythm of the piece. Personalization is based on your biometrics, mood, and selected aesthetic direction.' },
    { question: 'Can two designs ever match?', answer: 'The system aims for uniqueness in every piece. Base forms may repeat, but the final pattern, light behavior, and visual character adapt to the wearer.' },
    { question: 'Will the jewelry look too technical?', answer: 'No. The technology is hidden in the construction, while the visible language remains clean, premium, and jewelry-first.' },
    { question: 'What about the privacy of my data?', answer: 'The landing page only makes safe, careful statements. Specific promises around storage and data transfer should be published only after a legally reviewed privacy policy exists.' },
  ],
  ctaContent: {
    title: 'See the product thinking, not only the concept',
    subtitle:
      'AURA shows how brand direction, editorial UX copy, liquid-glass UI, and frontend implementation can be assembled into one portfolio case.',
    button: 'Back to the start',
    secondaryButton: 'Open the GitHub repository',
    secondaryHref: 'https://github.com/AI-Nikitka93/AURA-by-AI_Nikitka93',
    meta: 'Portfolio case by Nikitka93',
    backgroundImage: sharedAssets.ctaBackgroundImage,
    companionTitle: 'Companion mode',
    companionText:
      'After the first visit, AURA can open as an installable app and keep your ritual choices available even when the connection becomes unstable.',
    installed: 'AURA is already installed',
    installAction: 'Install the AURA app',
    installFallback: 'Install support depends on the browser',
  },
  disclaimerContent: {
    validationTitle: 'Concept-only portfolio block',
    validationText:
      'This section shows how a validation or social proof module could look. The metrics, testimonials, and commercial signals do not belong to a real launch and exist only as part of the portfolio concept.',
    footer:
      'This is a conceptual portfolio page. The project demonstrates brand thinking, product storytelling, and frontend craft. The product, offers, reviews, and flows on the page are not a live storefront.',
  },
  caseStudyContent: {
    eyebrow: 'Case Study',
    title: 'What this project actually shows',
    description:
      'AURA is not only a visual concept, but a built portfolio case where brand strategy, UX writing, interface system, and frontend deployment are combined into one demonstrational product.',
    cards: [
      { title: 'Brand Direction', body: 'Positioning, tone of voice, a dark palette, and Liquid Glass tokens are assembled into one coherent system so the concept feels like a premium fashion-tech brand.' },
      { title: 'UX Copy System', body: 'The hero, benefits, founder narrative, CTA, and FAQ were written as an editorial conversion layer without fake commercial promises or unsupported claims.' },
      { title: 'Frontend Build', body: 'The landing page is split into React components, built with Vite and Tailwind, and published as a working site through GitHub Pages and a Cloudflare fallback.' },
      { title: 'Portfolio Framing', body: 'The project is honestly framed as a concept case. It demonstrates process, taste, packaging, and engineering execution rather than pretending to be a live commerce business.' },
    ],
    links: [
      { label: 'Open live site', href: 'https://ai-nikitka93.github.io/AURA-by-AI_Nikitka93/' },
      { label: 'Open GitHub', href: 'https://github.com/AI-Nikitka93/AURA-by-AI_Nikitka93' },
    ],
    featuredImage: sharedAssets.featuredImage,
    featuredImageAlt: 'AURA ring worn on hand',
    featuredImageCaption: 'Product in use',
  },
  footerLinks: [
    { label: 'Manifest', href: '#ritual' },
    { label: 'Benefits', href: '#benefits' },
    { label: 'Advisor', href: '#advisor' },
    { label: 'FAQ', href: '#faq' },
  ],
  footerMeta: {
    brand: 'AURA by AI_Nikitka93',
    copy: 'Created by Nikita (AI_Nikitka93)',
    note: 'Premium smart jewelry concept with a privacy-first companion experience.',
    backToTop: 'Back to top',
    privacyPolicy: 'Privacy Policy',
    privacyControls: 'Privacy Controls',
    actionIcon: ArrowRight,
  },
  faqBackground: sharedAssets.faqBackground,
})

Object.assign(copy.en, {
  advisor: {
    eyebrow: 'Guided Fit',
    title: 'Choose fit, ritual, and ecosystem before the signup',
    description:
      'This block adds a product-grade decision flow: how AURA will be worn, which system should support it, and which signal should be active by default.',
    selected: 'Selected',
    steps: {
      wearMoment: '1. When will AURA feel most active',
      ecosystem: '2. Which ecosystem should support the experience',
      fitPreference: '3. How should the piece feel on the hand',
    },
    wearMomentOptions: [
      { id: 'daily', label: 'Daily Focus', description: 'For regular wear, work meetings, and calm presence.' },
      { id: 'evening', label: 'Evening Signal', description: 'For evening outings, events, and a more visible luminous gesture.' },
      { id: 'travel', label: 'Travel Pulse', description: 'For flights, intense days, and a rhythm that should feel faster.' },
    ],
    ecosystemOptions: [
      { id: 'ios', label: 'iPhone first', description: 'Prioritize a refined iOS companion, reminders, and privacy-first settings.' },
      { id: 'android', label: 'Android first', description: 'Flexible Android flows, widgets, and more custom surface management.' },
      { id: 'mixed', label: 'Mixed ecosystem', description: 'Neutral compatibility across devices and changing contexts matters most.' },
    ],
    fitPreferenceOptions: [
      { id: 'comfort', label: 'Quiet comfort', description: 'Minimal intrusion, soft fit, and a low visibility threshold.' },
      { id: 'balanced', label: 'Balanced fit', description: 'Balance between presence, fit, and everyday ritual use.' },
      { id: 'statement', label: 'Statement object', description: 'The piece should be part of the image and read more strongly.' },
    ],
    wearMomentRecommendationMap: {
      daily: { ritual: 'calm', intensity: 42, fitNote: 'Keep the fit closer to comfort: index or middle finger, with a quiet daytime wear loop.' },
      evening: { ritual: 'glow', intensity: 72, fitNote: 'A slightly more expressive fit works well: middle finger or the hand that appears in frame more often.' },
      travel: { ritual: 'pulse', intensity: 64, fitNote: 'The fit should feel secure across changing contexts: firm, but never rigid.' },
    },
    ecosystemMap: {
      ios: 'A clean iOS companion layer works best: reminders, privacy controls, and soft notifications.',
      android: 'A widget-driven flow, flexible glow customization, and extended quick actions fit this path.',
      mixed: 'The account layer should stay neutral and device-agnostic so the experience never feels tied to one system.',
    },
    fitBiasMap: {
      comfort: { ritual: 'calm', intensityDelta: -8, profileLabel: 'Discreet wear' },
      balanced: { ritual: null, intensityDelta: 0, profileLabel: 'Balanced signature' },
      statement: { ritual: 'glow', intensityDelta: 10, profileLabel: 'Editorial presence' },
    },
    output: {
      eyebrow: 'Advisor Output',
      description: 'You can apply this recommendation directly to the configurator and pass it into the early access flow.',
      ritualLabel: 'Recommended ritual',
      intensityLabel: 'Default intensity',
      fitGuidance: 'Fit guidance',
      companionLogic: 'Companion logic',
      applyButton: 'Apply to the AURA ritual',
      ctaButton: 'Continue to early access',
      applied: 'The recommendation has already been applied to the configurator and signup form.',
      idle: 'After applying, the ritual and intensity are automatically transferred to the configurator and waitlist form.',
    },
  },
})

Object.assign(copy.en, {
  ritualConfigurator: {
    eyebrow: 'Configurator',
    title: 'Choose your ritual',
    description: 'Each ritual creates a distinct glow signature around your lifestyle.',
    previewLabel: 'Glow preview',
    featuresLabel: 'Features',
    intensityLabel: 'Intensity',
    shareButton: 'Share this configuration',
    shareStatus: {
      copied: 'The current configuration link is ready to share.',
      error: 'Automatic sharing or copy did not complete, but a manual fallback is still available.',
      idle: 'Your selected ritual and intensity stay saved and can travel with the signup request.',
    },
    rituals: [
      { id: 'glow', name: 'Glow', subtitle: 'Inner glow', description: 'A soft luminescent glow that reacts to your biometrics. Best for evening wear and more ceremonial moments.', icon: Sparkles, gradient: 'from-indigo-500/20 via-purple-500/10 to-transparent', glowColor: 'rgba(111, 124, 255, 0.6)', features: ['Adaptive brightness', 'Warm spectrum', 'Soft transitions'] },
      { id: 'calm', name: 'Calm', subtitle: 'Quiet energy', description: 'An emerald glow with low activity. Designed for meditation, focus, and balance through the day.', icon: Waves, gradient: 'from-emerald-500/20 via-teal-500/10 to-transparent', glowColor: 'rgba(55, 214, 181, 0.6)', features: ['Stable light', 'Cool spectrum', 'Low pulse rate'] },
      { id: 'pulse', name: 'Pulse', subtitle: 'Living rhythm', description: 'A more dynamic pulse tuned to the rhythm of your body. Built for active days and vivid events.', icon: Waves, gradient: 'from-rose-500/20 via-pink-500/10 to-transparent', glowColor: 'rgba(255, 107, 143, 0.6)', features: ['Heartbeat rhythm', 'Energetic pattern', 'Higher activity'] },
    ],
  },
  emailSignup: {
    relay: {
      live: 'Live relay active',
      queue: 'Device queue active',
      liveDescription: 'Requests are sent through the live relay and can sync without manual export.',
      queueDescription: 'Until the live relay is connected, the request is stored on this device and can be resent later.',
    },
    successTitle: 'Signal saved',
    successButton: 'Send another request',
    title: 'Open your AURA',
    description: 'Choose a ritual, leave a contact, and lock in your personal signal.',
    nameLabel: 'How should AURA address you',
    namePlaceholder: 'How should AURA address you',
    emailLabel: 'Email for early access',
    emailPlaceholder: 'Your email - we will send the next step',
    ritualLegend: 'Choose a ritual',
    intensitySummary: 'The configurator intensity will be sent with your request',
    advisorSummaryPrefix: 'Advisor profile',
    contactConsent: 'You may contact me by email when AURA moves to the next launch stage.',
    privacyConsent: 'I have read the privacy notice and understand how AURA stores consent, personalization, and the waitlist queue.',
    openPrivacyControls: 'Open privacy controls',
    submitIdle: 'Save early access',
    submitLoading: 'Sending...',
    errors: {
      invalidEmail: 'The email address looks incomplete - please check for a missing symbol.',
      missingRitual: 'Choose a ritual first so we can store your personal signal.',
      shortName: 'The name is too short - please add at least 2 characters.',
      missingPrivacy: 'Confirm the privacy notice before sending the request.',
      generic: 'The request did not finish. Please check the connection and try again.',
    },
    feedback: {
      liveSuccess: 'Your request was sent to the live relay. The next step will arrive by email.',
      queuedSuccess: 'The live relay is unavailable right now, so the request was safely saved on this device. When the relay appears, the queue can sync automatically.',
    },
    ritualOptions: [
      { id: 'glow', label: 'Glow', desc: 'Glow' },
      { id: 'calm', label: 'Calm', desc: 'Calm' },
      { id: 'pulse', label: 'Pulse', desc: 'Rhythm' },
    ],
  },
  consentBanner: {
    eyebrow: 'Privacy Controls',
    title: 'Choose what kind of memory AURA may use',
    description: 'Necessary storage is always enabled. Functional memory keeps your ritual and waitlist queue on this device. Analytics only turns on after consent.',
    gpcNotice: 'Global Privacy Control is enabled in your browser, so analytics will stay disabled.',
    necessaryOnly: 'Necessary only',
    acceptAll: 'Accept all',
    showCustom: 'Customize manually',
    hideCustom: 'Hide detailed settings',
    functionalTitle: 'Functional memory',
    functionalDescription: 'Stores the selected ritual, intensity, and local waitlist queue.',
    analyticsTitle: 'Analytics',
    analyticsDescription: 'Loads a privacy-friendly analytics script only after explicit consent.',
    save: 'Save settings',
  },
  privacyCenter: {
    relay: { live: 'Live relay active', queue: 'Device queue active' },
    closeLabel: 'Close privacy center',
    eyebrow: 'Privacy Center',
    title: 'Manage memory, consent, and local data',
    description: 'All user signals are collected here: what we remember, what we track, and what you can export or clear.',
    pendingRequests: 'Pending requests',
    gpcEnabled: 'GPC enabled',
    consentSwitches: 'Consent switches',
    functionalTitle: 'Functional memory',
    functionalDescription: 'Keeps the ritual and personal state between visits.',
    analyticsTitle: 'Analytics',
    analyticsDescription: 'Loads privacy-friendly analytics only after explicit consent.',
    snapshotTitle: 'Local state snapshot',
    currentRitual: 'Current ritual',
    notSelected: 'Not selected yet',
    intensity: 'Intensity',
    wearMoment: 'Wear moment',
    companionProfile: 'Companion profile',
    exportTitle: 'Export and cleanup',
    exportButton: 'Export local JSON',
    clearPersonalization: 'Clear personalization memory',
    clearQueue: 'Delete local waitlist queue',
    notesTitle: 'Transparency notes',
    notes: [
      'Necessary storage is used to preserve consent state and the local waitlist queue when the live relay is unavailable.',
      'If the relay is enabled, the pending queue syncs automatically on the next successful connection.',
      'Analytics remains disabled whenever the browser sends a Global Privacy Control signal.',
    ],
  },
})

export const supportedLanguages = ['ru', 'en']
export const defaultLanguage = 'ru'

export function getLocalizedHref(path, language) {
  const separator = path.includes('?') ? '&' : '?'
  return `${path}${separator}lang=${language}`
}

export function getLandingContent(language = defaultLanguage) {
  return copy[language] || copy[defaultLanguage]
}
