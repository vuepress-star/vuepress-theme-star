<script lang="ts" setup>
import { useSiteData } from '@vuepress/client'
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { Eye } from '../icons'

const route = useRoute()
const site = useSiteData()

const pageViews = ref(0)
const enablePageViews = ref(false)

/** visitorID, use current path */
const visitorID = computed(() => {
  const { base } = site.value

  return `${base.slice(0, base.length - 1)}${route.path}`
})

// show fire icon depending on the views number
const getCount = (): void => {
  const countElement = document.querySelector('.waline-visitor-count')

  if (countElement) {
    const count = countElement.textContent

    if (count && !isNaN(Number(count))) pageViews.value = Number(count)
    else
      setTimeout(() => {
        getCount()
      }, 500)
  }
}

onMounted(() => {
  setTimeout(() => getCount(), 1500)
})

watch(
  () => route.path,
  (newValue: string, oldValue: string) => {
    if (newValue !== oldValue) setTimeout(() => getCount(), 500)
  }
)
</script>

<template>
  <span
    v-if="pageViews"
    class="page-views"
    aria-label="浏览量"
    data-balloon-pos="down"
  >
    <Eye />
    <span>{{ pageViews }}</span>
    <meta property="author" :content="pageViews" />
  </span>
</template>

<style lang="scss" scoped></style>
