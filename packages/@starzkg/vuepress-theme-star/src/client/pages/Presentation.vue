<template>
  <div
    class="presentation-page"
    :style="{
      height: frontmatter.navbar === false ? '100vh' : '',
      paddingTop: frontmatter.navbar === false ? '0' : '',
    }"
  >
    <PresentationViewer
      id="presentation"
      class="presentation-container"
      :style="{
        height: frontmatter.navbar === false ? '100vh' : '',
      }"
      :data-code="code"
      theme="auto"
    />
  </div>
</template>

<script setup lang="ts">
import { usePageData, usePageFrontmatter } from '@vuepress/client'
import type { StarThemeHomePageFrontmatter } from '../../shared'

const pageData = usePageData<{ content: string }>()
const frontmatter = usePageFrontmatter<StarThemeHomePageFrontmatter>()
const code = encodeURIComponent(pageData.value.content)
console.log(pageData.value.content)
</script>

<style scoped></style>
