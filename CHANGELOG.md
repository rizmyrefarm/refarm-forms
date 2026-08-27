# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [v1.1.0] - 2026-08-27

### Added
- **Two-Column Categorized Layout**: Home and Admin pages now split forms into distinct `Client` (left) and `ReFarm` (right) responsive columns.
- **Form Responsibility Metadata**: Displayed `Filled by: ...` subtitles under every form title on both Home and Admin pages.
- **Visual Pill Badges**:
  - Header badge on *EcoFarm Phase 0.1* (`[To be filled by Client]` warm amber).
  - Section badges across *EcoFarm Phase 0.1* (Sections 1-3 amber, Sections 4-5 green).
  - Field-level badges on *EcoFarm Phase 0.1* Section 3 (`Recommended Crops` & `Production Potential`).
- **EcoFarm Phase 0.2**: Added Section 1 *Basic Information* (Trial Supervisor, Trial Manager, Point of Contact, Trial Client Representative) and renumbered subsequent sections 2–7.
- **IPIC Internal**: Added *Trial Client Supervisor* field to Section 1.
- **Dual Export Actions in Admin Submission View**: Added dedicated `Print (B&W)` (clean basic document) and `PDF (Full Design)` (styled full-color export) buttons to both the sticky top toolbar and bottom action bar.
- **Automated Bookmark & Release Workflow**: Standardized semantic version tagging and changelog tracking across commits.

### Changed
- **Scope of Work**: Renamed form title to *Scope of Work & Trial Protocol*.
- **EcoFarm Phase 0.2**: Renamed header date field to *Site Visit Date*.
- **IPIC**: Renamed header visit date field to *Date*.
- **Admin Navigation**: Updated submission view top-left back button to return to that specific form's submissions list (`/admin/forms/[slug]`) labeled `← Submissions`.
- **Submission Flow**: Improved public submission modal with fail-safe error handling and tailored completion actions ("Back to Forms Hub" vs "Submit Another").

### Fixed
- **Dokploy & Docker Deployment**: Pinned `pnpm@9` in `Dockerfile`, added `.npmrc` build script whitelisting for Prisma, and removed invalid workspace configuration.
- **Mobile Styling**: Fixed logo sizing, card table wrapping, and iOS zoom on input focus.

### Removed
- **Scope of Work**: Removed `Crop / Commodity` and `SOW Reference No.` header fields.

---

## [v1.0.0] - 2026-08-26

### Added
- Initial digital forms platform release with 10 ReFarm lifecycle forms.
- Dynamic MySQL persistence, Prisma integration, file uploads, and admin dashboards.
