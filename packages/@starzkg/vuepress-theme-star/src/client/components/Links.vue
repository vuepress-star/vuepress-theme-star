<script setup lang="ts">
import { usePageFrontmatter } from '@vuepress/client'
import { isArray } from '@vuepress/shared'
import { computed } from 'vue'
import type { StarThemeHomePageFrontmatter } from '../../shared/index.js'

const frontmatter = usePageFrontmatter<StarThemeHomePageFrontmatter>()

// links list
const links = computed(() => {
  if (!isArray(frontmatter.value.links)) {
    return []
  }
  return frontmatter.value.links.map(({ text, icon, url }) => {
    return {
      text,
      icon:
        icon === undefined
          ? icon
          : (icon.startsWith('icon-social-') ? '' : 'icon-social-') + icon,
      url,
    }
  })
})
</script>

<template>
  <p class="links">
    <ExternalLink v-for="link in links" :key="link.url" v-bind="link" />
  </p>
</template>
