---
title: Rendering & PDFs
description: How HTML is rendered and PDFs are generated in Invio.
---

Invio renders HTML using your chosen template, then turns it into a PDF with `wkhtmltopdf`.

## HTML rendering

- Uses selected template (`settings.templateId`) and business settings.
- Highlight color is optional.

## PDFs

- Generated with `wkhtmltopdf` using the same HTML you see in the app.
- Private and public HTML/PDF share the same rendering pipeline; the difference is auth and caching headers.
- If PDF generation isn’t available, the HTML view works as a fallback.
