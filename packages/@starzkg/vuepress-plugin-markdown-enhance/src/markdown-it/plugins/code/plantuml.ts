import hash from 'hash-sum'
import type MarkdownIt from 'markdown-it'
import type Token from 'markdown-it/lib/token.js'
import { encode } from 'plantuml-encoder'

export const resolvePlantUML = (
  md: MarkdownIt,
  tokens: Token[],
  idx: number
): string => {
  const token = tokens[idx]
  const key = `plantuml-${hash(idx)}`
  const { content, info } = token
  const realInfo = info.trim().split(':')[0]

  // Handle ```puml and ```plantuml blocks
  if (realInfo !== 'puml' && realInfo !== 'plantuml') return ''

  return `<PlantUML id="${key}" code="${encode(content)}" preset="${
    info.trim().split(':')[1] || 'png'
  }"></PlantUML>`
}

export default resolvePlantUML
