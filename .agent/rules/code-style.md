# Code Style Guide

## Language & Framework
- TypeScript strict mode required for all files
- Next.js 16 App Router conventions only (no Pages Router)
- React 19.2 patterns: Server Components by default, "use client" only when needed
- Turbopack is the default bundler — do not add webpack-specific configs

## Naming Conventions
- Components: PascalCase (e.g., `HeroSection.tsx`)
- Hooks: camelCase with `use` prefix (e.g., `useScrollProgress.ts`)
- Utilities: camelCase (e.g., `formatDate.ts`)
- Constants: UPPER_SNAKE_CASE (e.g., `MAX_PROJECTS`)
- CSS variables: kebab-case (e.g., `--accent-color`)
- Non-component files: kebab-case (e.g., `scroll-utils.ts`)
- Route directories: kebab-case (e.g., `about/`, `projects/`)

## Import Order
1. React / Next.js built-ins (`react`, `next/image`, `next/link`)
2. External libraries (`gsap`, `three`, `framer-motion`)
3. Internal aliases (`@/components`, `@/lib`, `@/hooks`)
4. Relative imports (`./`, `../`)
5. Type imports (separate with blank line, use `import type`)

## Component Structure
- Server Components: default (no directive needed)
- Client Components: `"use client"` at top of file
- Cached Components: `"use cache"` for static/expensive server computations
- Props interface: named `{ComponentName}Props`, co-located or in adjacent types file
- Export: named exports for components, default export only for page.tsx/layout.tsx

## Styling
- Tailwind CSS 4 utility classes as primary styling method
- No inline styles unless dynamic runtime values
- Use `cn()` utility (clsx + tailwind-merge) for conditional classes
- CSS variables defined in `src/styles/globals.css` for theming
- No CSS Modules or styled-components

## TypeScript
- Strict mode enabled (`"strict": true` in tsconfig)
- No `any` type — use `unknown` with type narrowing when needed
- Interface for object shapes, type for unions/intersections
- Explicit return types for exported functions

## Forbidden Patterns
- Do NOT use Pages Router (`pages/` directory)
- Do NOT use `middleware.ts` (use `proxy.ts` instead)
- Do NOT manually `useMemo`/`useCallback` (React Compiler handles this)
- Do NOT import from `@/app/` in components (violates separation of concerns)
- Do NOT use `any` type
- Do NOT use `var` declarations
- Do NOT use `console.log` in production code
- Do NOT use deprecated React patterns (`componentDidMount`, `UNSAFE_*`)
