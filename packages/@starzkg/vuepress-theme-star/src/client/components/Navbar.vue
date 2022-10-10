<script setup lang="ts">
import { nextTick, onMounted, ref } from 'vue'
import { useNavbar } from '../composables/index.js'
import NavbarItems from './NavbarItems.vue'
import NavbarLogo from './NavbarLogo.js'
import ToggleNavbarButton from './ToggleNavbarButton.vue'
import ToggleSidebarButton from './ToggleSidebarButton.vue'

const navbar = useNavbar()

const navbarWrapper = ref<HTMLElement | null>(null)

const collapse = ref(false)
onMounted(() => {
  nextTick(() => {
    const handleCollapse = (): void => {
      collapse.value = navbarWrapper.value!.scrollWidth > window.innerWidth
    }
    handleCollapse()
    window.addEventListener('resize', handleCollapse)
    window.addEventListener('orientationchange', handleCollapse)
  })
})
</script>

<template>
  <header class="navbar" :class="{ collapse: collapse }">
    <section ref="navbarWrapper" class="navbar-wrapper">
      <div class="navbar-left">
        <ToggleSidebarButton v-show="collapse" />
        <div class="navbar-logo">
          <NavbarLogo />
        </div>
        <div v-show="!collapse" class="navbar-items-wrapper">
          <slot name="before" />
          <NavbarItems />
          <slot name="after" />
        </div>
      </div>
      <div class="navbar-middle">
        <NavbarSearch />
      </div>
      <div class="navbar-right">
        <ToggleNavbarButton v-show="collapse" />
      </div>
    </section>
    <Transition name="fade">
      <section v-if="collapse && navbar.open" class="navbar-mobile-wrapper">
        <div class="navbar-items-wrapper">
          <slot name="before" />
          <NavbarItems mode="vertical" />
          <slot name="after" />
        </div>
        <div class="navbar-brand-wrapper">
          <NavbarLogo />
        </div>
      </section>
    </Transition>
  </header>
</template>
