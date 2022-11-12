<script setup lang="ts">
import SidebarItems from './SidebarItems.vue'
</script>

<template>
  <div class="catalogue">
    <div class="catalogue-header">目录</div>
    <slot name="top" />
    <nav class="vuepress-catalogue">
      <SidebarItems />
    </nav>
    <slot name="bottom" />
  </div>
</template>

<style lang="scss" scoped>
.catalogue {
  .catalogue-header {
    margin: 0 0 0.75rem 0.5rem;
    font-weight: 600;
    font-size: 0.875rem;
  }
}
</style>

<style lang="scss">
.catalogue {
  ul {
    padding: 0;
    list-style-type: none;
  }
}
</style>
