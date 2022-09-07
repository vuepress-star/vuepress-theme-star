<script setup lang="ts">
import { useThemeLocaleData } from '../composables/index.js'

defineEmits(['toggle'])

const themeLocale = useThemeLocaleData()
</script>

<template>
  <div
    class="toggle-navbar-button"
    :title="themeLocale.toggleNavbar"
    aria-expanded="false"
    role="button"
    tabindex="0"
    @click="$emit('toggle')"
  >
    <div class="icon button-container" aria-hidden="true">
      <span class="button-top"></span>
      <span class="button-middle"></span>
      <span class="button-bottom"></span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.toggle-navbar-button {
  position: absolute;
  display: none;
  align-items: center;
  justify-content: center;
  top: 0.6rem;
  right: 1rem;
  padding: 0.6rem;
  cursor: pointer;

  .button-container {
    position: relative;
    overflow: hidden;
    width: 1.25rem;
    height: 1.25rem;
  }

  .button-top,
  .button-middle,
  .button-bottom {
    position: absolute;

    width: 1.25rem;
    height: 0.125rem;

    background-color: var(--dark-grey);

    transition: top 0.25s, background-color 0.5s, transform 0.25s;
  }

  .button-top {
    top: 0.125rem;
    left: 0;
    transform: translateX(0);
  }

  .button-middle {
    top: 0.5rem;
    left: 0;
    transform: translateX(8px);
  }

  .button-bottom {
    top: 0.875rem;
    left: 0;
    transform: translateX(4px);
  }

  &:hover {
    .button-top {
      top: 0.125rem;
      left: 0;
      transform: translateX(4px);
    }

    .button-middle {
      top: 0.5rem;
      left: 0;
      transform: translateX(0);
    }

    .button-bottom {
      top: 0.875rem;
      left: 0;
      transform: translateX(8px);
    }
  }

  &.is-active {
    .button-top {
      top: 0.375rem;
      transform: translateX(0) rotate(225deg);
    }

    .button-middle {
      top: 0.375rem;
      transform: translateX(16px);
    }

    .button-bottom {
      top: 0.375rem;
      transform: translateX(0) rotate(135deg);
    }

    &:hover {
      .button-top,
      .button-middle,
      .button-bottom {
        background-color: var(--theme-color);
        transition: top 0.25s, background-color 0.25s, transform 0.25s;
      }
    }
  }
}
</style>
