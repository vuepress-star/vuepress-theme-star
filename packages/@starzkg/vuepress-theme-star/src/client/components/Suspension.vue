<script setup lang="ts">
import { Repo } from '@theme/components'
import { useThemeLocaleData } from '../composables'
import BackToTop from './BackToTop'
import Fullscreen from './Fullscreen.js'
import ToggleColorModeButton from './ToggleColorModeButton.vue'
import ToggleSidebarButton from './ToggleSidebarButton.vue'

const themeLocale = useThemeLocaleData()
</script>

<template>
  <div class="suspension">
    <BackToTop key="back-to-top" class="suspension-item" />

    <ToggleSidebarButton key="toggle-sidebar-button" class="suspension-item" />

    <ToggleColorModeButton
      v-if="themeLocale.colorModeSwitch"
      key="toggle-color-mode-button"
      class="suspension-item"
    />

    <Repo key="repo" class="suspension-item" />

    <Fullscreen key="screen-full" class="suspension-item" />
  </div>
</template>
