<script setup lang="ts">
import Content from '../components/Content.vue'
import PageMeta from '../components/PageMeta.vue'
import PageNav from '../components/PageNav.vue'
import { useScrollPromise } from '../composables'
// handle scrollBehavior with transition
const scrollPromise = useScrollPromise()
const onBeforeEnter = scrollPromise.resolve
const onBeforeLeave = scrollPromise.pending
</script>

<template>
  <Transition
    name="fade-slide-y"
    mode="out-in"
    @before-enter="onBeforeEnter"
    @before-leave="onBeforeLeave"
  >
    <main class="page">
      <slot name="top" />

      <header class="page-header">
        <GithubCorner />
        <BreadCrumb />
      </header>

      <div class="suspended-panel" />

      <aside class="page-aside">
        <Toc class="sidebar-block anchor" />
      </aside>

      <main class="page-content">
        <PageTitle />
        <PageInfo />
        <hr />
        <Content />
      </main>

      <footer class="page-footer">
        <PageMeta />

        <PageNav />

        <Comment />
      </footer>

      <slot name="bottom" />
    </main>
  </Transition>
</template>
