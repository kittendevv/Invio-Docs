---
title: API Reference
description: Overview of the backend API under /api/v1 with links to per-area docs.
---

Base path: `/api/v1`

## Auth

- Admin endpoints require HTTP Basic Auth using `ADMIN_USER`/`ADMIN_PASS`.
- `/api/v1/auth/login` can issue a JWT but is not used by the current UI.

Quick test:

```bash
curl -u "$ADMIN_USER:$ADMIN_PASS" "$BACKEND_URL/api/v1/invoices" -s | head
```

Tip: Use Basic Auth for all admin endpoints; the current UI does not use JWT.

## Endpoints by area

- [Invoices](/reference/api/invoices/)
- [Customers](/reference/api/customers/)
- [Settings](/reference/api/settings/)
- [Templates](/reference/api/templates/)
- [Public](/reference/api/public/)
- [Health](/reference/api/health/)
