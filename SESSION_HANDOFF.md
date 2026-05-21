# Session Handoff — LGFS LOT AI Tool Gate

Status: Active  
Last updated: 2026-05-21

## Current State

- **M0–M3 complete:** project docs, static bilingual page, seed tool, Netlify deploy, add-tool playbook
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

### GitHub continuous deployment (optional next step)

CLI deploy is live. To enable auto-deploy on git push:

1. Netlify dashboard → **lot-tool-gate** → **Project configuration** → **Build & deploy** → **Continuous deployment**
2. Link repository **`duruonanni/lot`**, branch **`main`**
3. Confirm build command `npm run build`, publish directory `.`
4. Push commits to `main` to trigger redeploys

## Daily Commands

```bash
npm run build      # patch bump version + sync assets/version.js
npm run preview    # local static server on http://localhost:3456
```

## Add a Tool (quick reference)

See README **Add a tool** section. Edit `data/tools.json`, update `meta.lastUpdated`, preview, commit, push.

## Next Actions

1. Connect GitHub repo in Netlify dashboard for continuous deployment on push
2. Commit and push current project files to `main`
3. Add more tools as DT delivers them (BE10 extractor candidate for M4)

## Blockers

- None for local development
- Netlify CD requires user to authorize GitHub repo in Netlify dashboard
