# RELEASE RUNBOOK

## Current Architecture
- Frontend production surface: GitHub Pages at `https://ai-nikitka93.github.io/AURA-by-AI_Nikitka93/`
- Frontend source/build: `Desaine/` with Vite output in `Desaine/dist`
- Backend/demo API surface: Cloudflare Worker from `Desaine/worker/index.js`
- Current frontend Worker target in code:
  - `Desaine/src/lib/waitlist.js`
  - `Desaine/src/lib/aiSignal.js`
  - default base: `https://aura-portfolio-worker.aiartbora.workers.dev`

## Demo Mode
- Waitlist is intentionally demo-friendly.
- If the live relay is unreachable or not configured, submissions fall back to the device queue in local storage.
- The UI must explicitly signal this state as `Demo mode` / `Демо-режим`.
- Queue deduplication is email-based, so repeated submissions do not create multiple local pending entries for the same email.

## Release Commands

### 1. Frontend build
```powershell
cd M:\Projects\sites\AURA by AI_Nikitka93\Desaine
npm run build
```

### 2. Worker auth check
```powershell
cd M:\Projects\sites\AURA by AI_Nikitka93\Desaine
npx wrangler whoami
```

### 3. Worker deploy
```powershell
cd M:\Projects\sites\AURA by AI_Nikitka93\Desaine
npx wrangler deploy
```

### 4. GitHub Pages release
```powershell
cd M:\Projects\sites\AURA by AI_Nikitka93
git add .
git commit
git push origin main
```

## Live Smoke Commands

### GitHub Pages
```powershell
curl.exe -I https://ai-nikitka93.github.io/AURA-by-AI_Nikitka93/
curl.exe -I https://ai-nikitka93.github.io/AURA-by-AI_Nikitka93/privacy.html
```

### Worker origin hardening
```powershell
curl.exe -i -X POST https://aura-portfolio-worker.aiartbora.workers.dev/api/aura-signal ^
  -H "Content-Type: application/json" ^
  --data "{\"language\":\"ru\",\"ritual\":\"glow\",\"intensity\":42,\"wearMoment\":\"daily\",\"ecosystem\":\"ios\",\"fitPreference\":\"balanced\",\"profileLabel\":\"Test\",\"wearLabel\":\"Test\",\"ecosystemLabel\":\"Test\",\"fitLabel\":\"Test\",\"fitNote\":\"Test\",\"ecosystemNote\":\"Test\",\"localSummary\":\"Test\",\"localDirection\":\"Test\"}"
```

Expected result: `403 Forbidden` when `Origin` is absent.

## Known Release Risks
- Cloudflare deploy requires Wrangler auth against the same Cloudflare account as `Desaine/wrangler.jsonc.account_id`.
- GitHub Pages publish is driven by `git push origin main`, so frontend availability may lag behind the push while Actions completes.
- The Worker may remain on the previous live version if Cloudflare account access is mismatched.
