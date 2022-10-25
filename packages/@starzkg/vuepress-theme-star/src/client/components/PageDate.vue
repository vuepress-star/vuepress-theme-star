<script setup lang="ts">
import { ClientOnly, usePageData, usePageFrontmatter } from '@vuepress/client'
import { computed, ComputedRef } from 'vue'
import type {
  StarPageData,
  StarThemeArticlePageFrontmatter,
} from '../../shared/index.js'
import { useThemeLocaleData } from '../composables/index.js'
import { Calendar } from '../icons'

interface DatePageFrontmatter {
  date?: string
  dateFormat: string
  createdTime?: boolean
  updatedTime?: boolean
}

const frontmatter = usePageFrontmatter<DatePageFrontmatter>()

const useCreatedTime = (): ComputedRef<null | string> => {
  const page = usePageData<StarPageData>()

  return computed(() => {
    const showCreatedTime = frontmatter.value.createdTime ?? true

    if (!showCreatedTime) return null

    if (frontmatter.value.date) {
      return frontmatter.value.date
    }

    if (!page.value.git?.createdTime) return null

    const createdDate = new Date(page.value.git?.createdTime)

    return createdDate.toLocaleString()
  })
}

const useUpdatedTime = (): ComputedRef<null | string> => {
  const themeLocale = useThemeLocaleData()
  const page = usePageData<StarPageData>()
  const frontmatter = usePageFrontmatter<StarThemeArticlePageFrontmatter>()

  return computed(() => {
    const showLastUpdated =
      frontmatter.value.lastUpdated ?? themeLocale.value.lastUpdated ?? true

    if (!showLastUpdated) return null

    if (!page.value.git?.updatedTime) return null

    const updatedDate = new Date(page.value.git?.updatedTime)

    return updatedDate.toLocaleString()
  })
}

const createdTime = useCreatedTime()

const updatedTime = useUpdatedTime()

const date = computed(() => {
  return updatedTime.value || createdTime.value
})

const ariaLabel = computed(() => {
  if (updatedTime.value) {
    return '创建于' + createdTime.value
  }
  return '日期'
})
</script>

<template>
  <span
    v-if="date"
    class="page-date"
    :aria-label="ariaLabel"
    data-balloon-pos="down"
  >
    <Calendar />
    <span>{{ date }}</span>
    <ClientOnly>
      <meta
        v-if="createdTime"
        property="create-date"
        :content="createdTime || ''"
      />
      <meta
        v-if="updatedTime"
        property="update-date"
        :content="updatedTime || ''"
      />
    </ClientOnly>
  </span>
</template>
