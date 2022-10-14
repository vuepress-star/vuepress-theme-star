import { hash } from '@vuepress/utils'
import type MarkdownIt from 'markdown-it'
import type Token from 'markdown-it/lib/token.js'

export const resolveMermaid = (
  md: MarkdownIt,
  tokens: Token[],
  index: number
): string => {
  const token = tokens[index]
  const key = `mermaid-${hash(index)}`
  const { info, content } = token

  if (info.trim() !== 'mermaid') return ''

  return `<Mermaid id="${key}" code="${encodeURIComponent(content)}"/>`
}

export default resolveMermaid
