import { createClient } from '@supabase/supabase-js'
import { resolveHworkBearerToken } from '@/services/hwork-context.js'
import * as Const from '@/tool/const.js'

const AUTH_LOG = '[obaas-auth]'

function tokenPreview(t) {
  if (!t || typeof t !== 'string') return '(empty)'
  const n = t.length
  if (n <= 12) return `len=${n} <redacted>`
  return `len=${n} ${t.slice(0, 8)}…${t.slice(-4)}`
}

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

/**
 * 网关把路径段 `/rd/obaas/instances/{segment}` 转发到与实例域名一致的 host：
 * - main/master：{instanceId}.xxx.com → segment = instanceId
 * - 其他分支：preview-{branch}--{instanceId}.xxx.com → segment = preview-{branch}--{instanceId}
 */
function resolveGatewayInstancePathSegment() {
  const instanceId = resolveInstanceIdForProd()
  if (!instanceId) return ''
  const branch = (import.meta.env.VITE_GIT_BRANCH || '').trim()
  if (!branch || branch === 'main' || branch === 'master') return instanceId
  return `preview-${branch}--${instanceId}`
}

/** 与 createClient 使用的绝对 URL 一致（OAuth authorize 也必须指向此根路径） */
export function getSupabaseUrl() {
  if (Const.IS_HWORK_QIANKUN || location.host.indexOf('preview') === 0) {
    const origin =
      (import.meta.env.VITE_BASE_URL || '').trim().replace(/\/$/, '') || getSiteOrigin()
    const segment = resolveGatewayInstancePathSegment()
    if (!segment) return origin
    return `${origin}/rd/obaas/instances/${segment}`
  }
  return location.origin
}

const SUPABASE_URL = getSupabaseUrl()
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key'

function hashQueryString() {
  const h = window.location.hash?.replace(/^#/, '') || ''
  if (!h) return ''
  const qMark = h.indexOf('?')
  if (qMark !== -1) return h.slice(qMark + 1)
  if (h.includes('access_token=') || h.includes('refresh_token=')) return h
  return ''
}

function parseAuthParamsFromLocation() {
  if (typeof window === 'undefined') return null
  const fromSearch = new URLSearchParams(window.location.search)
  const fromHash = new URLSearchParams(hashQueryString())
  const accessToken = fromSearch.get('access_token') || fromHash.get('access_token')
  if (!accessToken) return null
  const refreshToken = fromSearch.get('refresh_token') || fromHash.get('refresh_token') || ''
  console.info(
    AUTH_LOG,
    'URL callback: access_token (search and/or hash fragment)',
    tokenPreview(accessToken),
    'refresh_token:',
    refreshToken ? tokenPreview(refreshToken) : '(none)'
  )
  return { accessToken, refreshToken }
}

let urlAuthFromCallback = typeof window !== 'undefined' ? parseAuthParamsFromLocation() : null

export function isUrlInjectedBearerActive() {
  return !!urlAuthFromCallback?.accessToken
}

export function getUrlInjectedAccessToken() {
  return urlAuthFromCallback?.accessToken ?? null
}

const URL_AUTH_STRIP_KEYS = ['access_token', 'refresh_token', 'type', 'expires_in', 'token_type']

export function stripCallbackTokensFromBrowserUrl() {
  if (typeof window === 'undefined') return

  // preview-init-- 开头的域名跳过清除 URL 逻辑
  const hostname = window.location.hostname
  if (hostname.startsWith('preview-init--')) {
    console.info(AUTH_LOG, 'skip stripCallbackTokensFromBrowserUrl for preview-init domain')
    return
  }

  const url = new URL(window.location.href)
  let changed = false
  for (const k of URL_AUTH_STRIP_KEYS) {
    if (url.searchParams.has(k)) {
      url.searchParams.delete(k)
      changed = true
    }
  }
  const hash = window.location.hash
  if (hash && (hash.includes('access_token') || hash.includes('refresh_token'))) {
    const inner = hash.startsWith('#') ? hash.slice(1) : hash
    const qIdx = inner.indexOf('?')
    if (qIdx !== -1) {
      const pathPart = inner.slice(0, qIdx)
      const sp = new URLSearchParams(inner.slice(qIdx + 1))
      for (const k of URL_AUTH_STRIP_KEYS) sp.delete(k)
      const q = sp.toString()
      url.hash = q ? `#${pathPart}?${q}` : pathPart ? `#${pathPart}` : ''
    } else {
      const sp = new URLSearchParams(inner)
      for (const k of URL_AUTH_STRIP_KEYS) sp.delete(k)
      const q = sp.toString()
      url.hash = q ? `#${q}` : ''
    }
    changed = true
  }
  if (changed) {
    window.history.replaceState(null, '', url.pathname + url.search + url.hash)
  }
}

/**
 * 1) URL access_token：为 REST/auth 请求注入 Bearer（与是否乾坤无关）。
 * 2) 否则乾坤下且无 Authorization 时注入 Hwork / iamToken。
 */
async function supabaseCustomFetch(input, init = {}) {
  const h = init.headers
  const headers = h instanceof Headers ? new Headers(h) : new Headers(h || {})
  if (urlAuthFromCallback?.accessToken) {
    headers.set('Authorization', `Bearer ${urlAuthFromCallback.accessToken}`)
  } else if (Const.IS_HWORK_QIANKUN) {
    const bearer = await resolveHworkBearerToken()
    if (bearer) headers.set('Authorization', `Bearer ${bearer}`)
  }
  return fetch(input, { ...init, headers })
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: false,
    storageKey: 'supabase-auth-haier2'
  },
  global: {
    fetch: supabaseCustomFetch
  }
})

export const urlAuthBootstrapPromise = urlAuthFromCallback?.accessToken
  ? supabase.auth
      .setSession({
        access_token: urlAuthFromCallback.accessToken,
        refresh_token: urlAuthFromCallback.refreshToken || ''
      })
      .then(({ error, data }) => {
        // 无论成功失败，都清除 URL 中的 token
        stripCallbackTokensFromBrowserUrl()
        if (!error && data?.session) {
          urlAuthFromCallback = null
          console.info(
            AUTH_LOG,
            'setSession from URL OK, user:',
            data.session.user?.id ?? '(unknown)',
            'expires_at:',
            data.session.expires_at ?? '?'
          )
        } else if (error) {
          console.warn(AUTH_LOG, 'setSession from URL failed:', error.message)
        }
        return { error, data }
      })
      .catch((err) => {
        // 出错也要清除 URL 中的 token
        stripCallbackTokensFromBrowserUrl()
        console.warn(
          AUTH_LOG,
          'setSession from URL error:',
          err instanceof Error ? err.message : String(err)
        )
        return { error: err, data: null }
      })
  : Promise.resolve({ error: null, data: null })

export async function getAccessToken() {
  const fromUrl = getUrlInjectedAccessToken()
  if (fromUrl) return fromUrl
  const {
    data: { session }
  } = await supabase.auth.getSession()
  return session?.access_token || null
}

export async function signOut() {
  urlAuthFromCallback = null
  const { error } = await supabase.auth.signOut()
  if (error) throw error
}
