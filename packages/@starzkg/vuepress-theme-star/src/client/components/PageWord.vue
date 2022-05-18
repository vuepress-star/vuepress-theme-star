<script lang="ts" setup>
import { usePageData } from '@vuepress/client'
import { computed } from 'vue'
import { Word } from '../icons'

const page = usePageData<{ length: number }>()

const words = computed(() => page.value.length?.toString())
</script>

<template>
  <span
    v-if="words"
    class="page-word"
    aria-label="字数"
    data-balloon-pos="down"
  >
    <Word />
    <span>{{ words }}</span>
    <meta property="word" :content="words" />
  </span>
</template>
