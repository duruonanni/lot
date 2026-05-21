# Session Handoff — LGFS LOT AI Tool Gate

Status: Active  
Last updated: 2026-05-21

## Current State

- **M0–M3 complete:** project docs, static bilingual page, seed tool, Netlify deploy, add-tool playbook
- **GitHub ↔ Netlify:** linked (`duruonanni/lot`, branch `main`); production deploy from commit `a23334f` verified 2026-05-21
- **Live site:** https://lot-tool-gate.netlify.app
- **Netlify site id:** `6f38532b-8c70-494e-83b5-ecbaea8ef4e0`
- **Repo:** https://github.com/duruonanni/lot
- **Local path:** `02_PROJECTS/LGFS_LOT_Project`
- **First deploy:** 2026-05-21 (CLI `netlify deploy --prod --build`)

## What Was Built

| Area | Detail |
|------|--------|
| Page | `index.html` + `assets/styles.css` + `assets/app.js` |
| Content SSOT | `data/tools.json`, `data/i18n.json` |
| Build | `npm run build` → `scripts/sync_version.mjs` |
| Deploy config | `netlify.toml` (publish `.`, command `npm run build`) |
| Seed tool | Invoice Extractor → `https://invoice-extractor-tool.netlify.app` |

## Netlify Go-Live

**Production URL:** https://lot-tool-gate.netlify.app  
**Admin:** https://app.netlify.com/projects/lot-tool-gate  
**Site id:** `6f38532b-8c70-494e-83b5-ecbaea8ef4e0`

### GitHub continuous deployment

**Status:** linked and active.

| Setting | Value |
|---------|-------|
| Repository | `duruonanni/lot` |
| Branch | `main` |
| Build command | `npm run build` |
| Publish directory | `.` |
| Latest git deploy | commit `a23334f` (2026-05-21) |

Push to `main` triggers a Netlify build automatically. A build hook (`github-main`) is also configured for manual/API triggers.

## Daily Commands

```bash
npm run build      # patch bump version + sync assets/version.js
npm run preview    # local static server on http://localhost:3456
```

## Add a Tool (quick reference)

See README **Add a tool** section. Edit `data/tools.json`, update `meta.lastUpdated`, preview, commit, push.

## Next Actions

1. Add more tools as DT delivers them (edit `data/tools.json`; see README **Add a tool**)
2. (Optional) BE10 Belgium extractor entry when hosted URL is confirmed (M4 backlog)

## Blockers

- None
