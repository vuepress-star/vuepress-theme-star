<script setup lang="ts">
import { useRouteLocale, useSiteLocaleData } from '@vuepress/client'
import { isString } from '@vuepress/shared'
import { computed } from 'vue'
import type { ComputedRef } from 'vue'
import { useRouter } from 'vue-router'
import type {
  NavbarGroup,
  NavbarItem,
  ResolvedNavbarItem,
} from '../../shared/index.js'
import { useNavLink, useThemeLocaleData } from '../composables/index.js'
import AutoLink from './AutoLink.vue'
import NavbarDropdown from './NavbarDropdown.vue'

const props = withDefaults(
  defineProps<{
    mode: 'horizontal' | 'vertical'
  }>(),
  { mode: 'horizontal' }
)

/**
 * Get navbar config of select language dropdown
 */
const useNavbarSelectLanguage = (): ComputedRef<ResolvedNavbarItem[]> => {
  const router = useRouter()
  const routeLocale = useRouteLocale()
  const siteLocale = useSiteLocaleData()
  const themeLocale = useThemeLocaleData()

  return computed<ResolvedNavbarItem[]>(() => {
    const localePaths = Object.keys(siteLocale.value.locales)
    // do not display language selection dropdown if there is only one language
    if (localePaths.length < 2) {
      return []
    }
    const currentPath = router.currentRoute.value.path
    const currentFullPath = router.currentRoute.value.fullPath
    const currentHash = router.currentRoute.value.hash

    const languageDropdown: ResolvedNavbarItem = {
      text: themeLocale.value.selectLanguageText ?? 'unknown language',
      ariaLabel:
        themeLocale.value.selectLanguageAriaLabel ??
        themeLocale.value.selectLanguageText ??
        'unknown language',
      children: localePaths.map((targetLocalePath) => {
        // target locale config of this language link
        const targetSiteLocale =
          siteLocale.value.locales?.[targetLocalePath] ?? {}
        const targetThemeLocale =
          themeLocale.value.locales?.[targetLocalePath] ?? {}
        const targetLang = `${targetSiteLocale.lang}`

        const text = targetThemeLocale.selectLanguageName ?? targetLang
        let link

        if (targetLang === siteLocale.value.lang) {
          // if the target language is current language
          // stay at current link
          link = currentFullPath
        } else {
          // if the target language is not current language
          // try to link to the corresponding page of current page
          // or fallback to homepage
          const targetLocalePage = currentPath.replace(
            routeLocale.value,
            targetLocalePath
          )
          if (
            router.getRoutes().some((item) => item.path === targetLocalePage)
          ) {
            // try to keep current hash across languages
            link = `${targetLocalePage}${currentHash}`
          } else {
            link = targetThemeLocale.home ?? targetLocalePath
          }
        }

        return {
          text,
          link,
        }
      }),
    }

    return [languageDropdown]
  })
}

const resolveNavbarItem = (
  item: NavbarItem | NavbarGroup | string
): ResolvedNavbarItem => {
  if (isString(item)) {
    return useNavLink(item)
  }
  if ((item as NavbarGroup).children) {
    return {
      ...item,
      children: (item as NavbarGroup).children.map(resolveNavbarItem),
    }
  }
  return item as ResolvedNavbarItem
}

const useNavbarConfig = (): ComputedRef<ResolvedNavbarItem[]> => {
  const themeLocale = useThemeLocaleData()
  return computed(() => (themeLocale.value.navbar || []).map(resolveNavbarItem))
}

const navbarConfig = useNavbarConfig()
const navbarSelectLanguage = useNavbarSelectLanguage()
const navbarLinks = computed(() => [
  ...navbarConfig.value,
  ...navbarSelectLanguage.value,
])
</script>

<template>
  <ul role="menubar" :class="['menu', 'menu-' + props.mode]">
    <li
      v-for="item in navbarLinks"
      :key="item.text"
      role="menuitem"
      class="menu-item"
    >
      <NavbarDropdown v-if="item.children" :item="item" :mode="props.mode" />
      <AutoLink v-else :item="item" />
    </li>
  </ul>
</template>

<style lang="scss">
.menu {
  list-style: none;
  position: relative;
  margin: 0;
  padding-left: 0;
  box-sizing: border-box;

  a {
    display: flex;
    align-items: center;
    line-height: 1.4rem;
    color: inherit;
    font-weight: 600;
  }

  .menu-item {
    display: block;
    line-height: 1.25rem;
    font-size: 1.1em;
    padding: 0.5rem 0 0.5rem 1.5rem;

    .icon {
      vertical-align: middle;
      margin-right: 5px;
      width: 24px;
      text-align: center;
    }
  }
}
</style>
