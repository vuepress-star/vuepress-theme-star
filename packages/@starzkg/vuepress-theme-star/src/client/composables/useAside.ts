import { usePageFrontmatter } from '@vuepress/client'
import { useEventListener, useToggle } from '@vueuse/core'
import {
  computed,
  ComputedRef,
  inject,
  InjectionKey,
  onMounted,
  onUnmounted,
  provide,
} from 'vue'
import { useRouter } from 'vue-router'
import type { StarPageFrontmatter } from '../../shared/index.js'

// eslint-disable-next-line @typescript-eslint/naming-convention
declare const __VUEPRESS_SSR__: boolean

export interface Aside {
  enable: boolean
  open: boolean
  toggle: (to?: boolean) => void
}

export type AsideRef = ComputedRef<Aside>

export const asideSymbol: InjectionKey<AsideRef> = Symbol('aside')

/**
 * Inject aside global computed
 */
export const useAside = (): AsideRef => {
  const aside = inject(asideSymbol)
  if (!aside) {
    throw new Error('useAside() is called without provider.')
  }
  return aside
}

/**
 * Create aside ref and provide as global computed in setup
 */
export const setupAside = (): void => {
  const frontmatter = usePageFrontmatter<StarPageFrontmatter>()

  const [value, toggle] = useToggle(true)

  // close aside aside after navigation
  let unregisterRouterHook

  // when window resize
  const resizeHandler = (): void => {
    if (window.innerWidth < 1440) {
      toggle(false)
    }
  }

  if (!__VUEPRESS_SSR__) {
    if (window.innerWidth < 1440) {
      toggle(false)
    }
  }

  onMounted(() => {
    const router = useRouter()
    unregisterRouterHook = router.afterEach(() => {
      if (window.innerWidth < 1440) {
        toggle(false)
      }
    })

    useEventListener('resize', resizeHandler, false)
    useEventListener('orientationchange', resizeHandler, false)
  })
  onUnmounted(() => {
    unregisterRouterHook()
  })

  provide(
    asideSymbol,
    computed(() => {
      return {
        enable: frontmatter.value.aside !== false,
        open: value.value,
        toggle,
      }
    })
  )
}
