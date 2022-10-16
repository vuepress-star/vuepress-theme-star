<script setup lang="ts">
import NavbarItems from './NavbarItems.vue'
import SidebarItems from './SidebarItems.vue'
</script>

<template>
  <div class="sidebar">
    <NavbarItems mode="vertical" />
    <slot name="top" />
    <SidebarItems />
    <slot name="bottom" />
  </div>
</template>
