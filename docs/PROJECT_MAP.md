# Project Map

## Product
AURA is a portfolio concept landing for premium smart jewelry with a demo-only waitlist and AI brief generator.

## Runtime Surfaces
- Vercel serves the built Vite app from `Desaine/` as the primary frontend demo URL.
- GitHub Pages serves the same built Vite app as a compatibility mirror.
- Cloudflare Worker serves `/api/waitlist` and `/api/aura-signal`, and can also host static assets as fallback.

## Important Modules
- `Desaine/src/context/ExperienceContext.jsx`: client state, consent, waitlist queue
- `Desaine/src/data/landingContent.js`: localized product copy
- `Desaine/worker/index.js`: backend endpoints and Cloudflare AI integration
- `Desaine/tests/`: Node and Playwright verification

## Current Risks
- Cloudflare auth account may not match the configured `account_id`.
- Frontend now has two public surfaces, so future copy/domain changes should be validated on both Vercel and GitHub Pages.
