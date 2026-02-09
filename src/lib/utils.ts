import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * clsx와 tailwind-merge를 조합하여 Tailwind CSS 클래스를 병합한다.
 * 충돌하는 유틸리티 클래스를 자동으로 해결한다.
 * @param inputs - 병합할 CSS 클래스 값 배열
 * @returns 병합된 CSS 클래스 문자열
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
