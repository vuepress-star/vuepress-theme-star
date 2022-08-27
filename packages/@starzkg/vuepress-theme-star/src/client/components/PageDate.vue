<script setup lang="ts">
import { usePageData, usePageFrontmatter } from '@vuepress/client'
import { computed, ComputedRef } from 'vue'
import type {
  StarThemeNormalPageFrontmatter,
  StarThemePageData,
} from '../../shared/index.js'
import { useThemeLocaleData } from '../composables/index.js'
import { Calendar } from '../icons'

interface DatePageFrontmatter {
  date?: string
  createdTime?: string
  updatedTime?: string
}

const frontmatter = usePageFrontmatter<DatePageFrontmatter>()

const themeLocale = useThemeLocaleData()

const useCreatedTime = (): ComputedRef<null | string> => {
  const page = usePageData<StarThemePageData>()

  return computed(() => {
    if (frontmatter.value.date) {
      return new Date(frontmatter.value.date).toLocaleString()
    }

    if (frontmatter.value.createdTime) {
      return new Date(frontmatter.value.createdTime).toLocaleString()
    }

    if (!page.value.git?.createdTime) return null

    const createdDate = new Date(page.value.git?.createdTime)

    return createdDate.toLocaleString()
  })
}

const useUpdatedTime = (): ComputedRef<null | string> => {
  const themeLocale = useThemeLocaleData()
  const page = usePageData<StarThemePageData>()
  const frontmatter = usePageFrontmatter<StarThemeNormalPageFrontmatter>()

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

const ariaLabel = computed(() => {
  if (updatedTime.value) {
    return themeLocale.value.lastUpdatedText + updatedTime.value
  }
  return '日期'
})
</script>

<template>
  <span
    v-if="createdTime"
    class="page-date"
    :aria-label="ariaLabel"
    data-balloon-pos="down"
  >
    <Calendar />
    <span>{{ createdTime }}</span>
    <meta
      v-if="createdTime"
      property="create-date"
      :content="createdTime || ''"
    />
    <ClientOnly>
      <meta
        v-if="updatedTime"
        property="update-date"
        :content="updatedTime || ''"
      />
    </ClientOnly>
  </span>
</template>
