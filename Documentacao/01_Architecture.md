# 01 - Architecture Overview

## Application Type

-   SPA (Single Page Application)
-   Vanilla JavaScript
-   Supabase direct integration

## Layers

1.  Presentation Layer (HTML/CSS)
2.  Application Layer (app.js, auth.js, transactions.js)
3.  Domain Services
4.  Repository Layer
5.  Database (Supabase PostgreSQL)


## Transaction Status Layer (v1.1.0)
- All transactions now include a `status` field.
- Only `confirmed` transactions impact account balances.
- `pending` transactions are displayed at the top of lists and visually highlighted.


## Dashboard UX Enhancements (v1.2.0)
- Recent transactions list supports click-to-open detail modal (single source of truth for transaction viewing).
- Attachment indicator shown when transaction has `attachment_url`.
- Daily summary badge is computed from `scheduled_run_logs` for the current date.
