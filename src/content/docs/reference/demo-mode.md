---
title: Demo Mode (Read-only)
description: How to enable, use, and test Invio’s demo mode.
---

## Purpose
- Put the app into a safe, read-only demonstration state so visitors can view data and flows but cannot change state.
- Useful for demos, screenshots, or sharing an example DB.
 - Hosted demo credentials: username demo, password demo

## Enable
In the main `.env`:
```bash
DEMO_MODE=true
# optional: path to the demo sqlite file the backend should open when demo mode is enabled
DEMO_DB_PATH=./backend/invio-demo.db
```
Restart the backend after changing env.

## Behavior (summary)
**Backend**
- When DEMO_MODE is true, mutating admin endpoints return HTTP 403 with JSON `{ "error": "Read-only demo mode: cannot <action>" }`.
- If DEMO_DB_PATH is set, the backend will open that SQLite file instead of the regular DATABASE_PATH while demo mode is enabled (so all requests operate against the demo DB file).
- The server-side guards are authoritative — even manual API calls are blocked.
- Implementation location: `admin.ts` (guard checks are near each mutating admin handler).

**Frontend**
- The UI shows a prominent demo banner.
- Write controls remain visible but are disabled client-side (keeps UX discoverable). Buttons are disabled using DaisyUI patterns:
  - `<button class="btn" disabled="disabled">` or
  - `<button class="btn btn-disabled" tabIndex="-1" role="button" aria-disabled="true">`
- Controls still emit requests if a user forces them, but backend will reject with 403.
- Read-only endpoints (list/read) continue to work (invoices HTML/PDF, listing endpoints, public shares).

## What is blocked
Typical blocked actions (examples):
- Create/update/delete invoices, customers, templates
- Publish/unpublish/duplicate invoices
- Install templates from manifests, load-from-file
- Update settings (PUT/PATCH)
- The exact guarded routes are in `backend/src/routes/admin.ts`.

## How to prepare a demo DB
**Local copy (recommended):**
```bash
# copy your current DB to a demo file
cp ./invio.db ./backend/invio-demo.db

# enable demo mode in .env
DEMO_MODE=true
DEMO_DB_PATH=./backend/invio-demo.db

# restart backend
# (local dev) run your usual start task
```

**Docker compose (bind-mount approach):**
1. Place demo file at repository path: `invio-demo.db`
2. Add a bind in `docker-compose.yml` for the backend service:
```yaml
services:
  backend:
    ...
    volumes:
      - invio_data:/app/data
      - ./backend/invio-demo.db:/app/data/invio-demo.db
```
3. Set env in `.env`:
```bash
DEMO_MODE=true
DEMO_DB_PATH=/app/data/invio-demo.db
```
4. Recreate backend:
```bash
docker compose down
docker compose up -d --build backend
```


## Revert
Turn off demo:
```bash
DEMO_MODE=false
# or remove DEMO_MODE and DEMO_DB_PATH from .env
# restart backend
```