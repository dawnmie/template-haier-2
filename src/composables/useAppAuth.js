import { ref, onMounted, onUnmounted } from 'vue'
import { supabase, getSupabaseUrl } from '@/services/supabase'
import { getHaierAuthorizeUrl } from '@/services/config'

/** 用 GoTrue 校验 JWT；短延迟二次请求便于微前端异步注入 token / session */
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
 * 与 template-haier 一致：OAuth 回调带 token 时 setSession；否则依赖持久化 session + Hwork 注入的 Bearer。
 * 仍无用户则整页跳转 hwork OAuth（authorize URL 须指向与 Supabase client 相同的 api 根）。
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
      const hash = window.location.hash?.replace(/^#/, '') || ''
      const search = window.location.search?.replace(/^\?/, '') || ''
      const params = new URLSearchParams(hash || search)
      const accessToken = params.get('access_token')
      const refreshToken = params.get('refresh_token')

      try {
        if (accessToken) {
          const {
            data: { session },
            error
          } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken || ''
          })
          if (!mounted) return
          if (error || !session) {
            redirectToHaierOAuth()
            return
          }
          const {
            data: { user: validated },
            error: userErr
          } = await supabase.auth.getUser()
          if (!mounted) return
          if (userErr || !validated) {
            redirectToHaierOAuth()
            return
          }
          user.value = validated
          window.history.replaceState(null, '', window.location.pathname + window.location.search)
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
