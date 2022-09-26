import { hash } from '@vuepress/utils'
import type MarkdownIt from 'markdown-it'
import type { PluginSimple } from 'markdown-it'
import { generateUML } from '../utils/index.js'

export const presentation: PluginSimple = (md: MarkdownIt): void => {
  md.block.ruler.before(
    'fence',
    'presentation',
    generateUML({
      name: 'presentation',
      open: 'slidestart',
      close: 'slideend',
    }),
    { alt: ['paragraph', 'reference', 'blockquote', 'list'] }
  )

  md.renderer.rules.presentation = (tokens, index): string => {
    const token = tokens[index]
    const key = `presentation-${hash(index)}`
    const { content, info } = token

    return `<PresentationViewer id="${key}" data-code="${encodeURIComponent(
      content
    )}" theme="${info.trim() || 'auto'}"></PresentationViewer>`
  }
}

export default presentation
