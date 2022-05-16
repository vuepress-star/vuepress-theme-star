import FlowChart from '@FlowChart'
import Mermaid from '@Mermaid'
import Presentation from '@Presentation'
import { defineClientConfig } from '@vuepress/client'
import { onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { initDemo } from './demo'
import './styles/index.scss'
import './styles/code-demo.scss'

declare const MARKDOWN_ENHANCE_ALIGN: boolean
declare const MARKDOWN_ENHANCE_FOOTNOTE: boolean
declare const MARKDOWN_ENHANCE_MERMAID: boolean
declare const MARKDOWN_ENHANCE_PRESENTATION: boolean
declare const MARKDOWN_ENHANCE_TASKLIST: boolean
declare const MARKDOWN_ENHANCE_TEX: boolean
export default defineClientConfig({
  enhance: ({ app }) => {
    if (MARKDOWN_ENHANCE_ALIGN) import('./styles/align.scss')

    if (MARKDOWN_ENHANCE_FOOTNOTE) import('./styles/footnote.scss')

    app.component('FlowChart', FlowChart)
    if (MARKDOWN_ENHANCE_MERMAID) app.component('MermaidChart', Mermaid)

    if (MARKDOWN_ENHANCE_PRESENTATION) {
      app.component('PresentationViewer', Presentation)
      import('./styles/slides.scss')
      import('./styles/theme/fonts/league-gothic/league-gothic.css')
      import('./styles/theme/fonts/source-sans-pro/source-sans-pro.css')
    }

    if (MARKDOWN_ENHANCE_TASKLIST) import('./styles/tasklist.scss')

    if (MARKDOWN_ENHANCE_TEX) {
      import('./styles/tex.scss')
      import('katex/dist/katex.min.css')
    }
  },
  setup() {
    const route = useRoute()

    watch(
      () => route.path,
      () => initDemo()
    )

    onMounted(() => initDemo())
  },
})
