<script setup lang="ts">
/**
 * Override the built-in `<ExternalLinkIcon>` for a11y
 */
import { ExternalLinkIcon as RawExternalLinkIcon } from '@vuepress/plugin-external-link-icon/client'
import { useThemeLocaleData } from '@vuepress/plugin-theme-data/client'

const themeLocale = useThemeLocaleData()
</script>

<template>
  <RawExternalLinkIcon>
    <span class="sr-only">{{ themeLocale.openInNewWindow }}</span>
  </RawExternalLinkIcon>
</template>
