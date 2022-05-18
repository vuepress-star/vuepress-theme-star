<script lang="ts" setup>
import { usePageFrontmatter } from '@vuepress/client'
import { computed, ComputedRef, ref, toRef } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Tag } from '../icons'
interface TagPageFrontmatter {
  tags?: string[] | string
}

const route = useRoute()
const router = useRouter()

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

const navigate = (tagName: string): void => {
  const path = `/tag/${encodeURI(tagName)}/`
  if (route.path !== path) router.push(path)
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
        <span>{{ tag }}</span>
      </li>
    </ul>
    <meta property="author" :content="tags.join(', ')" />
  </span>
</template>
