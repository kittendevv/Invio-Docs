---
title: Public Invoice Viewer
description: Read-only public routes for viewing invoice HTML and PDFs.
---

Publish an invoice to share a link with your client. These routes don’t require auth.

- `/public/invoices/[share_token]` → JSON
- `/public/invoices/[share_token]/html` → HTML (no auth)
- `/public/invoices/[share_token]/pdf` → PDF (no auth)

Use the Publish/Unpublish actions on an invoice to control availability.
