import { Container } from "@/components/ui/container"
import { Section } from "@/components/ui/section"
import { GlassCard } from "@/components/ui/glass-card"
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid"
import { Button } from "@/components/ui/button"
import { SkipNav } from "@/components/layout/skip-nav"

export default function Home() {
  return (
    <>
      <SkipNav />
      <main id="main-content" className="min-h-screen">
        <Section spacing="lg" container>
          <h1 className="text-4xl font-bold tracking-tight">Portfolio</h1>
          <p className="mt-4 text-muted-foreground">Phase 1 Foundation</p>

          <div className="mt-8 flex gap-4">
            <Button>Primary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
          </div>

          <BentoGrid columns={3} className="mt-12">
            <BentoGridItem colSpan={2} rowSpan={2}>
              <GlassCard hover padding="lg" className="h-full">
                <h2 className="text-2xl font-semibold">Featured</h2>
                <p className="mt-2 text-muted-foreground">colSpan=2, rowSpan=2</p>
              </GlassCard>
            </BentoGridItem>
            <BentoGridItem>
              <GlassCard hover className="h-full">
                <h3 className="text-lg font-medium">Card 1</h3>
              </GlassCard>
            </BentoGridItem>
            <BentoGridItem>
              <GlassCard hover className="h-full">
                <h3 className="text-lg font-medium">Card 2</h3>
              </GlassCard>
            </BentoGridItem>
            <BentoGridItem colSpan={2}>
              <GlassCard hover className="h-full">
                <h3 className="text-lg font-medium">Wide Card</h3>
                <p className="mt-1 text-sm text-muted-foreground">colSpan=2</p>
              </GlassCard>
            </BentoGridItem>
            <BentoGridItem>
              <GlassCard hover className="h-full">
                <h3 className="text-lg font-medium">Card 3</h3>
              </GlassCard>
            </BentoGridItem>
          </BentoGrid>
        </Section>
      </main>
    </>
  )
}
