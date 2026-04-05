# AURA by AI_Nikitka93

[English](README.md) | [Русский](README.ru.md)

Концептуальный portfolio landing page для premium smart jewelry бренда, собранный как privacy-first React experience.

- Live demo: https://ai-nikitka93.github.io/AURA-by-AI_Nikitka93/
- Исходное приложение: [`Desaine/`](Desaine/)
- Deploy workflow: [`.github/workflows/deploy-github-pages.yml`](.github/workflows/deploy-github-pages.yml)
- Заметки по проекту: [`docs/PROJECT_HISTORY.md`](docs/PROJECT_HISTORY.md), [`docs/STATE.md`](docs/STATE.md)

## Preview

![AURA live site hero](docs/screenshots/site-hero-desktop.png)

## Что Это

AURA - это публичный portfolio case, который объединяет brand direction, UX copy, liquid-glass visual system и реальную реализацию на Vite + React. Репозиторий организован так, чтобы за минуту было понятно, что это за проект и как запустить его локально.

## Почему Это Важно

Этот репозиторий подойдёт, если нужно посмотреть polished marketing-style site с consent-driven UX, отдельной privacy page, interactive product-advisor surfaces и рабочей frontend-структурой. Это showcase-проект, а не универсальный boilerplate.

## Быстрый Старт

```bash
cd "Desaine"
npm ci
npm run dev
```

Открой `http://127.0.0.1:4173`.

### Сборка И Preview

```bash
npm run build
npm run preview
```

### Visual Tests

```bash
npx playwright install chromium
npm run test:visual
```

### Deploy

Push в `main`; GitHub Actions workflow публикует `Desaine/dist` в GitHub Pages.

## Ключевые Элементы

- Hero, benefits, case study, founder, FAQ и CTA sections
- Email signup flow с явным privacy consent
- Ritual configurator и product-advisor surfaces
- Отдельная privacy policy page и privacy controls
- Scroll reveal, parallax и particle background motion
- Playwright visual regression coverage для privacy surface

## Поверхность Репозитория

| Путь | Назначение |
| --- | --- |
| `Desaine/src/` | Исходники приложения, секции, hooks и UI-примитивы |
| `Desaine/public/` | PWA assets, offline surface и статические файлы |
| `Desaine/privacy.html` | Отдельная страница privacy policy |
| `Desaine/worker/` | Remote advisor и fallback logic |
| `docs/` | Заметки мейнтейнера, state и project history |
| `.github/workflows/` | Автоматизация деплоя в GitHub Pages |

## Документация И Поддержка

- История реализации: [`docs/PROJECT_HISTORY.md`](docs/PROJECT_HISTORY.md)
- Текущее состояние проекта: [`docs/STATE.md`](docs/STATE.md)
- Packaging audit: [`docs/REPOSITORY_PACKAGING_AUDIT.md`](docs/REPOSITORY_PACKAGING_AUDIT.md)
- Contribution guide: [`CONTRIBUTING.md`](CONTRIBUTING.md)
- Security policy: [`SECURITY.md`](SECURITY.md)
- Issue forms: [`.github/ISSUE_TEMPLATE/`](.github/ISSUE_TEMPLATE/)

## Лицензия

Репозиторий опубликован как portfolio showcase под proprietary
all-rights-reserved notice. См. [LICENSE](LICENSE).
