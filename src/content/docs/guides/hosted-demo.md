---
title: Hosted Demo
description: Try Invio online — a hosted instance running in read-only demo mode.
---

You can try Invio without installing anything:

- Live demo: https://invio-demo.codingkitten.hackclub.app
- Mode: Read-only (Demo Mode)
- Login: username demo, password demo

What to expect
- You can browse the UI, open invoices, view public HTML/PDF, and explore settings.
- Write actions (create/edit/delete, publish/unpublish, install templates) are disabled in the UI and blocked by the server.
- The demo database is pre-seeded for exploration.

How it works
- The hosted instance runs with `DEMO_MODE=true` so all mutating admin routes return HTTP 403.
- If a request is forced, the server rejects it (client disabling is only a UX hint).

See also
- Reference → [Demo Mode (Read-only)](/reference/demo-mode/)
- Guides → [Quick Start](/guides/quick-start/)
- Reference → [Rendering & PDFs](/reference/rendering-and-pdfs/)
