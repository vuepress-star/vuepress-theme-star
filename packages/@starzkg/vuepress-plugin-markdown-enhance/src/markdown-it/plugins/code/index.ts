import type MarkdownIt from 'markdown-it'
import type { PluginWithOptions } from 'markdown-it'
import { resolveChart } from './chart.js'
import { resolveCopy } from './copy.js'
import { resolveEcharts } from './echarts.js'
import { resolveFlowChart } from './flowchart.js'
import { resolveMarkmap } from './markmap.js'
import { resolveMermaid } from './mermaid.js'
import { resolvePlantUML } from './plantuml.js'
import { resolveReveal } from './reveal.js'

export interface CodeEnhancePluginOptions {
  copy?: boolean
  chart?: boolean
  echarts?: boolean
  flowchart?: boolean
  markmap?: boolean
  mermaid?: boolean
  plantuml?: boolean
  reveal?: boolean
}

export const codeEnhance: PluginWithOptions<CodeEnhancePluginOptions> = (
  md: MarkdownIt,
  { copy, chart, echarts, flowchart, markmap, mermaid, plantuml, reveal } = {
    copy: true,
    chart: true,
    echarts: true,
    flowchart: true,
    markmap: true,
    mermaid: true,
    plantuml: true,
    reveal: true,
  }
): void => {
  const fence = md.renderer.rules.fence
  // override vuepress default fence renderer
  md.renderer.rules.fence = (...args): string => {
    const result = fence!(...args)
    const [tokens, index] = args
    const { info } = tokens[index]
    return `<div class="code-enhance">
              ${chart ? resolveChart(md, tokens, index) : ''}
              ${echarts ? resolveEcharts(md, tokens, index) : ''}
              ${flowchart ? resolveFlowChart(md, tokens, index) : ''}
              ${markmap ? resolveMarkmap(md, tokens, index) : ''}
              ${mermaid ? resolveMermaid(md, tokens, index) : ''}
              ${plantuml ? resolvePlantUML(md, tokens, index) : ''}
              ${reveal ? resolveReveal(md, tokens, index) : ''}
              ${result}
              ${copy ? resolveCopy(info) : ''}
            </div>`
  }
}
