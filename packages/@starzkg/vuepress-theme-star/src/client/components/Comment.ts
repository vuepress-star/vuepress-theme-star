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
  setup: () => {
    const darkMode = useDarkMode()

    const CommentComponent: FunctionalComponent = (props) => {
      const comment =
        resolveComponent('GiscusComment') ||
        resolveComponent('TwikooComment') ||
        resolveComponent('WalineComment')
      return comment ? h(h(comment), props) : null
    }

    return (): VNode | null =>
      h(
        'div',
        {
          class: {
            'comment-wrapper': true,
          },
        },
        h(CommentComponent, { darkmode: darkMode.value })
      )
  },
})
