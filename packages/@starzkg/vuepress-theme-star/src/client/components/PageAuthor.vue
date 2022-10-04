<script setup lang="ts">
import { usePageData, usePageFrontmatter } from '@vuepress/client'
import { computed } from 'vue'
import type { StarThemePageData } from '../../shared/index.js'
import { Author } from '../icons'

interface AuthorPageFrontmatter {
  author?: string[] | string
}

const frontmatter = usePageFrontmatter<AuthorPageFrontmatter>()
const page = usePageData<StarThemePageData>()

const author = computed(() => {
  const author = frontmatter.value.author || page.value.author

  if (Array.isArray(author)) {
    return author.map((item) => (typeof item === 'string' ? item : item.name))
  } else if (typeof author === 'string') {
    return author.split(',')
  } else if (typeof author === 'object') {
    return author.name
  }
  return []
})
const authorLocale = '作者'
</script>

<template>
  <span
    v-if="author && author.length > 0"
    class="page-author"
    :aria-label="authorLocale"
    data-balloon-pos="down"
  >
    <Author />
    <span>{{ author.join(', ') }}</span>
    <meta property="author" :content="author.join(', ')" />
  </span>
</template>
