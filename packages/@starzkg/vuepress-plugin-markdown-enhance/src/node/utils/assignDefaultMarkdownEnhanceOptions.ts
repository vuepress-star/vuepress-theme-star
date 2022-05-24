import {
  DEFAULT_MARKDOWN_ENHANCE_OPTIONS,
  MarkdownEnhanceOptions,
  MarkdownFavor,
} from '../../shared'

export const assignDefaultMarkdownEnhanceOptions = (
  options: MarkdownEnhanceOptions | MarkdownFavor | boolean = true
): MarkdownEnhanceOptions => {
  if (typeof options === 'boolean') {
    return options
      ? DEFAULT_MARKDOWN_ENHANCE_OPTIONS
      : ({} as MarkdownEnhanceOptions)
  } else if (typeof options === 'string') {
    return {}
  }
  return options || {}
}
