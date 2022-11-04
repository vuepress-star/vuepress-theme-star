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
  Toc,
} from '@theme/components'
import {
  useDarkMode,
  useScrollPromise,
  useSidebar,
} from '../../../composables/index.js'
// handle scrollBehavior with transition
const scrollPromise = useScrollPromise()
const onBeforeEnter = scrollPromise.resolve
const onBeforeLeave = scrollPromise.pending

// sidebar
const sidebar = useSidebar()

const darkMode = useDarkMode()
</script>

<template>
  <div class="page">
    <aside class="aside">
      <div class="aside-container">
        <slot name="page-aside">
          <ProfileCard />
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
            <Navbar>
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
              </header>
              <section class="content-container">
                <main class="content-main">
                  <Content />
                </main>
                <aside class="content-aside">
                  <Toc />
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
          <slot name="footer">
            <Footer />
          </slot>
        </footer>
      </slot>
    </section>
  </div>
</template>
