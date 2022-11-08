<script setup lang="ts">
import { useNavbar } from '../composables/index.js'
import NavbarBrand from './NavbarBrand.vue'
import NavbarItems from './NavbarItems.vue'
import NavScreen from './NavScreen.vue'
import Search from './Search.vue'
import ToggleNavbarButton from './ToggleNavbarButton.vue'

const navbar = useNavbar()
</script>

<template>
  <div v-if="navbar.enable" class="nav">
    <div class="nav-bar">
      <div class="navbar-title">
        <NavbarBrand />
      </div>
      <div class="content">
        <Search />
        <slot name="before" />
        <NavbarItems />
        <slot name="after" />
        <ToggleNavbarButton />
      </div>
    </div>
    <NavScreen :open="navbar.open">
      <template #nav-screen-content-before>
        <slot name="nav-screen-content-before" />
      </template>
      <template #nav-screen-content-after>
        <slot name="nav-screen-content-after" />
      </template>
    </NavScreen>
  </div>
</template>
