# Rule: Bookmark & Release Workflow

When the user says "bookmark", "please bookmark", "create a bookmark", or requests to bookmark the project state, ALWAYS execute the following automated release workflow:

---

## 1. Version Bump (Semantic Versioning)
1. Read the current version from `package.json` (or root project config).
2. Determine the increment:
   - **Patch (`x.y.Z + 1`)**: Bug fixes, styling adjustments, field label changes, minor UI tweaks.
   - **Minor (`x.Y + 1.0`)**: New features, new forms, new sections, structural redesigns.
   - **Major (`X + 1.0.0`)**: Major breaking architectural changes or migrations.
3. Update `package.json` with the new version string.

---

## 2. Update `CHANGELOG.md`
Prepend a new entry at the top of `CHANGELOG.md` following Keep a Changelog standards:

```markdown
## [vX.Y.Z] - YYYY-MM-DD

### Added
- Feature description...

### Changed
- Change description...

### Fixed
- Fix description...

### Removed
- Removal description...
```

---

## 3. Git Commit, Tag & Push to GitHub
Run the following git commands:
1. `git add package.json CHANGELOG.md` (plus any other uncommitted workspace files)
2. `git commit -m "chore(release): bump version to vX.Y.Z [bookmark]"`
3. `git tag -a vX.Y.Z -m "Release vX.Y.Z: <Summary of changes>"`
4. `git push origin <current-branch> --tags`

---

## 4. Confirm to User
Report:
- Tag / Version: `vX.Y.Z`
- Changelog summary
- Confirmation that commits and git tags are pushed to GitHub.
