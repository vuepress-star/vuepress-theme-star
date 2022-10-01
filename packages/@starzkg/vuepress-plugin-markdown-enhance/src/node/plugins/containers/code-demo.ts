import type { ContainerPluginOptions } from '@vuepress/plugin-container'
import { hash } from '@vuepress/utils'
import type { default as Token } from 'markdown-it/lib/token.js'

export const resolveCodeDemoContainerOptions = (
  name?: string
): ContainerPluginOptions => {
  const typeName = name === undefined ? 'code-demo' : `code-demo:${name}`
  return {
    type: typeName,
    render: (tokens: Token[], index: number): string => {
      const { nesting, info } = tokens[index]
      if (nesting === -1) {
        return '</CodeDemo>'
      }

      const title = info.trimStart().slice(typeName.length).trim()

      let config = ''
      const code: Record<string, string> = {}

      for (let i = index; i < tokens.length; i++) {
        const { type, content, info } = tokens[i]

        if (type === `container_${typeName}_close`) break
        if (!content) continue
        if (type === 'fence') {
          if (info === 'json') config = encodeURIComponent(content)
          else code[info] = content
        }
      }

      return `
<CodeDemo id="code-demo-${hash(code)}"
  type="${name}"
  ${title ? ` title="${encodeURIComponent(title)}"` : ''}
  ${config ? ` config="${config}"` : ''}
  code="${encodeURIComponent(JSON.stringify(code))}">
`
    },
  }
}
