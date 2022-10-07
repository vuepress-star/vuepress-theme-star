import { usePageFrontmatter } from '@vuepress/client'
import { defineComponent, h, onMounted, ref } from 'vue'
import type { PropType, VNode } from 'vue'
import type {
  RevealPluginOptions,
  RevealThemeType,
} from '../../../../shared/index.js'
import { delay } from '../../../utils/index.js'
import { Loading } from '../../loading/index.js'
import * as packages from '../plugins/index.js'

declare const MARKDOWN_ENHANCE_REVEAL: RevealPluginOptions

export default defineComponent({
  name: 'Reveal',

  props: {
    id: { type: String, required: true },
    code: { type: String, required: true },
    theme: { type: String as PropType<RevealThemeType>, default: 'auto' },
    config: {
      type: Object as PropType<RevealPluginOptions>,
      default: () => {
        return {}
      },
    },
  },

  setup(props) {
    const frontmatter = usePageFrontmatter<{ reveal: RevealPluginOptions }>()
    const code = ref('')
    const loading = ref(false)
    const revealContainer = ref<HTMLElement | null>(null)
    const revealElement = ref<HTMLElement | null>(null)

    onMounted(() => {
      if (revealElement.value) {
        code.value = decodeURIComponent(props.code)

        const promises: [
          Promise<void>,
          ...Promise<typeof import('reveal.js/dist/reveal.esm.js')>[]
        ] = [
          delay(),
          packages.reveal(),
          packages.markdown(),
          ...((MARKDOWN_ENHANCE_REVEAL.plugins || []) as string[]).map(
            (plugin) => packages[plugin]()
          ),
        ]

        Promise.all(promises).then(([, revealJS, ...plugins]) => {
          const Reveal = revealJS.default
          const reveal = new Reveal(revealElement.value!, {
            plugins: plugins.map((plugin) => plugin.default),
          })

          reveal
            .initialize({
              transition: 'slide',
              backgroundTransition: 'slide',
              hash: frontmatter.value.layout === 'Presentation',
              mouseWheel: frontmatter.value.layout === 'Presentation',
              embedded: frontmatter.value.layout !== 'Presentation',
              slideNumber: true,
              // Factor of the display size that should remain empty around the content
              margin: 0.1,

              // Bounds for smallest/largest possible scale to apply to content
              minScale: 0.2,
              maxScale: 1.0,
              ...(MARKDOWN_ENHANCE_REVEAL.revealConfig || {}),
              ...(frontmatter.value.reveal?.revealConfig || {}),
              ...(props.config?.revealConfig || {}),
            })
            .then(() => {
              loading.value = false
              reveal.configure({ backgroundTransition: 'slide' })
            })
        })
      }
    })

    return (): VNode =>
      h(
        'div',
        {
          ref: revealContainer,
          class: {
            'markdown-enhance-reveal': true,
            'loading': loading.value,
          },
        },
        [
          loading.value ? h(Loading) : null,
          h(
            'div',
            {
              'id': props.id,
              'ref': revealElement,
              'data-theme': props.theme,
              'class': ['reveal', 'reveal-viewport'],
            },
            h('div', {
              class: 'slides',
              style: { display: loading.value ? 'none' : 'block' },
              innerHTML: `<section data-markdown data-separator="^\\r?\\n---\\r?\\n$" data-separator-vertical="^\\r?\\n--\\r?\\n$"><script type="text/template">${code.value}</script></section>`,
            })
          ),
        ]
      )
  },
})
