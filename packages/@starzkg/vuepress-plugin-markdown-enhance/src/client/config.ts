import { defineClientConfig } from '@vuepress/client'
import type { CodeEnhanceOptions } from '../shared/index.js'
import { Chart } from './components/chart/index.js'
import { CodeCopyButton } from './components/code-copy-button/index.js'
import { CodeDemo } from './components/code-demo/index.js'
import { CodeGroup, CodeGroupItem } from './components/code-group/index.js'
import { ECharts } from './components/echarts/index.js'
import { FlowChart } from './components/flowchart/index.js'
import { Markmap } from './components/markmap/index.js'
import { Mermaid } from './components/mermaid/index.js'
import { PDF } from './components/pdf/index.js'
import { PlantUML } from './components/plantuml/index.js'
import { Reveal } from './components/reveal/index.js'
import 'balloon-css/balloon.css'

declare const MARKDOWN_ENHANCE_ALIGN: boolean
declare const MARKDOWN_ENHANCE_CONTAINER: boolean
declare const MARKDOWN_ENHANCE_CODE_DEMO: boolean
declare const MARKDOWN_ENHANCE_COLOR_MODEL: boolean
declare const MARKDOWN_ENHANCE_CODE_ENHANCE: CodeEnhanceOptions
declare const MARKDOWN_ENHANCE_FOOTNOTE: boolean
declare const MARKDOWN_ENHANCE_IMPORT: boolean
declare const MARKDOWN_ENHANCE_TASKLIST: boolean
declare const MARKDOWN_ENHANCE_TEX: boolean
declare const MARKDOWN_ENHANCE_KATEX: boolean
export default defineClientConfig({
  enhance: ({ app }) => {
    app.component('CodeGroup', CodeGroup)
    app.component('CodeGroupItem', CodeGroupItem)

    if (MARKDOWN_ENHANCE_ALIGN) import('./styles/align.scss')

    if (MARKDOWN_ENHANCE_CONTAINER) import('./styles/container/index.scss')

    if (MARKDOWN_ENHANCE_CODE_DEMO) app.component('CodeDemo', CodeDemo)

    if (MARKDOWN_ENHANCE_COLOR_MODEL) import('./styles/color-model.scss')

    if (MARKDOWN_ENHANCE_CODE_ENHANCE) {
      import('./styles/code-enhance.scss')
      if (MARKDOWN_ENHANCE_CODE_ENHANCE.chart) {
        app.component('Chart', Chart)
      }

      if (MARKDOWN_ENHANCE_CODE_ENHANCE.echarts) {
        app.component('ECharts', ECharts)
      }

      if (MARKDOWN_ENHANCE_CODE_ENHANCE.flowchart) {
        app.component('FlowChart', FlowChart)
      }

      if (MARKDOWN_ENHANCE_CODE_ENHANCE.mermaid) {
        app.component('Mermaid', Mermaid)
      }

      if (MARKDOWN_ENHANCE_CODE_ENHANCE.markmap) {
        app.component('Markmap', Markmap)
      }

      if (MARKDOWN_ENHANCE_CODE_ENHANCE.plantuml) {
        app.component('PlantUML', PlantUML)
      }

      if (MARKDOWN_ENHANCE_CODE_ENHANCE.reveal) {
        app.component('Reveal', Reveal)
      }

      if (MARKDOWN_ENHANCE_CODE_ENHANCE.copy) {
        app.component('CodeCopyButton', CodeCopyButton)
      }
    }

    if (MARKDOWN_ENHANCE_FOOTNOTE) import('./styles/footnote.scss')

    if (MARKDOWN_ENHANCE_IMPORT) app.component('PDF', PDF)

    if (MARKDOWN_ENHANCE_TASKLIST) import('./styles/task-list.scss')

    if (MARKDOWN_ENHANCE_TEX) {
      import('./styles/tex.scss')
      if (MARKDOWN_ENHANCE_KATEX) import('katex/dist/katex.min.css')
    }
  },
})
