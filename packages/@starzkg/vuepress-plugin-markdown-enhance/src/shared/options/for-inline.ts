import type Token from 'markdown-it/lib/token'

/**
 * Options for markdown-it-for-inline
 *
 * @see https://github.com/markdown-it/markdown-it-for-inline
 */
export interface ForInlinePluginOptions {
  /**
   * rule name (should be unique)
   */
  ruleName: string

  /**
   * token type to apply
   */
  tokenType: string

  /**
   * function
   */
  iterator: (tokens: Token[], idx: number) => void
}
