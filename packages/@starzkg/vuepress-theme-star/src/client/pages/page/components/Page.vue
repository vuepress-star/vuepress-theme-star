<script setup lang="ts">
import {
  BreadCrumb,
  Content,
  Footer,
  Icon,
  Navbar,
  PageInfo,
  PageMeta,
  PageNav,
  ProfileCard,
  Sidebar,
} from '@theme/components'
import { onMounted, onUnmounted, ref } from 'vue'
import {
  useDarkMode,
  useNavbar,
  useScrollPromise,
  useSidebar,
} from '../../../composables/index.js'
// handle scrollBehavior with transition
const scrollPromise = useScrollPromise()
const onBeforeEnter = scrollPromise.resolve
const onBeforeLeave = scrollPromise.pending

// navbar
const navbar = useNavbar()

// sidebar
const sidebar = useSidebar()

const darkMode = useDarkMode()

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
    <aside class="aside">
      <div class="aside-container">
        <slot name="page-aside">
          <Sidebar>
            <template #top>
              <slot name="sidebar-top" />
            </template>
            <template #bottom>
              <slot name="sidebar-bottom" />
            </template>
          </Sidebar>
        </slot>
      </div>

      <div class="toggle-aside" @click="sidebar.toggle(!sidebar.open)">
        <Icon :icon="sidebar.open ? 'arrow-left-bold' : 'arrow-right-bold'" />
      </div>

      <div class="aside-mask" @click="sidebar.toggle(false)" />
    </aside>

    <section class="container">
      <slot name="page-main">
        <header class="container-header">
          <slot name="header">
            <Navbar
              v-if="navbar.enable"
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
        </header>
        <Transition
          name="fade-slide-y"
          mode="out-in"
          @before-enter="onBeforeEnter"
          @before-leave="onBeforeLeave"
        >
          <main class="container-content">
            <slot name="top" />
            <div class="content">
              <header class="content-header">
                <BreadCrumb />
                <PageInfo />
                <GithubCorner />
              </header>
              <section class="content-container">
                <main class="content-main">
                  <Content />
                </main>
                <aside class="content-aside">
                  <slot name="right-top" />
                  <ProfileCard />
                  <slot name="right-bottom" />
                  <Toc class="anchor" />
                </aside>
              </section>
              <footer class="content-footer">
                <PageMeta />

                <PageNav />

                <Comment :dark-mode="darkMode" />
              </footer>
            </div>
            <slot name="bottom" />
          </main>
        </Transition>
        <footer class="container-footer">
          <Footer />
        </footer>
      </slot>
    </section>
  </div>
</template>
