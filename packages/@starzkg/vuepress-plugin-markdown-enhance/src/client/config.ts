import { defineClientConfig } from '@vuepress/client'
import { onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { Chart } from './components/chart/index.js'
import { CodeGroup, CodeGroupItem } from './components/code-group/index.js'
import { ECharts } from './components/echarts/index.js'
import { FlowChart } from './components/flowchart/index.js'
import { Mermaid } from './components/mermaid/index.js'
import { Reveal } from './components/reveal/index.js'
import { initDemo } from './demo/index.js'
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
    app.component('CodeGroup', CodeGroup)
    app.component('CodeGroupItem', CodeGroupItem)

    if (MARKDOWN_ENHANCE_ALIGN) import('./styles/align.scss')

    if (MARKDOWN_ENHANCE_FOOTNOTE) import('./styles/footnote.scss')

    app.component('Chart', Chart)
    app.component('ECharts', ECharts)
    app.component('FlowChart', FlowChart)
    if (MARKDOWN_ENHANCE_MERMAID) app.component('Mermaid', Mermaid)

    if (MARKDOWN_ENHANCE_PRESENTATION) {
      app.component('Reveal', Reveal)
    }

    if (MARKDOWN_ENHANCE_TASKLIST) import('./styles/task-list.scss')

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
