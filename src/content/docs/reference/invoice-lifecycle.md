---
title: Invoice Lifecycle
description: Statuses, actions, and overdue logic.
---

## Statuses

- draft — New invoices you’re still editing.
- sent — You’ve sent it to the customer.
- paid — Fully paid.

Status drives badges and available actions.

## Actions

- Publish — Generates a share token and enables public HTML/PDF links.
- Unpublish — Revokes the share token; public links stop working.
- Mark as Sent — Sets status to sent.
- Mark as Paid — Sets status to paid.
- Duplicate — Creates a new invoice with the same customer, items, and details.
- Delete — Removes the invoice. If public, its link stops working.

## Overdue

- Overdue shows when the due date is in the past and status is not paid.

## Notes

- Publishing doesn’t change status; it only controls public access.
- Deleting a customer with invoices is blocked; delete invoices or reassign first.
