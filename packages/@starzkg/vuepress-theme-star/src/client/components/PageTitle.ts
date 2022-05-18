import { usePageData, usePageFrontmatter } from '@vuepress/client'
import { defineComponent, h, resolveComponent } from 'vue'
import type { VNode } from 'vue'
import { useIconPrefix } from '../composables'

interface PageTitleFrontmatter {
  title: string
  icon: string
}

export default defineComponent({
  name: 'PageTitle',

  setup() {
    const page = usePageData()
    const frontmatter = usePageFrontmatter<PageTitleFrontmatter>()
    const iconPrefix = useIconPrefix()

    return (): VNode =>
      h('div', { class: 'page-title' }, [
        frontmatter.value.icon
          ? h(
              resolveComponent(
                `${iconPrefix.value}${frontmatter.value.icon}`,
                false
              ),
              { class: 'page-title-icon' }
            )
          : null,
        h('h1', page.value.title),
      ])
  },
})
