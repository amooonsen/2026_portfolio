---
name: optimize-performance
description: Analyzes and optimizes page performance targeting Core Web Vitals thresholds and Lighthouse 95+ score.
---

# Optimize Performance

## Use this skill when
- User reports slow loading or poor Lighthouse scores
- User asks to optimize a specific page or the whole site
- Before deployment as a final check
- Bundle size exceeds target (150KB initial JS)

## Do not use this skill when
- User is in the initial prototyping/design phase
- User is adding new features (optimize after feature completion)
- Performance is already within target thresholds

## Instructions

### 1. Audit Current State

Run these checks:
```bash
# Build and check output
next build

# Analyze bundle (if next-bundle-analyzer is installed)
ANALYZE=true next build
```

Review:
- Client component boundaries — are they minimal?
- Dynamic imports — are heavy libraries lazy loaded?
- Image optimization — using `<Image>` with proper sizing?
- Font loading — using `next/font`?
- Third-party scripts — loaded with `next/script` strategy?

### 2. Performance Targets

| Metric | Target | Critical Threshold |
|--------|--------|--------------------|
| LCP | < 2.5s | < 4.0s |
| FID | < 100ms | < 300ms |
| CLS | < 0.1 | < 0.25 |
| INP | < 200ms | < 500ms |
| TTI | < 3.5s | < 7.5s |
| Lighthouse | ≥ 95 | ≥ 80 |
| Initial JS | < 150KB | < 250KB |

### 3. Optimization Checklist

**Server/Client Boundary**:
- [ ] Convert client components to server where possible
- [ ] Push `"use client"` boundaries as deep as possible
- [ ] Add `"use cache"` to static content and expensive computations

**Bundle Optimization**:
- [ ] Dynamic import Three.js, GSAP, and other heavy libraries
- [ ] Tree-shake unused library exports
- [ ] Avoid importing entire libraries (e.g., `import { gsap } from "gsap"` not `import gsap from "gsap/all"`)

**Image Optimization**:
- [ ] Use `next/image` for all images
- [ ] Provide explicit `width` and `height` (prevents CLS)
- [ ] Use `priority` for above-the-fold hero images
- [ ] Configure AVIF + WebP formats in next.config.ts
- [ ] Use appropriate `sizes` attribute for responsive images

**Font Optimization**:
- [ ] Load fonts via `next/font` (automatic self-hosting)
- [ ] Subset fonts to used characters
- [ ] Use `font-display: swap` for non-blocking rendering

**Animation Performance**:
- [ ] Only animate `transform` and `opacity` (GPU-accelerated)
- [ ] Remove `will-change` after animation completion
- [ ] Lazy load animation libraries
- [ ] Reduce Three.js complexity on mobile
- [ ] Use `requestAnimationFrame` instead of `setInterval`

**Caching**:
- [ ] Static pages use `"use cache"` directive
- [ ] Configure appropriate cache profiles in next.config.ts
- [ ] Use `generateStaticParams` for known dynamic routes

### 4. Validation

After optimization:
1. Run `next build` — verify clean build with no warnings
2. Run Lighthouse audit (Incognito, mobile preset)
3. Test on throttled connection (Chrome DevTools → Network → Slow 3G)
4. Verify `prefers-reduced-motion` fallback works correctly
5. Check mobile performance separately (simplified 3D, fewer animations)
