<script setup lang="ts">
import { useNavbar } from '../composables/index.js'
import NavBar from './NavBar.vue'
import NavScreen from './NavScreen.vue'

const navbar = useNavbar()
</script>

<template>
  <div class="nav">
    <NavBar v-if="navbar.enable">
      <template #nav-bar-title-before>
        <slot name="nav-bar-title-before" />
      </template>
      <template #nav-bar-title-after>
        <slot name="nav-bar-title-after" />
      </template>
      <template #nav-bar-content-before>
        <slot name="nav-bar-content-before" />
      </template>
      <template #nav-bar-content-after>
        <slot name="nav-bar-content-after" />
      </template>
    </NavBar>
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
