---
name: create-animation
description: Creates scroll-based or interactive animations using GSAP, Framer Motion, or CSS transitions following the project animation layer system.
---

# Create Animation

## Use this skill when
- User asks for scroll-triggered animations
- User wants to add motion/transitions to a section
- User needs 3D or particle effects
- User wants interactive hover/click animations beyond CSS

## Do not use this skill when
- Simple CSS hover effects (use Tailwind `hover:` / `transition` classes)
- Page-to-page transitions (use React 19.2 View Transitions API directly)
- User is creating a new component without animation (use create-component)

## Instructions

### 1. Select the appropriate animation layer

| Layer | Tool | Use For |
|-------|------|---------|
| 1 | CSS Transitions | hover, focus, color changes, simple state changes |
| 2 | View Transitions API | page navigation, route changes (React 19.2 built-in) |
| 3 | Framer Motion | component mount/unmount, layout animations, gestures |
| 4 | GSAP + ScrollTrigger | scroll storytelling, complex timelines, pinning |
| 5 | Three.js / R3F | 3D scenes, particle systems, WebGL effects |

**Rule**: Always use the lightest layer that achieves the effect.

### 2. GSAP Animation Pattern

```tsx
"use client"

import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useReducedMotion } from "@/hooks/use-reduced-motion"

gsap.registerPlugin(ScrollTrigger)

interface AnimatedSectionProps {
  children: React.ReactNode
  className?: string
}

export function AnimatedSection({ children, className }: AnimatedSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()

  useGSAP(() => {
    if (prefersReducedMotion) return

    const elements = containerRef.current?.querySelectorAll("[data-animate]")
    if (!elements) return

    gsap.from(elements, {
      opacity: 0,
      y: 40,
      duration: 0.8,
      stagger: 0.1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    })
  }, { scope: containerRef })

  return <div ref={containerRef} className={className}>{children}</div>
}
```

### 3. Common Scroll Animation Patterns

```
Fade Up:       opacity 0→1, y 40→0, duration 0.8
Fade In:       opacity 0→1, duration 0.6
Stagger:       children appear sequentially (stagger: 0.1)
Parallax:      y movement at slower speed (speed: 0.5)
Scale Reveal:  scale 0.95→1 + opacity 0→1
Clip Reveal:   clipPath inset animation (direction-based)
Pin Section:   pin container, animate inner content on scroll
Text Reveal:   SplitText + stagger per character/word
Counter:       number counting animation on viewport entry
```

### 4. Three.js / R3F Pattern

```tsx
// Always lazy load Three.js components
import dynamic from "next/dynamic"

const HeroScene = dynamic(
  () => import("@/components/three/HeroScene").then(m => ({ default: m.HeroScene })),
  { ssr: false, loading: () => <div className="h-screen bg-background" /> }
)
```

### 5. Performance Rules (MANDATORY)

- **ALWAYS** check `prefers-reduced-motion` before applying any animation
- **ALWAYS** lazy load GSAP and Three.js with dynamic imports
- **NEVER** animate layout properties (`width`, `height`, `top`, `left`) — use `transform` and `opacity`
- **NEVER** leave `will-change` permanently — apply before animation, remove after
- Use `ScrollTrigger` with `toggleActions: "play none none none"` to animate once
- Throttle/debounce scroll event listeners
- Dispose Three.js geometries, materials, textures in cleanup
- Simplify 3D scenes on mobile (reduce polygon count, disable post-processing)

### 6. Accessibility (MANDATORY)

```tsx
import { useReducedMotion } from "@/hooks/use-reduced-motion"

function AnimatedComponent() {
  const prefersReducedMotion = useReducedMotion()

  // Skip all animations if user prefers reduced motion
  if (prefersReducedMotion) {
    return <StaticFallback />
  }

  return <AnimatedVersion />
}
```
