# AURA by AI_Nikitka93

## Goal
Release and maintain the AURA portfolio landing with Vercel and GitHub Pages as frontend surfaces, plus a Cloudflare Worker for backend/demo flows.

## Stack
- Frontend: React 19, Vite 8, Tailwind CSS
- Backend: Cloudflare Worker via Wrangler
- Tests: Node test runner, Playwright

## Working Directories
- Frontend app: `Desaine/`
- Worker entry: `Desaine/worker/index.js`
- Project memory: `docs/`

## Key Commands
- `npm run build` in `Desaine/`
- `vercel whoami` in `Desaine/`
- `vercel --prod --yes` in `Desaine/`
- `node --test tests/worker-origin.test.js tests/waitlist-queue.test.js` in `Desaine/`
- `npx playwright test tests/waitlist-demo-queue.spec.js` in `Desaine/`
- `npx wrangler whoami` in `Desaine/`
- `npx wrangler deploy` in `Desaine/`

## Memory Index
- State: `docs/STATE.md`
- Plan: `docs/EXEC_PLAN.md`
- History: `docs/PROJECT_HISTORY.md`
- Decisions: `docs/DECISIONS.md`
- Project map: `docs/PROJECT_MAP.md`
- Local account context: `docs/ACCOUNT_REGISTRY.local.md`
- Local secret map: `docs/SECRETS_INDEX.local.md`
