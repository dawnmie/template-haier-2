/**
 * 海尔模板固定使用 GoTrue 的 hwork（海尔 OAuth2），不读取多 provider。
 */
export const HAIER_OAUTH_PROVIDER = 'hwork'

/**
 * @param {string} [redirectTo] 登录完成回跳地址，默认当前页 path+search
 * @param {string} [apiBase] GoTrue 所在源（须与 createClient 的 URL 一致）。不传则使用相对路径（仅当页面与 API 同源时可用）。
 */
export function getHaierAuthorizeUrl(redirectTo, apiBase) {
  const u = redirectTo ?? window.location.origin + window.location.pathname + window.location.search
  const path = `/auth/v1/authorize?provider=${HAIER_OAUTH_PROVIDER}&redirect_to=${encodeURIComponent(u)}`
  const base = apiBase !== undefined && apiBase !== null ? String(apiBase).replace(/\/$/, '') : ''
  if (base) return `${base}${path}`
  return path
}
