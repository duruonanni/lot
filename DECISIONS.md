# Decisions — LGFS LOT AI Tool Gate

Status: Active  
Last updated: 2026-05-21

## D001 — Static JSON as content SSOT

**Decision:** Tool metadata lives in `data/tools.json`; the page fetches it at runtime.

**Rationale:** Lowers the bar for AI-assisted content updates — edit JSON and push, no HTML/layout changes.

**Trade-off:** Requires same-origin JSON fetch (negligible on Netlify static hosting).

---

## D002 — Public-first access

**Decision:** M1 ships without login. Site is publicly reachable.

**Rationale:** Faster rollout; tools themselves may have their own auth (e.g. Invoice Extractor uses Netlify Identity).

**Upgrade path:** Optional M4 Netlify Identity gate (see `codex_invoice_extractor_tool/docs/HOSTED_ROLLOUT_PLAN.md`).

---

## D003 — Card grid over table

**Decision:** Tool directory uses responsive cards, not a dense data table.

**Rationale:** Better UX for a tool navigation/landing page; summaries and CTAs need vertical space.

---

## D004 — Default language English

**Decision:** `<html lang="en">` on first visit; Chinese via explicit toggle.

**Rationale:** LOT team operating context; English as default per product brief.

---

## D005 — Version SSOT in package.json

**Decision:** `package.json` `"version"` is the single semver source; `npm run build` patch-bumps and writes `assets/version.js`.

**Rationale:** Aligns with Studio `RELEASE_VERSIONING.md`; footer displays synced version on each Netlify deploy.

**Opt-out:** Set `LOT_SKIP_VERSION_BUMP=1` to skip bump (sync only).

---

## D006 — No Netlify Functions in M1

**Decision:** Pure static site — no serverless backend.

**Rationale:** Directory page has no server-side needs; keeps deploy and maintenance minimal.
