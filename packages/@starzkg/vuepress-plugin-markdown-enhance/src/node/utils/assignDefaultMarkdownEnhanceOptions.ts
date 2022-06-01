import {
  DEFAULT_MARKDOWN_SPEC,
  MarkdownEnhanceOptions,
  MarkdownFavor,
} from '../../shared'

export const assignDefaultMarkdownEnhanceOptions = (
  options: MarkdownEnhanceOptions | MarkdownFavor | boolean = true
): MarkdownEnhanceOptions => {
  if (typeof options === 'boolean') {
    return options ? DEFAULT_MARKDOWN_SPEC : ({} as MarkdownEnhanceOptions)
  } else if (typeof options === 'string') {
    return {}
  }
  return options || {}
}
