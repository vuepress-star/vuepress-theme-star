<script setup lang="ts">
import { usePageFrontmatter } from '@vuepress/client'
import { computed } from 'vue'
import type { StarThemeHomePageFrontmatter } from '../../shared/index.js'
import { useThemeLocaleData } from '../composables/index.js'

const themeLocaleData = useThemeLocaleData()
const frontmatter = usePageFrontmatter<StarThemeHomePageFrontmatter>()

const footer = computed(
  () => frontmatter.value.footer || themeLocaleData.value.footer
)
</script>

<template>
  <template v-if="footer">
    <!-- eslint-disable-next-line vue/no-v-html -->
    <div class="footer" v-html="footer" />
  </template>
</template>
