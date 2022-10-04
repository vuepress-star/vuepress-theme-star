<script lang="ts" setup>
import { usePageFrontmatter, useRouteLocale } from '@vuepress/client'
import { computed, ComputedRef } from 'vue'
import { useThemeLocaleData } from '../composables/index.js'
import { Tag } from '../icons'
interface TagPageFrontmatter {
  tags?: string[] | string
}

const routeLocale = useRouteLocale()
const themeLocale = useThemeLocaleData()
const frontmatter = usePageFrontmatter<TagPageFrontmatter>()

const useTag = (): ComputedRef<null | string[]> => {
  return computed(() => {
    if (!frontmatter.value.tags) {
      return null
    }
    if (Array.isArray(frontmatter.value.tags)) {
      return frontmatter.value.tags
    } else if (typeof frontmatter.value.tags === 'string') {
      return frontmatter.value.tags.split(',')
    }
    return null
  })
}
const tags = useTag()
</script>
<template>
  <span
    v-if="tags && tags.length > 0"
    class="page-tag"
    aria-label="标签"
    data-balloon-pos="down"
  >
    <Tag />
    <ul class="tags">
      <li
        v-for="(tag, index) in tags"
        :key="tag"
        :class="['tag', `tag${index}`]"
      >
        <RouterLink
          v-if="themeLocale.article?.tag"
          :to="`${routeLocale}tag/${encodeURI(category)}`"
          disabled
        >
          {{ tag }}
        </RouterLink>
        <span v-else>{{ tag }}</span>
      </li>
    </ul>
    <meta property="keywords" :content="tags.join(', ')" />
  </span>
</template>
