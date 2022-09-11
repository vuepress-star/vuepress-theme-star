<script setup lang="ts">
import { useRouteLocale, useSiteLocaleData } from '@vuepress/client'
import { computed } from 'vue'
import { useDarkMode, useThemeLocaleData } from '../composables/index.js'
import NavbarLogo from './NavbarLogo.js'

const routeLocale = useRouteLocale()
const siteLocale = useSiteLocaleData()
const themeLocale = useThemeLocaleData()
const isDarkMode = useDarkMode()

const navbarBrandLink = computed(
  () => themeLocale.value.home || routeLocale.value
)
const navbarBrandTitle = computed(() => siteLocale.value.title)
const navbarBrandLogo = computed(() => {
  if (isDarkMode.value && themeLocale.value.logoDark !== undefined) {
    return themeLocale.value.logoDark
  }
  return themeLocale.value.logo
})
</script>

<template>
  <RouterLink :to="navbarBrandLink" class="navbar-brand">
    <NavbarLogo />

    <span
      v-if="navbarBrandTitle"
      class="site-name"
      :class="{ 'can-hide': navbarBrandLogo }"
    >
      {{ navbarBrandTitle }}
    </span>
  </RouterLink>
</template>
