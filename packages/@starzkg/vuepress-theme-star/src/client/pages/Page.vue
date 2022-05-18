<script setup lang="ts">
import { usePageData, usePageFrontmatter } from '@vuepress/client'
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import type { StarThemePageFrontmatter } from '../../shared'
import Content from '../components/Content.vue'
import Navbar from '../components/Navbar.vue'
import PageInfo from '../components/PageInfo'
import PageMeta from '../components/PageMeta.vue'
import PageNav from '../components/PageNav.vue'
import ProfileInfo from '../components/ProfileInfo.vue'
import Sidebar from '../components/Sidebar.vue'
import {
  useScrollPromise,
  useSidebarItems,
  useThemeLocaleData,
} from '../composables'
// handle scrollBehavior with transition
const scrollPromise = useScrollPromise()
const onBeforeEnter = scrollPromise.resolve
const onBeforeLeave = scrollPromise.pending

const page = usePageData()
const frontmatter = usePageFrontmatter<StarThemePageFrontmatter>()
const themeLocale = useThemeLocaleData()

// navbar
const shouldShowNavbar = computed(
  () => frontmatter.value.navbar !== false && themeLocale.value.navbar !== false
)

// sidebar
const sidebarItems = useSidebarItems()
const isSidebarOpen = ref(false)
const toggleSidebar = (to?: boolean): void => {
  isSidebarOpen.value = typeof to === 'boolean' ? to : !isSidebarOpen.value
}
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

// classes
const containerClass = computed(() => [
  {
    'no-navbar': !shouldShowNavbar.value,
    'no-sidebar': !sidebarItems.value.length,
    'sidebar-open': isSidebarOpen.value,
  },
  frontmatter.value.pageClass,
])

const scrollX = ref(0)
const scrollY = ref(0)

const handleScroll = (): void => {
  scrollX.value = window.scrollX
  scrollY.value = window.scrollY
}

// close sidebar after navigation
let unregisterRouterHook
onMounted(() => {
  const router = useRouter()
  unregisterRouterHook = router.afterEach(() => {
    toggleSidebar(false)
  })
  // 滚动条的获取
  window.addEventListener('scroll', handleScroll, true)
})
onUnmounted(() => {
  unregisterRouterHook()
})
</script>

<template>
  <div
    class="page-container"
    :class="containerClass"
    @touchstart="onTouchStart"
    @touchend="onTouchEnd"
  >
    <slot name="navbar">
      <Navbar
        v-if="shouldShowNavbar"
        :style="{ opacity: Math.max(200 - scrollY, 0) / 200 }"
        @toggle-sidebar="toggleSidebar"
      >
        <template #before>
          <slot name="navbar-before" />
        </template>
        <template #after>
          <slot name="navbar-after" />
        </template>
      </Navbar>
    </slot>

    <div class="header-mask">
      <BreadCrumb />
      <PageInfo />
    </div>

    <div class="sidebar-mask" @click="toggleSidebar(false)" />

    <main>
      <div class="left">
        <slot name="left-top" />
        <slot name="sidebar">
          <Sidebar>
            <template #top>
              <slot name="sidebar-top" />
            </template>
            <template #bottom>
              <slot name="sidebar-bottom" />
            </template>
          </Sidebar>
        </slot>
        <slot name="left-bottom" />
      </div>
      <div class="middle">
        <slot name="middle-top" />
        <Transition
          name="fade-slide-y"
          mode="out-in"
          @before-enter="onBeforeEnter"
          @before-leave="onBeforeLeave"
        >
          <div class="page">
            <header class="page-header">
              <GithubCorner />
            </header>
            <slot name="page-top" />
            <main class="page-content">
              <Content />
            </main>
            <slot name="page-bottom" />
            <footer class="page-footer">
              <PageMeta />

              <PageNav />

              <Comment />
            </footer>
          </div>
        </Transition>
        <slot name="page-bottom" />
      </div>
      <div class="right">
        <slot name="right-top" />
        <ProfileInfo />
        <slot name="right-bottom" />
        <Toc class="anchor" />
      </div>
    </main>
  </div>
</template>
