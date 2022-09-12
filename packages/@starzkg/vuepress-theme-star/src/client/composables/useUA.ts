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

export type UAParserRef = ComputedRef<UAParser>

export const uaSymbol: InjectionKey<UAParserRef> = Symbol('ua')

/**
 * Inject ua global computed
 */
export const useUA = (): UAParserRef => {
  const ua = inject(uaSymbol)
  if (!ua) {
    throw new Error('useUA() is called without provider.')
  }
  return ua
}

/**
 * Create ua ref and provide as global computed in setup
 */
export const setupUA = (): void => {
  const uaParser = ref(new UAParser())
  const loadUA = (): void => {
    uaParser.value = new UAParser()
  }

  onMounted(() => {
    window.addEventListener('resize', loadUA)
  })
  onUnmounted(() => {
    window.removeEventListener('resize', loadUA)
  })

  provide(
    uaSymbol,
    computed(() => {
      return uaParser.value
    })
  )
}
