<script setup lang="ts">
import PageMeta from '../../components/PageMeta.vue'
import PageNav from '../../components/PageNav.vue'
import { useScrollPromise } from '../../composables'

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

      <div class="theme-star-content">
        <Content />
      </div>

      <PageMeta />

      <PageNav />

      <GithubCorner />

      <slot name="bottom" />
    </main>
  </Transition>
</template>
