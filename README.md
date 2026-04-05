# AURA by AI_Nikitka93

Conceptual portfolio landing page for a premium smart jewelry brand, built as a privacy-first React experience.

- Live demo: https://ai-nikitka93.github.io/AURA-by-AI_Nikitka93/
- Source app: [`Desaine/`](Desaine/)
- Deploy workflow: [`.github/workflows/deploy-github-pages.yml`](.github/workflows/deploy-github-pages.yml)
- Maintainer notes: [`docs/PROJECT_HISTORY.md`](docs/PROJECT_HISTORY.md), [`docs/STATE.md`](docs/STATE.md)

## Preview

![AURA live site hero](docs/screenshots/site-hero-desktop.png)

## What It Is

AURA is a public portfolio case that combines brand direction, UX copy, a liquid-glass visual system, and a real Vite + React implementation. The repo is structured so visitors can understand the project in under a minute and run it locally in a few commands.

## Why It Matters

Use this repo if you want to inspect a polished marketing-style site with consent-driven UX, a standalone privacy page, interactive product-advisor surfaces, and a deployable frontend structure. It is a showcase, not a generic boilerplate.

## Quickstart

```bash
cd "Desaine"
npm ci
npm run dev
```

Open `http://127.0.0.1:4173`.

### Build and Preview

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

Push to `main`; the GitHub Actions workflow publishes `Desaine/dist` to GitHub Pages.

## Highlights

- Hero, benefits, case study, founder, FAQ, and CTA sections
- Email signup flow with explicit privacy consent
- Ritual configurator and product-advisor surfaces
- Standalone privacy policy page and privacy controls
- Scroll reveal, parallax, and particle background motion
- Playwright visual regression coverage for the privacy surface

## Repository Surface

| Path | Purpose |
| --- | --- |
| `Desaine/src/` | Application source, sections, hooks, and UI primitives |
| `Desaine/public/` | PWA assets, offline surface, and static files |
| `Desaine/privacy.html` | Standalone privacy policy page |
| `Desaine/worker/` | Remote advisor and fallback logic |
| `docs/` | Maintainer notes, state, and project history |
| `.github/workflows/` | GitHub Pages deployment automation |

## Docs and Support

- Implementation history: [`docs/PROJECT_HISTORY.md`](docs/PROJECT_HISTORY.md)
- Current maintainer state: [`docs/STATE.md`](docs/STATE.md)
- Packaging audit: [`docs/REPOSITORY_PACKAGING_AUDIT.md`](docs/REPOSITORY_PACKAGING_AUDIT.md)
- Contribution guide: [`CONTRIBUTING.md`](CONTRIBUTING.md)
- Security policy: [`SECURITY.md`](SECURITY.md)
- Issue forms: [`.github/ISSUE_TEMPLATE/`](.github/ISSUE_TEMPLATE/)

## License

This repository is published as a portfolio showcase. No reuse license is granted; source, copy, and design assets remain all rights reserved unless the maintainer says otherwise.
