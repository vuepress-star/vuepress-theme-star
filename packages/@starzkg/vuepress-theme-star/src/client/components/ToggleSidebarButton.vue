<script setup lang="ts">
import { toggleSidebar, useThemeLocaleData } from '../composables/index.js'

const themeLocale = useThemeLocaleData()
</script>

<template>
  <div
    class="toggle-sidebar-button"
    :title="themeLocale.toggleSidebar"
    aria-expanded="false"
    role="button"
    tabindex="0"
    @click="toggleSidebar"
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
  position: absolute;
  display: block;
  top: 0.6rem;
  left: 1rem;
  padding: 0.6rem;
  cursor: pointer;
}

.toggle-sidebar-button .icon {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 1.25rem;
  height: 1.25rem;
  cursor: inherit;

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

  .sidebar-open & {
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
}
</style>
