# Repository Packaging Audit

Audit date: 2026-04-27
Repository type: `SaaS / app repository` used as a public portfolio showcase

## Repo Packaging Audit

### Current strengths
- The repository already has a root `README.md`, `LICENSE`, `CONTRIBUTING.md`, `SECURITY.md`, issue forms, and a PR template.
- Public metadata exists on GitHub: description, homepage URL, and relevant topics are already configured.
- The live product surface is demonstrable, with working public URLs and release evidence in `docs/` and `RELEASE_RUNBOOK.md`.

### Packaging gaps found in this pass
- The README quickstart pointed to the wrong local URL for `npm run dev`.
- The README still framed GitHub Pages as the only live path, while Vercel is now the primary frontend demo.
- The README linked to this audit file, but the audit content was stale and no longer reflected the current repo state.
- There was no public-facing `SUPPORT.md`, `CODEOWNERS`, or `CODE_OF_CONDUCT.md`, which weakens trust and contribution routing in a public repository.

## README Structure Plan

1. Hero: concise project statement plus primary demo and mirror URLs.
2. What this repo is: clarify that AURA is a public portfolio case, not an open-source starter.
3. Quickstart: `npm ci`, `npm run dev`, correct localhost URL, build/preview path, visual tests.
4. Runtime surfaces: explain Vercel, GitHub Pages, and Cloudflare Worker with one small diagram.
5. Repository map: route readers into `Desaine/`, `docs/`, workflows, and worker code.
6. Trust surface: link contributing, support, security, code of conduct, and license.

## Required / Recommended Files Matrix

| Surface | Status | Action |
| --- | --- | --- |
| `README.md` | Present, updated | Keep as canonical landing page |
| `README.ru.md` | Present, updated | Keep aligned with English README |
| `LICENSE` | Present | Keep proprietary posture explicit |
| `CONTRIBUTING.md` | Present | Keep lightweight because repo is showcase-first |
| `SECURITY.md` | Present | Keep linked from README |
| `SUPPORT.md` | Missing | Add for public issue routing and expectation-setting |
| `.github/CODEOWNERS` | Missing | Add single-owner routing |
| `CODE_OF_CONDUCT.md` | Missing | Add baseline behavior policy for public interactions |
| `.github/ISSUE_TEMPLATE/*` | Present | Keep YAML forms |
| `.github/PULL_REQUEST_TEMPLATE.md` | Present | Keep short and practical |
| `CHANGELOG.md` | Missing | Optional; not required for current showcase posture |
| `CITATION.cff` | Missing | Not needed for this repository type |
| `.github/FUNDING.yml` | Missing | Not needed for this repository type |

## Concrete File Edits Or Generated Files

- Updated `README.md`
- Updated `README.ru.md`
- Added `SUPPORT.md`
- Added `.github/CODEOWNERS`
- Added `CODE_OF_CONDUCT.md`
- Refreshed this audit document
- Planned repo metadata alignment: homepage should point to the Vercel demo if Vercel remains the primary public URL

## Open Gaps / Not Yet Implemented

- Social preview image was not redesigned in this pass.
- A formal `CHANGELOG.md` was intentionally not added; `docs/PROJECT_HISTORY.md` remains the richer internal history.
- GitHub Discussions and discussion templates were not enabled or configured.
- The frontend still has cross-domain state drift between Vercel and GitHub Pages because personalization state lives in per-domain `localStorage`.

## Verification Notes

Official GitHub docs checked on 2026-04-27:
- README precedence and surfacing: [About the repository README file](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-readmes)
- Issue forms status and location: [Configuring issue templates for your repository](https://docs.github.com/github/building-a-strong-community/configuring-issue-templates-for-your-repository)
- CODEOWNERS locations: [About code owners](https://docs.github.com/github/creating-cloning-and-archiving-repositories/about-code-owners?azure-portal=true)
- SECURITY.md locations: [Adding a security policy to your repository](https://docs.github.com/en/free-pro-team%40latest/github/managing-security-vulnerabilities/adding-a-security-policy-to-your-repository)
