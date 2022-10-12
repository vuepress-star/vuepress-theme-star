<script setup lang="ts">
import Repo from '@theme/Repo.js'
import { useThemeLocaleData } from '../composables'
import BackToTop from './BackToTop'
import ScreenFull from './ScreenFull'
import ToggleColorModeButton from './ToggleColorModeButton.vue'

const themeLocale = useThemeLocaleData()
</script>

<template>
  <div class="suspension">
    <BackToTop key="back-to-top" class="suspension-item" />

    <ToggleColorModeButton
      v-if="themeLocale.colorModeSwitch"
      key="toggle-color-mode-button"
      class="suspension-item"
    />

    <Repo key="repo" class="suspension-item" />

    <ScreenFull key="screen-full" class="suspension-item" />
  </div>
</template>
