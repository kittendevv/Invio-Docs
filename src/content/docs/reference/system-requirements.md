---
title: System Requirements
description: What you need to run Invio in production.
---

## Runtime

- Deno 2.x (backend)
- wkhtmltopdf installed in the backend image
- Fresh (Preact) frontend

## Ports

- Backend: 3000
- Frontend: 8000

## Resources (guidance)

- CPU: 1 vCPU minimum
- Memory: 512MB+ (1GB recommended for PDF-heavy usage)
- Disk: 1GB+ free for DB and log growth

## OS/Container

- Linux containers recommended (x86_64)
- Use Docker or compatible runtime for the provided Compose setup

## Backups

- Persist the SQLite DB volume and `backend/data/templates/`
- Schedule regular backups and test restore
