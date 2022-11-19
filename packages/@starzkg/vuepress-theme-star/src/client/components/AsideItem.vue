<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'AsideItem',
})
</script>

<script lang="ts" setup></script>

<template>
  <div class="aside-item">
    <div class="aside-item-header">
      <slot name="header" />
    </div>
    <div class="aside-item-content">
      <slot />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.aside-item {
  .aside-item-header {
    margin: 0 0 0.75rem 0.5rem;
    font-weight: 600;
    font-size: 0.875rem;
  }
}
</style>
