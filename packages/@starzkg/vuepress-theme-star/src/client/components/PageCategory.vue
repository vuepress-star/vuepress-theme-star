<script lang="ts" setup>
import { usePageFrontmatter, useRouteLocale } from '@vuepress/client'
import { computed, ComputedRef } from 'vue'
import { useThemeLocaleData } from '../composables/index.js'
import { Category } from '../icons'
interface CategoryPageFrontmatter {
  categories?: string[] | string
}

const routeLocale = useRouteLocale()
const themeLocale = useThemeLocaleData()
const frontmatter = usePageFrontmatter<CategoryPageFrontmatter>()

const useCategory = (): ComputedRef<null | string[]> => {
  return computed(() => {
    if (!frontmatter.value.categories) {
      return null
    }
    if (Array.isArray(frontmatter.value.categories)) {
      return frontmatter.value.categories
    } else {
      return frontmatter.value.categories.split(',')
    }
  })
}
const categories = useCategory()
</script>
<template>
  <span
    v-if="categories && categories.length > 0"
    class="page-category"
    aria-label="分类"
    data-balloon-pos="down"
  >
    <Category />
    <ul class="categories">
      <li
        v-for="category in categories"
        :key="category"
        class="category rainbow"
      >
        <RouterLink
          v-if="themeLocale.article?.category"
          :to="`${routeLocale}category/${encodeURI(category)}`"
          disabled
        >
          # {{ category }}
        </RouterLink>
        <span v-else># {{ category }}</span>
      </li>
    </ul>
    <meta property="articleSection" :content="categories.join(', ')" />
  </span>
</template>
