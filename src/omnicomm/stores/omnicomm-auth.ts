import {
  createGlobalState,
  createSharedComposable,
  tryOnMounted,
  whenever,
} from '@vueuse/core'
import { readonly, ref } from 'vue'
import type { JwtPayload } from 'jwt-decode'
import jwtDecode from 'jwt-decode'
import { omnicommAuthService } from '@/omnicomm/services/omnicomm-auth'

const useGlobalState = createGlobalState(() => ({
  jwt: ref<string>(),
  refresh: ref<string>(),
}))

export const useOmnicommAuth = createSharedComposable(() => {
  const { jwt, refresh } = useGlobalState()

  function wait() {
    return new Promise<void>((resolve) => {
      if (jwt.value) {
        resolve()
      }
      else {
        const stop = whenever(jwt, () => {
          stop()
          resolve()
        })
      }
    })
  }

  function schedule() {
    if (jwt.value) {
      const { exp } = jwtDecode<JwtPayload>(jwt.value)
      const now = new Date().getTime() / 1000
      const time = (exp! - now - 10) * 1000

      setTimeout(rotate, time)
    }
  }

  async function rotate() {
    if (refresh.value) {
      const { data } = await omnicommAuthService.refresh(refresh.value)
      jwt.value = data.jwt
      refresh.value = data.refresh

      schedule()
    }
  }

  async function login() {
    const { data } = await omnicommAuthService.login(import.meta.env.VITE_OMNICOMM_LOGIN, import.meta.env.VITE_OMNICOMM_PASSWORD)
    jwt.value = data.jwt
    refresh.value = data.refresh

    schedule()
  }

  tryOnMounted(login)

  return {
    jwt: readonly(jwt),

    wait,
  }
})
