import { createClient } from '@supabase/supabase-js'
import { resolveHworkBearerToken } from '@/services/hwork-context.js'
import * as Const from '@/tool/const.js'
/**
 * 页面与应用 API 同源时用 location.origin；若前端与网关不同源，可设 VITE_SUPABASE_PUBLIC_URL。
 */
function getSiteOrigin() {
  const fromEnv = (
    import.meta.env.VITE_SUPABASE_PUBLIC_URL ||
    import.meta.env.VITE_PUBLIC_APP_ORIGIN ||
    ''
  ).trim()
  if (fromEnv) return fromEnv.replace(/\/$/, '')
  return window.location.origin.replace(/\/$/, '')
}

function resolveInstanceIdFromHost() {
  const host = window.location.hostname
  const preview = host.match(/^preview-[a-z0-9-]+--([^.]+)\./i)
  if (preview) return preview[1]

  if (host === 'localhost' || host === '127.0.0.1') return ''

  const first = host.split('.')[0]
  return first || ''
}

function resolveInstanceIdForProd() {
  const fromEnv = (import.meta.env.VITE_OBAAS_INSTANCE_ID || '').trim()
  if (fromEnv) return fromEnv
  return resolveInstanceIdFromHost()
}

/** 构建阶段已注入完整实例 API 根路径（含 /rd/obaas/instances/{id}）时为 true */
function isFullHworkInstanceApiBase(u) {
  return typeof u === 'string' && /\/rd\/obaas\/instances\/[^/]+/.test(u)
}

/** 与 createClient 使用的绝对 URL 一致（OAuth authorize 也必须指向此根路径） */
export function getSupabaseUrl() {
  if (Const.IS_HWORK_QIANKUN) {
    const raw = (import.meta.env.VITE_BASE_URL || '').trim().replace(/\/$/, '')
    const origin = raw || getSiteOrigin()
    const branch = (import.meta.env.VITE_GIT_BRANCH || '').trim()
    if (branch && branch !== 'main' && branch !== 'master') {
      return origin
    }
    if (isFullHworkInstanceApiBase(origin)) {
      return origin
    }
    const id = resolveInstanceIdForProd()
    if (!id) return origin
    return `${origin}/rd/obaas/instances/${id}`
  }
  return getSiteOrigin()
}

const SUPABASE_URL = getSupabaseUrl()
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key'

/**
 * 在 Supabase 未自带 Authorization 时注入 Hwork / iamToken（便于 getUser 等 /auth/v1 请求）。
 * 已有 session 时客户端会设置 Bearer，此处不覆盖。
 */
async function supabaseCustomFetch(input, init = {}) {
  const h = init.headers
  const headers = h instanceof Headers ? new Headers(h) : new Headers(h || {})
  if (Const.IS_HWORK_QIANKUN) {
    const bearer = await resolveHworkBearerToken()
    if (bearer) headers.set('Authorization', `Bearer ${bearer}`)
  }
  return fetch(input, { ...init, headers })
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    storageKey: 'supabase-auth-haier2'
  },
  global: {
    fetch: supabaseCustomFetch
  }
})

export async function getAccessToken() {
  const {
    data: { session }
  } = await supabase.auth.getSession()
  return session?.access_token || null
}

export async function signOut() {
  const { error } = await supabase.auth.signOut()
  if (error) throw error
}
