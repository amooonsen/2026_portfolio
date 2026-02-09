---
name: create-component
description: Creates a new React component following project conventions with proper typing, styling, and accessibility.
---

# Create Component

## Use this skill when
- User asks to create a new UI component
- User asks to add a new section to a page
- User needs a reusable component (button, card, badge, etc.)

## Do not use this skill when
- User is editing an existing component (edit directly)
- User is creating a new page/route (use create-page skill)
- User is adding animations to existing components (use create-animation skill)

## Instructions

1. **Determine component type**:
   - **Server Component** (default): no interactivity, can fetch data
   - **Client Component**: needs state, effects, event handlers, animations
   - **Cached Component**: expensive server computation with `"use cache"`

2. **Choose file location**:
   - `src/components/ui/` — reusable primitives (Button, Card, Badge, Input)
   - `src/components/layout/` — layout elements (Header, Footer, Navigation, Sidebar)
   - `src/components/sections/` — page sections (HeroSection, ProjectGrid, Timeline)
   - `src/components/three/` — Three.js / React Three Fiber components
   - `src/components/animation/` — GSAP/Framer Motion animation wrappers

3. **Create component file** following this template:
   ```tsx
   // "use client" — only add if component needs interactivity

   import { cn } from "@/lib/utils"

   interface ComponentNameProps {
     // Define props with JSDoc comments for complex ones
     className?: string
   }

   export function ComponentName({ className, ...props }: ComponentNameProps) {
     return (
       <div className={cn("base-styles", className)} {...props}>
         {/* Use semantic HTML elements */}
       </div>
     )
   }
   ```

4. **Apply styling rules**:
   - Tailwind CSS utility classes as primary method
   - Use `cn()` utility for conditional/merged classes
   - Accept `className` prop for external customization
   - CSS variables from globals.css for theme values
   - Responsive: mobile-first with `sm:`, `md:`, `lg:` prefixes

5. **Ensure accessibility**:
   - Use semantic HTML (`<section>`, `<article>`, `<nav>`, `<button>`)
   - Add `aria-label` for sections/elements without visible text
   - Keyboard navigation support for all interactive elements
   - Focus indicators with `focus-visible:` styles
   - Check `prefers-reduced-motion` for animated components

6. **Export pattern**:
   - Named exports for all components
   - Default export only for `page.tsx` and `layout.tsx` files
