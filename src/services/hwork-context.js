/**
 * Hwork JSBridge：微前端 mount 时由 main 注入 props.HworkJSApi；独立窗口可回退 window.hwork。
 * iframe 内可能均无 token，则走 GoTrue hwork OAuth。
 */

let hworkApiRef = null

export function setHworkJSApi(api) {
  hworkApiRef = api || null
}

export function getHworkJSApi() {
  if (hworkApiRef) return hworkApiRef
  if (typeof window !== 'undefined' && window.hwork) return window.hwork
  return null
}

/**
 * 供 Supabase 自定义 fetch 与用户校验：优先桥接 getToken，否则 iamToken（见 main 中 localStorage）。
 * getToken 可能是同步或返回 Promise。
 */
export async function resolveHworkBearerToken() {
  const api = getHworkJSApi()
  if (api && typeof api.getToken === 'function') {
    try {
      const t = api.getToken()
      const resolved = t && typeof t.then === 'function' ? await t : t
      if (resolved != null && String(resolved).trim() !== '') {
        return String(resolved).trim()
      }
    } catch {
      /* ignore */
    }
  }

  if (typeof localStorage !== 'undefined') {
    const raw = localStorage.getItem('hwork_iamAccessToken')
    if (raw && raw.trim()) return raw.trim()
  }

  return ''
}
