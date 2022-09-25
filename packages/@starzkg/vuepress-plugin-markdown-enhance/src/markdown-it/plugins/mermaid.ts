import { hash } from '@vuepress/utils'
import type MarkdownIt from 'markdown-it'
import type Token from 'markdown-it/lib/token.js'

const mermaidRender = (tokens: Token[], index: number): string => {
  const token = tokens[index]
  const key = `mermaid-${hash(index)}`
  const { content } = token

  return `<Mermaid id="${key}" code="${encodeURIComponent(content)}"/>`
}

export const mermaid = (md: MarkdownIt): void => {
  // Handle ```mermaid blocks
  const fence = md.renderer.rules.fence

  md.renderer.rules.fence = (...args): string => {
    const [tokens, index] = args
    const { info } = tokens[index]

    if (info.trim() === 'mermaid') return mermaidRender(tokens, index)

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return fence!(...args)
  }

  md.renderer.rules.mermaid = mermaidRender
}
