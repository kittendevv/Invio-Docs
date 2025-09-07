---
title: Backup & Restore
description: Safely back up your data and restore it later.
---

Everything lives in two places:
- SQLite database at `DATABASE_PATH`
- Template files under `backend/data/templates/` (for manifest-installed templates)

## Backup

1) Stop the app (to flush writes):

```bash
# Docker Compose
docker compose down
```

2) Copy files:

```bash
cp /path/to/volumes/app-data/invio.db ./backup/
cp -r /path/to/volumes/app-templates/ ./backup/templates/
```

## Restore

1) Stop the app.
2) Replace the DB file and templates folder with your backup copies.
3) Start the app.

```bash
docker compose up -d
```

## Tips

- Automate backups on a schedule (daily or weekly) and test a restore.
- Keep backups off the host for safety (object storage or another volume).
- If you don’t use manifest-installed templates, only the DB file matters.
