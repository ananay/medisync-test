import { ref } from 'vue'

const token = ref<string | null>(null)
const user = ref<any>(null)

export function useAuth() {
  function load() {
    if (process.client && !token.value) {
      token.value = localStorage.getItem('token')
      const u = localStorage.getItem('user')
      if (u) {
        try {
          user.value = JSON.parse(u)
        } catch {}
      }
    }
  }

  function setSession(t: string, u: any) {
    token.value = t
    user.value = u
    if (process.client) {
      localStorage.setItem('token', t)
      localStorage.setItem('user', JSON.stringify(u))
    }
  }

  function logout() {
    token.value = null
    user.value = null
    if (process.client) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      document.cookie = 'token=; Max-Age=0; path=/'
    }
  }

  function authHeaders(): Record<string, string> {
    load()
    return token.value ? { Authorization: `Bearer ${token.value}` } : {}
  }

  async function api(path: string, opts: any = {}) {
    load()
    return await $fetch(path, {
      ...opts,
      headers: { ...(opts.headers || {}), ...authHeaders() },
    })
  }

  return { token, user, load, setSession, logout, authHeaders, api }
}
