import { hash } from '@vuepress/utils'
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

export const resolveChart = (
  md: MarkdownIt,
  tokens: Token[],
  index: number
): string => {
  const token = tokens[index]
  const key = `chart-${hash(index)}`
  const { content } = token

  // get token info
  const info = token.info ? md.utils.unescapeAll(token.info).trim() : ''

  if (!info.trim().startsWith('chart')) return ''

  const language = resolveLanguage(info)

  const title = info
    .trimStart()
    .slice(tokens[index].info.trimStart().indexOf(' '))
    .trim()

  return `<Chart id="${key}" language="${language}"
    title="${encodeURIComponent(title)}"
    code="${encodeURIComponent(content)}"/>`
}

export default resolveChart
