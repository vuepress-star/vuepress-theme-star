<script setup lang="ts">
import { usePageData, usePageFrontmatter } from '@vuepress/client'

const pageData = usePageData<{ content: string }>()
const frontmatter = usePageFrontmatter<{ navbar: boolean; theme: string }>()
const code = encodeURIComponent(pageData.value.content)
</script>

<template>
  <div
    id="presentation"
    class="presentation"
    :style="{
      height: frontmatter.navbar === false ? '100vh' : '',
      paddingTop: frontmatter.navbar === false ? '0' : '',
    }"
  >
    <Reveal
      id="reveal-presentation"
      class="presentation-container"
      :style="{
        height: frontmatter.navbar === false ? '100vh' : '',
      }"
      :code="code || ''"
      :theme="frontmatter.theme || 'auto'"
    />
  </div>
</template>

<style scoped></style>
