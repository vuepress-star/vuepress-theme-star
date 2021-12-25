<script setup lang="ts">
import { usePageData, usePageFrontmatter } from '@vuepress/client'

const pageData = usePageData<{ content: string }>()
const frontmatter = usePageFrontmatter<{ navbar: boolean; theme: string }>()
const code = encodeURIComponent(pageData.value.content)
</script>

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
      :data-code="code || ''"
      :theme="frontmatter.theme || 'auto'"
    />
  </div>
</template>

<style scoped></style>
