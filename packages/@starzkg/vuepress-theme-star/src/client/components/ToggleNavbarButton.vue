<script setup lang="ts">
import { useNavbar, useThemeLocaleData } from '../composables/index.js'

const themeLocale = useThemeLocaleData()
const navbar = useNavbar()
</script>

<template>
  <div
    v-if="navbar.enable"
    class="toggle-navbar-button"
    :title="themeLocale.toggleNavbar"
    aria-expanded="false"
    role="button"
    tabindex="0"
    @click="navbar.toggle"
  >
    <div class="icon" aria-hidden="true">
      <span></span>
      <span></span>
      <span></span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.toggle-navbar-button {
  position: absolute;
  display: block;
  top: 0.6rem;
  right: 1rem;
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
    width: 1.25rem;
    height: 0.125rem;

    background-color: var(--c-text);
    transition: top var(--t-transform), background-color 0.5s,
      transform var(--t-transform);

    &:nth-child(1) {
      transform: translateX(0);
    }
    &:nth-child(2) {
      margin: 0.4rem 0;
      transform: translateX(0.5rem);
    }
    &:nth-child(3) {
      transform: translateX(0.25rem);
    }
  }

  &:hover {
    span {
      &:nth-child(1) {
        transform: translateX(0.25rem);
      }
      &:nth-child(2) {
        transform: translateX(0);
      }
      &:nth-child(3) {
        transform: translateX(0.5rem);
      }
    }
  }

  .navbar-open & {
    span {
      &:nth-child(1) {
        transform: translateX(0) translateY(0.5rem) rotate(225deg);
      }
      &:nth-child(2) {
        transform: translateX(1.25rem);
      }
      &:nth-child(3) {
        transform: translateX(0) translateY(-0.5rem) rotate(135deg);
      }
    }

    &:hover {
      span {
        background-color: var(--c-text);
        transition: top 0.25s, background-color 0.25s, transform 0.25s;
      }
    }
  }
}
</style>
