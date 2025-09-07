---
title: Data Model (SQLite)
description: High-level schema overview, DDL, relationships, and example queries.
---

This page describes how Invio stores data in SQLite and how it maps to rendering (HTML/PDF) and templates.

## High-level

- SQLite stores app state: settings, templates, users (admin), customers, invoices, line items, and payments.
- Templates installed via manifest are mirrored to disk under `backend/data/templates/<id>/<version>/` for asset serving.
- Settings drive rendering (e.g., `templateId`, `highlight`, `logo`). Invoices reference customers and have a `share_token` for public viewing.

## Tables at a glance

- settings — global key/value app settings (templateId, highlight, logo, currency defaults)
- templates — installed and built-in templates (raw/sanitized HTML, versioning flags)
- users — admin credentials (username/password hash) for protected APIs
- customers — customer records used on invoices
- invoices — invoice header (status, dates, currency, totals, share token, metadata)
- invoice_items — line items for each invoice
- payments — recorded payments for invoices

## DDL

````sql
-- SQLite schema
CREATE TABLE IF NOT EXISTS settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS templates (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  version TEXT,
  html TEXT NOT NULL,           -- sanitized HTML blob for rendering
  is_builtin INTEGER DEFAULT 0, -- 1 = built-in, 0 = installed/custom
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT
);

CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  role TEXT DEFAULT 'admin',
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS customers (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  address TEXT,
  tax_id TEXT,
  metadata TEXT,                -- JSON metadata
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS invoices (
  id TEXT PRIMARY KEY,
  invoice_number TEXT UNIQUE NOT NULL,
  customer_id TEXT NOT NULL REFERENCES customers(id),
  status TEXT NOT NULL,         -- e.g. draft, sent, paid
  issue_date TEXT,
  due_date TEXT,
  currency TEXT,
  subtotal REAL,
  discount REAL,
  tax REAL,
  total REAL,
  notes TEXT,
  share_token TEXT UNIQUE,      -- token for public view/download
  metadata TEXT,                -- JSON blob for extras
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT
);

CREATE TABLE IF NOT EXISTS invoice_items (
  id TEXT PRIMARY KEY,
  invoice_id TEXT NOT NULL REFERENCES invoices(id),
  description TEXT NOT NULL,
  quantity REAL DEFAULT 1,
  unit_price REAL DEFAULT 0,
  line_total REAL,              -- quantity * unit_price
  order_index INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS payments (
  id TEXT PRIMARY KEY,
  invoice_id TEXT NOT NULL REFERENCES invoices(id),
  amount REAL NOT NULL,
  method TEXT,
  reference TEXT,
  paid_at TEXT DEFAULT (datetime('now')),
  created_at TEXT DEFAULT (datetime('now'))
);
````

## Relationships

- invoices → customers (many-to-one via `customer_id`)
- invoices → invoice_items (one-to-many via `invoice_id`)
- invoices → payments (one-to-many via `invoice_id`)
- invoices → public share (via `share_token`)

## Notes and behavior

- Templates: `templates.html` stores sanitized HTML used by the renderer. Built-ins live in-repo and aren’t processed by the installer sanitizer. Built-ins are protected from deletion by app logic.
- Settings: common keys include `templateId`, `highlight`, `logo`. The effective default template is `settings.templateId` (aliases normalized, e.g., `professional` → `professional-modern`).
- Formatting: rendering passes dates and money values as display-ready strings to templates; the currency code is provided separately.
- Safety: installed templates are size-limited and sanitized. Deleting the active template resets to a safe default.
- Assets: installed template files are mirrored to `backend/data/templates/<id>/<version>/` and served via a guarded route; external fonts/assets are not fetched.

## Example queries

````sql
-- Get an invoice with its customer
SELECT i.*, c.name AS customer_name, c.email AS customer_email
FROM invoices i
LEFT JOIN customers c ON i.customer_id = c.id
WHERE i.id = 'INVOICE_ID';

-- Items for an invoice
SELECT * FROM invoice_items
WHERE invoice_id = 'INVOICE_ID'
ORDER BY order_index;

-- Current default template (if key/value settings)
SELECT value FROM settings WHERE key = 'templateId';

-- List installed templates (newest first)
SELECT id, name, version, is_builtin, created_at
FROM templates
ORDER BY created_at DESC;
````

## Operational notes

- Backup/restore: stop the app and copy the SQLite DB file at `DATABASE_PATH`. If you use manifest-installed templates, also back up `backend/data/templates/`.
- Migrations: when schema changes, the app’s init code creates new tables/columns if missing.
- Troubleshooting: if invoices don’t render, verify `settings.templateId` and that the template exists; if public links 404, ensure `share_token` exists and hasn’t been revoked.
