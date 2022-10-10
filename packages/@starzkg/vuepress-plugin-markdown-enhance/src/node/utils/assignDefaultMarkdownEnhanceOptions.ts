import {
  DEFAULT_MARKDOWN_SPEC,
  MarkdownFavor,
  MarkdownOptions,
} from '../../shared/index.js'

export const assignDefaultMarkdownOptions = (
  options: MarkdownOptions | MarkdownFavor | boolean = true
): MarkdownOptions => {
  if (typeof options === 'boolean') {
    return options ? DEFAULT_MARKDOWN_SPEC : ({} as MarkdownOptions)
  } else if (typeof options === 'string') {
    return {}
  }
  return { ...options, ...DEFAULT_MARKDOWN_SPEC } || {}
}
