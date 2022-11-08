<script lang="ts" setup>
import { clearAllBodyScrollLocks, disableBodyScroll } from 'body-scroll-lock'
import { ref } from 'vue'
import NavbarItems from './NavbarItems.vue'
import NavbarLogo from './NavbarLogo.js'
defineProps<{
  open: boolean
}>()

const screen = ref<HTMLElement | null>(null)

const lockBodyScroll = (): void => {
  disableBodyScroll(screen.value!, { reserveScrollBarGap: true })
}

const unlockBodyScroll = (): void => {
  clearAllBodyScrollLocks()
}
</script>

<template>
  <Transition
    name="fade"
    @enter="lockBodyScroll"
    @after-leave="unlockBodyScroll"
  >
    <div v-if="open" ref="screen" class="nav-screen">
      <div class="container">
        <slot name="nav-screen-content-before" />
        <NavbarItems mode="vertical" />
        <div class="navbar-brand">
          <NavbarLogo />
        </div>
        <slot name="nav-screen-content-after" />
      </div>
    </div>
  </Transition>
</template>

<style lang="scss" scoped></style>
