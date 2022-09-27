import { hash } from '@vuepress/utils'
import type MarkdownIt from 'markdown-it'
import type { PluginSimple } from 'markdown-it'
import type Token from 'markdown-it/lib/token.js'

const presentationRender = (tokens: Token[], index: number): string => {
  const token = tokens[index]
  const key = `presentation-${hash(index)}`
  const { content } = token

  return `<Reveal id="${key}" code="${encodeURIComponent(content)}"/>`
}

export const reveal: PluginSimple = (md: MarkdownIt): void => {
  // Handle ```presentation blocks
  const fence = md.renderer.rules.fence

  md.renderer.rules.fence = (...args): string => {
    const [tokens, index] = args
    const { info } = tokens[index]

    if (info.startsWith('reveal') || info.startsWith('presentation'))
      return presentationRender(tokens, index)

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return fence!(...args)
  }

  md.renderer.rules.presentation = presentationRender
}

export default reveal
