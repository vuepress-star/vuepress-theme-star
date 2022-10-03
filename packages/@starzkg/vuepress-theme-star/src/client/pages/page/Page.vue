<script setup lang="ts">
import BreadCrumb from '@theme/BreadCrumb.js'
import Content from '@theme/Content.vue'
import Navbar from '@theme/Navbar.vue'
import PageInfo from '@theme/PageInfo.js'
import PageMeta from '@theme/PageMeta.vue'
import PageNav from '@theme/PageNav.vue'
import ProfileCard from '@theme/ProfileCard.vue'
import Sidebar from '@theme/Sidebar.vue'
import { computed, onMounted, onUnmounted, ref } from 'vue'
import {
  toggleSidebar,
  useScrollPromise,
  useThemeLocaleData,
} from '../../composables/index.js'
// handle scrollBehavior with transition
const scrollPromise = useScrollPromise()
const onBeforeEnter = scrollPromise.resolve
const onBeforeLeave = scrollPromise.pending
const themeLocale = useThemeLocaleData()

// navbar
const shouldShowNavbar = computed(() => themeLocale.value.navbar !== false)

const scrollX = ref(0)
const scrollY = ref(0)

const handleScroll = (): void => {
  scrollX.value = window.scrollX
  scrollY.value = window.scrollY
}

onMounted(() => {
  // 滚动条的获取
  window.addEventListener('scroll', handleScroll, true)
})
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll, true)
})
</script>

<template>
  <div class="page">
    <slot name="navbar">
      <Navbar
        v-if="shouldShowNavbar"
        :style="{ opacity: Math.max(200 - scrollY, 0) / 200 }"
      >
        <template #before>
          <slot name="navbar-before" />
        </template>
        <template #after>
          <slot name="navbar-after" />
        </template>
      </Navbar>
    </slot>

    <div class="sidebar-mask" @click="toggleSidebar(false)" />

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

    <main class="container">
      <slot name="container-top" />
      <header class="container-header">
        <div class="header-wrapper">
          <BreadCrumb />
          <PageInfo />
        </div>
      </header>
      <main class="container-content">
        <div class="content-left">
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
        <div class="content-middle">
          <slot name="middle-top" />
          <Transition
            name="fade-slide-y"
            mode="out-in"
            @before-enter="onBeforeEnter"
            @before-leave="onBeforeLeave"
          >
            <div class="main-content">
              <slot name="top" />
              <header class="content-header">
                <GithubCorner />
              </header>
              <Content />
              <footer class="content-footer">
                <PageMeta />

                <PageNav />

                <Comment />
              </footer>
              <slot name="bottom" />
            </div>
          </Transition>
          <slot name="middle-bottom" />
        </div>
        <div class="content-right">
          <slot name="right-top" />
          <ProfileCard />
          <slot name="right-bottom" />
          <Toc class="anchor" />
        </div>
      </main>
      <slot name="container-bottom" />
    </main>
  </div>
</template>
