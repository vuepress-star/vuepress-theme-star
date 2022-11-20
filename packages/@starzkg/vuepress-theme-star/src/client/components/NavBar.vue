<script setup lang="ts">
import NavbarBrand from './NavbarBrand.vue'
import NavbarItems from './NavbarItems.vue'
import Search from './Search.js'
import ToggleNavbarButton from './ToggleNavbarButton.vue'
</script>

<template>
  <div class="nav-bar">
    <div class="container">
      <div class="nav-bar-title">
        <slot name="nav-bar-title-before" />
        <NavbarBrand />
        <slot name="nav-bar-title-after" />
      </div>
      <div class="content">
        <slot name="nav-bar-content-before" />
        <Search />
        <NavbarItems />
        <slot name="nav-bar-content-after" />
        <ToggleNavbarButton />
      </div>
    </div>
  </div>
</template>
