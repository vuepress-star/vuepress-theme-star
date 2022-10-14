import { hash } from '@vuepress/utils'
import type MarkdownIt from 'markdown-it'
import type Token from 'markdown-it/lib/token.js'

export const resolveMarkmap = (
  md: MarkdownIt,
  tokens: Token[],
  index: number
): string => {
  const token = tokens[index]
  const key = `markmap-${hash(index)}`
  const { content } = token

  // get token info
  const info = token.info ? md.utils.unescapeAll(token.info).trim() : ''
  if (!info.startsWith('markmap')) return ''
  const title = info
    .trimStart()
    .slice(tokens[index].info.trimStart().indexOf(' '))
    .trim()

  return `<Markmap id="${key}"
    title="${encodeURIComponent(title)}"
    code="${encodeURIComponent(content)}"/>`
}

export default resolveMarkmap
