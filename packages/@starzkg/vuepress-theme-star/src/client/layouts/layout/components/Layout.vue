<script setup lang="ts">
import { usePageFrontmatter } from '@vuepress/client'
import { computed } from 'vue'
import type { StarThemePageFrontmatter } from '../../../../shared/index.js'
import {
  toggleNavbar,
  toggleSidebar,
  useNavbar,
  useScrollPromise,
  useSidebar,
  useUA,
} from '../../../composables/index.js'
import Background from './Background.vue'
import Foreground from './Foreground.vue'

const frontmatter = usePageFrontmatter<StarThemePageFrontmatter>()

// ua
const ua = useUA()

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
  ua.value.getResult().device.type,
  frontmatter.value.pageClass,
])

// page name
const pageName = computed(() => frontmatter.value.page ?? 'Page')

// page classes
const pageClass = computed(() => [
  'page-' +
    (pageName.value.toLocaleLowerCase() === 'page'
      ? 'normal'
      : pageName.value.toLocaleLowerCase()),
  frontmatter.value.pageClass,
])

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

// handle scrollBehavior with transition
const scrollPromise = useScrollPromise()
const onBeforeEnter = scrollPromise.resolve
const onBeforeLeave = scrollPromise.pending
</script>

<template>
  <div
    class="theme-container theme-star"
    :class="containerClass"
    @touchstart="onTouchStart"
    @touchend="onTouchEnd"
  >
    <div class="background">
      <slot name="background">
        <Background />
      </slot>
    </div>

    <Transition
      name="fade-slide-y"
      mode="out-in"
      @before-enter="onBeforeEnter"
      @before-leave="onBeforeLeave"
    >
      <slot name="page-container">
        <Component :is="pageName" class="page-container" :class="pageClass" />
      </slot>
    </Transition>

    <div class="foreground">
      <slot name="foreground">
        <Foreground />
      </slot>
    </div>
  </div>
</template>
