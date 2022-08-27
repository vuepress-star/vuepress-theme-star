import type { PluginWithOptions } from 'markdown-it'
import markdownItEmoji from 'markdown-it-emoji'
import type { EmojiPluginOptions } from '../../shared/index.js'

export const emoji: PluginWithOptions<EmojiPluginOptions> = markdownItEmoji

export default markdownItEmoji
