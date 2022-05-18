<script lang="ts" setup>
import { usePageFrontmatter } from '@vuepress/client'
import { computed, ComputedRef } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Category } from '../icons'
interface CategoryPageFrontmatter {
  categories?: string[] | string
}

const route = useRoute()
const router = useRouter()

const frontmatter = usePageFrontmatter<CategoryPageFrontmatter>()

const useCategory = (): ComputedRef<null | string[]> => {
  return computed(() => {
    if (!frontmatter.value.categories) {
      return null
    }
    if (Array.isArray(frontmatter.value.categories)) {
      return frontmatter.value.categories
    } else if (typeof frontmatter.value.categories === 'string') {
      return frontmatter.value.categories.split(',')
    }
    return null
  })
}

const navigate = (categoryName: string): void => {
  const path = `/category/${encodeURI(categoryName)}/`
  if (route.path !== path) router.push(path)
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
        v-for="(category, index) in categories"
        :key="category"
        :class="['category', `category${index}`]"
      >
        <span>{{ category }}</span>
      </li>
    </ul>
    <meta property="author" :content="categories.join(', ')" />
  </span>
</template>
