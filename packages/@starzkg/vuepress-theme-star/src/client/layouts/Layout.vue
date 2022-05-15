<script setup lang="ts">
import { usePageFrontmatter } from '@vuepress/client'
import type { StarThemePageFrontmatter } from '../../shared'
import Background from '../components/Background.vue'

const frontmatter = usePageFrontmatter<StarThemePageFrontmatter>()
</script>

<template>
  <div class="theme-container">
    <slot name="background">
      <Background />
    </slot>

    <slot name="page">
      <Component :is="frontmatter.page ?? 'Page'" />
    </slot>
  </div>
</template>
