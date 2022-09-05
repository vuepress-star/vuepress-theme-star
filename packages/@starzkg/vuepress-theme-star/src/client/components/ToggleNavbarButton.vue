<script setup lang="ts">
import { useThemeLocaleData } from '../composables/index.js'

defineEmits(['toggle'])

const themeLocale = useThemeLocaleData()
</script>

<template>
  <div
    class="toggle-navbar-button"
    :title="themeLocale.toggleNavbar"
    aria-expanded="false"
    role="button"
    tabindex="0"
    @click="$emit('toggle')"
  >
    <div class="icon" aria-hidden="true">
      <span></span>
      <span></span>
      <span></span>
    </div>
  </div>
</template>
