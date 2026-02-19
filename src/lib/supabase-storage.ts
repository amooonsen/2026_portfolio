import { supabase } from "./supabase"

/** Storage 버킷 이름 */
const BUCKET = "assets"

/** 프로젝트 썸네일이 저장된 폴더 */
const PROJECTS_FOLDER = "projects"

/**
 * Supabase Storage에서 파일의 public URL을 반환한다.
 *
 * @param path - 버킷 내 파일 경로 (예: "projects/ai-caramel.jpg")
 * @returns 공개 URL 문자열
 *
 * @example
 * getStorageUrl("projects/ai-caramel.jpg")
 * // → "https://xxx.supabase.co/storage/v1/object/public/assets/projects/ai-caramel.jpg"
 */
export function getStorageUrl(path: string): string {
  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path)
  return data.publicUrl
}

/**
 * 프로젝트 썸네일의 public URL을 반환한다.
 *
 * @param filename - 파일명 (예: "ai-caramel.jpg")
 * @returns 공개 URL 문자열
 *
 * @example
 * getProjectThumbnailUrl("ai-caramel.jpg")
 * // → "https://xxx.supabase.co/storage/v1/object/public/assets/projects/ai-caramel.jpg"
 */
export function getProjectThumbnailUrl(filename: string): string {
  return getStorageUrl(`${PROJECTS_FOLDER}/${filename}`)
}

/**
 * Storage 버킷의 특정 폴더 내 파일 목록을 반환한다.
 * Server Component / Server Action에서만 사용 권장.
 *
 * @param folder - 폴더 경로 (기본값: "projects")
 */
export async function listStorageFiles(folder = PROJECTS_FOLDER) {
  const { data, error } = await supabase.storage.from(BUCKET).list(folder)
  if (error) throw error
  return data
}
