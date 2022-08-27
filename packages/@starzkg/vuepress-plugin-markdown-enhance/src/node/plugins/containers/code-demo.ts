import type { ContainerPluginOptions } from '@vuepress/plugin-container'
import { hash } from '@vuepress/utils'
import type Token from 'markdown-it/lib/token.js'
import type { MarkdownEnhanceOptions } from '../../../shared/index.js'

export const codeDemoRender = (tokens: Token[], index: number): string => {
  const { nesting, info } = tokens[index]
  const type = /\[(.*)\]/u.exec(info)
  const title = /^ demo\s*(?:\[.*?\])?\s*(.*)\s*$/u.exec(info)

  if (nesting === -1)
    return `
    </div>
  </div>
  <div class="code-demo-footer"></div>
</div>
`

  let config = ''
  const code: Record<string, string> = {}

  for (let i = index; i < tokens.length; i++) {
    const { type, content, info } = tokens[i]
    if (type === 'container_demo_close') break
    if (!content) continue
    if (type === 'fence') {
      if (info === 'json') config = encodeURIComponent(content)
      else code[info] = content
    }
  }

  return `
<div id="code-demo-${hash(code)}" class="code-demo-wrapper" ${
    type ? `data-type="${encodeURIComponent(type[1])}"` : ''
  } ${title ? `data-title="${encodeURIComponent(title[1])}"` : ''} ${
    config ? `data-config="${config}"` : ''
  } data-code="${encodeURIComponent(JSON.stringify(code))}">
  <div class="demo-wrapper">
    <div class="code-demo-app"></div>
  </div>
  <div class="code-wrapper">
    <div class="code">
`
}

export const resolveCodeDemoContainerOptions = (
  localeOptions: MarkdownEnhanceOptions
): ContainerPluginOptions => {
  return {
    type: 'demo',
    render: codeDemoRender,
  }
}
