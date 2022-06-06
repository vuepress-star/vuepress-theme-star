<script setup lang="ts">
import { usePageData, usePageFrontmatter } from '@vuepress/client'
import type { GitData } from '@vuepress/plugin-git'
import { computed, ComputedRef } from 'vue'
import type {
  StarThemeNormalPageFrontmatter,
  StarThemePageData,
} from '../../shared'
import { useThemeLocaleData } from '../composables'
import { Author } from '../icons'

interface AuthorPageFrontmatter {
  author: string[] | string
}

interface AuthorPageData {
  author: string[] | string
  git?: GitData
}

const frontmatter = usePageFrontmatter<AuthorPageFrontmatter>()
const page = usePageData<AuthorPageData>()

const useContributors = (): ComputedRef<
  null | Required<StarThemePageData['git']>['contributors']
> => {
  const themeLocale = useThemeLocaleData()
  const page = usePageData<StarThemePageData>()
  const frontmatter = usePageFrontmatter<StarThemeNormalPageFrontmatter>()

  return computed(() => {
    const showContributors =
      frontmatter.value.contributors ?? themeLocale.value.contributors ?? true

    if (!showContributors) return null

    return page.value.git?.contributors ?? null
  })
}

const author = computed(() => {
  const author = frontmatter.value.author || page.value.author

  if (Array.isArray(author)) {
    return author
  } else if (typeof author === 'string') {
    return author.split(',')
  } else if (author === undefined) {
    const contributors = useContributors()
    return contributors.value?.map((item) => item.name)
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
