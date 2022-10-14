import { hash } from '@vuepress/utils'
import type MarkdownIt from 'markdown-it'
import type Token from 'markdown-it/lib/token.js'

export const resolveReveal = (
  md: MarkdownIt,
  tokens: Token[],
  index: number
): string => {
  const token = tokens[index]
  const key = `reveal-${hash(index)}`
  const { content, info } = token

  // Handle ```reveal blocks
  if (!info.startsWith('reveal') && !info.startsWith('presentation')) return ''
  const theme = info.trim().split(' ')[0].trim().split(':')[1] || 'auto'

  return `<Reveal id="${key}"
    code="${encodeURIComponent(content)}"
    theme="${theme}"/>`
}

export default resolveReveal
