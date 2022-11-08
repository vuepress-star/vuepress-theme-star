import { usePageData, usePageFrontmatter } from '@vuepress/client'
import { computed, defineComponent, h } from 'vue'
import type { VNode } from 'vue'
import { RouterLink } from 'vue-router'
import type { StarPageData } from '../../shared/index.js'
import Icon from './Icon.js'

export default defineComponent({
  name: 'BreadCrumb',

  setup() {
    const pageFrontmatter = usePageFrontmatter()
    const pageData = usePageData<StarPageData>()

    const config = computed(() => {
      return pageData.value.breadcrumb
    })

    const enable = computed<boolean>(() => {
      const pageEnable = pageFrontmatter.value.breadcrumb

      return pageEnable !== false && config.value.length > 1
    })

    const iconEnable = computed<boolean>(() => {
      const pageEnable = pageFrontmatter.value.breadcrumbIcon

      return enable.value && pageEnable !== false
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
                      to: item.path,
                      property: 'item',
                      typeof: 'WebPage',
                    },
                    {
                      default() {
                        return [
                          // icon
                          item.icon && iconEnable.value
                            ? h(Icon, { icon: item.icon })
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
