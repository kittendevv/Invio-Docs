---
title: UI Routes
description: Overview of the frontend routes in Invio.
---

Here’s how to find your way around the app.

- `/` → redirects to `/dashboard` if authed, else `/login`
- `/login`, `/logout`
- `/dashboard` — summaries: counts, totals, status distribution, recent invoices
- `/invoices` — list with search (`q`) and status filters; create button
- `/invoices/new` — create invoice
- `/invoices/[id]` — detail + actions: Edit, Publish, Mark as Sent, Mark as Paid, Duplicate, Unpublish, Delete; links to HTML/PDF; shows public link if published
- `/invoices/[id]/edit` — edit invoice
- `/invoices/[id]/html`, `/invoices/[id]/pdf` — proxy to backend
- `/customers` — list customers
- `/customers/new` — create customer
- `/customers/[id]` — detail + edit/delete
- `/customers/[id]/edit` — edit customer
- `/customers/[id]/cannot-delete` — shown when deletion is blocked
- `/settings` — business settings and template management
- `/templates` — redirects to `/settings`
