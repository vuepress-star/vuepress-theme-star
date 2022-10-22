<script setup lang="ts">
import { useNavbar } from '../composables/index.js'
import NavbarItems from './NavbarItems.vue'
import NavbarLogo from './NavbarLogo.js'
import ToggleNavbarButton from './ToggleNavbarButton.vue'
import ToggleSidebarButton from './ToggleSidebarButton.vue'

const navbar = useNavbar()
</script>

<template>
  <nav v-if="navbar.enable" class="navbar">
    <section ref="navbarWrapper" class="navbar-wrapper">
      <div class="navbar-left">
        <ToggleSidebarButton />
        <div class="navbar-logo">
          <NavbarLogo />
        </div>
        <div class="navbar-items-wrapper">
          <slot name="before" />
          <NavbarItems />
          <slot name="after" />
        </div>
      </div>
      <div class="navbar-middle">
        <NavbarSearch />
      </div>
      <div class="navbar-right">
        <ToggleNavbarButton />
      </div>
    </section>
    <Transition name="fade">
      <section v-if="navbar.open" class="navbar-mobile-wrapper">
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
  </nav>
</template>
