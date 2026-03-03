# 02 - Database Model

## Core Tables

-   families
-   accounts
-   transactions
-   categories
-   payees
-   scheduled_transactions
-   app_users

All business tables include `family_id` for multi-tenancy.


## v1.1.0 Schema Additions
### transactions
- status (varchar) DEFAULT 'confirmed'

### scheduled_transactions
- auto_confirm (boolean) DEFAULT true


### scheduled_run_logs (v1.2.0)
Audit table for automatic scheduled transaction executions.
Columns: `family_id`, `scheduled_id`, `scheduled_date`, `transaction_id`, `status`, `amount`, `description`, `created_at`.
