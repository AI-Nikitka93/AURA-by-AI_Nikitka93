# Contributing

Thanks for helping keep AURA tidy and readable.

## Local setup

```bash
cd "Desaine"
npm ci
npm run dev
```

## Checks

- `npm run build`
- `npm run preview`
- `npx playwright install chromium`
- `npm run test:visual`

## What to keep in mind

- Keep public copy concise and brand-safe.
- Update the README when the deploy path, public URL, or setup flow changes.
- Update `docs/PROJECT_HISTORY.md` or `docs/STATE.md` when the maintainer context changes.
- Prefer relative links and branch-safe paths in markdown.
- Do not edit generated artifacts unless they are the source of truth.

## Pull requests

- Keep changes narrowly scoped.
- Explain what changed and why.
- Include screenshots for visual/UI changes.
- Mention whether you updated visual baselines or documentation.
