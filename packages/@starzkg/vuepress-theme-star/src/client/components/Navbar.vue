<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useNavbar } from '../composables/index.js'
import NavbarBadge from './NavbarBadge.vue'
import NavbarItems from './NavbarItems.vue'
import NavbarLogo from './NavbarLogo.js'
import ToggleNavbarButton from './ToggleNavbarButton.vue'
import ToggleSidebarButton from './ToggleSidebarButton.vue'

defineEmits(['toggle-sidebar'])

const navbar = useNavbar()

const navbarEl = ref<HTMLElement | null>(null)
const navbarBrand = ref<HTMLElement | null>(null)

const linksWrapperMaxWidth = ref(0)
const linksWrapperStyle = computed(() => {
  if (!linksWrapperMaxWidth.value) {
    return {}
  }
  return {
    maxWidth: linksWrapperMaxWidth.value + 'px',
  }
})
// avoid overlapping of long title and long navbar links
onMounted(() => {
  // TODO: migrate to css var
  // refer to _variables.scss
  const MOBILE_DESKTOP_BREAKPOINT = 719
  const navbarHorizontalPadding =
    getCssValue(navbarEl.value, 'paddingLeft') +
    getCssValue(navbarEl.value, 'paddingRight')
  const handleLinksWrapWidth = (): void => {
    if (window.innerWidth <= MOBILE_DESKTOP_BREAKPOINT) {
      linksWrapperMaxWidth.value = 0
    } else {
      linksWrapperMaxWidth.value =
        navbarEl.value!.offsetWidth -
        navbarHorizontalPadding -
        (navbarBrand.value?.offsetWidth || 0)
    }
  }
  handleLinksWrapWidth()
  window.addEventListener('resize', handleLinksWrapWidth, false)
  window.addEventListener('orientationchange', handleLinksWrapWidth, false)
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
  <header ref="navbarEl" class="navbar">
    <section class="navbar-wrapper">
      <div class="navbar-left">
        <ToggleSidebarButton @toggle="$emit('toggle-sidebar')" />
        <div class="navbar-items-wrapper" :style="linksWrapperStyle">
          <slot name="before" />
          <NavbarItems class="can-hide" is-header />
          <slot name="after" />
        </div>
      </div>
      <div class="navbar-middle">
        <NavbarBadge />
      </div>
      <div class="navbar-right">
        <NavbarSearch />
        <ToggleNavbarButton />
      </div>
    </section>
    <Transition name="fade">
      <section v-if="navbar.open" class="navbar-mobile-wrapper">
        <div class="navbar-items-wrapper">
          <slot name="before" />
          <NavbarItems :is-header="false" />
          <slot name="after" />
        </div>
        <div class="navbar-brand-wrapper">
          <NavbarLogo />
        </div>
      </section>
    </Transition>
  </header>
</template>
