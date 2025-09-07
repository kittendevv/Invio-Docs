---
title: API · Invoices
description: Endpoints for managing invoices.
---

These endpoints power the invoice list, detail view, and actions in the UI.

- GET `/invoices` — List invoices (includes customer name, issue_date)
- POST `/invoices` — Create invoice
- GET `/invoices/:id` — Invoice detail
- PUT `/invoices/:id` — Update (status, dates, currency, terms, notes, items)
- DELETE `/invoices/:id` — Delete
- POST `/invoices/:id/publish` — Publish and assign share token
- POST `/invoices/:id/unpublish` — Revoke share token
- POST `/invoices/:id/duplicate` — Duplicate and return new id
- GET `/invoices/:id/html` — Server-rendered HTML
- GET `/invoices/:id/pdf` — PDF (wkhtmltopdf)
