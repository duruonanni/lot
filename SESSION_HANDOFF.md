# Session Handoff — LGFS LOT AI Tool Gate

Status: Active  
Last updated: 2026-05-28

## Current State

- **M0–M3 complete:** project docs, static bilingual page, seed tool, Netlify deploy, add-tool playbook
- **GitHub ↔ Netlify:** linked (`duruonanni/lot`, branch `main`); production deploy from commit `f248e17` pushed 2026-05-22
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
| Catalog tools | Invoice Extractor → `https://invoice-extractor-tool.netlify.app`; LGFS Price Grid → `https://lgfspricing.netlify.app/`; Buyout RV → `https://buyout-rv-tool.netlify.app/` |

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
| Latest git deploy | commit `f248e17` (2026-05-22) |

Push to `main` triggers a Netlify build automatically. A build hook (`github-main`) is also configured for manual/API triggers.

## Daily Commands

```bash
npm run build      # patch bump version + sync assets/version.js
npm run preview    # local static server on http://localhost:3456
```

## Add a Tool (quick reference)

**Standard for every new hosted tool:** each app keeps its **own** Netlify site and repo; the gate only registers metadata in `data/tools.json` (same pattern as Invoice Extractor, LGFS Pricing, Buyout RV). See README **Add a tool**.

1. Gather URL + bilingual name/summary + `category` + `status` (+ optional `tags`)
2. Append to `data/tools.json`; set `meta.lastUpdated` (ISO date)
3. `npm run build` && `npm run preview` → verify EN/ZH cards and **Open tool** link
4. Commit + push `main` on `duruonanni/lot` → Netlify redeploys gate only (tool repos deploy separately)

## Next Actions

1. Confirm Netlify CD after this push — live gate shows Buyout RV card (3 tools)
2. Redeploy `LGFSPricing_Project` to Netlify if **← Tool Gate** header link is still pending
3. Add future tools via `data/tools.json` only (no gate layout changes; see D007)
4. (Optional) BE10 Belgium extractor entry when hosted URL is confirmed (M4 backlog)

## Blockers

- None
