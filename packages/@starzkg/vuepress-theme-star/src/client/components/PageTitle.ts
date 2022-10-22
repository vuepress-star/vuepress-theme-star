import Icon from '@theme/Icon.js'
import { usePageData, usePageFrontmatter } from '@vuepress/client'
import { defineComponent, h } from 'vue'
import type { VNode } from 'vue'

interface PageTitleFrontmatter {
  title: string
  icon?: string
}

export default defineComponent({
  name: 'PageTitle',

  setup() {
    const page = usePageData()
    const frontmatter = usePageFrontmatter<PageTitleFrontmatter>()
    return (): VNode =>
      h('div', { class: 'page-title' }, [
        frontmatter.value.icon
          ? h(h(Icon, { icon: frontmatter.value.icon, size: '32' }), {
              class: 'page-title-icon',
            })
          : null,
        h('h1', page.value.title),
      ])
  },
})
