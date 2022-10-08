import hash from 'hash-sum'
import type { PluginSimple } from 'markdown-it'
import type MarkdownIt from 'markdown-it'
import type Token from 'markdown-it/lib/token.js'
import { encode } from 'plantuml-encoder'

const plantumlRender = (tokens: Token[], idx: number): string => {
  const token = tokens[idx]
  const key = `plantuml-${hash(idx)}`
  const { content, info } = token

  return `<PlantUML id="${key}" code="${encode(content)}" preset="${
    info.trim().split(':')[1] || 'png'
  }"></PlantUML>`
}

export const plantuml: PluginSimple = (md: MarkdownIt): void => {
  // Handle ```puml and ```plantuml blocks
  const fence = md.renderer.rules.fence

  md.renderer.rules.fence = (...args): string => {
    const [tokens, idx] = args
    const { info } = tokens[idx]
    const realInfo = info.trim().split(':')[0]

    if (realInfo === 'puml' || realInfo === 'plantuml')
      return plantumlRender(tokens, idx)

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return fence!(...args)
  }

  md.renderer.rules.plantuml = plantumlRender
}

export default plantuml
