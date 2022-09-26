import { hash } from '@vuepress/utils'
import type { PluginSimple } from 'markdown-it'
import type MarkdownIt from 'markdown-it'
import type Token from 'markdown-it/lib/token.js'

/**
 * Resolve the `:json` / `:javascript` / `:js` mark from token info
 */
const resolveLanguage = (info: string): string => {
  info = info.toLowerCase()

  if (/:json\b/.test(info)) {
    return 'json'
  }

  if (/:javascript\b/.test(info)) {
    return 'javascript'
  }

  if (/:js\b/.test(info)) {
    return 'javascript'
  }

  return 'json'
}

export const chart: PluginSimple = (md: MarkdownIt): void => {
  const chartRender = (tokens: Token[], index: number): string => {
    const token = tokens[index]
    const key = `chart-${hash(index)}`
    const { content } = token

    // get token info
    const info = token.info ? md.utils.unescapeAll(token.info).trim() : ''

    const language = resolveLanguage(info)

    const title = tokens[index].info
      .trimStart()
      .slice(tokens[index].info.trimStart().indexOf(' '))
      .trim()

    return `<Chart id="${key}" language="${language}"
    title="${encodeURIComponent(title)}"
    code="${encodeURIComponent(content)}"/>`
  }

  // Handle ```chart blocks
  const fence = md.renderer.rules.fence

  md.renderer.rules.fence = (...args): string => {
    const [tokens, index] = args
    const { info } = tokens[index]

    if (info.trim().startsWith('chart')) return chartRender(tokens, index)

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return fence!(...args)
  }

  md.renderer.rules.chart = chartRender
}

export default chart
