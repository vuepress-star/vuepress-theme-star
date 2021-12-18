<template>
  <RawExternalLinkIcon>
    <span class="sr-only">{{ themeLocale.openInNewWindow }}</span>
  </RawExternalLinkIcon>
</template>

<script setup lang="ts">
/**
 * Override the built-in `<ExternalLinkIcon>` for a11y
 */
import { ExternalLinkIcon as RawExternalLinkIcon } from '@vuepress/plugin-external-link-icon/lib/client'
import { useThemeLocaleData } from '@vuepress/plugin-theme-data/lib/client'

const themeLocale = useThemeLocaleData()
</script>
