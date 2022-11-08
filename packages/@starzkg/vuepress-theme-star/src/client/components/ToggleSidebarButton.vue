<script setup lang="ts">
import { useSidebar, useThemeLocaleData } from '../composables/index.js'

const themeLocale = useThemeLocaleData()
const sidebar = useSidebar()
</script>

<template>
  <div
    v-if="sidebar.enable"
    class="toggle-sidebar-button"
    :title="themeLocale.toggleSidebar"
    :aria-expanded="sidebar.open"
    aria-controls="sidebar"
    role="button"
    tabindex="0"
    @click="sidebar.toggle"
  >
    <div class="icon" aria-hidden="true">
      <span></span>
      <span></span>
      <span></span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.toggle-sidebar-button {
  display: block;
  padding: 0.6rem;
  cursor: pointer;

  .icon {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 1.25rem;
    height: 1.25rem;
    cursor: inherit;
    overflow: hidden;
  }

  span {
    display: inline-block;
    width: 100%;
    height: 2px;
    border-radius: 2px;
    background-color: var(--c-text);
    transition: transform var(--t-transform);

    &:nth-child(2) {
      margin: 6px 0;
    }
  }
}

.toggle-sidebar-button[aria-expanded='true'] .icon {
  span {
    &:nth-child(1) {
      transform: translateY(0.5rem) rotate(135deg);
    }
    &:nth-child(2) {
      transform: scale(0);
    }
    &:nth-child(3) {
      transform: translateY(-0.5rem) rotate(-135deg);
    }
  }
}
</style>
