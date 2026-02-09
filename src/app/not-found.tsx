import Link from "next/link"
import { Container } from "@/components/ui/container"
import { GradientText } from "@/components/ui/gradient-text"
import { Button } from "@/components/ui/button"

/**
 * 404 페이지 컴포넌트.
 * 존재하지 않는 라우트 접근 시 표시된다.
 */
export default function NotFound() {
  return (
    <Container className="flex min-h-[calc(100vh-8rem)] flex-col items-center justify-center text-center">
      <GradientText
        as="h1"
        gradient="accent"
        className="text-8xl font-bold md:text-9xl"
      >
        404
      </GradientText>
      <p className="mt-4 text-lg text-muted-foreground">
        페이지를 찾을 수 없습니다.
      </p>
      <Button asChild className="mt-8">
        <Link href="/">홈으로 돌아가기</Link>
      </Button>
    </Container>
  )
}
