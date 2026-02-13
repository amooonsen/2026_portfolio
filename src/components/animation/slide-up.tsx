import { FadeIn } from "./fade-in"

interface SlideUpProps {
  children: React.ReactNode
  className?: string
  delay?: number
  duration?: number
  distance?: number
}

/**
 * FadeIn의 단축 래퍼 컴포넌트.
 * direction="up"이 고정되어 아래에서 위로 슬라이드하며 등장한다.
 * @param props.delay - 애니메이션 시작 지연 시간 (초)
 * @param props.duration - 애니메이션 지속 시간 (초)
 * @param props.distance - 이동 거리 (px)
 */
export function SlideUp(props: SlideUpProps) {
  return <FadeIn direction="up" {...props} />
}
