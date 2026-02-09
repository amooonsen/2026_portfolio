# Component Patterns

## Server Component (Default)
- No directive needed — all components are Server Components by default
- Can use async/await for data fetching directly in the component
- Cannot use useState, useEffect, useRef, or event handlers
- Has access to file system, environment variables, server-only APIs
- Render cost is zero on the client (HTML streamed from server)

```tsx
// src/components/sections/ProjectGrid.tsx (Server Component)
import { getProjects } from "@/lib/data"

export async function ProjectGrid() {
  const projects = await getProjects()
  return (
    <section aria-label="Projects">
      {projects.map((p) => (
        <ProjectCard key={p.slug} project={p} />
      ))}
    </section>
  )
}
```

## Client Component
- `"use client"` directive required at the top of the file
- Needed for: state, effects, event handlers, browser APIs, animations
- Keep as small as possible — push client boundaries down the component tree
- Prefer composition: Server Component parent → Client Component child

```tsx
// src/components/ui/ThemeToggle.tsx (Client Component)
"use client"

import { useState } from "react"

export function ThemeToggle() {
  const [theme, setTheme] = useState<"dark" | "light">("dark")
  // ...
}
```

## Cached Component
- `"use cache"` directive for expensive server computations
- Compiler auto-generates cache keys
- Use for: static content, rarely-changing data, expensive queries

```tsx
// src/components/sections/AboutContent.tsx
"use cache"

export async function AboutContent() {
  const content = await getAboutContent()
  return <div>{content}</div>
}
```

## Composition Pattern
- Server Component wraps Client Component
- Data flows down: fetch in server, pass as props to client
- Keep interactivity at the leaves of the component tree

```tsx
// Server Component (parent)
export async function ProjectSection() {
  const projects = await getProjects()
  return <ProjectCarousel projects={projects} /> // Client component
}
```

## Animation Components
- Always client components (`"use client"`)
- Use `useRef` for DOM element references
- Use `useGSAP()` hook for GSAP lifecycle management (NOT useEffect)
- Always check `useReducedMotion()` before applying animations
- Register GSAP plugins outside the component or in useGSAP

```tsx
"use client"

import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useReducedMotion } from "@/hooks/use-reduced-motion"

gsap.registerPlugin(ScrollTrigger)

export function FadeInSection({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()

  useGSAP(() => {
    if (prefersReducedMotion) return
    gsap.from(ref.current, {
      opacity: 0,
      y: 40,
      duration: 0.8,
      scrollTrigger: { trigger: ref.current, start: "top 80%" },
    })
  }, { scope: ref })

  return <div ref={ref}>{children}</div>
}
```

## Three.js Components
- Dynamic import with `next/dynamic` and `ssr: false`
- Always wrap in `<Suspense>` with a loading fallback
- Canvas (`<Canvas>`) only inside client components
- Dispose geometries, materials, and textures in cleanup functions
- Reduce quality/complexity on mobile devices

```tsx
// src/components/three/HeroScene.tsx
"use client"

import { Canvas } from "@react-three/fiber"
import { Suspense } from "react"

export function HeroScene() {
  return (
    <Suspense fallback={<HeroFallback />}>
      <Canvas>
        {/* R3F components */}
      </Canvas>
    </Suspense>
  )
}
```

```tsx
// Lazy loading in page
import dynamic from "next/dynamic"
const HeroScene = dynamic(() =>
  import("@/components/three/HeroScene").then(m => ({ default: m.HeroScene })),
  { ssr: false, loading: () => <HeroFallback /> }
)
```

## Accessibility Checklist
- Use semantic HTML elements (`<section>`, `<article>`, `<nav>`, `<main>`)
- Add `aria-label` for sections without visible headings
- Ensure all interactive elements are keyboard-accessible
- Provide `aria-expanded`, `aria-controls` for toggleable elements
- All images have descriptive `alt` text
- `prefers-reduced-motion` respected for all animations
- Color contrast ≥ 4.5:1 (WCAG AA)
- Focus indicators visible on all interactive elements
