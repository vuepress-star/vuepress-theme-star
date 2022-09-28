import { hash } from '@vuepress/utils'
import type MarkdownIt from 'markdown-it'
import type { PluginSimple } from 'markdown-it'
import type Token from 'markdown-it/lib/token.js'

export const markmap: PluginSimple = (md: MarkdownIt): void => {
  const markmapRender = (tokens: Token[], index: number): string => {
    const token = tokens[index]
    const key = `markmap-${hash(index)}`
    const { content } = token

    // get token info
    const info = token.info ? md.utils.unescapeAll(token.info).trim() : ''

    const title = info
      .trimStart()
      .slice(tokens[index].info.trimStart().indexOf(' '))
      .trim()

    return `<Markmap id="${key}"
    title="${encodeURIComponent(title)}"
    code="${encodeURIComponent(content)}"/>`
  }
  // Handle ```markmap blocks
  const fence = md.renderer.rules.fence

  md.renderer.rules.fence = (...args): string => {
    const [tokens, index] = args
    const { info } = tokens[index]

    if (info.startsWith('markmap')) return markmapRender(tokens, index)

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return fence!(...args)
  }

  md.renderer.rules.markmap = markmapRender
}

export default markmap
