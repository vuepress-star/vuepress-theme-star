import { UAParser } from 'ua-parser-js'
import type { InjectionKey } from 'vue'
import {
  computed,
  ComputedRef,
  inject,
  onMounted,
  onUnmounted,
  provide,
  ref,
} from 'vue'

export type UserAgentRef = ComputedRef<UAParser>

export const userAgentSymbol: InjectionKey<UserAgentRef> = Symbol('user-agent')

/**
 * Inject user agent global computed
 */
export const useUserAgent = (): UserAgentRef => {
  const userAgent = inject(userAgentSymbol)
  if (!userAgent) {
    throw new Error('useUserAgent() is called without provider.')
  }
  return userAgent
}

/**
 * Create user agent ref and provide as global computed in setup
 */
export const setupUserAgent = (): void => {
  const userAgent = ref(new UAParser())
  const loadUA = (): void => {
    userAgent.value = new UAParser()
  }

  onMounted(() => {
    window.addEventListener('resize', loadUA)
  })
  onUnmounted(() => {
    window.removeEventListener('resize', loadUA)
  })

  provide(
    userAgentSymbol,
    computed(() => {
      return userAgent.value
    })
  )
}
