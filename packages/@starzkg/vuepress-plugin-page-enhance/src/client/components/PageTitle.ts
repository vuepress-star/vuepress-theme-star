import { usePageData, usePageFrontmatter } from '@vuepress/client'
import { defineComponent, h, ref, resolveComponent } from 'vue'
import type { VNode } from 'vue'
import type { CommentPluginFrontmatter } from '../../shared'

export default defineComponent({
  name: 'PageTitle',

  setup() {
    const page = usePageData()
    const frontmatter = usePageFrontmatter<CommentPluginFrontmatter>()
    // const iconPrefix = useIconPrefix()
    const iconPrefix = ref('icon')

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
