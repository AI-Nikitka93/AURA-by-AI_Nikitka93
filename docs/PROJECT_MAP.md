# Project Map

## Product
AURA is a portfolio concept landing for premium smart jewelry with a demo-only waitlist and AI brief generator.

## Runtime Surfaces
- GitHub Pages serves the built Vite app from `Desaine/dist`.
- Cloudflare Worker serves `/api/waitlist` and `/api/aura-signal`, and can also host static assets as fallback.

## Important Modules
- `Desaine/src/context/ExperienceContext.jsx`: client state, consent, waitlist queue
- `Desaine/src/data/landingContent.js`: localized product copy
- `Desaine/worker/index.js`: backend endpoints and Cloudflare AI integration
- `Desaine/tests/`: Node and Playwright verification

## Current Risks
- Cloudflare auth account may not match the configured `account_id`.
- Git push may include a wide diff because the repository is already dirty.
