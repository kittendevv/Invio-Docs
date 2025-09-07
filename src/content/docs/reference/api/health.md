---
title: API · Health
description: Health and root endpoints.
---

Simple liveness check for monitoring and Compose healthchecks.

- GET `/health` — `{ status: "ok" }`
- GET `/` — Redirects to `/health`
