import { usePageFrontmatter } from '@vuepress/client'
import {
  computed,
  ComputedRef,
  inject,
  InjectionKey,
  onMounted,
  onUnmounted,
  provide,
  ref,
} from 'vue'
import { useRouter } from 'vue-router'
import type { StarPageFrontmatter } from '../../shared/index.js'
import { useThemeLocaleData } from './useThemeData.js'

export interface Navbar {
  enable: boolean
  open: boolean
  toggle: (to?: boolean) => void
}

export type NavbarRef = ComputedRef<Navbar>

export const navbarSymbol: InjectionKey<NavbarRef> = Symbol('navbar')

let isNavbarOpen
/**
 * Inject navbar global computed
 */
export const useNavbar = (): NavbarRef => {
  const navbar = inject(navbarSymbol)
  if (!navbar) {
    throw new Error('useNavbar() is called without provider.')
  }
  return navbar
}

const toggleNavbar = (to?: boolean): void => {
  if (isNavbarOpen !== undefined) {
    isNavbarOpen.value = typeof to === 'boolean' ? to : !isNavbarOpen.value
  }
}

/**
 * Create navbar ref and provide as global computed in setup
 */
export const setupNavbar = (): void => {
  const themeLocale = useThemeLocaleData()
  const frontmatter = usePageFrontmatter<StarPageFrontmatter>()

  isNavbarOpen = ref(false)

  // close navbar sidebar after navigation
  let unregisterRouterHook
  onMounted(() => {
    const router = useRouter()
    unregisterRouterHook = router.afterEach(() => {
      toggleNavbar(false)
    })
  })
  onUnmounted(() => {
    unregisterRouterHook()
  })

  provide(
    navbarSymbol,
    computed(() => {
      return {
        enable:
          frontmatter.value.navbar !== false &&
          themeLocale.value.navbar !== false,
        open: isNavbarOpen.value,
        toggle: toggleNavbar,
      }
    })
  )
}
