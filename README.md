# AURA by AI_Nikitka93

**Premium Smart Jewelry — Conceptual Portfolio Project**

---

## 🎯 О Проекте

AURA — это концептуальное портфолио, демонстрирующее полный цикл создания premium fashion-tech бренда: от brand-стратегии и UX-копирайтинга до визуальной системы и frontend-реализации.

**Live Demo:** [https://ai-nikitka93.github.io/AURA-by-AI_Nikitka93/](https://ai-nikitka93.github.io/AURA-by-AI_Nikitka93/)

---

## ✨ Особенности

### Brand System
- **Позиционирование:** Premium smart jewelry для style-conscious founders и creatives
- **Tone of Voice:** Controlled, magnetic, high-intent
- **Цветовая палитра:** Dark mode с indigo акцентом (`#6F7CFF`) и emerald свечением (`#37D6B5`)

### Дизайн-Система: Liquid Glass
- **Glassmorphism:** Многослойные поверхности с blur и внутренним свечением
- **Luminous Halo:** Signature element с edge-light эффектом
- **Typography:** Syne (display) + Manrope (body) + JetBrains Mono (code)

### UX-Features
- ✅ Email signup форма с валидацией
- ✅ Конфигуратор ритуалов (glow/calm/pulse)
- ✅ Hamburger меню для мобильных
- ✅ Scroll reveal анимации
- ✅ Particle background эффекты
- ✅ Parallax секции

### Technical Stack
- **Frontend:** React 19 + Vite
- **Styling:** Tailwind CSS + Custom CSS
- **Icons:** Lucide React
- **Deploy:** GitHub Pages + Cloudflare
- **Analytics:** Plausible (privacy-friendly)

---

## 🚀 Быстрый Старт

### Установка
```bash
cd Desaine
npm install
```

### Development
```bash
npm run dev
```
Откройте [http://127.0.0.1:4173](http://127.0.0.1:4173)

### Production Build
```bash
npm run build
npm run preview
```

### Deploy на GitHub Pages
```bash
git add .
git commit -m "Build: production update"
git push
# GitHub Actions автоматически задеплоит
```

---

## 📁 Структура Проекта

```
Desaine/
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.jsx       # Навигация + hamburger menu
│   │   │   └── Footer.jsx       # Подвал с ссылками
│   │   ├── sections/
│   │   │   ├── HeroSection.jsx
│   │   │   ├── BenefitsSection.jsx
│   │   │   ├── CaseStudySection.jsx
│   │   │   ├── FounderSection.jsx
│   │   │   ├── SocialProofSection.jsx
│   │   │   ├── FaqSection.jsx
│   │   │   ├── CtaSection.jsx
│   │   │   ├── EmailSignupForm.jsx  # Email signup с валидацией
│   │   │   └── RitualConfigurator.jsx # Конфигуратор ритуалов
│   │   └── ui/
│   │       ├── GlassCard.jsx
│   │       ├── SectionHeading.jsx
│   │       ├── ParticleBackground.jsx # Анимированные частицы
│   │       └── ParallaxSection.jsx    # Parallax эффекты
│   ├── hooks/
│   │   └── useScrollReveal.js   # Hook для scroll анимаций
│   ├── data/
│   │   └── landingContent.js    # Весь контент сайта
│   ├── App.jsx
│   ├── index.css                # Глобальные стили + анимации
│   └── main.jsx
├── public/
│   └── assets/                  # Изображения
├── dist/                        # Production build
├── privacy.html                 # Privacy Policy страница
├── index.html
├── tailwind.config.js
├── vite.config.js
└── package.json
```

---

## 🎨 Компоненты

### Секции
| Компонент | Описание |
|-----------|----------|
| `HeroSection` | Главный экран с fade-in анимациями и floating элементами |
| `BenefitsSection` | 4 карточки преимуществ + конфигуратор ритуалов |
| `CaseStudySection` | Описание проекта как portfolio case |
| `FounderSection` | Блок создателя с цитатой |
| `SocialProofSection` | Validation-ready блок для будущих метрик |
| `FaqSection` | Аккордеон с вопросами и ответами |
| `CtaSection` | Финальный CTA + email signup форма |

### UI Компоненты
| Компонент | Описание |
|-----------|----------|
| `GlassCard` | Карточка с liquid glass эффектом |
| `SectionHeading` | Заголовок секции с eyebrow |
| `ParticleBackground` | Анимированные соединяющиеся частицы |
| `ParallaxSection` | Обёртка с parallax скроллом |

---

## 🎯 Функционал

### Email Signup Форма
- Валидация email (regex)
- Выбор ритуала (glow/calm/pulse)
- Опциональное имя
- States: idle → loading → success/error
- Сохранение в localStorage (опционально)

### Конфигуратор Ритуалов
- 3 типа: Glow, Calm, Pulse
- Визуальный preview с glow эффектом
- Слайдер интенсивности
- Динамическая смена характеристик

### Анимации
- **Fade In/Up:** Появление элементов
- **Glow Pulse:** Пульсирующее свечение
- **Float:** Парящие background элементы
- **Scale In:** Увеличение при появлении
- **Scroll Reveal:** Появление при скролле
- **Parallax:** Многослойный скролл

---

## 📊 SEO & Analytics

### Structured Data (JSON-LD)
- `WebSite` — информация о сайте
- `Product` — описание продукта
- `CreativeWork` — portfolio case

### Meta Tags
- Open Graph (Facebook, LinkedIn)
- Twitter Card
- Description, keywords

### Analytics
```html
<!-- Plausible Analytics -->
<script defer data-domain="your-domain.com" src="https://plausible.io/js/script.js"></script>
```

---

## 🔒 Privacy Policy

Страница `/privacy.html` содержит:
- Общая информация о сборе данных
- Какие данные собираются
- Как используются данные
- Защита и хранение
- Права пользователей (GDPR-ready)
- Cookies и аналитика

---

## 🎨 Цветовая Палитра

| Роль | Переменная | HEX |
|------|------------|-----|
| Primary | `--color-primary` | `#6F7CFF` |
| Secondary | `--color-secondary` | `#37D6B5` |
| Background | `--color-bg` | `#090B10` |
| Surface | `--color-surface` | `#111318` |
| Text | `--color-text` | `#F5F7FB` |
| Error | `--color-error` | `#FF6B8F` |

---

## 📝 To-Do / Future Enhancements

- [ ] Интеграция с реальным email-сервисом (SendGrid, Resend)
- [ ] Backend для сбора signup'ов (Supabase, Firebase)
- [ ] A/B тестирование hero секции
- [ ] Больше 3D визуалов украшений
- [ ] Мультиязычность (EN/RU)
- [ ] PWA support
- [ ] Dark/Light mode toggle
- [ ] Интеграция с CRM

---

## 📄 Лицензия

Conceptual portfolio project by AI_Nikitka93.

Демонстрационный проект — не является коммерческим продуктом.

---

## 👤 Автор

**AI_Nikitka93**

- GitHub: [@AI-Nikitka93](https://github.com/AI-Nikitka93)
- Portfolio: [ai-nikitka93.github.io](https://ai-nikitka93.github.io/)

---

## 🙏 Благодарности

- Шрифты: Google Fonts (Syne, Manrope, JetBrains Mono)
- Иконки: Lucide React
- Изображения: Unsplash, Pexels

---

**Built with ❤️ and Liquid Glass**
