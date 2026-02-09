import { Section } from "@/components/ui/section"
import { GlassCard } from "@/components/ui/glass-card"
import { TechBadge } from "@/components/ui/tech-badge"
import { GradientText } from "@/components/ui/gradient-text"
import { FadeIn } from "@/components/animation/fade-in"
import { StaggerChildren } from "@/components/animation/stagger-children"

interface TechItem {
  name: string
  icon?: React.ReactNode
}

interface TechCategory {
  name: string
  items: TechItem[]
}

interface TechStackProps {
  categories: TechCategory[]
}

/**
 * 기술 스택 섹션 컴포넌트.
 * 카테고리별로 그룹화하여 TechBadge를 flex-wrap 레이아웃으로 나열한다.
 * @param props.categories - 기술 카테고리 배열 (Frontend, Backend, DevOps 등)
 */
export function TechStack({ categories }: TechStackProps) {
  return (
    <Section id="tech" spacing="lg" container>
      <FadeIn>
        <GradientText as="h2" gradient="primary" className="text-3xl font-bold">
          Tech Stack
        </GradientText>
        <p className="mt-2 text-muted-foreground">
          주력으로 사용하는 기술들입니다.
        </p>
      </FadeIn>

      <StaggerChildren className="mt-10 grid gap-6 md:grid-cols-2">
        {categories.map((category) => (
          <GlassCard key={category.name} padding="lg">
            <h3 className="mb-4 text-lg font-semibold">{category.name}</h3>
            <div className="flex flex-wrap gap-2">
              {category.items.map((item) => (
                <TechBadge
                  key={item.name}
                  name={item.name}
                  icon={item.icon}
                  variant="outline"
                />
              ))}
            </div>
          </GlassCard>
        ))}
      </StaggerChildren>
    </Section>
  )
}

export type { TechCategory, TechItem }
