<script lang="ts" setup>
import { Icon } from '@theme/components'
import { useAside } from '@theme/composables'
import { computed } from 'vue'

const aside = useAside()

// aside classes
const asideClass = computed(() => ({
  aside: true,
  open: aside.value.open,
}))
</script>

<template>
  <aside :class="asideClass">
    <div class="aside-container">
      <slot />
    </div>

    <div class="toggle-aside" @click="aside.toggle()">
      <Icon :icon="aside.open ? 'arrow-left-bold' : 'arrow-right-bold'" />
    </div>

    <div class="aside-mask" @click="aside.toggle(false)" />
  </aside>
</template>

<style lang="scss" scoped>
@import '../styles/variables';
.aside {
  .aside-container {
    width: var(--page-aside-width);
    position: fixed;
    z-index: 10;
    margin: 0;
    top: 0;
    left: calc(-1 * var(--page-aside-width));
    right: 0;
    bottom: 0;
    box-sizing: border-box;
    border-radius: 2px;
    overflow-y: auto;
    flex-shrink: 0;
    scrollbar-width: thin;
    scrollbar-color: var(--c-brand) var(--c-border);
    background-color: var(--c-bg-sidebar);
    transition: transform var(--t-transform), background-color var(--t-color),
      border-color var(--t-color), left var(--t-transform);
    &::-webkit-scrollbar {
      width: 4px;
    }
    &::-webkit-scrollbar-track {
      background-color: var(--c-border);
    }
    &::-webkit-scrollbar-thumb {
      background-color: var(--c-brand);
    }
  }

  .toggle-aside {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
    transition: left var(--transform-transition);

    &:hover {
      background: rgba(127, 127, 127, 0.05);
      cursor: pointer;
    }
  }

  .aside-mask {
    position: fixed;
    z-index: 9;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    display: none;
    background: rgba(0, 0, 0, 0.15);
  }

  &.open {
    .aside-container {
      left: 0;
    }

    .toggle-aside {
      left: var(--page-aside-width);
    }
  }
}

@media (max-width: $sm) {
  .aside {
    .toggle-aside {
      display: none;
    }

    &.open {
      .aside-mask {
        display: block;
      }
    }
  }
}
</style>
