<script setup lang="ts">
import { usePageFrontmatter } from '@vuepress/client'
import { UAParser } from 'ua-parser-js'
import { computed, onMounted, onUnmounted, ref } from 'vue'
import type { StarThemePageFrontmatter } from '../../shared/index.js'
import Background from '../components/Background.vue'
import Foreground from '../components/Foreground.vue'
import {
  toggleNavbar,
  toggleSidebar,
  useNavbar,
  useScrollPromise,
  useSidebar,
} from '../composables/index.js'

const frontmatter = usePageFrontmatter<StarThemePageFrontmatter>()

const uaParser = ref(new UAParser())
const loadUA = (): void => {
  uaParser.value = new UAParser()
}

// navbar
const navbar = useNavbar()

// sidebar
const sidebar = useSidebar()

// container classes
const containerClass = computed(() => [
  {
    'no-navbar': !navbar.value.enable,
    'no-sidebar': !sidebar.value.enable,
    'navbar-open': navbar.value.open,
    'sidebar-open': sidebar.value.open,
  },
  uaParser.value.getResult().device.type,
  frontmatter.value.pageClass,
])

onMounted(() => {
  window.addEventListener('resize', loadUA)
})
onUnmounted(() => {
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
      toggleNavbar(true)
      toggleSidebar(true)
    } else {
      toggleNavbar(false)
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
        <Component :is="pageName" class="page-container" :class="pageClass" />
      </Transition>
    </slot>

    <slot name="fore">
      <Foreground />
    </slot>
  </div>
</template>
