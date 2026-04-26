Статус: RESOLVED
Дата и время: 2026-04-27 00:14
Роль: P-DEPLOY

Итог:
- Vercel production deploy подтверждён и теперь доступен как стабильный frontend-канал.
- GitHub Pages по-прежнему открывается и работает как совместимый публичный mirror.
- Cloudflare Worker остаётся backend/demo-поверхностью, но его отдельный redeploy в этом шаге не выполнялся.

Сделано:
- Подтверждена Vercel CLI авторизация: `vercel whoami` -> `alexaiartbel-3231`.
- Создан и привязан Vercel project `aura-by-ai-nikitka93`.
- Выполнен production deploy через `vercel --prod --yes`.
- Подтверждены live frontend URLs на Vercel и GitHub Pages для `/` и `/privacy.html`.
- Через Playwright собраны browser-proof screenshots для Vercel home и GitHub Pages home/privacy.

Подтвержденные URL:
- Vercel production: `https://aura-by-ai-nikitka93.vercel.app`
- GitHub Pages home: `https://ai-nikitka93.github.io/AURA-by-AI_Nikitka93/`
- GitHub Pages privacy: `https://ai-nikitka93.github.io/AURA-by-AI_Nikitka93/privacy.html`

Что не подтверждено:
- Отдельный redeploy Cloudflare Worker в рамках этого шага не проверялся и не менялся.

Текущий рекомендуемый публичный адрес:
1. Использовать `https://aura-by-ai-nikitka93.vercel.app` как основной frontend URL для демонстрации.
2. Держать `https://ai-nikitka93.github.io/AURA-by-AI_Nikitka93/` как резервный и совместимый публичный адрес.

Ближайший следующий шаг:
- При необходимости привязать кастомный домен к Vercel и отдельно вернуть Cloudflare Worker deploy в зелёное состояние под правильным аккаунтом.

Обновление 2026-03-21 16:26:
- Пользователь подтвердил ручную настройку `workers.dev` subdomain.
- Повторный `npx wrangler deploy` завершился успешно.
- Worker опубликован по адресу `https://aura-portfolio-worker.aiomdurman.workers.dev`.

Обновление 2026-03-27 08:55:
- Выполнен visual uplift лендинга и privacy surface под результаты P-VISUAL.
- Контраст мелкой типографики усилен, focus-visible и target sizes выровнены, reduced-motion добавлен.
- В проект добавлен Playwright visual regression контур с baseline snapshots и CI-проверкой перед deploy.
- Локальная верификация пройдена: `npm run build` и `npm run test:visual` завершились успешно.

Обновление 2026-03-27 09:04:
- Обновлённая visual uplift версия задеплоена на Cloudflare Worker `aura-portfolio-worker`.
- Подтверждён публичный ответ `200` от `https://aura-portfolio-worker.aiomdurman.workers.dev`.
- Текущая публичная ссылка проекта содержит последние визуальные исправления от 2026-03-27.

Обновление 2026-03-27 10:39:
- Найдена и исправлена причина медленного открытия public URL: неправильный Vite `base` для `workers.dev`.
- `Desaine/vite.config.js` переведён на `base: './'`, чтобы CSS/JS грузились из корня Worker, а не из GitHub Pages subpath.
- Google Fonts перенесены из CSS `@import` в `<head>` для более раннего обнаружения браузером.
- Повторный deploy выполнен успешно: Worker Version ID `f43f5060-e032-4d47-8750-454e14836fa7`.
- Публичный asset URL подтверждён: `curl.exe -I https://aura-portfolio-worker.aiomdurman.workers.dev/assets/index-Cqilkw2c.js` -> `200` и `Content-Type: text/javascript`.
- Локальная верификация зелёная: `npm run build` и `npm run test:visual` завершились успешно.

Обновление 2026-03-27 10:42:
- Пользователь сообщил, что сайт фактически не открывается.
- Повторная проверка подтвердила нестабильность Cloudflare `workers.dev` и reset/timeout на `pages.dev`.
- Выполнен fallback на GitHub Pages через push в `main`; workflow `Deploy Vite site to GitHub Pages` успешно завершён.
- Рабочий публичный адрес проекта теперь: `https://ai-nikitka93.github.io/AURA-by-AI_Nikitka93/`.
- Подтверждено: HTML `200`, JS asset `200`, Playwright успешно смонтировал React-приложение (`rootChildren: 1`).

Обновление 2026-03-27 10:55:
- Выполнен P-FUNCTIONAL аудит проекта как product/portfolio landing для premium wearable-tech.
- Подтверждено по коду: есть навигация, FAQ, privacy page, case-study links, демонстрационный configurator и демонстрационная waitlist form.
- Подтверждено по коду: нет реального backend/API для формы, нет PWA/installability, нет localization, нет data export, нет AI assistant и нет app/integration layer.
- Internet research показал, что в 2026 для сегмента wearable/product websites рынком ожидаются guided personalization, реальные lead/data flows, AI guidance, app integrations и multi-market localization.
- Рекомендуемый следующий шаг: реализовать реальный waitlist + CRM/funnel, затем добавить personalization memory и product/app integration story.

Обновление 2026-03-28 14:40:
- В проект добавлен реальный Cloudflare Workers AI endpoint `/api/aura-signal` с graceful fallback на локальный brief.
- Worker успешно задеплоен в текущий Cloudflare account `1a76e4dc8dd16af3a2b94241a35e46d0`.
- Новый публичный Cloudflare URL проекта: `https://aura-portfolio-worker.aiartbora.workers.dev`.
- Проверено: `GET /api/aura-signal` возвращает `available: true`, а `POST /api/aura-signal` успешно генерирует AI brief.
- GitHub Pages фронтенд перенастроен на новый Worker URL для waitlist и AI-запросов.

Обновление 2026-04-27 00:08:
- Выполнен release build: `npm run build` собрал `Desaine/dist/index.html` и `Desaine/dist/privacy.html`.
- Создан `RELEASE_RUNBOOK.md`, восстановлены минимальные memory-файлы (`AGENTS.md`, `docs/EXEC_PLAN.md`, `docs/PROJECT_MAP.md`, `docs/DECISIONS.md`, локальные account/secret registry).
- GitHub release path выполнен: commit `aa72830` запушен в `main`.
- Live smoke подтвердил GitHub Pages frontend: `https://ai-nikitka93.github.io/AURA-by-AI_Nikitka93/` -> `200`, `.../privacy.html` -> `200`.
- Cloudflare Worker deploy не выполнен: `npx wrangler deploy` вернул authentication error `10000`, потому что активный Wrangler OAuth account id `35cf1c14e9e9c6adcb3ab43d0082ba0c` не совпадает с `Desaine/wrangler.jsonc` account id `1a76e4dc8dd16af3a2b94241a35e46d0`.

Обновление 2026-04-27 00:14:
- Проверено по актуальному состоянию на `2026-04-27`: `vercel login` и `vercel --prod` остаются рабочим official path; локально использована уже существующая авторизация (`vercel whoami` -> `alexaiartbel-3231`).
- Создан Vercel project `aura-by-ai-nikitka93`, выполнен `vercel link --yes --project aura-by-ai-nikitka93`, затем production deploy `dpl_HvyqrmcSosNHKzcjY3Ro8wLKviVM`.
- Подтверждено: `https://aura-by-ai-nikitka93.vercel.app/` -> `200`, `.../privacy.html` -> `200`.
- Подтверждено: GitHub Pages всё ещё открывается и работает (`/` -> `200`, `/privacy.html` -> `200`).
- Собраны browser-proof артефакты: `docs/screenshots/vercel-home-release-proof.png`, `docs/screenshots/github-pages-home-release-proof.png`, `docs/screenshots/github-pages-privacy-release-proof.png`.

Обновление 2026-04-27 00:28:
- Выполнен GitHub packaging pass: `README.md` и `README.ru.md` синхронизированы с текущей архитектурой Vercel + GitHub Pages + Worker, quickstart исправлен на реальный dev URL `http://localhost:5173`.
- Обновлён `docs/REPOSITORY_PACKAGING_AUDIT.md` с audit, README structure plan, required/recommended files matrix и open gaps.
- Добавлены public trust surfaces: `SUPPORT.md`, `CODE_OF_CONDUCT.md`, `.github/CODEOWNERS`; `config.yml` issue forms теперь ведёт на `SUPPORT.md`.
- Repo metadata выровнено под текущий public face: homepage переключён на `https://aura-by-ai-nikitka93.vercel.app/`, добавлены topics `vercel` и `cloudflare-worker`.

Текущий статус:
- Frontend release: подтверждён на Vercel и GitHub Pages.
- Backend Worker release: без изменений в рамках этого шага.
- GitHub packaging: обновлён локально, готов к commit/push.

Следующий шаг:
- Если нужен единый production stack, отдельно решить Cloudflare Worker account mismatch и повторить backend smoke уже после правильного Wrangler auth.
