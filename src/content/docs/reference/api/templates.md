---
title: API · Templates
description: Endpoints for invoice templates.
---

Install, list, preview, and manage templates via these endpoints.

- GET `/templates` — List templates; backend marks the actual default by overlaying `settings.templateId`.
- POST `/templates` — Create (raw HTML). Rare in practice; prefer manifest.
- POST `/templates/install-from-manifest` — Install from remote manifest (YAML/JSON).
- DELETE `/templates/:id` — Delete (built-ins protected; resets default if needed).
- GET `/templates/:id` — Fetch a template.
- POST `/templates/:id/preview` — Render HTML with sample data.
- POST `/templates/load-from-file` — Load template HTML from a file path.

Installer behavior (summary):
- Fetches HTML (≤ 128KB), optional SHA-256 verification.
- Sanitizes aggressively (blocks script/iframe/object/embed/img/video/audio/link, CSS @import, external URLs, inline events).
- Saves files under `backend/data/templates/<id>/<version>/` for asset use.
- Upserts DB entry and sets `isDefault=false`.

Built-ins and defaults:
- `professional-modern`, `minimalist-clean` exist and cannot be deleted.
- If the active template is removed, `settings.templateId` resets to `minimalist-clean`.
