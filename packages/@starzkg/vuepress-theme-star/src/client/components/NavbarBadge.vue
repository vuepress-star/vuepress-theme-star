<script setup lang="ts">
import { useRouteLocale } from '@vuepress/client'
import { computed } from 'vue'
import { useThemeLocaleData } from '../composables/index.js'
import NavbarLogo from './NavbarLogo.js'

const routeLocale = useRouteLocale()
const themeLocale = useThemeLocaleData()

const navbarBrandLink = computed(
  () => themeLocale.value.home || routeLocale.value
)
</script>

<template>
  <RouterLink :to="navbarBrandLink" class="navbar-logo">
    <NavbarLogo />
  </RouterLink>
</template>
