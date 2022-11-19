import { usePageFrontmatter, useRouteLocale } from '@vuepress/client'
import { computed, defineComponent, h } from 'vue'
import type { VNode } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { useThemeLocaleData } from '../composables/index.js'
import Icon from './Icon.js'

import '../styles/breadcrumb.scss'

export default defineComponent({
  name: 'BreadCrumb',

  setup() {
    const router = useRouter()
    const route = useRoute()
    const routeLocale = useRouteLocale()
    const pageFrontmatter = usePageFrontmatter()
    const themeLocale = useThemeLocaleData()

    const breadcrumbs = computed(() => {
      return router
        .getRoutes()
        .filter(
          (item) =>
            item.name &&
            item.path.startsWith(routeLocale.value) &&
            route.path.startsWith(item.path)
        )
    })

    const enable = computed<boolean>(() => {
      return (
        pageFrontmatter.value.breadcrumb !== false &&
        themeLocale.value.breadcrumb !== false &&
        breadcrumbs.value.length > 1
      )
    })

    const iconEnable = computed<boolean>(() => {
      return (
        enable.value &&
        pageFrontmatter.value.breadcrumbIcon !== false &&
        themeLocale.value.breadcrumbIcon !== false
      )
    })

    return (): VNode =>
      h(
        'nav',
        { class: { breadcrumb: true, disable: !enable.value } },
        enable.value
          ? h(
              'ol',
              {
                vocab: 'https://schema.org/',
                typeof: 'BreadcrumbList',
              },
              breadcrumbs.value.map((item, index) =>
                h(
                  'li',
                  {
                    class: {
                      'is-active': breadcrumbs.value.length - 1 === index,
                    },
                    property: 'itemListElement',
                    typeof: 'ListItem',
                  },
                  [
                    h(
                      RouterLink,
                      {
                        to: item.path,
                        property: 'item',
                        typeof: 'WebPage',
                      },
                      () => [
                        // icon
                        item.meta.icon && iconEnable.value
                          ? h(Icon, { icon: item.meta.icon })
                          : null,
                        // text
                        h(
                          'span',
                          { property: 'name' },
                          item.meta.title || 'Unknown'
                        ),
                      ]
                    ),
                    // meta
                    h('meta', {
                      property: 'position',
                      content: index + 1,
                    }),
                  ]
                )
              )
            )
          : []
      )
  },
})
