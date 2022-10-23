<script setup lang="ts">
import Icon from '@theme/Icon.js'
import { usePageFrontmatter } from '@vuepress/client'
import { isArray } from '@vuepress/shared'
import { computed } from 'vue'
import type { StarThemeHomePageFrontmatter } from '../../shared/index.js'

const frontmatter = usePageFrontmatter<StarThemeHomePageFrontmatter>()
const features = computed(() => {
  if (isArray(frontmatter.value.features)) {
    return frontmatter.value.features
  }
  return []
})
</script>

<template>
  <div v-if="features.length" class="features">
    <div v-for="feature in features" :key="feature.title" class="feature">
      <Icon v-if="feature.icon" :icon="feature.icon" />
      <h2>{{ feature.title }}</h2>
      <p>{{ feature.details }}</p>
    </div>
  </div>
</template>
