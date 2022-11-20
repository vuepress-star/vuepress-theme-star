import {
  defineComponent,
  FunctionalComponent,
  h,
  resolveComponent,
  VNode,
} from 'vue'
import { useDarkMode } from '../composables/index.js'

export default defineComponent({
  name: 'Comment',
  setup: (props) => {
    const darkMode = useDarkMode()

    const CommentComponent: FunctionalComponent = (props) => {
      // compat with
      // @starzkg/vuepress-plugin-giscus-comment
      // @starzkg/vuepress-plugin-twikoo-comment
      // @starzkg/vuepress-plugin-waline-comment
      const comment =
        resolveComponent('GiscusComment') ||
        resolveComponent('TwikooComment') ||
        resolveComponent('WalineComment')
      return h(comment)
    }

    return (): VNode | null =>
      h(
        'div',
        {
          class: 'comment-wrapper',
        },
        h(CommentComponent, { darkmode: darkMode.value, ...props })
      )
  },
})
