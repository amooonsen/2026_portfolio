import {cn} from "@/lib/utils";

interface SkeletonProps {
  className?: string;
}

/**
 * 스켈레톤 로딩 플레이스홀더 컴포넌트.
 * 콘텐츠가 로드되기 전 레이아웃 구조를 미리 보여준다.
 */
export function Skeleton({className}: SkeletonProps) {
  return (
    <div
      className={cn("animate-pulse rounded-lg bg-white/[0.06]", className)}
    />
  );
}
