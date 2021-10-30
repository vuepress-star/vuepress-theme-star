<template>
  <main class="page">
    <slot name="top" />

    <div class="theme-default-content">
      <Content />
    </div>

    <PageMeta />

    <PageNav />

    <GithubCorner />

    <slot name="bottom" />
  </main>
</template>

<script setup lang="ts">
import GithubCorner from './GithubCorner.vue'
import PageMeta from './PageMeta.vue'
import PageNav from './PageNav.vue'
</script>
