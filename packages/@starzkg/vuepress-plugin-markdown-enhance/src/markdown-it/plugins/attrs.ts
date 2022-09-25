import markdownItAttrs from 'markdown-it-attrs'

/**
 * Options for markdown-it-attrs
 *
 * @see https://github.com/arve0/markdown-it-attrs
 */
export interface AttrsPluginOptions {
  /**
   * left delimiter
   *
   * 左分隔符
   *
   * @default '{'
   */
  leftDelimiter?: string

  /**
   * right delimiter
   *
   * 右分隔符
   *
   * @default '}'
   */
  rightDelimiter?: string

  /**
   * allowed attributes
   *
   * @description An empty list means allowing all attribute
   *
   * 允许的属性
   *
   * @description 设置空数组意味着允许所有属性
   *
   * @default []
   */
  allowedAttributes?: (string | RegExp)[]
}

/**
 * markdown-it-attrs
 *
 * @see https://github.com/arve0/markdown-it-attrs
 */
export const attrs = markdownItAttrs

export default markdownItAttrs
