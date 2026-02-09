# Git Workflow

## Branch Naming
- `feature/[description]` — new features (e.g., `feature/hero-section`)
- `fix/[description]` — bug fixes (e.g., `fix/mobile-nav-overflow`)
- `refactor/[description]` — code improvements (e.g., `refactor/animation-utils`)
- `style/[description]` — visual/CSS changes (e.g., `style/dark-mode-colors`)
- `chore/[description]` — tooling, dependencies (e.g., `chore/update-deps`)

## Commit Messages (Conventional Commits)
Format: `type(scope): description`

Types:
- `feat` — new feature
- `fix` — bug fix
- `refactor` — code restructuring (no behavior change)
- `style` — visual/CSS changes
- `perf` — performance improvement
- `docs` — documentation
- `chore` — tooling, dependencies, config
- `test` — adding or updating tests

Scope (optional): component name, page name, or system area
- Example: `feat(hero): add 3D particle background`
- Example: `fix(nav): resolve mobile menu z-index issue`
- Example: `perf(three): lazy load hero scene on viewport entry`

## Workflow
1. Always check `git status` and `git branch` before starting
2. Create feature branch from `main`: `git checkout -b feature/[name]`
3. Make incremental commits with meaningful messages
4. Review changes before staging: `git diff`
5. Stage specific files (avoid `git add .`)
6. Never force push to `main`
7. Never commit secrets, `.env` files, or `node_modules/`

## Agent Branch Convention
- Agent-driven work uses dedicated branches: `agent/[task-description]`
- Human review required before merging to `main`
- Agent branches should be small and focused
