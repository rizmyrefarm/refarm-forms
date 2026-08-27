# ReFarm Forms Workspace Instructions & Rules

## 1. Bookmark & Release Workflow
Whenever the user says **"bookmark"**, **"please bookmark"**, or **"create a bookmark"**:
1. **Version Bump**: Increment semantic version in `package.json` (patch for tweaks/fixes, minor for new features/sections).
2. **Update `CHANGELOG.md`**: Prepend the latest changes under `## [vX.Y.Z] - YYYY-MM-DD` with categorized items (Added, Changed, Fixed, Removed).
3. **Commit & Tag**:
   ```bash
   git add -A
   git commit -m "chore(release): bump version to vX.Y.Z [bookmark]"
   git tag -a vX.Y.Z -m "Release vX.Y.Z: <Summary>"
   git push origin main --tags
   ```
4. **Report**: Confirm version tag, changelog summary, and GitHub sync.

## 2. Code Quality & Standards
- Keep responsive design mobile-first (desktop side-by-side, mobile stacked cards).
- Maintain backward compatibility for form definitions and Prisma schemas.
- Ensure all builds pass cleanly with `npm run build` prior to committing.
