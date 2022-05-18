<script lang="ts" setup>
import { usePageData } from '@vuepress/client'
import { computed } from 'vue'
import { Time } from '../icons'

interface ReadingTimePageData {
  readingTime: number
}

const page = usePageData<ReadingTimePageData>()

const readingTime = computed(() => {
  const readingTime = page.value.readingTime
  if (!readingTime) {
    return 0
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
