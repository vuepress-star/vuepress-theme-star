<script lang="ts" setup>
import { dayjs } from '@starzkg/vuepress-star-shared/client'
import { usePageData } from '@vuepress/client'
import { computed } from 'vue'
import { Time } from '../icons'

interface ReadingTimePageData {
  readingTime: number
}

const page = usePageData<ReadingTimePageData>()

const readingTime = computed(() => {
  const readingTime = dayjs
    .duration(page.value.readingTime, 'minutes')
    .locale(page.value.lang)
    .humanize()
  if (!readingTime) {
    return undefined
  }
  return readingTime
})

const readingTimeText = '阅读时间'
</script>

<template>
  <span
    v-if="readingTime"
    class="page-reading-time"
    :aria-label="readingTimeText"
    data-balloon-pos="down"
  >
    <Time />
    <span>{{ readingTime }}</span>
    <meta property="readingTime" :content="readingTime" />
  </span>
</template>

<style lang="scss" scoped></style>
