---
title: API · Public
description: Public endpoints for read-only invoice access.
---

Serve public invoice views and PDFs via share tokens.

- GET `/public/invoices/:share_token` — Public invoice JSON
- GET `/public/invoices/:share_token/html` — HTML
- GET `/public/invoices/:share_token/pdf` — PDF
- GET `/_template-assets/:id/:version/*` — Serve template assets
