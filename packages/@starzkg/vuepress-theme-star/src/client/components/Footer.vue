<script setup lang="ts">
import { usePageFrontmatter } from '@vuepress/client'
import { computed } from 'vue'
import type { StarThemeHomePageFrontmatter } from '../../shared/index.js'

const frontmatter = usePageFrontmatter<StarThemeHomePageFrontmatter>()
const footer = computed(() => frontmatter.value.footer)
const footerHtml = computed(() => frontmatter.value.footerHtml)
</script>

<template>
  <template v-if="footer">
    <!-- eslint-disable-next-line vue/no-v-html -->
    <div v-if="footerHtml" class="footer" v-html="footer" />
    <div v-else class="footer" v-text="footer" />
  </template>
</template>
