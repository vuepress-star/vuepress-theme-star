<script setup lang="ts">
import { nextTick, onMounted, ref } from 'vue'
import { useNavbar } from '../composables/index.js'
import NavbarBadge from './NavbarBadge.vue'
import NavbarItems from './NavbarItems.vue'
import NavbarLogo from './NavbarLogo.js'
import ToggleNavbarButton from './ToggleNavbarButton.vue'
import ToggleSidebarButton from './ToggleSidebarButton.vue'

const navbar = useNavbar()

const navbarEl = ref<HTMLElement | null>(null)
const navbarLeft = ref<HTMLElement | null>(null)
const navbarMiddle = ref<HTMLElement | null>(null)
const navbarRight = ref<HTMLElement | null>(null)
const navbarItemsWrapper = ref<HTMLElement | null>(null)

const collapse = ref(false)
onMounted(() => {
  nextTick(() => {
    const navbarItemsWrapperWidth = getCssValue(
      navbarItemsWrapper.value,
      'width'
    )
    const handleCollapse = (): void => {
      collapse.value = navbarLeft.value!.offsetWidth < navbarItemsWrapperWidth
    }
    handleCollapse()
    window.addEventListener('resize', handleCollapse, false)
    window.addEventListener('orientationchange', handleCollapse, false)
  })
})

function getCssValue(el: HTMLElement | null, property: string): number {
  // NOTE: Known bug, will return 'auto' if style value is 'auto'
  const val = el?.ownerDocument?.defaultView?.getComputedStyle(el, null)?.[
    property
  ]
  const num = Number.parseInt(val, 10)
  return Number.isNaN(num) ? 0 : num
}
</script>

<template>
  <header ref="navbarEl" class="navbar" :class="{ collapse: collapse }">
    <section class="navbar-wrapper">
      <div ref="navbarLeft" class="navbar-left">
        <ToggleSidebarButton v-show="collapse" />
        <div
          v-show="!collapse"
          ref="navbarItemsWrapper"
          class="navbar-items-wrapper"
        >
          <slot name="before" />
          <NavbarItems />
          <slot name="after" />
        </div>
      </div>
      <div ref="navbarMiddle" class="navbar-middle">
        <NavbarBadge />
      </div>
      <div ref="navbarRight" class="navbar-right">
        <NavbarSearch />
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
