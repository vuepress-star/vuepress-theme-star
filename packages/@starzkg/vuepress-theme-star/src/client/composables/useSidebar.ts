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
import type {
  ResolvedSidebarItem,
  StarPageFrontmatter,
} from '../../shared/index.js'
import { resolveSidebarItems } from './useSidebarItems.js'
import { useThemeLocaleData } from './useThemeData.js'

export interface Sidebar {
  enable: boolean
  open: boolean
  toggle: (to?: boolean) => void
  items: ResolvedSidebarItem[]
}

export type SidebarRef = ComputedRef<Sidebar>

export const sidebarSymbol: InjectionKey<SidebarRef> = Symbol('sidebar')

let isSidebarOpen
/**
 * Inject sidebar global computed
 */
export const useSidebar = (): SidebarRef => {
  const sidebar = inject(sidebarSymbol)
  if (!sidebar) {
    throw new Error('useSidebar() is called without provider.')
  }
  return sidebar
}

const toggleSidebar = (to?: boolean): void => {
  if (isSidebarOpen !== undefined) {
    isSidebarOpen.value = typeof to === 'boolean' ? to : !isSidebarOpen.value
  }
}

/**
 * Create sidebar ref and provide as global computed in setup
 */
export const setupSidebar = (): void => {
  const themeLocale = useThemeLocaleData()
  const frontmatter = usePageFrontmatter<StarPageFrontmatter>()

  isSidebarOpen = ref(false)

  const sidebarItems = computed(() =>
    resolveSidebarItems(frontmatter.value, themeLocale.value)
  )

  // close sidebar sidebar after navigation
  let unregisterRouterHook
  onMounted(() => {
    const router = useRouter()
    unregisterRouterHook = router.afterEach(() => {
      toggleSidebar(false)
    })
  })
  onUnmounted(() => {
    unregisterRouterHook()
  })

  provide(
    sidebarSymbol,
    computed(() => {
      return {
        enable: sidebarItems.value.length && sidebarItems.value.length !== 0,
        open: isSidebarOpen.value,
        items: sidebarItems.value,
        toggle: toggleSidebar,
      }
    })
  )
}
