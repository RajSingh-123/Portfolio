# Contributing Guidelines

Thank you for your interest in contributing to the Raj Singh Data Analyst Portfolio! This document provides guidelines for contributions, commit standards, and the development workflow.

## 📋 Quick Summary

- **Commit Style:** Conventional Commits
- **Branching Model:** Git Flow (feature, bugfix, hotfix branches)
- **PR Reviews:** Required before merge
- **Code Style:** Enforced by ESLint + Prettier

## 🌿 Branching Model

### Branch Types

We follow a Git Flow branching model:

```
main                 # Production-ready code (tagged releases)
  ├─ develop         # Integration branch for features
      ├─ feature/*   # New features
      ├─ bugfix/*    # Bug fixes
      └─ hotfix/*    # Emergency production fixes
```

### Creating a Branch

```bash
# Feature branch
git checkout -b feature/add-project-gallery

# Bug fix branch
git checkout -b bugfix/fix-search-modal

# Hotfix branch (from main)
git checkout main
git checkout -b hotfix/fix-critical-bug

# Update your branch with latest changes
git pull origin develop
```

### Branch Naming Convention

- `feature/add-*` - New features (e.g., `feature/add-testimonials`)
- `bugfix/fix-*` - Bug fixes (e.g., `bugfix/fix-mobile-menu`)
- `hotfix/fix-*` - Critical production fixes (e.g., `hotfix/fix-deployment-error`)
- `refactor/update-*` - Code refactoring (e.g., `refactor/update-components`)
- `docs/add-*` - Documentation updates (e.g., `docs/add-setup-guide`)

**Rules:**
- Use lowercase with hyphens
- Be descriptive (not `feature/thing`, use `feature/add-dark-mode-toggle`)
- Maximum 50 characters

## 📝 Commit Message Style

We follow **Conventional Commits** specification:

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat` - A new feature
- `fix` - A bug fix
- `refactor` - Code refactoring (no feature or bug fix)
- `style` - Code style changes (formatting, semicolons, etc.)
- `test` - Adding or updating tests
- `docs` - Documentation changes
- `chore` - Build config, dependencies, etc.
- `perf` - Performance improvements

### Scope (Optional)

Specify what part of the codebase:
- `components` - React components
- `pages` - Page components
- `lib` - Utility functions
- `styles` - CSS/Tailwind
- `data` - Data files
- `ci` - CI/CD configuration

### Subject

- Use imperative, present tense: "add" not "added" or "adds"
- Don't capitalize first letter
- No period (.) at the end
- Maximum 50 characters

### Body (Optional)

- Explain *what* and *why*, not *how*
- Wrap at 72 characters
- Separate from subject with blank line

### Footer (Optional)

- Reference issues: `Closes #123`
- Breaking changes: `BREAKING CHANGE: description`

### Examples

```
feat(components): add project case study modal

- Implement modal component with animations
- Add keyboard close (Esc key)
- Support markdown rendering

Closes #45

---

fix(pages): prevent console error on project load

The projects page was throwing undefined error because
the stack prop wasn't initialized with default value.

Closes #67

---

docs(readme): add deployment section for Vercel

---

refactor(lib): extract search logic to separate hook
```

## 🔄 Pull Request Process

### Before You Start

```bash
# Ensure your branch is up to date
git fetch origin
git rebase origin/develop

# Or merge if you prefer
git merge origin/develop
```

### Creating a PR

1. **Push your branch**
   ```bash
   git push origin feature/your-feature-name
   ```

2. **Create PR on GitHub**
   - Base: `develop` (or `main` for hotfixes)
   - Compare: `your-branch-name`

3. **Fill out PR template** (see checklist below)

### PR Checklist

Every PR must include:

```markdown
## Description
Brief description of changes (2-3 sentences)

## Type of Change
- [ ] Feature (non-breaking)
- [ ] Bug fix (non-breaking)
- [ ] Breaking change
- [ ] Documentation

## Related Issues
Closes #(issue number)

## Changes Made
- [ ] Added component X
- [ ] Updated Y functionality
- [ ] Fixed Z bug
- (Add specific changes)

## Testing
- [ ] Tested on mobile
- [ ] Tested on desktop
- [ ] Dark mode verified
- [ ] No console errors

## Screenshot/Demo (if applicable)
[Add screenshots or GIF for UI changes]

## Checklist
- [ ] Code follows project style (ESLint passes)
- [ ] No TypeScript errors
- [ ] Comments added for complex logic
- [ ] Updated relevant documentation
- [ ] No breaking changes (or documented)
- [ ] Tested locally before pushing
```

### PR Title Format

Follow commit message convention for PR title:

```
feat(components): add user authentication modal

fix(pages): resolve search results pagination bug

docs(readme): update deployment instructions
```

## 🎨 Code Style Guide

### We Enforce

- **Linter:** ESLint (run with `npm run lint`)
- **Formatter:** Prettier (run with `npm run format`)
- **TypeScript:** Strict mode enabled

### Before Committing

```bash
# Format code
npm run format

# Check for errors
npm run lint

# Type check
npm run type-check

# Run all checks
npm run lint && npm run type-check && npm run format
```

### Quick Style Rules

**TypeScript:**
```typescript
// ✅ Good
interface ProjectProps {
  title: string;
  description: string;
}

export const ProjectCard: React.FC<ProjectProps> = ({ title, description }) => (
  <div>{title}</div>
);

// ❌ Bad
interface ProjectProps {
  title: string
  description: string
}

const ProjectCard = (props: ProjectProps) => (
  <div>{props.title}</div>
);
```

**React Components:**
```typescript
// ✅ Good - Named export with clear props
export function ProjectCard({ title }: ProjectCardProps) {
  return <div>{title}</div>;
}

// ✅ Good - Default export for pages
export default function ProjectsPage() {
  return <div>Projects</div>;
}

// ❌ Bad - Anonymous function
export default ({ title }: any) => <div>{title}</div>;
```

**Tailwind Classes:**
```tsx
// ✅ Good - Clear, organized
<div className="flex items-center gap-4 p-4 rounded-lg border bg-card hover:border-primary/50 transition-all">

// ❌ Bad - Disorganized
<div className="p-4 gap-4 rounded-lg border bg-card flex items-center hover:border-primary/50 transition-all">
```

## 🧪 Testing Before Submission

### Mandatory Checks

- [ ] **No build errors:** `npm run build` succeeds
- [ ] **No TypeScript errors:** `npm run type-check` passes
- [ ] **No linting errors:** `npm run lint` passes
- [ ] **Visual check:** Manually test your changes
- [ ] **Responsive:** Test on mobile and desktop
- [ ] **Cross-browser:** Test on Chrome, Firefox, Safari

### Commands to Run

```bash
# Complete pre-submission check
npm run lint && npm run type-check && npm run format && npm run build
```

## 📚 Documentation

### When to Document

- **New Components:** Add JSDoc comments
- **Complex Logic:** Explain *why*, not *what*
- **API Changes:** Update README or CONTRIBUTING
- **Configuration:** Document new environment variables

### JSDoc Example

```typescript
/**
 * Analyzes resume content and extracts ATS keywords
 * 
 * @param jobDescription - Raw job posting text
 * @returns Object with keywords, job titles, and summary
 * 
 * @example
 * const result = analyzeResumeForATS();
 * console.log(result.keywords); // ["SQL", "Power BI", ...]
 */
export function analyzeResumeForATS(): ATSAnalysis {
  // ...
}
```

## 🔍 Code Review Process

### What We Look For

1. **Code Quality**
   - Follows style guide
   - No unnecessary complexity
   - Proper error handling

2. **Performance**
   - No performance regressions
   - Lazy loading where appropriate
   - Optimized images/assets

3. **Accessibility**
   - Proper ARIA labels
   - Keyboard navigation works
   - Color contrast sufficient

4. **Testing**
   - Changes tested locally
   - No console errors
   - Responsive design verified

### Feedback Response

- Be respectful and constructive
- Address feedback promptly
- Push changes to same branch (PR updates automatically)
- Mark conversations as resolved when done

## 📦 Version Management

### Versioning Scheme

We use **Semantic Versioning** (Major.Minor.Patch):

- `v1.0.0` - Major release (breaking changes)
- `v1.1.0` - Minor release (new features)
- `v1.1.1` - Patch release (bug fixes)

### Creating a Release

```bash
# On main branch
git tag -a v1.0.0 -m "Release v1.0.0: Add job tailor feature"
git push origin v1.0.0
```

## 🚀 Deployment Workflow

```
Feature Branch → Pull Request → Code Review → Merge to develop
                                                    ↓
                                            Staging/Preview Deploy
                                                    ↓
                                              Manual Testing
                                                    ↓
                                            Merge develop→main
                                                    ↓
                                            Production Deploy
```

## ❓ Questions or Issues?

- **GitHub Issues:** For bug reports or feature requests
- **Discussions:** For questions or ideas
- **Email:** rajsingh3706@gmail.com

---

**Thank you for contributing!** 🎉

Your efforts help make this portfolio better for everyone.
