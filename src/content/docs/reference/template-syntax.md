---
title: Template Syntax
description: Mustache-like syntax and data available to invoice templates.
---

Templates use a small, mustache-like syntax. Keep it simple and focus on content and layout.

## Syntax

- Variables: `{{key}}`
- Sections/loops: `{{#key}} ... {{/key}}` (arrays iterate; truthy values render once)
- Dot notation: `{{customer.name}}`
- Inline defaults: `{{key || "fallback"}}`
- No helpers or advanced conditionals; no inverted sections.
- Values are inserted as-is (no HTML escaping utility).

## Data contract

Company
- `companyName`, `companyAddress`, `companyEmail`, `companyPhone`, `companyTaxId`

Invoice
- `invoiceNumber`, `issueDate`, `dueDate?`, `currency`, `status`

Customer
- `customerName`, `customerEmail?`, `customerPhone?`, `customerAddress?`, `customerTaxId?`

Items (array)
- `description`, `quantity`, `unitPrice`, `lineTotal`, `notes?`

Totals
- `subtotal`, `discountAmount?`, `discountPercentage?`, `taxRate?`, `taxAmount?`, `total`
- `hasDiscount`, `hasTax`

Payment & notes
- `paymentTerms?`, `paymentMethods?`, `bankAccount?`, `notes?`

Extras
- `logoUrl` (data URL when available)
- `brandLogoLeft` (layout hint)
- `highlightColor`, `highlightColorLight`

Notes
- Money values and dates are pre-formatted strings. Currency code (e.g., `USD`) is provided separately as `currency`.

## Example snippet

```html
<h1>Invoice {{invoiceNumber}}</h1>
<div>{{companyName}} → {{customerName}}</div>
<ul>
  {{#items}}
    <li>{{description}} — {{quantity}} × {{unitPrice}} = {{lineTotal}}</li>
  {{/items}}
  <li><strong>Total:</strong> {{total}} {{currency}}</li>
</ul>
```

## Sanitization limits (installed templates)

- Disallowed tags: `script`, `iframe`, `object`, `embed`, `img`, `video`, `audio`, `link`
- Disallow CSS `@import`, and external `url(http/https)` in CSS
- Disallow inline `on*` event handlers
- HTML size ≤ 128KB

Tip: Use inline `<style>` and a simple layout to ensure reliable PDF output.
