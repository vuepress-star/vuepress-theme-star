import type { BaseThemeConfig } from '@starzkg/vuepress-shared'
import { useIconPrefix } from '@starzkg/vuepress-shared/es/client'
import { usePageFrontmatter, usePagesData } from '@vuepress/client'
import { useThemeData } from '@vuepress/plugin-theme-data/lib/client'
import { computed, defineComponent, h, onMounted, ref, watch } from 'vue'
import type { VNode } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { getLinks } from '../composables'

interface BreadCrumbConfig {
  title: string
  icon?: string
  url: string
}

export default defineComponent({
  name: 'BreadCrumb',

  setup() {
    const pageFrontmatter = usePageFrontmatter()
    const themeData = useThemeData<BaseThemeConfig>()
    const pagesData = usePagesData()
    const route = useRoute()
    const iconPrefix = useIconPrefix()

    const config = ref<BreadCrumbConfig[]>([])

    const enable = computed<boolean>(() => {
      const globalEnable = themeData.value.breadcrumb !== false
      const pageEnable = pageFrontmatter.value.breadcrumb

      return (
        ((globalEnable && pageEnable !== false) || pageEnable === true) &&
        config.value.length > 1
      )
    })

    const iconEnable = computed<boolean>(() => {
      const globalEnable = themeData.value.breadcrumbIcon !== false
      const pageEnable = pageFrontmatter.value.breadcrumbIcon

      return (
        enable.value &&
        ((globalEnable && pageEnable !== false) || pageEnable === true)
      )
    })

    const updateConfig = async (): Promise<void> => {
      const breadcrumbConfig: BreadCrumbConfig[] = []
      const pages = pagesData.value
      const links = getLinks(route)

      // generate breadcrumb config
      for (let i = 1; i < links.length; i++) {
        for (const key in pages) {
          const page = await pages[key]()
          if (page.path === links[i]) {
            breadcrumbConfig.push({
              title: page.title,
              icon: page.frontmatter.icon as string,
              url: page.path,
            })
            break
          }
        }
      }

      if (breadcrumbConfig.length > 1) config.value = breadcrumbConfig
    }

    watch(() => route.path, updateConfig)

    onMounted(() => {
      updateConfig()
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
              config.value.map((item, index) =>
                h(
                  'li',
                  {
                    class: { 'is-active': config.value.length - 1 === index },
                    property: 'itemListElement',
                    typeof: 'ListItem',
                  },
                  h(
                    RouterLink,
                    {
                      to: item.url,
                      property: 'item',
                      typeof: 'WebPage',
                    },
                    {
                      default() {
                        return [
                          // icon
                          item.icon && iconEnable.value
                            ? h('i', {
                                class: [
                                  'iconfont',
                                  `${iconPrefix.value}${item.icon}`,
                                ],
                              })
                            : null,
                          // text
                          h(
                            'span',
                            { property: 'name' },
                            item.title || 'Unknown'
                          ),
                          // meta
                          h('meta', {
                            property: 'position',
                            content: index + 1,
                          }),
                        ]
                      },
                    }
                  )
                )
              )
            )
          : []
      )
  },
})
