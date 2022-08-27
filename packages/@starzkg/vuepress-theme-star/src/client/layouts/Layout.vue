<script setup lang="ts">
import { usePageFrontmatter } from '@vuepress/client'
import { computed } from 'vue'
import type { StarThemePageFrontmatter } from '../../shared/index.js'
import Background from '../components/Background.vue'
import Foreground from '../components/Foreground.vue'

const frontmatter = usePageFrontmatter<StarThemePageFrontmatter>()

// page
const page = computed(() => frontmatter.value.page ?? 'Page')
// classes
const pageClass = computed(() => [
  (page.value.toLocaleLowerCase() === 'page'
    ? 'normal'
    : page.value.toLocaleLowerCase()) + '-page',
  frontmatter.value.pageClass,
])
</script>

<template>
  <div class="theme-container">
    <slot name="back">
      <Background />
    </slot>

    <slot name="page">
      <Component :is="page" :class="pageClass" />
    </slot>

    <slot name="front">
      <Foreground />
    </slot>
  </div>
</template>
