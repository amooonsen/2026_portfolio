# Code Review Workflow

## Checklist

### TypeScript & Code Quality
- [ ] Strict TypeScript compliance — no `any`, proper types for all values
- [ ] No unused imports, variables, or functions
- [ ] Import order follows convention (React → External → Internal → Relative → Types)
- [ ] Named exports for components, default only for pages/layouts

### Component Architecture
- [ ] Component type (Server vs Client) is appropriate for its use
- [ ] `"use client"` only present when truly needed (state, effects, handlers)
- [ ] Client component boundaries are as deep as possible in the tree
- [ ] `"use cache"` used for static/expensive server computations
- [ ] Props interface properly defined and documented

### Accessibility
- [ ] Semantic HTML elements used (section, article, nav, main, button)
- [ ] ARIA labels present where needed
- [ ] Keyboard navigation works for all interactive elements
- [ ] Focus indicators visible
- [ ] Color contrast ≥ 4.5:1 (WCAG AA)

### Animation & Performance
- [ ] `prefers-reduced-motion` checked before ALL animations
- [ ] Heavy libraries (GSAP, Three.js) lazy loaded with dynamic imports
- [ ] Only `transform` and `opacity` animated (GPU-accelerated)
- [ ] `will-change` not left permanently applied
- [ ] Three.js resources disposed in cleanup

### Styling
- [ ] Tailwind CSS utilities used (no inline styles unless dynamic)
- [ ] `cn()` utility used for conditional classes
- [ ] Responsive design: mobile-first with breakpoint prefixes
- [ ] Fluid typography with `clamp()`

### SEO & Metadata
- [ ] Pages export `metadata` or `generateMetadata()`
- [ ] Open Graph images configured
- [ ] Semantic heading hierarchy (h1 → h2 → h3, no skipping)

### Security
- [ ] No secrets or API keys in client code
- [ ] Server-only data stays in Server Components
- [ ] Form inputs validated on both client and server
- [ ] No `dangerouslySetInnerHTML` without sanitization

### Forbidden Patterns
- [ ] No Pages Router patterns
- [ ] No `middleware.ts` (should be `proxy.ts`)
- [ ] No manual `useMemo`/`useCallback` (React Compiler handles this)
- [ ] No `console.log` in production code
- [ ] No `any` type usage
