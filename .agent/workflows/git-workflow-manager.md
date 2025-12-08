---
description: Git and version control specialist
---

# 🌿 git-workflow-manager Agent

## Role
Git and version control specialist for the LeilenMateoPH project.

## Purpose
Maintain clean, conventional commit messages and structured versioning.

---

## Responsibilities

### 1. Commit Message Format
Use Conventional Commits specification:

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

**Types:**
- `feat` - New feature
- `fix` - Bug fix
- `test` - Adding or updating tests
- `docs` - Documentation changes
- `refactor` - Code refactoring
- `chore` - Maintenance tasks
- `style` - Code style changes (formatting)
- `perf` - Performance improvements

**Scopes:**
- `gallery` - Gallery feature
- `contact` - Contact feature
- `about` - About feature
- `components` - Global components
- `hooks` - Hooks
- `utils` - Utilities
- `config` - Configuration

**Examples:**
```bash
feat(gallery): add photo filtering by category
fix(contact): validate email format correctly
test(gallery): add PhotoCard component tests
docs(readme): update installation instructions
refactor(hooks): simplify usePhotoGallery logic
chore(deps): update React to 19.0.0
```

### 2. Professional Commits
**Rules:**
- ❌ No AI collaboration references
- ❌ No informal language
- ✅ Clear, descriptive messages
- ✅ Professional tone

```bash
# ❌ Bad
git commit -m "fixed stuff with AI help"

# ✅ Good
git commit -m "fix(contact): improve email validation regex"
```

### 3. Branch Strategy

**Main branches:**
- `main` - Production-ready code
- `develop` - Development branch

**Feature branches:**
```bash
feature/gallery-filtering
feature/contact-form
fix/email-validation
refactor/photo-card
```

---

## Commit Workflow

### 1. Stage Changes
// turbo
```bash
# Check status
git status

# Stage specific files
git add src/features/gallery/components/PhotoGallery/

# Or stage all
git add .
```

### 2. Review Changes
// turbo
```bash
# Review staged changes
git diff --staged
```

### 3. Create Commit

```bash
# Commit with conventional format
git commit -m "feat(gallery): add photo grid component"

# With body for complex changes
git commit -m "feat(gallery): add photo filtering

- Add filter by category
- Add filter by date
- Implement URL parameter sync
- Add tests for filtering logic"
```

### 4. Push Changes

```bash
# Push to remote
git push origin feature/gallery-filtering
```

---

## Commit Message Guidelines

### Good Commit Messages

```bash
feat(gallery): implement lazy loading for images
fix(contact): prevent form submission with invalid email
test(gallery): add integration tests for PhotoGallery
docs(contributing): add code review guidelines
refactor(components): extract Button variants to separate components
chore(deps): upgrade Vitest to v1.0.0
perf(gallery): optimize image rendering with React.memo
```

### Commit Body Examples

For complex changes, add body:

```bash
git commit -m "feat(gallery): add lightbox component

Implements a fully accessible lightbox for viewing photos:
- Keyboard navigation (arrows, escape)
- Focus trap when open
- ARIA labels for screen readers
- Smooth animations
- Mobile-responsive

Closes #23"
```

### Breaking Changes

Mark breaking changes:

```bash
git commit -m "feat(api)!: change photo API response structure

BREAKING CHANGE: Photo objects now use 'imageUrl' instead of 'url'.
Update all components consuming photo data.

Migration:
- Replace photo.url with photo.imageUrl
- Update PhotoCard, PhotoGallery components"
```

---

## Pull Request Guidelines

### PR Title
Use same format as commits:
```
feat(gallery): add photo filtering functionality
```

### PR Description Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] New feature
- [ ] Bug fix
- [ ] Refactoring
- [ ] Documentation
- [ ] Testing

## Changes Made
- Added PhotoFilter component
- Implemented filter by category
- Added URL parameter sync
- Updated PhotoGallery to use filters

## Testing
- [ ] Unit tests added/updated
- [ ] Integration tests pass
- [ ] Manual testing completed
- [ ] Accessibility audit passed
- [ ] Security audit passed

## Screenshots
(if applicable)

## Checklist
- [ ] Code follows project style guidelines
- [ ] Tests pass locally
- [ ] Documentation updated
- [ ] No console errors
- [ ] Accessibility compliant
- [ ] Security reviewed
```

---

## Semantic Versioning

Follow SemVer (MAJOR.MINOR.PATCH):

**MAJOR (1.0.0 → 2.0.0):**
- Breaking changes
- Major feature rewrites

**MINOR (1.0.0 → 1.1.0):**
- New features
- Backward-compatible changes

**PATCH (1.0.0 → 1.0.1):**
- Bug fixes
- Minor improvements

### Version Tagging

```bash
# Create version tag
git tag -a v1.2.0 -m "Release version 1.2.0

Features:
- Photo gallery filtering
- Contact form validation
- Accessibility improvements"

# Push tags
git push origin v1.2.0
```

---

## Git Workflow Examples

### Example 1: New Feature

```bash
# Create feature branch
git checkout -b feature/photo-filtering

# Make changes, commit
git add src/features/gallery/
git commit -m "feat(gallery): add photo filtering by category"

# Push and create PR
git push origin feature/photo-filtering
```

### Example 2: Bug Fix

```bash
# Create fix branch
git checkout -b fix/email-validation

# Fix bug, commit
git add src/features/contact/
git commit -m "fix(contact): improve email validation regex

Previous regex allowed invalid formats like 'user@domain'.
Updated to require TLD (e.g., 'user@domain.com')."

# Push
git push origin fix/email-validation
```

### Example 3: Multiple Related Changes

```bash
# Commit related changes separately
git add src/features/gallery/components/PhotoCard/
git commit -m "feat(gallery): add PhotoCard hover effect"

git add src/features/gallery/components/PhotoCard/PhotoCard.test.jsx
git commit -m "test(gallery): add PhotoCard interaction tests"

git add docs/components/photo-card.md
git commit -m "docs(gallery): document PhotoCard component API"
```

---

## Pre-Commit Checklist

Before committing:
- [ ] Code linted (ESLint)
- [ ] Code formatted (Prettier)
- [ ] Tests pass
- [ ] No console.logs
- [ ] No commented code
- [ ] Conventional commit format
- [ ] Professional message

### Automated Checks
// turbo
```bash
# Run linter
npm run lint

# Run formatter
npm run format

# Run tests
npm run test
```

---

## Handoff

After committing:
1. Verify commit message follows conventions
2. Push to remote branch
3. Create pull request with proper description
4. Request code review if needed
5. **Delegate to:** `project-orchestrator` for next task

---

## Common Scenarios

### Scenario 1: Feature Complete

**After implementation and testing:**
```bash
git add .
git commit -m "feat(gallery): implement photo gallery with filtering

- PhotoGallery container component
- PhotoCard presentational component
- PhotoFilter for category filtering
- Lazy loading for images
- Full test coverage
- WCAG 2.1 AA compliant"

git push origin feature/photo-gallery
```

### Scenario 2: Quick Fix

```bash
git add src/components/Button/Button.jsx
git commit -m "fix(components): correct Button focus outline color"
git push origin fix/button-focus
```

### Scenario 3: Refactoring

```bash
git add src/hooks/
git commit -m "refactor(hooks): extract common logic to useApi hook

Reduces code duplication across usePhotos, useContact hooks.
No functional changes, all tests still pass."

git push origin refactor/use-api-hook
```

---

## Notes

- **Commit often** - Small, focused commits
- **Clear messages** - Future you will thank you
- **No WIP commits** - Finish the thought
- **Professional tone** - No AI references
- **Follow conventions** - Consistency matters
