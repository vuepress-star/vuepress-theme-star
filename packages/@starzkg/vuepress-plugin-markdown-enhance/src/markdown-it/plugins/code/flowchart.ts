import hash from 'hash-sum'
import type MarkdownIt from 'markdown-it'
import type Token from 'markdown-it/lib/token.js'

export const resolveFlowChart = (
  md: MarkdownIt,
  tokens: Token[],
  idx: number
): string => {
  const token = tokens[idx]
  const key = `flowchart-${hash(idx)}`
  const { content, info } = token
  const realInfo = info.trim().split(':')[0]

  if (realInfo !== 'flow' && realInfo !== 'flowchart') return ''

  return `<FlowChart id="${key}" code="${encodeURIComponent(
    content
  )}" preset="${info.trim().split(':')[1] || 'vue'}"></FlowChart>`
}

export default resolveFlowChart
