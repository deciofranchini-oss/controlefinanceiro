# Changelog
All notable changes to this documentation set will be documented in this file.

This project follows **Semantic Versioning** (MAJOR.MINOR.PATCH):
- **MAJOR**: breaking changes in documentation structure/contract (file names, section IDs, or documented contracts)
- **MINOR**: new docs or non-breaking expansions
- **PATCH**: fixes/clarifications with no structural impact



## [1.2.0] - 2026-03-03
### Added
- Dashboard recent transactions are clickable to open the transaction detail modal (same behavior as Transactions page).
- Attachment indicator (📎) shown in recent transactions when `attachment_url` is present.
- Mobile-first transaction list layout improvements and user-selectable Compact View.
- Swipe gestures on mobile: swipe right to confirm pending, swipe left to set back to pending (with animations).
- Scheduled transactions auto-processing at day rollover (when app is open), plus notifications of executed items.
- Admin audit logging for auto-registered scheduled transactions (`scheduled_run_logs`) and Audit screen.
- Daily dashboard summary: "Hoje: X programadas auto-registradas" (sourced from `scheduled_run_logs`).
- Admin-only logo upload in Settings (file upload -> DataURL) stored in `app_settings.app_logo_url`.

### Fixed
- Settings page now initializes the Logo Settings section correctly on load (ensures upload/save flow works end-to-end).

## [1.1.0] - 2026-03-03
### Added
- Transaction status model (`confirmed` | `pending`).
- Pending transactions highlighted and excluded from balance calculations.
- Admin-only logo management in Settings panel (stored in `app_settings`).
- Auto-confirm option for scheduled transactions.

### Fixed
- Scheduled transactions marked as auto-register now correctly create transactions in both source and destination accounts (transfer integrity fix).

## [1.0.0] - 2026-03-03
### Added
- Initial enterprise documentation set (architecture, database model, security/RLS, refactoring roadmap, testing strategy, layer separation).
- Documentation hub (`README.md`) and modular chapters (`01_..` to `06_..`).
- `VERSION` file for easy tracking.

### Notes
- This pack is intended to be committed under a `/docs` (or similar) folder in your repository.
- Future updates should append new versions above, keeping older entries intact.
