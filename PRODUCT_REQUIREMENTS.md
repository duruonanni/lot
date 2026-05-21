# Product Requirements — LGFS LOT AI Tool Gate

Status: Active  
Last updated: 2026-05-21  
Project type: enterprise

## Purpose

A public static web page that guides the LGFS LOT team to AI tools built by the DT team. The page is bilingual (English default, Chinese optional) and deployed on Netlify.

## Users

- **Primary:** LGFS LOT team members looking for approved AI tools
- **Maintainers:** DT team (content updates via `data/tools.json`)

## Functional Requirements

### M1 (current)

1. **Tool directory** — list tools as cards with name, summary, category, status, tags, and external link
2. **Bilingual UI** — default English; toggle to Chinese; preference persisted in `localStorage`
3. **Search** — filter tools by name, summary, and tags (client-side)
4. **Category tabs** — filter by tool category
5. **KPI row** — tool count, category count, last catalog update date
6. **Seed tool** — Lenovo EaaS Invoice Validator (`https://invoice-extractor-tool.netlify.app`)

### Content updates (M3+)

- Maintainers add tools by editing `data/tools.json` (see README **Add a tool** playbook)
- No layout code changes required for new entries

## Non-Goals (M1)

- User authentication / Netlify Identity
- Server-side APIs or Netlify Functions
- Tool usage analytics
- Auto-discovery from sibling Studio projects

## Visual Requirements

- Lenovo-inspired enterprise style (see Studio `LENOVO_ENTERPRISE_DASHBOARD_TEMPLATE.html`)
- Noto Sans typography for CJK support
- Responsive layout (mobile-readable)
- Footer disclaimer: Lenovo-inspired style, not official brand certification

## Deployment

- Source: GitHub `duruonanni/lot`
- Host: Netlify continuous deployment from `main`
- Build: `npm run build` (version sync only; static assets served as-is)

## Acceptance Criteria (M1)

- [ ] First visit shows English
- [ ] Language toggle persists after refresh
- [ ] Invoice Extractor card opens correct URL in new tab
- [ ] Search and category filters work
- [ ] Footer version matches `package.json`
- [ ] Netlify deploy succeeds from git push
