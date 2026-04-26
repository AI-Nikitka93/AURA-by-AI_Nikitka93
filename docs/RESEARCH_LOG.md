## [ТЕМА: Stitch UI integration stack for AURA]
_Последнее обновление: 2026-03-21 | Инженерный ИИ-ассистент для автономного выполнения задач в Windows 11._
Статус: Актуально

- Запрос: проверить актуальные версии и подход для локальной интеграции Stitch-кода в React/Vite/Tailwind проект на Windows.
- Источники:
  - https://vite.dev/guide/ | проверено 2026-03-21 | Vite 8.0.1, Node.js requirement 20.19+ / 22.12+
  - https://tailwindcss.com/docs/installation/using-vite | проверено 2026-03-21 | Tailwind v4 рекомендует `@tailwindcss/vite`
  - npm registry | проверено 2026-03-21 | `vite@8.0.1`, `react@19.2.4`, `react-dom@19.2.4`, `@vitejs/plugin-react@6.0.1`, `tailwindcss@4.2.2`, `@tailwindcss/forms@0.5.11`, `@tailwindcss/container-queries@0.1.1`
  - npm registry | проверено 2026-03-21 | `tailwindcss@3.4.19` — актуальная стабильная версия в ветке v3
- Ключевая находка: для переноса Stitch HTML с inline `tailwind.config` и plugin-конфигом удобнее использовать `tailwindcss@3.4.19` + `postcss` + `autoprefixer`, потому что это сохраняет явный `tailwind.config.js` и совместимо с текущими utility-классами без миграции на v4 theme variables.
- Вердикт актуальности: данные свежие на 2026-03-21; для текущей интеграции повторный поиск не нужен.
- Рекомендация для следующего шага: bootstrap локальный Vite-проект, перенести токены в `tailwind.config.js`, затем подтвердить интеграцию терминальными командами `npm install`, `npm run build`, `npm run dev`.

## [ТЕМА: Cloudflare Pages deploy for AURA]
_Последнее обновление: 2026-03-21 | Инженерный ИИ-ассистент для автономного выполнения задач в Windows 11._
Статус: Актуально

- Запрос: проверить актуальные команды Wrangler для login и Pages deploy на дату деплоя.
- Источники:
  - https://developers.cloudflare.com/workers/wrangler/commands/ | проверено 2026-03-21 | `npx wrangler <command>` — рекомендуемый способ запуска локального Wrangler
  - https://developers.cloudflare.com/workers/wrangler/commands/pages/ | проверено 2026-03-21 | `npx wrangler pages deploy [DIRECTORY] --project-name <name>` — актуальная команда деплоя Pages
  - https://developers.cloudflare.com/pages/framework-guides/deploy-anything/ | проверено 2026-03-21 | после deploy выдается subdomain на `*.pages.dev`
- Ключевая находка: для текущего проекта достаточно локального `wrangler`, активной OAuth-сессии и деплоя содержимого `dist/`; если Pages project отсутствует, нужен `wrangler pages project create` как fallback.
- Вердикт актуальности: команды актуальны на 2026-03-21 и совместимы с установленным в среде `wrangler 4.73.0`.
- Рекомендация для следующего шага: установить `wrangler` в `devDependencies`, затем выполнить `npx wrangler whoami` и `npx wrangler pages deploy dist --project-name=aura-aura`.

## [ТЕМА: Cloudflare Workers static assets fallback]
_Последнее обновление: 2026-03-21 | Инженерный ИИ-ассистент для автономного выполнения задач в Windows 11._
Статус: Актуально

- Запрос: найти бесплатный fallback-путь публикации в том же Cloudflare аккаунте, если `pages.dev` домен недоступен.
- Источники:
  - https://developers.cloudflare.com/workers/static-assets/ | проверено 2026-03-21 | статические файлы можно деплоить как Worker assets
  - https://developers.cloudflare.com/workers/wrangler/configuration/ | проверено 2026-03-21 | `main` опционален для assets-only Worker, `workers_dev` может использоваться как публичный домен
  - `npx wrangler deploy --help` | проверено 2026-03-21 | поддерживает `--assets` и обычный deploy через Worker
- Ключевая находка: можно попробовать assets-only Worker deployment c `workers.dev`, не требующий карты и отдельной авторизации, используя тот же `wrangler` аккаунт.
- Вердикт актуальности: fallback реалистичен и совместим с текущим стеком проекта.
- Рекомендация для следующего шага: создать `wrangler.jsonc` для assets-only Worker поверх `dist/` и проверить доступность `workers.dev` URL после deploy.

## [ТЕМА: Functional standards 2026 for AURA product landing]
_Последнее обновление: 2026-03-27 | Функциональный аудитор P-FUNCTIONAL._
Статус: Актуально

- Запрос: определить функциональные стандарты 2026 для product/portfolio landing в сегменте premium wearable-tech и сравнить текущий AURA с рынком.
- Источники:
  - https://web.dev/learn/pwa/installation/ | проверено 2026-03-27 | installability в современных web experiences опирается на manifest и install criteria
  - https://developers.google.com/search/docs/appearance/structured-data/product | проверено 2026-03-27 | для продуктовых страниц Google рекомендует `Product` structured data и richer commerce markup
  - https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/individual-rights/right-to-data-portability/ | проверено 2026-03-27 | у пользователей есть ожидание и право на машиночитаемый экспорт персональных данных
  - https://help.shopify.com/en/manual/international/localization-and-translation | проверено 2026-03-27 | локализация и translation flows остаются базовым ожиданием для глобальных storefronts
  - https://www.shopify.com/plus/solutions/international-ecommerce | проверено 2026-03-27 | market-specific content, localized URLs и tailored experiences — текущий стандарт growth-oriented commerce sites
  - https://apps.shopify.com/pickzen | проверено 2026-03-27 | product quizzes и guided recommendation funnels стали массовым механизмом lead capture и product discovery
  - https://support.ouraring.com/hc/lv/articles/42985877449619-Export-Share-Your-Oura-Data | проверено 2026-03-27 | Oura уже даёт data export / share flow
  - https://support.ouraring.com/hc/en-us/articles/360025438734-How-to-Use-Apple-Health-with-Oura | проверено 2026-03-27 | Oura поддерживает platform integrations
  - https://support.ouraring.com/hc/cs/articles/39512345699219-Oura-Advisor | проверено 2026-03-27 | Oura внедрила AI advisor поверх health data
  - https://ringconn.com/pages/app-features | проверено 2026-03-27 | RingConn продвигает AI companion, sleep analytics и in-app guidance
  - https://ringconn.com/blogs/newsroom/ringconn-app-update | проверено 2026-03-27 | RingConn app уже включает AI Health Partner, smart summaries и language expansion
  - https://www.whoop.com/us/en/how-it-works | проверено 2026-03-27 | WHOOP строит ценность вокруг continuous monitoring + personalized coaching
- Ключевая находка: в 2026 для wearable/product sites рынок ожидает уже не только красивый лендинг, а связку из реального lead/data flow, guided personalization, app/integration story, AI guidance и локализации.
- Вердикт актуальности: данные свежие и достаточные для функционального аудита AURA без повторного поиска в ближайшие дни.
- Рекомендация для следующего шага: первым делом превратить демонстрационный lead form и configurator в настоящий waitlist/personalization funnel, затем добавить integration layer и локализацию.
