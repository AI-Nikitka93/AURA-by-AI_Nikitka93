import {
  ArrowRight,
  BrainCircuit,
  Gem,
  Orbit,
  ScanHeart,
  ShieldCheck,
  Sparkles,
  Waves,
} from 'lucide-react'

export const navigationItems = [
  { label: 'Ритуал', href: '#ritual' },
  { label: 'Преимущества', href: '#benefits' },
  { label: 'Кейс', href: '#case-study' },
  { label: 'Создатель', href: '#founder' },
  { label: 'FAQ', href: '#faq' },
]

export const heroContent = {
  eyebrow: 'Premium smart jewelry',
  portfolioBadge: 'Conceptual portfolio project',
  title: 'Украшение, которое чувствует ваш ритм',
  subtitle:
    'AURA превращает биоритмы и ауру владельца в свет, паттерн и форму, чтобы вы носили не аксессуар, а личный цифровой ритуал.',
  disclaimer:
    'AURA — portfolio concept от AI_Nikitka93: brand direction, UX-copy, visual system и frontend implementation. Продуктовые сценарии и офферы на странице демонстрационные и не являются реальной витриной магазина.',
  primaryCta: { label: 'Смотреть кейс', href: '#case-study' },
  secondaryCta: { label: 'Открыть GitHub', href: 'https://github.com/AI-Nikitka93/AURA-by-AI_Nikitka93' },
  image:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuAL__xMF1axazoX_ocMzY2glDMsMH2rbrn-MpI6nFE6Wn_fxk4QUXc_ywM3qG3jXNDmBL-vJ3LUm75aIpa-lhdoDWWHrbPZmEz6U2JUqXmuu_q8OHHmJDoccQ7-9qUJSDt0TBSMcudpvf-w5jprkgMW9IWpDD6Sv4LUIYkR7ho_fFheQF993qWHNWwpiPW3rOSV58gOVLh3kRkVR6BRjCLReLXUBwpxIwywa03qKaMlFRB3mIQVkTCpe_ZvedzQzR2FBClWPqeY4PM',
  imageAlt: 'AURA premium smart jewelry hero render',
  signalLabel: 'AURA signal active',
}

export const heroHighlights = [
  { label: 'AI-generated pattern', value: 'Под ваш ритм' },
  { label: 'Inner glow', value: 'Тихий свет' },
  { label: 'Signature object', value: 'Не массовый дроп' },
]

export const benefitCards = [
  {
    title: 'Носите дизайн, созданный под вас',
    body: 'Нейросеть собирает визуальный язык украшения из ваших биоритмов, настроения и характера движения. Вы получаете объект, который не повторяет витрину и не копирует чужой стиль.',
    icon: Sparkles,
    tag: 'AI aura pattern',
    className: 'md:col-span-7 md:min-h-[420px]',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuA8KzkfdmLJxd1ouv128W986GDNpq2KDlMymKOdlJf3IQ25hcvKgtn8eXwK5SgqTzwdi5yxiOCs4kr3G6Qsb9IsJLwdKd2NgkC3jkh1zMMUmxpzucNM_TPq89gaOluE9QjchadP10avjdABnol_QcMl4o3Uzxu7PgTR4laQTqnu3H4YWtbpvClFF4Hn6MQE6WbM5PaG4r3TeL-P0aQV9AIQiE_ThHmbVHm4Xjg6iMs8eYQZ7ca9ltxW2A3Qfyd65sCT6VBJTIrBr7o',
  },
  {
    title: 'Считывайтесь как статус, а не как гаджет',
    body: 'Кольца и браслеты AURA выглядят как ювелирные объекты editorial-уровня. Технология остается внутри, а снаружи вы видите чистую форму, внутреннее свечение и точную материальность.',
    icon: Gem,
    tag: 'Inner glow metal detail',
    className: 'md:col-span-5 md:min-h-[420px]',
  },
  {
    title: 'Превратите биоритмы в ежедневный ритуал',
    body: 'Украшение меняет характер свечения и графики под ваши персональные сигналы. Технология работает тихо, а вы чувствуете связь с предметом каждый день, не открывая лишние экраны.',
    icon: Waves,
    tag: 'Ambient glow sequence',
    className: 'md:col-span-4 md:min-h-[280px]',
  },
  {
    title: 'Выбирайте редкость вместо массовости',
    body: 'Каждое изделие создается как signature object, а не как серийный аксессуар. Это усиливает чувство обладания и делает AURA частью вашего публичного образа.',
    icon: Orbit,
    tag: 'Limited piece card',
    className: 'md:col-span-8 md:min-h-[280px]',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBjVslHVZhj10RJO0yYqhUO1k_JM_ZVYbDU9AM0ng6lb-eZkCzQSrmfD3ILxlDq0QMiMCg-K30yhd675gIhlYVdMLIJclcjjItY3rFASzCkveX7YENHzA-c_Dbdqwz9-xOzQmPouUe9IJlRkp0KI0tzeBNEbumfuDep8GjG84UPi-_rUhbk_xLwm8iKDWyGes8iCljL07ielPUrhZOm4_iUSJPoH5H8n1mCVTZPm2b8E8zSKpqJHU_7OWBpq491alOG5WoPjP3JTqo',
  },
]

export const founderContent = {
  label: 'The Visionary',
  name: 'AI_Nikitka93',
  title: 'Подпись Nikitka, точность ИИ',
  description: [
    'AURA by AI_Nikitka93 звучит как имя мастера новой эпохи. Nikitka соединяет ювелирную дисциплину, генеративный дизайн и чувствительность к ритуалам, чтобы технология не спорила с красотой, а подчеркивала ее.',
    'Каждое изделие начинается не с шаблона, а с авторского отбора формы, света и настроения. Поэтому AURA ощущается не как массовый tech-продукт, а как подпись визионера, который работает материалом, кодом и интуицией сразу.',
  ],
  quote: 'Мы не создаем аксессуары. Мы материализуем сознание в объектах высокой эстетики.',
  action: 'Перейти к кейсу проекта',
  image:
    'https://lh3.googleusercontent.com/aida/ADBb0ujCxxyMULsOlVZlWxn-qHNBlBcWLGrISFGhFAeKpAedKh6bzbUD6A9e8McP5TRU9gCpemCNscVBHWhP0H8jEPf9ARRmoPWtx0c1Dd1P8f1ieeDLvIUJ-C-SImg82w0yoyxOpGJHClDNfLWDGeHf7U4KIxVcQUqhxXY-P-tMo5dIJgMyfdYl16RgA8cTbJ6gSkx6Fg8LVBmBydvrex6eG-YGkfjqBTM07OrSY5dqmoyxllZx-9Vdhe55h75SuuoBITaR3mDVr2bv',
  imageAlt: 'Portrait of AI_Nikitka93',
}

export const validationCards = [
  {
    title: 'Proof after validation',
    body: 'Публикуем реальные цифры, отзывы и press mentions только после подтвержденных продаж, публикаций и партнерств.',
    icon: ShieldCheck,
  },
  {
    title: 'A/B hypothesis A',
    body: 'Проверить hero и social module с акцентом на редкость, статус и editorial-эстетику.',
    icon: Gem,
  },
  {
    title: 'A/B hypothesis B',
    body: 'Проверить hero и social module с акцентом на AI-персонализацию, биоритмы и signature pattern.',
    icon: BrainCircuit,
  },
]

export const faqItems = [
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
      'Нет. Технология спрятана в конструкции, а визуальный язык остается чистым, премиальным и ювелирным.',
  },
  {
    question: 'Что с приватностью моих данных?',
    answer:
      'На лендинге заявлены только безопасные формулировки. Конкретные promises о хранении и передаче данных стоит публиковать только после юридически утвержденной privacy policy.',
  },
]

export const ctaContent = {
  title: 'Смотрите проект, а не только концепт',
  subtitle:
    'AURA показывает, как можно упаковать brand direction, editorial UX-copy, liquid-glass UI и frontend implementation в единый portfolio case.',
  button: 'Вернуться к началу кейса',
  secondaryButton: 'Открыть GitHub репозиторий',
  secondaryHref: 'https://github.com/AI-Nikitka93/AURA-by-AI_Nikitka93',
  meta: 'Portfolio case by Nikitka93',
}

export const disclaimerContent = {
  validationTitle: 'Concept-only portfolio block',
  validationText:
    'Эта секция показывает, как мог бы выглядеть validation/social proof модуль. Метрики, отзывы и коммерческие сигналы не относятся к реальному запуску и используются только как часть portfolio concept.',
  footer:
    'Это conceptual portfolio page. Проект демонстрирует brand thinking, product storytelling и frontend craft. Продукт, офферы, отзывы и сценарии на странице не являются реальным storefront.',
}

export const caseStudyContent = {
  eyebrow: 'Case Study',
  title: 'Что именно показывает этот проект',
  description:
    'AURA — не просто визуальный концепт, а собранный portfolio case, где бренд-стратегия, UX-тексты, интерфейсная система и frontend deployment сведены в один демонстрационный продукт.',
  cards: [
    {
      title: 'Brand Direction',
      body: 'Позиционирование, tone of voice, dark-mode палитра и Liquid Glass токены собраны в цельную систему, чтобы концепт выглядел как премиальный fashion-tech бренд.',
    },
    {
      title: 'UX Copy System',
      body: 'Hero, benefits, founder narrative, CTA и FAQ написаны как editorial-конверсионный слой без фейковых коммерческих обещаний и неподтвержденных claims.',
    },
    {
      title: 'Frontend Build',
      body: 'Лендинг разложен на React-компоненты, собран на Vite + Tailwind и опубликован как рабочий статический сайт через GitHub Pages и Cloudflare fallback.',
    },
    {
      title: 'Portfolio Framing',
      body: 'Проект честно подан как concept case: он демонстрирует процесс, вкус, упаковку и инженерную реализацию, а не притворяется реальным live-commerce бизнесом.',
    },
  ],
  links: [
    { label: 'Live Site', href: 'https://ai-nikitka93.github.io/AURA-by-AI_Nikitka93/' },
    { label: 'GitHub Repo', href: 'https://github.com/AI-Nikitka93/AURA-by-AI_Nikitka93' },
  ],
}

export const footerLinks = [
  { label: 'Манифест', href: '#ritual' },
  { label: 'Преимущества', href: '#benefits' },
  { label: 'FAQ', href: '#faq' },
]

export const footerMeta = {
  brand: 'AURA by AI_Nikitka93',
  copy: 'Создано Nikita (AI_Nikitka93)',
  note: 'Premium smart jewelry concept with liquid glass dark mode.',
  actionIcon: ArrowRight,
}
