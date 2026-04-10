import { ref, onMounted, onUnmounted } from 'vue'
import {
  supabase,
  getSupabaseUrl,
  urlAuthBootstrapPromise,
  isUrlInjectedBearerActive,
  getUrlInjectedAccessToken,
  stripCallbackTokensFromBrowserUrl
} from '@/services/supabase'
import { getHaierAuthorizeUrl } from '@/services/config'

function jwtPayload(accessToken) {
  try {
    const part = accessToken.split('.')[1]
    if (!part) return null
    const b64 = part.replace(/-/g, '+').replace(/_/g, '/')
    const pad = b64.length % 4
    const padded = pad ? b64 + '='.repeat(4 - pad) : b64
    return JSON.parse(atob(padded))
  } catch {
    return null
  }
}

function userStubFromUrlToken(accessToken) {
  const p = jwtPayload(accessToken)
  if (!p) {
    return { id: 'url-bearer', app_metadata: {}, user_metadata: {}}
  }
  return {
    id: String(p.sub ?? 'url-bearer'),
    email: p.email,
    app_metadata: p.app_metadata ?? {},
    user_metadata: p.user_metadata ?? {},
    aud: p.aud,
    role: p.role
  }
}

async function fetchValidatedUser() {
  const {
    data: { user }
  } = await supabase.auth.getUser()
  if (user) return user
  await new Promise((r) => setTimeout(r, 120))
  const {
    data: { user: retryUser }
  } = await supabase.auth.getUser()
  return retryUser ?? null
}

/**
 * 与 template-haier 对齐：URL token 走 supabase.js 的 setSession + custom fetch；
 * setSession 失败但 URL Bearer 仍注入时不再整页跳转 OAuth（仅依赖 Bearer 调 REST）。
 */
export function useAppAuth() {
  const user = ref(null)
  const loading = ref(true)

  onMounted(() => {
    let mounted = true
    let redirectScheduled = false
    let subscription = null

    function redirectToHaierOAuth() {
      if (redirectScheduled || !mounted) return
      redirectScheduled = true
      const redirectTo = window.location.origin + window.location.pathname + window.location.search
      window.location.href = getHaierAuthorizeUrl(redirectTo, getSupabaseUrl())
    }

    void (async () => {
      try {
        const bootstrap = await urlAuthBootstrapPromise
        if (!mounted) return

        if (bootstrap?.data?.session?.user) {
          user.value = bootstrap.data.session.user
        } else if (isUrlInjectedBearerActive()) {
          const token = getUrlInjectedAccessToken()
          user.value = userStubFromUrlToken(token)
          stripCallbackTokensFromBrowserUrl()
        } else {
          const validated = await fetchValidatedUser()
          if (!mounted) return
          if (!validated) {
            redirectToHaierOAuth()
            return
          }
          user.value = validated
        }
      } catch {
        if (mounted) redirectToHaierOAuth()
        return
      }

      if (!mounted) return
      loading.value = false

      const {
        data: { subscription: sub }
      } = supabase.auth.onAuthStateChange(async (event, session) => {
        if (!mounted) return
        if (isUrlInjectedBearerActive()) {
          if (session?.user) user.value = session.user
          return
        }
        if (!session) {
          user.value = null
          if (event === 'SIGNED_OUT') {
            redirectToHaierOAuth()
          }
          return
        }
        const {
          data: { user: u },
          error
        } = await supabase.auth.getUser()
        if (!mounted) return
        user.value = !error && u ? u : null
      })
      if (!mounted) {
        sub.unsubscribe()
        return
      }
      subscription = sub
    })()

    onUnmounted(() => {
      mounted = false
      subscription?.unsubscribe()
    })
  })

  return { user, loading }
}
