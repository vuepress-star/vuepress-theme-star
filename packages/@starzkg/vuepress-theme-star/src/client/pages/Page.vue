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
        <BreadCrumb />
        <PageTitle />
        <PageInfo />
        <hr />
      </header>

      <aside class="page-aside">
        <Toc class="anchor" />
      </aside>

      <main class="page-content theme-star-content">
        <Content />
      </main>

      <footer class="page-footer">
        <PageMeta />

        <PageNav />

        <GithubCorner />

        <Comment />
      </footer>

      <slot name="bottom" />
    </main>
  </Transition>
</template>

<script setup lang="ts">
import PageMeta from '../components/PageMeta.vue'
import PageNav from '../components/PageNav.vue'
import { useScrollPromise } from '../composables'

// handle scrollBehavior with transition
const scrollPromise = useScrollPromise()
const onBeforeEnter = scrollPromise.resolve
const onBeforeLeave = scrollPromise.pending
</script>
