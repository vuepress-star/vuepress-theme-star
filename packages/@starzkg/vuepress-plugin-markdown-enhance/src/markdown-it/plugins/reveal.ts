import { hash } from '@vuepress/utils'
import type MarkdownIt from 'markdown-it'
import type { PluginSimple } from 'markdown-it'
import type Token from 'markdown-it/lib/token.js'

const revealRender = (tokens: Token[], index: number): string => {
  const token = tokens[index]
  const key = `reveal-${hash(index)}`
  const { content, info } = token

  const theme = info.trim().split(' ')[0].trim().split(':')[1] || 'auto'

  return `<Reveal id="${key}"
    code="${encodeURIComponent(content)}"
    theme="${theme}"/>`
}

export const reveal: PluginSimple = (md: MarkdownIt): void => {
  // Handle ```reveal blocks
  const fence = md.renderer.rules.fence

  md.renderer.rules.fence = (...args): string => {
    const [tokens, index] = args
    const { info } = tokens[index]

    if (info.startsWith('reveal') || info.startsWith('presentation'))
      return revealRender(tokens, index)

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return fence!(...args)
  }

  md.renderer.rules.reveal = revealRender
}

export default reveal
