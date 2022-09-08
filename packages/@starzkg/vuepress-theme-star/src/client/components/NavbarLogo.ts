import { ClientOnly, useSiteLocaleData, withBase } from '@vuepress/client'
import type { FunctionalComponent } from 'vue'
import { computed, h } from 'vue'
import { useDarkMode, useThemeLocaleData } from '../composables/index.js'

const NavbarLogo: FunctionalComponent = () => {
  const siteLocale = useSiteLocaleData()
  const themeLocale = useThemeLocaleData()
  const isDarkMode = useDarkMode()

  const navbarBrandTitle = computed(() => siteLocale.value.title)
  const navbarBrandLogo = computed(() => {
    if (isDarkMode.value && themeLocale.value.logoDark !== undefined) {
      return themeLocale.value.logoDark
    }
    return themeLocale.value.logo
  })
  if (!navbarBrandLogo.value) return null
  const img = h('img', {
    class: 'logo',
    src: withBase(navbarBrandLogo.value),
    alt: navbarBrandTitle.value,
  })
  if (themeLocale.value.logoDark === undefined) {
    return img
  }
  // wrap brand logo with <ClientOnly> to avoid ssr-mismatch
  // when using a different brand logo in dark mode
  return h(ClientOnly, img)
}

export default NavbarLogo
