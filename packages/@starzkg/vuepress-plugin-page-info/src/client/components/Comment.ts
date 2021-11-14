// TODO: Support it when vssue support vuepress2
// import { usePageTitle } from "@starzkg/vuepress-shared/lib/esm/client";
import { usePageFrontmatter } from '@vuepress/client'
import Waline from '@Waline'
import { computed, defineComponent, h } from 'vue'
import type { VNode } from 'vue'
import type { CommentPluginFrontmatter } from '../../shared'
import { commentOptions } from '../define'

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Comment',

  setup() {
    const frontmatter = usePageFrontmatter<CommentPluginFrontmatter>()

    const type = commentOptions.type

    const enable = computed(() => {
      return (
        commentOptions.type !== 'disable' &&
        (frontmatter.value.comment ||
          (commentOptions.comment !== false &&
            (commentOptions.type === 'waline' ||
              frontmatter.value.comment !== false)))
      )
    })

    return (): VNode | null =>
      type === 'waline'
        ? h(Waline, { style: { display: enable.value ? 'block' : 'none' } })
        : // : type === "vssue"
          // ? h(Vssue, {
          //     title: usePageTitle().value,
          //     style: { display: enable.value ? "block" : "none" },
          //   })
          null
  },
})
