# Decisions

## 2026-04-27 — Release target remains GitHub Pages + Cloudflare Worker
- Why: GitHub Pages is the confirmed public frontend path, while the Worker carries the demo backend and AI endpoints.
- Rejected: Cloudflare Pages as the primary frontend host, because prior state records show unreliable public availability for this project.
- Constraint: Existing release flow is already wired to GitHub push for Pages deployment.
