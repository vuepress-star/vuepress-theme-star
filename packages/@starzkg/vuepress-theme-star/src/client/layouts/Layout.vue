<script setup lang="ts">
import { usePageFrontmatter } from '@vuepress/client'
import { UAParser } from 'ua-parser-js'
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import type { StarThemePageFrontmatter } from '../../shared/index.js'
import Background from '../components/Background.vue'
import Foreground from '../components/Foreground.vue'
import {
  useScrollPromise,
  useSidebarItems,
  useThemeLocaleData,
} from '../composables/index.js'

const frontmatter = usePageFrontmatter<StarThemePageFrontmatter>()
const themeLocale = useThemeLocaleData()

const uaParser = ref(new UAParser())
const loadUA = (): void => {
  uaParser.value = new UAParser()
}

// navbar
const shouldShowNavbar = computed(
  () => frontmatter.value.navbar !== false && themeLocale.value.navbar !== false
)
const isNavbarOpen = ref(false)
const toggleNavbar = (to?: boolean): void => {
  isNavbarOpen.value = typeof to === 'boolean' ? to : !isNavbarOpen.value
}

// sidebar
const sidebarItems = useSidebarItems()
const shouldShowSidebar = computed(
  () => sidebarItems.value.length && sidebarItems.value.length !== 0
)
const isSidebarOpen = ref(false)
const toggleSidebar = (to?: boolean): void => {
  isSidebarOpen.value = typeof to === 'boolean' ? to : !isSidebarOpen.value
}

// container classes
const containerClass = computed(() => [
  {
    'no-navbar': !shouldShowNavbar.value,
    'no-sidebar': !shouldShowSidebar.value,
    'navbar-open': isNavbarOpen.value,
    'sidebar-open': isSidebarOpen.value,
  },
  uaParser.value.getResult().device.type,
  frontmatter.value.pageClass,
])

// close navbar sidebar after navigation
let unregisterRouterHook
onMounted(() => {
  const router = useRouter()
  unregisterRouterHook = router.afterEach(() => {
    toggleNavbar(false)
    toggleSidebar(false)
  })
  window.addEventListener('resize', loadUA)
})
onUnmounted(() => {
  unregisterRouterHook()
  window.removeEventListener('resize', loadUA)
})

const touchStart = { x: 0, y: 0 }
const onTouchStart = (e): void => {
  touchStart.x = e.changedTouches[0].clientX
  touchStart.y = e.changedTouches[0].clientY
}
const onTouchEnd = (e): void => {
  const dx = e.changedTouches[0].clientX - touchStart.x
  const dy = e.changedTouches[0].clientY - touchStart.y
  if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
    if (dx > 0 && touchStart.x <= 80) {
      toggleSidebar(true)
    } else {
      toggleSidebar(false)
    }
  }
}

// page name
const pageName = computed(() => frontmatter.value.page ?? 'Page')

// page classes
const pageClass = computed(() => [
  (pageName.value.toLocaleLowerCase() === 'page'
    ? 'normal'
    : pageName.value.toLocaleLowerCase()) + '-page',
  frontmatter.value.pageClass,
])

// handle scrollBehavior with transition
const scrollPromise = useScrollPromise()
const onBeforeEnter = scrollPromise.resolve
const onBeforeLeave = scrollPromise.pending
</script>

<template>
  <div
    class="theme-container"
    :class="containerClass"
    @touchstart="onTouchStart"
    @touchend="onTouchEnd"
  >
    <slot name="back">
      <Background />
    </slot>

    <slot name="page">
      <Transition
        name="fade-slide-y"
        mode="out-in"
        @before-enter="onBeforeEnter"
        @before-leave="onBeforeLeave"
      >
        <Component
          :is="pageName"
          class="page-container"
          :class="pageClass"
          @toggle-navbar="toggleNavbar"
          @toggle-sidebar="toggleSidebar"
        />
      </Transition>
    </slot>

    <slot name="front">
      <Foreground />
    </slot>
  </div>
</template>
