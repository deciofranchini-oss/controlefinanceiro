# 03 - Security and Row Level Security (RLS)

## Current Model

-   Client-side isolation via famQ()

## Recommended RLS Policy Example

``` sql
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Family Isolation"
ON transactions
FOR ALL
USING (family_id = current_setting('request.jwt.claim.family_id', true)::uuid);
```


## Admin-Only Configuration (v1.1.0)
- Settings panel restricted to admin role.
- Application logo stored in `app_settings`.


## Audit Screen (v1.2.0)
- Audit screen is restricted to admin users.
- Audit records are written best-effort during auto-registration to `scheduled_run_logs`.
