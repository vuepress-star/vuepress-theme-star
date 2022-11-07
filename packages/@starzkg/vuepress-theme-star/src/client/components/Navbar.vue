<script setup lang="ts">
import { useNavbar } from '../composables/index.js'
import NavbarBrand from './NavbarBrand.vue'
import NavbarItems from './NavbarItems.vue'
import NavbarLogo from './NavbarLogo.js'
import Search from './Search.vue'
import ToggleNavbarButton from './ToggleNavbarButton.vue'

const navbar = useNavbar()
</script>

<template>
  <div v-if="navbar.enable" class="nav">
    <div class="nav-bar">
      <div class="navbar-title">
        <NavbarBrand />
      </div>
      <div class="content">
        <Search />
        <slot name="before" />
        <NavbarItems />
        <slot name="after" />
        <ToggleNavbarButton />
      </div>
    </div>
    <Transition name="fade">
      <div v-if="navbar.open" class="nav-screen">
        <slot name="before" />
        <NavbarItems mode="vertical" />
        <slot name="after" />
        <div class="navbar-brand">
          <NavbarLogo />
        </div>
      </div>
    </Transition>
  </div>
</template>
