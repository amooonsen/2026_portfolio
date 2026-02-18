/**
 * 프로젝트 더미 썸네일 경로 목록.
 * Notion/Markdown에 썸네일이 없는 프로젝트에 순환 할당된다.
 * 실제 썸네일이 준비되면 각 프로젝트 데이터에 직접 지정하고, 이 fallback은 제거한다.
 */
const PLACEHOLDER_THUMBNAILS = [
  "/images/projects/placeholder-1.svg", // Dashboard / Analytics
  "/images/projects/placeholder-2.svg", // Code Editor
  "/images/projects/placeholder-3.svg", // Mobile App
  "/images/projects/placeholder-4.svg", // E-commerce
  "/images/projects/placeholder-5.svg", // Design Tool
  "/images/projects/placeholder-6.svg", // Cloud Infra
] as const

/** 인덱스 기반으로 더미 썸네일 경로를 반환한다. */
export function getPlaceholderThumbnail(index: number): string {
  return PLACEHOLDER_THUMBNAILS[index % PLACEHOLDER_THUMBNAILS.length]
}
