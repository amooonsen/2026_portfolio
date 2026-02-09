---
name: create-page
description: Creates a new page in the Next.js 16 App Router with proper metadata, caching strategy, and layout integration.
---

# Create Page

## Use this skill when
- User asks to create a new route/page
- User wants to add a new section to the portfolio site
- User needs a dynamic route (e.g., project detail page)

## Do not use this skill when
- User is creating a standalone component (use create-component)
- User is modifying an existing page (edit directly)
- User is adding animation to a page (use create-animation)

## Instructions

1. **Determine route group**:
   - `src/app/(portfolio)/` — main portfolio sections (about, projects, experience, contact)
   - `src/app/(content)/` — blog and writing content
   - `src/app/` (root) — landing page, error pages, not-found

2. **Create required files**:

   **page.tsx** (required):
   ```tsx
   import type { Metadata } from "next"

   export const metadata: Metadata = {
     title: "Page Title",
     description: "SEO description for this page",
     openGraph: {
       title: "Page Title",
       description: "OG description",
       images: ["/og/page-name.png"],
     },
   }

   export default function PageName() {
     return (
       <main className="container mx-auto px-4">
         {/* Compose with section components */}
       </main>
     )
   }
   ```

   **loading.tsx** (if page has async data):
   ```tsx
   export default function Loading() {
     return <PageSkeleton />
   }
   ```

   **error.tsx** (if page needs error boundary):
   ```tsx
   "use client"

   export default function Error({
     error,
     reset,
   }: {
     error: Error & { digest?: string }
     reset: () => void
   }) {
     return (
       <div>
         <h2>Something went wrong</h2>
         <button onClick={() => reset()}>Try again</button>
       </div>
     )
   }
   ```

3. **Apply caching strategy**:
   - Static content (About, Projects list) → add `"use cache"` directive
   - Dynamic content (Contact form, filtered lists) → default request-time rendering
   - Mixed → cache static server components, stream dynamic parts with `<Suspense>`

4. **For dynamic routes** (`[slug]`):
   ```tsx
   interface PageProps {
     params: Promise<{ slug: string }>
   }

   export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
     const { slug } = await params
     // Generate metadata from slug
   }

   export default async function ProjectPage({ params }: PageProps) {
     const { slug } = await params
     // Fetch and render content
   }

   // Optional: pre-generate static paths
   export async function generateStaticParams() {
     return [{ slug: "project-1" }, { slug: "project-2" }]
   }
   ```

5. **Important Next.js 16 notes**:
   - `params` and `searchParams` are now `Promise` types (must be awaited)
   - Use `proxy.ts` instead of `middleware.ts` for request handling
   - Pages are Server Components by default
