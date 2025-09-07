---
title: Configuration
description: Environment, ports, and persistence settings for Invio.
---

Here’s what to set in your environment and where things live.

## Environment variables

| Name | Description |
| --- | --- |
| `ADMIN_USER` | Basic Auth username for admin endpoints. |
| `ADMIN_PASS` | Basic Auth password for admin endpoints. |
| `JWT_SECRET` | Secret for optional JWT issuance (not used by the current UI). |
| `DATABASE_PATH` | SQLite DB file path (e.g., `/app/data/invio.db`). |
| `BACKEND_URL` | Frontend → Backend base URL (e.g., `http://backend:3000`). |

## Ports

- Backend: 3000 (hardcoded)
- Frontend: 8000 (Fresh default)

## Persistence

- Database persisted at `DATABASE_PATH`
- Templates and assets under `backend/data/templates`
