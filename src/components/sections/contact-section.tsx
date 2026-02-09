"use client"

import { useActionState } from "react"
import { submitContactForm } from "@/app/actions"
import { Section } from "@/components/ui/section"
import { GlassCard } from "@/components/ui/glass-card"
import { GradientText } from "@/components/ui/gradient-text"
import { Button } from "@/components/ui/button"
import { IconButton } from "@/components/ui/icon-button"
import { FadeIn } from "@/components/animation/fade-in"
import { SlideUp } from "@/components/animation/slide-up"
import { cn } from "@/lib/utils"

interface Social {
  platform: string
  url: string
  icon: React.ReactNode
}

interface ContactSectionProps {
  email: string
  socials: Social[]
}

/**
 * 연락처 섹션 컴포넌트.
 * Server Action 기반 폼과 소셜 링크를 포함한다.
 * useActionState로 폼 상태를 관리한다.
 * @param props.email - 이메일 주소
 * @param props.socials - 소셜 미디어 링크 배열
 */
export function ContactSection({ email, socials }: ContactSectionProps) {
  const [state, action, isPending] = useActionState(submitContactForm, {
    success: false,
    message: "",
  })

  return (
    <Section spacing="lg" container containerSize="md">
      <FadeIn>
        <div className="text-center">
          <GradientText
            as="h2"
            gradient="accent"
            className="text-3xl font-bold"
          >
            Get in Touch
          </GradientText>
          <p className="mt-4 text-muted-foreground">
            새로운 프로젝트나 협업에 관심이 있으시다면 편하게 연락해 주세요.
          </p>
        </div>
      </FadeIn>

      <SlideUp delay={0.2}>
        <GlassCard padding="lg" className="mx-auto mt-10 max-w-xl">
          <form action={action} className="space-y-6">
            <div>
              <label htmlFor="name" className="mb-2 block text-sm font-medium">
                이름
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                placeholder="홍길동"
                className="w-full rounded-lg border border-border bg-background/50 px-4 py-3 text-sm placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>

            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-medium">
                이메일
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="hello@example.com"
                className="w-full rounded-lg border border-border bg-background/50 px-4 py-3 text-sm placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="mb-2 block text-sm font-medium"
              >
                메시지
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                placeholder="프로젝트에 대해 알려주세요..."
                className="w-full resize-none rounded-lg border border-border bg-background/50 px-4 py-3 text-sm placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>

            {state.message && (
              <p
                className={cn(
                  "text-sm",
                  state.success ? "text-green-500" : "text-destructive"
                )}
              >
                {state.message}
              </p>
            )}

            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? "전송 중..." : "메시지 보내기"}
            </Button>
          </form>
        </GlassCard>
      </SlideUp>

      <FadeIn delay={0.4}>
        <div className="mt-10 flex items-center justify-center gap-2">
          {socials.map((social) => (
            <IconButton
              key={social.platform}
              icon={social.icon}
              label={social.platform}
              href={social.url}
              variant="outline"
              size="lg"
            />
          ))}
        </div>
        <p className="mt-4 text-center text-sm text-muted-foreground">
          {email}
        </p>
      </FadeIn>
    </Section>
  )
}
