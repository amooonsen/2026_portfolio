# New Feature Workflow

1. **Branch**: Create feature branch from main — `git checkout -b feature/[name]`
2. **Understand**: Read existing code patterns in related files before writing
3. **Plan**: Identify which components, pages, or utilities are needed
4. **Implement**:
   - New component → invoke `create-component` skill
   - New page/route → invoke `create-page` skill
   - Animation needed → invoke `create-animation` skill
5. **Follow rules**: All code must comply with `.agent/rules/` guidelines
6. **Test**: Verify in browser with `next dev`
7. **Build check**: Run `next build` to verify no errors or type issues
8. **Lint**: Run `npx eslint .` to check code style
9. **Commit**: Use conventional commit format — `feat(scope): description`
10. **Review**: Self-review the diff before pushing
