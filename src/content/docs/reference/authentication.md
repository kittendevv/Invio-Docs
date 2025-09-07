---
title: Authentication
description: How authentication works in Invio for both frontend and backend.
---

Invio keeps auth simple: the UI uses Basic Auth behind the scenes, and there’s an optional JWT for API use.

## Frontend

- Login posts credentials and validates via a protected GET to `/api/v1/invoices`.
- Stores `base64(user:pass)` as `invio_auth` cookie (Basic token).
- Logout clears the cookie.
- Unauthenticated users are redirected to `/login`.

## Backend

- Basic Auth protects: `/api/v1/invoices`, `/customers`, `/templates`, `/settings` (and `/admin/*` aliases).
- `/api/v1/auth/login` can issue a JWT but is not used by the current UI.

### Quick check

```bash
curl -u "$ADMIN_USER:$ADMIN_PASS" "$BACKEND_URL/api/v1/health" -i
```

Expect a 200 with `{ "status": "ok" }`. If you see 401, re-check your credentials and Basic header.
