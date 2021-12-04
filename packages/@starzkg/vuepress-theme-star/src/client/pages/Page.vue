<template>
  <Transition
    name="fade-slide-y"
    mode="out-in"
    @before-enter="onBeforeEnter"
    @before-leave="onBeforeLeave"
  >
    <main class="page">
      <header>
        <BreadCrumb />
        <slot name="top" />
        <PageInfo />
      </header>

      <aside>
        <Toc class="anchor" />
      </aside>

      <main class="theme-star-content">
        <Content />
      </main>

      <footer>
        <PageMeta />

        <PageNav />

        <GithubCorner />

        <Comment />
        <slot name="bottom" />
      </footer>
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
