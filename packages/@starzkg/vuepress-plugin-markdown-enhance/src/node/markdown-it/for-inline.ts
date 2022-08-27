import type { PluginWithOptions } from 'markdown-it'
import markdownItForInline from 'markdown-it-for-inline'
import type { ForInlinePluginOptions } from '../../shared/index.js'

export const forInline: PluginWithOptions<ForInlinePluginOptions> =
  markdownItForInline

export default markdownItForInline
