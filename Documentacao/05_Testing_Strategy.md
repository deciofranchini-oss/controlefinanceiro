# 05 - Testing Strategy

## Unit Tests

-   Balance calculation
-   Filters
-   Transfers

## Integration Tests

-   Transaction flow
-   Multi-user isolation


## Additional Regression Tests (v1.2.0)
- Swipe gestures: right swipe confirms pending; left swipe returns confirmed to pending.
- Dashboard recent list click-to-open transaction detail.
- Scheduled auto-run daily summary correctness (count matches `scheduled_run_logs` for today).
- Logo upload end-to-end: file -> DataURL -> `app_settings` -> applied in UI.
