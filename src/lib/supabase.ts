import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

/**
 * 브라우저 / 서버 컴포넌트 공용 클라이언트 (anon key)
 * - 읽기 전용 public 데이터 접근에 사용
 */
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

/**
 * 서버 전용 admin 클라이언트 (service role key)
 * - 절대로 브라우저에서 사용하지 말 것
 * - Server Action, API Route, Server Component에서만 사용
 */
export function createAdminClient() {
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!serviceRoleKey) {
    throw new Error("SUPABASE_SERVICE_ROLE_KEY is not defined")
  }
  return createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false },
  })
}
