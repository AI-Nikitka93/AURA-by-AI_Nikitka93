# Decisions

## 2026-04-27 — Release target remains GitHub Pages + Cloudflare Worker
- Why: GitHub Pages is the confirmed public frontend path, while the Worker carries the demo backend and AI endpoints.
- Rejected: Cloudflare Pages as the primary frontend host, because prior state records show unreliable public availability for this project.
- Constraint: Existing release flow is already wired to GitHub push for Pages deployment.

## 2026-04-27 — Vercel becomes the primary frontend demo URL
- Why: Vercel production deploy succeeded immediately under the existing auth context, and live checks confirmed `200` for both the landing page and `privacy.html`.
- Rejected: Reusing Cloudflare Pages as the main frontend host, because prior project history recorded unstable public availability on that path.
- Constraint: GitHub Pages must remain working because it is already published and linked from the repository ecosystem.
